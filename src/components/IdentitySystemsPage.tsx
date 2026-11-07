import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/brand-design";

export const IdentitySystemsPage = () => (
  <>
    <Helmet>
      <title>Brand Design Design & Guidelines, NYC | Ebaq Design</title>
      <meta name="description" content="Brand design in NYC: color, typography, guidelines on guidelines.online, icons, decks, and social graphics. One-week Brand Sprint, $3,000 flat." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Brand Design Design & Guidelines, NYC | Ebaq Design" />
      <meta property="og:description" content="Brand design in NYC: color, typography, guidelines on guidelines.online, icons, decks, and social graphics. One-week Brand Sprint, $3,000 flat." />
    </Helmet>
    <ServiceDetailLayout
      slug="brand-design"
      heading="Brand Design"
      description="The logo is one piece. An identity system turns it into a coherent visual language so every touchpoint reads as the same brand without a designer in the room."
    />
  </>
);
