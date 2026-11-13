import { Helmet } from "react-helmet-async";
import { founder, pricing, siteUrl, studio } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { Navbar16 } from "./Navbar16";
import { Footer15 } from "./Footer15";
import { ServiceTestimonialOptions } from "./ServiceTestimonialOptions";
import { Cta17 } from "./Cta17";
import { Header107 } from "./Header107";
import { Layout350Preview } from "./Layout350Preview";
import { Timeline18 } from "./Timeline18";
import { engagementProcessSteps } from "../data/services";
import { AboutTools } from "./AboutTools";

export const AboutPage = () => <div className="relative bg-white">
  <Helmet>
    <title>Arek Dvornechuck | Branding Expert, NYC</title>
    <meta name="description" content="Arek Dvornechuck is a Branding Expert in Brooklyn, NYC, previously at Chermayeff & Geismar & Haviv: branding, logos, websites, and motion." />
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
    <script type="application/ld+json">{serializeJsonLd(buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }], siteUrl))}</script>
  </Helmet>
  <Navbar16 />
  <main>
    <Header107 centered showToolIcons={false} title="Your senior design partner" description="Hey, I’m Arek Dvornechuck, a senior art director based in Brooklyn, New York, with over 20 years of experience. I handle strategy, identity, websites, and motion graphics." images={[
      { src: "/images/about/process/arek-studio-desk-setup.webp", alt: "Arek Dvornechuck at his studio desk", width: 1200, height: 1600 },
      { src: "/images/about/process/client-session-lobby.webp", alt: "Arek sketching logo directions during a client session", width: 576, height: 1024 },
      { src: "/images/about/process/hand-drawing-logo-construction.webp", alt: "Drawing a geometric logo by hand", width: 1200, height: 1600 },
    ]} />

    <Layout350Preview />
    <AboutTools />
    <Timeline18 tagline="How it works" heading="An overview of my branding process" description="Every project follows the same five steps, so you always know what happens next and what’s expected of you at each stage." timelineItems={engagementProcessSteps} />

    <ServiceTestimonialOptions autoPlay />
    <Cta17 heading="Need a senior creative partner?" description="Tell me what you’re launching, changing, or trying to make clearer. I’ll recommend the most effective way to move it forward." />
  </main>
  <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
</div>;
