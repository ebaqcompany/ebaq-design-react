import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { setupFooterLogoGame } from './footerLogoGame'

export function NotFoundPage() {
  const requestedUrl = window.location.href
  const surfaceRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (canonical) canonical.href = requestedUrl
    if (robots) robots.content = 'noindex,nofollow'
    if (description) description.content = 'The page you requested could not be found.'
  }, [requestedUrl])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(media.matches)
    updatePreference()
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const root = logoRef.current
    const surface = surfaceRef.current
    if (!root || !surface || reduceMotion) return
    return setupFooterLogoGame({
      root,
      footer: surface,
      src: '/ebaqdesign-logo-footer.svg',
      autoStartDelay: 1100,
      wordmarkColor: '#000000',
    })
  }, [reduceMotion])

  useEffect(() => {
    if (!reduceMotion) return
    const redirectTimer = window.setTimeout(() => window.location.assign('/'), 1800)
    return () => window.clearTimeout(redirectTimer)
  }, [reduceMotion])

  return (
    <section ref={surfaceRef} className="relative h-[100svh] overflow-hidden bg-white text-black">
      <Helmet>
        <title>Page not found | Ebaq Design</title>
        <meta name="description" content="The page you requested could not be found." />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href={requestedUrl} />
      </Helmet>
      <div className="pointer-events-none absolute inset-x-[5%] top-8 z-10 text-center md:top-12">
        <p className="mb-3 inline-block scale-125 font-heading text-10xl font-semibold leading-none text-brand-primary md:mb-4">404</p>
        <h1 className="heading-h3">A few screws are loose</h1>
        <div className="pointer-events-auto mt-5">
          <Link className="button-inverted" to="/">Homepage</Link>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-[7%] pt-24" role="img" aria-label={reduceMotion ? 'Ebaq Design logo' : 'Interactive Ebaq Design logo pieces that can be dragged and thrown'}>
        {reduceMotion ? (
          <img src="/ebaqdesign-logo-bold.svg" alt="Ebaq Design" className="w-full max-w-5xl" />
        ) : (
          <div ref={logoRef} className="aspect-[566.93/155.96817] w-full max-w-5xl touch-none" aria-hidden="true" />
        )}
      </div>
    </section>
  )
}
