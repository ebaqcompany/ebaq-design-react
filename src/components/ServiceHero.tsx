import type { Service } from "../data/services";
import { ServiceArtwork } from "./ServiceArtwork";

// Relume Header 1: split copy and image, stacked on small screens.
export const ServiceHero = ({ service, heading, description }: { service: Service; heading: string; description: string }) => (
  <section id="service-hero" className="px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:gap-x-20">
        <div>
          <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">{service.heading}</p>
          <h1 className="mb-5 text-balance md:mb-6">{heading}</h1>
          <p className="md:text-md">{description}</p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <a href="/start" className="button-primary inline-flex items-center justify-center px-6 py-3">Discuss your project</a>
          </div>
        </div>
        <ServiceArtwork slug={service.slug} eager className="rounded-t-xl [--service-card-surface:white]" />
      </div>
    </div>
  </section>
);
