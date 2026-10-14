// Route data the prerender already has (a blog post, the blog index), so a page renders
// its content on first paint instead of after a fetch. The build sets it per route on the
// server; in the browser, main.tsx reads it once from the JSON embedded in the page.
export const PRELOAD_ELEMENT_ID = "route-data";

let preloaded: Record<string, unknown> = {};

export const setPreloadedData = (data: Record<string, unknown>) => {
  preloaded = data;
};

export const readPreloaded = <T,>(key: string): T | undefined => preloaded[key] as T | undefined;

export const preloadKeys = {
  blogIndex: "blog-index",
  blogPost: (slug: string) => `blog:${slug}`,
  podcastIndex: "podcast-index",
  podcastEpisode: (slug: string) => `podcast:${slug}`,
};
