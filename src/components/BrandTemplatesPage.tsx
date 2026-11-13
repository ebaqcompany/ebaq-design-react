import { Helmet } from "react-helmet-async";
import { LuDownload } from "react-icons/lu";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";
import { siteUrl } from "../content/siteFacts";
import { buildBreadcrumbSchema, buildCollectionSchema, serializeJsonLd } from "../content/structuredData";

// Free one-page worksheets at /tools/brand-templates. The previews and the PDFs live in
// /public/tools/templates. They are the free one-page versions made for the blog. The full Brand
// Strategy Guide worksheets are a paid product and must not be offered here. Each card links to the tool or service that takes the next step.
const pageUrl = `${siteUrl}/tools/brand-templates`;
const description = "A free one-page brand voice worksheet as a PDF: set your tone on four scales (humour, formality, respect, and enthusiasm) and print it for your team.";

// Only templates with a real PDF are listed. The other one-page worksheets exist only as images
// or inside the paid Brand Strategy Guide, so they are left out until a free PDF exists.
const templates = [
  { slug: "voice", name: "Brand voice framework", summary: "Set your tone on four scales: humour, formality, respect, and enthusiasm.", file: "brand-voice-framework.pdf", next: { label: "Generate taglines", href: "/tools/tagline-generator" } },
];

const schemas = [
  buildCollectionSchema({ path: "/tools/brand-templates", name: "Free branding template", description }, [], siteUrl),
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Brand Templates", path: "/tools/brand-templates" }], siteUrl),
];

export const BrandTemplatesPage = () => (
  <div className="relative bg-white text-black">
    <Helmet>
      <title>Free Brand Voice Template: One-Page PDF Worksheet | Ebaq Design</title>
      <meta name="description" content="A free one-page brand voice worksheet as a PDF: set your tone on four scales (humour, formality, respect, and enthusiasm) and print it for your team." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Free Brand Voice Template: One-Page PDF Worksheet | Ebaq Design" />
      <meta property="og:description" content={description} />
      {schemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>
    <Navbar16 />
    <main>
      <section className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
        <div className="container">
          <header className="mb-10 max-w-lg md:mb-12">
            <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Free templates</p>
            <h1 className="heading-h2 mb-5 md:mb-6">Branding templates</h1>
            <p className="max-w-md md:text-md">A one-page worksheet I use in brand strategy workshops. Download it, print it, and fill it in with your team. No sign-up.</p>
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {templates.map(({ slug, name, summary, file, next }) => (
              <article key={slug} data-surface="white" className="service-card relative flex flex-col overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
                <img src={`/tools/templates/${slug}.webp`} alt={`${name} printed on a sheet of paper`} width={960} height={640} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h2 className="heading-h5 mb-3 font-bold">{name}</h2>
                  <p className="mb-6 md:mb-8">{summary}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
                    <a href={`/tools/templates/${file}`} download className="button-inverted"><span className="flex items-center gap-2"><LuDownload aria-hidden="true" className="size-4" />Download PDF</span></a>
                    <TextLink href={next.href}>{next.label}</TextLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-6 rounded-xl bg-black p-6 text-white md:mt-12 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="heading-h5 mb-3 font-bold">Prefer Figma, Miro, or Canva?</h2>
              <p className="max-w-md">My brand strategy template article lists the workshop template in nine formats, with a link to each.</p>
            </div>
            <TextLink href="/blog/brand-strategy-template" className="flex-none text-white">See all formats</TextLink>
          </div>
        </div>
      </section>
      <Cta17 heading="Want to fill these in together?" description="Book a 15-minute call. Tell me about your brand and I’ll tell you how a strategy workshop would run." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
