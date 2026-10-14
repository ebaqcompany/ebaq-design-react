import { Helmet } from "react-helmet-async";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import {
  Navbar16,
  Header78,
  Layout527,
  AboutSection,
  BookerSection,
} from "./index";
import { Faq4 } from "./Faq4";
import { DeliverablesSection, IndustryTestimonial, PainPointsSection } from "./IndustryLandingSections";

// Fox Berman images

const FB = {
  logos: "/images/site/law-firm-landing/fox-berman-logos.webp",
  cards: "/images/site/law-firm-landing/foxberman-cards2.webp",
  web: "/images/site/law-firm-landing/foxberman-web2.webp",
  sign2: "/images/site/law-firm-landing/foxberman-sign2.webp",
  sign3: "/images/site/law-firm-landing/foxberman-sign3.webp",
  linkedin: "/images/site/law-firm-landing/foxberman-linkedin.webp",
  folder: "/images/site/law-firm-landing/foxberman-folder.webp",
  letterhead: "/images/site/law-firm-landing/foxberman-letterhead.webp",
  letterhead2: "/images/site/law-firm-landing/foxberman-letterhead2.webp",
  booklet: "/images/site/law-firm-landing/foxberman-booklet-1-p-2000.webp",
  favicon: "/images/site/law-firm-landing/foxberman-favicon.webp",
  pin: "/images/site/law-firm-landing/foxberman-pin.webp",
  office: "/images/site/law-firm-landing/foxberman-office-exterior.webp",
};

// Header rows — Fox Berman case study
const foxRow1 = [
  { type: "lottie" as const, src: "/portfolio/logos/foxberman-logo.json", bgColor: "#f3603c" },
  { type: "image" as const, src: FB.cards, alt: "Fox Berman business cards" },
  { type: "image" as const, src: FB.favicon, alt: "Fox Berman favicon" },
  { type: "image" as const, src: FB.pin, alt: "Fox Berman pin" },
  { type: "image" as const, src: FB.linkedin, alt: "Fox Berman LinkedIn banner" },
];

const foxRow2 = [
  { type: "image" as const, src: FB.letterhead, alt: "Fox Berman letterhead" },
  { type: "image" as const, src: FB.letterhead2, alt: "Fox Berman letterhead 2" },
  { type: "image" as const, src: FB.folder, alt: "Fox Berman folder" },
  { type: "image" as const, src: FB.booklet, alt: "Fox Berman booklet" },
];

const foxRow3 = [
  { type: "video" as const, src: "/portfolio/websites/fox-berman-web.mp4", alt: "Fox Berman website" },
  { type: "image" as const, src: FB.office, alt: "Fox Berman office exterior" },
  { type: "image" as const, src: FB.sign2, alt: "Fox Berman wall sign" },
  { type: "image" as const, src: FB.sign3, alt: "Fox Berman pylon sign" },
];

const foxHoverLinks = [
  { url: "#", heading: "Logo", image: { src: FB.logos, alt: "Fox Berman logo" } },
  { url: "#", heading: "Colors", image: { src: "/foxberman/foxberman-colors.png", alt: "Fox Berman brand colors" } },
  { url: "#", heading: "Type", image: { src: "/foxberman/foxberman-fonts.png", alt: "Fox Berman typography" } },
  { url: "#", heading: "Business Cards", image: { src: FB.cards, alt: "Fox Berman business cards" } },
  { url: "#", heading: "Collateral", image: { src: FB.folder, alt: "Fox Berman collateral" } },
  { url: "#", heading: "Social", image: { src: "/foxberman/foxberman-social.mp4", alt: "Fox Berman social media" } },
  { url: "https://foxberman.com/", heading: "Web Design", image: { src: FB.web, alt: "Fox Berman website design" } },
  { url: "#", heading: "Signature", image: { src: "/foxberman/foxberman-signature.jpg", alt: "Fox Berman email signature" } },
  { url: "#", heading: "+ More", image: { src: FB.office, alt: "Fox Berman office signage" } },
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
    answer: "Arek Dvornechuck, a senior brand designer with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.",
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
        heading={`Branding and Websites\nfor Law Firms`}
        tagline="Law Firm Branding"
        description={`Get a professional brand and website that commands trust,\nattracts high-value clients, and helps your firm charge what it's worth.`}
        subLink={{ label: "see our work", url: "#fox-berman" }}
        showScrollArrow
        row1={foxRow1}
        row2={foxRow2}
        row3={foxRow3}
        showRows={[1, 2, 3]}
      />
      <PainPointsSection heading="Your brand is your strongest argument" points={painPoints} />
      <DeliverablesSection
        heading="Everything a law firm needs to look the part"
        description="One designer, one flat weekly rate. Your brand identity is delivered in one week, guaranteed, for $3,000. The website follows in one to two more weeks at the same rate, depending on the page count."
        items={deliverables}
      />
      <div id="fox-berman">
        <Layout527 hoverLinks={foxHoverLinks} />
      </div>
      <IndustryTestimonial
        quote="Excellent work! Fast, reliable and look and feel matched beyond our expectations."
        name="L. Berman (LL.M)"
        role="Partner, Fox Berman"
        avatar="/testimonials/lucas.jpeg"
        personUrl="https://www.linkedin.com/in/lucasbermanattorney/"
        logo={{ src: "/client-logos/foxberman-wordmark.svg", alt: "Fox Berman" }}
        websiteUrl="https://foxberman.com/"
        caseStudyUrl="/work/fox-berman"
      />
      <Faq4 tagline="FAQs" heading="Law firm branding questions" questions={lawFirmFaqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <AboutSection heading="I'm Arek, a senior designer based in Brooklyn, NYC, helping law firms look professional" />
    </div>

    <BookerSection />
  </div>
);
