import { Helmet } from "react-helmet-async";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { Navbar16, Header78, Layout350Preview, AboutSection, BookerSection } from "./index";
import type { MediaProps } from "./Header78";
import type { PreviewItem } from "./Layout350Preview";
import { Faq4 } from "./Faq4";
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
  hero: { heading: string; description: string; rows: MediaProps[][] };
  painPoints: { heading: string; points: PainPoint[] };
  deliverables: { heading: string; items: string[] };
  // Keep preview media 16:9: the preview frame is aspect-video.
  preview: { eyebrow: string; anchor: string; items: PreviewItem[] };
  testimonial?: IndustryTestimonialProps;
  faq: { heading: string; items: IndustryFaq[] };
  aboutHeading: string;
};

const deliverablesDescription = "One designer, one flat weekly rate. Your brand identity is delivered in one week, guaranteed, for $3,000. The website follows in one to two more weeks at the same rate, depending on the page count.";

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
        <Navbar16 />
        <Header78
          heading={hero.heading}
          description={hero.description}
          row1={row1}
          row2={row2}
          row3={row3}
          showRows={[...showRows]}
          mediaAspect="16/9"
        />
        <PainPointsSection heading={painPoints.heading} points={painPoints.points} />
        <DeliverablesSection heading={deliverables.heading} description={deliverablesDescription} items={deliverables.items} />
        <div id={preview.anchor}>
          <Layout350Preview eyebrow={preview.eyebrow} heading="$3k goes a long way. All this plus much more" items={preview.items} />
        </div>
        {testimonial && <IndustryTestimonial {...testimonial} />}
        <Faq4
          tagline="FAQs"
          heading={faq.heading}
          questions={faq.items.map(({ question, answer, link }) => ({
            title: question,
            answer: link ? <p>{answer} See <a href={link.href}>{link.label}</a>.</p> : answer,
          }))}
        />
        <AboutSection heading={aboutHeading} />
      </div>

      <BookerSection />
    </div>
  );
};
