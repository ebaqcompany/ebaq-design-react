import { services } from "../data/services";
import { JasperReferenceArtwork } from "./JasperReferenceArtwork";

// Relume Layout 235, using the approved animated service artwork.
export const ServicesGrid = () => (
  <section id="services-geometric-comparison" data-services-option="geometric" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Services</p>
        <h1 className="mb-5 text-balance md:mb-6">Six brand services. One expert partner.</h1>
        <p className="mx-auto max-w-sm md:text-md">From strategy and identity to websites and motion. Work directly with Arek on the full project or the part you need.</p>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
        {services.map((service) => (
          <a href={service.url} aria-labelledby={`service-link-${service.slug}`} key={service.slug} id={`geometric-${service.slug}`} data-service={service.slug} data-surface="white" className="service-card text-black no-underline motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary relative flex flex-col overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-[''] hover:after:border-brand-primary focus-visible:after:border-brand-primary">
            {service.slug === "brand-strategy" ? <JasperReferenceArtwork slug={service.slug} /> : (
              <div data-tone="light" data-art="vector" className="service-artwork bg-brand-grid relative aspect-[3/2] w-full overflow-hidden">
                <picture>
                  <source media="(prefers-reduced-motion: reduce)" srcSet={`/images/services/animations/${service.slug}-still.webp`} />
                  <img src={`/images/services/animations/${service.slug}.webp`} alt={`${service.heading} illustration`} width={720} height={480} loading="lazy" decoding="async" className="absolute inset-0 block size-full object-contain" />
                </picture>
              </div>
            )}
            <div className="flex grow flex-col p-6 md:p-8">
              <div className="mb-3 flex items-center justify-between gap-4 text-brand-primary">
                <p id={`service-link-${service.slug}`} className="font-mono text-sm font-normal uppercase tracking-wide">{service.heading}</p>
              </div>
              <h2 className="mb-3 font-bold md:mb-4 heading-h5">{service.cardTitle}</h2>
              <p>{service.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
