// Platform comparison pages (/compare and /compare/:slug). Drafts, pending Arek's review.
//
// Pure data with no imports: scripts/generate-route-shells.mjs and scripts/generate-sitemap.mjs load
// this file directly. Each platform's facts are written once and reused by every page that includes it,
// so a new comparison is one entry in `comparisons` (plus a `platformFacts` entry for a new platform).
//
// Platform prices were read from framer.com/pricing, webflow.com/pricing, and wix.com/plans in November 2026. The studio's
// own numbers match the Framer and Webflow landing pages: $3,000 per week, two to three weeks.

export const comparisonsUpdated = "November 2026";

export type PlatformId = "framer" | "webflow" | "nextjs" | "wordpress" | "wix" | "astro" | "hubspot" | "shopify" | "squarespace";
type Link = { label: string; href: string };

export const criteria = [
  { id: "bestFor", label: "Best for" },
  { id: "design", label: "Design workflow" },
  { id: "motion", label: "Motion" },
  { id: "cms", label: "CMS" },
  { id: "seo", label: "SEO" },
  { id: "editing", label: "Editing after launch" },
  { id: "upkeep", label: "Upkeep and security" },
  { id: "learning", label: "Learning curve" },
  { id: "code", label: "Custom code" },
  { id: "ai", label: "AI agents" },
  { id: "plan", label: "Platform plan" },
  { id: "builtByMe", label: "Built by me" },
] as const;
export type CriterionId = (typeof criteria)[number]["id"];

export const costRows = [
  { id: "design", label: "Design in Figma", note: "One week" },
  { id: "build", label: "Build", note: "One or two weeks, by page count" },
  { id: "plan", label: "Platform plan", note: "Twelve months at the listed price" },
  { id: "editors", label: "Extra editors", note: "Billed by the platform" },
  { id: "total", label: "Year-one total", note: "Design, build, and platform plan" },
] as const;
export type CostId = (typeof costRows)[number]["id"];

export type Proof =
  | { caseStudy: string }
  | { quote: string; name: string; position: string; companyName: string; avatar: { src: string; alt: string }; logo: { src: string; alt: string; scale?: 60 }; site: Link };

export type PlatformFacts = {
  name: string;
  // A row is left out of a page's table when one of its platforms has no answer for it.
  criteria: Partial<Record<CriterionId, string>>;
  costs: Record<CostId, string>;
  // The "which one should you choose" card and the quiz result.
  choice: { tag: string; body: string; link: Link };
  result: { heading: string; body: string };
  // Client sites built on this platform: a case study with a testimonial, or a testimonial with a link to the live site.
  proof?: Proof[];
  pricing?: Link;
};

