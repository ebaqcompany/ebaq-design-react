import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

const FBV = "/case-study/fox-berman";

const foxRow1 = [
  { type: "lottie" as const, src: "/portfolio/logos/foxberman-logo.json", alt: "Animated Fox Berman logo", bgColor: "#f3603c" },
  { type: "image" as const, src: "/images/site/law-firm-landing/fox-berman-logos.webp", alt: "Fox Berman logo system" },
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
  { label: "Colors", image: { src: "/foxberman/foxberman-colors.webp", alt: "Fox Berman color palette" } },
  { label: "Typography", image: { src: "/foxberman/foxberman-fonts.webp", alt: "Fox Berman typography" } },
  { label: "Social", image: { src: "/foxberman/foxberman-social.mp4", alt: "Fox Berman social media graphics" } },
  { label: "Email Signature", image: { src: "/foxberman/foxberman-signature.webp", alt: "Fox Berman email signature" } },
  { label: "Signage", image: { src: "/images/site/law-firm-landing/foxberman-office-exterior.webp", alt: "Fox Berman office signage" } },
  { label: "Business Cards", image: { src: `${FBV}/03-cards.webp`, alt: "Fox Berman business cards" } },
  { label: "Website", image: { src: `${FBV}/04-website.webp`, alt: "Fox Berman website design" } },
];

const pageUrl = `${siteUrl}/law-firm-branding`;
const config: IndustryLandingConfig = {
  path: "/law-firm-branding",
  brandDesignLayout: true,
  breadcrumb: "Law firm branding",
  service: {
    name: "Law firm branding and website design",
    types: ["Law Firm Branding", "Law Firm Logo Design", "Law Firm Website Design"],
    description: "Brand identities, logos, stationery and websites for law firms and attorneys.",
    audience: "Law firms and attorneys",
  },
  caseStudy: { slug: "fox-berman", title: "Fox Berman: Law Firm Branding Case Study" },
  hero: {
    heading: "Branding & Web\nfor Law Firms",
    description: "A considered identity and clear website for your law firm, from the logo and stationery to the digital experience clients encounter.",
    rows: [foxRow1, foxRow2, foxRow3],
  },
  painPoints: {
    heading: "A law firm brand built around your practice",
    points: [
      { title: "Make a clear first impression", body: "A considered identity gives prospective clients a clear, consistent introduction to your firm across the places they encounter it." },
      { title: "Explain your practice", body: "Clear messaging and a thoughtful website help visitors understand your services and how to get in touch." },
      { title: "Express your firm’s character", body: "Your practice, clients, and point of view guide a visual identity that feels appropriate to your firm." },
      { title: "Work directly together", body: "Work with Arek, a senior designer with over 20 years of experience, in a focused one-week identity sprint." },
    ],
  },
  deliverables: { heading: "A practical identity for your firm", items: [] },
  processSteps: [
    { heading: "01", title: "Book a free call", description: "Tell me about your practice, clients, and goals. We’ll discuss the scope, timing, and any professional requirements." },
    { heading: "02", title: "Build your identity", description: "I develop a visual direction for your firm, share the work with you, and refine the chosen direction with your feedback." },
    { heading: "03", title: "Put your brand to work", description: "Receive the agreed identity files and guidelines. Website design and development can follow in separately scoped weeks." },
  ],
  preview: { eyebrow: "Fox Berman case study", anchor: "fox-berman", heading: "A modern identity with Caribbean character", items: foxPreview },
  bannerLines: ["Give your law firm an identity that reflects your practice.", "Make every introduction feel like your firm."],
  faq: { heading: "Questions law firm partners ask", items: [
    { question: "How much does law firm branding cost?", answer: "$3,000 per week, flat. A scoped brand identity or rebrand is delivered in one week for $3,000, guaranteed. Additional work is scoped separately at the same weekly rate, or a month booked upfront is $10,000. Scope, timing, and total are agreed before booking, and payment is upfront." },
    { question: "What does the identity include?", answer: "The agreed Brand Sprint includes logo concepts and final variations, colors, typography, guidelines, logo animation, and agreed launch assets. Revisions within scope and editable source files are included. We confirm the deliverables before starting." },
    { question: "Have you branded a law firm before?", answer: "Yes. Fox Berman is a boutique business and international law firm in Sint Maarten. Its project included a custom wordmark, logo animation, guidelines, stationery, signage, social graphics, and website design." },
    { question: "Can you design our website too?", answer: "Yes. Website design and development are scoped separately. Design in Figma generally takes one week, followed by one or two weeks of development in Framer, Webflow, or Next.js, depending on the agreed scope and page count." },
    { question: "How long does a law firm rebrand take?", answer: "The agreed brand identity is delivered in one week, guaranteed. A website or additional materials take separately scoped time. We confirm the start date and feedback schedule before booking." },
    { question: "What if I need changes?", answer: "We review the work together and refine the chosen direction. Revisions within the agreed scope are included; any additional work is agreed before proceeding." },
    { question: "Do you work with firms outside New York?", answer: `Yes. I’m based in ${studio.location} and work remotely with firms in the US and internationally. Fox Berman is based in Sint Maarten.` },
    { question: "Who will I work with?", answer: "You work directly with Arek Dvornechuck, a senior freelance graphic designer with over 20 years of experience, from the first call to the final files." },
  ] },
  aboutHeading: "Branding built around your firm.",
};

export const LawFirmLanding = () => <>
  <Helmet>
    <title>Law Firm Branding &amp; Website Design in NYC | Ebaq Design</title>
    <meta name="description" content="Law firm branding and websites by a senior designer in Brooklyn: logo, identity, stationery and website design. Brand identity in one week for $3,000." />
    <link rel="canonical" href={pageUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:title" content="Law Firm Branding & Website Design in NYC | Ebaq Design" />
    <meta property="og:description" content="Brand identity and website design for law firms, including the Fox Berman project." />
    <meta property="og:image" content={`${siteUrl}/images/site/law-firm-landing/fox-berman-logos.webp`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Law Firm Branding & Website Design in NYC | Ebaq Design" />
    <meta name="twitter:description" content="Brand identity and website design for law firms. A one-week brand sprint is $3,000." />
  </Helmet>
  <IndustryLandingTemplate {...config} />
</>;
