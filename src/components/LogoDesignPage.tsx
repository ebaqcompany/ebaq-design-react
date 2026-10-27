import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";
const pageUrl = "https://www.ebaqdesign.com/services/logo-design";

export const LogoDesignPage = () => (
  <>
    <Helmet>
      <title>Logo Design &amp; Refinement NYC | Ebaq Design</title>
      <meta name="description" content="Refine an existing logo, colors and typography, or create a new identity. Work directly with a senior Brooklyn designer. $3,000 total, one week guaranteed." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Logo Design & Refinement NYC | Ebaq Design" />
      <meta property="og:description" content="Refine an existing logo, colors and typography, or create a new identity. Work directly with a senior Brooklyn designer. $3,000 total, one week guaranteed." />
    </Helmet>
    <ServiceDetailLayout
      slug="logo-design"
      heading="Logo design & refinement"
      description="Improve your existing logo, colors and typography, or build a new identity. Work directly with Arek Dvornechuck, a senior designer in Brooklyn, NYC."
    />
  </>
);
