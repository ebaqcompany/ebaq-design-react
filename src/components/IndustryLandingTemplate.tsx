import { Helmet } from "react-helmet-async";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { Navbar16, Header78, Layout350Preview, AboutSection, BookerSection } from "./index";
import type { MediaProps } from "./Header78";
import type { PreviewItem } from "./Layout350Preview";
import { Faq4 } from "./Faq4";
import { ServiceFaq } from "./ServiceFaq";
import { ServiceProcess } from "./ServiceProcess";
import { BrandDesignSectionOptions } from "./BrandDesignSectionOptions";
import { serviceBySlug } from "../data/services";
import { AiLandingAbout, AiLandingServices } from "./AiLandingAbout";
import { LandingFooter } from "./LandingFooter";
import { Pricing8 } from "./Pricing8";
import { Comparison } from "./Comparison";
import { AiStartupBanner } from "./AiStartupBanner";
import { DeliverablesSection, IndustryTestimonial, PainPointsSection, type IndustryTestimonialProps, type PainPoint } from "./IndustryLandingSections";

// One industry landing page from a config: the law-firm layout with the copy, case-study media,
// FAQ and structured data passed in. Each page file keeps its own <Helmet> title and description
// as literal strings, because scripts/generate-route-shells.mjs reads them from the source.

export type IndustryFaq = { question: string; answer: string; link?: { label: string; href: string } };

export type IndustryLandingConfig = {
  path: string;
  breadcrumb: string;
  service: { name: string; types: string[]; description: string; audience: string };
  caseStudy: { slug: string; title: string };
  hero: { heading: string; description: string; rows: MediaProps[][]; action?: { label: string; url: string } };
  caseStudySummary?: { heading: string; description: string; decisions: PainPoint[] };
  painPoints: { heading: string; points: PainPoint[] };
  deliverables: { heading: string; items: string[]; description?: string };
  // Keep preview media 16:9: the preview frame is aspect-video.
  preview: { eyebrow: string; anchor: string; items: PreviewItem[]; heading?: string };
  testimonial?: IndustryTestimonialProps;
  faq: { heading: string; items: IndustryFaq[] };
  aboutHeading: string;
  brandDesignLayout?: boolean;
  processSteps?: { heading: string; title: string; description: string }[];
  bannerLines?: [string, string];
};

const deliverablesDescription = "One designer, one flat weekly rate. Your brand identity is delivered in one week, guaranteed, for $3,000. The website follows: a week of design in Figma, then one or two weeks of development at the same rate, depending on the page count.";

const buildSchemas = ({ path, breadcrumb, service, caseStudy, faq }: IndustryLandingConfig) => {
  const pageUrl = `${siteUrl}${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: service.name,
      serviceType: service.types,
      description: `${service.description} ${pricing.summary} ${pricing.guarantee}`,
      url: pageUrl,
      audience: { "@type": "BusinessAudience", audienceType: service.audience },
      provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
      areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Country", name: "United States" }, { "@type": "Place", name: "Worldwide" }],
      offers: {
        "@type": "Offer",
        price: String(pricing.weeklyRate),
        priceCurrency: pricing.currency,
        priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, unitText: "WEEK" },
        description: pricing.guarantee,
      },
      subjectOf: { "@type": "CreativeWork", "@id": `${siteUrl}/work/${caseStudy.slug}#case-study`, name: caseStudy.title, url: `${siteUrl}/work/${caseStudy.slug}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
    buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: breadcrumb, path }], siteUrl),
  ];
};

