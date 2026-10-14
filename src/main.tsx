import { StrictMode, useLayoutEffect, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import { AppRoutes } from './AppRoutes.tsx'
import { PRELOAD_ELEMENT_ID, setPreloadedData } from './content/preload.ts'

const rootElement = document.getElementById('root')!
const preload = document.getElementById(PRELOAD_ELEMENT_ID)
if (preload?.textContent) setPreloadedData(JSON.parse(preload.textContent))

// The build prerenders each route into #root for crawlers that don't run JavaScript, and keeps
// that markup hidden. createRoot replaces it with the live app, which is revealed once mounted.
const RevealPrerender = ({ children }: { children: ReactNode }) => {
  useLayoutEffect(() => rootElement.removeAttribute('data-prerendered'), [])
  return children
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <RevealPrerender>
          <AppRoutes />
        </RevealPrerender>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
