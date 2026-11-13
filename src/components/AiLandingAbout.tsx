import { Layout423Defaults } from "./Layout423";

// Relume Layout 635 and Layout 235 adapted for the AI startup landing page.
const defaultDescription = "I charge a flat $3,000 per week and work directly with you across branding, motion, and web. For example, we might build your identity one week, create motion the next, and start your website after that. We agree on scope and timing before work begins.";

export const AiLandingAbout = ({ heading, description = defaultDescription, bookingHref }: { heading: string; description?: string; bookingHref?: string }) =>
  <section className="bg-brand-grid px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div data-surface="white" className="service-card grid overflow-hidden rounded-xl md:grid-cols-2">
        {/* From md up the photo fills the card, however tall the copy beside it grows. */}
        <div className="md:relative md:min-h-[32rem]">
          <img src="/images/about/process/arek-studio-desk-setup.webp" alt="Arek Dvornechuck at his studio desk" className="size-full max-h-[32rem] object-cover object-center md:absolute md:inset-0 md:max-h-none" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
          <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary">Hello, I’m Arek</p>
          <h2 className="mb-5 md:mb-6">{heading}</h2>
          <p className="md:text-md">{description}</p>
          {bookingHref && <div className="mt-6 md:mt-8"><a href={bookingHref} className="button-inverted">Book a call</a></div>}
        </div>
      </div>
    </div>
  </section>
;

export const AiLandingServices = () =>
  <section className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container"><header className="mb-12 max-w-lg md:mb-16"><p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary">What I offer</p><h2>Everything your brand needs</h2></header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{Layout423Defaults.features.map((service) => <article key={service.heading} data-surface="white" className="service-card relative rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']"><p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary">{service.tagline}</p><h3 className="heading-h5 mb-5 font-bold">{service.heading}</h3><p>{service.description}</p></article>)}</div>
    </div>
  </section>;
