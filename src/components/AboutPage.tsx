import { Helmet } from "react-helmet-async";
import { Navbar16 } from "./Navbar16";
import { Footer15 } from "./Footer15";
import { Testimonial32 } from "./Testimonial32";
import { Cta17 } from "./Cta17";
import { Timeline10 } from "./Timeline10";
import { Header107 } from "./Header107";
import { Layout350Preview } from "./Layout350Preview";

export const AboutPage = () => <div className="relative bg-white">
  <Helmet>
    <title>About Arek Dvornechuck | Ebaq Design</title>
    <meta name="description" content="Meet Arek Dvornechuck, a New York-based senior designer and art director working directly with companies worldwide across brand, web, and motion." />
    <link rel="canonical" href="https://ebaqdesign.com/about" />
    <meta property="og:url" content="https://ebaqdesign.com/about" />
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
