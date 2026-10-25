import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
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
// Every route ships its full content in the HTML (links work without JavaScript), so the app's JavaScript
// waits for the first paint instead of competing with it for bandwidth; the timeout covers tabs that
// open in the background, where animation frames don't run.
const deferEntryScript = (html) => html.replace(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/, (_, src) => `<script>
      (function () {
        var started = false;
        var start = function () {
          if (started) return;
          started = true;
          var script = document.createElement('script');
          script.type = 'module';
          script.crossOrigin = '';
          script.src = '${src}';
          document.head.appendChild(script);
        };
        requestAnimationFrame(function () { setTimeout(start); });
        setTimeout(start, 1500);
      })();
    </script>`)
const indexHtml = deferEntryScript(await read('../dist/index.html'))
if (!indexHtml.includes("script.type = 'module'")) throw new Error('Could not find the entry script in dist/index.html')
const sitemap = await read('../public/sitemap.xml')
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url).pathname).filter((path) => path !== '/')
const metadata = new Map()
const { buildBlogPostingSchema, buildBreadcrumbSchema, buildCaseStudySchema, buildFaqSchema, buildPodcastEpisodeSchema, buildProductSchema, buildSiteGraph, buildVideoSchema, resolveFaqPairs, serializeJsonLd } = await loadData('../src/content/structuredData.ts')
const facts = await loadData('../src/content/siteFacts.ts')
// The prerender bundle (vite build --ssr src/entry-server.tsx --outDir dist-ssr).
const ssr = await import(new URL('../dist-ssr/entry-server.js', import.meta.url))
await ssr.preloadAllRoutes()
const preloads = new Map()

