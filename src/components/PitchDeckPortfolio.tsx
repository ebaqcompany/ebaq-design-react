import { DraggableRow, type MediaProps } from "./Header78";

const covers: MediaProps[] = [
  {
    type: "image",
    src: "/case-study/wingnut/10-deck.webp",
    alt: "Wingnut Social pitch deck mockup",
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/octane/macbook-air.webp",
    alt: "Octane Security’s Series A pitch deck displayed on a MacBook Air",
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/periti-proposal/studio-display.webp",
    alt: "Periti Digital’s HubSpot proposal on a Studio Display",
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/medihuanna-training/imac.webp",
    alt: "Medihuanna’s practitioner-training presentation on an iMac",
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/sukoon-sample-itinerary/brochure.webp",
    alt: "Sukoon Travel Group sample itinerary as a landscape travel booklet",
  },
];

const overviews: MediaProps[] = [
  {
    type: "image",
    src: "/case-study/wingnut/10b-deck-slides.webp",
    alt: "Wingnut Social 33-slide deck overview",
    dimensions: { width: 3200, height: 4650 },
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/octane-deck-slides.webp",
    alt: "Octane Security 20-slide deck overview",
    overviewColumns: 3,
    dimensions: { width: 2409, height: 4171 },
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/periti-proposal/overview.webp",
    alt: "Periti Digital’s complete 26-slide HubSpot customer proposal template",
    dimensions: { width: 3200, height: 3726 },
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/medihuanna-training/overview.webp",
    alt: "Medihuanna’s complete 18-slide practitioner-training presentation template",
    overviewColumns: 3,
    dimensions: { width: 2409, height: 3726 },
  },
  {
    type: "image",
    src: "/case-study/pitch-decks/sukoon-sample-itinerary/overview.webp",
    alt: "Sukoon Travel Group’s complete 12-page sample itinerary brochure",
    overviewColumns: 3,
    dimensions: { width: 2409, height: 3137 },
  },
];

export const PitchDeckPortfolio = () => (
  <section id="service-portfolio" aria-label="Selected pitch deck work" className="flex flex-col gap-4 overflow-hidden bg-white pb-16 md:pb-24 lg:pb-28">
    <div data-service-portfolio-row="1" role="group" aria-label="Pitch deck covers">
      <DraggableRow items={[...covers, ...covers]} showBorder />
    </div>
    <div data-service-portfolio-row="2" role="group" aria-label="Presentation overviews">
      <DraggableRow items={overviews} direction="right" mediaAspect="natural" />
    </div>
  </section>
);
