import { Fragment, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar16 } from "./Navbar16";
import { ServiceHero } from "./ServiceHero";
import { WebsiteComparison } from "./WebsiteComparison";
import { LogoComparison } from "./LogoComparison";
import { ServicePortfolioRows } from "./ServicePortfolioRows";
import { ServiceDeliverables } from "./ServiceDeliverables";
import { ServiceProcess } from "./ServiceProcess";
import { ServicePricing } from "./ServicePricing";
import { ServiceTestimonialOptions } from "./ServiceTestimonialOptions";
import { ServiceFaq, brandDesignQuestions } from "./ServiceFaq";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { serviceDetails, serviceBySlug, type Service, type ServiceSlug } from "../data/services";
import { pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { BrandDesignSectionOptions } from "./BrandDesignSectionOptions";

// This service's own questions, then the ones that apply to every service.
const faqsFor = (service: Service): import("../data/services").ServiceFaq[] => service.slug === "brand-design" ? brandDesignQuestions : serviceDetails[service.slug].faqs;

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
      description: (service.slug === "logo-design" || service.slug === "brand-strategy" || service.slug === "web-design" || service.slug === "web-development" || service.slug === "motion-graphics") ? serviceDetails[service.slug].timeline : `${service.description} ${pricing.summary}`,
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
      offers: (service.slug === "web-design" || service.slug === "web-development" || service.slug === "motion-graphics") ? [
        { "@type": "Offer", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, unitText: "WEEK" }, description: serviceDetails[service.slug].timeline },
        { "@type": "Offer", price: String(pricing.monthlyRate), priceCurrency: pricing.currency, priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.monthlyRate), priceCurrency: pricing.currency, unitText: "MONTH" }, description: "A month booked upfront, with deliverables and features agreed before booking." },
      ] : {
        "@type": "Offer",
        price: String(pricing.weeklyRate),
        priceCurrency: pricing.currency,
        priceSpecification: { "@type": "UnitPriceSpecification", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, unitText: "WEEK" },
        description: (service.slug === "logo-design" || service.slug === "brand-strategy") ? serviceDetails[service.slug].timeline : `${pricing.summary} ${pricing.guarantee}`,
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

type Props = {
  slug: ServiceSlug;
  // Hero copy is passed in so each detail page keeps its own literal strings.
  heading: string;
  description: string;
  afterOverview?: ReactNode;
  customSection?: ReactNode;
  heroImage?: { src: string; alt: string; width?: number; height?: number };
};

const ctaDescriptions: Record<ServiceSlug, string> = {
  "brand-strategy": "Tell me about your business, your audience, and where you want your brand to go.",
  "logo-design": "Tell me about your business and the logo you want to create or refine. Let’s plan your one-week sprint.",
  "brand-design": "Tell me about your brand and the visual identity you want to build.",
  "web-design": "Tell me about your pages, content, and features. Let’s plan the right scope for your website.",
  "web-development": "Show me your designs and tell me about your content, features, and launch plans. Let’s agree on the right platform and build scope.",
  "motion-graphics": "Tell me what you want to animate, where it will appear, and when you need it. Let’s plan the right scope.",
};

// Shared body for the six /services/* pages. Each page file owns its own
// <Helmet> so the route-shell generator can scrape a literal title there.
export const ServiceDetailLayout = ({ slug, customSection }: Props) => {
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
      <ServiceHero service={service} heading={service.cardTitle} description={service.description} />
      <ServicePortfolioRows slug={slug} />
      <BrandDesignSectionOptions service={service} />
      <ServiceDeliverables slug={slug} />
      <ServiceProcess slug={slug} />
      {/* Optional service-specific section, placed before pricing. */}
      {customSection ?? (slug === "logo-design" ? <LogoComparison /> : slug === "web-design" ? <WebsiteComparison /> : null)}
      <ServicePricing slug={slug} />
      <ServiceTestimonialOptions autoPlay />
      <ServiceFaq serviceName={service.heading} questions={faqsFor(service).map(({ title, answer, links }) => ({
        title,
        answer: <p>{answer}{links && <> See {links.map((link, index) => <Fragment key={link.href}>{index > 0 && (index === links.length - 1 ? " and " : ", ")}<a href={link.href}>{link.label}</a></Fragment>)}.</>}</p>,
      }))} />
      <Cta17 heading={slug === "brand-strategy" ? "Ready to develop your brand strategy?" : slug === "logo-design" ? "Ready to make your mark?" : slug === "web-design" ? "Ready to build your website?" : slug === "web-development" ? "Ready to launch your website?" : slug === "motion-graphics" ? "Ready to set your brand in motion?" : `Ready to ${service.cardTitle.charAt(0).toLowerCase()}${service.cardTitle.slice(1)}?`} description={ctaDescriptions[slug]} />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
