import type { ServiceSlug } from "../data/services";

const imageDescriptions: Record<ServiceSlug, string> = {
  "brand-strategy": "Arek leading a brand strategy workshop",
  "logo-design": "Arek reviewing printed logo concepts",
  "brand-design": "Arek reviewing brand research and design references",
  "web-design": "Arek designing at his desktop workstation",
  "web-development": "Arek in his studio with website and development screens",
  "motion-graphics": "Arek working at his studio workstation",
};

// Whole-cell steps share the homepage grid token and stay centered with it.
const steps = [1, 2, 1, 0, 1, 1, 2, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 2, 1, 0, 1, 2, 1, 0, 2, 1];
const pixelSteps = [...steps, ...steps, ...steps];
// One continuous silhouette avoids antialiased seams between adjacent blocks.
const edgePath = pixelSteps.reduce((path, height, column) => {
  const top = 2 - height;
  return `${path}${column === 0 ? `M0 ${top}` : ` V${top}`} H${column + 1}`;
}, "") + ` V3 H0 Z`;

export const ServiceArtwork = ({ slug, eager = false, className = "" }: { slug: ServiceSlug; eager?: boolean; className?: string }) => (
  <div className={`service-artwork bg-brand-grid relative aspect-square w-full overflow-hidden ${className}`}>
    <img
      src={`/images/services/cutouts/${slug}.png`}
      alt={imageDescriptions[slug]}
      width={1080} height={1080} loading={eager ? "eager" : "lazy"} decoding="async"
      className="absolute inset-0 block size-full object-contain"
    />
    <svg aria-hidden="true" viewBox="0 0 81 2" preserveAspectRatio="none" className="service-pixel-edge pointer-events-none absolute bottom-0">
      <path d={edgePath} />
    </svg>
  </div>
);
