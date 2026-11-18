// Batch-renders blog covers with tools/cover-generator/cover.js (the same renderer as the interactive tool).
//
//   node scripts/generate-blog-covers.mjs --limit 24 --sheet          preview the newest 24 into tools/cover-generator/out/
//   node scripts/generate-blog-covers.mjs --slug best-webflow-agencies-saas
//   node scripts/generate-blog-covers.mjs --all --write               write public/images/blog/<slug>/cover-mat.webp + og-mat.webp
//
// Per-post overrides (layout, ground, motif, logos, images, shape, title…) live in tools/cover-generator/covers.json,
// keyed by slug. Nothing touches index.json or article JSON; wiring the new covers in is a separate, deliberate step.
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { chromium } from 'playwright'

const root = new URL('..', import.meta.url).pathname
const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d }

const index = JSON.parse(readFileSync(join(root, 'public/content/blog/index.json'), 'utf8'))
const overridesPath = join(root, 'tools/cover-generator/covers.json')
const overrides = existsSync(overridesPath) ? JSON.parse(readFileSync(overridesPath, 'utf8')) : {}

let posts = index
// --specs <file.json>: render named specs ({ name: spec }) instead of blog posts, e.g. the collage samples.
if (opt('specs')) {
  const specs = JSON.parse(readFileSync(join(root, opt('specs')), 'utf8'))
  posts = Object.entries(specs).map(([slug, spec]) => ({ slug, title: spec.title ?? '', category: spec.category ?? '' }))
  Object.assign(overrides, specs)
} else if (opt('slug')) posts = index.filter((p) => opt('slug').split(',').includes(p.slug))
else if (!flag('all')) posts = index.slice(0, Number(opt('limit', 12)))

const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }
const server = createServer((req, res) => {
  const p = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname))
  if (!p.startsWith(root) || !existsSync(p) || statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
  res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' })
  res.end(readFileSync(p))
}).listen(0)
const port = server.address().port

// Uses the installed Google Chrome so no Playwright browser download is needed; falls back to Playwright's own.
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
const page = await browser.newPage()
await page.goto(`http://localhost:${port}/tools/cover-generator/render.html`)
await page.waitForFunction(() => window.coverReady === true)

const outRoot = flag('write') ? null : join(root, 'tools/cover-generator/out')
const written = []
for (const post of posts) {
  const o = overrides[post.slug] ?? {}
  const spec = { title: o.title ?? post.coverTitle ?? post.title, category: o.category ?? post.category, seed: o.seed ?? post.slug, ...(opt('layout') ? { layout: opt('layout') } : {}), ...o }
  const shots = await page.evaluate(async (s) => window.renderBoth(s), spec)
  const dir = outRoot ? join(outRoot, post.slug) : join(root, 'public/images/blog', post.slug)
  mkdirSync(dir, { recursive: true })
  for (const [name, dataUrl] of Object.entries(shots)) {
    const png = join(dir, `${name}-mat.png`)
    writeFileSync(png, Buffer.from(dataUrl.split(',')[1], 'base64'))
    const webp = png.replace(/\.png$/, '.webp')
    execFileSync('cwebp', ['-quiet', '-mt', '-m', '6', '-q', '86', '-metadata', 'none', png, '-o', webp])
    if (flag('write')) execFileSync('rm', [png])
    written.push(webp)
  }
  console.log(`✓ ${post.slug}`)
}
await browser.close(); server.close()

if (flag('sheet')) {
  const covers = written.filter((f) => f.endsWith('cover-mat.webp'))
  const sheet = join(outRoot ?? join(root, 'tools/cover-generator/out'), 'contact-sheet.jpg')
  mkdirSync(dirname(sheet), { recursive: true })
  // stitch with +append/-append (montage needs a label font that isn't always configured)
  const rows = []
  for (let i = 0; i < covers.length; i += 4) {
    const row = join(dirname(sheet), `.row-${i}.png`)
    execFileSync('magick', [...covers.slice(i, i + 4).flatMap((f) => [f, '-resize', '480x270', '-bordercolor', '#e9e9e9', '-border', '8']), '+append', row])
    rows.push(row)
  }
  execFileSync('magick', [...rows, '-append', '-quality', '88', sheet])
  execFileSync('rm', rows)
  console.log(`Contact sheet: ${sheet}`)
}
console.log(`Rendered ${posts.length} posts → ${outRoot ?? 'public/images/blog/<slug>/'}`)
