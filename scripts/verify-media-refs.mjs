// Fails when content or source code points at a local image or video that isn't in public/, or at an
// MP4 without the WebM sibling that <VideoSources> requests first (that would 404 on every view).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const publicDir = join(root, 'public')
const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else out.push(path)
  }
  return out
}

const files = [...walk(join(root, 'src')), ...walk(join(publicDir, 'content')), join(root, 'index.html')].filter((path) => /\.(tsx?|css|json|html)$/.test(path))
// Only literal root paths are checked; paths assembled in template literals (`${base}/01.png`) are skipped.
const pattern = /(?<![\w$}])((?:https?:\/\/(?:www\.)?ebaqdesign\.com)?\/[A-Za-z0-9_\-./%() ]+?\.(?:png|jpe?g|gif|webp|avif|svg|mp4|webm))(?=["'`)\s?#,\\])/gi
const problems = []
for (const file of files) {
  for (const [, raw] of readFileSync(file, 'utf8').matchAll(pattern)) {
    if (raw.startsWith('//')) continue
    const path = decodeURIComponent(raw.replace(/^https?:\/\/(?:www\.)?ebaqdesign\.com/, ''))
    if (!existsSync(join(publicDir, path))) problems.push(`${relative(root, file)}: missing ${path}`)
    else if (/\.mp4$/i.test(path) && !existsSync(join(publicDir, path.replace(/\.mp4$/i, '.webm')))) problems.push(`${relative(root, file)}: no WebM for ${path}`)
  }
}
const unique = [...new Set(problems)]
for (const problem of unique) console.log(problem)
console.log(unique.length ? `${unique.length} media problems.` : 'Every referenced media file exists, and every MP4 has a WebM.')
if (unique.length) process.exit(1)
