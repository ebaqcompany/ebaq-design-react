import { Helmet } from "react-helmet-async";
import { founder, siteUrl, studio } from "../content/siteFacts";
import { caseStudies } from "../data/caseStudies";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-10-16), pending Arek's review: Framer design and development around Fox Berman, the one client
// site provably built in Framer (it is live on Framer, and its site video shows the "Made in Framer" badge, so
// the 16:9 crop in /images/site/framer-landing keeps the badge in frame). Guidelines.online and the AI Brand
// Strategist are Arek's own Framer sites, listed on his Framer Experts profile; they have no local media, so
// they appear in the copy only.
const FB = "/case-study/fox-berman";
const FR = "/images/site/framer-landing";
const pageUrl = `${siteUrl}/framer-designer`;
const framerProfile = studio.sameAs.find((url) => url.includes("framer.com"))!;
const foxBerman = caseStudies.find((study) => study.slug === "fox-berman")!;
const foxQuote = foxBerman.testimonial!;

const config: IndustryLandingConfig = {
  path: "/framer-designer",
  breadcrumb: "Framer designer",
  service: {
    name: "Framer website design and development",
    types: ["Framer Website Design", "Framer Development", "Website Design", "Web Development"],
    description: "Websites designed in Figma and built in Framer by a senior freelance designer in New York: responsive layouts, motion, CMS setup, SEO basics, and launch support.",
    audience: "Startups, founders, and marketing teams",
  },
  caseStudy: { slug: "fox-berman", title: "Fox Berman: Law Firm Branding Case Study" },
  hero: {
    heading: "Framer Website\nDesigner in NYC",
    description: "Your site designed in Figma and built in Framer by a senior designer,\nwith motion, a CMS, and SEO basics set up before launch.",
    rows: [
      [
        { type: "video", src: `${FR}/fox-berman-website.mp4`, alt: "Fox Berman website, live on Framer", bgColor: "#282e34" },
        { type: "lottie", src: "/portfolio/logos/foxberman-logo.json", alt: "Animated Fox Berman logo", bgColor: "#f3603c" },
        { type: "image", src: `${FR}/fox-berman-devices.webp`, alt: "Fox Berman website on a laptop and a phone" },
        { type: "video", src: "/foxberman/foxberman-social.mp4", alt: "Fox Berman social media graphics in motion" },
      ],
      [
        { type: "video", src: `${FB}/02-colors.mp4`, alt: "Fox Berman colors in motion" },
        { type: "image", src: "/foxberman/foxberman-fonts.webp", alt: "Fox Berman typography" },
        { type: "video", src: `${FB}/15-lawyers.mp4`, alt: "Fox Berman attorneys" },
        { type: "image", src: `${FB}/01-logos.webp`, alt: "Fox Berman logo system" },
      ],
    ],
  },
  painPoints: {
    heading: "Your Framer site shouldn’t look like a template",
    points: [
      { title: "Built from your brand", body: "Templates make Framer sites look alike. Yours starts from your brand, with its type, color, and motion carried into every page." },
      { title: "Motion that stays fast", body: "Framer is at its best with motion. Interactions are designed with the brand and kept light, so the site still loads fast on a phone." },
      { title: "Yours to edit", body: "Framer’s editor and CMS let a small team change pages, posts, and case studies without a developer. You get a walkthrough at handover." },
      { title: "Live in two to three weeks", body: `About a week of design in Figma, then one or two weeks of building in Framer. No agency layers: you work directly with Arek, with ${founder.experience} of experience.` },
    ],
  },
  deliverables: {
    heading: "Everything your Framer site needs to launch",
    items: [
      "Site structure and messaging",
      "Figma design — desktop, tablet, mobile",
      "Responsive Framer build",
      "Interactions and animation",
      "CMS for blog posts and case studies",
      "Forms and integrations",
      "SEO basics: titles, descriptions, redirects",
      "Domain connection and launch support",
      "Walkthrough so your team can edit",
      "Revisions included",
    ],
  },
  preview: {
    eyebrow: "Fox Berman case study",
    anchor: "fox-berman",
    items: [
      { label: "Framer Website", image: { src: `${FR}/fox-berman-website.mp4`, alt: "Fox Berman website, live on Framer" } },
      { label: "Responsive Design", image: { src: `${FR}/fox-berman-devices.webp`, alt: "Fox Berman website on a laptop and a phone" } },
      { label: "Brand Motion", image: { src: `${FB}/02-colors.mp4`, alt: "Fox Berman colors in motion" } },
      { label: "Typography", image: { src: "/foxberman/foxberman-fonts.webp", alt: "Fox Berman typography" } },
      { label: "Social Graphics", image: { src: "/foxberman/foxberman-social.mp4", alt: "Fox Berman social media graphics in motion" } },
    ],
  },
  testimonial: {
    // Quoted from the Fox Berman case study, word for word.
    quote: foxQuote.quote.replace(/^"|"$/g, ""),
    name: foxQuote.name,
    role: `${foxQuote.position}, ${foxQuote.companyName}`,
    avatar: foxQuote.avatar.src,
    logo: { src: foxQuote.logo.src, alt: foxQuote.logo.alt ?? foxQuote.companyName },
    websiteUrl: foxBerman.website?.href,
    caseStudyUrl: "/work/fox-berman",
  },
  faq: {
    heading: "Questions about\nFramer websites",
    items: [
      { question: "How much does a Framer website cost?", answer: "$3,000 per week, flat. Design in Figma takes about one week and the Framer build one or two more, depending on the page count, so a site usually takes two to three weeks: $6,000 to $9,000 in total. The number of weeks is agreed on the kickoff call, so the price is fixed before work starts." },
      { question: "Are you a Framer expert?", answer: "Yes. Framer lists me in its Experts directory, and I design and build in Framer for clients and for my own products: the Fox Berman law firm website, Guidelines.online, and the AI Brand Strategist.", link: { label: "my Framer profile", href: framerProfile } },
      { question: "Framer or Webflow: which is right for my site?", answer: "Framer suits marketing sites and landing pages with lots of motion that a small team updates often. Webflow suits larger sites built around a CMS, and Next.js suits sites that need custom functionality. I recommend one on the kickoff call, based on how your team will use the site.", link: { label: "Webflow design and development", href: "/webflow-designer" } },
      { question: "Do Framer sites rank on Google?", answer: "They can. Every page gets its own title and description, and old URLs are redirected at launch so existing links keep working. For a content-heavy site with a large blog, Webflow is usually the better fit.", link: { label: "my WordPress vs Webflow vs Framer comparison", href: "/blog/wordpress-vs-webflow-vs-framer" } },
      { question: "Can you build a Framer site for my existing brand?", answer: "Yes. If the brand is in good shape, the website builds on it. If it needs work first, the one-week Brand Sprint comes before the website, for $3,000." },
      { question: "Can my team edit the site after launch?", answer: "Yes. The site is handed over with the CMS set up and a walkthrough, so your team can update pages, posts, and case studies without a developer. Ongoing design and updates are $10,000 per month." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with ${founder.experience} of experience. You work with me directly from the first call to launch, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I design Framer sites that look like your brand, not a template.",
};

export const FramerDesignerLanding = () => (
  <>
    <Helmet>
      <title>Framer Designer &amp; Expert in NYC | Ebaq Design</title>
      <meta name="description" content="Framer designer and Framer Expert in NYC: a senior freelance designer who designs your site in Figma and builds it in Framer, with CMS and motion. $3,000/week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Framer Designer & Expert in NYC | Ebaq Design" />
      <meta property="og:description" content="Framer designer and Framer Expert in NYC: a senior freelance designer who designs your site in Figma and builds it in Framer, with CMS and motion. $3,000/week." />
      <meta property="og:image" content={`${siteUrl}${FB}/04-website.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Framer Designer & Expert in NYC | Ebaq Design" />
      <meta name="twitter:description" content="Framer websites designed in Figma and built by a senior designer in NYC, with motion, a CMS, and launch support. $3,000 per week." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
