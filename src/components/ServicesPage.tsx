import { Helmet } from "react-helmet-async";
import { pricing, studio } from "../content/siteFacts";
import { Navbar16 } from "./Navbar16";
import { Header107 } from "./Header107";
import { Logo3 } from "./Logo3";
import { Layout351 } from "./Layout351";
import { Timeline10 } from "./Timeline10";
import { Testimonial32 } from "./Testimonial32";
import { Faq4 } from "./Faq4";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { processSteps, serviceFaqs, serviceFeatures, services } from "../data/services";

const pageUrl = "https://www.ebaqdesign.com/services";

export const ServicesPage = () => (
  <div className="relative bg-white">
    <Helmet>
      <title>Graphic Design Services NYC: Branding, Logo & Web | Ebaq Design</title>
      <meta name="description" content="Senior freelance graphic designer in NYC: brand strategy, logo design, brand identity, web design, Framer and Webflow development, and motion. $3,000/week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Graphic Design Services NYC: Branding, Logo & Web | Ebaq Design" />
      <meta property="og:description" content="Senior freelance graphic designer in NYC: brand strategy, logo design, brand identity, web design, Framer and Webflow development, and motion. $3,000/week." />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://www.ebaqdesign.com/#organization",
          name: "Ebaq Design",
          description: `Branding services in Brooklyn, New York City: brand strategy, logo design, identity systems, web design, development, and motion graphics. ${pricing.summary} ${pricing.guarantee}`,
          url: pageUrl,
          areaServed: "Worldwide",
          priceRange: `${pricing.weekly} per week`,
          serviceType: services.map((service) => service.heading),
          founder: { "@type": "Person", name: "Arek Dvornechuck" },
          address: {
            "@type": "PostalAddress",
            streetAddress: studio.address.street,
            addressLocality: studio.address.locality,
            addressRegion: studio.address.region,
            postalCode: studio.address.postalCode,
            addressCountry: studio.address.country,
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: serviceFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.title,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        })}
      </script>
    </Helmet>

    <Navbar16 />

    <main>
      <Header107
        id="services-hero"
        title="Branding services"
        description="Based in the heart of NYC, I craft distinctive brand identities for businesses near and far — from strategy and logo design through identity systems, websites, and motion."
        images={[]}
        showToolIcons={false}
        className="pb-8 md:pb-12 lg:pb-16"
      />

      <Logo3 />

      <Layout351
        id="what-i-offer"
        tagline="What I offer"
        heading="Six services, one senior designer"
        description="Strategy, identity, web, and motion are offered together because they reinforce each other. Take the whole system or just the part you need."
        features={serviceFeatures}
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
        questions={serviceFaqs.map((faq) => ({ title: faq.title, answer: <p>{faq.answer}</p> }))}
      />

      <Cta17 />
    </main>

    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
