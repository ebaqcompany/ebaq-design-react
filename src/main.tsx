import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
// Self-hosted fonts: the same weights the Google Fonts link loaded, minus the render-blocking third-party request.
import './fonts.css'
import './index.css'
import { AppRoutes, preloadRoute } from './AppRoutes.tsx'
import { PRELOAD_ELEMENT_ID, setPreloadedData } from './content/preload.ts'
import { installConversionAttribution } from './conversionAttribution.ts'

installConversionAttribution()

const rootElement = document.getElementById('root')!
const preload = document.getElementById(PRELOAD_ELEMENT_ID)
if (preload?.textContent) setPreloadedData(JSON.parse(preload.textContent))

// Start fetching a page's code as soon as a visitor points at (or touches) a link to it.
const preloadLinkTarget = (event: Event) => {
  const link = (event.target as Element | null)?.closest?.('a[href^="/"]')
  if (link) void preloadRoute(new URL((link as HTMLAnchorElement).href).pathname)
}
for (const type of ['pointerover', 'touchstart', 'focusin']) document.addEventListener(type, preloadLinkTarget, { passive: true })

// Article video thumbnails (youtubeFacade in content/richText.ts) become the real player on click.
document.addEventListener('click', (event) => {
  const facade = (event.target as Element | null)?.closest?.<HTMLElement>('.youtube-facade[data-youtube-id]')
  if (!facade) return
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.youtube-nocookie.com/embed/${facade.dataset.youtubeId}?autoplay=1&rel=0`
  iframe.title = facade.dataset.title || 'YouTube video'
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
  iframe.allowFullscreen = true
  iframe.className = 'youtube-facade-frame'
  facade.replaceWith(iframe)
  iframe.focus()
})

// The build prerenders each route into #root, so the page is readable (and crawlable) before any
// JavaScript runs. createRoot swaps that markup for the live app in its first commit; mounting only
// once this page's chunk is in makes that first commit the complete page, not a blank fallback.
preloadRoute(window.location.pathname).finally(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>,
  )
})
