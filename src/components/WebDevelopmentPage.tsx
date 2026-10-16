import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/web-development";

export const WebDevelopmentPage = () => (
  <>
    <Helmet>
      <title>Framer & Webflow Developer, NYC | Ebaq Design</title>
      <meta name="description" content="Framer, Webflow, and Next.js development in NYC: responsive builds, CMS setup, integrations, and launch support. One or two weeks at $3,000 per week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Framer & Webflow Developer, NYC | Ebaq Design" />
      <meta property="og:description" content="Framer, Webflow, and Next.js development in NYC: responsive builds, CMS setup, integrations, and launch support. One or two weeks at $3,000 per week." />
    </Helmet>
    <ServiceDetailLayout
      slug="web-development"
      heading="Web development that ships what was designed"
      description="The approved design built into a responsive, maintainable site in Framer or Webflow, with the CMS set up so your team can keep publishing after launch."
    />
  </>
);
