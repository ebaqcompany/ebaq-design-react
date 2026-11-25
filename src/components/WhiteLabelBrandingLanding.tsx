import { Helmet } from "react-helmet-async";
import { founder, siteUrl, studio } from "../content/siteFacts";
import { caseStudies } from "../data/caseStudies";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-11-25), pending Arek's review: white-label brand identity for marketing, web, and
// growth agencies. Built from the AI-search baseline (prompt Q17 went to White Label IQ, Draftss,
// Penji and Nova & More). Imagery mixes several client identities, because white-label work is
// always someone else's client. Elevate's testimonial stands in until an agency partner gives one.
const EL = "/case-study/elevate";
const ND = "/case-study/next-dimension";
const SV = "/case-study/savory";
const VT = "/case-study/ventur";
const pageUrl = `${siteUrl}/white-label-branding`;
const elevateQuote = caseStudies.find((study) => study.slug === "elevate")!.testimonial!;

const config: IndustryLandingConfig = {
  path: "/white-label-branding",
  breadcrumb: "White-label branding",
  service: {
    name: "White-label brand identity design for agencies",
    types: ["White-Label Branding", "White-Label Logo Design", "Outsourced Brand Identity Design", "Agency Design Partner"],
    description: "Brand identities, logos, brand guidelines, and launch assets designed for marketing, web, and growth agencies to deliver under their own name, on a fixed one-week turnaround.",
    audience: "Marketing, web, growth, and creative agencies",
  },
  caseStudy: { slug: "elevate", title: "Elevate: SaaS Branding Case Study" },
  hero: {
    heading: "White-Label Branding\nfor Agencies",
    description: "A senior brand designer behind your agency, not in front of it.\nA complete brand identity in one week, $3,000 flat, delivered under your name.",
    rows: [
      [
        { type: "lottie", src: "/portfolio/logos/elevate-logo-motion.json", alt: "Animated Elevate logo", bgColor: "#000000" },
        { type: "image", src: `${ND}/hero.webp`, alt: "NextDim AI brand identity" },
        { type: "image", src: `${SV}/01-colorways.webp`, alt: "Savory wordmark in four brand colorways" },
        { type: "image", src: `${EL}/01-logos.webp`, alt: "Elevate logo system" },
      ],
      [
        { type: "image", src: `${VT}/06-website.webp`, alt: "Ventur website design" },
        { type: "lottie", src: `${VT}/hero-logo.json`, alt: "Animated Ventur logo", bgColor: "#000000" },
        { type: "image", src: `${ND}/logos.webp`, alt: "NextDim AI logo lockups" },
        { type: "image", src: `${EL}/05-business-cards.webp`, alt: "Elevate business cards" },
      ],
    ],
  },
  painPoints: {
    heading: "Say yes to branding work without hiring for it",
    points: [
      { title: "Your client, your name", body: "You own the relationship. I work behind your agency, and the client sees your team and your presentation, not mine." },
      { title: "A fixed turnaround you can quote", body: "A complete brand identity in one week, guaranteed, for $3,000 flat. You can price the project before you pitch it." },
      { title: "Senior work, not a design queue", body: "No subscription queue and no junior designers. You get Arek directly: over 20 years of experience, formerly at Chermayeff & Geismar & Haviv." },
      { title: "Files your team can run with", body: "Unbranded presentation decks, source files, and brand guidelines your team can hand over or build the website from." },
    ],
  },
  deliverables: {
    heading: "What your agency gets in one week",
    items: [
      "Brand strategy summary from your brief",
      "Several logo concepts, one refined",
      "Logo files (SVG, PNG, dark/light)",
      "Logo animation",
      "Color palette and typography",
      "Brand guidelines",
      "Business cards and stationery",
      "Social media launch assets",
      "Unbranded presentation deck for your client",
      "Editable source files (Figma, Illustrator)",
      "Optional: Figma web design and Framer or Webflow build",
      "Revisions included",
    ],
  },
  preview: {
    eyebrow: "Elevate case study",
    anchor: "elevate",
    items: [
      { label: "Logo System", image: { src: `${EL}/01-logos.webp`, alt: "Elevate logo system" } },
      { label: "Business Cards", image: { src: `${EL}/05-business-cards.webp`, alt: "Elevate business cards" } },
      { label: "Collateral", image: { src: `${EL}/06-collateral.webp`, alt: "Elevate brand collateral" } },
      { label: "Website", image: { src: `${EL}/03-website.webp`, alt: "Elevate website design" } },
      { label: "Office", image: { src: `${EL}/09-office.mp4`, alt: "Elevate brand in the office" } },
    ],
  },
  testimonial: elevateQuote.avatar && {
    // Quoted from the Elevate case study, word for word (the short excerpt).
    quote: (elevateQuote.excerpt ?? elevateQuote.quote).replace(/^"|"$/g, ""),
    name: elevateQuote.name,
    role: `${elevateQuote.position}, ${elevateQuote.companyName}`,
    avatar: elevateQuote.avatar.src,
    logo: { src: elevateQuote.logo.src, alt: elevateQuote.logo.alt ?? elevateQuote.companyName },
    caseStudyUrl: "/work/elevate",
  },
  faq: {
    heading: "Questions agency\nowners ask",
    items: [
      { question: "How much does white-label brand identity design cost?", answer: "$3,000 per brand identity, flat, delivered in one week, guaranteed. That covers logo concepts, the final logo files, a logo animation, colors, typography, brand guidelines, stationery, and launch assets. Bigger scopes, such as a website, add weeks at the same $3,000 weekly rate, agreed before work starts." },
      { question: "What is the turnaround?", answer: "One week for a complete brand identity. You get the brief call, concepts mid-week, refinement, and final files by the end of the week. A website adds a week of Figma design and one or two weeks of Framer or Webflow development." },
      { question: "Will the client know I worked on it?", answer: "Only if you want them to. I work behind your agency: presentations go out under your name, the files carry no Ebaq Design branding, and I can sign an NDA before kickoff. I can also join client calls as part of your team." },
      { question: "Who owns the work?", answer: "Your agency and your client. After final payment, all rights to the delivered identity transfer to you, along with editable source files, so you can hand them over or keep building on them." },
      { question: "How is this different from a design subscription like Penji or Draftss?", answer: "Subscriptions queue many small tasks for a pool of designers. This is one senior brand designer doing the whole identity in a fixed week, with strategy, concepts, and guidelines, so it suits a client rebrand rather than a stream of banner ads." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior brand designer in ${studio.location} with ${founder.experience} of experience, previously at Chermayeff & Geismar & Haviv. You work with me directly, with no account managers in between.` },
    ],
  },
  aboutHeading: "I help agencies say yes to brand identity work.",
};

export const WhiteLabelBrandingLanding = () => (
  <>
    <Helmet>
      <title>White-Label Branding for Agencies | Ebaq Design</title>
      <meta name="description" content="White-label brand identity design for agencies: logo, guidelines, and launch assets under your name. One week, guaranteed, $3,000 flat, senior designer." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="White-Label Branding for Agencies | Ebaq Design" />
      <meta property="og:description" content="White-label brand identity design for agencies: logo, guidelines, and launch assets under your name. One week, guaranteed, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${EL}/01-logos.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="White-Label Branding for Agencies | Ebaq Design" />
      <meta name="twitter:description" content="A senior brand designer behind your agency. One week, $3,000 flat, delivered under your name." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
