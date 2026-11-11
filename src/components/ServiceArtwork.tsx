import { ServicePixelEdge } from "./ServicePixelEdge";
import type { ServiceSlug } from "../data/services";

const imageDescriptions: Record<ServiceSlug, string> = {
  "brand-strategy": "Arek leading a brand strategy workshop",
  "logo-design": "Arek reviewing printed logo concepts",
  "brand-design": "Arek reviewing brand research and design references",
  "web-design": "Arek designing at his desktop workstation",
  "web-development": "Arek in his studio with website and development screens",
  "motion-graphics": "Arek working at his studio workstation",
};

const illustrationDescriptions: Record<ServiceSlug, string> = {
  "brand-strategy": "Planning direction with a map",
  "logo-design": "Designer drawing an original mark on a tablet",
  "brand-design": "Artist developing a visual identity with color and composition",
  "web-design": "Creative work displayed on a website monitor",
  "web-development": "Working with a laptop and a data dashboard",
  "motion-graphics": "Creative expression through music and movement",
};

const vectorDescriptions: Record<ServiceSlug, string> = {
  "brand-strategy": "A positioning map with one brand standing apart from a cluster of competitors",
  "logo-design": "A logo mark drawn over circular construction guides",
  "brand-design": "Three stacked brand cards in black, blue, and white, the front one carrying the logo",
  "web-design": "A browser window with a headline, an image, and a cursor on the main button",
  "web-development": "A code window showing a large pair of angle brackets and a slash",
  "motion-graphics": "A ball bouncing along a dashed motion path",
};

export const ServiceArtwork = ({ slug, eager = false, illustrated = false, vector = false, pixelEdge = true, className = "" }: { slug: ServiceSlug; eager?: boolean; illustrated?: boolean; vector?: boolean; pixelEdge?: boolean; className?: string }) => {
  const vectorDescription = vector ? vectorDescriptions[slug] : undefined;
  return (
    <div data-tone={illustrated || vectorDescription ? "light" : undefined} data-art={vectorDescription ? "vector" : undefined} className={`service-artwork bg-brand-grid relative aspect-square w-full overflow-hidden ${className}`}>
      <img
        src={vectorDescription ? `/images/services/vector/${slug}.svg` : illustrated ? `/images/services/illustrations/${slug}.svg` : `/images/services/cutouts/${slug}.png`}
        alt={vectorDescription ?? (illustrated ? illustrationDescriptions[slug] : imageDescriptions[slug])}
        width={1080} height={1080} loading={eager ? "eager" : "lazy"} decoding="async"
        className={illustrated && !vectorDescription ? "absolute inset-[5%] block size-[90%] object-contain" : "absolute inset-0 block size-full object-contain"}
      />
      {pixelEdge && <ServicePixelEdge />}
    </div>
  );
};