export const IndustryLandingTemplate = (config: IndustryLandingConfig) => {
  const { hero, painPoints, deliverables, preview, testimonial, faq, aboutHeading } = config;
  const [row1 = [], row2 = [], row3 = []] = hero.rows;
  const showRows = ([1, 2, 3] as const).filter((row) => hero.rows[row - 1]?.length);
  return (
    <div className="relative">
      <Helmet>
        {buildSchemas(config).map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>

      <div className="relative z-10 bg-white">
        {config.brandDesignLayout ? (
          // Relume Navbar 3, reduced to its centered logo for this conversion page.
          <header className="relative z-[999] w-full px-[5%]">
            <div className="container flex min-h-16 items-center justify-center md:min-h-18">
              <img src="/ebaqdesign-logo-bold.svg" width={567} height={156} alt="Ebaq Design" className="h-10 w-auto" />
            </div>
          </header>
        ) : <Navbar16 />}
        <Header78
          heading={hero.heading}
          description={hero.description}
          subLink={hero.action}
          showSocial={!config.brandDesignLayout}
          row1={row1}
          row2={row2}
          row3={row3}
          showRows={[...showRows]}
          mediaAspect="16/9"
        />
        {config.caseStudySummary && (
          <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container max-w-6xl">
              <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary">Featured project</p>
              <h2 className="mb-6 max-w-4xl">{config.caseStudySummary.heading}</h2>
              <p className="max-w-3xl text-black/60 md:text-lg">{config.caseStudySummary.description}</p>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {config.caseStudySummary.decisions.map(({ title, body }) => (
                  <div key={title} className="border-t border-black/10 pt-6">
                    <h3 className="mb-3 heading-h6">{title}</h3>
                    <p className="text-black/60 md:text-lg">{body}</p>
                  </div>
                ))}
              </div>
              <a href={`/work/${config.caseStudy.slug}`} className="mt-8 inline-block rounded-full bg-black px-6 py-3 font-semibold text-white hover:bg-brand-primary">Read the full case study →</a>
            </div>
          </section>
        )}
        {config.brandDesignLayout && <BrandDesignSectionOptions service={serviceBySlug("brand-design")} />}
        {config.brandDesignLayout ? (
          <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container">
              <header className="mb-12 max-w-md md:mb-16">
                <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Why it matters</p>
                <h2>{painPoints.heading}</h2>
              </header>
              {/* Relume Layout 311's four-feature grid, using the Brand Design card treatment. */}
              <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:gap-12">
                {painPoints.points.map((point) => (
                  <article key={point.title} data-surface="white" className="service-card relative flex flex-col overflow-hidden rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-brand-primary/50 after:content-['']">
                    <h3 className="heading-h5 mb-5 font-bold">{point.title}</h3>
                    <p className="md:text-md">{point.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : <PainPointsSection heading={painPoints.heading} points={painPoints.points} />}
        {!config.brandDesignLayout && <DeliverablesSection heading={deliverables.heading} description={deliverables.description ?? deliverablesDescription} items={deliverables.items} />}
        {config.brandDesignLayout && <ServiceProcess slug="brand-design" customSteps={config.processSteps ?? [
          { heading: "01", title: "Book a free call", description: "Tell me about your AI product, audience, and goals. We’ll discuss your needs and agree on scope, timing, and the next steps." },
          { heading: "02", title: "Build your identity", description: "I develop a visual direction for your startup, share the work with you, and refine the chosen direction with your feedback." },
          { heading: "03", title: "Put your brand to work", description: "Receive the agreed files and guidelines for your identity. If a deck or website is part of your scope, we plan the additional work and timing together." },
        ]} />}
        <div id={preview.anchor}>
          <Layout350Preview eyebrow={preview.eyebrow} heading={preview.heading ?? "$3k goes a long way. All this plus much more"} items={preview.items} />
        </div>
        {testimonial && <IndustryTestimonial {...testimonial} />}
        {config.brandDesignLayout && <>
          <Pricing8 surface="white" tagline="Pricing" heading="Priced weekly or monthly" description="Hire me for a flat weekly rate with guaranteed deliverables. Or choose a monthly plan for a bigger project and save $2,000." bookingHref="#book" />
          <AiLandingAbout heading={aboutHeading} />
          <AiLandingServices />
          <Comparison heading={"Agency-level work,\nwithout the agency invoice"} rows={[
            { left: "$3,000 per week, flat", right: "$25k–$100k+ per project" },
            { left: "Brand identity in 1 week, guaranteed", right: "3–9 months or more" },
            { left: "Total agreed before work starts", right: "Estimates that grow" },
            { left: "Revisions within agreed scope", right: "Change orders" },
            { left: "One senior designer, start to finish", right: "Account managers and juniors" },
          ]} />
        </>}
        {config.brandDesignLayout ? (
          <ServiceFaq serviceName={config.breadcrumb} heading={faq.heading} showButton={false} questions={faq.items.map(({ question, answer, link }) => ({
            title: question,
            answer: <p>{answer}{link && <> See <a href={link.href}>{link.label}</a>.</>}</p>,
          }))} />
        ) : (
          <Faq4 tagline="FAQs" heading={faq.heading} questions={faq.items.map(({ question, answer, link }) => ({
            title: question,
            answer: link ? <p>{answer} See <a href={link.href}>{link.label}</a>.</p> : answer,
          }))} />
        )}
        {config.brandDesignLayout && <AiStartupBanner lines={config.bannerLines} />}
        {!config.brandDesignLayout && <AboutSection heading={aboutHeading} />}
      </div>

      <BookerSection showDescription={!config.brandDesignLayout} anchorOnMarker={config.brandDesignLayout} />
      {config.brandDesignLayout && <LandingFooter />}
    </div>
  );
};
