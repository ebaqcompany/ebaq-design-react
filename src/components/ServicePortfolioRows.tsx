import { DraggableRow, Header78Defaults, type MediaProps } from "./Header78";
import type { ServiceSlug } from "../data/services";
import { serviceMotionMedia } from "../data/serviceMotionMedia";

const placeholder: MediaProps = { type: "image", src: "/images/placeholders/relume-image.svg", alt: "Portfolio image placeholder to replace" };

export const ServicePortfolioRows = ({ slug }: { slug: ServiceSlug }) => {
  const isPlaceholder = slug === "brand-strategy" || slug === "web-development";
  const items = slug === "logo-design" ? Header78Defaults.row1
    : slug === "brand-design" ? Header78Defaults.row2.filter((item) => !item.src.includes("lyntics"))
    : slug === "web-design" ? Header78Defaults.row3
    : slug === "motion-graphics" ? serviceMotionMedia.map((item) => ({ ...item, fit: "contain" as const, bgColor: "#000" }))
    : Array.from({ length: 12 }, () => placeholder);
  const count = Math.ceil(items.length / 3);
  const rows = [items.slice(0, count), items.slice(count, count * 2), items.slice(count * 2)];
  return (
    <section id="service-portfolio" aria-label={isPlaceholder ? "Portfolio placeholders" : "Selected service work"} className="flex flex-col gap-4 overflow-hidden bg-white pb-16 md:pb-24 lg:pb-28">
      {rows.map((row, index) => (
        <div key={index} data-service-portfolio-row={index + 1}>
          <DraggableRow items={row} direction={index === 1 ? "right" : "left"} initialOffset={index === 1 ? 208 : 0} showBorder mediaAspect={slug === "motion-graphics" ? "16/9" : "4/3"} />
        </div>
      ))}
      {isPlaceholder && <p className="mt-4 px-[5%] text-center text-sm text-black/60">Work examples to be selected.</p>}
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
