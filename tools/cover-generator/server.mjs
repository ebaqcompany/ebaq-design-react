// Local server for the cover generator. Serves the repo (never cached) and lets the page save its work:
//
//   GET  /api/covers              slugs that already have a saved, editable cover
//   GET  /api/cover?slug=…        that post's saved spec
//   POST /api/save                { slug, spec, cover, og }  → writes the spec, the three WebP files, and points the
//                                 blog index + article JSON at them (one cover per article, overwritten on every save)
//   POST /api/asset               { slug, url } or { slug, name, data } → stores a logo/photo in the post's asset folder
//
// It only listens on 127.0.0.1 and only accepts writes from its own page.
//   node tools/cover-generator/server.mjs
import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync, rmSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const root = new URL('../..', import.meta.url).pathname
const port = Number(process.env.PORT ?? 5190)
const coversDir = join(root, 'tools/cover-generator/covers')
const assetsDir = join(root, 'tools/cover-generator/assets')
const indexPath = join(root, 'public/content/blog/index.json')
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.avif': 'image/avif', '.css': 'text/css' }
const imageExt = { 'image/svg+xml': '.svg', 'image/png': '.png', 'image/webp': '.webp', 'image/jpeg': '.jpg', 'image/jpg': '.jpg', 'image/gif': '.gif', 'image/avif': '.avif' }

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
// Rewrites a JSON file keeping its indentation and trailing newline, so diffs stay small.
function writeJsonLike(p, data) {
  const old = readFileSync(p, 'utf8')
  const indent = old.match(/^[\[{]\r?\n([ \t]+)/)?.[1] ?? (old.slice(0, 400).includes('\n') ? 2 : 0)
  writeFileSync(p, JSON.stringify(data, null, indent) + (old.endsWith('\n') ? '\n' : ''))
}
const posts = () => readJson(indexPath)
const validSlug = (slug) => typeof slug === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(slug) && posts().some((p) => p.slug === slug)
const send = (res, code, body) => { res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(body)) }
const body = (req, limit = 80e6) => new Promise((resolve, reject) => {
  const chunks = []; let size = 0
  req.on('data', (c) => { size += c.length; if (size > limit) { reject(new Error('Too large')); req.destroy() } else chunks.push(c) })
  req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) } catch { reject(new Error('Invalid JSON')) } })
  req.on('error', reject)
})
const png = (dataUrl) => {
  const m = /^data:image\/png;base64,(.+)$/.exec(dataUrl ?? '')
  if (!m) throw new Error('Expected a PNG image')
  return Buffer.from(m[1], 'base64')
}

function saveCover({ slug, spec, cover, og }) {
  if (!validSlug(slug)) throw new Error('Unknown blog post')
  if (!spec || spec.layout !== 'collage') throw new Error('Missing cover spec')
  const dir = join(root, 'public/images/blog', slug)
  mkdirSync(dir, { recursive: true }); mkdirSync(coversDir, { recursive: true })
  const tmp = join(tmpdir(), `cover-${process.pid}-${Date.now()}`)
  mkdirSync(tmp)
  try {
    writeFileSync(join(tmp, 'cover.png'), png(cover)); writeFileSync(join(tmp, 'og.png'), png(og))
    const webp = (src, out, extra = []) => execFileSync('cwebp', ['-quiet', '-mt', '-m', '6', '-q', '80', '-metadata', 'none', ...extra, join(tmp, src), '-o', join(dir, out)])
    webp('cover.png', 'cover-collage.webp')
    webp('cover.png', 'cover-collage-768w.webp', ['-resize', '768', '0'])
    webp('og.png', 'cover-collage-og.webp')
  } finally { rmSync(tmp, { recursive: true, force: true }) }
  writeFileSync(join(coversDir, `${slug}.json`), JSON.stringify({ ...spec, seed: spec.seed ?? slug }, null, 2) + '\n')

  // point the blog at the new files
  const base = `/images/blog/${slug}`
  const image = { src: `${base}/cover-collage.webp`, thumbnail: `${base}/cover-collage-768w.webp` }
  const index = posts()
  const entry = index.find((p) => p.slug === slug)
  entry.image = { ...entry.image, ...image }
  writeJsonLike(indexPath, index)
  const articlePath = join(root, 'public/content/blog', `${slug}.json`)
  let article = false
  if (existsSync(articlePath)) {
    const a = readJson(articlePath)
    a.image = { ...a.image, ...image }
    a.seo = { ...a.seo, image: `${base}/cover-collage-og.webp` }
    writeJsonLike(articlePath, a)
    article = true
  }
  return { ok: true, files: [`${base}/cover-collage.webp`, `${base}/cover-collage-768w.webp`, `${base}/cover-collage-og.webp`], article }
}

