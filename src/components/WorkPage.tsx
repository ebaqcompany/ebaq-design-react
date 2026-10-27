import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { workProjects } from "../data/workProjects";
import { caseStudies } from "../data/caseStudies";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { Portfolio16 } from "./Portfolio16";
import { buildBreadcrumbSchema, buildCollectionSchema, serializeJsonLd } from "../content/structuredData";

const siteUrl = "https://www.ebaqdesign.com";

const pageTitle = "Portfolio: Branding, Logo & Web Design Case Studies | Ebaq Design";
const pageDescription =
  "Branding, logo design, and website case studies by Arek Dvornechuck, a senior freelance graphic designer in NYC, for AI, health tech, law, and consumer brands.";

export const WorkPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;
    const metadata = [
      { selector: 'meta[name="description"]', attribute: "name", value: "description", content: pageDescription },
      { selector: 'meta[property="og:title"]', attribute: "property", value: "og:title", content: pageTitle },
      { selector: 'meta[property="og:description"]', attribute: "property", value: "og:description", content: pageDescription },
      { selector: 'meta[property="og:type"]', attribute: "property", value: "og:type", content: "website" },
      { selector: 'meta[name="twitter:card"]', attribute: "name", value: "twitter:card", content: "summary_large_image" },
      { selector: 'meta[name="twitter:title"]', attribute: "name", value: "twitter:title", content: pageTitle },
      { selector: 'meta[name="twitter:description"]', attribute: "name", value: "twitter:description", content: pageDescription },
    ];
    const previous = metadata.map((item) => {
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

    return () => {
      document.title = previousTitle;
      previous.forEach(({ element, originalContent, created }) => {
        if (created) element.remove();
        else element.content = originalContent ?? "";
      });
    };
  }, []);

  return (
    <div className="relative bg-white">
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.ebaqdesign.com/work" />
      <link rel="canonical" href="https://www.ebaqdesign.com/work" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <script type="application/ld+json">{serializeJsonLd(buildCollectionSchema({ path: "/work", name: "Ebaq Design portfolio", description: pageDescription }, caseStudies.map((study) => ({ name: `${study.client}: ${study.title}`, path: `/work/${study.slug}` })), siteUrl))}</script>
      <script type="application/ld+json">{serializeJsonLd(buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }], siteUrl))}</script>
    </Helmet>
    <Navbar16 />
    <main>
      <Portfolio16
        tagline="Work"
        heading="Selected work"
        description="Brand identities and digital experiences built to make ambitious businesses clearer, more distinctive, and easier to trust."
        projects={workProjects}
      />
    </main>
    <Cta17 />
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
