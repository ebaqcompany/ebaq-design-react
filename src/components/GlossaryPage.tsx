import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { glossary, glossaryCategories, glossaryIndex, glossaryUpdated, type GlossaryCategory, type GlossaryTerm } from "../data/glossary";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";

// Consolidated single-page glossary at /glossary: all terms, expert definitions, examples,
// and deep links live on one authoritative, searchable, anchor-linked reference page.
const pageUrl = `${siteUrl}/glossary`;

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${pageUrl}#terms`,
    url: pageUrl,
    name: "Brand, Branding & Brand Identity Glossary",
    description: glossaryIndex.description,
    author: { "@id": `${siteUrl}/#founder` },
    hasDefinedTerm: glossary.map(({ slug, term, short }) => ({
      "@type": "DefinedTerm",
      name: term,
      description: short,
      url: `${pageUrl}#${slug}`,
    })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }], siteUrl),
];

const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
const bySlug = new Map(glossary.map((entry) => [entry.slug, entry]));
const brandEntry = bySlug.get("brand");

const coreComparison = [
  {
    slug: "brand",
    label: "Brand",
    role: "What people feel",
    summary: "The gut feeling and reputation customers hold in their mind. You cannot dictate it directly—you earn it through every interaction.",
  },
  {
    slug: "branding",
    label: "Branding",
    role: "The work you do",
    summary: "The ongoing strategy, positioning, naming, design, and messaging used to deliberately shape how the market perceives you.",
  },
  {
    slug: "brand-identity",
    label: "Brand identity",
    role: "What people see & hear",
    summary: "The tangible toolkit you control: logo, colors, typography, imagery, guidelines, and tone of voice across every touchpoint.",
  },
];

