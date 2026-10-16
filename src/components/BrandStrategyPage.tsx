import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/brand-strategy";

export const BrandStrategyPage = () => (
  <>
    <Helmet>
      <title>Brand Strategy & Positioning Consultant, NYC | Ebaq Design</title>
      <meta name="description" content="Brand strategy and positioning by a senior freelance graphic designer in NYC: audit, competitors, audience, and messaging, before the logo. $3,000/week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Brand Strategy & Positioning Consultant, NYC | Ebaq Design" />
      <meta property="og:description" content="Brand strategy and positioning by a senior freelance graphic designer in NYC: audit, competitors, audience, and messaging, before the logo. $3,000/week." />
    </Helmet>
    <ServiceDetailLayout
      slug="brand-strategy"
      heading="Brand strategy that settles the hard questions first"
      description="Before a logo is worth drawing, the brand needs a position it can defend. Strategy covers the audit, the competition, the audience, and the language the brand uses to compete."
    />
  </>
);
