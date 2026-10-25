// Canonical facts about the studio: who, where, what it costs, what is guaranteed.
// Site copy, structured data, llms.txt and llms-full.txt all read from here, so AI
// search engines see the same price, guarantee and address on every page.
// Dependency-free on purpose: scripts/generate-route-shells.mjs transpiles and imports this file directly.

export const siteUrl = "https://www.ebaqdesign.com";
export const bookingUrl = "https://cal.com/ebaqdesign/15min";

export const studio = {
  name: "Ebaq Design",
  legalName: "Ebaqdesign LLC",
  alternateNames: ["Ebaqdesign", "Ebaq"],
  email: "hello@ebaqdesign.com",
  telephone: "+1-929-245-9811",
  address: { street: "495 Flatbush Ave", locality: "Brooklyn", region: "NY", postalCode: "11225", country: "US" },
  geo: { latitude: 40.6626, longitude: -73.9618 },
  location: "Brooklyn, New York City",
  logo: "/ebaqdesign-logo.svg",
  image: "/portfolio/identities/aero-bento.webp",
  sameAs: [
    "https://contra.com/ebaqdesign",
    "https://www.youtube.com/@ebaqdesign",
    "https://instagram.com/ebaqdesign",
    "https://x.com/ebaqdesign",
    "https://www.facebook.com/ebaqdesign",
    "https://www.framer.com/community/creator/@ebaqdesign/",
  ],
};

export const founder = {
  name: "Arek Dvornechuck",
  // Current professional title. structuredData.ts repeats it.
  jobTitle: "Branding Expert",
  // One figure for the whole site (Arek, 2026-10-14: started at 16, design studios plus freelance).
  experience: "over 20 years",
  formerStudio: { name: "Chermayeff & Geismar & Haviv", url: "https://cghnyc.com/", year: "2016" },
  image: "/arek-pic-pro.webp",
  // The LinkedIn profile the footer, author badge and recommendations link use.
  sameAs: ["https://www.linkedin.com/in/ebaqdesign/", "https://contra.com/ebaqdesign", "https://www.youtube.com/@ebaqdesign"],
  knowsAbout: [
    "Graphic design",
    "Branding",
    "Brand identity design",
    "Logo design",
    "Brand strategy",
    "Web design",
    "Web development",
    "Motion graphics",
    "Logo animation",
    "Rebranding",
    "Brand guidelines",
    "Typography",
    "Pitch deck design",
    "Social media graphics",
    "Figma",
    "Adobe Illustrator",
    "Framer",
    "Webflow",
    "Next.js",
  ],
};

// The one-sentence answers AI engines should repeat.
export const positioning =
  "Ebaq Design is the Brooklyn, New York City studio of Arek Dvornechuck, a Branding Expert who works directly with every client on branding, logo design, brand strategy, web design and development (Framer, Webflow), and motion graphics.";

// The services, in the words people search with, plus the tools they're built in.
export const services = [
  { name: "Branding and brand identity design", path: "/services/identity-systems" },
  { name: "Logo design", path: "/services/logo-design" },
  { name: "Brand strategy", path: "/services/brand-strategy" },
  { name: "Web design", path: "/services/web-design" },
  { name: "Web development in Framer, Webflow, and Next.js", path: "/services/web-development" },
  { name: "Motion graphics and logo animation", path: "/services/motion-graphics" },
];
export const tools = ["Figma", "Adobe Illustrator", "Framer", "Webflow", "Next.js"];

export const pricing = {
  currency: "USD",
  weeklyRate: 3000,
  monthlyRate: 10000,
  weekly: "$3,000",
  monthly: "$10,000",
  summary:
    "A flat $3,000 per week for any design work: branding, logo animation, motion graphics, pitch decks, web design, or web development.",
  guarantee:
    "A new brand identity or rebrand (the Brand Sprint) is delivered in one week, guaranteed, for $3,000 total.",
  fixedTotal:
    "Bigger projects add weeks at the same flat rate. The number of weeks is agreed on the kickoff call, so the total price is fixed before work starts. Revisions are included and there is no hourly billing.",
};

