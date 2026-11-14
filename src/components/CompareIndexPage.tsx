import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl } from "../content/siteFacts";
import { buildBreadcrumbSchema, buildCollectionSchema, serializeJsonLd } from "../content/structuredData";
import { compareIndex, comparisonName, comparisons, type PlatformId } from "../data/comparisons";
import { PlatformName, PlatformPair } from "./ComparePlatform";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";
import { Button } from "./ui";
import { LuBuilding2 } from "react-icons/lu";

// The comparison hub: the blog archive's header and filter buttons (Blog2) over a grid of the
// site's white service cards, one per comparison in src/data/comparisons.ts.
const pageUrl = `${siteUrl}/compare`;
const filterable = [...new Set(comparisons.flatMap(({ platforms: [first, second] }) => [first, second]))];

const schemas = [
  buildCollectionSchema(
    { path: "/compare", name: "Website platform comparisons", description: compareIndex.description },
    [{ name: "Freelancer vs agency", path: "/compare/freelancer-vs-agency" }, ...comparisons.map((comparison) => ({ name: comparisonName(comparison), path: `/compare/${comparison.slug}` }))],
    siteUrl,
  ),
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }], siteUrl),
];

export const CompareIndexPage = () => {
  const [active, setActive] = useState<PlatformId | "">("");
  // The freelancer-vs-agency page is not about a platform, so it shows only while no filter is on.
  const count = (active ? 0 : 1) + comparisons.filter(({ platforms: [first, second] }) => !active || first === active || second === active).length;
  const visible = comparisons.filter(({ platforms: [first, second] }) => !active || first === active || second === active);

  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Website Platform Comparisons | Ebaq Design</title>
        {/* A literal: scripts/generate-route-shells.mjs reads this page's title and description from the source. */}
        <meta name="description" content="Side-by-side comparisons of Framer, Webflow, WordPress, and Next.js by a designer who builds websites: design, CMS, SEO, cost, and who runs the site after launch." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Website Platform Comparisons | Ebaq Design" />
        <meta property="og:description" content={compareIndex.description} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="mx-auto w-full max-w-lg text-center">
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Platform comparisons</p>
              <h1 className="mb-5 md:mb-6">Which platform should you build on?</h1>
              <p className="mx-auto max-w-md md:text-md">Side-by-side comparisons of website platforms, from a designer who builds in Framer, Webflow, and Next.js: design, CMS, SEO, and cost.</p>
            </div>
            <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-2 md:mt-10">
              {filterable.map((platform) => (
                <Button key={platform} variant="link" aria-pressed={active === platform} onClick={() => setActive((current) => current === platform ? "" : platform)} className={`archive-filter-button shrink-0 px-4 py-2 ${active === platform ? "archive-filter-button--active border-border-primary" : "border-black/20"}`}>
                  <PlatformName platform={platform} />
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <p className="mb-6 font-mono text-sm uppercase tracking-wide md:mb-8" aria-live="polite">{count} {count === 1 ? "comparison" : "comparisons"}</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {!active && (
                <article data-surface="white" className="service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-brand-primary/30 after:content-['']">
                  <div className="mb-6 flex items-center gap-4 md:mb-8" aria-hidden="true">
                    <img src="/ebaq-mark-one-color.svg" alt="" className="size-8" />
                    <span className="font-mono text-sm uppercase tracking-wide">vs</span>
                    <LuBuilding2 className="size-8" />
                  </div>
                  <h2 className="heading-h5 mb-5 font-bold">Freelancer vs agency</h2>
                  <p className="mb-6 md:mb-8">A senior freelancer costs $3,000 a week and does the work. An agency costs $25k–$100k+ and adds account managers and margin on top of the same design.</p>
                  <div className="mt-auto"><TextLink href="/compare/freelancer-vs-agency">Freelancer vs agency</TextLink></div>
                </article>
              )}
              {visible.map((comparison) => (
                <article key={comparison.slug} data-surface="white" className="service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-brand-primary/30 after:content-['']">
                  <div className="mb-6 md:mb-8"><PlatformPair platforms={comparison.platforms} className="size-8" /></div>
                  <h2 className="heading-h5 mb-5 font-bold">{comparisonName(comparison)}</h2>
                  <p className="mb-6 md:mb-8">{comparison.shortAnswer}</p>
                  <div className="mt-auto"><TextLink href={`/compare/${comparison.slug}`}>{comparisonName(comparison)}</TextLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Cta17 heading="Not sure which one fits?" description="Book a 15-minute call. Tell me about your site and I’ll recommend a platform." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
