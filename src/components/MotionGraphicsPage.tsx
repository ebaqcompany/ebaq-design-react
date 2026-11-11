import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/motion-graphics";

export const MotionGraphicsPage = () => (
  <>
    <Helmet>
      <title>Motion Graphics & Logo Animation Designer | Ebaq Design</title>
      <meta name="description" content="Logo animation, social and website motion, promos, and basic explainers by a senior freelance designer in NYC. Scoped engagements from $3,000 per week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Motion Graphics & Logo Animation Designer | Ebaq Design" />
      <meta property="og:description" content="Logo animation, social and website motion, promos, and basic explainers by a senior freelance designer in NYC. Scoped engagements from $3,000 per week." />
    </Helmet>
    <ServiceDetailLayout
      slug="motion-graphics"
      heading="Motion Graphics"
      description="Bring your brand to life with animation for social, websites, and video. We agree on a focused selection of assets before work begins."
    />
  </>
);
