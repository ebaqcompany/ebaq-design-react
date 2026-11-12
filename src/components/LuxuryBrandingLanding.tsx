import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Widescreen crops of the 3:2 and 4:3 shots live in /images/site/luxury-landing.
const AE = "/case-study/airport-executive";
const LX = "/images/site/luxury-landing";
const pageUrl = `${siteUrl}/luxury-branding`;

const config: IndustryLandingConfig = {
  path: "/luxury-branding",
  brandDesignLayout: true,
  processSteps: [
    { heading: "01", title: "Book a free call", description: "Tell me about your business, audience, and goals. We’ll discuss your priorities, scope, and timing." },
    { heading: "02", title: "Build your identity", description: "I develop a visual direction for your brand, share the work with you, and refine the chosen direction with your feedback." },
    { heading: "03", title: "Put your brand to work", description: "Receive the agreed identity files and guidelines. Website, print, or campaign work can follow in separately scoped weeks." },
  ],
  bannerLines: ["Build a premium brand that reflects the care behind your business.", "Make every introduction feel unmistakably yours."],
  breadcrumb: "Luxury branding",
  service: {
    name: "Luxury branding and website design",
    types: ["Luxury Branding", "Monogram Design", "Luxury Logo Design", "Luxury Website Design"],
    description: "Monograms, wordmarks, logo animation, typography, brand guidelines, print, signage, and websites for luxury and premium brands.",
    audience: "Luxury and premium brands",
  },
  caseStudy: { slug: "airport-executive", title: "Airport Executive: Luxury Chauffeur Rebrand" },
  hero: {
    heading: "Branding & Web\nfor Luxury Brands",
    description: "A considered identity and website for premium businesses, from the logo and typography to the touchpoints your clients encounter.",
    rows: [
      [
        { type: "lottie", src: `${AE}/hero-logo.json`, alt: "Animated Airport Executive logo", bgColor: "#000000" },
        { type: "image", src: `${AE}/01-logos.png`, alt: "Airport Executive monogram and logo system" },
        { type: "video", src: `${AE}/11-escalator.mp4`, alt: "Airport Executive escalator campaign" },
      ],
      [
        { type: "image", src: `${LX}/campaign-banner.webp`, alt: "Airport Executive airport campaign banner" },
        { type: "image", src: `${AE}/10-signage.webp`, alt: "Airport Executive signage", fit: "contain", bgColor: "#000000" },
        { type: "image", src: `${LX}/publication.webp`, alt: "Airport Executive branded publication" },
      ],
      [
        { type: "image", src: `${LX}/business-cards.webp`, alt: "Airport Executive business cards" },
        { type: "image", src: `${AE}/07-website.webp`, alt: "Airport Executive website design", fit: "cover" },
        { type: "image", src: `${AE}/09-merchandise.webp`, alt: "Airport Executive branded vehicle" },
      ],
    ],
  },
  painPoints: {
    heading: "In luxury, every detail is the brand",
    points: [
      { title: "Premium is a feeling", body: "A considered identity expresses the care and character behind your business, from the first introduction onward." },
      { title: "Restraint beats decoration", body: "Typography, color, and imagery should serve your brand idea and audience, with every detail chosen deliberately." },
      { title: "The same at every touchpoint", body: "From the business card to the booking page, signage, and uniforms, a connected visual system helps your brand feel coherent wherever clients encounter it." },
      { title: "A focused sprint", body: "Work directly with Arek, a senior designer with over 20 years of experience, in a focused one-week identity sprint." },
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
    heading: "An aviation-inspired identity for a premium chauffeur service",
    anchor: "airport-executive",
    items: [
      { label: "Monogram", image: { src: `${AE}/01-logos.png`, alt: "Airport Executive monogram and logo system" } },
      { label: "Business Cards", image: { src: `${LX}/business-cards.webp`, alt: "Airport Executive business cards" } },
      { label: "Campaign", image: { src: `${LX}/campaign-banner.webp`, alt: "Airport Executive airport campaign banner" } },
      { label: "Publication", image: { src: `${LX}/publication.webp`, alt: "Airport Executive branded publication" } },
      { label: "Website", image: { src: `${AE}/07-website.webp`, alt: "Airport Executive website design" } },
      { label: "Signage", image: { src: `${AE}/10-signage.webp`, alt: "Airport Executive signage" } },
      { label: "Ads", image: { src: `${AE}/11-escalator.mp4`, alt: "Airport Executive escalator campaign" } },
    ],
  },
  faq: {
    heading: "Questions luxury\nbrand owners ask",
    items: [
      { question: "How much does luxury branding cost?", answer: "$3,000 per week, flat. A scoped brand identity or rebrand is delivered in one week for $3,000, guaranteed. Additional work is scoped separately at the same weekly rate, or a month booked upfront is $10,000. Scope, timing, and total are agreed before booking, and payment is upfront." },
      { question: "What does the identity include?", answer: "The agreed Brand Sprint includes logo concepts and final variations, colors, typography, guidelines, logo animation, and agreed launch assets. Revisions within scope and editable source files are included. We confirm deliverables before starting." },
      { question: "Have you designed a premium brand before?", answer: "Yes. Airport Executive is a premium London chauffeur service. Its rebrand included an aviation-inspired monogram, typography, logo animation, print, signage, campaign graphics, and website design." },
      { question: "Do I need a monogram or a wordmark?", answer: "That depends on your name, audience, and applications. A monogram can work at small sizes while a wordmark carries the full name; we decide what suits your business." },
      { question: "Can you design our website and print materials too?", answer: "Yes. Website design, development, and additional print or campaign work are scoped separately. Website design generally takes one week, followed by one or two weeks of development depending on the agreed scope and page count." },
      { question: "What if I need changes?", answer: "We review the work together and refine the chosen direction. Revisions within the agreed scope are included; any additional work is agreed before proceeding." },
      { question: "Who will I work with?", answer: `You work directly with Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience.` },
    ],
  },
  aboutHeading: "I help premium brands look the part.",
};

export const LuxuryBrandingLanding = () => (
  <>
    <Helmet>
      <title>Luxury Branding &amp; Website Design | Ebaq Design</title>
      <meta name="description" content="Luxury branding for premium brands: monogram and logo design, elegant typography, logo animation, and guidelines. Brand identity in one week for $3,000; websites scoped separately." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Luxury Branding & Website Design | Ebaq Design" />
      <meta property="og:description" content="Luxury branding for premium brands: monogram and logo design, elegant typography, logo animation, and guidelines. Brand identity in one week for $3,000; websites scoped separately." />
      <meta property="og:image" content={`${siteUrl}${AE}/01-logos.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Luxury Branding & Website Design | Ebaq Design" />
      <meta name="twitter:description" content="Brand identity for premium brands in one week for $3,000; website work is scoped separately." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
