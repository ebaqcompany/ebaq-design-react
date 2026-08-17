import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getBlogPostUrl, type BlogPost } from "../content/blog";
import { normalizeVideoEmbeds } from "../content/richText";
import { BlogPostHeader4 } from "./BlogPostHeader4";
import { Content32 } from "./Content32";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { NotificationBar } from "./NotificationBar";
import { NotFoundPage } from "./NotFoundPage";

export const BlogPostPage = () => {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setPost(null);
    setMissing(false);
    fetch(getBlogPostUrl(slug)).then((response) => {
      if (!response.ok) throw new Error("Post not found");
      return response.json() as Promise<BlogPost>;
    }).then(setPost).catch(() => setMissing(true));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    const previousCanonical = canonical?.href;
    const previousDescription = description?.content;
    const previousOgTitle = ogTitle?.content;
    const previousOgDescription = ogDescription?.content;
    const previousOgImage = ogImage?.content;
    const postImage = post.seo.image || post.image.src;
    const absolutePostImage = postImage.startsWith("/") ? `https://ebaqdesign.com${postImage}` : postImage;
    if (canonical) canonical.href = `https://ebaqdesign.com${post.url}`;
    if (description) description.content = post.seo.description || post.description;
    if (ogTitle) ogTitle.content = post.seo.title || post.title;
    if (ogDescription) ogDescription.content = post.seo.description || post.description;
    if (ogImage) ogImage.content = absolutePostImage;
    return () => {
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      if (description && previousDescription) description.content = previousDescription;
      if (ogTitle && previousOgTitle) ogTitle.content = previousOgTitle;
      if (ogDescription && previousOgDescription) ogDescription.content = previousOgDescription;
      if (ogImage && previousOgImage) ogImage.content = previousOgImage;
    };
  }, [post]);

  if (missing) return <NotFoundPage />;
  if (!post) return <div className="min-h-screen bg-white"><Navbar16 /><main className="container px-[5%] py-28"><p>Loading article…</p></main></div>;

  const canonicalUrl = `https://ebaqdesign.com${post.url}`;
  const postImage = post.seo.image || post.image.src;
  const absolutePostImage = postImage.startsWith("/") ? `https://ebaqdesign.com${postImage}` : postImage;
  const articleBody = normalizeVideoEmbeds(post.body || `<p>${post.description}</p>`).replace(/\s+src=(['"])\1/gi, "").replace(/\s+srcset=(['"])\1/gi, "");
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>{post.seo.title || post.title}</title>
        <meta name="description" content={post.seo.description || post.description} />
        <meta property="og:title" content={post.seo.title || post.title} />
        <meta property="og:description" content={post.seo.description || post.description} />
        <meta property="og:image" content={absolutePostImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo.title || post.title} />
        <meta name="twitter:description" content={post.seo.description || post.description} />
        <meta name="twitter:image" content={absolutePostImage} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Navbar16 />
      <NotificationBar />
      <main>
        <BlogPostHeader4 category={post.category} heading={post.title} image={post.image} postDetails={[{ title: "Published on", description: post.date }]} />
        <Content32 articleTitle={post.title} articleUrl={canonicalUrl}><div dangerouslySetInnerHTML={{ __html: articleBody }} /></Content32>
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
