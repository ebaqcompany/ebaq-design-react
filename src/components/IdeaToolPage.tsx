import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { LogoCycle, type IdeaType } from "./IdeaGenerator";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";
import { siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// The page around a generator: the tool pages' split hero (Relume Header 1), a grid explaining the
// types, FAQs, and the booking call to action. The <title> and meta description stay in each page
// file as literals, because scripts/generate-route-shells.mjs reads them from the source.
type Props = {
  path: string;
  name: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  introLink: { label: string; href: string };
  tool: ReactNode;
  typesEyebrow: string;
  typesHeading: string;
  typesIntro: string;
  types: readonly IdeaType[];
  faqHeading: string;
  faqs: FactFaq[];
  cta: { heading: string; description: string };
  head: ReactNode;
};

const eyebrow = "mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4";

export const IdeaToolPage = ({ path, name, title, description, heading, intro, introLink, tool, typesEyebrow, typesHeading, typesIntro, types, faqHeading, faqs, cta, head }: Props) => {
  const pageUrl = `${siteUrl}${path}`;
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebApplication", "@id": `${pageUrl}#webapp`, url: pageUrl, name, description, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, provider: { "@id": `${siteUrl}/#organization` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name, path }], siteUrl),
  ];
  return (
    <div className="relative bg-white text-black">
      {head}
      <Helmet>
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section id="generator" className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-[0.7fr_1fr] lg:items-start lg:gap-x-16">
            <header>
              <p className={eyebrow}>Free tool</p>
              <h1 className="heading-h2 mb-5 md:mb-6">{heading}</h1>
              <p className="max-w-md md:text-md">{intro}</p>
              <div className="mt-6 md:mt-8"><TextLink href={introLink.href}>{introLink.label}</TextLink></div>
            </header>
            {tool}
          </div>
        </section>

        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
              <p className={eyebrow}>{typesEyebrow}</p>
              <h2 className="mb-5 md:mb-6">{typesHeading}</h2>
              <p className="md:text-md">{typesIntro}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {types.map(({ id, name: typeName, description: summary, examples, logos, sizes, brands }, index) => (
                <article key={id} data-surface="white" className="service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
                  <div className="mb-6 md:mb-8"><LogoCycle logos={logos} sizes={sizes} brands={brands} offset={index} /></div>
                  <h3 className="heading-h5 mb-5 font-bold">{typeName}</h3>
                  <p className="mb-6 md:mb-8">{summary}</p>
                  <p className="mt-auto font-mono text-sm uppercase tracking-wide text-black/60">{examples}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Faq4 tagline="FAQs" heading={faqHeading} questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
        <Cta17 heading={cta.heading} description={cta.description} />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