const filterButton = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-left text-sm font-semibold transition-colors ${
    active ? "border-brand-primary bg-brand-light text-black" : "border-black/20 bg-white text-black hover:border-black"
  }`;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function highlight(text: string, needle: string): ReactNode {
  if (!needle) return text;
  const regex = new RegExp(`(${escapeRegExp(needle)})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === needle.toLowerCase() ? (
      <mark key={index} className="rounded bg-brand-yellow/70 px-0.5 text-black">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

const matchesEntry = (entry: GlossaryTerm, needle: string) => {
  if (!needle) return true;
  const haystack = [
    entry.term,
    entry.question,
    entry.short,
    entry.why,
    entry.example,
    entry.category,
    ...(entry.quotes?.map((q) => `${q.quote} ${q.author} ${q.source ?? ""}`) ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
};

export const GlossaryPage = () => {
  const [category, setCategory] = useState<GlossaryCategory | "">("Branding");
  const [query, setQuery] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const needle = query.trim().toLowerCase();

  const allMatches = sorted.filter((entry) => matchesEntry(entry, needle));
  const visible = allMatches.filter((entry) => !category || entry.category === category);
  const letters = [...new Set(visible.map(({ term }) => term[0].toUpperCase()))];
  const categoryCounts = new Map(glossaryCategories.map((name) => [name, sorted.filter((entry) => entry.category === name).length]));

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const entry = bySlug.get(targetId);
    if (entry && entry.category !== "Branding") {
      setCategory(entry.category);
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const copyAnchor = (slug: string) => {
    const url = `${window.location.origin}/glossary#${slug}`;
    window.history.replaceState(null, "", `#${slug}`);
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopiedSlug(slug);
    window.setTimeout(() => setCopiedSlug((current) => (current === slug ? null : current)), 1400);
  };

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Brand, Branding &amp; Brand Identity: What’s the Difference? (Glossary) | Ebaq Design</title>
        {/* Literal strings: scripts/generate-route-shells.mjs reads this page's title and description from source. */}
        <meta name="description" content="Brand, branding, and brand identity explained alongside 57 essential branding, logo, and web design terms—with expert definitions, real examples, and deep guides on one page." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={glossaryIndex.title} />
        <meta property="og:description" content={glossaryIndex.description} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section className="px-[5%] pt-12 pb-10 md:pt-16 md:pb-12 lg:pt-20">
          <div className="container">
            <header className="max-w-3xl">
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Glossary</p>
              <h1 className="heading-h1 mb-5 md:mb-6">Brand, Branding &amp; Brand Identity: What’s the Difference?</h1>
              <p className="max-w-2xl md:text-md">
                Founders use <strong>brand</strong>, <strong>branding</strong>, and <strong>brand identity</strong> interchangeably—which makes briefing a designer or planning a rebrand harder than it needs to be. Here is the clear difference, followed by all {glossary.length} branding, logo, and web design terms in plain English on one searchable page.
              </p>
              <p className="mt-6 font-mono text-sm uppercase tracking-wide text-black/60">
                {glossary.length} terms · Expert definitions · Updated {glossaryUpdated}
              </p>
            </header>

            <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3">
              {coreComparison.map((item) => (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  onClick={() => { setCategory("Branding"); setQuery(""); }}
                  className="group rounded-xl border border-black/20 bg-white p-6 text-black no-underline transition-colors hover:border-brand-primary"
                >
                  <p className="mb-2 font-mono text-xs uppercase tracking-wide text-brand-primary">{item.role}</p>
                  <h2 className="heading-h5 mb-2 group-hover:text-brand-primary">{item.label}</h2>
                  <p className="text-sm text-black/80">{item.summary}</p>
                </a>
              ))}
            </div>

            {brandEntry?.quotes && brandEntry.quotes.length > 0 && (
              <div className="mt-8 rounded-xl border border-brand-primary/30 bg-brand-light p-6 md:p-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-wide text-brand-primary">How branding experts define “Brand”</p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {brandEntry.quotes.map((item) => (
                    <blockquote key={item.author} className="m-0 flex flex-col justify-between rounded-xl border border-brand-primary/20 bg-white p-5">
                      <p className="text-sm text-black md:text-base">“{item.quote}”</p>
                      <footer className="mt-3 font-mono text-xs uppercase tracking-wide text-black/60">
                        — {item.author}{item.source ? `, ${item.source}` : ""}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="terms" className="border-t border-black/10 px-[5%] py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 gap-10 md:gap-x-16 lg:grid-cols-[16rem_1fr]">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <label className="mb-4 grid gap-2 text-sm font-semibold">
                  Search &amp; highlight terms
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="e.g. positioning, wordmark, Godin"
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-normal focus:border-black focus:outline-none"
                  />
                </label>

                {needle && (
                  <div className="mb-5 flex items-center justify-between gap-2 text-xs text-black/70">
                    <span>Showing {visible.length} of {glossary.length} terms</span>
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="rounded-full border border-black/20 bg-white px-2.5 py-1 text-xs font-semibold text-black hover:border-black"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <p id="glossary-categories" className="mb-2.5 font-mono text-xs uppercase tracking-wide text-black/60">Category</p>
                <div role="group" aria-labelledby="glossary-categories" className="mb-6 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                  {glossaryCategories.map((name) => (
                    <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={filterButton(category === name)}>
                      {name} ({categoryCounts.get(name) ?? 0})
                    </button>
                  ))}
                  <button type="button" aria-pressed={category === ""} onClick={() => setCategory("")} className={filterButton(category === "")}>
                    All terms ({glossary.length})
                  </button>
                </div>

                {letters.length > 0 && (
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-wide text-black/60">Jump to letter</p>
                    <nav aria-label="Jump to glossary letter" className="flex flex-wrap gap-1.5">
                      {letters.map((letter) => (
                        <a
                          key={letter}
                          href={`#letter-${letter}`}
                          className="inline-flex size-8 items-center justify-center rounded-full border border-black/20 bg-white font-mono text-xs font-medium text-black no-underline transition-colors hover:border-brand-primary hover:bg-brand-light"
                        >
                          {letter}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </aside>

              <div aria-live="polite">
                {visible.length === 0 && (
                  <div className="rounded-xl border border-black/20 bg-surface-muted p-8">
                    <p className="mb-3 font-semibold">No terms match “{query}”{category ? ` in ${category}` : ""}.</p>
                    {category && allMatches.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setCategory("")}
                        className="rounded-full border border-black/20 bg-white px-4 py-2 text-sm font-semibold text-black hover:border-black"
                      >
                        Show {allMatches.length} {allMatches.length === 1 ? "match" : "matches"} across all categories
                      </button>
                    ) : (
                      <p className="text-sm text-black/70">Try a shorter keyword or switch to All terms to browse all {glossary.length} entries.</p>
                    )}
                  </div>
                )}

                {letters.map((letter) => (
                  <section key={letter} id={`letter-${letter}`} aria-labelledby={`heading-letter-${letter}`} className="mb-12 scroll-mt-24 last:mb-0">
                    <div className="mb-4 flex items-center gap-4">
                      <h2 id={`heading-letter-${letter}`} className="heading-h3 mb-0 text-brand-primary">{letter}</h2>
                      <div className="h-px flex-1 bg-black/15" />
                    </div>

                    <div className="grid gap-6">
                      {visible
                        .filter(({ term }) => term[0].toUpperCase() === letter)
                        .map((entry) => {
                          const relatedEntries = entry.related.flatMap((slug) => bySlug.get(slug) ?? []);
                          return (
                            <article
                              key={entry.slug}
                              id={entry.slug}
                              className="scroll-mt-24 rounded-xl border border-black/20 bg-white p-6 md:p-8"
                            >
                              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                <span className="font-mono text-xs uppercase tracking-wide text-brand-primary">{entry.category}</span>
                                <a
                                  href={`#${entry.slug}`}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    copyAnchor(entry.slug);
                                  }}
                                  className="font-mono text-xs text-black/50 no-underline transition-colors hover:text-black"
                                  aria-label={`Copy link to ${entry.term}`}
                                >
                                  {copiedSlug === entry.slug ? "Link copied" : `#${entry.slug}`}
                                </a>
                              </div>

                              <h3 className="heading-h4 mb-1">{highlight(entry.term, needle)}</h3>
                              <p className="mb-4 text-sm text-black/60">{highlight(entry.question, needle)}</p>

                              <p className="mb-6 text-base font-medium text-black md:text-md">{highlight(entry.short, needle)}</p>

                              <div className="grid grid-cols-1 gap-5 border-t border-black/10 pt-5 md:grid-cols-2">
                                <div>
                                  <p className="mb-1.5 font-mono text-xs uppercase tracking-wide text-black/60">Why it matters</p>
                                  <p className="text-sm text-black/85">{highlight(entry.why, needle)}</p>
                                </div>
                                <div>
                                  <p className="mb-1.5 font-mono text-xs uppercase tracking-wide text-black/60">Example</p>
                                  <p className="text-sm text-black/85">{highlight(entry.example, needle)}</p>
                                </div>
                              </div>

                              {entry.quotes && entry.quotes.length > 0 && (
                                <div className="mt-5 grid gap-3 border-t border-black/10 pt-5">
                                  <p className="font-mono text-xs uppercase tracking-wide text-black/60">
                                    {entry.quotes.length > 1 ? "Expert definitions" : "Expert perspective"}
                                  </p>
                                  <div className={`grid grid-cols-1 gap-3 ${entry.quotes.length > 1 ? "md:grid-cols-2" : ""}`}>
                                    {entry.quotes.map((item) => (
                                      <blockquote key={item.author + item.quote.slice(0, 12)} className="m-0 rounded-xl bg-surface-muted p-4">
                                        <p className="text-sm text-black">“{highlight(item.quote, needle)}”</p>
                                        <footer className="mt-2 font-mono text-xs uppercase tracking-wide text-black/60">
                                          — {highlight(item.author, needle)}{item.source ? `, ${highlight(item.source, needle)}` : ""}
                                        </footer>
                                      </blockquote>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-xs uppercase tracking-wide text-black/50">Related:</span>
                                  {relatedEntries.map((rel) => (
                                    <a
                                      key={rel.slug}
                                      href={`#${rel.slug}`}
                                      onClick={() => { setCategory(rel.category === category ? category : ""); setQuery(""); }}
                                      className="rounded-full border border-black/20 px-3 py-1 text-xs font-medium text-black no-underline transition-colors hover:border-brand-primary hover:bg-brand-light"
                                    >
                                      {rel.term}
                                    </a>
                                  ))}
                                </div>
                                <div className="shrink-0">
                                  <TextLink href={entry.link.href} className="text-sm">{entry.link.label}</TextLink>
                                </div>
                              </div>
                            </article>
                          );
                        })}
                    </div>
                  </section>
                ))}

                {category && !needle && visible.length > 0 && (
                  <div className="mt-10 flex justify-start">
                    <button
                      type="button"
                      onClick={() => setCategory("")}
                      className="rounded-full border border-black/20 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black"
                    >
                      Show all {glossary.length} terms
                    </button>
                  </div>
                )}
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
