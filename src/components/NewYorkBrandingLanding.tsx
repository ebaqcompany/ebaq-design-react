import { Helmet } from "react-helmet-async";
import { founder, siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

const SV = "/case-study/savory";
const ND = "/case-study/next-dimension";
const OR = "/case-study/orbio";
const BR = "/case-study/brevidee";
const pageUrl = `${siteUrl}/new-york-branding`;

const config: IndustryLandingConfig = {
  path: "/new-york-branding",
  brandDesignLayout: true,
  breadcrumb: "Branding in New York",
  service: {
    name: "Branding and web design in New York",
    types: ["Branding", "Brand Identity Design", "Logo Design", "Website Design", "Branding Agency New York"],
    description: "Brand identities, logos, brand guidelines and websites for startups and growing companies in New York City, designed by a senior designer based in Brooklyn.",
    audience: "Startups, founders and growing companies in New York City",
  },
  caseStudy: { slug: "savory", title: "Savory: Brooklyn Real Estate Team Branding Case Study" },
  hero: {
    heading: "Branding & Web\nin New York",
    description: "Ebaq Design is a Brooklyn studio that delivers a complete brand identity in one week for $3,000, then websites at the same weekly rate. You work directly with a senior designer, as New York clients like The Savory Team, NextDim AI and Orbio have.",
    rows: [
      [
        { type: "lottie", src: `${SV}/hero-logo.json`, alt: "Savory wordmark with its split O rolling into place", bgColor: "#B3C3D6" },
        { type: "image", src: `${ND}/billboard-approved.webp`, alt: "NextDim AI billboard" },
        { type: "image", src: `${OR}/28-billboard.webp`, alt: "Orbio billboard" },
        { type: "image", src: `${BR}/02-cards.webp`, alt: "Brevidee business cards" },
      ],
      [
        { type: "video", src: `${OR}/hero-orb.mp4`, alt: "Animated Orbio logo", bgColor: "#0B0B0C" },
        { type: "image", src: `${SV}/22-billboard-building.webp`, alt: "Savory billboard on a Brooklyn building" },
        { type: "image", src: `${ND}/logos.webp`, alt: "NextDim AI logo system" },
        { type: "image", src: `${BR}/10-website.webp`, alt: "Brevidee website design" },
      ],
      [
        { type: "image", src: `${SV}/21-wall.webp`, alt: "Savory brand wall" },
        { type: "image", src: `${OR}/27-cup.webp`, alt: "Orbio branded cup" },
        { type: "image", src: `${SV}/20-stamp.webp`, alt: "Savory brass stamp and wax seal" },
        { type: "image", src: `${BR}/05-hoodie.webp`, alt: "Brevidee hoodie" },
      ],
    ],
  },
  painPoints: {
    heading: "Why New York companies hire\na senior designer, not an agency",
    points: [
      { title: "Agency quality without agency overhead", body: "In my experience, larger New York agencies quote $25k–$100k+ and months of work for a brand identity. You get senior judgment and a finished identity in one week for $3,000." },
      { title: "One person from first call to launch", body: "No account managers and no junior designers. The person on the intro call is the person designing your brand and website." },
      { title: "Local when it helps", body: "I'm based in Brooklyn and work on New York time. Most of the work happens on video calls, and New York clients can meet in person when that's useful." },
      { title: "Proven with New York companies", body: "Clients here include a Brooklyn real estate team, a healthcare AI company, an AI infrastructure startup and an education technology platform." },
    ],
  },
  deliverables: {
    heading: "What you get in the first week",
    items: [
      "Custom logo concepts and revisions",
      "Final logo files for print and digital use",
      "Logo animation",
      "Color palette and typography",
      "Brand guidelines",
      "Business card design",
      "Social profile images and launch posts",
      "Email signature",
      "Website design and development in the following weeks",
    ],
  },
  processSteps: [
    { heading: "01", title: "Book a free call", description: "Tell me about your company, audience and timing. We agree on the scope, the number of weeks and the total before anything starts." },
    { heading: "02", title: "Build your identity", description: "I develop the visual direction, share the work with you, and refine the chosen direction with your feedback during the week." },
    { heading: "03", title: "Launch the brand and site", description: "Receive the final files and guidelines. The website follows in separately scoped weeks, built in Framer, Webflow or Next.js." },
  ],
  preview: {
    eyebrow: "New York client work",
    anchor: "new-york-work",
    heading: "Brands I designed for\nNew York companies",
    caseStudyLinkLabel: "Read the Savory case study",
    items: [
      { label: "Savory website", image: { src: `${SV}/25-website-design.jpg`, alt: "Savory real estate team website design" } },
      { label: "Savory billboard", image: { src: `${SV}/22-billboard-building.webp`, alt: "Savory billboard on a Brooklyn building" } },
      { label: "NextDim AI", image: { src: `${ND}/hero.webp`, alt: "NextDim AI brand identity" } },
      { label: "NextDim billboard", image: { src: `${ND}/billboard-approved.webp`, alt: "NextDim AI billboard" } },
      { label: "Orbio", image: { src: `${OR}/thumbnail.webp`, alt: "Orbio AI infrastructure brand identity" } },
      { label: "Orbio website", image: { src: `${OR}/04-heroes.mp4`, alt: "Orbio website hero designs" } },
    ],
  },
  faq: {
    heading: "Questions New York\nfounders ask",
    items: [
      { question: "Are you based in New York?", answer: `Yes. I'm based in ${studio.location} and work with clients across New York City, the US and internationally. Most of the work happens on video calls, and New York clients can meet in person when that's useful.` },
      { question: "How much does branding cost in New York?", answer: "$3,000 per week, flat. A brand identity or rebrand is delivered in one week, guaranteed, for $3,000 total. A website usually takes two to three more weeks at the same rate, and a month booked upfront is $10,000. In my experience, larger New York agencies quote $25k–$100k+ for comparable identity work." },
      { question: "Which New York companies have you worked with?", answer: "The Savory Team (real estate, Brooklyn), NextDim AI (healthcare AI), Orbio (AI infrastructure), Brevidee (education technology), Sukoon (travel) and Flush Wash (personal brand).", link: { label: "Client locations", href: "/locations" } },
      { question: "Should I hire a big New York agency or a senior designer?", answer: "A large agency makes sense for multi-market rollouts with many stakeholders and a long timeline. If you need a distinctive identity and website quickly, and want to work directly with the person doing the design, a senior designer is faster and costs a fraction as much.", link: { label: "Top branding agencies in NYC", href: "/blog/branding-agency-nyc" } },
      { question: "Do you design and build websites too?", answer: "Yes. Website design in Figma takes about one week, followed by one or two weeks of development in Framer, Webflow or Next.js, depending on the page count and agreed scope.", link: { label: "Framer website design", href: "/framer-designer" } },
      { question: "How long does a rebrand take?", answer: "The brand identity is delivered in one week, guaranteed. A brand plus website usually takes three to four weeks. We confirm the start date and feedback schedule before booking." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with ${founder.experience} of experience. You work with me directly from the first call to launch.` },
    ],
  },
  bannerLines: ["Give your New York company a brand that stands out.", "Work directly with a senior designer in Brooklyn."],
  aboutHeading: "Branding and websites, designed in Brooklyn.",
};

export const NewYorkBrandingLanding = () => (
  <>
    <Helmet>
      <title>Branding &amp; Web Design in New York (Brooklyn) | Ebaq Design</title>
      <meta name="description" content="Brooklyn branding studio: a complete brand identity in one week for $3,000, then websites in Framer, Webflow or Next.js. NYC clients include Savory, NextDim AI and Orbio." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Branding & Web Design in New York (Brooklyn) | Ebaq Design" />
      <meta property="og:description" content="Brooklyn branding studio: a complete brand identity in one week for $3,000, then websites in Framer, Webflow or Next.js." />
      <meta property="og:image" content={`${siteUrl}/portfolio/identities/savory-bento.webp`} />
      <meta property="og:image:alt" content="Savory, a Brooklyn real estate team identity by Ebaq Design" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Branding & Web Design in New York (Brooklyn) | Ebaq Design" />
      <meta name="twitter:description" content="A complete brand identity in one week for $3,000. Senior designer in Brooklyn, direct collaboration." />
      <meta name="twitter:image" content={`${siteUrl}/portfolio/identities/savory-bento.webp`} />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
