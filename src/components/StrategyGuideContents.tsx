import { strategyGuideContents } from '../data/strategyGuideContents'

export function StrategyGuideContents() {
  return (
    <section className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-16 max-w-3xl md:mb-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-primary">In this guide</p>
          <h2>What’s Included</h2>
        </div>
        <div className="grid gap-24 md:gap-28">
          {strategyGuideContents.map((group) => (
            <section key={group.title} className="grid items-start gap-10 xl:grid-cols-[0.28fr_0.72fr] xl:gap-16">
              <div className="xl:sticky xl:top-32">
                <h3 className="heading-h4">{group.title}</h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">{group.description}</p>
                {group.note && <p className="mt-4 text-sm text-white/75">* <a href={group.note.href} target="_blank" rel="noreferrer" className="text-white">{group.note.label}</a></p>}
              </div>
              <div className={group.title === 'Book of Prompts (NEW!)' ? 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6' : 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6'}>
                {group.images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${group.title} preview ${index + 1}`}
                    loading="lazy"
                    className={`h-auto w-full object-contain ${index === 0 && group.title !== '13 Video Tutorials' ? 'col-span-2 row-span-2' : ''}`}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
