// Gives every local <img> in blog and podcast content its intrinsic width/height (so the browser reserves
// the space and the page doesn't shift as images arrive) plus loading="lazy" and decoding="async".
// Edits the JSON as text so each file keeps its formatting. Safe to re-run; tags that already have a
// width or height are left alone.
//
//   node scripts/add-image-dimensions.mjs           update content in place
//   node scripts/add-image-dimensions.mjs --check   report what would change
import { existsSync, openSync, readFileSync, readSync, closeSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const publicDir = join(root, 'public')
const check = process.argv.includes('--check')

const head = (file, bytes = 65536) => {
  const buffer = Buffer.alloc(bytes)
  const fd = openSync(file, 'r')
  const read = readSync(fd, buffer, 0, bytes, 0)
  closeSync(fd)
  return buffer.subarray(0, read)
}

// Intrinsic size from the file header, for the formats the site serves.
export function imageSize(file) {
  const b = head(file)
  if (b.toString('ascii', 1, 4) === 'PNG') return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
  if (b.toString('ascii', 0, 3) === 'GIF') return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) }
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16)
    if (chunk === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21)
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) }
    }
    if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let offset = 2
    while (offset < b.length - 9) {
      if (b[offset] !== 0xff) { offset++; continue }
      const marker = b[offset + 1]
      const length = b.readUInt16BE(offset + 2)
      // SOF0–SOF15 carry the frame size; skip DHT (C4), JPG (C8) and DAC (CC).
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { height: b.readUInt16BE(offset + 5), width: b.readUInt16BE(offset + 7) }
      offset += 2 + length
    }
  }
  if (/\.svg$/i.test(file)) {
    const svg = b.toString('utf8')
    const width = Number(svg.match(/<svg[^>]*\swidth="([\d.]+)(?:px)?"/)?.[1])
    const height = Number(svg.match(/<svg[^>]*\sheight="([\d.]+)(?:px)?"/)?.[1])
    if (width && height) return { width: Math.round(width), height: Math.round(height) }
    const viewBox = svg.match(/viewBox="[\d.\-]+[\s,]+[\d.\-]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/)
    if (viewBox) return { width: Math.round(Number(viewBox[1])), height: Math.round(Number(viewBox[2])) }
  }
  return null
}

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (name.endsWith('.json')) out.push(path)
  }
  return out
}

let files = 0
let sized = 0
let lazied = 0
const unresolved = new Set()
for (const file of [...walk(join(publicDir, 'content/blog')), ...walk(join(publicDir, 'content/podcast'))]) {
  const before = readFileSync(file, 'utf8')
  // Inside JSON the HTML's attribute quotes are escaped (\"), so a quote is either \" or a bare ".
  const after = before.replace(/<img\b([^>]*?)(\s*\/?)>/g, (tag, attrs, close) => {
    const q = attrs.includes('\\"') ? '\\"' : '"'
    const value = (name) => attrs.match(new RegExp(`\\s${name}=(?:\\\\"|")([^"\\\\]*)(?:\\\\"|")`))?.[1]
    const src = value('src')
    let next = attrs
    // Webflow exported width="auto" height="auto", which browsers ignore; real numbers replace them.
    const numeric = /^\d+$/.test(value('width') ?? '') && /^\d+$/.test(value('height') ?? '')
    if (src?.startsWith('/') && !numeric) {
      const path = join(publicDir, decodeURIComponent(src.split(/[?#]/)[0]))
      const size = existsSync(path) ? imageSize(path) : null
      if (size?.width && size?.height) {
        next = next.replace(/\s(?:width|height)=(?:\\"|")[^"\\]*(?:\\"|")/g, '') + ` width=${q}${size.width}${q} height=${q}${size.height}${q}`
        sized++
      } else unresolved.add(src)
    }
    if (!/\sloading=/.test(next)) {
      next += ` loading=${q}lazy${q}`
      lazied++
    }
    if (!/\sdecoding=/.test(next)) next += ` decoding=${q}async${q}`
    return next === attrs ? tag : `<img${next}${close}>`
  })
  if (after === before) continue
  JSON.parse(after)
  files++
  if (!check) writeFileSync(file, after)
}
console.log(`${check ? 'Would update' : 'Updated'} ${files} files: ${sized} images given width/height, ${lazied} set to lazy-load.`)
if (unresolved.size) console.log(`${unresolved.size} local images without a readable size, e.g. ${[...unresolved].slice(0, 5).join(', ')}`)