export const platformFacts: Record<PlatformId, PlatformFacts> = {
  framer: {
    name: "Framer",
    criteria: {
      bestFor: "Marketing sites and landing pages with lots of motion that a small team updates often.",
      design: "A freeform canvas that works much like Figma, so designs move across quickly.",
      motion: "Scroll effects, hover states, and animated components with little setup.",
      cms: "Good for blogs, case studies, and simple collections. The Pro plan lists 10 collections.",
      seo: "Page titles, descriptions, redirects, and a sitemap are built in.",
      editing: "On-page editing and a simple CMS that suit a small team without a developer.",
      upkeep: "Hosting, security, and updates are handled by Framer.",
      learning: "Short for anyone who already knows Figma.",
      code: "Code components written in React.",
      ai: "An MCP server, in preview, connects tools such as Claude to the project.",
      plan: "Pro is listed at $30 per month, hosting included.",
      builtByMe: "Two to three weeks, $6,000 to $9,000.",
    },
    costs: { design: "$3,000", build: "$3,000 to $6,000", plan: "$360 (Pro)", editors: "$20 per editor a month, or $10 for content-only editors", total: "$6,360 to $9,360" },
    choice: { tag: "Best for speed and motion", body: "You want a polished marketing site with motion, a blog or case studies, and a small team that edits pages without a developer.", link: { label: "Framer designer", href: "/framer-designer" } },
    result: { heading: "Framer is the better fit", body: "Your answers point to a design-led site that a small team keeps updating. Framer gets that live quickly and keeps motion easy to maintain." },
    proof: [{ caseStudy: "fox-berman" }],
    pricing: { label: "framer.com/pricing", href: "https://www.framer.com/pricing" },
  },
  webflow: {
    name: "Webflow",
    criteria: {
      bestFor: "Larger sites built around a CMS: a blog, case studies, or many service pages.",
      design: "A builder based on classes and the box model, closer to how CSS itself works.",
      motion: "A detailed interactions panel with fine control, and more setup per animation.",
      cms: "Built for content: reference fields, filtered lists, and large collections.",
      seo: "The same basics, with settings on every collection template for large content sites.",
      editing: "A structured editor and CMS, so publishing new content does not break the design.",
      upkeep: "Hosting, security, and updates are handled by Webflow.",
      learning: "Steeper. It helps to understand how HTML and CSS work.",
      code: "Custom code embeds, plus code components on the Premium plan.",
      ai: "An MCP server is listed on every site plan, including the free one.",
      plan: "Premium, the plan with the CMS, is listed at $25 per month, billed yearly, hosting included.",
      builtByMe: "Two to three weeks, $6,000 to $9,000.",
    },
    costs: { design: "$3,000", build: "$3,000 to $6,000", plan: "$300 (Premium)", editors: "Seats are billed through a separate Workspace plan", total: "$6,300 to $9,300" },
    choice: { tag: "Best for structure and content", body: "Your site is built around content: many collections, filtered lists, lots of service pages, or a team that already works in Webflow.", link: { label: "Webflow designer", href: "/webflow-designer" } },
    result: { heading: "Webflow is the better fit", body: "Your answers point to a site built around content and structure. Webflow’s CMS handles that with less friction as the site grows." },
    proof: [{ caseStudy: "brevidee" }, { caseStudy: "next-dimension" }, { caseStudy: "airport-executive" }],
    pricing: { label: "webflow.com/pricing", href: "https://webflow.com/pricing" },
  },
  nextjs: {
    name: "Next.js",
    criteria: {
      bestFor: "Sites that behave like a product: logins, payments, or data from your app.",
      design: "Designed in Figma, then written in code. Anything is possible, nothing is drag and drop.",
      motion: "Any animation library, with full control and more development time.",
      cms: "None built in. You connect a headless CMS or keep content in files.",
      seo: "Full control over markup, metadata, and speed, all set up by hand.",
      editing: "Changes go through code, unless a CMS is connected for your team.",
      upkeep: "Your host handles the servers. Code and dependency updates are yours.",
      learning: "Needs a developer for anything beyond content.",
      code: "It is all code, so there are no platform limits.",
      ai: "Coding agents such as Claude Code work directly in the codebase.",
      plan: "No builder plan. You pay for hosting, which depends on the host and traffic.",
      builtByMe: "Two to three weeks, $6,000 to $9,000.",
    },
    costs: { design: "$3,000", build: "$3,000 to $6,000", plan: "Hosting, billed by your host", editors: "No seats. Editors need a connected CMS", total: "$6,000 to $9,000, plus hosting" },
    choice: { tag: "Most flexible", body: "The site has to behave like a product: logins, payments, data from your app, or features no site builder offers.", link: { label: "Web development", href: "/services/web-development" } },
    result: { heading: "A custom Next.js build is the better fit", body: "Your answers describe something closer to a product than a marketing site. A custom Next.js build gives you that control." },
    proof: [{ caseStudy: "elevate" }, {
      quote: '"Working with Arek was an awesome experience. He is so creative and fast and talented in so many tech areas. He has great ideas and gave honest feedback to my ideas. Final website was incredible. Very impressive. I will be using him for everything going forward."',
      name: "James Greaves", position: "CEO", companyName: "Brand Makers",
      avatar: { src: "/testimonials/james-greaves.webp", alt: "James Greaves" },
      logo: { src: "/client-logos/brand-makers-logo-black.svg", alt: "Brand Makers", scale: 60 },
      site: { label: "Visit the site", href: "https://www.brandmakers.com" },
    }],
  },
  wordpress: {
    name: "WordPress",
    criteria: {
      bestFor: "Blogs, publishers, and content-heavy sites that rely on plugins.",
      design: "Depends on the theme or page builder. A fully custom design usually needs a developer.",
      motion: "Possible with plugins or custom code, which adds more to maintain.",
      cms: "Very strong: posts, categories, custom post types, and roles for a team of writers.",
      seo: "Strong once an SEO plugin is set up and kept up to date.",
      editing: "A familiar editor for writers. Layout changes depend on the theme or builder.",
      upkeep: "Yours to manage: core, theme, and plugin updates, backups, and security.",
      learning: "Easy to publish in, harder to set up and keep healthy.",
      code: "Open source, so themes, plugins, and PHP can all be changed.",
      plan: "The software is free. Hosting, premium themes, and plugins are paid for separately.",
      builtByMe: "Not a platform I build on. I move WordPress sites to Framer or Webflow.",
    },
    costs: { design: "Not offered", build: "I move WordPress sites to Framer or Webflow instead", plan: "Free software. Hosting, themes, and plugins are billed separately", editors: "No seat fees. User roles are built in", total: "Hosting, plugins, and upkeep" },
    choice: { tag: "Best for publishing at scale", body: "You run a large blog or publication, depend on specific plugins, or have a technical team that already maintains WordPress.", link: { label: "Read my comparison", href: "/blog/wordpress-vs-webflow-vs-framer" } },
    result: { heading: "WordPress is the better fit", body: "Your answers point to heavy publishing, essential plugins, or a technical team. WordPress handles that well, as long as someone keeps it maintained." },
  },
  wix: {
    name: "Wix",
    criteria: {
      bestFor: "Small businesses that need a simple site live quickly, with a store or bookings built in.",
      design: "A drag-and-drop editor and more than 2,000 templates. Quick to start; a fully custom design takes more work.",
      motion: "Built-in animation presets for simple effects.",
      cms: "A blog and content collections that suit smaller sites.",
      seo: "Built-in SEO tools for titles, descriptions, and redirects.",
      editing: "Simple enough for an owner to edit alone, without a designer.",
      upkeep: "Hosting and security are handled by Wix.",
      learning: "The shortest of the three. Most owners build their own site.",
      code: "Custom code is possible. The advanced developer platform is listed on the top plan.",
      ai: "A built-in AI website builder creates a first version of the site from a prompt.",
      plan: "Core is listed at $29 per month and Business at $39, billed yearly, hosting included.",
      builtByMe: "Not a platform I build on. I move Wix sites to Framer or Webflow.",
    },
    costs: { design: "Not offered", build: "I move Wix sites to Framer or Webflow instead", plan: "$348 (Core)", editors: "Collaborators are included: 5 on Core, 10 on Business", total: "From $348, if you build it yourself" },
    choice: { tag: "Best for a quick start", body: "You run a small business, need a simple site live this week with a store or bookings built in, and plan to build and edit it yourself.", link: { label: "All comparisons", href: "/compare" } },
    result: { heading: "Wix is the better fit", body: "Your answers point to a simple site you run yourself. Wix gets that online quickly, and you can move to Framer or Webflow when the business outgrows it." },
    pricing: { label: "wix.com/plans", href: "https://www.wix.com/plans" },
  },
  astro: {
    name: "Astro",
    criteria: {
      bestFor: "Content sites written in code by a developer: blogs, documentation, and marketing sites where speed comes first.",
      design: "Designed elsewhere, then written in code. There is no visual editor.",
      motion: "Built-in view transitions between pages. Anything more is added in code.",
      cms: "Content collections for Markdown files, or a headless CMS you connect.",
      seo: "Sends plain HTML with no JavaScript by default, so pages load fast. Metadata is set up by hand.",
      editing: "Changes go through code or Markdown files, unless a CMS is connected for your team.",
      upkeep: "Your host handles the servers. Code and dependency updates are yours.",
      learning: "Needs a developer. Its templates are close to plain HTML.",
      code: "It is all code, and it accepts components from React, Vue, Svelte, and others.",
      ai: "An official MCP server lets AI coding tools work with the project.",
      plan: "Free, open-source software. You pay for hosting, which depends on the host and traffic.",
      builtByMe: "Not a framework I build in. For a coded site I use Next.js.",
    },
    costs: { design: "Not offered", build: "I build coded sites in Next.js instead", plan: "Free software. Hosting is billed by your host", editors: "No seats. Editors need a connected CMS", total: "Hosting and developer time" },
    choice: { tag: "Best for fast, coded content sites", body: "You have a developer, the site is mostly content, and loading speed matters more than letting the team edit pages visually.", link: { label: "All comparisons", href: "/compare" } },
    result: { heading: "Astro is the better fit", body: "Your answers point to a content site run by developers. Astro handles that well, as long as someone on the team is comfortable in code." },
    pricing: { label: "astro.build", href: "https://astro.build" },
  },
  hubspot: {
    name: "HubSpot",
    criteria: {
      bestFor: "Marketing teams that already run their CRM, email, and forms in HubSpot.",
      design: "Built from themes and modules. A fully custom design usually needs a HubSpot developer.",
      motion: "Limited without custom code.",
      cms: "A website, blog, and landing pages that sit next to your contacts and campaigns.",
      seo: "SEO tools are part of the content software, alongside the blog.",
      editing: "Marketers edit pages and publish posts inside the same tool they use for campaigns.",
      upkeep: "Hosting and security are handled by HubSpot.",
      learning: "Easy if the team already works in HubSpot. There is a lot of product to learn if not.",
      code: "Custom modules and templates, written by a developer.",
      ai: "AI features run on HubSpot Credits, which are included with paid plans.",
      plan: "Content Hub has a free plan. Starter is listed at $20 per seat per month before discounts, and Professional starts at $450 per month.",
      builtByMe: "Not a platform I build on. I move HubSpot sites to Framer or Webflow.",
    },
    costs: { design: "Not offered", build: "I move HubSpot sites to Framer or Webflow instead", plan: "From $240 per seat (Starter, list price)", editors: "Priced per seat. Professional includes three", total: "From $240 per seat, if you build it yourself" },
    choice: { tag: "Best for teams already on HubSpot", body: "Your marketing team already runs its CRM, email, and forms in HubSpot and wants the website in the same place.", link: { label: "All comparisons", href: "/compare" } },
    result: { heading: "HubSpot is the better fit", body: "Your answers point to a marketing team that wants the website next to its CRM and campaigns. HubSpot keeps all of that in one tool." },
    pricing: { label: "hubspot.com/pricing/content", href: "https://www.hubspot.com/pricing/content" },
  },
  shopify: {
    name: "Shopify",
    criteria: {
      bestFor: "Online stores: products, inventory, checkout, and shipping in one place.",
      design: "Built from a theme. A fully custom design usually needs a developer who knows Shopify themes.",
      motion: "Depends on the theme. Anything more is added in code.",
      cms: "Built around products. Pages and a blog are included, with less structure than a content CMS.",
      seo: "The basics are built in, set up around product and collection pages.",
      editing: "Simple for products, prices, and orders. Layout changes depend on the theme.",
      upkeep: "Hosting and security are handled by Shopify.",
      learning: "Quick to start selling. A custom storefront takes a specialist.",
      code: "Thousands of apps, theme code you can edit, and headless storefronts.",
      ai: "Sidekick, a built-in AI assistant, is listed on every plan.",
      plan: "Basic is listed at $29 per month and Grow at $89, billed yearly, hosting included. Card fees apply to sales.",
      builtByMe: "Not a platform I build on. If the site is mainly a store, Shopify is the right choice.",
    },
    costs: { design: "Not offered", build: "Not offered. I build marketing sites, not stores", plan: "$348 (Basic)", editors: "Staff accounts: 5 on Grow, 15 on Advanced", total: "From $348, plus card fees, if you build it yourself" },
    choice: { tag: "Best for selling products", body: "The site is mainly a store: you need a catalog, inventory, checkout, and shipping more than you need a custom marketing site.", link: { label: "All comparisons", href: "/compare" } },
    result: { heading: "Shopify is the better fit", body: "Your answers point to a store. Shopify is built for selling, and a marketing site can still sit alongside it later." },
    pricing: { label: "shopify.com/pricing", href: "https://www.shopify.com/pricing" },
  },
  squarespace: {
    name: "Squarespace",
    criteria: {
      bestFor: "Small businesses, portfolios, and service providers who want a clean site they build themselves.",
      design: "Polished templates you adjust. Quick to start; a design that looks unlike the template takes more work.",
      motion: "Simple built-in effects.",
      cms: "A blog, portfolio pages, and a store that suit smaller sites.",
      seo: "Built-in SEO and mobile optimization are listed on every plan.",
      editing: "Simple enough for an owner to edit alone, without a designer.",
      upkeep: "Hosting and security are handled by Squarespace.",
      learning: "Short. Most owners build their own site.",
      code: "Limited. The platform is built around its templates.",
      ai: "Built-in AI tools are listed on every plan.",
      plan: "Basic is listed at $19 per month and Core at $29, billed yearly, hosting included.",
      builtByMe: "Not a platform I build on. I move Squarespace sites to Framer or Webflow.",
    },
    costs: { design: "Not offered", build: "I move Squarespace sites to Framer or Webflow instead", plan: "$348 (Core)", editors: "Contributors are included: 2 on Basic, unlimited on Core", total: "From $348, if you build it yourself" },
    choice: { tag: "Best for a simple, polished start", body: "You run a small business or a portfolio, want a clean site live quickly from a template, and plan to build and edit it yourself.", link: { label: "All comparisons", href: "/compare" } },
    result: { heading: "Squarespace is the better fit", body: "Your answers point to a simple site you run yourself. Squarespace gets that online quickly, and you can move to Framer or Webflow when the business outgrows it." },
    pricing: { label: "squarespace.com/pricing", href: "https://www.squarespace.com/pricing" },
  },
};

