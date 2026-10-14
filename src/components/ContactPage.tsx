import { Helmet } from "react-helmet-async";
import { bookingUrl, pricing, siteUrl, studio } from "../content/siteFacts";
import { serializeJsonLd } from "../content/structuredData";
import { Contact5 } from "./Contact5";
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
  </Helmet>
  <Navbar16 />
  <main className="min-h-[70vh]">
    <Contact5 />
  </main>
  <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
</div>;
