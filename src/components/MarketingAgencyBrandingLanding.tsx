import { Helmet } from "react-helmet-async";
import { founder, siteUrl, studio } from "../content/siteFacts";
import { caseStudies } from "../data/caseStudies";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-10-16), pending Arek's review: branding for marketing and creative agencies around the Wingnut
// Social case study. Wingnut's shots are 3:2 and 4:3, so they're cropped to 16:9 in /images/site/agency-landing.
// Wingnut's live site runs on WordPress, so the copy says the website was designed, not which platform built it.
const WN = "/case-study/wingnut";
const AG = "/images/site/agency-landing";
const pageUrl = `${siteUrl}/marketing-agency-branding`;
const wingnutQuote = caseStudies.find((study) => study.slug === "wingnut")!.testimonial!;

const config: IndustryLandingConfig = {
  path: "/marketing-agency-branding",
  breadcrumb: "Marketing agency branding",
  service: {
    name: "Marketing agency branding",
    types: ["Marketing Agency Branding", "Agency Logo Design", "Agency Pitch Deck Design", "Agency Website Design"],
    description: "Logos, brand identities, pitch decks, social media templates, and websites for marketing, digital, and creative agencies.",
    audience: "Marketing, digital, and creative agencies",
  },
  caseStudy: { slug: "wingnut", title: "Wingnut Social: Logo & Pitch Deck Case Study" },
  hero: {
    heading: "Branding for\nMarketing Agencies",
    description: "Your agency’s brand is the first piece of work a client judges,\nfrom the logo and pitch deck to the social feed and website.",
    rows: [
      [
        { type: "lottie", src: `${WN}/hero-logo.json`, alt: "Animated Wingnut Social logo", bgColor: "#77aeb1" },
        { type: "image", src: `${AG}/logos.webp`, alt: "Wingnut Social logo system" },
        { type: "video", src: `${AG}/wingnut-website.mp4`, alt: "Wingnut Social website", bgColor: "#1f2934" },
        { type: "image", src: `${AG}/deck.webp`, alt: "Wingnut Social pitch deck" },
      ],
      [
        { type: "image", src: `${AG}/social.webp`, alt: "Wingnut Social Instagram posts" },
        { type: "video", src: `${WN}/13-office.mp4`, alt: "Wingnut Social office branding in motion" },
        { type: "image", src: `${AG}/cards.webp`, alt: "Wingnut Social business cards" },
        { type: "image", src: `${AG}/laptop.webp`, alt: "Wingnut Social video channel on a laptop" },
      ],
    ],
  },
  painPoints: {
    heading: "Your agency’s brand is its first pitch",
    points: [
      { title: "Practice what you pitch", body: "Prospects judge your work by your own brand first. If the logo and website look dated, so does the work you show them." },
      { title: "Own your niche", body: "Wingnut Social serves interior designers and home brands. A refined identity made it look like the expert in that category, not one more generalist agency." },
      { title: "A deck that closes", body: "Your pitch deck and proposals are where deals are won. They should carry the brand, not a stock template." },
      { title: "One week. Done", body: `No six-month rebrand. No junior designers. You work directly with Arek—${founder.experience} of experience, delivered in a focused sprint.` },
    ],
  },
  deliverables: {
    heading: "Everything an agency needs to win clients",
    items: [
      "Custom logo (SVG, PNG, dark/light)",
      "Logo animation",
      "Positioning and messaging",
      "Color palette and typography",
      "Brand guidelines",
      "Pitch deck and proposal design",
      "Social media templates",
      "Business cards and email signature",
      "Merch, badges, and office graphics",
      "Figma web design — desktop, tablet, mobile",
      "Framer, Webflow, or Next.js build",
      "Revisions included",
    ],
  },
  preview: {
    eyebrow: "Wingnut Social case study",
    anchor: "wingnut",
    items: [
      { label: "Logo", image: { src: `${AG}/logos.webp`, alt: "Wingnut Social logo system" } },
      { label: "Pitch Deck", image: { src: `${AG}/deck.webp`, alt: "Wingnut Social pitch deck" } },
      { label: "Social Media", image: { src: `${AG}/social.webp`, alt: "Wingnut Social Instagram posts" } },
      { label: "Website", image: { src: `${AG}/wingnut-website.mp4`, alt: "Wingnut Social website" } },
      { label: "Office Branding", image: { src: `${WN}/13-office.mp4`, alt: "Wingnut Social office branding in motion" } },
    ],
  },
  testimonial: {
    // Quoted from the Wingnut case study, word for word.
    quote: wingnutQuote.quote.replace(/^"|"$/g, ""),
    name: wingnutQuote.name,
    role: `${wingnutQuote.position}, ${wingnutQuote.companyName}`,
    avatar: wingnutQuote.avatar.src,
    logo: { src: wingnutQuote.logo.src, alt: wingnutQuote.logo.alt ?? wingnutQuote.companyName },
    caseStudyUrl: "/work/wingnut",
  },
  faq: {
    heading: "Questions agency\nfounders ask",
    items: [
      { question: "How much does agency branding cost?", answer: "$3,000 per week, flat. A new brand identity or rebrand (logo, logo animation, colors, typography, and brand guidelines) is delivered in one week, guaranteed, for $3,000 total. A pitch deck or social templates usually add one more week, and a website two to three more, at the same rate." },
      { question: "Have you branded a marketing agency before?", answer: "Yes. Wingnut Social is a digital marketing agency for interior designers and home brands. I refined its identity around a simplified wingnut symbol and a clean sans-serif wordmark, then designed its logo animation, pitch deck, social media system, website, business cards, badges, merchandise, and office graphics." },
      { question: "Can you design our pitch deck and proposals?", answer: "Yes. I designed Wingnut Social’s pitch deck alongside its logos. A deck or proposal template is usually one extra week at the same flat rate, so every document a prospect sees looks like the same agency." },
      { question: "Can you refresh our brand without losing what clients recognize?", answer: "Yes. Wingnut’s redesign simplified its familiar symbol and refined the original palette, so the agency looks sharper without losing the character people already knew." },
      { question: "Do you design social media templates?", answer: "Yes. Launch posts and profile images are part of the one-week Brand Sprint. A full social media system like Wingnut’s, or animated templates, usually takes one more week." },
      { question: "Do you also work with consultancies and B2B firms?", answer: "Yes. I designed the mark, verbal positioning, and website for Periti Digital, a HubSpot consultancy with teams across Dublin, Bray, Lisbon, and Munich.", link: { label: "consultancy branding", href: "/consultancy-branding" } },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with ${founder.experience} of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I help agencies look as good as the work they sell.",
};

export const MarketingAgencyBrandingLanding = () => (
  <>
    <Helmet>
      <title>Marketing Agency Branding &amp; Logo Design | Ebaq Design</title>
      <meta name="description" content="Marketing agency branding by a senior freelance designer in NYC: logo, pitch deck, social templates, and website. Brand identity in one week, $3,000 flat." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Marketing Agency Branding & Logo Design | Ebaq Design" />
      <meta property="og:description" content="Marketing agency branding by a senior freelance designer in NYC: logo, pitch deck, social templates, and website. Brand identity in one week, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${WN}/10-deck.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Marketing Agency Branding & Logo Design | Ebaq Design" />
      <meta name="twitter:description" content="Logo, pitch deck, social templates, and website for marketing agencies. Brand identity in one week, guaranteed, $3,000 flat." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
