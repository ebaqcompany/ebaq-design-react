// Points image references at the WebP sibling that scripts/optimize-media.mjs created, wherever one exists.
// Social-share images (og:image, twitter:image, a post's seo.image) keep their JPG/PNG for link-preview
// crawlers. Videos keep their .mp4 path: <VideoSources> derives the .webm from it.
//
//   node scripts/rewrite-media-refs.mjs           rewrite in place
//   node scripts/rewrite-media-refs.mjs --check   list what would change and exit non-zero if anything would
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const publicDir = join(root, 'public')
const check = process.argv.includes('--check')

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else out.push(path)
  }
  return out
}

const publicFiles = walk(publicDir).map((path) => `/${relative(publicDir, path)}`)
const webpFor = (path) => path.replace(/\.(png|jpe?g|gif)$/i, '.webp')
// A reference may be a full path or the tail of a template literal (`${base}/01-logos.png`). Only rewrite
// it when every public file it could resolve to has a WebP sibling.
const convertible = (reference) => {
  const tail = decodeURIComponent(reference.replace(/^https?:\/\/(?:www\.)?ebaqdesign\.com/, ''))
  const candidates = tail.startsWith('/') && publicFiles.includes(tail)
    ? [tail]
    : publicFiles.filter((file) => file.endsWith(tail.startsWith('/') ? tail : `/${tail}`))
  return candidates.length > 0 && candidates.every((file) => existsSync(join(publicDir, webpFor(file))))
}

const pattern = /((?:https?:\/\/(?:www\.)?ebaqdesign\.com)?[A-Za-z0-9_\-./%() ]*?)\.(png|jpe?g|gif)(?=["'`)\s?#,\\])/gi
const socialLine = /og:image|twitter:image|ogImage|socialImage|seo\??\.image/i
const rewriteText = (text) => text.split('\n').map((line) => (socialLine.test(line) ? line : line.replace(pattern, (match, base) => (/^(?:https?:)?\/\//.test(base) && !/ebaqdesign\.com/.test(base)) || !convertible(match) ? match : `${base}.webp`))).join('\n')

// JSON content is edited as text (so each file keeps its exact formatting), skipping a post's "seo" block.
const seoSpan = (text) => {
  const key = text.indexOf('"seo":')
  if (key < 0) return null
  const start = text.indexOf('{', key)
  let depth = 0
  let inString = false
  for (let i = start; i < text.length; i++) {
    const char = text[i]
    if (inString) {
      if (char === '\\') i++
      else if (char === '"') inString = false
    } else if (char === '"') inString = true
    else if (char === '{') depth++
    else if (char === '}' && --depth === 0) return [key, i + 1]
  }
  return null
}
const rewriteJson = (text) => {
  const span = seoSpan(text)
  if (!span) return rewriteText(text)
  return rewriteText(text.slice(0, span[0])) + text.slice(span[0], span[1]) + rewriteText(text.slice(span[1]))
}

const files = [...walk(join(root, 'src')), ...walk(join(publicDir, 'content')), join(root, 'index.html')].filter((path) => /\.(tsx?|css|json|html)$/.test(path))
let changedFiles = 0
let changedRefs = 0
for (const file of files) {
  const before = readFileSync(file, 'utf8')
  const after = file.endsWith('.json') ? rewriteJson(before) : rewriteText(before)
  if (file.endsWith('.json')) JSON.parse(after)
  if (after === before) continue
  const count = (after.match(/\.webp/g) || []).length - (before.match(/\.webp/g) || []).length
  changedFiles++
  changedRefs += count
  if (check) console.log(`${relative(root, file)}: ${count} references`)
  else writeFileSync(file, after)
}
console.log(`${check ? 'Would update' : 'Updated'} ${changedRefs} references in ${changedFiles} files.`)
if (check && changedFiles) process.exit(1)
