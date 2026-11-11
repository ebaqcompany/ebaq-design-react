import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/web-development";

export const WebDevelopmentPage = () => (
  <>
    <Helmet>
      <title>Web Development: Framer, Webflow & Next.js | Ebaq Design</title>
      <meta name="description" content="Web development in Framer, Webflow, and Next.js: responsive builds, CMS setup, integrations, and launch support. $3,000/week or $10,000/month, with scope agreed upfront." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Web Development: Framer, Webflow & Next.js | Ebaq Design" />
      <meta property="og:description" content="Web development in Framer, Webflow, and Next.js: responsive builds, CMS setup, integrations, and launch support. $3,000/week or $10,000/month, with scope agreed upfront." />
    </Helmet>
    <ServiceDetailLayout
      slug="web-development"
      heading="Web development that ships what was designed"
      description="Turn your approved designs into a responsive website in Framer, Webflow, or custom Next.js, with the features, editing setup, and launch support agreed before we begin."
    />
  </>
);
