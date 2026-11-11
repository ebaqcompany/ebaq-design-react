import type { MediaProps } from "../components/Header78";

// Selected client motion: each entry is a distinct animation, not a second
// encoding of the same clip.
// VideoSources supplies the adjacent MP4 fallback for these WebM assets.
export const serviceMotionMedia: MediaProps[] = [
  {
    type: "lottie",
    src: "/case-study/nathalie-sadler/hero-logo.json",
    alt: "Nathalie Sadler logo reveal: the NS monogram draws itself before the name unfolds",
    bgColor: "#0B0B0B",
    fit: "contain",
    scale: 1.8,
  },
  {
    type: "lottie",
    src: "/case-study/brevidee/hero-logo.json",
    alt: "Brevidee logo animation",
    bgColor: "#f8e6e8",
    fit: "contain",
  },
  {
    type: "video",
    src: "/case-study/savory/11-find-your-place.webm",
    alt: "Savory wordmark and Find your place slogan with rolling split Os and Brooklyn interiors",
  },
  {
    type: "video",
    src: "/case-study/orbio/05-banner.webm",
    alt: "Orbio CREDIT coins tumbling over Intelligent spending on AI tokens",
  },
  {
    type: "video",
    src: "/case-study/fox-berman/08-social.webm",
    alt: "Fox Berman social posts combining the law firm's wordmark, orange accents, and photography",
  },
  {
    type: "video",
    src: "/case-study/orbio/16-social-wall.webm",
    alt: "Orbio social wall with moving columns of marble sculptures, Renaissance paintings, and AI headlines",
  },
  {
    type: "lottie",
    src: "/case-study/airport-executive/hero-logo.json",
    alt: "Airport Executive logo animation",
    bgColor: "#000000",
    fit: "contain",
  },
  {
    type: "video",
    src: "/case-study/orbio/11-card-carousel.webm",
    alt: "Orbio carousel of Renaissance paintings, marble details, and serif headlines",
  },
  {
    type: "video",
    src: "/case-study/orbio/12-card-where-meets.webm",
    alt: "Orbio painted cards pairing Where and Meets headlines around Renaissance artwork",
  },
  {
    type: "video",
    src: "/portfolio/motion/aero-billboards.webm",
    alt: "Three green Aero posters with animated line icons: Precise breath analysis, Insights at your fingertips, and Know how your body works",
  },
  {
    type: "video",
    src: "/case-study/airport-executive/11-escalator.webm",
    alt: "Airport escalator beside three black and gold Airport Executive digital ads in motion",
  },
];
