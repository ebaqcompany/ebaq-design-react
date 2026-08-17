import { readFile, writeFile } from 'node:fs/promises'
import ts from 'typescript'

const loadTypeScriptModule = async (path) => {
  const source = await readFile(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}

const siteUrl = 'https://ebaqdesign.com'
const blog = JSON.parse(await readFile(new URL('../public/content/blog/index.json', import.meta.url), 'utf8'))
const podcast = JSON.parse(await readFile(new URL('../public/content/podcast/index.json', import.meta.url), 'utf8'))
const { caseStudies } = await loadTypeScriptModule('../src/data/caseStudies.ts')
const { shopProducts } = await loadTypeScriptModule('../src/data/shopProducts.ts')

const staticPaths = [
  '/',
  '/start',
  '/about',
  '/contact',
  '/work',
  '/blog',
  '/podcast',
  '/shop',
  '/tools',
  '/privacy-policy',
  '/fulfillment-policy',
  '/law-firm-branding',
]

const paths = [
  ...staticPaths,
  ...caseStudies.map(({ slug }) => `/work/${slug}`),
  ...shopProducts.filter(({ published }) => published !== false).map(({ slug }) => `/shop/${slug}`),
  ...blog.map(({ slug }) => `/blog/${slug}`),
  ...podcast.map(({ slug }) => `/podcast/${slug}`),
]

const urls = [...new Set(paths)].map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap)
console.log(`Generated sitemap with ${paths.length} URLs.`)