// Read existing static-page copy so generated titles stay aligned with React.
for (const [path, component] of Object.entries({
  '/about': 'AboutPage', '/contact': 'ContactPage', '/blog': 'BlogPage',
  '/podcast': 'PodcastPage', '/shop': 'ShopPage', '/tools': 'ToolsPage',
  '/real-estate-branding': 'RealEstateBrandingLanding',
  '/law-firm-branding': 'LawFirmLanding', '/ai-healthcare-branding': 'AiHealthcareLanding', '/saas-branding': 'SaasBrandingLanding', '/luxury-branding': 'LuxuryBrandingLanding', '/cannabis-branding': 'CannabisBrandingLanding', '/consultancy-branding': 'ConsultancyBrandingLanding', '/saas-web-design': 'SaasWebDesignLanding', '/ai-startup-branding': 'AiStartupBrandingLanding',
  '/framer-designer': 'FramerDesignerLanding', '/webflow-designer': 'WebflowDesignerLanding', '/marketing-agency-branding': 'MarketingAgencyBrandingLanding',
  '/pricing': 'PricingPage',
  '/services': 'ServicesPage',
  '/services/brand-strategy': 'BrandStrategyPage',
  '/services/logo-design': 'LogoDesignPage',
  '/services/identity-systems': 'IdentitySystemsPage',
  '/services/web-design': 'WebDesignPage',
  '/services/web-development': 'WebDevelopmentPage',
  '/services/motion-graphics': 'MotionGraphicsPage',
})) {
  const source = await read(`../src/components/${component}.tsx`)
  const title = source.match(/<title>([^<{]+)<\/title>/)?.[1]?.replaceAll('&amp;', '&')
  const description = source.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1]
  metadata.set(path, { title, description, ...(path === '/real-estate-branding' ? { image: '/portfolio/identities/savory-bento.webp' } : {}) })
}
const work = await read('../src/components/WorkPage.tsx')
metadata.set('/work', { title: work.match(/const pageTitle = "([^"]+)"/)?.[1], description: work.match(/const pageDescription =\s*"([^"]+)"/)?.[1] })
const legal = await read('../src/components/LegalPage.tsx')
for (const match of legal.matchAll(/<LegalPage title="([^"]+)" updated="[^"]+" description="([^"]+)"/g)) {
  metadata.set(`/${match[1].toLowerCase().replaceAll(' ', '-')}`, { title: `${match[1]} | Ebaq Design`, description: match[2] })
}
metadata.set('/start', { title: 'Book a Call | Ebaq Design', description: 'Book a call with Arek Dvornechuck to discuss your branding, website, or motion design project.' })
// resolveFaqPairs uses the rendered faq field and never scans a roster post's unrendered body.
const blogSchemas = (post, path) => [buildBlogPostingSchema({ ...post, url: path }, siteUrl), buildFaqSchema(resolveFaqPairs(post, post.body || ''), `${siteUrl}${path}`), buildVideoSchema(post), buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path }], siteUrl)].filter(Boolean)
const podcastSchemas = (episode, path) => [buildPodcastEpisodeSchema({ ...episode, url: path }, siteUrl), buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Podcast', path: '/podcast' }, { name: episode.title, path }], siteUrl)]
for (const collection of ['blog', 'podcast']) {
  const index = await json(`../public/content/${collection}/index.json`)
  preloads.set(`/${collection}`, { [`${collection}-index`]: index })
  for (const { slug } of index) {
    const post = await json(`../public/content/${collection}/${slug}.json`)
    preloads.set(`/${collection}/${slug}`, { [`${collection}:${slug}`]: post })
    metadata.set(`/${collection}/${slug}`, { title: post.seo?.title || post.title, description: post.seo?.description || post.description, image: post.seo?.image || post.image?.src, type: 'article', schemas: collection === 'blog' ? blogSchemas(post, `/blog/${slug}`) : podcastSchemas(post, `/podcast/${slug}`) })
  }
}
const { caseStudies } = await loadData('../src/data/caseStudies.ts')
for (const study of caseStudies) metadata.set(`/work/${study.slug}`, { title: study.seo?.title || `${study.client} — ${study.title}`, description: study.seo?.description || study.summary, image: study.preview.src, schemas: [buildCaseStudySchema(study, siteUrl), buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }, { name: study.client, path: `/work/${study.slug}` }], siteUrl)] })
const { shopProducts } = await loadData('../src/data/shopProducts.ts')
for (const product of shopProducts) metadata.set(`/shop/${product.slug}`, { title: product.seo?.title ?? `${product.title} | Ebaq Design`, description: product.seo?.description ?? product.description, image: product.seo?.image || product.image, socialTitle: product.seo?.ogTitle, socialDescription: product.seo?.ogDescription, schemas: [buildProductSchema(product, siteUrl), buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop' }, { name: product.title, path: `/shop/${product.slug}` }], siteUrl)] })

const serializeData = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

// The prerendered text paints before any JavaScript runs, in these three faces. Preloading them lets the
// first paint use them, instead of a fallback font that reflows the page when they arrive.
const fontPreloads = (await readdir(new URL('assets/', outputDir)))
  .filter((file) => /^(?:roboto-latin-(?:400|600)|roboto-condensed-latin-600)-normal-[\w-]+\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
if (fontPreloads.length !== 3) throw new Error(`Expected 3 font files to preload, found ${fontPreloads.length}`)
const prerenderStats = { rendered: 0, failed: [] }

// Render the route with React so the static HTML carries the page's real content.
// A route that can't render on the server keeps the empty root and still works in the browser.
function prerender(path) {
  const preload = preloads.get(path) || {}
  const errors = console.error
  console.error = () => {}
  try {
    const { html: rendered, structuredData } = ssr.render(path, preload)
    // The live app replaces this markup, so media in it must not start downloading: no autoplay or
    // preload on video and audio, and embeds keep their URL in data-src.
    const quietMedia = (_, tag, attrs) => `<${tag}${attrs.replace(/\s(?:autoplay|preload)(?:="[^"]*")?/gi, '')} preload="none">`
    const html = rendered
      .replace(/<(video|audio)\b([^>]*)>/gi, quietMedia)
      .replace(/<iframe\b([^>]*?)\ssrc=/gi, '<iframe$1 data-src=')
    prerenderStats.rendered += 1
    const data = Object.keys(preload).length ? `<script type="application/json" id="route-data">${serializeData(preload)}</script>` : ''
    return { root: `<div id="root">${html}</div>${data}`, structuredData }
  } catch (error) {
    prerenderStats.failed.push(`${path}: ${error.message.split('\n')[0]}`)
    return { root: '<div id="root"></div>', structuredData: '' }
  } finally {
    console.error = errors
  }
}

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
    ...(meta.schemas || []).map((schema) => `<script data-rh="true" type="application/ld+json">${serializeJsonLd(schema)}</script>`),
  ]
  const { root, structuredData } = prerender(path)
  // Pages that declare their own JSON-LD in <Helmet> (landing and service pages) keep it in the static HTML too.
  if (!meta.schemas?.length && structuredData) tags.push(structuredData)
  tags.push(...fontPreloads)
  return shell.replace('</head>', () => `${tags.join('\n    ')}\n  </head>`).replace('<div id="root"></div>', () => root)
}
for (const path of paths) {
  const destination = join(outputDir.pathname, path)
  await mkdir(destination, { recursive: true })
  await writeFile(join(destination, 'index.html'), render(path, metadata.get(path)))
}
await writeFile(new URL('404.html', outputDir), render('/404', { title: 'Page not found | Ebaq Design', description: 'The page you requested could not be found.' }).replace('content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"', 'content="noindex,follow"'))

// Homepage: the site graph from siteFacts replaces the placeholder, then the page is prerendered like the rest.
const homeFaqs = [...facts.pricingFaqs.slice(0, 4), ...facts.studioFaqs]
const siteGraph = buildSiteGraph(facts, homeFaqs, new Date().toISOString().slice(0, 10))
const home = prerender('/')
await writeFile(new URL('index.html', outputDir), indexHtml
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  .replace('</head>', () => `  <script type="application/ld+json">${serializeJsonLd(siteGraph)}</script>\n    ${fontPreloads.join('\n    ')}\n  </head>`)
  .replace('<div id="root"></div>', () => home.root))

// llms.txt (summary) and llms-full.txt (everything an answer engine needs to describe and price the studio).
const { pricing, brandSprint, weekPlan, studio, founder, industries, pricingFaqs, studioFaqs, positioning, bookingUrl, services, tools } = facts
const list = (items) => items.map((item) => `- ${item}`).join('\n')
const faqText = [...pricingFaqs, ...studioFaqs].map(({ question, answer }) => `### ${question}\n\n${answer}`).join('\n\n')
const weekTable = ['| When | What | Price |', '| --- | --- | --- |', ...weekPlan.map((step) => `| ${step.weeks} | **${step.name}**: ${step.detail} | ${step.price} |`)].join('\n')
const serviceList = list(services.map((service) => `[${service.name}](${siteUrl}${service.path})`))
const llmsSummary = `# ${studio.name}

> ${positioning} ${pricing.summary} ${pricing.guarantee}

## Services

${serviceList}

Tools: ${tools.join(', ')}.

## Pricing (canonical)

- ${pricing.summary}
- ${pricing.guarantee}
- ${pricing.fixedTotal}
- Ongoing work: ${pricing.monthly} per month.

## Contact

- Location: ${studio.address.street}, ${studio.address.locality}, ${studio.address.region} ${studio.address.postalCode} (${studio.location})
- Book a 15-minute call: ${bookingUrl}
- Email: ${studio.email}
- Phone: ${studio.telephone}

## Key pages

- [Homepage](${siteUrl}/)
- [Services](${siteUrl}/services)
- [Pricing: $3,000 per week, brand identity in one week](${siteUrl}/pricing)
- [Work: case studies](${siteUrl}/work)
- [About Arek Dvornechuck, Branding Expert](${siteUrl}/about)
- [Real estate branding for agents, teams and brokers](${siteUrl}/real-estate-branding)
- [Law firm branding](${siteUrl}/law-firm-branding)
- [AI startup branding](${siteUrl}/ai-startup-branding)
- [AI healthcare branding](${siteUrl}/ai-healthcare-branding)
- [SaaS branding](${siteUrl}/saas-branding)
- [Luxury branding](${siteUrl}/luxury-branding)
- [Cannabis branding](${siteUrl}/cannabis-branding)
- [Consultancy branding](${siteUrl}/consultancy-branding)
- [Marketing agency branding](${siteUrl}/marketing-agency-branding)
- [SaaS and startup website design](${siteUrl}/saas-web-design)
- [Framer website design and development](${siteUrl}/framer-designer)
- [Webflow website design and development](${siteUrl}/webflow-designer)
- [Contact](${siteUrl}/contact)
- [Blog: branding, logo design, and web design articles](${siteUrl}/blog)
- [On Branding podcast: interviews with brand experts](${siteUrl}/podcast)
- [Full details for AI assistants](${siteUrl}/llms-full.txt)
- [Sitemap](${siteUrl}/sitemap.xml)

## Profiles

${list([...founder.sameAs, ...studio.sameAs.filter((url) => !founder.sameAs.includes(url))])}

Last updated: ${new Date().toISOString().slice(0, 10)}
`
const studies = caseStudies.map((study) => `### ${study.client} (${study.industry}, ${study.year})

${study.summary}

- Case study: ${siteUrl}/work/${study.slug}
${study.website ? `- Live website: ${study.website.href}\n` : ''}${study.deliverables?.length ? `- Deliverables: ${study.deliverables.join('; ')}\n` : ''}${study.testimonial ? `- Client quote: ${study.testimonial.quote} (${study.testimonial.name}, ${study.testimonial.position}, ${study.testimonial.companyName})\n` : ''}`).join('\n')
const llmsFull = `# ${studio.name}: full reference for AI assistants

> ${positioning}

## Pricing and guarantee

${pricing.summary} ${pricing.guarantee} ${pricing.fixedTotal}

${weekTable}

## Services

${serviceList}

Tools: ${tools.join(', ')}.

## The Brand Sprint (week 1)

${brandSprint.description} ${brandSprint.duration}, ${brandSprint.price}.

${list(brandSprint.deliverables)}

## Who it's for

${list(industries)}

- Real estate branding for agents, teams and brokerages: ${siteUrl}/real-estate-branding
- Featured real estate project: Savory, a Brooklyn team at Compass: ${siteUrl}/work/savory

## The designer

${founder.name}, ${founder.jobTitle.toLowerCase()} based in ${studio.location}, with ${founder.experience} of experience. He worked at ${founder.formerStudio.name} in ${founder.formerStudio.year}. Every project is designed by him directly, with no junior hand-off. He also built guidelines.online, where client brand guidelines are delivered as a live website instead of a PDF.

Skills: ${founder.knowsAbout.join(', ')}.

## Case studies

${studies}
## Frequently asked questions

${faqText}

## Contact

- ${studio.address.street}, ${studio.address.locality}, ${studio.address.region} ${studio.address.postalCode}
- Book a call: ${bookingUrl}
- Email: ${studio.email} · Phone: ${studio.telephone}
- Website: ${siteUrl}/

Last updated: ${new Date().toISOString().slice(0, 10)}
`
await writeFile(new URL('llms.txt', outputDir), llmsSummary)
await writeFile(new URL('llms-full.txt', outputDir), llmsFull)

console.log(`Generated metadata for ${paths.length} public routes, the homepage, 404.html, llms.txt and llms-full.txt.`)
console.log(`Prerendered ${prerenderStats.rendered} routes${prerenderStats.failed.length ? `; ${prerenderStats.failed.length} kept an empty root:\n  ${prerenderStats.failed.join('\n  ')}` : '.'}`)
