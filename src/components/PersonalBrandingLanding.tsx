import { Helmet } from "react-helmet-async";
import { siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

const NS = "/case-study/nathalie-sadler";
const pageUrl = `${siteUrl}/personal-branding`;
const config: IndustryLandingConfig = {
  path: "/personal-branding",
  brandDesignLayout: true,
  breadcrumb: "Personal branding",
  service: { name: "Personal branding and website design", types: ["Personal Brand Identity", "Personal Logo Design", "Personal Brand Website Design"], description: "Personal brand identities, logos, and websites for founders, speakers, consultants, and experts.", audience: "Founders, speakers, consultants, and independent experts" },
  caseStudy: { slug: "nathalie-sadler", title: "Nathalie Sadler: Personal Branding Case Study" },
  hero: {
    heading: "Branding & Web\nfor Personal Brands",
    description: "An identity and website shaped around your work and audience, whether you’re a coach, consultant, founder, or independent professional.",
    rows: [
      [
        { type: "image", src: `${NS}/00-logo-black.webp`, alt: "Nathalie Sadler wordmark and monogram", fit: "contain", bgColor: "#0B0B0B" },
        { type: "image", src: `${NS}/03-monogram-gold.webp`, alt: "Nathalie Sadler gold monogram", fit: "contain", bgColor: "#0B0B0B" },
        { type: "image", src: `${NS}/05-typeface.webp`, alt: "Nathalie Sadler typography system", fit: "contain", bgColor: "#0B0B0B" },
      ],
      [
        { type: "image", src: `${NS}/07-mockup.webp`, alt: "Nathalie Sadler speaker coaching website design", fit: "contain", bgColor: "#0B0B0B" },
        { type: "image", src: `${NS}/12-business-card.webp`, alt: "Nathalie Sadler business card design", fit: "contain", bgColor: "#0B0B0B" },
        { type: "image", src: `${NS}/06-instagram-updated.png`, alt: "Nathalie Sadler print cards with a gold monogram and dark grey pattern" },
      ],
      [
        { type: "image", src: `${NS}/08-colors.webp`, alt: "Nathalie Sadler color palette", fit: "contain", bgColor: "#0B0B0B" },
        { type: "image", src: `${NS}/12-linkedin-banner.webp`, alt: "Nathalie Sadler LinkedIn banner design", fit: "contain", bgColor: "#0B0B0B" },
        { type: "image", src: `${NS}/10-monogram-construction.webp`, alt: "Nathalie Sadler monogram construction", fit: "contain", bgColor: "#0B0B0B" },
      ],
    ],
  },
  painPoints: { heading: "A personal brand built around your work", points: [
    { title: "Make your work clear", body: "A clear identity and website help people understand what you do and who you help." },
    { title: "Express your perspective", body: "Your expertise, personality, and audience guide the visual direction, whether your brand calls for an editorial luxury look or a different style altogether." },
    { title: "Connect every touchpoint", body: "A coherent system gives your website, presentations, social profiles, and materials a shared foundation." },
    { title: "Work directly together", body: "Work with Arek, a senior designer with over 20 years of experience, in a focused one-week identity sprint." },
  ] },
  deliverables: { heading: "A personal identity you can use", items: [] },
  processSteps: [
    { heading: "01", title: "Book a free call", description: "Tell me about your work, audience, and goals. We’ll discuss your priorities, scope, and timing." },
    { heading: "02", title: "Build your identity", description: "I develop a visual direction for your personal brand, share the work with you, and refine the chosen direction with your feedback." },
    { heading: "03", title: "Put your brand to work", description: "Receive the agreed identity files and guidelines. Website, presentation, or additional content can follow in separately scoped weeks." },
  ],
  preview: { eyebrow: "Nathalie Sadler case study", anchor: "nathalie-sadler", heading: "An editorial luxury identity for a speaking coach", items: [
    { label: "Logo", image: { src: `${NS}/00-logo-black.webp`, alt: "Nathalie Sadler monogram and wordmark" } },
    { label: "Monogram", image: { src: `${NS}/10-monogram-construction.webp`, alt: "Nathalie Sadler monogram construction" } },
    { label: "Typography", image: { src: `${NS}/05-typeface.webp`, alt: "Nathalie Sadler typography system" } },
    { label: "Colors", image: { src: `${NS}/08-colors.webp`, alt: "Nathalie Sadler color palette" } },
    { label: "Print", image: { src: `${NS}/06-instagram-updated.png`, alt: "Nathalie Sadler print cards with a gold monogram and dark grey pattern" } },
    { label: "Business Cards", image: { src: `${NS}/12-business-card.webp`, alt: "Nathalie Sadler business cards" } },
    { label: "Website", image: { src: `${NS}/07-mockup.webp`, alt: "Nathalie Sadler website design" } },
    { label: "Social", image: { src: `${NS}/09-social-carousel.webm`, poster: `${NS}/09-social-carousel-poster.webp`, alt: "Nathalie Sadler social posts in motion" } },
  ] },
  bannerLines: ["Build a personal brand that reflects the work you do.", "Make every introduction feel unmistakably yours."],
  faq: { heading: "Questions about personal branding", items: [
    { question: "How much does personal branding cost?", answer: "$3,000 per week, flat. A scoped brand identity or rebrand is delivered in one week for $3,000, guaranteed. Additional work is scoped separately at the same weekly rate, or a month booked upfront is $10,000. Scope, timing, and total are agreed before booking, and payment is upfront." },
    { question: "What does the identity include?", answer: "The agreed Brand Sprint includes logo concepts and final variations, colors, typography, guidelines, logo animation, and agreed launch assets. Revisions within scope and editable source files are included. We confirm deliverables before starting." },
    { question: "Have you designed a personal brand before?", answer: "Yes. For speaking director and coach Nathalie Sadler, I designed a luxury personal identity with an NS monogram, wordmark, typography, colors, logo animation, social graphics, and website design. Your brand’s style is shaped around your own work and audience.", link: { label: "the Nathalie Sadler case study", href: "/work/nathalie-sadler" } },
    { question: "Can you design my website too?", answer: "Yes. Website design and development are scoped separately. Design in Figma generally takes one week, followed by one or two weeks of development in Framer, Webflow, or Next.js, depending on the agreed scope and page count." },
    { question: "How long does it take?", answer: "The agreed identity is delivered in one week, guaranteed. A website or additional materials take separately scoped time. We confirm the start date and feedback schedule before booking." },
    { question: "What if I need changes?", answer: "We review the work together and refine the chosen direction. Revisions within the agreed scope are included; any additional work is agreed before proceeding." },
    { question: "Who will I work with?", answer: `You work directly with Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with over 20 years of experience.` },
  ] },
  aboutHeading: "Branding built around you.",
};

export const PersonalBrandingLanding = () => <>
  <Helmet>
    <title>Personal Branding &amp; Website Design | Ebaq Design</title>
    <meta name="description" content="Personal branding for founders, speakers, consultants and experts: logo, identity and website design. One-week brand identity for $3,000." />
    <link rel="canonical" href={pageUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:title" content="Personal Branding & Website Design | Ebaq Design" />
    <meta property="og:description" content="Personal brand identity and website design for founders, speakers, consultants and experts." />
    <meta property="og:image" content={`${siteUrl}${NS}/thumbnail.webp`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Personal Branding & Website Design | Ebaq Design" />
    <meta name="twitter:description" content="A personal brand identity in one week for $3,000. Website work scoped separately." />
  </Helmet>
  <IndustryLandingTemplate {...config} />
</>;
