import { Helmet } from "react-helmet-async";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

const media = "/case-study/savory";
const pageUrl = `${siteUrl}/real-estate-branding`;

const config: IndustryLandingConfig = {
  path: "/real-estate-branding",
  breadcrumb: "Real estate branding",
  service: {
    name: "Real estate branding for agents, teams and brokerages",
    types: ["Real Estate Branding", "Real Estate Agent Branding", "Real Estate Team Branding", "Real Estate Broker Branding", "Real Estate Website Design"],
    description: "Brand identity, custom logo design, typography, color systems, brand guidelines, social media graphics and website design for real estate businesses.",
    audience: "Real estate agents, real estate teams, brokers and independent brokerages",
  },
  caseStudy: { slug: "savory", title: "Savory: Real Estate Branding Case Study" },
  hero: {
    heading: "Real Estate Branding\nfor Agents & Teams",
    description: "A recognizable identity for your real estate team, brokerage or personal brand. Work directly with a senior designer on the logo, visual system and website your clients meet before they meet you.",
    action: { label: `Book a call · ${pricing.weekly} brand sprint`, url: "/start" },
    rows: [
      [
        { type: "lottie", src: `${media}/hero-logo.json`, alt: "Savory wordmark with its split O rolling into place", bgColor: "#B3C3D6" },
        { type: "image", src: `${media}/01-colorways.webp`, alt: "Savory real estate team wordmark in four approved color combinations" },
        { type: "image", src: `${media}/06-business-card.webp`, alt: "Savory business cards with wax red lettering and an embossed circular seal" },
        { type: "video", src: `${media}/18-colors.webm`, alt: "Savory brand palette: Wax Red, Off-white, Asphalt, Cream and Sky Blue" },
      ],
      [
        { type: "image", src: `${media}/09-linkedin.png`, alt: "Savory real estate team LinkedIn profile and branded banner" },
        { type: "image", src: `${media}/23-pen.webp`, alt: "Savory branded pen in Wax Red with a warm off-white wordmark" },
        { type: "image", src: `${media}/25-website-design.jpg`, alt: "Savory website design with editorial typography, New York skyline and rooftop photography" },
        { type: "video", src: `${media}/17-type-specimen.webm`, alt: "Roxborough CF typography specimen for the Savory real estate identity" },
      ],
    ],
  },
  caseStudySummary: {
    heading: "Savory: a distinctive identity for a team at Compass",
    description: "The Savory Team, a Brooklyn real estate team at Compass, came to Ebaq Design after six months of explorations that had not felt right. We created an editorial identity around a custom wordmark, a split O and a warm palette, then carried it across the team's everyday touchpoints.",
    decisions: [
      { title: "A recognizable detail, from wordmark to favicon", body: "Roxborough CF gives the name an editorial presence. The split O introduces a distinctive detail that can also work on its own as a small icon or wax seal, instead of relying on a generic roof or skyline symbol." },
      { title: "One system for the whole team", body: "Wax Red, Off-white and Sky Blue connect the business cards, email signature, LinkedIn banner, Instagram graphics and website design. Shared type and color rules make those applications feel like one team." },
    ],
  },
  painPoints: {
    heading: "A referral should find\nthe same team everywhere",
    points: [
      { title: "Look like the team behind the recommendation", body: "A prospective seller may move from a referral to your social profile, website and listing presentation. A consistent name, logo and visual language help them recognize the same business at each step." },
      { title: "Express a point of view", body: "Your market, service and personality should guide the design. A distinctive wordmark, considered typography and a disciplined palette give you more to work with than another interchangeable property icon." },
      { title: "Give agents a usable system", body: "Clear guidelines, final logo files and coordinated launch assets give the team a shared starting point. Each agent should not have to improvise a new signature or social profile." },
      { title: "Plan the rollout before the rebrand", body: "Start with the assets clients actually see: cards, social profiles, email and the website. We agree the priorities, brokerage requirements and number of weeks before work starts." },
    ],
  },
  deliverables: {
    heading: "A brand sprint your team can put to work",
    description: `A new brand identity or rebrand is ${pricing.weekly} total, delivered in one week, guaranteed. The scope is agreed at kickoff. Website design, development, listing-presentation templates and larger rollout projects are planned as additional weeks at the same ${pricing.weekly} rate, with the total agreed before work starts.`,
    items: [
      "Custom logo concepts and revisions",
      "Final logo files for print and digital use",
      "Logo animation",
      "Color palette and typography",
      "Brand guidelines and usage rules",
      "Business card design",
      "Social profile images and launch posts",
      "Branded email signature",
      "Editable source files and organized handoff",
    ],
  },
  preview: {
    eyebrow: "Explore the Savory identity",
    anchor: "savory-work",
    heading: "A real estate brand,\nfrom identity to everyday use",
    items: [
      { label: "Logo system", image: { src: `${media}/01-colorways.webp`, alt: "Savory wordmark and approved logo colorways" } },
      { label: "Color palette", image: { src: `${media}/18-colors.webm`, alt: "Animated Savory color palette" } },
      { label: "Typography", image: { src: `${media}/17-type-specimen.webm`, alt: "Savory Roxborough CF type specimen" } },
      { label: "Business cards", image: { src: `${media}/06-business-card.webp`, alt: "Savory business card and circular seal" } },
      { label: "Social graphics", image: { src: `${media}/19-social-carousel.webm`, alt: "Four coordinated Savory Instagram post designs" } },
      { label: "Website design", image: { src: `${media}/25-website-design.jpg`, alt: "Savory website design concept" } },
    ],
  },
  faq: {
    heading: "Real estate branding\nquestions, answered",
    items: [
      { question: "What does real estate branding include?", answer: "Real estate branding gives an agent, team or brokerage a recognizable identity: a logo, typography, colors and usage rules, applied to the places clients encounter the business. The Brand Sprint includes final logo files, logo animation, guidelines, business cards, social launch assets and an email signature. Website work is scoped separately.", link: { label: "brand identity services", href: "/services/identity-systems" } },
      { question: "How much does real estate branding cost?", answer: `A new brand identity or rebrand costs ${pricing.weekly} total for a one-week Brand Sprint. Revisions and source files are included. Additional work is ${pricing.weekly} per week, with the number of weeks and total agreed before work starts.`, link: { label: "current pricing and what is included", href: "/pricing" } },
      { question: "How long does a real estate rebrand take?", answer: "The brand identity is delivered in one week, guaranteed, once the scope is locked at kickoff. Website design is another week; development takes one or two additional weeks depending on the page count and requirements. Presentation templates, extra motion and rollout assets can add further agreed weeks." },
      { question: "Can a real estate team have its own identity within a brokerage?", answer: "A team identity can be designed around the brokerage's requirements. We review the naming, required brokerage identification, logo rules and approved assets you supply before developing the visual system. Savory was a project for The Savory Team at Compass, rather than a corporate rebrand for Compass." },
      { question: "Do you work with individual agents, teams and real estate brokers?", answer: "Yes. An individual agent may need a personal brand and a focused launch kit; a team or independent brokerage may need a broader system for several people and touchpoints. The first call establishes the audience, positioning, decision-maker and practical scope." },
      { question: "Have you designed a real estate brand before?", answer: "Yes. Savory is a Brooklyn real estate team identity built around an editorial wordmark, a split O, a wax seal and a warm color palette. The case study shows the logo, animation, typography, cards, social graphics, email signature and website design.", link: { label: "the full Savory case study", href: "/work/savory" } },
      { question: "Do you design real estate websites and listing presentations?", answer: "Yes. Website design and development, listing-presentation templates and additional marketing collateral can follow the identity in separately scoped weeks. Websites can be built in Framer, Webflow or Next.js. Listing feeds, CRM connections and third-party subscriptions are discussed before the scope is agreed.", link: { label: "website design services", href: "/services/web-design" } },
      { question: "Who will I work with, and where are you based?", answer: `You work directly with Arek Dvornechuck, a senior freelance graphic designer with over 20 years of experience, based in ${studio.location}. The process runs remotely for clients in New York, across the US and internationally.` },
    ],
  },
  aboutHeading: "A senior designer,\nworking directly with your team.",
};

export const RealEstateBrandingLanding = () => (
  <>
    <Helmet>
      <title>Real Estate Branding for Agents &amp; Teams | Ebaq Design</title>
      <meta name="description" content="Real estate branding for agents, teams and brokers: logos, identity, guidelines and website design. See Savory, a Brooklyn team at Compass. Book a call." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Real Estate Branding for Agents & Teams | Ebaq Design" />
      <meta property="og:description" content="Brand identity and website design for real estate agents, teams and brokerages. A one-week brand sprint is $3,000. Explore the Savory case study." />
      <meta property="og:image" content={`${siteUrl}/portfolio/identities/savory-bento.webp`} />
      <meta property="og:image:alt" content="Savory real estate team identity: wordmark, wax seal and branded coffee cup" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Real Estate Branding for Agents & Teams | Ebaq Design" />
      <meta name="twitter:description" content="A distinctive identity for your real estate team. One-week brand sprint, $3,000. Senior designer, direct collaboration." />
      <meta name="twitter:image" content={`${siteUrl}/portfolio/identities/savory-bento.webp`} />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
