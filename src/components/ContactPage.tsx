import { Helmet } from "react-helmet-async";
import { Contact5 } from "./Contact5";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";

export const ContactPage = () => <div className="relative bg-white">
  <Helmet>
    <title>Contact Ebaq Design | Start a Branding or Web Project</title>
    <meta name="description" content="Contact Arek Dvornechuck at Ebaq Design to discuss branding, identity, web design, or ongoing creative direction." />
    <link rel="canonical" href="https://ebaqdesign.com/contact" />
    <meta property="og:url" content="https://ebaqdesign.com/contact" />
  </Helmet>
  <Navbar16 />
  <main className="min-h-[70vh]">
    <Contact5 />
  </main>
  <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
</div>;
