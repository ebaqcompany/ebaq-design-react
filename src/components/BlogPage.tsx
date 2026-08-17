import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BLOG_INDEX_URL, type BlogPostSummary } from "../content/blog";
import { Blog2 } from "./Blog2";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";

export const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);

  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousCanonical = canonical?.href;
    const previousDescription = description?.content;
    if (canonical) canonical.href = 'https://ebaqdesign.com/blog';
    if (description) description.content = 'Brand strategy, identity, logo design, web design, and creative business insights from Ebaq Design.';
    fetch(BLOG_INDEX_URL).then((response) => {
      if (!response.ok) throw new Error("Unable to load the blog index");
      return response.json() as Promise<BlogPostSummary[]>;
    }).then(setPosts).catch(console.error);
    return () => {
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <div className="relative bg-white">
      <Helmet><title>Blog — Branding, strategy and design insights | Ebaq Design</title><meta name="description" content="Brand strategy, identity, logo design, web design, and creative business insights from Ebaq Design." /></Helmet>
      <Navbar16 />
      <main><Blog2 blogPosts={posts} /></main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
