import { ToolReading } from "./ToolReading";
import { Helmet } from "react-helmet-async";
import { bookingUrl, pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { ContactForm } from "./ContactForm";
import { ServiceTestimonialOptions } from "./ServiceTestimonialOptions";
import { Logo3 } from "./Logo3";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";

export const ContactPage = () => <div className="relative bg-white">
  <Helmet>
    <title>Contact Ebaq Design | Start a Branding or Web Project</title>
    <meta name="description" content="Contact Ebaq Design, 495 Flatbush Ave, Brooklyn, NY. Book a free 15-minute call with Arek Dvornechuck about branding, a website, motion, or a pitch deck." />
    <link rel="canonical" href="https://www.ebaqdesign.com/contact" />
    <meta property="og:url" content="https://www.ebaqdesign.com/contact" />
    <script type="application/ld+json">{serializeJsonLd({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: `${siteUrl}/contact`,
      name: "Contact Ebaq Design",
      mainEntity: {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: studio.name,
        email: studio.email,
        telephone: studio.telephone,
        priceRange: `${pricing.weekly} per week`,
        address: { "@type": "PostalAddress", streetAddress: studio.address.street, addressLocality: studio.address.locality, addressRegion: studio.address.region, postalCode: studio.address.postalCode, addressCountry: studio.address.country },
        geo: { "@type": "GeoCoordinates", latitude: studio.geo.latitude, longitude: studio.geo.longitude },
        potentialAction: { "@type": "ReserveAction", name: "Book a 15-minute call", target: bookingUrl },
      },
    })}</script>
    <script type="application/ld+json">{serializeJsonLd(buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }], siteUrl))}</script>
  </Helmet>
  <Navbar16 />
  <main className="min-h-[70vh]">
    <ContactForm />
    <Logo3 />
    <ToolReading label="Who I work with" links={[{ label: "Clients in New York and worldwide", href: "/locations" }, { label: "Industries I work with", href: "/industries" }]} />
    <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-16">
          <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">Why me</p>
          <h2 className="mb-5 md:mb-6">Why choose Ebaq Design?</h2>
          <p className="max-w-md md:text-md">Get a clear direction and thoughtful design for your brand or website, with the scope and schedule agreed before work begins.</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-0 lg:gap-x-12">
          {[
            { label: "Direct collaboration", title: "Work directly with Arek", description: "Share your goals and feedback with the designer working on your project." },
            { label: "Strategy and design", title: "Build on a clear direction", description: "Connect your brand’s positioning with a visual identity and website that work together." },
            { label: "Clear scope", title: "Know what to expect", description: "Work is $3,000 per week, with deliverables, timing, and total agreed before booking." },
          ].map((benefit) => <article key={benefit.label} data-surface="white" className="service-card relative flex flex-col overflow-hidden rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-brand-primary/50 after:content-['']">
            <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary">{benefit.label}</p>
            <h3 className="heading-h5 font-bold">{benefit.title}</h3>
            <p className="mt-6 md:mt-8">{benefit.description}</p>
          </article>)}
        </div>
      </div>
    </section>
    <ServiceTestimonialOptions autoPlay />
  </main>
  <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
</div>;
