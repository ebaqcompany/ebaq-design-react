import { Helmet } from "react-helmet-async";
import { founder, siteUrl, studio } from "../content/siteFacts";
import { caseStudies } from "../data/caseStudies";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-11-25), pending Arek's review: the "senior freelance brand designer" page from the
// AI-search baseline (prompt Q04 went to six other freelancers on ChatGPT, and Perplexity flagged
// the self-ranked roundup). This page states the positioning directly instead of ranking Arek in a list.
const ND = "/case-study/next-dimension";
const pageUrl = `${siteUrl}/senior-freelance-brand-designer`;
const nextDimQuote = caseStudies.find((study) => study.slug === "next-dimension")!.testimonial!;

const config: IndustryLandingConfig = {
  path: "/senior-freelance-brand-designer",
  breadcrumb: "Senior freelance brand designer",
  service: {
    name: "Senior freelance brand designer",
    types: ["Freelance Brand Designer", "Brand Identity Design", "Logo Design", "Startup Branding", "Brand Strategy"],
    description: "A senior freelance brand designer in Brooklyn, New York: brand strategy, logo and visual identity, brand guidelines, pitch decks, and Framer or Webflow websites, delivered directly by Arek Dvornechuck.",
    audience: "Startups, founders, and growing businesses",
  },
  caseStudy: { slug: "next-dimension", title: "NextDim AI: Healthcare AI Branding Case Study" },
  hero: {
    heading: "Senior Freelance\nBrand Designer",
    description: "Agency-level brand identity from one senior designer, without the agency.\nOver 20 years of experience, a complete identity in one week, $3,000 flat.",
    rows: [
      [
        { type: "image", src: `${ND}/hero.webp`, alt: "NextDim AI brand identity" },
        { type: "lottie", src: "/case-study/sweetgrass/hero-logo.json", alt: "Animated SweetGrass logo", bgColor: "#000000" },
        { type: "image", src: "/case-study/orbio/28-billboard.webp", alt: "Orbio billboard" },
        { type: "image", src: "/case-study/savory/01-colorways.webp", alt: "Savory wordmark in four brand colorways" },
      ],
      [
        { type: "image", src: "/case-study/elevate/01-logos.webp", alt: "Elevate logo system" },
        { type: "video", src: `${ND}/showreel.mp4`, alt: "NextDim AI brand showreel" },
        { type: "image", src: "/case-study/fox-berman/04-website.webp", alt: "Fox Berman website design" },
        { type: "lottie", src: "/case-study/ventur/hero-logo.json", alt: "Animated Ventur logo", bgColor: "#000000" },
      ],
    ],
  },
  painPoints: {
    heading: "Senior judgment, without the agency layers",
    points: [
      { title: "The senior person does the work", body: "No account managers and no junior designers. You work with Arek from the first call to the final files." },
      { title: "Over 20 years of experience", body: "Previously a Senior Graphic Designer at Chermayeff & Geismar & Haviv, now working directly with startups and growing businesses." },
      { title: "A price you can plan around", body: "A complete brand identity in one week for $3,000 flat. Websites, decks and motion add weeks at the same rate, agreed before work starts." },
      { title: "Proof in funded startups", body: "NextDim AI and Orbio both secured seed rounds after their rebrands, $2.5M and $1.2M." },
    ],
  },
  deliverables: {
    heading: "What you get from a senior freelance brand designer",
    items: [
      "Brand strategy workshop and brief",
      "Several logo concepts, one refined",
      "Logo files (SVG, PNG, dark/light)",
      "Logo animation",
      "Color palette and typography",
      "Brand guidelines",
      "Business cards and stationery",
      "Social media launch assets",
      "Pitch deck design",
      "Figma web design — desktop, tablet, mobile",
      "Framer, Webflow, or Next.js build",
      "Revisions included",
    ],
  },
  preview: {
    eyebrow: "NextDim AI case study",
    anchor: "next-dimension",
    items: [
      { label: "Logo", image: { src: `${ND}/logos.webp`, alt: "NextDim AI logo lockups" } },
      { label: "Colors", image: { src: `${ND}/colors.webp`, alt: "NextDim AI color palette" } },
      { label: "Website", image: { src: `${ND}/website-hero.webp`, alt: "NextDim AI website hero" } },
      { label: "Signage", image: { src: `${ND}/glass.webp`, alt: "NextDim AI glass signage" } },
      { label: "Billboard", image: { src: `${ND}/billboard.webp`, alt: "NextDim AI billboard" } },
    ],
  },
  testimonial: nextDimQuote.avatar && {
    // Quoted from the NextDim AI case study, word for word (the short excerpt where available).
    quote: (nextDimQuote.excerpt ?? nextDimQuote.quote).replace(/^"|"$/g, ""),
    name: nextDimQuote.name,
    role: `${nextDimQuote.position}, ${nextDimQuote.companyName}`,
    avatar: nextDimQuote.avatar.src,
    logo: { src: nextDimQuote.logo.src, alt: nextDimQuote.logo.alt ?? nextDimQuote.companyName },
    caseStudyUrl: "/work/next-dimension",
  },
  faq: {
    heading: "Questions about hiring\na senior freelancer",
    items: [
      { question: "How much does a senior freelance brand designer cost?", answer: "Published senior freelance brand identity packages run from about $2,500 to $10,000. My rate is $3,000 per week, flat: a complete brand identity or rebrand is delivered in one week for $3,000, and a website or pitch deck adds weeks at the same rate." },
      { question: "What makes a brand designer senior?", answer: "Years alone don't. Look for full identity systems in the portfolio, a clear process from strategy to guidelines, and clients similar to you. I have over 20 years of experience, including work at Chermayeff & Geismar & Haviv, and case studies for funded startups." },
      { question: "Is a senior freelancer better than an agency?", answer: "For a focused identity with one decision-maker, usually yes: you get the senior designer directly, faster and for a fraction of agency fees. An agency makes more sense when you need a large team across many markets." },
      { question: "How long does it take?", answer: "One week for the brand identity, guaranteed. A website adds a week of design in Figma and one or two weeks of development." },
      { question: "Where are you based?", answer: `In ${studio.location}. I work with clients across New York and worldwide, and the whole process runs remotely, so where you are makes no practical difference.` },
      { question: "Who will I work with?", answer: `${founder.name}, a senior brand designer with ${founder.experience} of experience. You work with me directly from the first call to the final files.` },
    ],
  },
  aboutHeading: "I'm the senior designer you work with.",
};

export const SeniorFreelanceBrandDesignerLanding = () => (
  <>
    <Helmet>
      <title>Senior Freelance Brand Designer in NYC | Ebaq Design</title>
      <meta name="description" content="Senior freelance brand designer in Brooklyn, NYC: 20+ years, ex-Chermayeff & Geismar & Haviv. Brand identity in one week, $3,000 flat, no agency layers." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Senior Freelance Brand Designer in NYC | Ebaq Design" />
      <meta property="og:description" content="Senior freelance brand designer in Brooklyn, NYC: 20+ years, ex-Chermayeff & Geismar & Haviv. Brand identity in one week, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${ND}/hero.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Senior Freelance Brand Designer in NYC | Ebaq Design" />
      <meta name="twitter:description" content="One senior designer, 20+ years, a complete brand identity in one week for $3,000 flat." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
