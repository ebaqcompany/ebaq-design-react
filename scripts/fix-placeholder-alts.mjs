// The Webflow export left alt="__wf_reserved_inherit" on images whose alt was meant to come from the
// CMS asset (and no alt at all on some), so search engines and screen readers got a placeholder or
// nothing. This writes the image's figcaption, else the heading it sits under, else a readable file name.
//
//   node scripts/fix-placeholder-alts.mjs           update content in place
//   node scripts/fix-placeholder-alts.mjs --check   report what would change
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const check = process.argv.includes('--check')
const placeholder = '__wf_reserved_inherit'

const text = (html) => html
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&quot;|&#34;/g, '"').replace(/&#39;|&rsquo;|&#8217;/g, '’').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
// Escape for an attribute inside a JSON-encoded HTML string.
const attribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const fromFile = (src) => {
  const name = decodeURIComponent(src.split('/').pop().replace(/\.[a-z0-9]+$/i, '')).replace(/-[0-9a-f]{16,}/gi, '').replace(/[-_]+/g, ' ').trim()
  return /[a-z]{3}/i.test(name) ? name.charAt(0).toUpperCase() + name.slice(1) : ''
}

let files = 0
let fixed = 0
for (const collection of ['blog', 'podcast']) {
  const dir = join(root, 'public/content', collection)
  for (const name of readdirSync(dir).filter((file) => file.endsWith('.json'))) {
    const path = join(dir, name)
    const raw = readFileSync(path, 'utf8')
    if (!raw.includes(placeholder) && !/<img\b(?![^>]*\salt=)[^>]*>/.test(raw.replace(/\\"/g, '"'))) continue
    const post = JSON.parse(raw)
    let changed = false
    for (const field of ['body', 'intro']) {
      if (typeof post[field] !== 'string') continue
      post[field] = post[field].replace(/<img\b[^>]*>/g, (tag, offset, html) => {
        const missing = !/\salt=/.test(tag)
        if (!missing && !tag.includes(`alt="${placeholder}"`)) return tag
        const src = tag.match(/\ssrc="([^"]+)"/)?.[1] || ''
        const figureStart = html.lastIndexOf('<figure', offset)
        const figureEnd = html.indexOf('</figure>', offset)
        const insideFigure = figureStart >= 0 && figureEnd >= 0 && html.lastIndexOf('</figure>', offset) < figureStart
        const caption = insideFigure ? text(html.slice(offset, figureEnd).match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] || '') : ''
        const heading = [...html.slice(0, offset).matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/g)].pop()?.[1]
        const headingText = heading ? text(heading).replace(/^\d+[.)]\s*/, '') : ''
        const alt = (caption || headingText || fromFile(src) || post.title).slice(0, 125)
        fixed++
        changed = true
        return missing ? tag.replace(/^<img\b/, `<img alt="${attribute(alt)}"`) : tag.replace(`alt="${placeholder}"`, `alt="${attribute(alt)}"`)
      })
    }
    if (!changed) continue
    files++
    // Re-encode only the edited fields, keeping the file's own layout.
    let next = raw
    for (const field of ['body', 'intro']) {
      if (typeof post[field] !== 'string') continue
      const before = JSON.parse(raw)[field]
      if (before !== post[field]) next = next.replace(JSON.stringify(before), () => JSON.stringify(post[field]))
    }
    if (JSON.parse(next).body !== post.body) throw new Error(`Could not re-encode ${name}`)
    if (!check) writeFileSync(path, next)
  }
}
console.log(`${check ? 'Would fix' : 'Fixed'} ${fixed} missing or placeholder alts in ${files} files.`)
