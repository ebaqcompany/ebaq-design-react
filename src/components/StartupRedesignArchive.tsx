import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { redesignConcepts, type RedesignConcept } from "../data/startupRedesignConcepts";

const buckets = [
  {
    label: "Style bucket",
    title: "Glassmorphism web design",
    path: "/glassmorphism-web-design",
    description: "Interactive hero concepts with translucent surfaces, depth, glow, and high-contrast product storytelling.",
  },
  {
    label: "Industry bucket",
    title: "Cybersecurity startup web design",
    path: "/cybersecurity-startup-web-design",
    description: "AI security and SOC pages where clarity, urgency, and trust need to land in the first screen.",
  },
  {
    label: "Future industry bucket",
    title: "Healthcare startup web design",
    path: "/healthcare-startup-web-design",
    description: "Prepared route for upcoming healthcare and biotech redesign concepts.",
  },
];

function ConceptCard({ concept }: { concept: RedesignConcept }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
      <div className="grid gap-px bg-black/10 lg:grid-cols-2">
        <figure className="bg-neutral-100">
          <img className="h-full min-h-[320px] w-full object-cover object-top" src={concept.beforeImage} alt={`${concept.company} original homepage before redesign`} />
          <figcaption className="px-5 py-3 text-xs uppercase tracking-[0.2em] text-black/50">Before</figcaption>
        </figure>
        <figure className="bg-neutral-950">
          <img className="h-full min-h-[320px] w-full object-cover object-top" src={concept.afterImage} alt={`${concept.company} ${concept.style} hero concept after redesign`} />
          <figcaption className="px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/50">After / coded demo</figcaption>
        </figure>
      </div>

      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-black px-3 py-1 text-xs uppercase tracking-[0.14em] text-white">{concept.status}</span>
            <Link className="rounded-full border border-black/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-black/60 hover:border-black hover:text-black" to={`/${concept.styleSlug}`}>{concept.style}</Link>
            <Link className="rounded-full border border-black/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-black/60 hover:border-black hover:text-black" to={`/${concept.industrySlug}`}>{concept.industry}</Link>
          </div>
          <h2 className="mb-5 max-w-3xl text-[clamp(3rem,8vw,7rem)]">{concept.company}</h2>
          <p className="max-w-3xl text-lg leading-8 text-black/70 md:text-xl">{concept.rationale}</p>
        </div>

        <aside className="rounded-[1.5rem] bg-neutral-50 p-6 text-sm leading-7 text-black/65">
          <dl className="grid gap-4">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-black/40">Company</dt>
              <dd className="text-black">{concept.company}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-black/40">Industry</dt>
              <dd>{concept.industry}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-black/40">Style</dt>
              <dd>{concept.style}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-black/40">Demo URL</dt>
              <dd><a className="underline decoration-black/20 underline-offset-4 hover:decoration-black" href={concept.demoUrl} target="_blank" rel="noreferrer">Open interactive demo</a></dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-black/10 pt-5 text-xs leading-6 text-black/45">{concept.disclaimer}</p>
        </aside>
      </div>
    </article>
  );
}

export function StartupRedesignArchive({ bucketTitle, bucketDescription, concepts = redesignConcepts }: { bucketTitle?: string; bucketDescription?: string; concepts?: RedesignConcept[] }) {
  const title = bucketTitle ?? "Startup Redesign Lab archive";
  const description = bucketDescription ?? "Draft SEO archive for funded startup hero redesign concepts by Ebaq Design.";

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-black">
      <Helmet>
        <title>{title} | Ebaq Design</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12">
        <nav className="mb-16 flex items-center justify-between text-sm">
          <Link to="/" className="font-medium">Ebaq Design</Link>
          <span className="rounded-full border border-black/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-black/50">Draft archive - not published</span>
        </nav>

        <div className="mb-14 max-w-5xl">
          <p className="mb-6 text-sm uppercase tracking-[0.22em] text-black/45">Startup Redesign Lab</p>
          <h1 className="mb-8 text-[clamp(4rem,12vw,11rem)]">{title}</h1>
          <p className="max-w-3xl text-xl leading-9 text-black/65 md:text-2xl">{description}</p>
        </div>

        <div className="mb-16 grid gap-4 md:grid-cols-3">
          {buckets.map((bucket) => (
            <Link key={bucket.path} to={bucket.path} className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:bg-white">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-black/40">{bucket.label}</p>
              <h2 className="mb-3 text-3xl">{bucket.title}</h2>
              <p className="text-sm leading-6 text-black/55">{bucket.description}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-10">
          {concepts.length > 0 ? concepts.map((concept) => <ConceptCard key={concept.slug} concept={concept} />) : (
            <div className="rounded-[2rem] border border-dashed border-black/20 bg-white/50 p-10 text-black/55">
              Draft bucket ready. Add matching concepts to <code>src/data/startupRedesignConcepts.ts</code> as the lab expands.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
