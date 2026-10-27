import { Layout423Defaults } from "../components/Layout423";
import { pricing } from "../content/siteFacts";

// The six offerings and their deliverables live in Layout423Defaults, which was
// written for the services page. Slugs are attached here in the same order so
// the hub and the detail pages share one source of copy.
const slugs = [
  "brand-strategy",
  "logo-design",
  "identity-systems",
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
  description: string;
  deliverables: string[];
  url: string;
};

export const services: Service[] = Layout423Defaults.features.map((feature, index) => ({
  slug: slugs[index],
  index,
  number: feature.tagline,
  heading: feature.heading,
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
  "identity-systems": { src: "/case-study/fox-berman/12-booklet.webp", alt: "Fox Berman brand book" },
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
      "Audit where the brand stands today, study the competition, and agree on positioning and messaging. Design decisions get much easier once this is settled.",
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
      "You review the work in structured rounds. Feedback is consolidated so revisions stay focused and the direction keeps moving forward.",
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
    timeline: "Strategy opens every branding project. It runs at the start of the one-week Brand Sprint, so the logo and identity are designed against agreed positioning, all within the flat $3,000 weekly rate.",
    work: ["wingnut", "periti", "spark"],
    faqs: [
      {
        title: "What does brand strategy include?",
        answer: "A brand audit, a competitive analysis, audience and customer profiles, a positioning statement, and the tagline and core messaging. It ends with decisions the design can be measured against, not a deck that sits in a drawer.",
      },
      {
        title: "Do I need brand strategy before a logo?",
        answer: "Yes, even a short version. A logo is only good or bad relative to what the brand needs to say and who it competes with. Settling positioning first is what lets a branding project move fast without going in circles.",
      },
      {
        title: "Is strategy priced separately?",
        answer: "No. It is part of the work and covered by the same flat $3,000 per week. A new brand identity, strategy included, takes one week, guaranteed.",
      },
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
    timeline: "A scoped identity refresh or rebrand is delivered in one week, guaranteed, for $3,000 total. The Brand Sprint includes the logo, logo animation, color palette, typography, guidelines and launch assets, with revisions included. We agree the scope at kickoff; additional website or rollout work is planned separately.",
    work: ["airport-executive", "elevate", "periti"],
    faqs: [
      {
        title: "Can you improve my existing logo without starting over?",
        answer: "Yes. We identify what is worth preserving, then agree which parts need attention: letterforms, spacing, proportions, colors, typography or the way the identity is applied. A refresh can retain the core idea; replacing the whole mark is not automatic.",
      },
      {
        title: "Does the $3,000 include colors and typography?",
        answer: "$3,000 is the total for the scoped one-week Brand Sprint, not just a logo file. It includes logo concepts or refinements, final logo files, logo animation, a color palette, typography, brand guidelines, business card design, social profile images and launch posts, and an email signature. Revisions and editable source files are included.",
        links: [{ label: "See the complete pricing and scope", href: "/pricing" }],
      },
      {
        title: "When does the one-week timeline start?",
        answer: "We confirm availability and agree the scope, start date and feedback schedule before starting. The scoped identity is delivered within one week, guaranteed. Website design, development and larger rollout work require separately agreed weeks at $3,000 per week, with the total fixed before work starts.",
      },
      {
        title: "What should I send before a logo refresh?",
        answer: "Send your current logo files, website, existing guidelines and examples of where the identity needs to work. Explain what must stay recognizable, what is not working, who approves the design and your launch priorities. If you only have a PNG or cannot find the original files, flag that when we discuss the scope.",
      },
      {
        title: "What logo files do I get?",
        answer: "Final logo files in SVG, PNG and PDF for print and screen, with agreed responsive and color variations, plus the logo animation and editable source files. The guidelines document the palette, typography and usage rules so your team and suppliers can use the identity consistently.",
      },
      {
        title: "Are premium font licenses and website work included?",
        answer: "We identify any third-party font or asset licensing costs and responsibilities before choosing them. Website design and development, print production and larger rollout projects are separate from the identity sprint. Additional design weeks cost $3,000 each, with the scope and total agreed before work starts.",
      },
    ],
  },
  "identity-systems": {
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
    title: "Website design in Figma, built around the brand",
    overview: [
      "A website is where most people meet the brand for the first time, so it has to explain the business fast and guide visitors to the next step. I design the structure, the messaging hierarchy, and every key page in Figma.",
      "The process moves from wireframes to full responsive designs for desktop, tablet, and mobile, with the brand's type, color, and motion carried through, so the site feels like part of the identity instead of a template.",
      "The work below includes websites for an AI healthcare company, a Shopify testing app, and an ed-tech platform for schools.",
    ],
    tools: ["Figma", "Framer", "Webflow", "Adobe Illustrator"],
    timeline: "Website design in Figma takes about one week at $3,000. Development in Framer, Webflow, or Next.js usually adds one or two weeks, depending on the page count.",
    work: ["next-dimension", "elevate", "brevidee"],
    faqs: [
      {
        title: "Do you design websites in Figma?",
        answer: "Yes. Every page is designed in Figma first, from wireframes to responsive desktop and mobile layouts, so you can review the whole site before anything is built.",
      },
      {
        title: "How long does a website take?",
        answer: "Design takes about one week. Development in Framer, Webflow, or Next.js takes one or two more, depending on how many pages and integrations the site needs. You know the number of weeks, and the total, before work starts.",
      },
      {
        title: "Can you design a website for an existing brand?",
        answer: "Yes. If the brand is in good shape, the website builds on it. If it needs work first, the one-week Brand Sprint comes before the website.",
      },
    ],
  },
  "web-development": {
    title: "Framer and Webflow development, launch included",
    overview: [
      "The approved design is built as a fast, responsive site you can edit yourself. Most marketing sites are built in Framer or Webflow; a custom product or content-heavy site can be built in Next.js.",
      "Development covers the responsive build, interactions and animation, CMS setup for blogs and case studies, forms and integrations, SEO basics like titles, descriptions, and redirects, and support through launch.",
      "Framer suits marketing sites with rich motion that a small team edits often. Webflow suits larger CMS-driven sites. Next.js suits anything that needs custom functionality. I recommend one on the kickoff call.",
    ],
    tools: ["Framer", "Webflow", "Next.js", "Figma"],
    timeline: "Development usually takes one or two weeks at $3,000 per week, depending on the page count, after the one-week design phase. Ongoing updates are available on the $10,000 monthly plan.",
    work: ["fox-berman", "periti", "ventur"],
    faqs: [
      {
        title: "Should my website be built in Framer or Webflow?",
        answer: "Framer for marketing sites with lots of motion that a small team updates often; Webflow for larger sites built around a CMS. If the site needs custom functionality, Next.js. The choice is made on the kickoff call, based on how your team will use the site.",
      },
      {
        title: "Will I be able to edit the website myself?",
        answer: "Yes. Framer and Webflow sites are handed over with the CMS set up and a walkthrough, so your team can update pages, posts, and case studies without a developer.",
      },
      {
        title: "Do you handle launch and SEO setup?",
        answer: "Yes. Launch support covers domain connection, page titles and descriptions, redirects from an old site, and a final check across devices.",
      },
    ],
  },
  "motion-graphics": {
    title: "Motion graphics and logo animation",
    overview: [
      "Motion makes a brand feel alive and helps it stand out in feeds and on websites. I design logo animations, brand transitions, animated social posts, and website motion that follow the identity's own rules.",
      "Animations are delivered in the formats each channel needs: video for social and presentations, and lightweight Lottie files for websites and apps, so motion stays sharp without slowing the page down.",
      "Every Brand Sprint already includes a logo animation; extended motion systems are built on top of it.",
    ],
    tools: ["Adobe After Effects", "Lottie", "Rive", "Jitter"],
    timeline: "A logo animation is included in the one-week Brand Sprint. Motion graphics, animated social posts, and website animation usually take one more week at the same $3,000 rate.",
    work: ["orbio", "aero", "fox-berman"],
    faqs: [
      {
        title: "What is a logo animation used for?",
        answer: "Website intros and loaders, social media profile videos and posts, presentation openers, and video end cards. It makes the logo recognizable in places where a static mark gets scrolled past.",
      },
      {
        title: "Which file formats do you deliver?",
        answer: "Video files for social media and presentations, and Lottie files for websites and apps, which stay sharp at any size and load quickly.",
      },
      {
        title: "Is motion included in the Brand Sprint?",
        answer: "The logo animation is. A fuller motion system, including transitions, animated social templates, and website animation, is usually one more week at the same flat rate.",
      },
    ],
  },
};
