import { Fragment, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar16 } from "./Navbar16";
import { ServiceHero } from "./ServiceHero";
import { WebsiteComparison } from "./WebsiteComparison";
import { LogoComparison } from "./LogoComparison";
import { ServicePortfolioRows, serviceHighlightHeadings } from "./ServicePortfolioRows";
import { Layout424 } from "./Layout424";
import { ServiceDeliverables } from "./ServiceDeliverables";
import { Portfolio16 } from "./Portfolio16";
import { workProjects } from "../data/workProjects";
import { Layout351 } from "./Layout351";
import { Layout6 } from "./Layout6";
import { ServiceProcess } from "./ServiceProcess";
import { ServicePricing } from "./ServicePricing";
import { ServiceTestimonialOptions } from "./ServiceTestimonialOptions";
import { Testimonial32 } from "./Testimonial32";
import { ServiceFaq, brandDesignQuestions } from "./ServiceFaq";
import { Faq4 } from "./Faq4";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { BiCheck } from "react-icons/bi";
import { serviceDetails, serviceFaqs, serviceFeatures, serviceBySlug, type Service, type ServiceSlug } from "../data/services";
import { caseStudies } from "../data/caseStudies";
import { pricing, pricingFaqs, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// This service's own questions, then the ones that apply to every service.
const faqsFor = (service: Service): import("../data/services").ServiceFaq[] => service.slug === "brand-design" ? brandDesignQuestions : [
  ...serviceDetails[service.slug].faqs,
  ...pricingFaqs.filter(({ question }) => ["What if I don't like the first concepts?", "Are your rates negotiable?", "When do I pay?", "What happens on the introductory call?"].includes(question)).map(({ question, answer }) => ({ title: question, answer })),
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
  if (service.slug === "logo-design") return (
    <Layout6
      heading="A new logo, or a sharper version of what works"
      description="Work directly with me to refine your existing logo or develop a new identity. We explore concepts, shape the strongest direction, and make sure the final design works across your brand’s everyday applications."
      subHeadings={[
        { title: "Refine your logo", description: "Keep the idea people recognize while improving the drawing, spacing, colors and typography." },
        { title: "Start fresh", description: "Explore distinctive concepts, then develop your chosen direction into a practical, responsive logo system." },
      ]}
      image={{ src: "/images/services/671bbffc078e4c31361372af_arek_design_portrait.jpg", alt: "Arek Dvornechuck reviewing logo designs at his studio desk", width: 1200, height: 1500 }}
    />
  );
  return (
    <section id="overview" className={`px-[5%] py-16 md:py-24 lg:py-28 ${service.slug === "brand-design" ? "bg-black text-white" : ""}`}>
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm md:mb-4 text-brand-primary">{service.heading}</p>
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
        {service.slug !== "brand-design" && <SelectedServiceWork service={service} />}
      </div>
    </section>
  );
};

const SelectedServiceWork = ({ service, separate = false }: { service: Service; separate?: boolean }) => {
  const work = serviceDetails[service.slug].work.map((slug) => caseStudies.find((study) => study.slug === slug)).filter((study) => study !== undefined);
  if (!work.length) return null;
  if (separate) return <Portfolio16 id="selected-work" className="bg-white text-black" tagline="Work" heading="Selected work" description="Brand identities and digital experiences built to make ambitious businesses clearer, more distinctive, and easier to trust." projects={workProjects} embedded previewFit="contain" />;
  const content = (
    <>
      <h3 className="heading-h5 mb-6 md:mb-8">Selected {service.heading.toLowerCase()} work</h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {work.map((study) => (
          <a key={study.slug} href={`/work/${study.slug}`} className="group block">
            <div className="mb-4">
              <img loading="lazy" decoding="async" src={study.preview.src} alt={study.preview.alt} className="h-auto w-full" />
            </div>
            <p className="heading-h6 mb-1">{study.client}</p>
            <p className="text-sm">{study.title}</p>
          </a>
        ))}
      </div>
    </>
  );
  return <div className="mt-16 md:mt-24">{content}</div>;
};

type Props = {
  slug: ServiceSlug;
  // Hero copy is passed in so each detail page keeps its own literal strings.
  heading: string;
  description: string;
  afterOverview?: ReactNode;
  heroImage?: { src: string; alt: string; width?: number; height?: number };
};

// Shared body for the six /services/* pages. Each page file owns its own
// <Helmet> so the route-shell generator can scrape a literal title there.
export const ServiceDetailLayout = ({ slug, heading, description, afterOverview }: Props) => {
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
      <ServiceHero service={service} heading={slug === "brand-design" ? "Brand design for your next chapter" : slug === "web-design" ? "Web design that inspires action" : heading} description={description} />
      <ServicePortfolioRows slug={slug} />
      <Layout424 tagline={service.heading} headings={serviceHighlightHeadings[slug]} />
      <ServiceDeliverables slug={slug} />
      <ServiceProcess slug={slug} />
      {slug !== "brand-design" && <ServiceOverview service={service} />}
      {slug === "logo-design" && <SelectedServiceWork service={service} separate />}
      {slug !== "logo-design" && <>
      {afterOverview}
      {slug !== "brand-design" && <Layout351
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
      />}
      </>}
      <ServicePricing slug={slug} />
      {slug === "brand-design" ? <ServiceTestimonialOptions /> : <Testimonial32 />}
      {slug === "brand-design" ? <ServiceFaq /> : <Faq4
        tagline="FAQs"
        heading="Questions about working together"
        description="What most founders ask before starting a branding project."
        questions={faqsFor(service).map(({ title, answer, links }) => ({
          title,
          answer: <p>{answer}{links && <> See {links.map((link, index) => <Fragment key={link.href}>{index > 0 && (index === links.length - 1 ? " and " : ", ")}<a href={link.href}>{link.label}</a></Fragment>)}.</>}</p>,
        }))}
      />}
      <Cta17 />
      {slug === "logo-design" && <LogoComparison />}
      {slug === "web-design" && <WebsiteComparison />}
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
