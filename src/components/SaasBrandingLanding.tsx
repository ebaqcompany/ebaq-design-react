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

// Draft (2026-10-14), pending Arek's design review: SaaS branding landing page built around
// the Elevate case study, on the same template as /law-firm-branding. "saas brand" and
// "saas branding" queries currently land on /blog/saas-logos, a list article.

// Elevate media: widescreen (16:9) only, so the rows and the preview frame never crop or letterbox.
const EL = "/case-study/elevate";

const elRow1 = [
  { type: "lottie" as const, src: "/portfolio/logos/ElevateLogoBGTop.json", alt: "Animated Elevate logo", bgColor: "#000000", fit: "cover" as const },
  { type: "image" as const, src: `${EL}/01-logos.png`, alt: "Elevate logo system" },
  { type: "video" as const, src: `${EL}/04-merchandise.mp4`, alt: "Elevate merchandise in motion" },
  { type: "image" as const, src: `${EL}/02-icon-set.webp`, alt: "Elevate icon system" },
];

const elRow2 = [
  { type: "image" as const, src: `${EL}/05-business-cards.webp`, alt: "Elevate business cards" },
  { type: "video" as const, src: `${EL}/09-office.mp4`, alt: "Elevate office branding in motion" },
  { type: "image" as const, src: `${EL}/06-collateral.webp`, alt: "Elevate branded collateral" },
  { type: "image" as const, src: `${EL}/08-id-badge.webp`, alt: "Elevate team ID badge" },
];

const elRow3 = [
  { type: "image" as const, src: `${EL}/07-envelope.webp`, alt: "Elevate branded envelope" },
  { type: "lottie" as const, src: `${EL}/hero-logo.json`, alt: "Elevate logo animation", bgColor: "#000000" },
  { type: "image" as const, src: `${EL}/02-icon-set.webp`, alt: "Elevate product icons" },
  { type: "image" as const, src: `${EL}/01-logos.png`, alt: "Elevate logo variations" },
];

const elPreview = [
  { label: "Logo Design", image: { src: `${EL}/01-logos.png`, alt: "Elevate logo system" } },
  { label: "Icon System", image: { src: `${EL}/02-icon-set.webp`, alt: "Elevate icon system" } },
  { label: "Business Cards", image: { src: `${EL}/05-business-cards.webp`, alt: "Elevate business cards" } },
  { label: "Collateral", image: { src: `${EL}/06-collateral.webp`, alt: "Elevate branded collateral" } },
  { label: "ID Badge", image: { src: `${EL}/08-id-badge.webp`, alt: "Elevate team ID badge" } },
  { label: "Merchandise", image: { src: `${EL}/04-merchandise.mp4`, alt: "Elevate merchandise in motion" } },
  { label: "Office", image: { src: `${EL}/09-office.mp4`, alt: "Elevate office branding in motion" } },
];

const painPoints = [
  {
    title: "Look like the category leader",
    body: "Buyers judge a SaaS product by its brand before they ever see the dashboard. A sharp identity makes an early team look ready for its biggest customers.",
  },
  {
    title: "Escape the template look",
    body: "Most SaaS brands share the same gradients, rounded sans-serifs, and stock 3D shapes. A distinctive mark and type system make you the one buyers remember.",
  },
  {
    title: "Built for the product, not just the pitch",
    body: "Your logo has to work as an app icon, a favicon, and a loading animation. I design the mark, the icon system, and the motion with the product in mind.",
  },
  {
    title: "One week. Done",
    body: "No 6-month agency engagements. No junior designers. You work directly with Arek—over 20 years of experience, delivered in a focused sprint.",
  },
];

const deliverables = [
  "Custom logo and app icon (SVG, PNG, dark/light)",
  "Logo animation (Lottie and MP4)",
  "Icon system",
  "Color palette and typography",
  "Brand guidelines, live on guidelines.online",
  "Pitch deck design",
  "Social media and launch graphics",
  "Figma web design — desktop, tablet, mobile",
  "Framer, Webflow, or Next.js build",
  "Website copywriting (homepage + product)",
  "Revisions included",
  "All source files delivered",
];

