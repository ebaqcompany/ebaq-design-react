import { Helmet } from "react-helmet-async";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Header104 } from "./Header104";
import { Layout350Preview } from "./Layout350Preview";
import { Navbar16 } from "./Navbar16";
import { Portfolio16 } from "./Portfolio16";
import { ServiceProcess } from "./ServiceProcess";

const pageUrl = `${siteUrl}/design-monthly`;
const title = "Design Monthly | Monthly Branding and Web Design | Ebaq Design";
const description = "Book a month of senior freelance design for $10,000 upfront. Agree on a fixed scope for branding, web design, development, or launch assets.";

const engagements = [
  {
    label: "Brand Sprint",
    description: `${pricing.weekly} upfront · One week. A complete brand identity or rebrand, with logo, color, typography, and guidelines.`,
    image: { src: "/case-study/savory/thumbnail.webp", alt: "Savory wordmark shown across four brand color combinations" },
  },
  {
    label: "Design Monthly",
    description: `${pricing.monthly} upfront · One month. Agree on a larger scope, such as brand strategy and identity, a website redesign and build, or launch materials.`,
    image: { src: "/case-study/next-dimension/hero.webp", alt: "NextDimension AI website design" },
  },
];

const steps = [
  { heading: "01", title: "Agree on the scope", description: "We choose the deliverables, start date, and review schedule. The month is booked upfront for a fixed total." },
  { heading: "02", title: "Build and review", description: "I work through the agreed priorities, share progress, and refine the work with your feedback." },
  { heading: "03", title: "Hand over the work", description: "You receive the agreed files and handoff. If development is in scope, we test the agreed pages and features before launch." },
];

const questions = [
  { title: "What can fit in one month?", answer: "We agree on a specific set of deliverables before you book. Page count, content readiness, development needs, and review timing determine what fits." },
  { title: "When do I pay?", answer: pricing.payment },
  { title: "Are revisions included?", answer: "Yes. Revisions within the agreed scope are included." },
  { title: "What if I only need a brand identity?", answer: 'The <a href="/brand-sprint">Brand Sprint</a> delivers a complete brand identity or rebrand in one week for $3,000.' },
];

const schemas = [
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }, { name: "Design Monthly", path: "/design-monthly" }], siteUrl),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Design Monthly",
    serviceType: "Monthly design engagement",
    description,
    url: pageUrl,
    provider: { "@id": `${siteUrl}/#organization`, name: studio.name },
    offers: { "@type": "Offer", price: pricing.monthlyRate, priceCurrency: pricing.currency, url: pageUrl },
  },
];

export const DesignMonthlyPage = () => (
  <div className="relative bg-white">
    <Helmet>
      <title>Design Monthly | Monthly Branding and Web Design | Ebaq Design</title>
      <meta name="description" content="Book a month of senior freelance design for $10,000 upfront. Agree on a fixed scope for branding, web design, development, or launch assets." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {schemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>
    <Navbar16 />
    <main>
      <Header104
        headline="Design Monthly"
        headlineLabel="Design Monthly"
        description={`Book a month of design directly with me for ${pricing.monthly} upfront. We agree on the scope and priorities before work begins.`}
        ctaLabel="Book a call"
        showcaseId="design-monthly-work"
      />
      <Layout350Preview
        id="engagements"
        idPrefix="design-monthly-engagement"
        eyebrow="What’s included"
        heading="A week or a month of design"
        items={engagements}
      />
      <Portfolio16
        id="design-monthly-work"
        embedded
        tagline="Case study"
        heading="See a brand and website come together"
        description="NextDimension AI shows what coordinated identity and web design look like in practice."
        projects={[{
          title: "NextDimension AI",
          description: "Brand strategy, visual identity, motion, and an interactive website for a healthcare AI startup.",
          image: { src: "/case-study/next-dimension/old-site/04-website.webp", alt: "NextDimension AI marketing website" },
          url: "/work/next-dimension",
        }]}
      />
      <ServiceProcess customSteps={steps} />
      <Faq4 tagline="FAQs" heading="Design Monthly questions" questions={questions} />
      <Cta17 heading="Ready to plan your month?" description="Bring the project, deadline, and priorities. We’ll work out what fits and what you’ll receive." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
