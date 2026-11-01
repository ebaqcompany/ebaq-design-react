import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-10-14), pending Arek's review: consultancy branding around the Periti Digital case
// study. Periti has no widescreen originals, so its 3:2 and 4:3 shots are cropped to 16:9 in
// /images/site/consultancy-landing. Periti has no testimonial yet, so Wingnut Social's stands in;
// the Wingnut pitch deck sits in the preview strip so the quote has visible work behind it.
const PT = "/case-study/periti";
const CO = "/images/site/consultancy-landing";
const pageUrl = `${siteUrl}/consultancy-branding`;

const config: IndustryLandingConfig = {
  path: "/consultancy-branding",
  breadcrumb: "Consultancy branding",
  service: {
    name: "Consultancy branding and website design",
    types: ["Consultancy Branding", "Professional Services Branding", "B2B Brand Identity", "Consultancy Website Design"],
    description: "Logos, positioning and verbal identity, brand guidelines, stationery, proposals, pitch decks, and websites for consultancies and B2B professional services firms.",
    audience: "Consultancies, agencies, and B2B professional services firms",
  },
  caseStudy: { slug: "periti", title: "Periti Digital: Consultancy Branding Case Study" },
  hero: {
    heading: "Branding and Web\nfor Consultancies",
    description: "A brand that makes your expertise obvious before the first call,\nfrom the logo and positioning to the website that books it.",
    rows: [
      [
        { type: "lottie", src: `${PT}/hero-logo.json`, alt: "Animated Periti Digital logo", bgColor: "#000000" },
        { type: "image", src: `${CO}/business-cards.webp`, alt: "Periti Digital business cards" },
        { type: "video", src: `${CO}/website.mp4`, alt: "Periti Digital website" },
        { type: "image", src: `${CO}/stationery.webp`, alt: "Periti Digital stationery" },
      ],
      [
        { type: "image", src: `${CO}/laptop.webp`, alt: "Periti Digital website on a laptop" },
        { type: "lottie", src: "/portfolio/logos/periti-logo.json", alt: "Periti Digital logo animation", bgColor: "#000000" },
        { type: "image", src: `${CO}/website.webp`, alt: "Periti Digital website on tablet and phone" },
        { type: "image", src: `${CO}/business-cards.webp`, alt: "Periti Digital business card design" },
      ],
    ],
  },
  painPoints: {
    heading: "Your brand should sound like your expertise",
    points: [
      { title: "Look as senior as you are", body: "Clients buy expertise they can't see yet. A precise identity makes a small team look like the obvious, established choice." },
      { title: "Say what you do, clearly", body: "Most consultancies sound the same. Clear positioning and a verbal identity turn “digital transformation” into a reason to hire you." },
      { title: "One firm in every market", body: "Proposals, decks, LinkedIn, and the website should feel like one firm, whether your team is in Dublin or Munich." },
      { title: "One week. Done", body: "No 6-month agency engagements. No junior designers. You work directly with Arek—over 20 years of experience, delivered in a focused sprint." },
    ],
  },
  deliverables: {
    heading: "Everything a consultancy needs to win clients",
    items: [
      "Custom logo (SVG, PNG, dark/light)",
      "Logo animation",
      "Positioning and verbal identity",
      "Color palette and typography",
      "Brand guidelines",
      "Business cards, letterhead, and stationery",
      "Email signature",
      "Proposal and pitch deck design",
      "LinkedIn and social media graphics",
      "Figma web design — desktop, tablet, mobile",
      "Framer, Webflow, or Next.js build",
      "Revisions included",
    ],
  },
  preview: {
    eyebrow: "Periti Digital and Wingnut Social case studies",
    anchor: "periti",
    items: [
      { label: "Business Cards", image: { src: `${CO}/business-cards.webp`, alt: "Periti Digital business cards" } },
      { label: "Stationery", image: { src: `${CO}/stationery.webp`, alt: "Periti Digital stationery" } },
      { label: "Pitch Deck", image: { src: `${CO}/pitch-deck.webp`, alt: "Wingnut Social pitch deck" } },
      { label: "Website", image: { src: `${CO}/website.mp4`, alt: "Periti Digital website" } },
      { label: "Responsive Web", image: { src: `${CO}/website.webp`, alt: "Periti Digital website on tablet and phone" } },
      { label: "Brand in Use", image: { src: `${CO}/laptop.webp`, alt: "Periti Digital website on a laptop" } },
    ],
  },
  testimonial: {
    quote: "We had a terrific experience working with Arek on our logos and pitch deck. Highly recommended!",
    name: "Darla Powell",
    role: "Founder, Wingnut Social",
    avatar: "/images/site/testimonial32/darla-powell.webp",
    logo: { src: "/client-logos/wingnut-logo-black.svg", alt: "Wingnut Social" },
    caseStudyUrl: "/work/wingnut",
  },
  faq: {
    heading: "Questions consultancy\nleaders ask",
    items: [
      { question: "How much does consultancy branding cost?", answer: "$3,000 per week, flat. A new consultancy brand identity or rebrand (logo, logo animation, colors, typography, brand guidelines, and stationery) is delivered in one week, guaranteed, for $3,000 total. Branding agencies often charge $25,000 to $100,000 or more for the same scope." },
      { question: "How long does a consultancy rebrand take?", answer: "One week for the brand identity, guaranteed. The website follows in one to two more weeks, depending on the number of pages, and proposal templates or a pitch deck take another week. Everything is at the same weekly rate, agreed before work starts." },
      { question: "Have you branded a consultancy before?", answer: "Yes. Periti Digital is a HubSpot consultancy with teams across Dublin, Bray, Lisbon, and Munich. I designed its architectural mark, verbal positioning, visual system, website, stationery, social templates, and email signature. I've also branded Wingnut Social, a digital marketing agency for interior designers and home brands, including its logo, pitch deck, and social media system." },
      { question: "Do you help with positioning and messaging?", answer: "Yes. Positioning comes first, because a consultancy's brand is mostly what it says. Periti's identity included a verbal identity and clear positioning alongside the visual system." },
      { question: "Do you design proposals and pitch decks?", answer: "Yes. I design proposal templates and pitch decks that match the brand, like the Wingnut Social deck shown on this page, so every document a client receives looks like the same firm.", link: { label: "Read: consultancy branding", href: "/blog/consultancy-branding" } },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I help consultancies look as senior as they are.",
};

export const ConsultancyBrandingLanding = () => (
  <>
    <Helmet>
      <title>Consultancy Branding &amp; Website Design | Ebaq Design</title>
      <meta name="description" content="Branding for consultancies and B2B firms: logo, positioning, brand guidelines, stationery, pitch decks, and a website. Brand identity in one week, $3,000 flat." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Consultancy Branding & Website Design | Ebaq Design" />
      <meta property="og:description" content="Branding for consultancies and B2B firms: logo, positioning, brand guidelines, stationery, pitch decks, and a website. Brand identity in one week, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${CO}/business-cards.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Consultancy Branding & Website Design | Ebaq Design" />
      <meta name="twitter:description" content="Logo, positioning, pitch decks, and a website for consultancies. One week, guaranteed, $3,000 flat." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
