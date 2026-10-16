import { Helmet } from "react-helmet-async";
import { Navbar16 } from "./Navbar16";
import { Header107 } from "./Header107";
import { Layout351 } from "./Layout351";
import { Timeline10 } from "./Timeline10";
import { Testimonial32 } from "./Testimonial32";
import { Faq4 } from "./Faq4";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { BiCheck } from "react-icons/bi";
import { processSteps, serviceDetails, serviceFaqs, serviceFeatures, serviceBySlug, type Service, type ServiceSlug } from "../data/services";
import { caseStudies } from "../data/caseStudies";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// This service's own questions, then the ones that apply to every service.
const faqsFor = (service: Service) => [
  ...serviceDetails[service.slug].faqs,
  ...serviceFaqs.filter((faq) => faq.title === "Who actually does the work?" || faq.title === "Do you work with clients outside New York?"),
];

// Service, FAQ and breadcrumb structured data for one /services/* page, tied to the
// homepage organization so answer engines see one studio with one price.
const serviceSchemas = (service: Service) => {
  const url = `${siteUrl}${service.url}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.heading,
      serviceType: service.heading,
      description: `${service.description} ${pricing.summary}`,
      url,
      provider: {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: studio.name,
        address: { "@type": "PostalAddress", addressLocality: studio.address.locality, addressRegion: studio.address.region, addressCountry: studio.address.country },
      },
      areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Place", name: "Worldwide" }],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.heading} deliverables`,
        itemListElement: service.deliverables.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
      offers: {
        "@type": "Offer",
        price: String(pricing.weeklyRate),
        priceCurrency: pricing.currency,
        priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, unitText: "WEEK" },
        description: `${pricing.summary} ${pricing.guarantee}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqsFor(service).map((faq) => ({ "@type": "Question", name: faq.title, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
    buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.heading, path: service.url }], siteUrl),
  ];
};

// The part of each service page that is about this service alone: what it covers, how long it takes,
// the tools, and the case studies that show it.
const ServiceOverview = ({ service }: { service: Service }) => {
  const detail = serviceDetails[service.slug];
  const work = detail.work.map((slug) => caseStudies.find((study) => study.slug === slug)).filter((study) => study !== undefined);
  return (
    <section id="overview" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">{service.heading}</p>
            <h2 className="mb-5 md:mb-6">{detail.title}</h2>
            {detail.overview.map((paragraph) => (
              <p key={paragraph} className="mb-4 md:text-md">{paragraph}</p>
            ))}
          </div>
          <div className="md:pt-10">
            <h3 className="heading-h5 mb-4">What&rsquo;s included</h3>
            <ul className="mb-10 grid grid-cols-1 gap-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 md:text-md"><BiCheck className="mt-1 size-5 shrink-0" aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <h3 className="heading-h5 mb-4">Timeline and price</h3>
            <p className="mb-10 md:text-md">{detail.timeline}</p>
            <h3 className="heading-h5 mb-4">Tools</h3>
            <p className="md:text-md">{detail.tools.join(" · ")}</p>
          </div>
        </div>
        {work.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h3 className="heading-h5 mb-6 md:mb-8">{service.heading} in the work</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {work.map((study) => (
                <a key={study.slug} href={`/work/${study.slug}`} className="group block">
                  <div className="mb-4 aspect-video overflow-hidden bg-background-secondary">
                    <img loading="lazy" decoding="async" src={study.preview.src} alt={study.preview.alt} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <p className="heading-h6 mb-1">{study.client}</p>
                  <p className="text-sm">{study.title}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

type Props = {
  slug: ServiceSlug;
  // Hero copy is passed in so each detail page keeps its own literal strings.
  heading: string;
  description: string;
};

// Shared body for the six /services/* pages. Each page file owns its own
// <Helmet> so the route-shell generator can scrape a literal title there.
export const ServiceDetailLayout = ({ slug, heading, description }: Props) => {
  const service = serviceBySlug(slug);

  return (
    <div className="relative bg-white">
      <Helmet>
        {serviceSchemas(service).map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
      <Header107
        id="service-hero"
        title={heading}
        description={description}
        images={[]}
        showToolIcons={false}
        className="pb-8 md:pb-12 lg:pb-16"
      />
      <ServiceOverview service={service} />
      <Layout351
        id="what-i-offer"
        tagline="What I offer"
        heading="Six services, one senior designer"
        description="Strategy, identity, web, and motion are offered together because they reinforce each other. Take the whole system or just the part you need."
        // The card for the service you are already on links to booking rather
        // than back to this same page; the others cross-link.
        features={serviceFeatures.map((feature, index) =>
          index === service.index ? { ...feature, url: "/start", linkLabel: "Book a call" } : feature,
        )}
        initialActive={service.index}
      />
      <Timeline10
        tagline="How it works"
        taglineClassName="text-brand-primary"
        heading="An overview of my branding process"
        description="Every project follows the same five steps, so you always know what happens next and what's expected of you at each stage."
        timelineItems={processSteps}
      />
      <Testimonial32 />
      <Faq4
        tagline="FAQs"
        heading="Questions about working together"
        description="What most founders ask before starting a branding project."
        questions={faqsFor(service).map((faq) => ({ title: faq.title, answer: <p>{faq.answer}</p> }))}
      />
      <Cta17 />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
