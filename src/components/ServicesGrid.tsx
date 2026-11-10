import { services } from "../data/services";
import { JasperReferenceArtwork } from "./JasperReferenceArtwork";

const benefitHeadlines = [
  "Define your positioning",
  "Design an iconic logo",
  "Create a design system",
  "Create a beautiful website",
  "Launch a website that works",
  "Bring your brand to life",
];

const artworkFiles = {
  "logo-design": "logo-design-shape-picker-candidate",
  "brand-design": "brand-design-color-picker-candidate",
  "web-design": "web-design-animated",
  "web-development": "web-development-code-resize-candidate",
  "motion-graphics": "motion-graphics-animated",
};

// Relume Layout 235, using the approved animated service artwork.
export const ServicesGrid = () => (
  <section id="services-geometric-comparison" data-services-option="geometric" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Services</p>
        <h1 className="mb-5 text-balance md:mb-6">Six brand services. One expert partner.</h1>
        <p className="mx-auto max-w-sm md:text-md">From strategy and identity to websites and motion. Work directly with me on the full project or the part you need.</p>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12">
        {services.map((service, index) => (
          <article key={service.slug} id={`geometric-${service.slug}`} data-service={service.slug} data-surface="white" className="service-card relative flex flex-col overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
            {service.slug === "brand-strategy" ? <JasperReferenceArtwork slug={service.slug} /> : (
              <div data-tone="light" data-art="vector" className="service-artwork bg-brand-grid relative aspect-[3/2] w-full overflow-hidden">
                <img src={`/images/services/geometric-candidates/${artworkFiles[service.slug]}.svg`} alt={`${service.heading} illustration`} width={1080} height={1080} loading="lazy" decoding="async" className="absolute inset-0 block size-full object-contain" />
              </div>
            )}
            <div className="flex grow flex-col p-6 md:p-8">
              <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary">{service.heading}</p>
              <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl">{benefitHeadlines[index]}</h2>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
