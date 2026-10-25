import { ArekProfileBadge } from "./ArekProfileBadge";
import { AvailableButton } from "./AvailableButton";
import { Layout423Defaults } from "./Layout423";

// The closing "Hello, I'm Arek" block on the landing pages: an introduction laid out like the
// homepage hero, with the homepage's agency-versus-direct argument, then the six services in
// three columns. Pages pass only their own headline.

type Props = {
  heading: string;
};

export type AboutSectionProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const AboutSection = ({ heading = "I help ambitious companies look like category leaders.", className, ...sectionProps }: AboutSectionProps) => (
  <>
    <section {...sectionProps} id="about" className={`bg-white px-[5%] py-16 md:py-24 lg:py-28 ${className ?? ""}`}>
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-8 md:grid-cols-2 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-brand-primary md:mb-4">Hello 👋 I&rsquo;m Arek</p>
            <h2 className="max-w-xl text-balance">{heading}</h2>
          </div>
          <div className="md:mt-12">
            <ArekProfileBadge variant="author" className="mb-6" />
            <p className="md:text-md">
              Traditional agencies charge <strong>$25k&ndash;$100k+</strong> and take months to deliver, with account managers and junior designers between you and the work.
            </p>
            <p className="mt-4 md:text-md">
              At Ebaq Design, you work <strong>directly with me</strong>, a Branding Expert in Brooklyn, NYC, with over 20 years of experience. Your brand identity is done in <strong>one week, guaranteed</strong>, for $3,000 flat.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8">
              <AvailableButton nav keepLabel />
              <a href="/work" className="font-semibold">See all work &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f5f5f5] px-[5%] py-16 md:py-24 lg:py-28" aria-labelledby="about-services-heading">
      <div className="container">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">What I offer</p>
          <h2 id="about-services-heading" className="mb-5 md:mb-6">Everything your brand needs</h2>
          <p className="md:text-md">One Branding Expert for strategy, identity, web, and motion, all at the same flat $3,000 per week.</p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {Layout423Defaults.features.map((service) => (
            <div key={service.heading} className="border-t border-black/10 pt-6">
              <p className="mb-3 text-sm font-semibold text-brand-primary">{service.tagline}</p>
              <h3 className="mb-3 text-xl md:text-2xl">{service.heading}</h3>
              <p className="mb-5 text-black/60">{service.description}</p>
              <ul className="flex flex-wrap gap-2" aria-label={`${service.heading} deliverables`}>
                {service.deliverables.map((item) => (
                  <li key={item} className="rounded-full bg-white px-3 py-1 text-sm">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);
