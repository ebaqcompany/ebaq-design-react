import type { MediaProps } from "../components/Header78";

const image = (file: string, alt: string): MediaProps => ({
  type: "image",
  src: `/images/services/brand-strategy/${file}.png`,
  alt,
  fit: "contain",
});

// Actual workshop footage and client work; source details in docs/service-imagery/brand-strategy-portfolio.md.
export const brandStrategyPortfolioRows: MediaProps[][] = [
  [
    { type: "video", src: "/images/services/brand-strategy/workshop-in-person.mp4", poster: "/images/services/brand-strategy/workshop-in-person-poster.png", alt: "Arek facilitating an in-person brand strategy workshop" },
    { type: "video", src: "/images/services/brand-strategy/workshop-remote.mp4", poster: "/images/services/brand-strategy/workshop-remote-poster.png", alt: "Arek and the Medihuanna team developing brand taglines in a remote strategy workshop" },
    { type: "image", src: "/services/arek-brand-strategy.jpg", alt: "Arek leading a strategy exercise at the whiteboard" },
  ],
  [
    image("worksheet-purpose", "Medihuanna completed brand purpose worksheet"),
    image("worksheet-audience", "Medihuanna completed target audience worksheet"),
    image("worksheet-personality", "Medihuanna completed brand personality worksheet"),
  ],
  [
    image("moodboard-credible", "Medihuanna mood board: Credible, with dark green, serif typography and botanical references"),
    image("moodboard-innovative", "Medihuanna mood board: Innovative, with purple, digital interfaces and modern typography"),
    image("moodboard-natural", "Medihuanna mood board: Natural, with warm colors and organic paper references"),
  ],
];

export const brandStrategyPortfolioLabels = [
  "Strategy workshops, in person and remotely",
  "Completed Medihuanna strategy worksheets",
  "Medihuanna client mood boards",
];
