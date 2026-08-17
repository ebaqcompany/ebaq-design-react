import { Helmet } from 'react-helmet-async'
import { Navbar16 } from './Navbar16'
import { Footer15 } from './Footer15'
import { getShopProduct, type ShopProduct } from '../data/shopProducts'
import { useEffect } from 'react'
import { Testimonial1 } from './Testimonial1'
import { Cta17 } from './Cta17'
import { StrategyGuideContents } from './StrategyGuideContents'
import { CreativeSuiteContents, CreativeSuiteFeatureSequence, CreativeSuiteProof } from './CreativeSuiteSections'
import { LegacyProductIncluded } from './LegacyProductIncluded'

const legacyIncludedContentsSlugs = ['naming-guide', 'guidelines-kit', 'storytelling-guide', 'brand-archetypes']

function StorySection({ product }: { product: ShopProduct }) {
  if (!product.story) return null
  if (product.story.videos && product.story.profileImage) {
    return (
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">{product.story.eyebrow}</p>
            <h2>{product.story.heading}</h2>
          </div>
          <div className="mx-auto grid max-w-6xl gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:items-start xl:gap-20">
            <div className="flex flex-col items-center text-center">
              <img src={product.story.profileImage} alt="Arek Dvornechuck" className="size-32 object-contain" />
              <div className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-neutral-700">
                {product.story.body.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="mt-7 font-handwriting text-handwriting font-medium tracking-handwriting text-brand-primary">{product.story.byline}</p>
            </div>
            <div className="grid gap-10">
              {product.story.videos.map((video) => (
                <article key={video.wistiaId} className="grid gap-6">
                  <h3 className="heading-h5">{video.title}</h3>
                  <div className="aspect-video overflow-hidden bg-black">
                    <iframe
                      src={`https://fast.wistia.net/embed/iframe/${video.wistiaId}`}
                      title={video.title}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      className="size-full border-0"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">{product.story.eyebrow}</p>
        <h2>{product.story.heading}</h2>
        {product.story.profileImage && <img src={product.story.profileImage} alt="Arek Dvornechuck" className="mx-auto mt-8 size-28 object-contain" />}
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-neutral-700">{product.story.body}</p>
        <p className="mt-6 font-semibold">{product.story.byline}</p>
      </div>
    </section>
  )
}

function ProductLandingPage({ product }: { product: ShopProduct }) {
  const legacyRestorationSlugs = [...legacyIncludedContentsSlugs, 'one-page-style-guide']
  const usesLegacyRestorationLayout = legacyRestorationSlugs.includes(product.slug)
  const canonicalUrl = `https://ebaqdesign.com/shop/${product.slug}`
  const seoTitle = product.seo?.title ?? `${product.title} | Ebaq Design`
  const seoDescription = product.seo?.description ?? product.description
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const socialMeta = product.seo ? [
      ['meta[property="og:title"]', product.seo.ogTitle],
      ['meta[property="og:description"]', product.seo.ogDescription],
      ['meta[property="og:image"]', product.seo.image],
      ['meta[name="twitter:title"]', product.seo.ogTitle],
      ['meta[name="twitter:description"]', product.seo.ogDescription],
      ['meta[name="twitter:image"]', product.seo.image],
    ] as const : []
    const previousSocial = socialMeta.map(([selector]) => document.querySelector<HTMLMetaElement>(selector)?.content)
    const previous = canonical?.href
    const previousDescription = description?.content
    if (canonical) canonical.href = canonicalUrl
    if (description) description.content = seoDescription
    socialMeta.forEach(([selector, content]) => {
      const meta = document.querySelector<HTMLMetaElement>(selector)
      if (meta) meta.content = content
    })
    return () => {
      if (canonical && previous) canonical.href = previous
      if (description && previousDescription) description.content = previousDescription
      socialMeta.forEach(([selector], index) => {
        const meta = document.querySelector<HTMLMetaElement>(selector)
        if (meta && previousSocial[index]) meta.content = previousSocial[index]
      })
    }
  }, [canonicalUrl, product.seo, seoDescription])

  return (
    <div className="relative bg-white text-black">
      <Helmet><title>{seoTitle}</title><meta name="description" content={seoDescription} /><link rel="canonical" href={canonicalUrl} />{product.seo && <meta property="og:title" content={product.seo.ogTitle} />}{product.seo && <meta property="og:description" content={product.seo.ogDescription} />}{product.seo && <meta property="og:image" content={product.seo.image} />}{product.seo && <meta name="twitter:title" content={product.seo.ogTitle} />}{product.seo && <meta name="twitter:description" content={product.seo.ogDescription} />}{product.seo && <meta name="twitter:image" content={product.seo.image} />}</Helmet>
      <Navbar16 />
      <main>
        <header className="px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container">
            <div className="grid items-center gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:gap-20">
              <div className="flex flex-col items-center text-center xl:order-last">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">{product.eyebrow}</p>
                <h1>{product.heroHeading ?? product.title}</h1>
                <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-neutral-600">{product.description}</p>
                <div className="mt-7 flex items-baseline gap-3"><span className="text-3xl font-semibold text-brand-primary">{product.price}</span>{product.oldPrice && <del className="text-3xl font-semibold text-black">{product.oldPrice}</del>}</div>
                <a href={product.checkoutUrl} className="button-primary mt-7 inline-flex min-h-14 items-center justify-center px-8 font-semibold">Buy now</a>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-500">{product.note}</p>
              </div>
              <div className="overflow-hidden bg-neutral-100 xl:order-first"><img src={product.image} alt={product.title} className={product.heroMediaContain ? 'h-auto w-full object-contain' : 'aspect-[4/3] size-full object-cover'} /></div>
            </div>
          </div>
        </header>

        {product.introTestimonial ? (
          <Testimonial1
            showLogo={false}
            quote={product.introTestimonial.quote}
            avatar={{ src: product.introTestimonial.avatar, alt: product.introTestimonial.name }}
            name={product.introTestimonial.name}
            position=""
            companyName=""
          />
        ) : (
          <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div><p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">{product.problemEyebrow}</p><h2>{product.problemHeading}</h2></div>
              <ul className={product.slug === 'creative-suite' || usesLegacyRestorationLayout ? 'grid gap-5' : 'grid gap-0 border-t border-black/20'}>
                {product.benefits.map((benefit, index) => <li key={benefit} className={product.slug === 'creative-suite' || usesLegacyRestorationLayout ? 'grid grid-cols-[2.5rem_1fr] gap-3 py-2 text-lg' : 'grid grid-cols-[2.5rem_1fr] gap-3 border-b border-black/20 py-5 text-lg'}><span className="font-semibold text-brand-primary">0{index + 1}</span><span>{benefit}</span></li>)}
              </ul>
            </div>
          </section>
        )}

        {!product.streamlinedContent && !product.storyAfterIncluded && <StorySection product={product} />}

        {!product.streamlinedContent && product.slug !== 'creative-suite' && <section className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
          <div className="container"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">How it works</p><h2>Set yourself up for success</h2></div><div className="grid gap-8 md:grid-cols-3">{product.steps.map((step, index) => <div key={step} className="border-t border-white/30 pt-6"><span className="text-4xl font-semibold text-brand-primary">{index + 1}.</span><p className="mt-5 text-lg leading-relaxed text-white/75">{step}</p></div>)}</div></div>
        </section>}

        {!product.streamlinedContent && product.slug !== 'creative-suite' && !product.hideBaseFeature && <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className={product.slug === 'strategy-guide' || usesLegacyRestorationLayout ? 'container grid items-center gap-10 xl:grid-cols-2 xl:gap-20' : 'container grid items-center gap-10 lg:grid-cols-2 lg:gap-20'}>
            <div className={product.slug === 'strategy-guide' ? 'xl:order-2' : undefined}><p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">Built for real projects</p><h2>{product.featureHeading}</h2><p className="mt-6 text-lg leading-relaxed text-neutral-600">{product.featureDescription}</p><ul className="mt-7 space-y-3">{product.featureBullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="text-brand-primary">●</span><span>{bullet}</span></li>)}</ul></div>
            <img src={product.featureImage ?? product.gallery[0]} alt="" className={product.slug === 'strategy-guide' || usesLegacyRestorationLayout ? 'h-auto w-full bg-neutral-100 object-contain' : 'aspect-[4/3] size-full bg-neutral-100 object-cover'} />
          </div>
        </section>}

        {product.slug !== 'creative-suite' && product.detailSections?.map((section, index) => (
          <section key={section.title} className={product.slug === 'strategy-guide' ? (section.title === 'Access to Branding.study' ? 'bg-black px-[5%] py-16 text-white md:py-24 lg:py-28' : index % 2 ? 'px-[5%] py-16 md:py-24 lg:py-28' : 'bg-brand-light px-[5%] py-16 md:py-24 lg:py-28') : usesLegacyRestorationLayout ? (index % 2 ? 'bg-brand-light px-[5%] py-16 md:py-24 lg:py-28' : 'px-[5%] py-16 md:py-24 lg:py-28') : (index % 2 ? 'bg-neutral-100 px-[5%] py-16 md:py-24 lg:py-28' : 'px-[5%] py-16 md:py-24 lg:py-28')}>
            <div className={product.slug === 'strategy-guide' || usesLegacyRestorationLayout ? 'container grid items-center gap-10 xl:grid-cols-2 xl:gap-20' : 'container grid items-center gap-10 lg:grid-cols-2 lg:gap-20'}>
              <div className={index % 2 ? (product.slug === 'strategy-guide' || usesLegacyRestorationLayout ? 'xl:order-2' : 'lg:order-2') : undefined}>
                <h2>{section.title}</h2>
                <p className={product.slug === 'strategy-guide' && section.title === 'Access to Branding.study' ? 'mt-6 text-lg leading-relaxed text-white/75' : 'mt-6 text-lg leading-relaxed text-neutral-600'}>{section.description}</p>
                <ul className="mt-7 space-y-3">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="text-brand-primary">●</span><span>{bullet}</span></li>)}</ul>
              </div>
              <div className={`relative ${index % 2 ? (product.slug === 'strategy-guide' ? 'xl:order-1' : 'lg:order-1') : ''}`}>
                <img src={section.image} alt="" className={product.slug === 'strategy-guide' || usesLegacyRestorationLayout ? 'h-auto w-full bg-neutral-100 object-contain' : 'aspect-[4/3] size-full bg-neutral-100 object-cover'} />
                {product.slug === 'strategy-guide' && section.title === 'Worksheets in various formats' && (
                  <img
                    src="https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/637fb2a21fadf1080bff469d_replace%20logo%20strategy%20worksheets%20trimmed%20zoomed%20optimized.gif"
                    alt="Preview of replacing the logo in the Strategy Worksheets"
                    className="mt-4 h-auto w-32 object-contain sm:w-40 xl:absolute xl:-left-6 xl:top-16 xl:mt-0 xl:w-52"
                  />
                )}
              </div>
            </div>
          </section>
        ))}

        {product.slug === 'creative-suite' && <CreativeSuiteFeatureSequence product={product} />}

        {!product.streamlinedContent && product.slug === 'strategy-guide' ? <StrategyGuideContents /> : product.slug === 'creative-suite' ? <CreativeSuiteContents /> : legacyIncludedContentsSlugs.includes(product.slug) ? <LegacyProductIncluded slug={product.slug} /> : !product.streamlinedContent && <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">What’s included</p><h2>{product.includedHeading}</h2><p className="mt-6 text-lg leading-relaxed text-neutral-600">{product.includedDescription}</p></div><div className="grid items-start gap-6 md:grid-cols-3">{product.gallery.map((image, index) => <img key={image} src={image} alt={`${product.title} preview ${index + 1}`} className={usesLegacyRestorationLayout ? 'h-auto w-full bg-neutral-100 object-contain' : 'aspect-[4/3] size-full bg-neutral-100 object-cover'} />)}</div></div>
        </section>}

        {!product.streamlinedContent && product.storyAfterIncluded && (product.slug === 'creative-suite' ? <CreativeSuiteProof product={product} /> : <StorySection product={product} />)}

        {product.audience && (
          <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container">
              <div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">{product.audience.eyebrow}</p><h2>{product.audience.heading}</h2></div>
              {product.audience.items ? (
                <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
                  {product.audience.items.map((item) => (
                    <li key={item.title} className={product.slug === 'creative-suite' || usesLegacyRestorationLayout ? 'pb-6' : 'border-b border-black pb-6'}>
                      <h3 className="heading-h5">{item.title}</h3>
                      <p className="mt-4 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ul>
              ) : product.audience.cards ? (
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">
                  {product.audience.cards.map((card) => (
                    <article key={card.title} className="flex flex-col items-center bg-white p-6 text-center md:p-8">
                      <h3 className="heading-h5">{card.title}</h3>
                      <img src={card.image} alt="" className="mt-6 h-auto w-full max-w-md object-contain" />
                      <p className="mt-4 max-w-md text-lg leading-relaxed">{card.description}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={usesLegacyRestorationLayout ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-px overflow-hidden border border-black bg-black sm:grid-cols-2 lg:grid-cols-3'}>{product.audience.groups.map((group) => <div key={group} className={usesLegacyRestorationLayout ? 'p-6 text-center text-lg font-semibold md:p-8' : 'bg-white p-6 text-center text-lg font-semibold md:p-8'}>{group}</div>)}</div>
              )}
            </div>
          </section>
        )}

        {product.testimonials && (
          <section className="px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">Testimonials</p><h2>What people say</h2><p className="mt-6 text-lg text-neutral-600">Still not convinced?—Don’t take my word for it! Check out some of the emails and social media messages I get from people who enjoyed this course.</p></div><div className="columns-2 gap-4 md:columns-3 lg:columns-4">{product.testimonials.map((image, index) => <img key={image} src={image} alt={`Customer testimonial ${index + 1}`} loading="lazy" className="mb-4 w-full break-inside-avoid" />)}</div></div>
          </section>
        )}

        {product.finalCta ? (
          <Cta17
            heading={product.finalCta.heading}
            description={product.finalCta.description}
            price={product.price}
            oldPrice={product.oldPrice}
            buttons={[{ title: 'Buy Now', href: product.checkoutUrl, external: true }]}
          />
        ) : (
          <section className="bg-brand-primary px-[5%] py-16 text-center md:py-20"><div className="mx-auto max-w-3xl"><h2>{product.featureHeading}</h2><p className="mx-auto mt-5 max-w-xl text-lg">{product.description}</p><a href={product.checkoutUrl} className="button-inverted button-inverted--brand-surface mt-7">Buy now — {product.price}</a></div></section>
        )}
      </main>
      <Footer15 logo={{ url: '/', src: '/ebaq-mark-one-color.svg', alt: 'Ebaq Design' }} />
    </div>
  )
}

const productPage = (slug: string) => {
  const product = getShopProduct(slug)
  if (!product) throw new Error(`Missing static Shop product: ${slug}`)
  return function StaticProductPage() { return <ProductLandingPage product={product} /> }
}

export const StrategyGuidePage = productPage('strategy-guide')
export const NamingGuidePage = productPage('naming-guide')
export const ProposalTemplatePage = productPage('proposal-template')
export const GuidelinesKitPage = productPage('guidelines-kit')
export const BrandMasterPage = productPage('brand-master')
export const StorytellingGuidePage = productPage('storytelling-guide')
export const CreativeSuitePage = productPage('creative-suite')
export const BrandArchetypesPage = productPage('brand-archetypes')
export const OnePageStyleGuidePage = productPage('one-page-style-guide')
