import { Helmet } from "react-helmet-async";
import { founder, siteUrl, studio } from "../content/siteFacts";
import { caseStudies } from "../data/caseStudies";
import { IndustryLandingTemplate, type IndustryLandingConfig } from "./IndustryLandingTemplate";

// Draft (2026-10-16), pending Arek's review: Webflow design and development around Brevidee and Periti Digital.
// Brevidee's site was built in Webflow (Arek's WordPress vs Webflow vs Framer article), and Periti's site video
// shows the "Made in Webflow" badge, kept in frame by the 16:9 crops in /images/site/webflow-landing. Both
// companies have since moved their live domains off those builds, so the testimonial links the case study only.
const BV = "/case-study/brevidee";
const PT = "/case-study/periti";
const WF = "/images/site/webflow-landing";
const CO = "/images/site/consultancy-landing";
const pageUrl = `${siteUrl}/webflow-designer`;
const brevideeQuote = caseStudies.find((study) => study.slug === "brevidee")!.testimonial!;

const config: IndustryLandingConfig = {
  path: "/webflow-designer",
  breadcrumb: "Webflow designer",
  service: {
    name: "Webflow website design and development",
    types: ["Webflow Website Design", "Webflow Development", "Webflow CMS Setup", "Web Development"],
    description: "Websites designed in Figma and built in Webflow by a senior freelance designer in New York: responsive layouts, CMS collections, interactions, SEO basics, and launch support.",
    audience: "Startups, SaaS companies, and service businesses",
  },
  caseStudy: { slug: "brevidee", title: "Brevidee: EdTech Branding Case Study" },
  hero: {
    heading: "Webflow Designer\n& Developer, NYC",
    description: "A custom Webflow site designed in Figma and built by a senior designer,\nwith the CMS set up so your team can publish without a developer.",
    rows: [
      [
        { type: "video", src: `${WF}/brevidee-website.mp4`, alt: "Brevidee website built in Webflow", bgColor: "#000000" },
        { type: "lottie", src: `${BV}/hero-logo.json`, alt: "Animated Brevidee logo", bgColor: "#f8e6e8" },
        { type: "image", src: `${WF}/brevidee-homepage.webp`, alt: "Brevidee homepage on a laptop" },
        { type: "image", src: `${BV}/09-social.webp`, alt: "Brevidee social media design" },
      ],
      [
        { type: "video", src: `${WF}/periti-website.mp4`, alt: "Periti Digital website, made in Webflow", bgColor: "#e0dde3" },
        { type: "lottie", src: `${PT}/hero-logo.json`, alt: "Animated Periti Digital logo", bgColor: "#000000" },
        { type: "image", src: `${CO}/website.webp`, alt: "Periti Digital website on a tablet and a phone" },
        { type: "image", src: `${CO}/laptop.webp`, alt: "Periti Digital website on a laptop" },
      ],
    ],
  },
  painPoints: {
    heading: "A Webflow site your team can actually run",
    points: [
      { title: "Outgrow the template", body: "Squarespace and template sites hit a wall as the business grows. A custom Webflow build fits your brand and the content you actually publish." },
      { title: "Built around the CMS", body: "Blog posts, case studies, and team pages live in CMS collections, so publishing something new never breaks the design." },
      { title: "Keep your search traffic", body: "Page titles, descriptions, and redirects from your old site are set up before launch, so search engines and old links find the new pages." },
      { title: "Live in two to three weeks", body: `About a week of design in Figma, then one or two weeks of building in Webflow. No agency layers: you work directly with Arek, with ${founder.experience} of experience.` },
    ],
  },
  deliverables: {
    heading: "Everything your Webflow site needs to launch",
    items: [
      "Site structure and messaging",
      "Figma design — desktop, tablet, mobile",
      "Responsive Webflow build",
      "CMS collections for posts and case studies",
      "Interactions and animation",
      "Forms and integrations",
      "SEO basics: titles, descriptions, redirects",
      "Domain connection and launch support",
      "Walkthrough so your team can publish",
      "Revisions included",
    ],
  },
  preview: {
    eyebrow: "Webflow websites",
    anchor: "webflow-work",
    items: [
      { label: "Brevidee Website", image: { src: `${WF}/brevidee-website.mp4`, alt: "Brevidee website built in Webflow" } },
      { label: "Periti Website", image: { src: `${WF}/periti-website.mp4`, alt: "Periti Digital website, made in Webflow" } },
      { label: "SaaS Homepage", image: { src: `${WF}/brevidee-homepage.webp`, alt: "Brevidee homepage on a laptop" } },
      { label: "Responsive Layouts", image: { src: `${CO}/website.webp`, alt: "Periti Digital website on a tablet and a phone" } },
      { label: "Brand in Use", image: { src: `${CO}/laptop.webp`, alt: "Periti Digital website on a laptop" } },
    ],
  },
  testimonial: {
    // Quoted from the Brevidee case study, word for word.
    quote: brevideeQuote.quote.replace(/^"|"$/g, ""),
    name: brevideeQuote.name,
    role: `${brevideeQuote.position}, ${brevideeQuote.companyName}`,
    avatar: brevideeQuote.avatar.src,
    logo: { src: brevideeQuote.logo.src, alt: brevideeQuote.logo.alt ?? brevideeQuote.companyName },
    caseStudyUrl: "/work/brevidee",
    compact: true,
  },
  faq: {
    heading: "Questions about\nWebflow websites",
    items: [
      { question: "How much does a Webflow website cost?", answer: "$3,000 per week, flat. Design in Figma takes about one week and the Webflow build one or two more, depending on the page count, so a site usually takes two to three weeks: $6,000 to $9,000 in total, fixed on the kickoff call. Webflow bills its hosting plan separately." },
      { question: "Have you built websites in Webflow?", answer: "Yes. My own site, ebaqdesign.com, ran on Webflow for over six years, with hundreds of articles in its CMS. I built the Brevidee website in Webflow, and the Periti Digital website I designed launched on Webflow too." },
      { question: "Webflow or Framer: which should I choose?", answer: "Webflow suits larger sites built around a CMS: a blog, case studies, or many service pages. Framer suits marketing sites with lots of motion that a small team updates often, and Next.js suits sites that need custom functionality. I recommend one on the kickoff call.", link: { label: "Framer design and development", href: "/framer-designer" } },
      { question: "Can you move my site to Webflow from WordPress or Squarespace?", answer: "Yes. I moved my own site from WordPress to Webflow. Your new site is designed in Figma, built in Webflow, and launched with redirects from the old URLs, so existing links and search results land on the new pages.", link: { label: "my WordPress vs Webflow vs Framer comparison", href: "/blog/wordpress-vs-webflow-vs-framer" } },
      { question: "Can you build a Webflow site for my existing brand?", answer: "Yes. If the brand is in good shape, the website builds on it. If it needs work first, the one-week Brand Sprint comes before the website, for $3,000." },
      { question: "Will my team be able to update the site?", answer: "Yes. The site is handed over with the CMS set up and a walkthrough, so your team can update pages, posts, and case studies without a developer. Ongoing design and updates are $10,000 per month." },
      { question: "Who will I work with?", answer: `Arek Dvornechuck, a senior freelance graphic designer in ${studio.location} with ${founder.experience} of experience. You work with me directly from the first call to launch, with no account managers and no junior designers.` },
    ],
  },
  aboutHeading: "I build Webflow sites your team can run on its own.",
};

export const WebflowDesignerLanding = () => (
  <>
    <Helmet>
      <title>Webflow Designer &amp; Developer in NYC | Ebaq Design</title>
      <meta name="description" content="Webflow designer and developer in NYC: a senior freelance designer who designs your site in Figma and builds it in Webflow, CMS and SEO included. $3,000/week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Webflow Designer & Developer in NYC | Ebaq Design" />
      <meta property="og:description" content="Webflow designer and developer in NYC: a senior freelance designer who designs your site in Figma and builds it in Webflow, CMS and SEO included. $3,000/week." />
      <meta property="og:image" content={`${siteUrl}${BV}/10-website.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Webflow Designer & Developer in NYC | Ebaq Design" />
      <meta name="twitter:description" content="Webflow websites designed in Figma and built by a senior designer in NYC, with the CMS set up for your team. $3,000 per week." />
    </Helmet>
    <IndustryLandingTemplate {...config} />
  </>
);
