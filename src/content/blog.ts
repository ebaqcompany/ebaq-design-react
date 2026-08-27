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
  selectedWorkSlugs?: string[];
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