async function saveAsset({ slug, url, name, data }) {
  if (!validSlug(slug)) throw new Error('Pick a blog post first')
  let bytes, ext
  if (url) {
    const u = new URL(url)
    if (!/^https?:$/.test(u.protocol)) throw new Error('Only http(s) links')
    const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0 (cover-asset-fetch)' }, signal: AbortSignal.timeout(20000) })
    if (!r.ok) throw new Error(`Download failed (${r.status})`)
    const type = (r.headers.get('content-type') ?? '').split(';')[0].trim()
    ext = imageExt[type] ?? (Object.values(imageExt).includes(extname(u.pathname).toLowerCase()) ? extname(u.pathname).toLowerCase() : null)
    if (!ext) throw new Error('That link is not an image')
    bytes = Buffer.from(await r.arrayBuffer())
    name = `${u.hostname.replace(/^www\./, '').split('.')[0]}-${basename(u.pathname, extname(u.pathname)) || 'image'}`
  } else {
    const m = /^data:([^;]+);base64,(.+)$/.exec(data ?? '')
    ext = m && imageExt[m[1]]
    if (!ext) throw new Error('Only SVG, PNG, WebP, JPG or GIF files')
    bytes = Buffer.from(m[2], 'base64')
    name = basename(String(name ?? 'image'), extname(String(name ?? '')))
  }
  if (bytes.length > 15e6) throw new Error('File is over 15 MB')
  const base = name.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'image'
  const dir = join(assetsDir, slug)
  mkdirSync(dir, { recursive: true })
  let file = `${base}${ext}`
  const target = join(dir, file)
  if (existsSync(target) && !readFileSync(target).equals(bytes)) {
    file = `${base}-${createHash('sha1').update(bytes).digest('hex').slice(0, 6)}${ext}`
  }
  writeFileSync(join(dir, file), bytes)
  return { ok: true, path: `/tools/cover-generator/assets/${slug}/${file}` }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x')
  try {
    if (url.pathname.startsWith('/api/')) {
      if (req.method === 'GET' && url.pathname === '/api/covers') return send(res, 200, existsSync(coversDir) ? readdirSync(coversDir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)) : [])
      if (req.method === 'GET' && url.pathname === '/api/cover') {
        const slug = url.searchParams.get('slug'), p = join(coversDir, `${slug}.json`)
        return validSlug(slug) && existsSync(p) ? send(res, 200, readJson(p)) : send(res, 404, { error: 'No saved cover' })
      }
      if (req.method === 'POST') {
        // writes only from this page: a website open in another tab must not be able to post here
        const origin = req.headers.origin ?? ''
        if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) || !(req.headers['content-type'] ?? '').startsWith('application/json')) return send(res, 403, { error: 'Forbidden' })
        const data = await body(req)
        if (url.pathname === '/api/save') return send(res, 200, saveCover(data))
        if (url.pathname === '/api/asset') return send(res, 200, await saveAsset(data))
      }
      return send(res, 404, { error: 'Not found' })
    }
    const p = join(root, decodeURIComponent(url.pathname))
    if (!p.startsWith(root) || !existsSync(p) || statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
    res.writeHead(200, { 'content-type': types[extname(p).toLowerCase()] ?? 'application/octet-stream', 'cache-control': 'no-store' })
    res.end(readFileSync(p))
  } catch (e) { send(res, 400, { error: e.message }) }
}).listen(port, '127.0.0.1', () => console.log(`Cover generator: http://localhost:${port}/tools/cover-generator/collage.html`))
