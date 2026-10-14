import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { AppRoutes } from './AppRoutes.tsx'
import { setPreloadedData } from './content/preload.ts'

// Build-time prerender: scripts/generate-route-shells.mjs renders every public route into
// its static HTML, so crawlers that don't run JavaScript (most AI search bots) get real content.
export function render(url: string, preload: Record<string, unknown> = {}) {
  setPreloadedData(preload)
  const helmetContext: { helmet?: HelmetServerState } = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  )
  setPreloadedData({})
  return { html, structuredData: helmetContext.helmet?.script.toString() ?? '' }
}

// Data the build script also needs for structured data and the llms files.
export { caseStudies } from './data/caseStudies.ts'
export * as siteFacts from './content/siteFacts.ts'
