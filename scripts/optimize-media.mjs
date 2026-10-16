// Creates WebP siblings for referenced PNG/JPG/GIF images and WebM siblings for referenced MP4s.
// Originals stay in place (MP4s remain the <video> fallback); scripts/rewrite-media-refs.mjs then
// points references at the smaller sibling. Needs cwebp, gif2webp and ffmpeg on PATH.
//
//   node scripts/optimize-media.mjs            convert everything still missing a sibling
//   node scripts/optimize-media.mjs --dry-run  list what would be converted
import { execFile } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { cpus } from 'node:os'
import { extname, join, relative } from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)
const root = new URL('..', import.meta.url).pathname
const publicDir = join(root, 'public')
const dryRun = process.argv.includes('--dry-run')

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) { if (name !== 'node_modules') walk(path, out) } else out.push(path)
  }
  return out
}

// Every public file, indexed by path so template-literal tails (`${base}/02-colors.mp4`) can be resolved.
const publicFiles = walk(publicDir).map((path) => `/${relative(publicDir, path)}`)
const byTail = (tail) => publicFiles.filter((path) => path === tail || path.endsWith(tail.startsWith('/') ? tail : `/${tail}`))

const sources = [...walk(join(root, 'src')), ...walk(join(publicDir, 'content')), join(root, 'index.html')].filter((path) => /\.(tsx?|json|html|css)$/.test(path))
const pattern = /([A-Za-z0-9_\-./%() ]*?\.(?:png|jpe?g|gif|mp4))(?=["'`)\s?#,\\])/gi
const referenced = new Set()
for (const file of sources) {
  for (const [, raw] of readFileSync(file, 'utf8').matchAll(pattern)) {
    const tail = decodeURIComponent(raw.replace(/^https?:\/\/(?:www\.)?ebaqdesign\.com/, '')).trim()
    if (!tail || /^https?:|^\/\//.test(tail)) continue
    const exact = tail.startsWith('/') && publicFiles.includes(tail) ? [tail] : byTail(tail.replace(/^\.?\//, '/'))
    for (const match of exact) referenced.add(match)
  }
}

const siblingOf = (path) => (/\.mp4$/i.test(path) ? path.replace(/\.mp4$/i, '.webm') : path.replace(/\.(png|jpe?g|gif)$/i, '.webp'))
const todo = [...referenced].filter((path) => !existsSync(join(publicDir, siblingOf(path)))).sort()
const kind = (path) => ({ '.mp4': 'video', '.gif': 'gif' })[extname(path).toLowerCase()] || 'image'
console.log(`${referenced.size} referenced media files; ${todo.length} still need a sibling (${todo.filter((p) => kind(p) === 'video').length} videos, ${todo.filter((p) => kind(p) === 'gif').length} GIFs, ${todo.filter((p) => kind(p) === 'image').length} images).`)
if (dryRun) { for (const path of todo) console.log(`  ${path}`); process.exit(0) }

const probe = async (file) => {
  const { stdout } = await run('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,width,height', '-of', 'json', file])
  const streams = JSON.parse(stdout).streams
  return { video: streams.find((s) => s.codec_type === 'video'), hasAudio: streams.some((s) => s.codec_type === 'audio') }
}

// Most clips carry a silent track from the export; only keep audio that someone could actually hear.
const audible = async (file) => {
  const { stderr } = await run('ffmpeg', ['-hide_banner', '-i', file, '-vn', '-af', 'volumedetect', '-f', 'null', '-'], { maxBuffer: 1 << 24 })
  const max = Number(stderr.match(/max_volume:\s*(-?[\d.]+) dB/)?.[1] ?? -91)
  return max > -50
}

const imageWidth = async (file) => {
  const { stdout } = await run('magick', ['identify', '-format', '%w %h\n', `${file}[0]`])
  const [width, height] = stdout.trim().split(/\s+/).map(Number)
  return { width, height }
}

async function convert(path) {
  const input = join(publicDir, path)
  const output = join(publicDir, siblingOf(path))
  const type = kind(path)
  if (type === 'video') {
    const { video, hasAudio } = await probe(input)
    // Homepage tiles and logo loops never render wider than ~550 CSS px; case-study media is full width.
    const maxWidth = /^\/portfolio\//.test(path) ? 1280 : 1920
    const scale = video && video.width > maxWidth ? ['-vf', `scale=${maxWidth}:-2:flags=lanczos`] : []
    const audio = hasAudio && (await audible(input)) ? ['-c:a', 'libopus', '-b:a', '96k'] : ['-an']
    await run('nice', ['-n', '10', 'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', input, ...scale,
      '-c:v', 'libvpx-vp9', '-crf', /^\/portfolio\//.test(path) ? '36' : '33', '-b:v', '0', '-pix_fmt', 'yuv420p',
      '-deadline', 'good', '-cpu-used', '2', '-row-mt', '1', '-tile-columns', '2', ...audio, output], { maxBuffer: 1 << 24 })
  } else if (type === 'gif') {
    await run('nice', ['-n', '10', 'gif2webp', '-q', '80', '-m', '6', '-mixed', '-mt', '-quiet', input, '-o', output])
  } else {
    const { width } = await imageWidth(input)
    const resize = width > 2560 ? ['-resize', '2560', '0'] : []
    await run('nice', ['-n', '10', 'cwebp', '-quiet', '-mt', '-m', '6', '-q', /\.png$/i.test(path) ? '85' : '82', '-metadata', 'none', ...resize, input, '-o', output])
  }
  return { path, before: statSync(input).size, after: statSync(output).size }
}

const queue = [...todo]
const results = []
const failures = []
const workers = Array.from({ length: Math.max(2, Math.min(6, cpus().length - 2)) }, async () => {
  while (queue.length) {
    const path = queue.shift()
    try {
      const result = await convert(path)
      results.push(result)
      console.log(`${String(Math.round(result.before / 1024)).padStart(7)}K -> ${String(Math.round(result.after / 1024)).padStart(6)}K  ${path}`)
    } catch (error) {
      failures.push(path)
      console.log(`FAILED ${path}: ${String(error.stderr || error.message).split('\n')[0]}`)
    }
  }
})
await Promise.all(workers)
const total = (key) => Math.round(results.reduce((sum, result) => sum + result[key], 0) / 1024 / 1024)
console.log(`Converted ${results.length} files: ${total('before')} MB -> ${total('after')} MB.${failures.length ? ` ${failures.length} failed.` : ''}`)
