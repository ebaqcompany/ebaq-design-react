import { Helmet } from "react-helmet-async";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import {
  Navbar16,
  Header78,
  Layout350Preview,
  AboutSection,
  BookerSection,
} from "./index";
import { Faq4 } from "./Faq4";
import { DeliverablesSection, IndustryTestimonial, PainPointsSection } from "./IndustryLandingSections";

// Draft (2026-10-14), pending Arek's design review: AI healthcare landing page built
// around the NextDimension case study, on the same template as /law-firm-branding.

const ND = "/case-study/next-dimension";

// NextDim media: widescreen (16:9) only, so the rows and the preview frame never crop or letterbox.
const ndRow1 = [
  { type: "lottie" as const, src: "/portfolio/logos/nextdim-combined-logo-scenes-wordmark-footer-reveal.lottie.json", alt: "Animated NextDimension logo", bgColor: "#181735" },
  { type: "image" as const, src: `${ND}/logos.webp`, alt: "NextDimension logo system" },
  { type: "video" as const, src: `${ND}/old-site/05-hero-shader.mp4`, alt: "NextDimension interactive website shader" },
  { type: "image" as const, src: `${ND}/glass.webp`, alt: "NextDimension reeded glass graphics" },
];

const ndRow2 = [
  { type: "image" as const, src: `${ND}/colors.webp`, alt: "NextDimension color palette" },
  { type: "image" as const, src: `${ND}/hero.webp`, alt: "NextDimension brand imagery" },
  { type: "image" as const, src: `${ND}/type.webp`, alt: "NextDimension typography" },
  { type: "image" as const, src: `${ND}/billboard.webp`, alt: "NextDimension billboard" },
];

const ndRow3 = [
  { type: "image" as const, src: `${ND}/old-site/01-logos.webp`, alt: "NextDimension logo design" },
  { type: "lottie" as const, src: "/portfolio/logos/nextdim-combined-logo-scenes-wordmark-exit-enter.lottie.json", alt: "NextDimension logo animation", bgColor: "#181735" },
  { type: "image" as const, src: `${ND}/old-site/03-colors.webp`, alt: "NextDimension brand colors" },
  { type: "image" as const, src: `${ND}/old-site/02-type.webp`, alt: "NextDimension typeface" },
];

const ndPreview = [
  { label: "Logo Design", image: { src: `${ND}/logos.webp`, alt: "NextDimension logo system" } },
  { label: "Typography", image: { src: `${ND}/type.webp`, alt: "NextDimension typography" } },
  { label: "Colors", image: { src: `${ND}/colors.webp`, alt: "NextDimension color palette" } },
  { label: "Website Shader", image: { src: `${ND}/old-site/05-hero-shader.mp4`, alt: "NextDimension interactive website shader" } },
  { label: "Reeded Glass", image: { src: `${ND}/glass.webp`, alt: "NextDimension reeded glass graphics" } },
  { label: "Billboard", image: { src: `${ND}/billboard.webp`, alt: "NextDimension billboard" } },
  { label: "Brand World", image: { src: `${ND}/hero.webp`, alt: "NextDimension brand imagery" } },
];

const painPoints = [
  {
    title: "Trust is the product",
    body: "Practices adopt AI they trust. A credible, precise brand earns that trust before the first demo—and lets you price like the category leader.",
  },
  {
    title: "Beyond the clinical blue",
    body: "Most healthcare AI looks the same: blue gradients, glowing brains, stock stethoscopes. A distinctive identity makes you the one buyers and investors remember.",
  },
  {
    title: "Explain it in seconds",
    body: "Your website has to make complex AI obvious: what it automates, who it’s for, and why it’s safe to switch. Clear messaging turns visits into demos.",
  },
  {
    title: "One week. Done",
    body: "No 6-month agency engagements. No junior designers. You work directly with Arek—over 20 years of experience, delivered in a focused sprint.",
  },
];

const deliverables = [
  "Custom logo (SVG, PNG, dark/light variants)",
  "Logo animation",
  "Color palette and typography",
  "Brand guidelines, live on guidelines.online",
  "Pitch deck design",
  "Social media graphics for LinkedIn",
  "Figma web design — desktop, tablet, mobile",
  "Framer, Webflow, or Next.js build",
  "Interactive website motion and shaders",
  "Website copywriting (homepage + product)",
  "Revisions included",
  "All source files delivered",
];

