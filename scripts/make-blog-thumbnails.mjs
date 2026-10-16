// The blog grid shows each cover at about 400 CSS px, but covers are full-size article images. This saves a
// 768px-wide WebP next to each cover (<name>-768w.webp) and records it as image.thumbnail in
// public/content/blog/index.json, which Blog2 offers through srcset. Re-run after adding a post. Needs cwebp.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const indexPath = join(root, 'public/content/blog/index.json')
const raw = readFileSync(indexPath, 'utf8')
const index = JSON.parse(raw)
let created = 0
let linked = 0
for (const post of index) {
  const src = post.image?.src
  if (!src?.startsWith('/') || !/\.(webp|png|jpe?g)$/i.test(src)) continue
  const source = join(root, 'public', decodeURIComponent(src))
  if (!existsSync(source)) continue
  const thumbnail = src.replace(/\.(webp|png|jpe?g)$/i, '-768w.webp')
  const target = join(root, 'public', decodeURIComponent(thumbnail))
  if (!existsSync(target)) {
    const width = Number(execFileSync('magick', ['identify', '-format', '%w', `${source}[0]`]).toString())
    if (width <= 900) continue // already small; the cover itself is the thumbnail
    execFileSync('cwebp', ['-quiet', '-mt', '-m', '6', '-q', '78', '-metadata', 'none', '-resize', '768', '0', source, '-o', target])
    created++
  }
  if (post.image.thumbnail !== thumbnail) {
    post.image.thumbnail = thumbnail
    linked++
  }
}
const indent = /^[[{]\n/.test(raw) ? raw.match(/^[[{]\n(\s+)/)?.[1] ?? 2 : 0
writeFileSync(indexPath, JSON.stringify(index, null, indent) + (raw.endsWith('\n') ? '\n' : ''))
console.log(`Created ${created} thumbnails; linked ${linked} in index.json.`)
