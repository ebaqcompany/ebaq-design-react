import { Layout423Defaults } from "../components/Layout423";
import { pricing } from "../content/siteFacts";

// The six offerings and their deliverables live in Layout423Defaults, which was
// written for the services page. Slugs are attached here in the same order so
// the hub and the detail pages share one source of copy.
const slugs = [
  "brand-strategy",
  "logo-design",
  "brand-design",
  "web-design",
  "web-development",
  "motion-graphics",
] as const;

export type ServiceSlug = (typeof slugs)[number];

export type Service = {
  slug: ServiceSlug;
  index: number;
  number: string;
  heading: string;
  cardTitle: string;
  description: string;
  deliverables: string[];
  url: string;
};

export const services: Service[] = Layout423Defaults.features.map((feature, index) => ({
  slug: slugs[index],
  index,
  number: feature.tagline,
  heading: feature.heading,
  cardTitle: ["Define your positioning", "Design an iconic logo", "Create a design system", "Create a beautiful website", "Launch a website that works", "Bring your brand to life"][index],
  description: feature.description,
  deliverables: feature.deliverables,
  url: `/services/${slugs[index]}`,
}));

export const serviceBySlug = (slug: ServiceSlug): Service => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
};

// One local case-study image per service, in the same order as the slugs.
const serviceMedia: Record<ServiceSlug, { src: string; alt: string }> = {
  "brand-strategy": { src: "/case-study/wingnut/10-deck.webp", alt: "Wingnut positioning deck: Screw the guesswork, we know what works" },
  "logo-design": { src: "/case-study/elevate/01-logos.webp", alt: "Elevate logo system" },
  "brand-design": { src: "/case-study/fox-berman/12-booklet.webp", alt: "Fox Berman brand book" },
  "web-design": { src: "/case-study/aero/05-website.webp", alt: "Aero website design" },
  "web-development": { src: "/case-study/periti/02-macbook.webp", alt: "Periti website live on a laptop" },
  "motion-graphics": { src: "/case-study/fox-berman/02-colors.mp4", alt: "Fox Berman brand colors in motion" },
};

// Layout351 cards. Each links to its own detail page; the detail page swaps
// its own card's link for booking (see ServiceDetailLayout).
export const serviceFeatures = services.map((service) => ({
  columnText: service.number,
  verticalText: service.heading,
  horizontalText: service.heading,
  heading: service.heading,
  description: service.description,
  deliverables: service.deliverables,
  image: serviceMedia[service.slug],
  url: service.url,
  linkLabel: `Explore ${service.heading.toLowerCase()}`,
}));

// The five-step process the Webflow services page described.
export const processSteps = [
  {
    heading: "01",
    title: "Intro call",
    description:
      "A short call to cover the business, the goal, and the timing, so we can both tell whether the project is a fit before anyone commits.",
    buttons: [],
  },
  {
    heading: "02",
    title: "Discovery & strategy",
    description:
      "We confirm scope, timing, and payment before work begins. Then we review the business, audience, and competition, and agree on the direction.",
    buttons: [],
  },
  {
    heading: "03",
    title: "Sketching & design",
    description:
      "Concepts start on paper before anything goes into Figma, then the strongest direction is developed into a logo and the identity system around it.",
    buttons: [],
  },
  {
    heading: "04",
    title: "Feedback & revisions",
    description:
      "We talk through what is working and what needs attention, then refine the chosen direction together. Revisions within the agreed scope are included; additional work and costs are agreed before proceeding.",
    buttons: [],
  },
  {
    heading: "05",
    title: "Delivery & launch",
    description:
      "Final files, guidelines, and source assets are handed over, with support through launch so the brand ships consistently everywhere it appears.",
    buttons: [],
  },
];

// Keep the engagement timeline's scope distinction consistent wherever it is shown.
export const engagementProcessSteps = processSteps.map((step, index) => index === 4
  ? { ...step, description: `${step.description} A scoped Brand Sprint is delivered in one week; website and extended motion work have separately agreed schedules.` }
  : step);