// Answered in full so search engines and AI assistants can quote them.
const pageUrl = `${siteUrl}/ai-healthcare-branding`;
const healthcareFaqs = [
  {
    question: "How much does branding cost for an AI healthcare company?",
    answer: `${pricing.weekly} per week, flat. A new brand identity or rebrand (logo, logo animation, colors, typography, and brand guidelines) is delivered in one week, guaranteed, for ${pricing.weekly} total. The website adds one to two more weeks, and a pitch deck or motion work another week, all at the same rate and agreed before work starts.`,
  },
  {
    question: "How long does a healthcare AI rebrand take?",
    answer: "One week for the brand identity, guaranteed. The website follows in one to two more weeks, depending on the number of pages. There are no months-long agency timelines.",
  },
  {
    question: "Have you branded an AI healthcare company before?",
    answer: "Yes. NextDimension helps medical practices automate operations with AI agents. I redesigned its identity and website: a new logo and logo animation, typography, a color palette, online brand guidelines, and an interactive website that moves the brand beyond the typical clinical look. I've also branded Aero, a breath-analysis health technology company, and Medihuanna, a medicinal cannabis education provider for healthcare professionals.",
  },
  {
    question: "Can a healthcare brand look trustworthy without looking clinical?",
    answer: "Yes, and that was the NextDimension brief. A deep-space palette, reeded-glass effects, and a precise type system make the brand credible for practice owners and distinctive for investors, without the blue-gradient look most healthcare AI shares.",
  },
  {
    question: "Do you design the website and pitch deck too?",
    answer: "Yes. I design the website in Figma and build it in Framer, Webflow, or Next.js, and I design investor pitch decks and LinkedIn graphics that match the brand, each at the same flat weekly rate.",
  },
  {
    question: "Who will I work with?",
    answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.`,
  },
];

const healthcareSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "AI healthcare branding and website design",
    serviceType: ["Healthcare AI Branding", "Health Tech Logo Design", "Healthcare Website Design", "Pitch Deck Design"],
    description: `Brand identity, logo, logo animation, brand guidelines, pitch decks, and websites for AI healthcare and health technology companies. ${pricing.summary} ${pricing.guarantee}`,
    url: pageUrl,
    audience: { "@type": "BusinessAudience", audienceType: "AI healthcare and health technology companies" },
    provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
    areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Country", name: "United States" }, { "@type": "Place", name: "Worldwide" }],
    offers: {
      "@type": "Offer",
      price: String(pricing.weeklyRate),
      priceCurrency: pricing.currency,
      priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, unitText: "WEEK" },
      description: pricing.guarantee,
    },
    subjectOf: { "@type": "CreativeWork", "@id": `${siteUrl}/work/next-dimension#case-study`, name: "NextDim AI: Healthcare AI Branding Case Study", url: `${siteUrl}/work/next-dimension` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: healthcareFaqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI healthcare branding", path: "/ai-healthcare-branding" }], siteUrl),
];

export const AiHealthcareLanding = () => (
  <div className="relative">
    <Helmet>
      <title>AI Healthcare Branding &amp; Website Design | Ebaq Design</title>
      <meta
        name="description"
        content="Branding and websites for AI healthcare companies: logo, logo animation, brand guidelines, and an interactive website. Brand identity in one week, $3,000 flat."
      />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="AI Healthcare Branding & Website Design | Ebaq Design" />
      <meta property="og:description" content="Branding and websites for AI healthcare companies: logo, logo animation, brand guidelines, and an interactive website. Brand identity in one week, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${ND}/website.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Healthcare Branding & Website Design | Ebaq Design" />
      <meta name="twitter:description" content="Brand identity, logo animation, and websites for AI healthcare companies. One week, guaranteed, $3,000 flat." />
      {healthcareSchemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>

    <div className="relative z-10 bg-white">
      <Navbar16 />
      <Header78
        heading={`Branding and Web\nfor AI Healthcare`}
        description={`A brand and website that earn trust from practices, clinicians,\nand investors, without looking like every other healthcare AI.`}
        row1={ndRow1}
        row2={ndRow2}
        row3={ndRow3}
        showRows={[1, 2, 3]}
        mediaAspect="16/9"
      />
      <PainPointsSection heading="In healthcare, the brand is the first proof" points={painPoints} />
      <DeliverablesSection
        heading="Everything an AI health company needs to launch"
        description="One designer, one flat weekly rate. Your brand identity is delivered in one week, guaranteed, for $3,000. The website follows in one to two more weeks at the same rate, depending on the page count."
        items={deliverables}
      />
      <div id="next-dim">
        <Layout350Preview eyebrow="NextDim case study" heading="$3k goes a long way. All this plus much more" items={ndPreview} />
      </div>
      <IndustryTestimonial
        compact
        quote="Arek worked with us on the complete redesign of the NextDimension AI visual identity and website. He was thoughtful, responsive, and patient throughout the process, from exploring the logo direction to refining the website’s content, design, and functionality. What stood out most was his ability to clearly explain and defend his creative vision while still listening to our feedback."
        name="Lakshita Chhikara"
        role="Co-Founder, NextDimension AI"
        avatar="/testimonials/lakshita-chhikara.webp"
        logo={{ src: "/client-logos/nextdim-wordmark.svg", alt: "NextDimension AI" }}
        websiteUrl="https://nextdim.io"
        caseStudyUrl="/work/next-dimension"
      />
      <Faq4 tagline="FAQs" heading={"Questions AI healthcare\nfounders ask"} questions={healthcareFaqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <AboutSection heading="I help AI healthcare companies earn trust." />
    </div>

    <BookerSection />
  </div>
);
