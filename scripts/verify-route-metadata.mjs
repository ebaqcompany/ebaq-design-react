import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const read = (path) => readFile(new URL(path, import.meta.url), 'utf8')
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const sitemap = await read('../dist/sitemap.xml')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const home = await read('../dist/index.html')
const homeTitle = home.match(/<title>(.*?)<\/title>/s)[1]
for (const url of urls) {
  assert.equal(new URL(url).origin, 'https://www.ebaqdesign.com')
  const path = new URL(url).pathname
  const html = await read(`../dist${path === '/' ? '' : path}/index.html`)
  assert.equal([...html.matchAll(/<title>/g)].length, 1, path)
  assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1, path)
  assert.ok(html.includes(`rel="canonical" href="${url}"`), path)
  for (const key of ['description', 'og:title', 'og:description', 'og:image', 'og:url', 'twitter:title', 'twitter:description', 'twitter:image']) {
    assert.equal([...html.matchAll(new RegExp(`(?:name|property)="${key}"`, 'g'))].length, 1, `${path}: ${key}`)
  }
  if (path !== '/') {
    assert.ok(!html.includes(`<title>${homeTitle}</title>`), path)
    assert.ok(!html.includes('#brand-sprint-offer'), `${path}: homepage schema leaked`)
  }
  if (/^\/(blog|podcast)\//.test(path)) {
    const post = JSON.parse(await read(`../public/content${path}.json`))
    assert.ok(html.includes(`<title>${escape(post.seo?.title || post.title)}</title>`), path)
    assert.ok(html.includes(`name="description" content="${escape(post.seo?.description || post.description)}"`), path)
  }
}
const missing = await read('../dist/404.html')
assert.ok(missing.includes('content="noindex,follow"'))
assert.ok(missing.includes('<title>Page not found | Ebaq Design</title>'))
console.log(`Verified titles, metadata uniqueness, canonical URLs, and schema isolation for ${urls.length} pages; 404 is noindex.`)
