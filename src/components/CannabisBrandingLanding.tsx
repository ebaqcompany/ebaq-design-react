import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-10-14), pending Arek's review: cannabis branding around the SweetGrass case study,
// with Medihuanna as a second example. SweetGrass has no widescreen originals, so its 3:2 shots
// are cropped to 16:9 in /images/site/cannabis-landing.
const SG = "/case-study/sweetgrass";
const MH = "/case-study/medihuanna";
const CN = "/images/site/cannabis-landing";
const pageUrl = `${siteUrl}/cannabis-branding`;

const config: IndustryLandingConfig = {
  path: "/cannabis-branding",
  breadcrumb: "Cannabis branding",
  service: {
    name: "Cannabis branding and packaging design",
    types: ["Cannabis Branding", "Dispensary Branding", "Cannabis Packaging Design", "Cannabis Logo Design"],
    description: "Logos, packaging, logo animation, brand guidelines, signage, and websites for cannabis dispensaries, brands, and medical cannabis companies.",
    audience: "Cannabis dispensaries, brands, and medical cannabis companies",
  },
  caseStudy: { slug: "sweetgrass", title: "SweetGrass: Cannabis Branding & Packaging Case Study" },
  hero: {
    heading: "Branding and Web\nfor Cannabis Brands",
    description: "A premium cannabis brand that wins the shelf and clears your state's rules,\nfrom the logo and compliant packaging to the dispensary website.",
    rows: [
      [
        { type: "lottie", src: `${SG}/hero-logo.json`, alt: "Animated SweetGrass logo", bgColor: "#434343" },
        { type: "image", src: `${CN}/bag.webp`, alt: "SweetGrass shopping bag" },
        { type: "video", src: `${CN}/product.mp4`, alt: "SweetGrass dispensary website" },
        { type: "image", src: `${CN}/dropper.webp`, alt: "SweetGrass dropper packaging" },
      ],
      [
        { type: "image", src: `${CN}/business-cards.webp`, alt: "SweetGrass business cards" },
        { type: "image", src: `${CN}/billboard.webp`, alt: "SweetGrass billboard: Elevate your wellness" },
        { type: "lottie", src: "/portfolio/logos/sweetgrass-logo.json", alt: "SweetGrass logo animation", bgColor: "#434343" },
        { type: "image", src: `${CN}/shopping-bags.webp`, alt: "SweetGrass retail bags" },
      ],
      [
        { type: "image", src: `${MH}/01-logos.png`, alt: "Medihuanna logo system" },
        { type: "image", src: `${CN}/medihuanna-cards.webp`, alt: "Medihuanna business cards" },
        { type: "lottie", src: `${MH}/hero-logo.json`, alt: "Animated Medihuanna logo", bgColor: "#11403f" },
        { type: "image", src: `${CN}/medihuanna-signage.webp`, alt: "Medihuanna signage" },
      ],
    ],
  },
  painPoints: {
    heading: "Cannabis buyers judge the brand first",
    points: [
      { title: "Win the shelf", body: "Customers choose in seconds between near-identical products, and you can't advertise your way out of it. The pack, the signage, and the website do the work a campaign would do in any other category." },
      { title: "Premium, not stoner", body: "Leaf icons and neon green look dated. A refined identity speaks to the wellness and premium customers you actually want." },
      { title: "Compliance writes the brief", body: "Warnings, symbols, batch numbers, and a QR code claim the panel before the brand gets any. I block out the regulated area at real size first, then design into what's left." },
      { title: "One week. Done", body: "No 6-month agency engagements. No junior designers. You work directly with Arek—over 20 years of experience, delivered in a focused sprint." },
    ],
  },
  deliverables: {
    heading: "Everything a cannabis brand needs to launch",
    items: [
      "Custom logo and wordmark (SVG, PNG, dark/light)",
      "Logo animation",
      "Color palette, typography, and patterns",
      "Packaging design",
      "Compliant label layout — warnings, symbols, batch panel",
      "Brand guidelines",
      "Business cards and stationery",
      "Shopping bags and merchandise",
      "Signage and billboard design",
      "Figma web design — desktop, tablet, mobile",
      "Framer, Webflow, or Next.js build",
      "Revisions included",
      "All source files delivered",
    ],
  },
  preview: {
    eyebrow: "SweetGrass case study",
    anchor: "sweetgrass",
    items: [
      { label: "Shopping Bag", image: { src: `${CN}/bag.webp`, alt: "SweetGrass shopping bag" } },
      { label: "Packaging", image: { src: `${CN}/dropper.webp`, alt: "SweetGrass dropper packaging" } },
      { label: "Business Cards", image: { src: `${CN}/business-cards.webp`, alt: "SweetGrass business cards" } },
      { label: "Billboard", image: { src: `${CN}/billboard.webp`, alt: "SweetGrass billboard: Elevate your wellness" } },
      { label: "Retail Bags", image: { src: `${CN}/shopping-bags.webp`, alt: "SweetGrass retail bags" } },
      { label: "Website", image: { src: `${CN}/product.mp4`, alt: "SweetGrass dispensary website" } },
    ],
  },
  testimonial: {
    quote: "Arek is a magic visionary with sharp attention to detail.",
    name: "Jane de Abreu",
    role: "Founder, SweetGrass",
    avatar: `${SG}/jane-de-abreu.webp`,
    logo: { src: "/client-logos/sweetgrass-logo-black.svg", alt: "SweetGrass" },
    websiteUrl: "https://www.sweetgrassdispensaries.com/",
    caseStudyUrl: "/work/sweetgrass",
  },
  faq: {
    heading: "Questions cannabis\nfounders ask",
    items: [
      { question: "How much does cannabis branding cost?", answer: "$3,000 per week, flat. A new cannabis brand identity or rebrand (logo, logo animation, colors, typography, patterns, and brand guidelines) is delivered in one week, guaranteed, for $3,000 total. Packaging is scoped by the number of products, at the same weekly rate." },
      { question: "How long does a cannabis rebrand take?", answer: "One week for the brand identity, guaranteed. Packaging and the website follow at the same weekly rate; a website usually takes one to two more weeks, depending on the number of pages." },
      { question: "Have you branded cannabis companies before?", answer: "Yes. SweetGrass is a premium cannabis dispensary in Mississippi: I designed its Art Deco-inspired wordmark, custom typography, seamless patterns, packaging, brochure, billboards, and website. I also redesigned the logo and identity for Medihuanna, an accredited medicinal cannabis education provider in Sydney." },
      { question: "Do you design cannabis packaging?", answer: "Yes. For SweetGrass I designed a packaging system across jars, droppers, and retail bags, built from the same patterns, colors, and typography as the rest of the brand." },
      { question: "Do you handle cannabis packaging compliance?", answer: "I design around it. Your state decides the warning text, the symbol, its minimum size, and what has to sit on the primary panel, so I block that regulated area out at real size before any brand element goes down, then design into the space that's left. You or your lawyer confirm the final text against your state's current rules — I make sure the design never fights them.", link: { label: "Read: cannabis branding", href: "/blog/cannabis-branding" } },
      { question: "Can a cannabis brand look premium?", answer: "Yes, and it should. SweetGrass skips the usual leaf-and-neon clichés for an Art Deco-inspired wordmark, bespoke typography, and refined patterns that feel closer to a boutique than a head shop." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience. You work with me directly from the first call to the final files, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I help cannabis brands look premium.",
};

export const CannabisBrandingLanding = () => (
  <>
    <Helmet>
      <title>Cannabis Branding &amp; Packaging Design | Ebaq Design</title>
      <meta name="description" content="Cannabis branding for dispensaries and brands: logo, compliant packaging, logo animation, brand guidelines, and a website. Brand identity in one week, $3,000 flat." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Cannabis Branding & Packaging Design | Ebaq Design" />
      <meta property="og:description" content="Cannabis branding for dispensaries and brands: logo, compliant packaging, logo animation, brand guidelines, and a website. Brand identity in one week, $3,000 flat." />
      <meta property="og:image" content={`${siteUrl}${CN}/shopping-bags.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Cannabis Branding & Packaging Design | Ebaq Design" />
      <meta name="twitter:description" content="Logo, packaging, and a dispensary website for cannabis brands. One week, guaranteed, $3,000 flat." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
