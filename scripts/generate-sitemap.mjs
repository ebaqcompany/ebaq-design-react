import { readFile, writeFile } from 'node:fs/promises'
import ts from 'typescript'

const loadTypeScriptModule = async (path) => {
  const source = await readFile(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}

const siteUrl = 'https://www.ebaqdesign.com'
const blog = JSON.parse(await readFile(new URL('../public/content/blog/index.json', import.meta.url), 'utf8'))
const podcast = JSON.parse(await readFile(new URL('../public/content/podcast/index.json', import.meta.url), 'utf8'))
const { caseStudies } = await loadTypeScriptModule('../src/data/caseStudies.ts')
const { shopProducts } = await loadTypeScriptModule('../src/data/shopProducts.ts')

// /start is a 301 to the booking page (vercel.json), so it stays out of the sitemap.
const staticPaths = [
  '/',
  '/about',
  '/contact',
  '/work',
  '/blog',
  '/podcast',
  '/shop',
  '/tools',
  '/pricing',
  '/services',
  '/services/brand-strategy',
  '/services/logo-design',
  '/services/identity-systems',
  '/services/web-design',
  '/services/web-development',
  '/services/motion-graphics',
  '/privacy-policy',
  '/fulfillment-policy',
  '/law-firm-branding',
  '/ai-healthcare-branding',
  '/saas-branding',
  '/luxury-branding',
  '/cannabis-branding',
  '/consultancy-branding',
  '/saas-web-design',
  '/ai-startup-branding',
  '/framer-designer',
  '/webflow-designer',
  '/marketing-agency-branding',
]

// A post's date is moved forward whenever it is substantively updated (AGENTS.md), so it doubles as lastmod.
const isoDate = (value) => {
  const parsed = value ? new Date(`${value}${/\d{1,2}:\d{2}/.test(value) ? '' : ' 00:00:00'} UTC`) : null
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : null
}
const postDate = async (collection, { slug, date }) => {
  const post = JSON.parse(await readFile(new URL(`../public/content/${collection}/${slug}.json`, import.meta.url), 'utf8'))
  return isoDate(post.date) || isoDate(date)
}
const lastmod = new Map()
for (const [collection, index] of [['blog', blog], ['podcast', podcast]]) {
  for (const entry of index) lastmod.set(`/${collection}/${entry.slug}`, await postDate(collection, entry))
}

const paths = [
  ...staticPaths,
  ...caseStudies.map(({ slug }) => `/work/${slug}`),
  ...shopProducts.filter(({ published }) => published !== false).map(({ slug }) => `/shop/${slug}`),
  ...blog.map(({ slug }) => `/blog/${slug}`),
  ...podcast.map(({ slug }) => `/podcast/${slug}`),
]

const urls = [...new Set(paths)].map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>${lastmod.get(path) ? `\n    <lastmod>${lastmod.get(path)}</lastmod>` : ''}\n  </url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap)
console.log(`Generated sitemap with ${paths.length} URLs.`)
