import { services } from "../data/services";
import { ServiceArtwork } from "./ServiceArtwork";

const benefitHeadlines = [
  "Find your brand’s direction",
  "Design an iconic logo",
  "Build a recognizable brand",
  "Make a stronger first impression",
  "Launch a website that works",
  "Bring your brand to life",
];

// Relume Layout 235, adapted to square artwork and the site's service copy.
export const ServicesGrid = () => {
  return (
  <section id="services-hero" className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Services</p>
        <h1 className="mb-5 text-balance md:mb-6">Six brand services. One expert partner.</h1>
        <p className="mx-auto max-w-sm md:text-md">From strategy and identity to websites and motion. Work directly with me on the full project or the part you need.</p>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
        {services.map((service, index) => (
          <article key={service.slug} className="service-card relative flex flex-col overflow-hidden rounded-xl transition-colors duration-200 ease-out motion-reduce:transition-none after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
            <div className="flex grow flex-col">
            <ServiceArtwork slug={service.slug} />
            <div className="grow p-6 md:p-8">
            <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary">{service.heading}</p>
            <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl">{benefitHeadlines[index]}</h2>
            <p>{service.description}</p>
            </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};
