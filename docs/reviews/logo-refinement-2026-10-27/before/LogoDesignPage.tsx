import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/logo-design";

export const LogoDesignPage = () => (
  <>
    <Helmet>
      <title>Logo Designer NYC: Custom Logo Design | Ebaq Design</title>
      <meta name="description" content="Custom logo design by a senior freelance graphic designer in New York: sketches, concepts, revisions, final files, and a logo animation. $3,000, one week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Logo Designer NYC: Custom Logo Design | Ebaq Design" />
      <meta property="og:description" content="Custom logo design by a senior freelance graphic designer in New York: sketches, concepts, revisions, final files, and a logo animation. $3,000, one week." />
    </Helmet>
    <ServiceDetailLayout
      slug="logo-design"
      heading="Logo design that carries the brand idea"
      description="A distinctive, practical mark that captures the brand idea and stays legible everywhere it is used, from an app icon to signage. Concepts, refinement, and a full responsive set."
    />
  </>
);
