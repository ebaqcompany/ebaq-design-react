import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { glossary, glossaryCategories, glossaryIndex, glossaryUpdated, type GlossaryCategory } from "../data/glossary";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";

// The glossary hub at /glossary. Layout: Relume Filters 1 (a filter column beside the results),
// with each term as a Stacked List row grouped under its first letter.
const pageUrl = `${siteUrl}/glossary`;

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${pageUrl}#terms`,
    url: pageUrl,
    name: "Branding and web design glossary",
    description: glossaryIndex.description,
    hasDefinedTerm: glossary.map(({ slug, term, short }) => ({ "@type": "DefinedTerm", name: term, description: short, url: `${pageUrl}/${slug}` })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }], siteUrl),
];

const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
const filterButton = (active: boolean) => `rounded-full border px-4 py-2 text-left text-sm font-semibold transition-colors ${active ? "border-brand-primary bg-brand-light" : "border-black/20 bg-white hover:border-black"}`;

export const GlossaryPage = () => {
  const [category, setCategory] = useState<GlossaryCategory | "">("");
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = sorted.filter((entry) => (!category || entry.category === category) && (!needle || `${entry.term} ${entry.short}`.toLowerCase().includes(needle)));
  const letters = [...new Set(visible.map(({ term }) => term[0].toUpperCase()))];

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Branding Glossary: Brand, Logo & Web Design Terms | Ebaq Design</title>
        {/* A literal: scripts/generate-route-shells.mjs reads this page's title and description from the source. */}
        <meta name="description" content="Branding, logo design, and web design terms in plain English: what each one means, why it matters, and an example." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={glossaryIndex.title} />
        <meta property="og:description" content={glossaryIndex.description} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section className="px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container">
            <header className="mb-10 max-w-lg md:mb-12">
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Glossary</p>
              <h1 className="heading-h2 mb-5 md:mb-6">Branding and web design terms, in plain English</h1>
              <p className="max-w-md md:text-md">The words that come up when you brief a designer, rebrand, or rebuild a website. Each entry gives the short answer first, then why it matters and an example.</p>
              <p className="mt-6 font-mono text-sm uppercase tracking-wide text-black/60">{glossary.length} terms · Updated {glossaryUpdated}</p>
            </header>

            <div className="grid grid-cols-1 gap-10 md:gap-x-16 md:gap-y-12 lg:grid-cols-[max-content_1fr]">
              <aside className="lg:sticky lg:top-28 lg:w-56 lg:self-start">
                <label className="mb-6 grid gap-2 text-sm font-semibold">
                  Search terms
                  <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="wordmark" className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 font-normal focus:border-black focus:outline-none" />
                </label>
                <p id="glossary-categories" className="mb-3 text-sm font-semibold">Category</p>
                <div role="group" aria-labelledby="glossary-categories" className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                  <button type="button" aria-pressed={category === ""} onClick={() => setCategory("")} className={filterButton(category === "")}>All terms</button>
                  {glossaryCategories.map((name) => (
                    <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={filterButton(category === name)}>{name}</button>
                  ))}
                </div>
              </aside>

              <div aria-live="polite">
                {visible.length === 0 && <p>No terms match. Try a shorter word or another category.</p>}
                {letters.map((letter) => (
                  <section key={letter} aria-labelledby={`letter-${letter}`} className="mb-10 md:mb-12">
                    <h2 id={`letter-${letter}`} className="heading-h4 mb-2">{letter}</h2>
                    <ul className="border-t border-black/20">
                      {visible.filter(({ term }) => term[0].toUpperCase() === letter).map(({ slug, term, short, category: group }) => (
                        <li key={slug} className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-black/20 py-5 md:grid-cols-[14rem_1fr]">
                          <div>
                            <TextLink href={`/glossary/${slug}`}>{term}</TextLink>
                            <p className="mt-2 font-mono text-sm uppercase tracking-wide text-black/60">{group}</p>
                          </div>
                          <p>{short}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Cta17 heading="Rather talk it through?" description="Book a 15-minute call. Tell me about your brand and I’ll explain what it needs in plain words." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
