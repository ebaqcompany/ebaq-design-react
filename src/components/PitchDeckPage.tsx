import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";

const pageUrl = "https://www.ebaqdesign.com/services/pitch-deck";

export const PitchDeckPage = () => (
  <>
    <Helmet>
      <title>Pitch Deck Design for Startups &amp; Founders | Ebaq Design</title>
      <meta name="description" content="Investor-ready pitch deck design and storytelling for seed and Series A startups by Arek Dvornechuck in NYC. Custom slides, charts, and Figma or PowerPoint templates from $3,000/week." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Pitch Deck Design for Startups & Founders | Ebaq Design" />
      <meta property="og:description" content="Investor-ready pitch deck design and storytelling for seed and Series A startups by Arek Dvornechuck in NYC. Custom slides, charts, and Figma or PowerPoint templates from $3,000/week." />
    </Helmet>
    <ServiceDetailLayout
      slug="pitch-deck"
      heading="Pitch Decks"
      description="Turn your story, traction, and numbers into an investor-ready pitch deck that holds attention in the room and reads clearly over email."
    />
  </>
);
