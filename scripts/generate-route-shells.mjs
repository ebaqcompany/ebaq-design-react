import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const outputDir = new URL('../dist/', import.meta.url)
const indexHtml = await readFile(new URL('index.html', outputDir), 'utf8')
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const paths = [...sitemap.matchAll(/<loc>https:\/\/ebaqdesign\.com([^<]*)<\/loc>/g)]
  .map(([, path]) => path)
  .filter((path) => path !== '/')

for (const path of paths) {
  const destination = join(outputDir.pathname, path, 'index.html')
  const canonicalUrl = `https://www.ebaqdesign.com${path}`
  const routeHtml = indexHtml
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, routeHtml)
}

await writeFile(new URL('404.html', outputDir), indexHtml)
console.log(`Generated ${paths.length} public route shells and 404.html.`)
