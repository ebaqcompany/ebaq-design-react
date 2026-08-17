import { legacyIncludedContents } from '../data/legacyIncludedContents'

export function LegacyProductIncluded({ slug }: { slug: string }) {
  const groups = legacyIncludedContents[slug]
  if (!groups) return null

  return (
    <section className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">In this {slug === 'guidelines-kit' ? 'kit' : slug === 'brand-archetypes' ? 'course' : 'guide'}</p>
          <h2>What's Included</h2>
        </div>
        <div className="grid gap-20 md:gap-28">
          {groups.map((group) => (
            <article key={group.title} className="grid gap-10 xl:grid-cols-[0.28fr_0.72fr] xl:items-start xl:gap-16">
              <div className="xl:sticky xl:top-32">
                <h3>{group.title}</h3>
                {group.description && <p className="mt-5 leading-relaxed text-white/75">{group.description}</p>}
              </div>
              <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {group.images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${group.title} preview ${index + 1}`}
                    loading="lazy"
                    className={slug === 'brand-archetypes' && group.title === '300+ Page Presentation Deck'
                      ? 'col-span-2 h-auto w-full object-contain sm:col-span-3 lg:col-span-5 xl:col-span-2'
                      : index === 0 ? 'col-span-2 row-span-2 h-auto w-full object-contain' : 'h-auto w-full object-contain'}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
