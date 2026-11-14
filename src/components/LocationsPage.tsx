import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { clientPlaces } from "../data/clientLocations";
import { worldMap } from "../data/worldMap";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";

// The client map at /locations: a dotted world map with a marker for each place a client is based.
// Picking a place (on the map or from the buttons under it) lists the clients there. The header is
// the tool pages' left-aligned intro; the map sits in a white bordered card.
const pageUrl = `${siteUrl}/locations`;
const clientCount = clientPlaces.reduce((total, { clients }) => total + clients.length, 0);
const countryCount = new Set(clientPlaces.map(({ country }) => country)).size;

// Longitude and latitude to the map's own units (see src/data/worldMap.ts).
const x = (lon: number) => (lon + 180) * worldMap.scale;
const y = (lat: number) => (worldMap.top - lat) * worldMap.scale;

const faqs: FactFaq[] = [
  { question: "Where are you based?", answer: "In Brooklyn, New York City. Clients in New York can meet in person; everyone else works with me over video calls." },
  { question: "Do you work with clients outside the United States?", answer: "Yes. I have designed brands for clients in the United Kingdom, Ireland, Spain, Greece, India, the United Arab Emirates, Australia, and the Caribbean, as well as across the US. The process is the same wherever you are." },
  { question: "How does it work across time zones?", answer: "We agree on call times that suit both of us before the project starts. Between calls you get work to review in your own time, so a time difference rarely slows anything down." },
  { question: "Do I need to hire a local agency?", answer: "No. A local agency mostly adds meetings and overhead. You work directly with me, the designer doing the work, and pay for the design only." },
];

const schemas = [
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }], siteUrl),
];

const placeButton = (active: boolean) => `rounded-full border px-4 py-2 text-left text-sm font-semibold transition-colors ${active ? "border-brand-primary bg-brand-light" : "border-black/20 bg-white hover:border-black"}`;

export const LocationsPage = () => {
  const [selected, setSelected] = useState(clientPlaces[0].id);
  const place = clientPlaces.find(({ id }) => id === selected) ?? clientPlaces[0];

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Clients in New York & Worldwide | Ebaq Design</title>
        {/* A literal: scripts/generate-route-shells.mjs reads this page's title and description from the source. */}
        <meta name="description" content="A map of where my branding and web design clients are based: New York, San Francisco, London, Dublin, Spain, Greece, India, the UAE, Sydney, and the Caribbean. Based in Brooklyn, working worldwide." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Clients in New York & Worldwide | Ebaq Design" />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container">
            <header className="mb-10 max-w-lg md:mb-12">
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Locations</p>
              <h1 className="heading-h2 mb-5 md:mb-6">Based in New York, working worldwide</h1>
              <p className="max-w-md md:text-md">I work from Brooklyn with clients on four continents. Pick a place to see who I have designed for there.</p>
              <p className="mt-6 font-mono text-sm uppercase tracking-wide text-black/60">{clientCount} clients shown · {countryCount} countries</p>
            </header>

            <div className="overflow-hidden rounded-xl border border-black/20 bg-white p-4 md:p-8">
              <svg viewBox={`0 0 ${worldMap.width} ${worldMap.height}`} role="img" aria-label="World map with a marker for each place a client is based" className="block h-auto w-full">
                <path d={worldMap.dots} fill="none" strokeWidth="2.6" strokeLinecap="round" className="stroke-black/25" />
                {clientPlaces.map(({ id, label, lat, lon, clients }) => (
                  <g key={id} onClick={() => setSelected(id)} aria-label={`${label}: ${clients.map(({ name }) => name).join(", ")}`} className="cursor-pointer">
                    <circle cx={x(lon)} cy={y(lat)} r="16" className={id === selected ? "fill-black/20" : "fill-brand-primary/30"} />
                    <circle cx={x(lon)} cy={y(lat)} r="7" strokeWidth="2" className={id === selected ? "fill-brand-primary stroke-black" : "fill-brand-primary stroke-white"} />
                  </g>
                ))}
              </svg>
            </div>

            <div role="group" aria-label="Places" className="mt-6 flex flex-wrap gap-2 md:mt-8">
              {clientPlaces.map(({ id, label }) => (
                <button key={id} type="button" aria-pressed={id === selected} onClick={() => setSelected(id)} className={placeButton(id === selected)}>{label}</button>
              ))}
            </div>

            <div aria-live="polite" className="mt-8 md:mt-10">
              <h2 className="heading-h4 mb-2">{place.label}</h2>
              <p className="mb-6 font-mono text-sm uppercase tracking-wide text-black/60 md:mb-8">{place.country}</p>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {place.clients.map(({ name, industry, logo, study }) => (
                  <article key={name} data-surface="white" className="service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
                    {logo && <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" className="mb-6 h-8 w-auto max-w-[10rem] self-start object-contain object-left md:mb-8" />}
                    <h3 className="heading-h5 mb-2 font-bold">{name}</h3>
                    {industry && <p className="mb-6 md:mb-8">{industry}</p>}
                    {study && <div className="mt-auto"><TextLink href={`/work/${study}`}>Case study</TextLink></div>}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Faq4 tagline="FAQs" heading="Working with me from anywhere" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
        <Cta17 heading="Wherever you are, start with a call" description="Book a 15-minute call. Tell me about your business and I’ll tell you what it takes." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
