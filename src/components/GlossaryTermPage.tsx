import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { siteUrl } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { glossary, glossaryTitle, type GlossaryTerm } from "../data/glossary";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { NotFoundPage } from "./NotFoundPage";
import { TextLink } from "./TextLink";

// One glossary entry at /glossary/:slug. Layout: Relume Content 27 (a narrow sticky column beside
// the text). The question is the page heading and the short answer comes straight after it, so
// search and answer engines can lift the definition.
const Term = ({ entry }: { entry: GlossaryTerm }) => {
  const path = `/glossary/${entry.slug}`;
  const pageUrl = `${siteUrl}${path}`;
  const title = glossaryTitle(entry);
  const related = entry.related.flatMap((slug) => glossary.find((other) => other.slug === slug) ?? []);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${pageUrl}#term`,
      url: pageUrl,
      name: entry.term,
      description: entry.short,
      inDefinedTermSet: { "@type": "DefinedTermSet", "@id": `${siteUrl}/glossary#terms`, name: "Branding and web design glossary", url: `${siteUrl}/glossary` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description: entry.short,
      isPartOf: { "@id": `${siteUrl}/#website` },
      author: { "@id": `${siteUrl}/#founder` },
      mainEntity: { "@id": `${pageUrl}#term` },
    },
    buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }, { name: entry.term, path }], siteUrl),
  ];

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={entry.short} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={entry.short} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section className="px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container grid grid-cols-1 items-start gap-y-10 lg:grid-cols-[20rem_1fr] lg:gap-x-16">
            <aside className="lg:sticky lg:top-28">
              <TextLink href="/glossary">All terms</TextLink>
              <p className="mt-8 font-mono text-sm uppercase tracking-wide text-black/60">Category</p>
              <p className="mt-1 font-semibold">{entry.category}</p>
              {related.length > 0 && (
                <>
                  <p className="mt-8 font-mono text-sm uppercase tracking-wide text-black/60">Related terms</p>
                  <ul className="mt-2 grid gap-3">
                    {related.map(({ slug, term }) => <li key={slug}><TextLink href={`/glossary/${slug}`}>{term}</TextLink></li>)}
                  </ul>
                </>
              )}
            </aside>

            <article className="max-w-lg">
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Glossary</p>
              <h1 className="heading-h2 mb-5 md:mb-6">{entry.question}</h1>
              <p className="md:text-md">{entry.short}</p>

              <h2 className="heading-h5 mb-3 mt-10 md:mt-12">Why it matters</h2>
              <p>{entry.why}</p>

              <h2 className="heading-h5 mb-3 mt-10 md:mt-12">Example</h2>
              <p>{entry.example}</p>

              <div className="mt-10 rounded-xl bg-brand-light p-6 md:mt-12 md:p-8">
                <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">Go deeper</p>
                <TextLink href={entry.link.href}>{entry.link.label}</TextLink>
              </div>
            </article>
          </div>
        </section>
        <Cta17 heading={`Need help with your ${entry.category === "Web design" || entry.category === "Web development" ? "website" : "brand"}?`} description="Book a 15-minute call. Tell me what you are working on and I’ll tell you what it takes." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};

export const GlossaryTermPage = () => {
  const { slug } = useParams();
  const entry = glossary.find((item) => item.slug === slug);
  return entry ? <Term key={entry.slug} entry={entry} /> : <NotFoundPage />;
};
