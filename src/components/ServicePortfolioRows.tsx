import { DraggableRow, Header78Defaults, type MediaProps } from "./Header78";
import { brandStrategyPortfolioRows, brandStrategyPortfolioLabels } from "../data/brandStrategyPortfolio";
import type { ServiceSlug } from "../data/services";
import { serviceMotionMedia } from "../data/serviceMotionMedia";

const placeholder: MediaProps = { type: "image", src: "/images/placeholders/relume-image.svg", alt: "Portfolio image placeholder to replace" };

export const ServicePortfolioRows = ({ slug }: { slug: ServiceSlug }) => {
  const items = slug === "logo-design" ? Header78Defaults.row1
    : slug === "brand-design" ? Header78Defaults.row2.filter((item) => !item.src.includes("lyntics"))
    : slug === "web-design" ? Header78Defaults.row3
    : slug === "web-development" ? [
      { type: "image" as const, src: "/case-study/savory/25-website-design.jpg", alt: "The Savory Team website design with New York skyline and rooftop terrace photography", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/spark/07-website.webp", alt: "Spark website design", fit: "cover" as const },
      { type: "video" as const, src: "/case-study/orbio/04-heroes.webm", alt: "Orbio website hero designs", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/next-dimension/old-site/04-website.webp", alt: "NextDimension website design", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/aero/05-website.webp", alt: "Aero website design", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/elevate/03-website.webp", alt: "Elevate website design", position: "top" as const, fit: "cover" as const },
      { type: "image" as const, src: "/case-study/brevidee/10-website.webp", alt: "Brevidee website design", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/wingnut/03-website.webp", alt: "Wingnut website design", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/ventur/06-website.webp", alt: "Ventur website design", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/airport-executive/07-website.webp", alt: "Airport Executive website design", fit: "cover" as const },
      { type: "video" as const, src: "/case-study/sweetgrass/02-product.webm", alt: "Sweetgrass product video", fit: "cover" as const },
      { type: "image" as const, src: "/case-study/periti/02-macbook.webp", alt: "Periti website on a MacBook", fit: "cover" as const },
      { type: "video" as const, src: "/case-study/medihuanna/03-product.webm", alt: "Medihuanna product video", fit: "cover" as const },
    ]
    : slug === "motion-graphics" ? serviceMotionMedia.map((item) => ({ ...item, fit: "cover" as const }))
    : Array.from({ length: 12 }, () => placeholder);
  const count = Math.ceil(items.length / 3);
  const rows = slug === "brand-strategy" ? brandStrategyPortfolioRows : [items.slice(0, count), items.slice(count, count * 2), items.slice(count * 2)];
  return (
    <section id="service-portfolio" aria-label="Selected service work" className="flex flex-col gap-4 overflow-hidden bg-white pb-16 md:pb-24 lg:pb-28">
      {rows.map((row, index) => (
        <div key={index} data-service-portfolio-row={index + 1} role={slug === "brand-strategy" ? "group" : undefined} aria-label={slug === "brand-strategy" ? brandStrategyPortfolioLabels[index] : undefined}>
          <DraggableRow items={row} direction={index === 1 ? "right" : "left"} initialOffset={index === 1 ? 208 : 0} showBorder={slug !== "motion-graphics"} mediaAspect={slug === "motion-graphics" || (slug === "brand-strategy" && index === 0) ? "16/9" : "4/3"} />
        </div>
      ))}
    </section>
  );
};

export const serviceHighlightHeadings: Record<ServiceSlug, readonly [string, string, string]> = {
  "brand-strategy": ["Find your direction", "Know your audience", "Stand for something"],
  "logo-design": ["Capture the idea", "Make it distinctive", "Make your mark"],
  "brand-design": ["More than a logo", "One visual language", "Ready to launch"],
  "web-design": ["Make a first impression", "Guide the experience", "Inspire action"],
  "web-development": ["Bring the design to life", "Make it work everywhere", "Ready to go live"],
  "motion-graphics": ["Bring your brand to life", "Make every move count", "Leave an impression"],
};