// One quiz for every page. An answer only counts for the platforms on that page.
export const quizQuestions: { question: string; hint: string; options: { label: string; scores: Partial<Record<PlatformId, number>> }[] }[] = [
  { question: "Who will update the site after launch?", hint: "The people making most of the changes.", options: [
    { label: "A small marketing team", scores: { framer: 2, webflow: 1, hubspot: 2 } },
    { label: "A designer", scores: { framer: 2 } },
    { label: "Writers who publish often", scores: { webflow: 2, wordpress: 2, hubspot: 1 } },
    { label: "Developers", scores: { nextjs: 2, wordpress: 1, astro: 2 } },
    { label: "Just me, the owner", scores: { wix: 2, framer: 1, squarespace: 2, shopify: 1 } },
  ] },
  { question: "How much content will it hold?", hint: "Think a year ahead, not launch day.", options: [
    { label: "A few pages and a landing page", scores: { framer: 2, wix: 1, squarespace: 1 } },
    { label: "A blog and some case studies", scores: { framer: 1, webflow: 1 } },
    { label: "Hundreds of items with filters", scores: { webflow: 2, wordpress: 2, astro: 1, hubspot: 1, shopify: 1 } },
    { label: "Content pulled from our product", scores: { nextjs: 2 } },
  ] },
  { question: "How important is motion?", hint: "Animation, scroll effects, and interactions.", options: [
    { label: "It is central to the brand", scores: { framer: 2 } },
    { label: "Some polish is enough", scores: { framer: 1, webflow: 1 } },
    { label: "It is not a priority", scores: { webflow: 1, wordpress: 1, wix: 1, astro: 1, hubspot: 1, shopify: 1, squarespace: 1 } },
  ] },
  { question: "What does the site need to do?", hint: "Its main job for the business.", options: [
    { label: "Present the company and convert visitors", scores: { framer: 2, wix: 1, squarespace: 1, hubspot: 1 } },
    { label: "Publish content and rank in search", scores: { webflow: 2, wordpress: 2, astro: 2, hubspot: 1 } },
    { label: "Sell products online", scores: { shopify: 3, wix: 2, squarespace: 2 } },
    { label: "Work like a product, with logins or payments", scores: { nextjs: 3 } },
  ] },
  { question: "How much upkeep can your team take on?", hint: "Updates, backups, and security.", options: [
    { label: "None. I want hosting and updates handled", scores: { framer: 1, webflow: 1, wix: 1, hubspot: 1, shopify: 1, squarespace: 1 } },
    { label: "A little. We have a developer on call", scores: { wordpress: 1, nextjs: 1, astro: 1 } },
    { label: "Plenty. We have a technical team", scores: { wordpress: 2, nextjs: 2, astro: 2 } },
  ] },
];

