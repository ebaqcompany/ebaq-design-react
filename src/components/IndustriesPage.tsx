import { Helmet } from "react-helmet-async";
import { pricing, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, buildCollectionSchema, serializeJsonLd } from "../content/structuredData";
import { caseStudies } from "../data/caseStudies";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";

// The industries hub at /industries. It links to the landing page for each industry and shows the
// case study behind it, then lists the rest of the client work by industry. The intro is the tool
// pages' left-aligned header; the cards are the site's image cards (as on /tools/brand-templates).
const pageUrl = `${siteUrl}/industries`;
const description = "Branding and web design by industry: law firms, real estate, SaaS, AI startups, healthcare AI, luxury, cannabis, consultancies, and agencies, each with a case study.";

// Each industry with a landing page, and the case study that proves it.
const industries = [
  { name: "Law firms", summary: "Identity and website for firms that want to look established and stay approachable.", href: "/law-firm-branding", label: "Law firm branding", study: "fox-berman" },
  { name: "Real estate", summary: "Personal and team brands for agents and brokers, from the logo to listing materials.", href: "/real-estate-branding", label: "Real estate branding", study: "savory" },
  { name: "SaaS", summary: "Brand and website for software companies that need to explain the product fast.", href: "/saas-branding", label: "SaaS branding", study: "elevate" },
  { name: "AI startups", summary: "A distinct identity for AI companies in a market where most brands look the same.", href: "/ai-startup-branding", label: "AI startup branding", study: "orbio" },
  { name: "Healthcare AI", summary: "Branding that builds trust with clinicians and practices without the usual healthcare look.", href: "/ai-healthcare-branding", label: "AI healthcare branding", study: "next-dimension" },
  { name: "Luxury", summary: "Restrained, premium identities for high-end services and the clients they serve.", href: "/luxury-branding", label: "Luxury branding", study: "airport-executive" },
  { name: "Cannabis", summary: "Brand identities for dispensaries and cannabis brands in a crowded, regulated market.", href: "/cannabis-branding", label: "Cannabis branding", study: "sweetgrass" },
  { name: "Consultancies", summary: "A clear identity and website for consultants and advisory firms that sell expertise.", href: "/consultancy-branding", label: "Consultancy branding", study: "periti" },
  { name: "Marketing agencies", summary: "Brand identities for agencies that need their own brand to match the quality of their client work.", href: "/marketing-agency-branding", label: "Marketing agency branding", study: "wingnut" },
  { name: "Personal brands", summary: "Monograms, wordmarks, and websites for speakers, coaches, and founders.", href: "/personal-branding", label: "Personal branding", study: "nathalie-sadler" },
].flatMap((industry) => {
  const study = caseStudies.find(({ slug }) => slug === industry.study);
  return study ? [{ ...industry, client: study.client, image: study.preview }] : [];
});

// Client work in industries that do not have their own page yet.
const featured = new Set(industries.map(({ study }) => study));
const more = caseStudies.filter(({ slug, published }) => published !== false && !featured.has(slug));

const faqs: FactFaq[] = [
  { question: "Which industries do you work with?", answer: "Most of my work is for law firms, real estate teams, SaaS and AI startups, healthcare AI companies, luxury services, and consultancies. Each one has a page here with a case study." },
  { question: "Do you only work with the industries listed here?", answer: "No. The process is the same in any market: I learn your audience and competitors first, then design for them. The pages here are the industries where I have published work to show." },
  { question: "Does it help to hire someone who knows my industry?", answer: "It shortens the first week, because I already know what your competitors look like and what your clients expect. It matters less than a clear strategy, which is why every project starts with one." },
  { question: "Why hire a senior freelance designer instead of an agency?", answer: "You work directly with the person doing the design. Many agencies pass the work to a senior freelancer and add account management and their margin on top. Hiring me, you pay for the design work only, and you talk to the designer on every call." },
  { question: "How much does it cost and how long does it take?", answer: `${pricing.summary} ${pricing.guarantee}` },
  { question: "Where are you based?", answer: "In Brooklyn, New York City. I work with clients across NYC and worldwide, and the whole process runs remotely." },
];

const schemas = [
  buildCollectionSchema({ path: "/industries", name: "Branding and web design by industry", description }, industries.map(({ label, href }) => ({ name: label, path: href })), siteUrl),
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }], siteUrl),
];

const eyebrow = "mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4";

export const IndustriesPage = () => (
  <div className="relative bg-white text-black">
    <Helmet>
      <title>Branding & Web Design by Industry | Ebaq Design</title>
      <meta name="description" content="Branding and web design by industry: law firms, real estate, SaaS, AI startups, healthcare AI, luxury, cannabis, consultancies, and agencies, each with a case study." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Branding & Web Design by Industry | Ebaq Design" />
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
            <p className={eyebrow}>Industries</p>
            <h1 className="heading-h2 mb-5 md:mb-6">Branding and web design by industry</h1>
            <p className="max-w-md md:text-md">The markets I know best. Each one has its own page, with the work I did for a client in that industry.</p>
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ name, summary, href, label, study, client, image }) => (
              <article key={href} data-surface="white" className="service-card relative flex flex-col overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
                <img src={image.src} alt={image.alt ?? `${client} brand identity`} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h2 className="heading-h5 mb-3 font-bold">{name}</h2>
                  <p className="mb-6 md:mb-8">{summary}</p>
                  <div className="mt-auto grid gap-3">
                    <TextLink href={href}>{label}</TextLink>
                    <p className="text-sm text-black/60">Case study: <a href={`/work/${study}`} className="font-semibold text-black">{client}</a></p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container grid grid-cols-1 gap-y-8 lg:grid-cols-[20rem_1fr] lg:gap-x-16">
            <div>
              <p className={eyebrow}>More work</p>
              <h2 className="heading-h3">Other industries I have designed for</h2>
            </div>
            <ul className="border-t border-black/20">
              {more.map(({ slug, client, industry }) => (
                <li key={slug} className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-black/20 py-4">
                  <span className="heading-h7">{industry}</span>
                  <TextLink href={`/work/${slug}`}>{client}</TextLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Faq4 tagline="FAQs" heading="Questions about industries" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Don’t see your industry?" description="Book a 15-minute call. Tell me about your market and I’ll tell you how I would approach it." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
