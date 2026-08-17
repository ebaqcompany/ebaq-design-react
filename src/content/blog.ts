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
  tags: string[];
  seo: {
    title: string;
    description: string;
    image?: string;
  };
};

export const BLOG_INDEX_URL = "/content/blog/index.json";

export const getBlogPostUrl = (slug: string) => `/content/blog/${encodeURIComponent(slug)}.json`;
