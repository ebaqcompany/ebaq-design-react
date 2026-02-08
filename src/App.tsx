import {
  Loader3,
  Navbar16,
  Header78,
  Layout348,
  Testimonial32,
  Pricing8,
  Layout488,
  Footer15,
} from "./components";

function App() {
  return (
    <div className="relative">
      {/* Loader */}
      <Loader3 />

      {/* Main Content */}
      <div className="relative">
        {/* Navbar */}
        <Navbar16 />

        {/* Hero Section */}
        <Header78 />

        {/* Features Section */}
        <Layout348 />

        {/* Testimonials Section */}
        <Testimonial32 />

        {/* Pricing Section */}
        <Pricing8 />

        {/* CTA Section */}
        <Layout488 />

        {/* Footer */}
        <Footer15 />
      </div>
    </div>
  );
}

export default App;