export const serviceFaqs = [
  {
    title: "What do branding services cost?",
    answer: `${pricing.summary} ${pricing.guarantee} ${pricing.fixedTotal}`,
  },
  {
    title: "How long does a branding project take?",
    answer:
      "A new brand identity or rebrand takes one week, guaranteed. Motion graphics or a pitch deck usually add one week, website design another, and development one or two more depending on the page count. You'll know the number of weeks, and the total, before work starts.",
  },
  {
    title: "Do I have to take every service?",
    answer:
      "No. Plenty of projects are a logo and identity only, or a website only. Strategy, identity, web, and motion are offered together because they reinforce each other, not because they're a bundle you have to buy whole.",
  },
  {
    title: "Do you work with clients outside New York?",
    answer:
      "Yes. The studio is based in Brooklyn, New York City, and works with clients locally and globally. The whole process runs remotely, so where you're based makes no practical difference.",
  },
  {
    title: "Who actually does the work?",
    answer:
      "Arek does, directly. You work with one Branding Expert from the first call through delivery, with no account layer and no hand-off to a junior team.",
  },
];

// What makes each /services/* page its own page: the overview, tools, timeline, related case studies,
// and the questions specific to that service (they also feed the page's FAQPage schema). Facts here
// must match src/content/siteFacts.ts: one-week Brand Sprint, $3,000 per week, tools Arek uses.
// links end the visible answer with "See …", as on the industry landing pages; the FAQPage schema keeps the plain answer.
export type ServiceFaq = { title: string; answer: string; links?: { label: string; href: string }[] };