// Answered in full so search engines and AI assistants can quote them.
const pageUrl = `${siteUrl}/saas-branding`;
const saasFaqs = [
  {
    question: "How much does SaaS branding cost?",
    answer: `${pricing.weekly} per week, flat. A new SaaS brand identity or rebrand (logo, app icon, logo animation, icon system, colors, typography, and brand guidelines) is delivered in one week, guaranteed, for ${pricing.weekly} total. Branding agencies often charge $25,000 to $100,000 or more for the same scope.`,
  },
  {
    question: "How long does a SaaS rebrand take?",
    answer: "One week for the brand identity, guaranteed. The website follows in one to two more weeks, depending on the number of pages, and a pitch deck or launch graphics take another week. Everything is at the same weekly rate, agreed before work starts.",
  },
  {
    question: "Have you branded a SaaS company before?",
    answer: "Yes. Elevate is a Shopify-native A/B testing platform. I designed its growth mark and bespoke wordmark, logo animation, icon system, online brand guidelines, website, and business collateral. I've also branded Brevidee, a video-editing SaaS for schools, and Orbio, an AI infrastructure startup whose identity I evolved in a one-week sprint.",
  },
  {
    question: "Will the logo work as an app icon and favicon?",
    answer: "Yes. Every mark is tested at favicon and app-icon sizes, in one color, and on dark backgrounds, and comes with an icon system and a logo animation you can use as a loader or in product launches.",
  },
  {
    question: "Do you design SaaS websites too?",
    answer: "Yes. I design the website in Figma and build it in Framer, Webflow, or Next.js, with homepage and product copy written to turn visitors into demos and signups.",
  },
  {
    question: "Who will I work with?",
    answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.`,
  },
];

const saasSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "SaaS branding and website design",
    serviceType: ["SaaS Branding", "SaaS Logo Design", "App Icon Design", "SaaS Website Design"],
    description: `Brand identity, logo, app icon, logo animation, icon system, brand guidelines, pitch decks, and websites for SaaS startups. ${pricing.summary} ${pricing.guarantee}`,
    url: pageUrl,
    audience: { "@type": "BusinessAudience", audienceType: "SaaS startups and software companies" },
    provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
    areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Country", name: "United States" }, { "@type": "Place", name: "Worldwide" }],
    offers: {
      "@type": "Offer",
      price: String(pricing.weeklyRate),
      priceCurrency: pricing.currency,
      priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, unitText: "WEEK" },
      description: pricing.guarantee,
    },
    subjectOf: { "@type": "CreativeWork", "@id": `${siteUrl}/work/elevate#case-study`, name: "Elevate: SaaS Branding Case Study", url: `${siteUrl}/work/elevate` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: saasFaqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "SaaS branding", path: "/saas-branding" }], siteUrl),
];

// The website answer links to the SaaS web design page; the schema keeps the plain-text version.
const visibleFaqs = saasFaqs.map(({ question, answer }) => ({
  title: question,
  answer: question === "Do you design SaaS websites too?"
    ? <p>{answer} See <a href="/saas-web-design">SaaS website design</a>.</p>
    : answer,
}));

export const SaasBrandingLanding = () => (
  <div className="relative">
    <Helmet>
      <title>SaaS Branding &amp; Logo Design for Startups | Ebaq Design</title>
      <meta
        name="description"
        content="SaaS branding for startups: logo, app icon, logo animation, icon system, brand guidelines, and a website. Brand identity in one week, guaranteed, $3,000 flat."
      />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="SaaS Branding & Logo Design for Startups | Ebaq Design" />
      <meta property="og:description" content="SaaS branding for startups: logo, app icon, logo animation, icon system, brand guidelines, and a website. Brand identity in one week, guaranteed, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${EL}/01-logos.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="SaaS Branding & Logo Design for Startups | Ebaq Design" />
      <meta name="twitter:description" content="Logo, app icon, logo animation, and brand guidelines for SaaS startups. One week, guaranteed, $3,000 flat." />
      {saasSchemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>

    <div className="relative z-10 bg-white">
      <Navbar16 />
      <Header78
        heading={`Branding and Web\nfor SaaS Startups`}
        description={`A brand that looks like the category leader before you are one,\nfrom logo and icon system to the website that sells the product.`}
        row1={elRow1}
        row2={elRow2}
        row3={elRow3}
        showRows={[1, 2, 3]}
        mediaAspect="16/9"
      />
      <PainPointsSection heading="Your brand is part of the product" points={painPoints} />
      <DeliverablesSection
        heading="Everything a SaaS startup needs to launch"
        description="One designer, one flat weekly rate. Your brand identity is delivered in one week, guaranteed, for $3,000. The website follows in one to two more weeks at the same rate, depending on the page count."
        items={deliverables}
      />
      <div id="elevate">
        <Layout350Preview eyebrow="Elevate case study" heading="$3k goes a long way. All this plus much more" items={elPreview} />
      </div>
      <IndustryTestimonial
        compact
        quote="Arek did an outstanding job on our full brand redesign. From understanding our vision, to crafting the direction, to executing with speed, he nailed it from the beginning. We absolutely love all of it. What stood out most was how quickly he understood exactly what we were looking for."
        name="Karim Zitouni"
        role="Co-Founder, Elevate"
        avatar="/testimonials/karim-zitouni.webp"
        logo={{ src: "/client-logos/elevate-wordmark.svg", alt: "Elevate" }}
        websiteUrl="https://elevateab.com/"
        caseStudyUrl="/work/elevate"
      />
      <Faq4 tagline="FAQs" heading={"Questions SaaS\nfounders ask"} questions={visibleFaqs} />
      <AboutSection heading="I help SaaS startups look like category leaders." />
    </div>

    <BookerSection />
  </div>
);
