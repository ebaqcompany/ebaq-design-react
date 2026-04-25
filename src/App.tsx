import {
  Navbar16,
  Header78,
  Layout484,
  Pricing8,
  Comparison,
  Layout527,
  Testimonial32,
  AgentFacts,
  AboutSection,
  Footer15,
  BookerSection,
} from "./components";
import { useTracking } from "./hooks/useTracking";

function App() {
  useTracking();
  return (
    <div className="relative">
        {/* Main content - scrolls over footer */}
        <div className="relative z-10 bg-white">
          {/* Navbar */}
          <Navbar16 />

          {/* Hero Section */}
          <Header78 />

          {/* Layout484 Section */}
          <Layout484 />

          {/* Agent-readable facts and FAQ */}
          <AgentFacts />

          {/* Pricing Section */}
          <Pricing8 />

          {/* Comparison Section */}
          <Comparison />

          {/* Layout527 Section */}
          <Layout527 />

          {/* Testimonials Section */}
          <Testimonial32 />

          {/* About Section */}
          <AboutSection />

          {/* Footer */}
          <Footer15 />
        </div>

        {/* Booker Section - reveals from behind */}
        <BookerSection />
    </div>
  );
}

export default App;
