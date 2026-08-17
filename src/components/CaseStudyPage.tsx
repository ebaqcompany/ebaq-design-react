import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { PortfolioHeader10 } from "./PortfolioHeader10";
import { Testimonial1 } from "./Testimonial1";
import { Gallery1 } from "./Gallery1";
import { Header49 } from "./Header49";
import { Portfolio15 } from "./Portfolio15";
import { caseStudies, getCaseStudy } from "../data/caseStudies";
import { NotFoundPage } from "./NotFoundPage";

export const CaseStudyPage = () => {
  const { slug = "" } = useParams();
  const study = getCaseStudy(slug);
  const seoTitle = study ? `${study.client} — ${study.title}` : "";

  useEffect(() => {
    if (!study) return;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    const previousTitle = document.title;
    document.title = seoTitle;
    const meta = [
      { selector: 'meta[name="description"]', attribute: "name", value: "description", content: study.summary },
      { selector: 'meta[property="og:title"]', attribute: "property", value: "og:title", content: seoTitle },
      { selector: 'meta[property="og:description"]', attribute: "property", value: "og:description", content: study.summary },
      { selector: 'meta[property="og:type"]', attribute: "property", value: "og:type", content: "website" },
      { selector: 'meta[name="twitter:card"]', attribute: "name", value: "twitter:card", content: "summary_large_image" },
      { selector: 'meta[name="twitter:title"]', attribute: "name", value: "twitter:title", content: seoTitle },
      { selector: 'meta[name="twitter:description"]', attribute: "name", value: "twitter:description", content: study.summary },
    ];
    const previous = meta.map((item) => {
      const existing = document.head.querySelector<HTMLMetaElement>(item.selector);
      const element = existing ?? document.createElement("meta");
      const originalContent = existing?.content;
      if (!existing) {
        element.setAttribute(item.attribute, item.value);
        document.head.appendChild(element);
      }
      element.content = item.content;
      return { element, originalContent, created: !existing };
    });
    if (canonical) canonical.href = `https://ebaqdesign.com/work/${study.slug}`;

    return () => {
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      previous.forEach(({ element, originalContent, created }) => {
        if (created) element.remove();
        else element.content = originalContent ?? "";
      });
    };
  }, [seoTitle, study]);

  if (!study) return <NotFoundPage />;

  const canonicalUrl = `https://ebaqdesign.com/work/${study.slug}`;
  const socialImage = study.preview.src.startsWith("/") ? `https://ebaqdesign.com${study.preview.src}` : study.preview.src;

  const addPreviewImages = (project: NonNullable<typeof study.nextProject>) => {
    const targetStudy = caseStudies.find((caseStudy) => `/work/${caseStudy.slug}` === project.url);
    const galleryImages = targetStudy
      ? [
          ...targetStudy.leadGallery,
          ...targetStudy.content.flatMap((block) => (block.type === "gallery" ? block.images : [])),
        ].filter((image) => image.kind !== "video")
      : [];

    return {
      ...project,
      images: galleryImages.map(({ src, alt }) => ({ src, alt })),
      lottie:
        targetStudy?.hero.kind === "lottie"
          ? { src: targetStudy.hero.src, alt: targetStudy.hero.alt }
          : undefined,
    };
  };

  const nextProjects = study.nextProject
    ? [
        study.nextProject,
        ...caseStudies
          .map((caseStudy) => caseStudy.nextProject)
          .filter(
            (project): project is NonNullable<typeof project> =>
              project != null && project.url !== study.nextProject?.url && project.url !== `/work/${study.slug}`,
          ),
      ].map(addPreviewImages)
    : [];

  return (
    <div className="relative bg-white">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={study.summary} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={study.summary} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={study.summary} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>
      <main>
        <PortfolioHeader10
          navigation={<Navbar16 />}
          heading={study.client}
          subheading={study.title}
          description={study.summary}
          tags={study.services.map((service) => ({ label: service }))}
          links={[study.website, study.guidelines].filter((link): link is NonNullable<typeof link> => Boolean(link))}
          image={{
            src: study.hero.src,
            alt: study.hero.alt,
            kind: study.hero.kind === "lottie" ? "lottie" : "image",
            backgroundColor: study.hero.backgroundColor,
          }}
        />

        <Gallery1 heading="" description="" images={study.leadGallery} />

        {study.content.map((block, index) =>
          block.type === "header" ? (
            <Header49 key={`header-${index}`} heading={block.heading} description={block.description} />
          ) : (
            <Gallery1 key={`gallery-${index}`} heading="" description="" images={block.images} />
          ),
        )}

        {study.testimonial && <Testimonial1 {...study.testimonial} />}
        {nextProjects.length > 0 && <Portfolio15 projects={nextProjects} />}
      </main>
      <Cta17 />
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
