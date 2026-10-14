import { Helmet } from "react-helmet-async";
import {
  Navbar16,
  Header78,
  Layout484,
  Pricing8,
  Layout425,
  Layout350Preview,
  Banner12,
  Logo3,
  Testimonial32,
  Faq4,
  Cta17,
  Footer15,
} from "./components";
import { useTracking } from "./hooks/useTracking";

function App() {
  useTracking();
  return (
    <div className="relative">
      <Helmet>
        <title>Branding Agency NYC | Logo, Identity & Web Design | Ebaq Design</title>
        <meta
      name="description"
      content="Senior brand designer in Brooklyn, NYC. A new brand identity or rebrand in one week, guaranteed, for a flat $3,000. Websites, motion, and pitch decks at the same weekly rate."
    />
        <link rel="canonical" href="https://www.ebaqdesign.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ebaq Design" />
        <meta property="og:url" content="https://www.ebaqdesign.com/" />
        <meta property="og:title" content="Branding Agency NYC | Logo, Identity & Web Design | Ebaq Design" />
        <meta
      property="og:description"
      content="Arek Dvornechuck, senior brand designer in Brooklyn, NYC: logo, brand identity, and guidelines in one week, guaranteed, for $3,000 flat. Web, motion, and decks at $3,000 per week."
    />
        <meta property="og:image" content="https://www.ebaqdesign.com/social-x-cover-brand-grid.png" />
        <meta property="og:image:alt" content="Ebaq Design — Strategic branding for ambitious companies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Branding Agency NYC | Logo, Identity & Web Design | Ebaq Design" />
        <meta
      name="twitter:description"
      content="Brand identity in one week, guaranteed, for $3,000 flat. Senior brand designer in Brooklyn, NYC."
    />
        <meta name="twitter:image" content="https://www.ebaqdesign.com/social-x-cover-brand-grid.png" />
      </Helmet>
        {/* Main content - scrolls over footer */}
        <div className="relative z-10 bg-white">
          <Navbar16 />

          <main>
            <Banner12 />

          {/* Hero Section */}
          <Header78 />

          {/* Client logos */}
          <Logo3 />

          {/* Service offer */}
          <Layout484 />

          {/* Layout527 Section */}
          <Layout425 />

          {/* Strategy-to-launch capabilities */}
          <Layout350Preview />

          {/* Pricing Section */}
          <Pricing8 />

          {/* Testimonials Section */}
          <Testimonial32 />

          {/* FAQ Section */}
          <Faq4 />

          {/* CTA Section */}
          <Cta17 />

          </main>
          <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />

        </div>

    </div>
  );
}

export default App;
