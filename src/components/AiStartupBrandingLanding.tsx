import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

const OR = "/case-study/orbio";
const pageUrl = `${siteUrl}/ai-startup-branding`;

const config: IndustryLandingConfig = {
  path: "/ai-startup-branding",
  brandDesignLayout: true,
  breadcrumb: "AI startup branding",
  service: {
    name: "AI startup branding and website design",
    types: ["AI Startup Branding", "AI Company Logo Design", "Startup Brand Identity", "Startup Website Design"],
    description: "Logos, brand identities, pitch decks, and websites for AI startups and technology companies, designed so the brand doesn't look like every other AI company.",
    audience: "AI startups, founders, and technology companies",
  },
  caseStudy: { slug: "orbio", title: "Orbio: AI Startup Branding Case Study" },
  hero: {
    heading: "Branding & Web\nfor AI Startups",
    description: "A distinctive identity and clear website for your AI startup,\nfrom the logo and brand system to the pitch deck and launch.",
    rows: [
      [
        { type: "video", src: `${OR}/hero-orb.mp4`, alt: "Animated Orbio logo", bgColor: "#0B0B0C" },
        { type: "video", src: `${OR}/04-heroes-hero-wide.mp4`, alt: "Orbio website hero designs", fit: "contain" },
        { type: "video", src: `${OR}/05-banner.mp4`, alt: "Orbio banner with animated CREDIT coins" },
      ],
      [
        { type: "video", src: `${OR}/11-card-carousel.mp4`, alt: "Orbio animated card carousel" },
        { type: "video", src: `${OR}/12-card-where-meets.mp4`, alt: "Orbio animated Where meets cards" },
        { type: "video", src: `${OR}/16-social-wall.mp4`, alt: "Orbio social posts in motion" },
      ],
      [
        { type: "image", src: `${OR}/26-tee-horae.webp`, alt: "Orbio T-shirt design" },
        { type: "video", src: `${OR}/03-colors.mp4`, alt: "Orbio color palette in motion" },
        { type: "video", src: `${OR}/25-type-trio.mp4`, alt: "Orbio typefaces in motion" },
      ],
    ],
  },
  painPoints: {
    heading: "Your AI startup shouldn’t look like the rest",
    points: [
      { title: "Escape the AI uniform", body: "A distinctive identity starts with what makes your product and audience different, then carries that idea across every touchpoint." },
      { title: "Explain the product fast", body: "Complex products need clear language. Positioning and a thoughtful website help the right people understand what you offer." },
      { title: "Look ready to raise", body: "A coherent identity, deck, and website give your team a consistent way to present its ambition to investors and customers." },
      { title: "A focused sprint", body: "Work directly with Arek, a senior designer with over 20 years of experience, in a focused one-week identity sprint." },
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
    heading: "An identity built around Orbio’s marble orb",
    anchor: "orbio",
    items: [
      { label: "Logo", image: { src: `${OR}/01-logos.webp`, alt: "Orbio logo lockups" } },
      { label: "Architecture", image: { src: `${OR}/02-brand-architecture.webp`, alt: "Orbio brand architecture" } },
      { label: "Colors", image: { src: `${OR}/03-colors.mp4`, alt: "Orbio color palette in motion" } },
      { label: "Typography", image: { src: `${OR}/24-type-scale.webp`, alt: "Orbio type scale" } },
      { label: "Website", image: { src: `${OR}/04-heroes.mp4`, alt: "Orbio website hero designs" } },
      { label: "Banner", image: { src: `${OR}/05-banner.mp4`, alt: "Orbio banner in motion" } },
      { label: "Social", image: { src: `${OR}/16-social-wall.mp4`, alt: "Orbio social media posts" } },
      { label: "Merchandise", image: { src: `${OR}/26-tee-horae.webp`, alt: "Orbio T-shirt design" } },
    ],
  },
  faq: {
    heading: "Questions AI founders ask",
    items: [
      { question: "How much does AI startup branding cost?", answer: "$3,000 per week, flat. A new brand identity or rebrand (logo, logo animation, colors, typography, and brand guidelines) is delivered in one week, guaranteed, for $3,000 total. Additional work is scoped separately at the same weekly rate, or you can book a month upfront for $10,000. We agree on scope, timing, and total before booking, and payment is upfront." },
      { question: "Have you branded AI startups before?", answer: "Yes. For Orbio, an AI inference startup, I evolved its existing marble orb into a brand system with a serif wordmark, color and typography, motion, social templates, and website designs." },
      { question: "How do you keep an AI brand from looking generic?", answer: "I start with what your product does, who it serves, and how you want to be perceived. Those decisions guide the visual direction, rather than copying a category trend." },
      { question: "Can you design our pitch deck and website too?", answer: "Yes. The pitch deck is usually one extra week, and the website is designed in Figma in one week, then built in Framer, Webflow, or Next.js in one or two more weeks, depending on the page count and agreed scope." },
      { question: "How fast can we launch?", answer: "The agreed brand identity is delivered in one week, guaranteed. A brand, deck, and website can take four to five weeks depending on scope. We confirm the start date and feedback schedule before booking." },
      { question: "What if I need changes?", answer: "We review the work together and refine the chosen direction. Revisions within the agreed scope are included; any additional work is agreed before proceeding." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I help AI startups stand out.",
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
