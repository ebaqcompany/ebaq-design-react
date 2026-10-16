import { Helmet } from "react-helmet-async";
import { founder, pricing, siteUrl, studio } from "../content/siteFacts";
import { serializeJsonLd } from "../content/structuredData";
import { Navbar16 } from "./Navbar16";
import { Footer15 } from "./Footer15";
import { Testimonial32 } from "./Testimonial32";
import { Cta17 } from "./Cta17";
import { Timeline10 } from "./Timeline10";
import { Header107 } from "./Header107";
import { Layout350Preview } from "./Layout350Preview";

export const AboutPage = () => <div className="relative bg-white">
  <Helmet>
    <title>Arek Dvornechuck | Senior Freelance Graphic Designer, NYC</title>
    <meta name="description" content="Arek Dvornechuck is a senior freelance graphic designer in Brooklyn, NYC, previously at Chermayeff & Geismar & Haviv: branding, logos, websites, and motion." />
    <link rel="canonical" href="https://www.ebaqdesign.com/about" />
    <meta property="og:url" content="https://www.ebaqdesign.com/about" />
    <script type="application/ld+json">{serializeJsonLd({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${siteUrl}/about#profile`,
      url: `${siteUrl}/about`,
      name: "About Arek Dvornechuck",
      mainEntity: {
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        name: founder.name,
        jobTitle: founder.jobTitle,
        description: `${founder.jobTitle} in ${studio.location} with ${founder.experience} of experience, including work at ${founder.formerStudio.name} (${founder.formerStudio.year}). ${pricing.summary} ${pricing.guarantee}`,
        image: `${siteUrl}${founder.image}`,
        worksFor: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
        alumniOf: { "@type": "Organization", name: founder.formerStudio.name, url: founder.formerStudio.url },
        homeLocation: { "@type": "Place", name: studio.location },
        knowsAbout: founder.knowsAbout,
        sameAs: founder.sameAs,
      },
    })}</script>
  </Helmet>
  <Navbar16 />
  <main>
    <Header107 />

    <Layout350Preview />
    <Timeline10 taglineClassName="text-brand-primary" />

    <Testimonial32 />
    <Cta17 heading="Need a senior creative partner?" description="Tell me what you’re launching, changing, or trying to make clearer. I’ll recommend the most effective way to move it forward." />
  </main>
  <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
</div>;