export type ServiceDetail = {
  title: string;
  overview: string[];
  tools: string[];
  timeline: string;
  work: string[];
  faqs: ServiceFaq[];
};

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  "brand-strategy": {
    title: "Brand strategy and positioning for founders",
    overview: [
      "Strategy is the part of branding nobody sees and everything depends on. Before any design, we work out who the brand is for, what it stands against in its category, and the one idea it should own.",
      "You get the thinking in plain language: an audit of where the brand stands today, a look at how competitors present themselves, audience profiles, a positioning statement, and the tagline and messaging the design is built around.",
      "It is the same groundwork I did on identities for AI startups, a law firm, and consultancies across Europe, done directly by me as a Branding Expert in New York rather than handed to a junior strategist.",
    ],
    tools: ["Brand audit", "Competitive analysis", "Positioning workshop", "Figma"],
    timeline: "A focused brand strategy sprint costs $3,000 for one week. We agree on the workshop, strategy brief, messaging, visual direction, and feedback schedule before booking. Payment is due upfront.",
    work: ["wingnut", "periti", "spark"],
    faqs: [
      { title: "What’s included?", answer: "A brand and competitor review, a positioning workshop, and an agreed strategy brief covering your audience, positioning, messaging, and visual direction. We confirm the deliverables before booking." },
      { title: "Strategy before design?", answer: "A clear audience and positioning give design a useful starting point. If you already have a strategy, we review it and focus on any gaps before moving into design." },
      { title: "How much and how long?", answer: "A focused strategy sprint costs $3,000 for one week, paid upfront. We agree on scope and feedback timing before booking. Broader work adds weeks at the same rate." },
      { title: "Who joins the workshop?", answer: "You and the key people who make decisions about your brand. We agree on participants and preparation before the session." },
      { title: "Is logo design included?", answer: "This scope focuses on strategy and visual direction. Logo and brand identity design can follow as separately agreed work." },
      { title: "What about revisions?", answer: "We review the recommendations together and refine them within the agreed scope. Additional work is agreed before proceeding." },
    ],
  },
  "logo-design": {
    title: "A new logo or a sharper existing one",
    overview: [
      "If the idea behind your existing logo still fits, I can refine its drawing, spacing and proportions, then bring the colors and typography into one consistent identity.",
      "If the mark no longer represents the business, I develop several new concepts and explain the thinking behind each before refining the selected direction.",
      "You work directly with me, Arek Dvornechuck, a senior designer and Branding Expert based in Brooklyn, New York City, from the first conversation through the final files.",
    ],
    tools: ["Pencil and paper", "Adobe Illustrator", "Figma", "Adobe After Effects"],
    timeline: "A focused one-week logo sprint costs $3,000. Create a new logo or refine an existing one, with core colors, typography, final files, and simple usage guidance. Scope and feedback timing are agreed before booking.",
    work: ["airport-executive", "elevate", "periti"],
    faqs: [
      { title: "Can you refine my logo?", answer: "Yes. We can improve your existing mark or create a new one, depending on what your business needs." },
      { title: "What’s included?", answer: "Your logo, key variations, core colors, a font pairing, editable files, and a simple usage guide. We confirm the scope before booking." },
      { title: "How much and how long?", answer: "A focused one-week sprint costs $3,000, paid upfront. We agree on the start date and feedback schedule before work begins." },
      { title: "What about revisions?", answer: "We refine the chosen direction together. Revisions within the agreed scope are included." },
      { title: "Logo or brand design?", answer: "Choose Logo Design for a new or refined logo and core identity fundamentals. Brand Design covers a broader visual identity and rollout." },
    ],
  },
  "brand-design": {
    title: "Brand identity design: the system around the logo",
    overview: [
      "A logo alone does not make a brand recognizable. The identity system does: color, typography, layouts, icons, and imagery rules that make every touchpoint look like it came from the same company.",
      "I design the system and document it in brand guidelines your team can actually use. The guidelines are published on guidelines.online, a tool I built so a style guide is a living website instead of a forgotten PDF.",
      "The system then carries into pitch decks, social media graphics, and stationery, so the brand launches complete.",
    ],
    tools: ["Adobe Illustrator", "Figma", "Adobe Photoshop", "guidelines.online"],
    timeline: "The core identity (color palette, typography, guidelines, and launch assets) is delivered in the one-week Brand Sprint for $3,000. Pitch decks and extended social templates usually add one more week at the same rate.",
    work: ["fox-berman", "aero", "medihuanna"],
    faqs: [
      {
        title: "What is the difference between a logo and a brand identity?",
        answer: "The logo is one asset. A brand identity is the whole visual system around it, including color, typography, graphic elements, and the rules for using them, so the brand stays consistent wherever it appears.",
      },
      {
        title: "What do the brand guidelines include?",
        answer: "Logo usage, color values for print and screen, typography, graphic elements, and examples in use. They are delivered as a live website on guidelines.online, so they stay current and easy to share.",
      },
      {
        title: "Do you design pitch decks and social media graphics?",
        answer: "Yes. Launch posts and profile images are part of the Brand Sprint, and a full pitch deck or animated social templates are usually one more week at the same flat rate.",
      },
    ],
  },
  "web-design": {
    title: "Website design & development",
    overview: [
      "A clear website brings your brand, content, and visitor experience together. I design responsive layouts in Figma, with design-only and design-and-development engagements available.",
      "Builds use Framer, Webflow, or custom Next.js hosted on platforms such as Vercel. We choose the approach around your content, functionality, and editing needs.",
    ],
    tools: ["Figma", "Framer", "Webflow", "Next.js", "Vercel"],
    timeline: "One week is $3,000; a month booked upfront is $10,000. A week can cover roughly 3–5 pages designed in Figma OR design and development of a simple landing page. A month can cover a more complex multi-page website. These are scope examples, not guarantees; pages, features, content, and timing are agreed before booking.",
    work: ["next-dimension", "elevate", "brevidee"],
    faqs: [
      { title: "Design only or a complete website?", answer: "Both are available. I can deliver responsive designs and an organized Figma handoff, or design and develop your website. We agree on which deliverables are included before booking." },
      { title: "What can we do in one week?", answer: "For example, roughly 3–5 pages designed in Figma OR design and development of a simple landing page. These are alternatives, not a combined package or a guarantee. Complexity, ready-to-use content, and prompt feedback determine what fits." },
      { title: "What can we do in a month?", answer: "A month can cover a more complex multi-page website, with custom graphics, animation, interactive elements, CMS collections, integrations, forms, and image optimization as appropriate. We prioritize and agree on the scope; a monthly booking does not include every possible feature." },
      { title: "How much does it cost?", answer: "A week costs $3,000. A month is $10,000 when booked upfront. We confirm the deliverables, schedule, and total before work begins. Platform subscriptions, hosting, and any paid third-party tools are discussed separately." },
      { title: "Which tools do you use?", answer: "I design in Figma and develop in Framer or Webflow. For custom requirements, I also build Next.js websites hosted on platforms such as Vercel. We choose the platform around your features and how your team wants to manage content." },
      { title: "Can you use my existing brand?", answer: "Yes. We can work with your current logo, colors, fonts, and content. If the identity needs updating, we agree on that work separately before starting the website." },
      { title: "Can I update the website myself?", answer: "Framer and Webflow support visual editing and CMS updates. For Next.js, we can scope a CMS for the content you need to manage. The editing setup and handover are agreed as part of the project." },
      { title: "How do revisions and payment work?", answer: "We review the work together and refine it within the agreed scope. Additional pages or features are agreed before proceeding. After we confirm scope and timing, I send an agreement and invoice; payment for the booked engagement is due upfront." },
    ],
  },
  "web-development": {
    title: "Web development in Framer, Webflow & Next.js",
    overview: [
      "Turn your approved design into a responsive website in Framer, Webflow, or custom Next.js. We choose the platform around your features, content, and editing needs.",
      "The build can include reusable pages, animation, CMS collections, forms, and integrations. We agree on the priorities, launch checks, and handover before booking.",
    ],
    tools: ["Framer", "Webflow", "Next.js", "Figma", "Vercel"],
    timeline: "A focused week costs $3,000; a month booked upfront is $10,000. A week can cover a simple landing-page build from approved designs and ready-to-use content. Larger multi-page builds, CMS work, and integrations may need a month or longer. Deliverables and timing are agreed before booking; neither period includes every possible feature.",
    work: ["fox-berman", "periti", "ventur"],
    faqs: [
      { title: "Design or development?", answer: "Development turns an approved design into a working website. If you also need structure, messaging, or Figma designs, we can scope web design before the build. We agree on both phases separately." },
      { title: "Which platform do you use?", answer: "I build in Framer, Webflow, or custom Next.js. We choose around your content, integrations, interactions, and how your team wants to manage the site." },
      { title: "What fits in one week?", answer: "A simple landing-page build from approved designs and ready-to-use content is one example. Responsive implementation, an agreed form or embed, and launch checks can be scoped around it. Complexity and feedback determine what fits; this is not a guaranteed package." },
      { title: "What about a larger build?", answer: "A monthly engagement allows broader work such as a multi-page website, reusable templates, CMS collections, content migration, animation, forms, and integrations. We agree on priorities and timing before booking; not every feature fits into one month." },
      { title: "How much does it cost?", answer: "A week costs $3,000. A month is $10,000 when booked upfront. We confirm the deliverables, schedule, and total before starting. Platform subscriptions, hosting, and paid third-party tools are discussed separately." },
      { title: "Can I update the site myself?", answer: "Framer and Webflow support visual editing and CMS updates. For Next.js, we can scope a CMS for the content your team needs to manage. We agree on the editing setup and handover before the build." },
      { title: "What happens at launch?", answer: "We check the agreed pages, responsive layouts, forms, and integrations, then handle the agreed domain setup, metadata, redirects, and handover. Ongoing maintenance or new features can be booked separately." },
      { title: "How do revisions and payment work?", answer: "We review the working site and refine it within the agreed scope. Additional pages or features are agreed before proceeding. Once scope and timing are confirmed, I send an agreement and invoice; payment for the booked engagement is due upfront." },
    ],
  },
  "motion-graphics": {
    title: "Motion graphics and animation",
    overview: [
      "Bring your existing brand to life with logo animation, animated social content, website graphics, and icons, selected around your priorities.",
      "For broader projects, we can scope promotional videos, basic explainers, longer animations, or brand-launch content. We agree on the assets, duration, complexity, and formats before booking.",
    ],
    tools: ["Adobe After Effects", "Lottie", "Rive", "Jitter"],
    timeline: "A focused week costs $3,000; a month booked upfront is $10,000. Deliverables and timing depend on the agreed animation scope.",
    work: ["orbio", "aero", "fox-berman"],
    faqs: [
      { title: "What fits in one week?", answer: "A focused week can cover a selection such as logo animation, animated social or Instagram content, website feature-card graphics, illustrations, or icons. We agree on priorities, quantity, and complexity before booking; the week does not include every example." },
      { title: "What can we do in a month?", answer: "A month allows more extensive work such as promotional videos for a brand, service, or product, basic explainers, longer animations, motion graphics, or brand-launch content. We agree on a selection and schedule; some projects may need longer." },
      { title: "How much does it cost?", answer: "A focused week costs $3,000. A month is $10,000 when booked upfront. We confirm deliverables, timing, and the total before starting." },
      { title: "What do you need from me?", answer: "Share your brand files, intended channels, and references. For videos, we also agree on the script, imagery, audio, and who supplies each asset before work begins." },
      { title: "Which files do I receive?", answer: "You receive the agreed video formats, sizes, and versions. Lottie can be scoped for suitable website animations. We confirm compatibility and any editable source files before booking." },
      { title: "How do revisions work?", answer: "We review the direction and keyframes before refining the animation. Revisions within the agreed scope are included; extra assets or changes in direction are agreed before proceeding." },
      { title: "When do I pay?", answer: "Once scope and timing are confirmed, I send the agreement and invoice. Payment for the booked engagement is due upfront, before work begins." },
    ],
  },
};
