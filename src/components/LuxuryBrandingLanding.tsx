import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-10-14), pending Arek's review: luxury branding around the Airport Executive case study.
// Widescreen crops of the 3:2 and 4:3 shots live in /images/site/luxury-landing.
const AE = "/case-study/airport-executive";
const LX = "/images/site/luxury-landing";
const pageUrl = `${siteUrl}/luxury-branding`;

const config: IndustryLandingConfig = {
  path: "/luxury-branding",
  breadcrumb: "Luxury branding",
  service: {
    name: "Luxury branding and website design",
    types: ["Luxury Branding", "Monogram Design", "Luxury Logo Design", "Luxury Website Design"],
    description: "Monograms, wordmarks, logo animation, typography, brand guidelines, print, signage, and websites for luxury and premium brands.",
    audience: "Luxury and premium brands",
  },
  caseStudy: { slug: "airport-executive", title: "Airport Executive: Luxury Chauffeur Rebrand" },
  hero: {
    heading: "Branding and Web\nfor Luxury Brands",
    description: "A brand that feels premium at every touchpoint,\nfrom the monogram and typography to the website your clients book on.",
    rows: [
      [
        { type: "lottie", src: `${AE}/hero-logo.json`, alt: "Animated Airport Executive logo", bgColor: "#000000" },
        { type: "image", src: `${AE}/01-logos.png`, alt: "Airport Executive monogram and logo system" },
        { type: "video", src: `${AE}/11-escalator.mp4`, alt: "Airport Executive escalator campaign" },
        { type: "image", src: `${LX}/business-cards.webp`, alt: "Airport Executive business cards" },
      ],
      [
        { type: "image", src: `${LX}/campaign-banner.webp`, alt: "Airport Executive airport campaign banner" },
        { type: "video", src: `${LX}/website.mp4`, alt: "Airport Executive website" },
        { type: "image", src: `${AE}/10-signage.webp`, alt: "Airport Executive signage" },
        { type: "image", src: `${LX}/publication.webp`, alt: "Airport Executive branded publication" },
      ],
      [
        { type: "image", src: `${LX}/website.webp`, alt: "Airport Executive website on a laptop" },
        { type: "lottie", src: "/portfolio/logos/airporteexecutive-logo.json", alt: "Airport Executive logo animation", bgColor: "#000000" },
        { type: "image", src: `${AE}/10-signage.webp`, alt: "Airport Executive environmental signage" },
        { type: "image", src: `${LX}/campaign-banner.webp`, alt: "Arrive in style, depart in comfort" },
      ],
    ],
  },
  painPoints: {
    heading: "In luxury, every detail is the brand",
    points: [
      { title: "Premium is a feeling", body: "Clients decide whether you're worth it before they read a word. Refined typography, restraint, and space signal quality instantly." },
      { title: "Restraint beats decoration", body: "Gold foil and flourishes don't make a brand luxurious. A disciplined monogram, a confident wordmark, and a tight palette do." },
      { title: "The same at every touchpoint", body: "From the business card to the booking page, signage, and uniforms, a luxury brand has to feel identical everywhere a client meets it." },
      { title: "One week. Done", body: "No 6-month agency engagements. No junior designers. You work directly with Arek—over 20 years of experience, delivered in a focused sprint." },
    ],
  },
  deliverables: {
    heading: "Everything a premium brand needs to look the part",
    items: [
      "Monogram and wordmark (SVG, PNG, dark/light)",
      "Logo animation",
      "Color palette and typography",
      "Brand guidelines, live on guidelines.online",
      "Business cards and stationery",
      "Print collateral and publications",
      "Signage and environmental graphics",
      "Social media and campaign graphics",
      "Figma web design — desktop, tablet, mobile",
      "Framer, Webflow, or Next.js build",
      "Revisions included",
      "All source files delivered",
    ],
  },
  preview: {
    eyebrow: "Airport Executive case study",
    anchor: "airport-executive",
    items: [
      { label: "Monogram", image: { src: `${AE}/01-logos.png`, alt: "Airport Executive monogram and logo system" } },
      { label: "Business Cards", image: { src: `${LX}/business-cards.webp`, alt: "Airport Executive business cards" } },
      { label: "Campaign", image: { src: `${LX}/campaign-banner.webp`, alt: "Airport Executive airport campaign banner" } },
      { label: "Publication", image: { src: `${LX}/publication.webp`, alt: "Airport Executive branded publication" } },
      { label: "Website", image: { src: `${LX}/website.mp4`, alt: "Airport Executive website" } },
      { label: "Signage", image: { src: `${AE}/10-signage.webp`, alt: "Airport Executive signage" } },
      { label: "Escalator Ads", image: { src: `${AE}/11-escalator.mp4`, alt: "Airport Executive escalator campaign" } },
    ],
  },
  testimonial: {
    compact: true,
    quote: "Arek is a branding expert with extensive experience in graphic design, logos, and web design. We have collaborated with him on several rebranding projects. I highly recommend him.",
    name: "Chris Nixon",
    role: "Founder, Airport Executive",
    avatar: `${AE}/chris-nixon.webp`,
    logo: { src: "/client-logos/airport-executive-logo.svg", alt: "Airport Executive" },
    websiteUrl: "https://www.airportexecutive.com/",
    caseStudyUrl: "/work/airport-executive",
  },
  faq: {
    heading: "Questions luxury\nbrand owners ask",
    items: [
      { question: "How much does luxury branding cost?", answer: "$3,000 per week, flat. A new luxury brand identity or rebrand (monogram, wordmark, logo animation, typography, colors, brand guidelines, and stationery) is delivered in one week, guaranteed, for $3,000 total. Branding agencies often charge $25,000 to $100,000 or more for the same scope." },
      { question: "How long does a luxury rebrand take?", answer: "One week for the brand identity, guaranteed. The website follows in one to two more weeks, depending on the number of pages. Print, signage, and campaign work can be added a week at a time, at the same rate." },
      { question: "Have you branded luxury companies before?", answer: "Yes. Airport Executive is a premium London chauffeur service with more than 25 years of experience. Under new ownership, I rebranded it with an aviation-inspired monogram, elegant typography, a minimalist visual system, a new website, signage, and an airport campaign. I also designed SweetGrass, a luxury cannabis dispensary, around an Art Deco wordmark and premium packaging." },
      { question: "Should a luxury brand use a monogram or a wordmark?", answer: "Usually both. A monogram works on small and tactile surfaces like business cards, uniforms, and app icons, while the wordmark carries the full name with authority. Airport Executive pairs an aviation-inspired monogram with an elegant wordmark." },
      { question: "Do you design the website and print materials too?", answer: "Yes. I design the website in Figma and build it in Framer, Webflow, or Next.js, and I design business cards, publications, signage, and campaign graphics that match the brand." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I help premium brands look the part.",
};

export const LuxuryBrandingLanding = () => (
  <>
    <Helmet>
      <title>Luxury Branding &amp; Website Design | Ebaq Design</title>
      <meta name="description" content="Luxury branding for premium brands: monogram and logo design, elegant typography, logo animation, guidelines, and a refined website. One week, $3,000 flat." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Luxury Branding & Website Design | Ebaq Design" />
      <meta property="og:description" content="Luxury branding for premium brands: monogram and logo design, elegant typography, logo animation, guidelines, and a refined website. One week, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${AE}/01-logos.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Luxury Branding & Website Design | Ebaq Design" />
      <meta name="twitter:description" content="Monogram, logo, typography, and a refined website for premium brands. One week, guaranteed, $3,000 flat." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
