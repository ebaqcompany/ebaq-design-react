import type { BlogImage } from "./blog";

export type PodcastEpisodeSummary = {
  slug: string;
  url: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  episodeNumber: number;
  guest: string;
  date: string;
  image: BlogImage;
};

export type PodcastEpisode = PodcastEpisodeSummary & {
  heroImage: BlogImage;
  body: string;
  sidebar: string;
  platforms: { apple: string; youtube: string; spotify: string; audio: string };
  seo: { title: string; description: string; image: string };
};

export const PODCAST_INDEX_URL = "/content/podcast/index.json";
export const getPodcastEpisodeUrl = (slug: string) => `/content/podcast/${encodeURIComponent(slug)}.json`;