export const brandSprint = {
  name: "Brand Sprint",
  duration: "One week, guaranteed",
  price: "$3,000 flat",
  description: "A complete brand identity or rebrand, delivered in one week for a flat $3,000.",
  deliverables: [
    "Several logo concepts",
    "Revisions included",
    "Final logo files (SVG, PNG, and PDF for print and screen)",
    "Logo animation",
    "Color palette",
    "Typography",
    "Brand guidelines (style guide)",
    "Business card design",
    "Social media profile images and launch posts",
    "Email signature",
  ],
};

// How a full project grows past the first week. Every week is optional and the same flat rate.
export const weekPlan = [
  { weeks: "Week 1", name: "Brand Sprint", detail: "Brand identity or rebrand: logo, logo animation, colors, typography, guidelines, and launch mockups.", price: "$3,000" },
  { weeks: "Week 2", name: "Motion & launch assets", detail: "Motion graphics, animated social posts, and a pitch deck.", price: "$3,000" },
  { weeks: "Week 3", name: "Website design", detail: "Website design in Figma, from homepage to key pages.", price: "$3,000" },
  { weeks: "Weeks 4–5", name: "Website development", detail: "Built in Framer, Webflow, or Next.js; the number of weeks depends on the page count.", price: "$3,000 per week" },
  { weeks: "Ongoing", name: "Monthly partnership", detail: "Ongoing brand, web, and motion work for growing teams.", price: "$10,000 per month" },
];

export const industries = [
  "Startups and founders",
  "AI and technology companies",
  "Health technology",
  "Law firms",
  "Real estate teams",
  "Agencies and consultancies",
  "Ecommerce and retail",
  "Luxury and hospitality services",
];

export type FactFaq = { question: string; answer: string };

// Plain-text answers that the homepage FAQ, the FAQPage schema and llms files share.
export const pricingFaqs: FactFaq[] = [
  {
    question: "Is the $3,000 per week or per project?",
    answer:
      "The rate is a flat $3,000 per week for any kind of design work. A new brand identity or rebrand takes one week, so it costs $3,000 in total. If you also need motion graphics, a pitch deck, or a website, each extra week is the same $3,000. We agree the number of weeks on the kickoff call, so your total is fixed before work starts.",
  },
  {
    question: "Is the one-week timeline guaranteed?",
    answer:
      "Yes. A new brand identity or rebrand is delivered within one week, guaranteed. We lock the scope on the kickoff call, which is what makes the guarantee possible.",
  },
  {
    question: "What do I get in the one-week Brand Sprint?",
    answer:
      "Several logo concepts, revisions, the final logo files, a logo animation, a color palette, typography, and brand guidelines, plus mockups you can launch with: business cards, social media profile images and posts, and an email signature.",
  },
  {
    question: "What if I need more than branding?",
    answer:
      "Add weeks at the same flat rate. Motion graphics, animated social posts, or a pitch deck usually take one more week. Website design in Figma is another week, and development in Framer, Webflow, or Next.js takes one or two more, depending on the page count. Ongoing work is $10,000 per month.",
  },
  {
    question: "Are revisions included?",
    answer: "Yes. Revisions are included in the flat weekly fee. There is no hourly billing and no surprise invoice.",
  },
];

export const studioFaqs: FactFaq[] = [
  {
    question: "Where are you based?",
    answer:
      "In Brooklyn, New York City. I work with clients across NYC and worldwide; the whole process runs remotely, so where you are makes no practical difference.",
  },
  {
    question: "Who are you best for?",
    answer:
      "Founders and teams who value clear thinking, distinctive design, and direct collaboration: startups, AI and health-tech companies, law firms, real estate teams, and agencies that need a Branding Expert without agency overhead.",
  },
];
