export type BlogImage = {
  src: string;
  alt?: string;
};

export type BlogPostSummary = {
  slug: string;
  url: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  readTime: string;
  date: string;
  image: BlogImage;
};

export type BlogPost = BlogPostSummary & {
  author: string;
  body: string;
  intro?: string;
  faq?: Array<{ question: string; answer: string }>;
  logoRoster?: string[];
  logoPageImages?: Array<Array<{ src: string; alt: string }>>;
  logoTileImages?: Array<{ src: string; alt: string }>;
  logoResearch?: Array<{ number: string; name: string; officialUrl: string; verifiedFact: string; observations: [string, string] }>;
  logoResearchOverrides?: Record<string, { number: string; name: string; officialUrl: string; verifiedFact: string; observations: [string, string] }>;
  logoRosterConfig?: {
    listHeading: string;
    listIntro: string[];
    sectionNames: string[];
    sectionIntroductions: string[];
    sectionBridge: [string, string];
    entryFallbacks: Array<[string, string]>;
    findings: Array<{ heading: string; text: string }>;
    checklistHeading: string;
    checklistItems: string[];
    conclusionHtml: string;
  };
  selectedWorkSlugs?: string[];
  logoRedesignExamples?: Array<{
    slug: string;
    name: string;
    before: string;
    after: string;
    image?: string;
    summary: string;
    changes: string[];
    caseStudyUrl?: string;
  }>;
  youtubeEmbed?: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    image?: string;
  };
};

export const BLOG_INDEX_URL = "/content/blog/index.json";

export const getBlogPostUrl = (slug: string) => `/content/blog/${encodeURIComponent(slug)}.json`;
