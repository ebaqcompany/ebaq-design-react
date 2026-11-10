import { Helmet } from "react-helmet-async";
import { Navbar16 } from "./Navbar16";
import { Pricing8 } from "./Pricing8";
import { Comparison } from "./Comparison";
import { Faq4 } from "./Faq4";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { pricing, pricingFaqs, siteUrl, studio, studioFaqs, weekPlan } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// Published 2026-10-14 for search engines and answer engines (linked from the footer only, not
// the navbar) while the design is still being refined. Every number comes from siteFacts.
const pageUrl = `${siteUrl}/pricing`;
const faqs = [...pricingFaqs, ...studioFaqs];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Pricing | Ebaq Design",
    description: `${pricing.summary} ${pricing.guarantee} ${pricing.fixedTotal}`,
    about: { "@id": `${siteUrl}/#organization` },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "Ebaq Design pricing",
      itemListElement: weekPlan.map((step) => ({
        "@type": "Offer",
        name: `${step.weeks}: ${step.name}`,
        description: step.detail,
        priceSpecification: { "@type": "PriceSpecification", price: step.price.replace(/[^0-9]/g, ""), priceCurrency: pricing.currency },
        seller: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }], siteUrl),
];


export const PricingPage = () => (
  <div className="relative bg-white">
    <Helmet>
      <title>Pricing: Brand Identity in One Week for $3,000 | Ebaq Design</title>
      <meta name="description" content="A flat $3,000 per week for branding, motion, pitch decks, and websites. A new brand identity or rebrand is delivered in one week, guaranteed." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Pricing: Brand Identity in One Week for $3,000 | Ebaq Design" />
      <meta property="og:description" content="A flat $3,000 per week for branding, motion, pitch decks, and websites. A new brand identity or rebrand is delivered in one week, guaranteed." />
      {schemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>
    <Navbar16 />
    <main>
      <Pricing8 surface="white" headingLevel="h1" tagline="Pricing" heading="Priced weekly or monthly" description="Hire me for a flat weekly rate with guaranteed deliverables. Or choose a monthly plan for a bigger project and save $2,000." />
      <Comparison
        heading={"Agency-level work,\nwithout the agency invoice"}
        rows={[
          { left: "$3,000 per week, flat", right: "$25k–$100k+ per project" },
          { left: "Brand identity in 1 week, guaranteed", right: "3–9 months or more" },
          { left: "Total agreed before work starts", right: "Estimates that grow" },
          { left: "Revisions within agreed scope", right: "Change orders" },
          { left: "One senior designer, start to finish", right: "Account managers and juniors" },
        ]}
      />
      <Faq4 tagline="FAQs" heading="Pricing questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Ready to plan your weeks?" description="Book a 15-minute call. You'll leave with a scope, a week count, and a fixed total." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
