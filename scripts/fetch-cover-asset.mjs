// Saves a logo or image from the web into the cover generator's assets, so covers never depend on other sites.
//   node scripts/fetch-cover-asset.mjs <post-slug> <url> [file-name]
// Prints the path to paste into the generator's Logos or Images field.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, basename } from 'node:path'

const [slug, url, name] = process.argv.slice(2)
if (!slug || !url) { console.error('Usage: node scripts/fetch-cover-asset.mjs <post-slug> <url> [file-name]'); process.exit(1) }
const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (cover-asset-fetch)' } })
if (!res.ok) { console.error(`Download failed: ${res.status} ${res.statusText}`); process.exit(1) }
const dir = join(new URL('..', import.meta.url).pathname, 'tools/cover-generator/assets', slug)
mkdirSync(dir, { recursive: true })
const file = name ?? `${new URL(url).hostname.replace(/^www\./, '').split('.')[0]}-${basename(new URL(url).pathname) || 'asset'}`
writeFileSync(join(dir, file), Buffer.from(await res.arrayBuffer()))
console.log(`/tools/cover-generator/assets/${slug}/${file}`)
