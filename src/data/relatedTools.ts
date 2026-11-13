// Which free tool to suggest at the end of a blog article. A slug pattern wins over the
// article's category, so a naming article points to the name generator even when it is filed
// under Brand Strategy. Articles with no match show no suggestion.

export type RelatedTool = { heading: string; body: string; label: string; href: string };

const tools = {
  names: { heading: "Need name ideas?", body: "Pick a naming style, describe your business, and get nine brand name ideas with the reasoning behind each.", label: "Brand name generator", href: "/tools/brand-name-generator" },
  taglines: { heading: "Need a tagline?", body: "Pick one of five tagline types and get nine tagline ideas for your business.", label: "Tagline generator", href: "/tools/tagline-generator" },
  archetype: { heading: "Which archetype is your brand?", body: "Answer seven questions to find which of the 12 archetypes fits your brand, with a second one to mix in.", label: "Brand archetype quiz", href: "/tools/brand-archetype-quiz" },
  grader: { heading: "How strong is your brand?", body: "Answer 11 questions and get a score out of 100 for your strategy, logo, identity, and website, with what to fix first.", label: "Brand grader", href: "/tools/brand-grader" },
  brandCost: { heading: "What would your brand cost?", body: "Pick what you need and see a fixed price and timeline, next to typical agency ranges.", label: "Branding cost calculator", href: "/tools/branding-cost-calculator" },
  websiteCost: { heading: "What would your website cost?", body: "Pick the size of your site and the platform to see the price, the timeline, and the first year on Framer, Webflow, or Next.js.", label: "Website cost calculator", href: "/tools/website-cost-calculator" },
  compare: { heading: "Choosing a website platform?", body: "Side-by-side comparisons of Framer, Webflow, WordPress, and more: design, CMS, SEO, cost, and who runs the site after launch.", label: "Platform comparisons", href: "/compare" },
  voice: { heading: "Set your brand voice", body: "A free one-page PDF worksheet to set your tone on four scales: humour, formality, respect, and enthusiasm.", label: "Brand voice template", href: "/tools/brand-templates" },
} satisfies Record<string, RelatedTool>;

const bySlug: [RegExp, RelatedTool][] = [
  [/nam(e|ing)/, tools.names],
  [/slogan|tagline/, tools.taglines],
  [/archetype|personality/, tools.archetype],
  [/voice|tone/, tools.voice],
  [/website.*cost|web-design-cost/, tools.websiteCost],
  [/cost|pricing|price/, tools.brandCost],
  [/webflow|framer|wordpress|wix|squarespace|shopify/, tools.compare],
  [/rebrand|audit|refresh|checklist|what-is-branding/, tools.grader],
];

const byCategory: Record<string, RelatedTool> = {
  Naming: tools.names,
  "Brand Strategy": tools.grader,
  Branding: tools.grader,
  "Logo Design": tools.brandCost,
  "Web Design": tools.websiteCost,
};

export const relatedTool = (slug: string, category?: string): RelatedTool | undefined =>
  bySlug.find(([pattern]) => pattern.test(slug))?.[1] ?? (category ? byCategory[category] : undefined);
