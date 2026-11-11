import type { Service } from "../data/services";
import { JasperReferenceArtwork } from "./JasperReferenceArtwork";

// Relume Header 1: split copy and image, stacked on small screens.
export const ServiceHero = ({ service, heading, description }: { service: Service; heading: string; description: string }) => (
  <section id="service-hero" className="px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:gap-x-20">
        <div>
          <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">{service.heading}</p>
          <h1 className="mb-5 text-balance md:mb-6">{heading}</h1>
          <p className="md:text-md">{description}</p>
        </div>
        {service.slug === "brand-strategy" ? <div className="overflow-hidden rounded-xl"><JasperReferenceArtwork slug={service.slug} /></div> : <div data-tone="light" data-art="vector" className="service-artwork bg-brand-grid relative aspect-[3/2] w-full overflow-hidden rounded-xl">
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet={`/images/services/animations/${service.slug}-still.webp`} />
            <img src={`/images/services/animations/${service.slug}.webp`} alt={`${service.heading} illustration`} width="720" height="480" loading="eager" decoding="async" className="absolute inset-0 block size-full object-contain" />
          </picture>
        </div>}
      </div>
    </div>
  </section>
);
