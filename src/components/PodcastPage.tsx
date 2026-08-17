import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PODCAST_INDEX_URL, type PodcastEpisodeSummary } from "../content/podcast";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { PodcastArchive } from "./PodcastArchive";

export const PodcastPage = () => {
  const [episodes, setEpisodes] = useState<PodcastEpisodeSummary[]>([]);
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousCanonical = canonical?.href;
    const previousDescription = description?.content;
    if (canonical) canonical.href = 'https://ebaqdesign.com/podcast';
    if (description) description.content = 'Interviews with branding experts, creative leaders, and entrepreneurs about building memorable brands.';
    fetch(PODCAST_INDEX_URL).then((response) => { if (!response.ok) throw new Error("Unable to load podcast index"); return response.json() as Promise<PodcastEpisodeSummary[]>; }).then(setEpisodes).catch(console.error);
    return () => {
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);
  return <div className="relative bg-white"><Helmet><title>On Branding Podcast | Ebaq Design</title><meta name="description" content="Interviews with branding experts, creative leaders, and entrepreneurs about building memorable brands." /></Helmet><Navbar16 /><main><PodcastArchive episodes={episodes} /></main><Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} /></div>;
};
