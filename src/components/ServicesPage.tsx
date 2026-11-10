import { Helmet } from "react-helmet-async";
import { pricing, studio } from "../content/siteFacts";
import { Navbar16 } from "./Navbar16";
import { ServicesGrid } from "./ServicesGrid";
import { ServiceTestimonialOptions } from "./ServiceTestimonialOptions";
import { Faq4 } from "./Faq4";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { serviceFaqs, services } from "../data/services";

const pageUrl = "https://www.ebaqdesign.com/services";

export const ServicesPage = () => (
  <div className="relative bg-white">
    <Helmet>
      <title>Graphic Design Services NYC: Branding, Logo & Web | Ebaq Design</title>
      <meta name="description" content="Branding Expert in NYC: brand strategy, logo design, brand design, web design, Framer and Webflow development, and motion. $3,000/week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Graphic Design Services NYC: Branding, Logo & Web | Ebaq Design" />
      <meta property="og:description" content="Branding Expert in NYC: brand strategy, logo design, brand design, web design, Framer and Webflow development, and motion. $3,000/week." />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://www.ebaqdesign.com/#organization",
          name: "Ebaq Design",
          description: `Branding services in Brooklyn, New York City: brand strategy, logo design, brand design, web design, development, and motion graphics. ${pricing.summary} ${pricing.guarantee}`,
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
      <ServicesGrid />

      <ServiceTestimonialOptions autoPlay />

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
