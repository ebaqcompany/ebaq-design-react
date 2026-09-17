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
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match, index) => {
    try { return JSON.parse(match[1]) } catch (error) { throw new Error(`${path}: JSON-LD block ${index + 1} is not valid JSON (${error.message})`) }
  })
  if (path.startsWith('/blog/')) {
    const postings = schemas.filter((schema) => schema['@type'] === 'BlogPosting')
    assert.equal(postings.length, 1, `${path}: BlogPosting schema count`)
    const posting = postings[0]
    assert.equal(posting.mainEntityOfPage?.['@id'], url, `${path}: BlogPosting mainEntityOfPage`)
    const isAbsolute = (value) => typeof value === 'string' && /^https:\/\/\S+$/.test(value)
    assert.ok(posting.headline && posting.author?.name && posting.publisher?.name, `${path}: BlogPosting required fields`)
    assert.ok(posting.headline.length <= 110, `${path}: BlogPosting headline is longer than 110 characters`)
    assert.match(posting.datePublished || '', /^\d{4}-\d{2}-\d{2}/, `${path}: BlogPosting datePublished`)
    assert.ok(isAbsolute(posting.author.url) && isAbsolute(posting.publisher.logo?.url), `${path}: BlogPosting author or logo URL is not absolute`)
    for (const image of posting.image || []) assert.ok(isAbsolute(image), `${path}: BlogPosting image is not an absolute https URL (${image})`)
    const faqPages = schemas.filter((schema) => schema['@type'] === 'FAQPage')
    assert.ok(faqPages.length <= 1, `${path}: FAQPage schema count`)
    for (const faqPage of faqPages) {
      assert.ok(faqPage.mainEntity?.length >= 2, `${path}: FAQPage needs at least two questions`)
      for (const item of faqPage.mainEntity) assert.ok(item.name && item.acceptedAnswer?.text, `${path}: FAQPage question or answer is empty`)
    }
  }
  if (/^\/(blog|podcast)\//.test(path)) {
    const post = JSON.parse(await read(`../public/content${path}.json`))
    if (path.startsWith('/blog/') && /\/embed\/[^?&#/]+/i.test(post.youtubeEmbed || '')) assert.equal(schemas.filter((schema) => schema['@type'] === 'VideoObject').length, 1, `${path}: VideoObject schema count`)
    assert.ok(html.includes(`<title>${escape(post.seo?.title || post.title)}</title>`), path)
    assert.ok(html.includes(`name="description" content="${escape(post.seo?.description || post.description)}"`), path)
  }
}
const missing = await read('../dist/404.html')
assert.ok(missing.includes('content="noindex,follow"'))
assert.ok(missing.includes('<title>Page not found | Ebaq Design</title>'))
console.log(`Verified titles, metadata uniqueness, canonical URLs, blog structured data, and schema isolation for ${urls.length} pages; 404 is noindex.`)
