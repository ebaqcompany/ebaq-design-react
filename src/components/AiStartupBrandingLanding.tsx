import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { caseStudies } from "../data/caseStudies";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-10-16), pending Arek's review: AI startup branding around the Orbio case study, with
// Ventur and NextDim in the hero. NextDim is the AI client with a testimonial on file, so it stands in.
const OR = "/case-study/orbio";
const ND = "/case-study/next-dimension";
const VT = "/case-study/ventur";
const pageUrl = `${siteUrl}/ai-startup-branding`;
const nextDim = caseStudies.find((study) => study.slug === "next-dimension")!.testimonial!;

const config: IndustryLandingConfig = {
  path: "/ai-startup-branding",
  breadcrumb: "AI startup branding",
  service: {
    name: "AI startup branding and website design",
    types: ["AI Startup Branding", "AI Company Logo Design", "Startup Brand Identity", "Startup Website Design"],
    description: "Logos, brand identities, pitch decks, and websites for AI startups and technology companies, designed so the brand doesn't look like every other AI company.",
    audience: "AI startups, founders, and technology companies",
  },
  caseStudy: { slug: "orbio", title: "Orbio: AI Startup Branding Case Study" },
  hero: {
    heading: "Branding for\nAI Startups",
    description: "A brand that explains the product fast and doesn't look like every other AI company,\nfrom the logo and pitch deck to the website investors land on.",
    rows: [
      [
        { type: "video", src: "/portfolio/logos/orbio-logo.mp4", alt: "Animated Orbio logo", bgColor: "#0B0B0C" },
        { type: "image", src: `${OR}/01-flat-orb-sky.webp`, alt: "Orbio orb symbol in the sky" },
        { type: "image", src: `${ND}/logos.webp`, alt: "NextDim AI logo system" },
        { type: "lottie", src: `${VT}/hero-logo.json`, alt: "Animated Ventur logo", bgColor: "#9047ff" },
      ],
      [
        { type: "image", src: `${OR}/02-brand-architecture.webp`, alt: "Orbio brand architecture" },
        { type: "image", src: `${VT}/09-shirt.webp`, alt: "Ventur branded shirt" },
        { type: "video", src: `${OR}/16-social-wall.mp4`, alt: "Orbio social media posts in motion" },
        { type: "image", src: `${ND}/billboard.webp`, alt: "NextDim AI billboard" },
      ],
    ],
  },
  painPoints: {
    heading: "Your AI startup shouldn’t look like the rest",
    points: [
      { title: "Escape the AI uniform", body: "Purple gradients, glowing orbs, and the same sans-serif make most AI brands interchangeable. A distinctive mark is how people remember yours." },
      { title: "Explain the product fast", body: "AI products are hard to describe. Positioning and a clear website turn what the model does into a reason to book a demo." },
      { title: "Look ready to raise", body: "Investors see a hundred decks a month. A coherent identity, deck, and site make an early team look like a company worth backing." },
      { title: "One week. Done", body: "No 6-month agency engagements. No junior designers. You work directly with Arek—over 20 years of experience, delivered in a focused sprint." },
    ],
  },
  deliverables: {
    heading: "Everything an AI startup needs to launch",
    items: [
      "Custom logo (SVG, PNG, dark/light)",
      "Logo animation",
      "Positioning and messaging",
      "Color palette and typography",
      "Brand guidelines",
      "Pitch deck design",
      "Product and social media graphics",
      "Figma web design — desktop, tablet, mobile",
      "Framer, Webflow, or Next.js build",
      "Revisions included",
    ],
  },
  preview: {
    eyebrow: "Orbio case study",
    anchor: "orbio",
    items: [
      { label: "Logo", image: { src: `${OR}/01-logos.webp`, alt: "Orbio logo lockups" } },
      { label: "Architecture", image: { src: `${OR}/02-brand-architecture.webp`, alt: "Orbio brand architecture" } },
      { label: "Typography", image: { src: `${OR}/24-type-scale.webp`, alt: "Orbio type scale" } },
      { label: "Banner", image: { src: `${OR}/05-banner.mp4`, alt: "Orbio banner in motion" } },
      { label: "Social", image: { src: `${OR}/16-social-wall.mp4`, alt: "Orbio social media posts" } },
    ],
  },
  testimonial: {
    // Quoted from the NextDim case study, word for word.
    quote: nextDim.quote.replace(/^"|"$/g, ""),
    name: nextDim.name,
    role: `${nextDim.position}, ${nextDim.companyName}`,
    avatar: nextDim.avatar.src,
    logo: { src: nextDim.logo.src, alt: nextDim.logo.alt ?? nextDim.companyName },
    caseStudyUrl: "/work/next-dimension",
  },
  faq: {
    heading: "Questions AI founders ask",
    items: [
      { question: "How much does AI startup branding cost?", answer: "$3,000 per week, flat. A new brand identity or rebrand (logo, logo animation, colors, typography, and brand guidelines) is delivered in one week, guaranteed, for $3,000 total. A pitch deck or motion adds a week, and the website one to two more, at the same rate." },
      { question: "Have you branded AI startups before?", answer: "Yes. Orbio tokenizes AI inference, and I designed its Greco-Roman orb identity, motion, and website. NextDimension AI automates medical practices with AI agents; I redesigned its identity and website. Ventur is an AI travel planner built around a V monogram drawn as a flowing route." },
      { question: "How do you keep an AI brand from looking generic?", answer: "By starting from what the company actually does instead of the category's visual clichés. Orbio's identity borrows from Greco-Roman coinage rather than neural-network graphics, and NextDim's moves beyond the clinical healthcare look.", link: { label: "Read: AI company branding", href: "/blog/ai-company-branding" } },
      { question: "Can you design our pitch deck and website too?", answer: "Yes. The pitch deck is usually one extra week, and the website is designed in Figma and built in Framer, Webflow, or Next.js in one to two more weeks, depending on the page count." },
      { question: "How fast can we launch?", answer: "The brand identity is delivered in one week, guaranteed. Most AI startups launch a full brand, deck, and website in three to five weeks, with the total agreed before work starts." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I help AI startups look like the company they’re becoming.",
};

export const AiStartupBrandingLanding = () => (
  <>
    <Helmet>
      <title>AI Startup Branding &amp; Logo Design | Ebaq Design</title>
      <meta name="description" content="AI startup branding by a senior freelance designer in NYC: logo, identity, pitch deck, and a website that won't look like every other AI company. $3,000/week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="AI Startup Branding & Logo Design | Ebaq Design" />
      <meta property="og:description" content="AI startup branding by a senior freelance designer in NYC: logo, identity, pitch deck, and a website that won't look like every other AI company. $3,000/week." />
      <meta property="og:image" content={`${siteUrl}${OR}/thumbnail.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Startup Branding & Logo Design | Ebaq Design" />
      <meta name="twitter:description" content="Logo, identity, pitch deck, and website for AI startups. Brand identity in one week, guaranteed, $3,000 flat." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
