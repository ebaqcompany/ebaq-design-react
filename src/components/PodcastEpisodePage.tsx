import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getPodcastEpisodeUrl, type PodcastEpisode } from "../content/podcast";
import { normalizeVideoEmbeds } from "../content/richText";
import { Content32 } from "./Content32";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { NotificationBar } from "./NotificationBar";
import { PodcastEpisodeHeader } from "./PodcastEpisodeHeader";
import { NotFoundPage } from "./NotFoundPage";

export const PodcastEpisodePage = () => {
  const { slug = "" } = useParams();
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => { setEpisode(null); setMissing(false); fetch(getPodcastEpisodeUrl(slug)).then((response) => { if (!response.ok) throw new Error("Episode not found"); return response.json() as Promise<PodcastEpisode>; }).then(setEpisode).catch(() => setMissing(true)); }, [slug]);
  useEffect(() => {
    if (!episode) return;
    const previousTitle = document.title;
    document.title = episode.seo.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousCanonical = canonical?.href;
    const previousDescription = description?.content;
    if (canonical) canonical.href = `https://ebaqdesign.com${episode.url}`;
    if (description) description.content = episode.seo.description;
    return () => {
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, [episode]);
  if (missing) return <NotFoundPage />;
  if (!episode) return <div className="min-h-screen bg-white"><Navbar16 /><main className="container px-[5%] py-28"><p>Loading episode…</p></main></div>;
  const canonicalUrl = `https://ebaqdesign.com${episode.url}`;
  const body = normalizeVideoEmbeds(`${episode.sidebar}${episode.body}`).replace(/\s+src=(['"])\1/gi, "").replace(/\s+srcset=(['"])\1/gi, "");
  return <div className="relative bg-white"><Helmet><title>{episode.seo.title}</title><meta name="description" content={episode.seo.description} /><meta property="og:title" content={episode.seo.title} /><meta property="og:description" content={episode.seo.description} /><meta property="og:image" content={episode.seo.image} /><meta property="og:type" content="article" /><link rel="canonical" href={canonicalUrl} /><meta property="og:url" content={canonicalUrl} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={episode.seo.title} /><meta name="twitter:description" content={episode.seo.description} /><meta name="twitter:image" content={episode.seo.image} /></Helmet><Navbar16 /><NotificationBar /><main><PodcastEpisodeHeader episode={episode} /><Content32 articleTitle={episode.title} articleUrl={canonicalUrl}><div dangerouslySetInnerHTML={{ __html: body }} /></Content32></main><Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} /></div>;
};
