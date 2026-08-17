import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Navbar16 } from './Navbar16'
import { Footer15 } from './Footer15'
import { shopProducts, shopTestimonials } from '../data/shopProducts'
import { useEffect } from 'react'
import { RotatingProjectPreview, type ProjectPreviewImage } from './RotatingProjectPreview'

const productPreviewImages = (product: (typeof shopProducts)[number]): ProjectPreviewImage[] => {
  const sources = [
    product.cardImage,
    product.image,
    ...product.gallery,
    ...(product.detailSections?.map((section) => section.image) ?? []),
  ]
  return [...new Set(sources)].map((src) => ({ src, alt: product.title }))
}

export function ShopPage() {
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = canonical?.href
    const previousDescription = description?.content
    if (canonical) canonical.href = 'https://ebaqdesign.com/shop'
    if (description) description.content = 'Practical branding guides, courses and templates for creative professionals and business owners.'
    return () => {
      if (canonical && previous) canonical.href = previous
      if (description && previousDescription) description.content = previousDescription
    }
  }, [])

  return (
    <div className="relative bg-white text-black">
      <Helmet><title>Branding Resources | Ebaq Design</title><meta name="description" content="Practical branding guides, courses and templates for creative professionals and business owners." /><link rel="canonical" href="https://ebaqdesign.com/shop" /></Helmet>
      <Navbar16 />
      <main>
        <header className="px-[5%] pb-12 pt-16 text-center md:pb-16 md:pt-24 lg:pb-20 lg:pt-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 font-semibold md:mb-4">Shop secret sauce</p>
            <h1>Branding Resources</h1>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-neutral-600">Whether you are a creative professional or a business owner, we have content that can give you the edge over your competitors.</p>
          </div>
        </header>

        <section className="px-[5%] pb-20 md:pb-28 lg:pb-32">
          <div className="container grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {shopProducts.filter((product) => product.published !== false && product.slug !== 'proposal-template').map((product) => (
              <article key={product.slug} className="group flex size-full flex-col items-start justify-start">
                <RotatingProjectPreview
                  image={{ src: product.cardImage, alt: product.title }}
                  images={productPreviewImages(product)}
                  url={`/shop/${product.slug}`}
                  useRouterLink
                  className="mb-6 aspect-video w-full bg-background-secondary"
                  imageClassName="transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="flex w-full grow flex-col items-start justify-start">
                  <Link className="heading-link mb-3" to={`/shop/${product.slug}`}><h2 className="heading-h5">{product.title}</h2></Link>
                  <div className="flex items-baseline gap-3">
                    <p className="font-semibold text-brand-primary">{product.price}</p>
                    {product.oldPrice && <del className="font-semibold text-black">{product.oldPrice}</del>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-3 font-semibold md:mb-4">Testimonials</p><h2>What people say</h2><p className="mt-6">Still not convinced?—Don’t take my word for it! Check out some of the emails and social media messages I get from people who enjoyed my courses.</p></div><div className="columns-2 gap-4 md:columns-3 lg:columns-4">{shopTestimonials.map((image, index) => <img key={image} src={image} alt={`Customer testimonial ${index + 1}`} loading="lazy" className="mb-4 w-full break-inside-avoid" />)}</div></div>
        </section>
      </main>
      <Footer15 logo={{ url: '/', src: '/ebaq-mark-one-color.svg', alt: 'Ebaq Design' }} />
    </div>
  )
}
