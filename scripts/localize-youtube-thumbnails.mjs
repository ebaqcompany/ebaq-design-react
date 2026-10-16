// YouTube embeds render as a click-to-play thumbnail (see youtubeFacade in src/content/richText.ts), and
// every image on the site is hosted here, so each embedded video's thumbnail is saved once as
// public/images/youtube/<id>.webp. Re-run after adding a post with a new video. Needs cwebp.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const root = new URL('..', import.meta.url).pathname
const outDir = join(root, 'public/images/youtube')
mkdirSync(outDir, { recursive: true })

const ids = new Set()
for (const collection of ['blog', 'podcast']) {
  const dir = join(root, 'public/content', collection)
  for (const name of readdirSync(dir).filter((file) => file.endsWith('.json'))) {
    for (const [, id] of readFileSync(join(dir, name), 'utf8').matchAll(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})/g)) ids.add(id)
  }
}

const missing = [...ids].filter((id) => !existsSync(join(outDir, `${id}.webp`)))
console.log(`${ids.size} embedded videos, ${missing.length} thumbnails to fetch.`)
const failed = []
for (const id of missing) {
  // maxresdefault is a clean 16:9 frame but only exists for HD uploads; hqdefault always exists but is
  // letterboxed 4:3, so its black bars are cropped off.
  let file
  let crop = []
  for (const [variant, cropArgs] of [['maxresdefault', []], ['hqdefault', ['-crop', '0', '45', '480', '270']]]) {
    const response = await fetch(`https://i.ytimg.com/vi/${id}/${variant}.jpg`)
    if (!response.ok) continue
    file = join(tmpdir(), `${id}-${variant}.jpg`)
    writeFileSync(file, Buffer.from(await response.arrayBuffer()))
    crop = cropArgs
    break
  }
  if (!file) {
    failed.push(id)
    continue
  }
  execFileSync('cwebp', ['-quiet', '-q', '80', '-m', '6', ...crop, '-resize', '960', '0', file, '-o', join(outDir, `${id}.webp`)])
  rmSync(file)
}
console.log(`Saved ${missing.length - failed.length} thumbnails.${failed.length ? ` No thumbnail for: ${failed.join(', ')}` : ''}`)
