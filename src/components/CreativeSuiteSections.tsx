import type { ShopProduct } from '../data/shopProducts'
import { creativeSuiteContents } from '../data/creativeSuiteContents'

const eyebrowClass = 'mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary'

export function CreativeSuiteFeatureSequence({ product }: { product: ShopProduct }) {
  const features = [
    {
      title: product.featureHeading,
      description: product.featureDescription,
      bullets: product.featureBullets,
      image: product.featureImage ?? product.gallery[0],
      secondaryImage: product.featureSecondaryImage,
    },
    ...(product.detailSections ?? []),
  ]

  return (
    <>
      {features.map((feature, index) => (
        <section key={feature.title} className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container grid items-center gap-10 xl:grid-cols-2 xl:gap-20">
            <div className={index % 2 ? 'xl:order-2' : undefined}>
              <h2>{feature.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">{feature.description}</p>
              <ul className="mt-7 space-y-3">
                {feature.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="text-brand-primary">●</span><span>{bullet}</span></li>)}
              </ul>
            </div>
            <div className={`relative ${index % 2 ? 'xl:order-1' : ''}`}>
              <img src={feature.image} alt="" className="h-auto w-full bg-neutral-100 object-contain" />
              {feature.secondaryImage && <img src={feature.secondaryImage} alt="" className="mt-4 h-auto w-32 object-contain sm:w-40 xl:absolute xl:bottom-6 xl:right-0 xl:mt-0 xl:w-52" />}
            </div>
          </div>
        </section>
      ))}
      <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className={eyebrowClass}>How it works</p>
            <h2>Set yourself up for success!</h2>
          </div>
          <ol className="grid gap-10 md:grid-cols-3">
            {product.steps.map((step, index) => <li key={step}><span className="text-4xl font-semibold text-brand-primary">{index + 1}.</span><p className="mt-5 text-lg leading-relaxed">{step}</p></li>)}
          </ol>
        </div>
      </section>
    </>
  )
}

export function CreativeSuiteContents() {
  return (
    <section className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <p className={eyebrowClass}>In this bundle</p>
          <h2>What's Included</h2>
        </div>
        <div className="grid gap-20 md:gap-28">
          {creativeSuiteContents.map((group) => (
            <article key={group.title} className="grid gap-10 xl:grid-cols-[0.28fr_0.72fr] xl:items-start xl:gap-16">
              <div className="xl:sticky xl:top-32">
                <h3>{group.title}</h3>
                <p className="mt-5 leading-relaxed text-white/75">{group.description}</p>
              </div>
              <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {group.images.map((image, index) => <img key={image} src={image} alt={`${group.title} preview ${index + 1}`} loading="lazy" className={index === 0 ? 'col-span-2 row-span-2 h-auto w-full object-contain' : 'h-auto w-full object-contain'} />)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CreativeSuiteProof({ product }: { product: ShopProduct }) {
  if (!product.story) return null
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-5xl text-center">
        <img src="https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/5de8003e154e7e4d116936f5_arek-dvornechuck-profile-pic-320.jpg" alt="Arek Dvornechuck" className="mx-auto size-28 object-contain" />
        <blockquote className="mx-auto mt-8 max-w-4xl text-2xl leading-relaxed md:text-3xl">“{product.story.body}”</blockquote>
        <p className="mt-6 font-semibold">{product.story.byline}</p>
        <img src={product.gallery[0]} alt={`${product.title} complete bundle`} className="mt-12 h-auto w-full object-contain" />
      </div>
    </section>
  )
}
