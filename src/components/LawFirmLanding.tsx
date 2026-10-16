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

// Fox Berman media: widescreen (16:9) only, so the rows and the preview frame never crop or letterbox.
const FBV = "/case-study/fox-berman";

const foxRow1 = [
  { type: "lottie" as const, src: "/portfolio/logos/foxberman-logo.json", alt: "Animated Fox Berman logo", bgColor: "#f3603c" },
  { type: "image" as const, src: "/images/site/law-firm-landing/fox-berman-logos.webp", alt: "Fox Berman logo system" },
  { type: "video" as const, src: `${FBV}/02-colors.mp4`, alt: "Fox Berman colors in motion" },
  { type: "image" as const, src: "/foxberman/foxberman-fonts.webp", alt: "Fox Berman typography" },
];

const foxRow2 = [
  { type: "image" as const, src: "/foxberman/foxberman-colors.webp", alt: "Fox Berman color palette" },
  { type: "video" as const, src: "/foxberman/foxberman-social.mp4", alt: "Fox Berman social media graphics" },
  { type: "image" as const, src: "/foxberman/foxberman-signature.webp", alt: "Fox Berman email signature" },
  { type: "image" as const, src: "/images/site/law-firm-landing/foxberman-office-exterior.webp", alt: "Fox Berman office signage" },
];

const foxRow3 = [
  { type: "video" as const, src: `${FBV}/15-lawyers.mp4`, alt: "Fox Berman attorneys" },
  { type: "image" as const, src: `${FBV}/01-logos.png`, alt: "Fox Berman logo variations" },
  { type: "video" as const, src: `${FBV}/08-social.mp4`, alt: "Fox Berman social identity in motion" },
  { type: "image" as const, src: `${FBV}/05-signature.webp`, alt: "Fox Berman email signature design" },
];

const foxPreview = [
  { label: "Logo Design", image: { src: "/images/site/law-firm-landing/fox-berman-logos.webp", alt: "Fox Berman logo system" } },
  { label: "Colors", image: { src: `${FBV}/02-colors.mp4`, alt: "Fox Berman colors in motion" } },
  { label: "Typography", image: { src: "/foxberman/foxberman-fonts.webp", alt: "Fox Berman typography" } },
  { label: "Social", image: { src: "/foxberman/foxberman-social.mp4", alt: "Fox Berman social media graphics" } },
  { label: "Email Signature", image: { src: "/foxberman/foxberman-signature.webp", alt: "Fox Berman email signature" } },
  { label: "Signage", image: { src: "/images/site/law-firm-landing/foxberman-office-exterior.webp", alt: "Fox Berman office signage" } },
  { label: "In Use", image: { src: `${FBV}/15-lawyers.mp4`, alt: "Fox Berman attorneys" } },
];

// Pain points — law firm specific
const painPoints = [
  {
    title: "First impressions close cases",
    body: "Clients decide in seconds. A professional brand signals competence before you say a word\u2014and lets you charge what you\u2019re worth.",
  },
  {
    title: "Your website is your intake form",
    body: "It needs to load fast, work on every device, and make it dead simple to book a consultation. Slow or broken = lost retainer.",
  },
  {
    title: "Stand out in a saturated market",
    body: "Most law firms look identical. A distinctive identity\u2014custom logo, bold typography, clear color system\u2014makes you the obvious choice.",
  },
  {
    title: "One week. Done",
    body: "No 6-month agency engagements. No junior designers. You work directly with Arek\u2014over 20 years of experience, delivered in a focused sprint.",
  },
];


// Deliverables — law firm specific
const deliverables = [
  "Custom logo (SVG, PNG, dark/light variants)",
  "Logo animation",
  "Brand guidelines \u2014 colors, typography, usage rules",
  "Business cards + letterhead",
  "Email signature",
  "Social media graphics for LinkedIn and Instagram",
  "Figma web design \u2014 desktop, tablet, mobile",
  "Framer or Webflow build \u2014 live and fast",
  "Website copywriting (homepage + practice areas)",
  "Booking / intake integration",
  "Revisions included",
  "All source files delivered",
];



// Law firm questions, answered in full so search engines and AI assistants can quote them.
const pageUrl = `${siteUrl}/law-firm-branding`;
const lawFirmFaqs = [
  {
    question: "How much does law firm branding cost?",
    answer: `${pricing.weekly} per week, flat. A new law firm brand identity or rebrand (logo, logo animation, colors, typography, brand guidelines, business cards, letterhead, email signature, and LinkedIn and Instagram graphics) is delivered in one week, guaranteed, for ${pricing.weekly} total. A website adds one to two more weeks at the same rate, agreed before work starts.`,
  },
  {
    question: "How long does a law firm rebrand take?",
    answer: "One week for the brand identity, guaranteed. The website follows in one to two more weeks, depending on the number of pages. There are no months-long agency timelines.",
  },
  {
    question: "Have you branded a law firm before?",
    answer: "Yes. For Fox Berman, a boutique business and international law firm in Sint Maarten, I designed a custom wordmark, logo animation, brand guidelines, stationery, signage, Instagram and LinkedIn graphics, and a new website. Partner Lucas Berman: \u201cExcellent work! Fast, reliable and look and feel matched beyond our expectations.\u201d",
  },
  {
    question: "Do you design law firm websites and social media too?",
    answer: "Yes. I design the website in Figma and build it in Framer or Webflow, with homepage and practice-area copy and consultation booking, plus LinkedIn banners, Instagram posts, and profile images that match the new brand.",
  },
  {
    question: "Do you work with law firms outside New York?",
    answer: `Yes. I'm based in ${studio.location} and work with firms across the US and internationally. Fox Berman is in the Dutch Caribbean, and the whole process runs remotely.`,
  },
  {
    question: "Who will I work with?",
    answer: "Arek Dvornechuck, a senior freelance graphic designer with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.",
  },
];

const lawFirmSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Law firm branding and website design",
    serviceType: ["Law Firm Branding", "Law Firm Logo Design", "Law Firm Website Design", "Law Firm Social Media Graphics"],
    description: `Brand identity, logo, logo animation, brand guidelines, stationery, social media graphics, and websites for law firms. ${pricing.summary} ${pricing.guarantee}`,
    url: pageUrl,
    audience: { "@type": "BusinessAudience", audienceType: "Law firms and attorneys" },
    provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
    areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Country", name: "United States" }, { "@type": "Place", name: "Worldwide" }],
    offers: {
      "@type": "Offer",
      price: String(pricing.weeklyRate),
      priceCurrency: pricing.currency,
      priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, unitText: "WEEK" },
      description: pricing.guarantee,
    },
    subjectOf: { "@type": "CreativeWork", "@id": `${siteUrl}/work/fox-berman#case-study`, name: "Fox Berman: Law Firm Branding Case Study", url: `${siteUrl}/work/fox-berman` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lawFirmFaqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Law firm branding", path: "/law-firm-branding" }], siteUrl),
];

// Main page component
export const LawFirmLanding = () => (
  <div className="relative">
    <Helmet>
      <title>Law Firm Branding &amp; Website Design in NYC | Ebaq Design</title>
      <meta
        name="description"
        content="Law firm branding and websites by a senior designer in Brooklyn, NYC: logo, brand identity, social media graphics, and a fast website. Brand identity in one week, $3,000 flat."
      />
      <meta
        name="keywords"
        content="law firm branding, law firm website design, branding for lawyers, legal branding agency, logo design for law firms, brand identity attorney, law firm web design, lawyer branding, legal website design"
      />
      <link rel="canonical" href="https://www.ebaqdesign.com/law-firm-branding" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.ebaqdesign.com/law-firm-branding" />
      <meta property="og:title" content="Law Firm Branding & Website Design in NYC | Ebaq Design" />
      <meta
        property="og:description"
        content="Professional branding and website design for law firms. Custom logo, brand identity, and fast-loading website built to attract high-value clients."
      />
      <meta
        property="og:image"
        content="/images/site/law-firm-landing/fox-berman-logos.webp"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Law Firm Branding & Website Design in NYC | Ebaq Design" />
      <meta
        name="twitter:description"
        content="Professional branding and website design for law firms. Custom logo, brand identity, and website built to attract high-value clients."
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://www.ebaqdesign.com/#organization",
          name: "Ebaq Design",
          priceRange: `${pricing.weekly} per week`,
          address: { "@type": "PostalAddress", streetAddress: studio.address.street, addressLocality: studio.address.locality, addressRegion: studio.address.region, postalCode: studio.address.postalCode, addressCountry: studio.address.country },
          makesOffer: { "@type": "Offer", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, description: `${pricing.summary} ${pricing.guarantee}` },
          description: "Professional branding and website design for law firms",
          url: "https://www.ebaqdesign.com/law-firm-branding",
          areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Country", name: "United States" }, { "@type": "Place", name: "Worldwide" }],
          serviceType: ["Law Firm Branding", "Logo Design", "Website Design"],
          founder: { "@type": "Person", name: "Arek Dvornechuck" },
          review: {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: "5" },
            author: { "@type": "Person", name: "L. Berman, LL.M" },
            reviewBody:
              "Excellent work! Fast, reliable and look and feel matched beyond our expectations.",
          },
        })}
      </script>
      {lawFirmSchemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>

    <div className="relative z-10 bg-white">
      <Navbar16 />
      <Header78
        heading={`Branding and Web\nfor Law Firms`}
        description={`Get a professional brand and website that commands trust,\nattracts high-value clients, and helps your firm charge what it's worth.`}
        row1={foxRow1}
        row2={foxRow2}
        row3={foxRow3}
        showRows={[1, 2, 3]}
        mediaAspect="16/9"
      />
      <PainPointsSection heading="Your brand is your strongest argument" points={painPoints} />
      <DeliverablesSection
        heading="Everything a law firm needs to look the part"
        description="One designer, one flat weekly rate. Your brand identity is delivered in one week, guaranteed, for $3,000. The website follows in one to two more weeks at the same rate, depending on the page count."
        items={deliverables}
      />
      <div id="fox-berman">
        <Layout350Preview eyebrow="Fox Berman case study" heading="$3k goes a long way. All this plus much more" items={foxPreview} />
      </div>
      <IndustryTestimonial
        quote="Excellent work! Fast, reliable and look and feel matched beyond our expectations."
        name="L. Berman (LL.M)"
        role="Partner, Fox Berman"
        avatar="/testimonials/lucas.webp"
        personUrl="https://www.linkedin.com/in/lucasbermanattorney/"
        logo={{ src: "/client-logos/foxberman-wordmark.svg", alt: "Fox Berman" }}
        websiteUrl="https://foxberman.com/"
        caseStudyUrl="/work/fox-berman"
      />
      <Faq4 tagline="FAQs" heading={"Questions law firm\npartners ask"} questions={lawFirmFaqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <AboutSection heading="I help law firms look professional." />
    </div>

    <BookerSection />
  </div>
);
