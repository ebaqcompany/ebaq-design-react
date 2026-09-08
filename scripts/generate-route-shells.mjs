import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import ts from 'typescript'

const siteUrl = 'https://www.ebaqdesign.com'
const outputDir = new URL('../dist/', import.meta.url)
const read = (path) => readFile(new URL(path, import.meta.url), 'utf8')
const json = async (path) => JSON.parse(await read(path))
const loadData = async (path) => {
  const { outputText } = ts.transpileModule(await read(path), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const absolute = (value) => new URL(value, siteUrl).href
const indexHtml = await read('../dist/index.html')
const sitemap = await read('../public/sitemap.xml')
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url).pathname).filter((path) => path !== '/')
const metadata = new Map()

// Read existing static-page copy so generated titles stay aligned with React.
for (const [path, component] of Object.entries({
  '/about': 'AboutPage', '/contact': 'ContactPage', '/blog': 'BlogPage',
  '/podcast': 'PodcastPage', '/shop': 'ShopPage', '/tools': 'ToolsPage',
  '/law-firm-branding': 'LawFirmLanding',
})) {
  const source = await read(`../src/components/${component}.tsx`)
  const title = source.match(/<title>([^<{]+)<\/title>/)?.[1]?.replaceAll('&amp;', '&')
  const description = source.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1]
  metadata.set(path, { title, description })
}
const work = await read('../src/components/WorkPage.tsx')
metadata.set('/work', { title: work.match(/const pageTitle = "([^"]+)"/)?.[1], description: work.match(/const pageDescription =\s*"([^"]+)"/)?.[1] })
const legal = await read('../src/components/LegalPage.tsx')
for (const match of legal.matchAll(/<LegalPage title="([^"]+)" updated="[^"]+" description="([^"]+)"/g)) {
  metadata.set(`/${match[1].toLowerCase().replaceAll(' ', '-')}`, { title: `${match[1]} | Ebaqdesign`, description: match[2] })
}
metadata.set('/start', { title: 'Book a Call | Ebaq Design', description: 'Book a call with Arek Dvornechuck to discuss your branding, website, or motion design project.' })
for (const collection of ['blog', 'podcast']) {
  for (const { slug } of await json(`../public/content/${collection}/index.json`)) {
    const post = await json(`../public/content/${collection}/${slug}.json`)
    metadata.set(`/${collection}/${slug}`, { title: post.seo?.title || post.title, description: post.seo?.description || post.description, image: post.seo?.image || post.image?.src, type: 'article' })
  }
}
const { caseStudies } = await loadData('../src/data/caseStudies.ts')
for (const study of caseStudies) metadata.set(`/work/${study.slug}`, { title: `${study.client} — ${study.title}`, description: study.summary, image: study.preview.src })
const { shopProducts } = await loadData('../src/data/shopProducts.ts')
for (const product of shopProducts) metadata.set(`/shop/${product.slug}`, { title: product.seo?.title ?? `${product.title} | Ebaq Design`, description: product.seo?.description ?? product.description, image: product.seo?.image || product.image, socialTitle: product.seo?.ogTitle, socialDescription: product.seo?.ogDescription })

function render(path, meta) {
  if (!meta?.title || !meta.description) throw new Error(`Missing route metadata: ${path}`)
  const url = `${siteUrl}${path}`
  const image = absolute(meta.image || '/social-x-cover-brand-grid.png')
  // Remove homepage-only metadata and structured data before adding route-specific tags.
  const shell = indexHtml.replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<meta\b[^>]*(?:name="(?:description|keywords|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<link data-rh="true" rel="canonical" href="${escape(url)}" />`,
    ...Object.entries({ description: meta.description, 'twitter:card': 'summary_large_image', 'twitter:title': meta.socialTitle || meta.title, 'twitter:description': meta.socialDescription || meta.description, 'twitter:image': image }).map(([name, value]) => `<meta data-rh="true" name="${name}" content="${escape(value)}" />`),
    ...Object.entries({ 'og:site_name': 'Ebaq Design', 'og:type': meta.type || 'website', 'og:url': url, 'og:title': meta.socialTitle || meta.title, 'og:description': meta.socialDescription || meta.description, 'og:image': image }).map(([property, value]) => `<meta data-rh="true" property="${property}" content="${escape(value)}" />`),
  ]
  return shell.replace('</head>', `${tags.join('\n    ')}\n  </head>`)
}
for (const path of paths) {
  const destination = join(outputDir.pathname, path)
  await mkdir(destination, { recursive: true })
  await writeFile(join(destination, 'index.html'), render(path, metadata.get(path)))
}
await writeFile(new URL('404.html', outputDir), render('/404', { title: 'Page not found | Ebaq Design', description: 'The page you requested could not be found.' }).replace('content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"', 'content="noindex,follow"'))
console.log(`Generated metadata for ${paths.length} public routes and 404.html.`)
