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
