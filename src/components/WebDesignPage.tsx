import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/web-design";

export const WebDesignPage = () => (
  <>
    <Helmet>
      <title>Website Designer NYC: Figma, Framer & Webflow | Ebaq Design</title>
      <meta name="description" content="Website design by a senior freelance designer in New York: responsive Figma designs and development in Framer, Webflow, or Next.js. $3,000/week or $10,000/month." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Website Designer NYC: Figma, Framer & Webflow | Ebaq Design" />
      <meta property="og:description" content="Website design by a senior freelance designer in New York: responsive Figma designs and development in Framer, Webflow, or Next.js. $3,000/week or $10,000/month." />
    </Helmet>
    <ServiceDetailLayout
      slug="web-design"
      heading="Web design that turns the brand into a site"
      description="A clear, responsive website experience designed in Figma, from wireframes through final UI, with the messaging worked out alongside the layout rather than after it."
    />
  </>
);
