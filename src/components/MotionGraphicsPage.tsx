import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/motion-graphics";

export const MotionGraphicsPage = () => (
  <>
    <Helmet>
      <title>Motion Graphics & Logo Animation Designer | Ebaq Design</title>
      <meta name="description" content="Logo animation and motion graphics by a senior freelance designer in NYC: Lottie and video files, social motion, and website animation. $3,000 per week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Motion Graphics & Logo Animation Designer | Ebaq Design" />
      <meta property="og:description" content="Logo animation and motion graphics by a senior freelance designer in NYC: Lottie and video files, social motion, and website animation. $3,000 per week." />
    </Helmet>
    <ServiceDetailLayout
      slug="motion-graphics"
      heading="Motion graphics that make the identity move"
      description="Purposeful motion makes an identity more expressive and more memorable. Logo animation, transitions, and social assets built from the brand system you already have."
    />
  </>
);