export const eitherResult = { heading: "Either one would work", body: "Your answers do not favor one platform. On the kickoff call I recommend one based on how your team will use the site." };

export type ComparisonFaq = { question: string; answer: string; link?: Link };

const costFaq: ComparisonFaq = { question: "How much does a website cost with you?", answer: "$3,000 per week, flat, on Framer, Webflow, or Next.js. A site usually takes two to three weeks, so $6,000 to $9,000 in total, fixed on the kickoff call. The platform bills its own plan separately.", link: { label: "pricing", href: "/pricing" } };
const moveFaq = (from: string): ComparisonFaq => ({ question: `Can you move my site from ${from}?`, answer: "Yes. The pages are rebuilt on the new platform, the content is moved across, and old URLs are redirected at launch, so existing links and search results land on the new pages." });

export type Comparison = {
  slug: string;
  // The two platforms in the title, then one more shown alongside for context.
  platforms: [PlatformId, PlatformId, PlatformId];
  description: string;
  shortAnswer: string;
  faqs: ComparisonFaq[];
};

export const comparisons: Comparison[] = [
  {
    slug: "framer-vs-webflow",
    platforms: ["framer", "webflow", "nextjs"],
    description: "Framer vs Webflow, compared by a designer who builds in both: design workflow, motion, CMS, SEO, editing, and what the first year costs on each.",
    shortAnswer: "Choose Framer for a marketing site with lots of motion that a small team updates often. Choose Webflow for a larger site built around a CMS.",
    faqs: [
      { question: "Is Framer better than Webflow?", answer: "Neither is better overall. Framer suits marketing sites and landing pages with lots of motion that a small team updates often. Webflow suits larger sites built around a CMS. The right choice depends on how much content the site holds and who edits it." },
      { question: "Which is better for SEO?", answer: "Both cover the basics: page titles, descriptions, redirects, and a sitemap. For a content-heavy site with a large blog, Webflow is usually the better fit, because its CMS gives more control over many pages at once." },
      { question: "Which is faster to launch?", answer: "With me, both take two to three weeks: about one week of design in Figma, then one or two weeks of building, depending on the page count. Pages with a lot of motion usually come together faster in Framer." },
      { question: "Which is easier for my team to edit?", answer: "Framer is easier for a small team that wants to change pages directly. Webflow is easier to keep consistent when several people publish content, because the CMS keeps them inside the design. Either way, the site is handed over with a walkthrough." },
      { question: "When is a custom Next.js build worth it?", answer: "When the site needs something a builder cannot do: logins, payments, data from your product, or unusual features. For a marketing site, Framer or Webflow is usually faster to launch and easier for your team to edit." },
      moveFaq("one to the other"),
      costFaq,
      { question: "Do you build in both?", answer: "Yes. Framer lists me in its Experts directory, and my own site ran on Webflow for over six years. You work with me directly from the first call to launch.", link: { label: "my Framer profile", href: "https://www.framer.com/community/creator/@ebaqdesign/" } },
    ],
  },
  {
    slug: "framer-vs-wordpress",
    platforms: ["framer", "wordpress", "webflow"],
    description: "Framer vs WordPress, compared by a designer who ran his own site on WordPress for ten years: design, CMS, SEO, upkeep, and what each costs to run.",
    shortAnswer: "Choose Framer for a design-led marketing site your team edits itself, with hosting and updates handled. Choose WordPress for a large publication that relies on plugins.",
    faqs: [
      { question: "Is Framer better than WordPress?", answer: "For a marketing site, usually yes: it is faster to design, has no plugins to update, and a small team can edit it without a developer. For a large blog or a site that depends on specific plugins, WordPress is still the stronger choice." },
      { question: "Is WordPress better for SEO?", answer: "Not by default. WordPress gets its SEO features from plugins, which need setup and updates. Framer has page titles, descriptions, redirects, and a sitemap built in. For hundreds of articles and several authors, WordPress handles the publishing better." },
      { question: "Is Framer cheaper than WordPress?", answer: "WordPress itself is free, but hosting, premium themes, plugins, and maintenance are paid for separately and add up. Framer’s Pro plan is listed at $30 per month with hosting included, and there are no plugins to buy or update." },
      { question: "Which needs less maintenance?", answer: "Framer. Hosting, security, and updates are handled for you. A WordPress site needs its core, theme, and plugins kept up to date, plus backups and security, by you or a developer." },
      { question: "When should I stay on WordPress?", answer: "When the site is a large publication, when it depends on plugins with no equivalent elsewhere, or when a technical team already maintains it well. If none of those apply, a move is worth considering." },
      { ...moveFaq("WordPress to Framer"), answer: "Yes. The site is redesigned in Figma and rebuilt in Framer, the content is moved across, and old URLs are redirected at launch, so existing links and search results land on the new pages. If the site is content-heavy, I usually recommend Webflow instead." },
      costFaq,
      { question: "Do you build WordPress sites?", answer: "No. I ran my own site on WordPress for over ten years and then moved it to Webflow, so I know both sides of that move. Today I design and build in Framer, Webflow, and Next.js.", link: { label: "my WordPress vs Webflow vs Framer comparison", href: "/blog/wordpress-vs-webflow-vs-framer" } },
    ],
  },
  {
    slug: "framer-vs-wix",
    platforms: ["framer", "wix", "webflow"],
    description: "Framer vs Wix, compared by a web designer: design freedom, templates, CMS, SEO, editing, and what each costs to run in the first year.",
    shortAnswer: "Choose Framer for a custom-designed marketing site with motion that matches your brand. Choose Wix for a simple small-business site you build yourself from a template.",
    faqs: [
      { question: "Is Framer better than Wix?", answer: "For a site designed around your brand, yes: Framer gives a designer far more control over layout and motion. For a simple site an owner builds alone from a template, with a store or bookings built in, Wix is quicker and does the job." },
      { question: "Is Wix cheaper than Framer?", answer: "The plans are priced close together. Wix lists Light at $17 and Core at $29 per month, billed yearly, and Framer lists Basic at $10 and Pro at $30. The bigger difference is the design: a Wix site is usually built by its owner from a template, while a Framer site is usually designed for the brand." },
      { question: "Which is better for SEO?", answer: "Both cover the basics: page titles, descriptions, and redirects. Neither one holds a site back on its own. Clear structure, useful content, and fast pages matter more than which of the two you pick." },
      { question: "Can I sell products or take bookings?", answer: "Wix lists online payments, ecommerce, and scheduling on its Core plan and above. Framer is built for marketing sites, so if selling products is the site’s main job, Wix or a dedicated store platform is the better fit." },
      { question: "When should I move from Wix to Framer?", answer: "When the template starts to hold the brand back: the site looks like others in your field, the design is hard to keep consistent, or you want motion and a layout made for your business." },
      moveFaq("Wix to Framer"),
      costFaq,
      { question: "Do you build Wix sites?", answer: "No. I design and build in Framer, Webflow, and Next.js. If you are on Wix today, I can redesign the site and move it to Framer or Webflow." },
    ],
  },
  {
    slug: "framer-vs-nextjs",
    platforms: ["framer", "nextjs", "webflow"],
    description: "Framer vs Next.js, compared by a designer who builds in both: design speed, custom features, CMS, SEO, editing, and what each costs in the first year.",
    shortAnswer: "Choose Framer for a marketing site your team edits itself, with motion and hosting built in. Choose Next.js when the site has to work like a product, with logins, payments, or data from your app.",
    faqs: [
      { question: "Is Framer better than Next.js?", answer: "They solve different problems. Framer is a visual builder, so a marketing site goes live quickly and your team can edit it. Next.js is a code framework, so it can do anything, and every change goes through a developer unless a CMS is connected." },
      { question: "Is Next.js faster than Framer?", answer: "A well-built Next.js site gives a developer full control over speed. Framer handles hosting and performance for you, which is enough for most marketing sites. The gap shows up on very large or unusual sites, not on a typical company website." },
      { question: "Can my team edit a Next.js site?", answer: "Only if a CMS is connected for them. Without one, text and page changes go through code. In Framer, a small team can change pages and publish posts without a developer." },
      { question: "When is a custom Next.js build worth it?", answer: "When the site needs something a builder cannot do: logins, payments, data from your product, or unusual features. For a marketing site, Framer is usually faster to launch and easier for your team to run." },
      { question: "Can I start in Framer and move to Next.js later?", answer: "Yes, and it is a common path. Launch the marketing site in Framer, then rebuild in Next.js once the site needs features a builder cannot offer. The design carries over; the pages are rebuilt in code and old URLs are redirected." },
      { question: "Which is better for SEO?", answer: "Both can rank. Framer has page titles, descriptions, redirects, and a sitemap built in. Next.js gives full control over markup and metadata, and all of it is set up by hand." },
      costFaq,
      { question: "Do you build in both?", answer: "Yes. Framer lists me in its Experts directory, and I also build custom sites in Next.js. You work with me directly from the first call to launch.", link: { label: "my Framer profile", href: "https://www.framer.com/community/creator/@ebaqdesign/" } },
    ],
  },
  {
    slug: "webflow-vs-wordpress",
    platforms: ["webflow", "wordpress", "framer"],
    description: "Webflow vs WordPress, compared by a designer who moved his own site from one to the other: design control, CMS, SEO, upkeep, and what each costs to run.",
    shortAnswer: "Choose Webflow for a business site your team edits visually, with hosting and security handled. Choose WordPress for a large publication that relies on plugins.",
    faqs: [
      { question: "Is Webflow better than WordPress?", answer: "For most business websites, I think so: the design is fully custom, the CMS is built in, and there are no plugins to update. WordPress is still the stronger choice for a large blog or a site that depends on specific plugins." },
      { question: "Is WordPress better for SEO?", answer: "Not by default. WordPress gets its SEO features from plugins, which need setup and updates. Webflow has titles, descriptions, redirects, and a sitemap built in, with settings on every collection template. Both can rank well when the content is good." },
      { question: "Is Webflow more expensive than WordPress?", answer: "WordPress itself is free, but hosting, premium themes, plugins, and maintenance are paid for separately. Webflow’s Premium plan, the one with the CMS, is listed at $25 per month billed yearly, with hosting included and no plugins to buy." },
      { question: "Which needs less maintenance?", answer: "Webflow. Hosting, security, and updates are handled for you. A WordPress site needs its core, theme, and plugins kept up to date, plus backups and security, by you or a developer." },
      { question: "Why did you move your own site from WordPress to Webflow?", answer: "I ran my site on WordPress for over ten years. It worked, but the upkeep grew, and I wanted control over the design without working around themes, page builders, and plugin conflicts. The site then ran on Webflow for over six years.", link: { label: "my WordPress vs Webflow vs Framer comparison", href: "/blog/wordpress-vs-webflow-vs-framer" } },
      { question: "When should I stay on WordPress?", answer: "When the site is a large publication, when it depends on plugins with no equivalent elsewhere, or when a technical team already maintains it well. If none of those apply, a move is worth considering." },
      { ...moveFaq("WordPress to Webflow"), answer: "Yes. I moved my own site this way. Your site is redesigned in Figma and rebuilt in Webflow, the posts and pages are moved into the CMS, and old URLs are redirected at launch, so existing links and search results land on the new pages." },
      costFaq,
    ],
  },
  {
    slug: "webflow-vs-wix",
    platforms: ["webflow", "wix", "framer"],
    description: "Webflow vs Wix, compared by a web designer who builds in Webflow: design control, templates, CMS, SEO, ease of use, and what each costs in the first year.",
    shortAnswer: "Choose Webflow for a custom-designed site built around content that will keep growing. Choose Wix for a simple small-business site you build yourself from a template.",
    faqs: [
      { question: "Is Webflow better than Wix?", answer: "For a site designed around your brand that will grow, yes: Webflow gives a designer full control over layout and a CMS built for many pages. For a simple site an owner builds alone from a template, with a store or bookings built in, Wix is quicker and does the job." },
      { question: "Is Wix cheaper than Webflow?", answer: "The plans are priced close together. Wix lists Light at $17 and Core at $29 per month, billed yearly, and Webflow lists Premium, the plan with the CMS, at $25. The bigger difference is the design: a Wix site is usually built by its owner from a template, while a Webflow site is usually designed and built for the brand." },
      { question: "Which is easier to use?", answer: "Wix. Most owners build their own site in its drag-and-drop editor. Webflow takes longer to learn, because its builder follows how HTML and CSS work. Once a Webflow site is built, editing text and publishing content in the CMS is simple for a team." },
      { question: "Which is better for SEO?", answer: "Both cover the basics: page titles, descriptions, and redirects. For a site with a large blog or many service pages, Webflow is usually the better fit, because its CMS has settings on every collection template." },
      { question: "Can I sell products or take bookings?", answer: "Wix lists online payments, ecommerce, and scheduling on its Core plan and above. The Webflow sites I build are marketing and content sites, so if selling products or taking bookings is the site’s main job, Wix or a dedicated store platform is the better fit." },
      { question: "When should I move from Wix to Webflow?", answer: "When the site outgrows its template: the content is hard to organize, the design is hard to keep consistent across many pages, or the site looks like others in your field." },
      { ...moveFaq("Wix to Webflow"), answer: "Yes. The site is redesigned in Figma and rebuilt in Webflow, the pages and posts are moved into the CMS, and old URLs are redirected at launch, so existing links and search results land on the new pages." },
      costFaq,
    ],
  },
  {
    slug: "webflow-vs-nextjs",
    platforms: ["webflow", "nextjs", "framer"],
    description: "Webflow vs Next.js, compared by a designer who builds in both: CMS, custom features, SEO, editing, upkeep, and what each costs in the first year.",
    shortAnswer: "Choose Webflow for a content-driven site your team publishes to without a developer. Choose Next.js when the site has to work like a product, with logins, payments, or data from your app.",
    faqs: [
      { question: "Is Webflow better than Next.js?", answer: "They solve different problems. Webflow is a visual builder with a CMS, so a content site goes live quickly and your team can publish to it. Next.js is a code framework, so it can do anything, and every change goes through a developer unless a CMS is connected." },
      { question: "Is Next.js faster than Webflow?", answer: "A well-built Next.js site gives a developer full control over speed. Webflow handles hosting and performance for you, which is enough for most business sites. The gap shows up on very large or unusual sites, not on a typical company website." },
      { question: "Can my team edit a Next.js site?", answer: "Only if a CMS is connected for them. Without one, text and page changes go through code. In Webflow, the CMS and editor are built in, so writers can publish without touching the design." },
      { question: "Does Next.js have a CMS?", answer: "No, not built in. You connect a headless CMS or keep the content in files, and that connection is part of the build. Webflow’s CMS comes with the platform, including reference fields and filtered lists." },
      { question: "When is a custom Next.js build worth it?", answer: "When the site needs something a builder cannot do: logins, payments, data from your product, or unusual features. For a marketing or content site, Webflow is usually faster to launch and easier for your team to run." },
      { question: "Can I start in Webflow and move to Next.js later?", answer: "Yes. Launch the site in Webflow, then rebuild in Next.js once it needs features a builder cannot offer. The design carries over; the pages are rebuilt in code, the content is moved across, and old URLs are redirected." },
      { question: "Which is better for SEO?", answer: "Both can rank. Webflow has page titles, descriptions, redirects, and a sitemap built in, with settings on every collection template. Next.js gives full control over markup and metadata, and all of it is set up by hand." },
      costFaq,
    ],
  },
  {
    slug: "astro-vs-framer",
    platforms: ["astro", "framer", "nextjs"],
    description: "Astro vs Framer, compared by a web designer: code or visual builder, speed, CMS, SEO, editing, and what each costs to run in the first year.",
    shortAnswer: "Choose Astro for a fast content site that a developer writes and maintains in code. Choose Framer for a marketing site with motion that your team edits itself.",
    faqs: [
      { question: "Is Astro better than Framer?", answer: "They solve different problems. Astro is a code framework for content sites, so a developer writes and maintains it. Framer is a visual builder, so a designer builds the site and a small team edits it without code." },
      { question: "Is Astro faster than Framer?", answer: "Astro is built for speed: it sends plain HTML and no JavaScript by default. Framer handles hosting and performance for you, which is enough for most marketing sites. The difference matters most on large content sites." },
      { question: "Is Astro free?", answer: "The framework is free and open source. You pay for hosting and for the developer time to build and maintain the site. Framer’s Pro plan is listed at $30 per month with hosting included." },
      { question: "Can my team edit an Astro site?", answer: "Only if a CMS is connected for them. Without one, changes go through code or Markdown files. In Framer, a small team can change pages and publish posts without a developer." },
      { question: "Which is better for SEO?", answer: "Both can rank. Astro’s light pages help with loading speed, and its metadata is set up by hand. Framer has page titles, descriptions, redirects, and a sitemap built in." },
      { question: "When does Astro make more sense than Framer?", answer: "When a developer owns the site, the content lives in Markdown or a headless CMS, and the pages need little animation. Documentation and large blogs are typical examples." },
      costFaq,
      { question: "Do you build Astro sites?", answer: "No. I design and build in Framer, Webflow, and Next.js. For a site that has to be written in code, I use Next.js." },
    ],
  },
  {
    slug: "astro-vs-webflow",
    platforms: ["astro", "webflow", "nextjs"],
    description: "Astro vs Webflow, compared by a web designer who builds in Webflow: code or visual builder, CMS, speed, SEO, editing, and what each costs in the first year.",
    shortAnswer: "Choose Astro for a fast content site that a developer writes and maintains in code. Choose Webflow for a content site your team publishes to visually, with the CMS and hosting built in.",
    faqs: [
      { question: "Is Astro better than Webflow?", answer: "They suit different teams. Both are made for content sites. Astro is a code framework, so a developer writes and maintains it. Webflow is a visual builder with a CMS, so a designer builds the site and writers publish to it without code." },
      { question: "Is Astro faster than Webflow?", answer: "Astro is built for speed: it sends plain HTML and no JavaScript by default. Webflow handles hosting and performance for you, which is enough for most business sites. The difference matters most on very large content sites." },
      { question: "Is Astro cheaper than Webflow?", answer: "The framework is free and open source, so you pay for hosting and for the developer time to build and maintain the site. Webflow’s Premium plan, the one with the CMS, is listed at $25 per month, billed yearly, with hosting included." },
      { question: "Does Astro have a CMS?", answer: "Not a visual one. Astro has content collections for Markdown files, and a headless CMS can be connected for editors. Webflow’s CMS comes with the platform, including reference fields and filtered lists." },
      { question: "Can my team edit an Astro site?", answer: "Only if a CMS is connected for them. Without one, changes go through code or Markdown files. In Webflow, writers publish in the CMS and editor without touching the design." },
      { question: "Which is better for SEO?", answer: "Both can rank. Astro’s light pages help with loading speed, and its metadata is set up by hand. Webflow has page titles, descriptions, redirects, and a sitemap built in, with settings on every collection template." },
      costFaq,
      { question: "Do you build Astro sites?", answer: "No. I design and build in Framer, Webflow, and Next.js. For a content site your team will run, I usually recommend Webflow. For a site that has to be written in code, I use Next.js." },
    ],
  },
  {
    slug: "astro-vs-wordpress",
    platforms: ["astro", "wordpress", "webflow"],
    description: "Astro vs WordPress, compared by a designer who ran his own site on WordPress for ten years: speed, CMS, plugins, SEO, upkeep, and what each costs to run.",
    shortAnswer: "Choose Astro for a fast content site that a developer writes and maintains in code. Choose WordPress for a large publication with many writers that relies on plugins.",
    faqs: [
      { question: "Is Astro better than WordPress?", answer: "For a developer who wants a fast, simple content site with nothing to patch, often yes. For a team of writers who need a familiar editor, user roles, and plugins, WordPress is still the stronger choice." },
      { question: "Is Astro faster than WordPress?", answer: "Usually. Astro sends plain HTML and no JavaScript by default. A WordPress site’s speed depends on its theme, plugins, and hosting, so it can be fast, and it takes ongoing work to keep it that way." },
      { question: "Can writers use Astro like WordPress?", answer: "Not out of the box. Astro has no admin screen: content lives in Markdown files or in a headless CMS that a developer connects. WordPress gives writers an editor, categories, and roles from day one." },
      { question: "Which needs less maintenance?", answer: "Astro has no plugins or database to keep patched, so there is less to break. Its code and dependencies still need a developer. WordPress needs its core, theme, and plugins kept up to date, plus backups and security." },
      { question: "Are both free?", answer: "Both are free, open-source software. With either one you pay for hosting, and for the people who build and maintain the site. WordPress sites often add paid themes and plugins on top." },
      { question: "Which is better for SEO?", answer: "Both can rank. Astro’s light pages help with loading speed, and its metadata is set up by hand. WordPress gets its SEO features from plugins, which need setup and updates." },
      { question: "Is there an option that needs no developer?", answer: "Yes. Webflow gives a team a visual builder and a built-in CMS, with hosting and security handled. I moved my own site from WordPress to Webflow for that reason.", link: { label: "my WordPress vs Webflow vs Framer comparison", href: "/blog/wordpress-vs-webflow-vs-framer" } },
      costFaq,
    ],
  },
  {
    slug: "framer-vs-hubspot",
    platforms: ["framer", "hubspot", "webflow"],
    description: "Framer vs HubSpot, compared by a web designer: design freedom, CMS, CRM, SEO, editing, and what each costs to run in the first year.",
    shortAnswer: "Choose Framer for a custom-designed marketing site with motion that a small team edits itself. Choose HubSpot when your team already runs its CRM and campaigns there and wants the website in the same tool.",
    faqs: [
      { question: "Is Framer better than HubSpot?", answer: "For the design of the website, yes: Framer gives a designer far more control over layout and motion. HubSpot’s strength is that the website sits next to the CRM, email, and forms a marketing team already uses." },
      { question: "Is Framer cheaper than HubSpot?", answer: "For most sites, yes. Framer’s Pro plan is listed at $30 per month. HubSpot’s Content Hub has a free plan, Starter is listed at $20 per seat per month before discounts, and Professional starts at $450 per month with three seats." },
      { question: "Can I use Framer with the HubSpot CRM?", answer: "Yes. Many teams keep HubSpot for the CRM and email, and run the website somewhere else. Leads from the site’s forms are sent to HubSpot, so sales and marketing keep working where they already do." },
      { question: "Which is better for SEO?", answer: "Both cover the basics. Framer has page titles, descriptions, redirects, and a sitemap built in. HubSpot includes SEO tools alongside its blog. Useful content and fast pages matter more than which of the two you pick." },
      { question: "Which is easier for my team to edit?", answer: "Framer is easier for a small team that wants to change pages directly on a canvas. HubSpot is easier for marketers who already spend their day in HubSpot and want pages, posts, and campaigns in one place." },
      { question: "When should I stay on HubSpot?", answer: "When the website depends on HubSpot features throughout: personalized content from CRM data, many landing pages tied to campaigns, or a team trained on it. If only the forms depend on HubSpot, a move is simple." },
      moveFaq("HubSpot to Framer"),
      costFaq,
    ],
  },
  {
    slug: "framer-vs-shopify",
    platforms: ["framer", "shopify", "webflow"],
    description: "Framer vs Shopify, compared by a web designer: marketing site or online store, design freedom, CMS, SEO, and what each costs to run in the first year.",
    shortAnswer: "Choose Framer for a marketing site that presents the brand and brings in leads. Choose Shopify when the site is mainly a store with a catalog, checkout, and shipping.",
    faqs: [
      { question: "Is Framer better than Shopify?", answer: "They do different jobs. Framer is built for marketing sites and landing pages, with far more control over layout and motion. Shopify is built for selling: products, inventory, checkout, and shipping." },
      { question: "Can I sell products on Framer?", answer: "Framer is built for marketing sites, not stores. If you sell a few items, a payment link or an embedded buy button can be enough. If selling products is the site’s main job, Shopify is the better fit." },
      { question: "Can I use Framer and Shopify together?", answer: "Yes, and it is a common setup. The brand and marketing pages run on Framer, the store runs on Shopify, usually on a subdomain such as shop.yourbrand.com, and the two link to each other." },
      { question: "Is Shopify more expensive than Framer?", answer: "The entry plans are close. Shopify lists Basic at $29 per month, billed yearly, and Framer lists Pro at $30. Shopify also charges card fees on every sale, listed from 2.9% plus 30 cents on Basic." },
      { question: "Which is better for SEO?", answer: "Both cover the basics. Shopify’s SEO is set up around product and collection pages. Framer suits landing pages, service pages, and a blog. Pick by what the site mostly contains." },
      { question: "Which is easier to design for my brand?", answer: "Framer. A designer works on a freeform canvas, so the site does not have to follow a theme. A Shopify store starts from a theme, and a fully custom storefront usually needs a developer." },
      costFaq,
      { question: "Do you build Shopify stores?", answer: "No. I design and build marketing sites in Framer, Webflow, and Next.js. If you need a store, I can design the brand and the marketing site that sits alongside it." },
    ],
  },
  {
    slug: "framer-vs-squarespace",
    platforms: ["framer", "squarespace", "webflow"],
    description: "Framer vs Squarespace, compared by a web designer: design freedom, templates, CMS, SEO, editing, and what each costs to run in the first year.",
    shortAnswer: "Choose Framer for a custom-designed marketing site with motion that matches your brand. Choose Squarespace for a clean, simple site you build yourself from a template.",
    faqs: [
      { question: "Is Framer better than Squarespace?", answer: "For a site designed around your brand, yes: Framer gives a designer far more control over layout and motion. For a simple site an owner builds alone from a polished template, Squarespace is quicker and does the job." },
      { question: "Is Squarespace cheaper than Framer?", answer: "The plans are priced close together. Squarespace lists Basic at $19 and Core at $29 per month, billed yearly, and Framer lists Basic at $10 and Pro at $30. The bigger difference is the design: template or made for the brand." },
      { question: "Which is better for SEO?", answer: "Both cover the basics. Squarespace lists built-in SEO on every plan, and Framer has page titles, descriptions, redirects, and a sitemap built in. Clear structure and useful content matter more than which of the two you pick." },
      { question: "Can I sell products or take bookings?", answer: "Squarespace lists selling on every plan, with no store transaction fee from Core up. Framer is built for marketing sites, so if selling is the site’s main job, Squarespace or a dedicated store platform is the better fit." },
      { question: "When should I move from Squarespace to Framer?", answer: "When the template starts to hold the brand back: the site looks like others in your field, the layout cannot do what you want, or you want motion and a design made for your business." },
      moveFaq("Squarespace to Framer"),
      costFaq,
      { question: "Do you build Squarespace sites?", answer: "No. I design and build in Framer, Webflow, and Next.js. If you are on Squarespace today, I can redesign the site and move it to Framer or Webflow." },
    ],
  },
  {
    slug: "webflow-vs-hubspot",
    platforms: ["webflow", "hubspot", "framer"],
    description: "Webflow vs HubSpot, compared by a web designer who builds in Webflow: design control, CMS, CRM, SEO, editing, and what each costs in the first year.",
    shortAnswer: "Choose Webflow for a custom-designed site with a CMS built for growing content. Choose HubSpot when your team already runs its CRM and campaigns there and wants the website in the same tool.",
    faqs: [
      { question: "Is Webflow better than HubSpot?", answer: "For the website itself, I think so: the design is fully custom and the CMS is built for structured content. HubSpot’s strength is that the website sits next to the CRM, email, and forms a marketing team already uses." },
      { question: "Is Webflow cheaper than HubSpot?", answer: "For most sites, yes. Webflow’s Premium plan, the one with the CMS, is listed at $25 per month, billed yearly. HubSpot’s Content Hub has a free plan, Starter is listed at $20 per seat per month before discounts, and Professional starts at $450 per month with three seats." },
      { question: "Can I use Webflow with the HubSpot CRM?", answer: "Yes. Many teams keep HubSpot for the CRM and email, and run the website in Webflow. Leads from the site’s forms are sent to HubSpot, so sales and marketing keep working where they already do." },
      { question: "Which has the better CMS?", answer: "For a website, Webflow: reference fields, filtered lists, and templates for every collection. HubSpot’s content tools are strongest when pages and posts need to connect to contacts and campaigns." },
      { question: "Which is better for SEO?", answer: "Both cover the basics. Webflow has titles, descriptions, redirects, and a sitemap built in, with settings on every collection template. HubSpot includes SEO tools alongside its blog." },
      { question: "When should I stay on HubSpot?", answer: "When the website depends on HubSpot features throughout: personalized content from CRM data, many landing pages tied to campaigns, or a team trained on it. If only the forms depend on HubSpot, a move is simple." },
      moveFaq("HubSpot to Webflow"),
      costFaq,
    ],
  },
  {
    slug: "webflow-vs-shopify",
    platforms: ["webflow", "shopify", "framer"],
    description: "Webflow vs Shopify, compared by a web designer who builds in Webflow: content site or online store, design control, CMS, SEO, and what each costs.",
    shortAnswer: "Choose Webflow for a custom-designed site built around content and lead generation. Choose Shopify when the site is mainly a store with a catalog, checkout, and shipping.",
    faqs: [
      { question: "Is Webflow better than Shopify?", answer: "They do different jobs. Webflow is built for custom-designed marketing and content sites. Shopify is built for selling: products, inventory, checkout, and shipping. The right choice depends on whether the site mostly informs or mostly sells." },
      { question: "Can I use Webflow and Shopify together?", answer: "Yes, and it is a common setup. The brand, content, and marketing pages run on Webflow, the store runs on Shopify, usually on a subdomain such as shop.yourbrand.com, and the two link to each other." },
      { question: "Is Shopify more expensive than Webflow?", answer: "The plans are close. Shopify lists Basic at $29 per month, billed yearly, and Webflow lists Premium at $25. Shopify also charges card fees on every sale, listed from 2.9% plus 30 cents on Basic." },
      { question: "Which has the better CMS?", answer: "For articles, case studies, and service pages, Webflow: its CMS is built for structured content. Shopify is organized around products and collections, with pages and a blog included." },
      { question: "Which is better for SEO?", answer: "Both cover the basics. Shopify’s SEO is set up around product and collection pages. Webflow gives more control over large content sections, with settings on every collection template." },
      { question: "Which is easier to design for my brand?", answer: "Webflow. The design is built from scratch, so the site does not have to follow a theme. A Shopify store starts from a theme, and a fully custom storefront usually needs a developer." },
      costFaq,
      { question: "Do you build Shopify stores?", answer: "No. I design and build marketing sites in Framer, Webflow, and Next.js. If you need a store, I can design the brand and the marketing site that sits alongside it." },
    ],
  },
  {
    slug: "webflow-vs-squarespace",
    platforms: ["webflow", "squarespace", "framer"],
    description: "Webflow vs Squarespace, compared by a web designer who builds in Webflow: design control, templates, CMS, SEO, ease of use, and what each costs.",
    shortAnswer: "Choose Webflow for a custom-designed site built around content that will keep growing. Choose Squarespace for a clean, simple site you build yourself from a template.",
    faqs: [
      { question: "Is Webflow better than Squarespace?", answer: "For a site designed around your brand that will grow, yes: Webflow gives a designer full control over layout and a CMS built for many pages. For a simple site an owner builds alone from a polished template, Squarespace is quicker and does the job." },
      { question: "Is Squarespace cheaper than Webflow?", answer: "The plans are priced close together. Squarespace lists Basic at $19 and Core at $29 per month, billed yearly, and Webflow lists Premium, the plan with the CMS, at $25. The bigger difference is the design: template or made for the brand." },
      { question: "Which is easier to use?", answer: "Squarespace. Most owners build their own site from a template. Webflow takes longer to learn, because its builder follows how HTML and CSS work. Once a Webflow site is built, editing text and publishing in the CMS is simple for a team." },
      { question: "Which is better for SEO?", answer: "Both cover the basics. Squarespace lists built-in SEO on every plan. For a site with a large blog or many service pages, Webflow is usually the better fit, because its CMS has settings on every collection template." },
      { question: "Can I sell products or take bookings?", answer: "Squarespace lists selling on every plan, with no store transaction fee from Core up. The Webflow sites I build are marketing and content sites, so if selling is the site’s main job, Squarespace or a dedicated store platform is the better fit." },
      { question: "When should I move from Squarespace to Webflow?", answer: "When the site outgrows its template: the content is hard to organize, the layout cannot do what you want, or the site looks like others in your field." },
      { ...moveFaq("Squarespace to Webflow"), answer: "Yes. The site is redesigned in Figma and rebuilt in Webflow, the pages and posts are moved into the CMS, and old URLs are redirected at launch, so existing links and search results land on the new pages." },
      costFaq,
    ],
  },
];

export const compareIndex = {
  title: "Website Platform Comparisons | Ebaq Design",
  description: "Side-by-side comparisons of Framer, Webflow, WordPress, and Next.js by a designer who builds websites: design, CMS, SEO, cost, and who runs the site after launch.",
};

export const comparisonName = ({ platforms: [first, second] }: Comparison) => `${platformFacts[first].name} vs ${platformFacts[second].name}`;
export const comparisonTitle = (comparison: Comparison) => `${comparisonName(comparison)} in 2026: Which to Choose | Ebaq Design`;
