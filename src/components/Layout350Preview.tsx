import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./ui";
import { LazyVideo } from "./Media";
import { Layout527Defaults } from "./Layout527";

const portfolio22Labels = ["Logo Design", "Colors & Fonts", "Stationery", "Social", "UI Design", "Websites", "Ads"];
const portfolio22Services = [
  ...Layout527Defaults.hoverLinks.slice(0, 7).map((item, index) => ({
    ...item,
    label: portfolio22Labels[index],
  })),
  {
    url: "#",
    heading: "More",
    label: "More",
    image: {
      src: "/case-study/aero-more.webp",
      alt: "More brand design work",
    },
  },
];

export type PreviewItem = { label: string; image: { src: string; alt?: string } };

type Layout350PreviewProps = {
  eyebrow?: string;
  heading?: string;
  // Landing pages pass their own case-study media. Keep it 16:9: the preview frame is aspect-video.
  items?: PreviewItem[];
};

const ServiceMedia = ({ src, alt }: { src: string; alt?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="aspect-video w-full overflow-hidden">
      {src.endsWith(".mp4") ? (
      <LazyVideo
        key={src}
        src={src}
        aria-label={alt}
        className="size-full object-contain"
        autoPlay={!reduceMotion}
        loop={!reduceMotion}
        preload="metadata"
      />
      ) : (
        <img key={src} src={src} alt={alt} loading="lazy" decoding="async" className="size-full object-contain" />
      )}
    </div>
  );
};

export const Layout350Preview = ({ eyebrow = "What I offer", heading = "Everything your brand needs", items = portfolio22Services }: Layout350PreviewProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const activeItem = items[activeIndex] ?? items[0];

  const restoreInitialPreview = () => {
    setActiveIndex(0);
    setIsInteracting(false);
  };

  return (
    <section className="overflow-hidden bg-black px-[5%] py-16 text-white md:py-24 lg:py-28" aria-labelledby="layout350-preview-heading">
      <div className="container">
        <div className="mb-12 max-w-4xl md:mb-16 lg:mb-20">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">{eyebrow}</p>
          <h2 id="layout350-preview-heading">{heading}</h2>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-12">
          <div className="sticky top-24 hidden md:block">
            <ServiceMedia src={activeItem.image.src} alt={activeItem.image.alt} />
          </div>

          <div
            className="flex flex-col gap-5"
            onMouseLeave={restoreInitialPreview}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) restoreInitialPreview();
            }}
          >
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              const isDimmed = isInteracting && !isActive;
              const isExpanded = expandedIndex === index;

              return (
                <div key={item.label}>
                  <button
                    id={`portfolio22-service-trigger-${index}`}
                    type="button"
                    aria-expanded={isMobile ? isExpanded : undefined}
                    aria-controls={isMobile ? `portfolio22-service-panel-${index}` : undefined}
                    aria-label={isMobile ? `${isExpanded ? "Hide" : "Show"} ${item.label} preview` : `Preview ${item.label}`}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setActiveIndex(index);
                        setIsInteracting(true);
                      }
                    }}
                    onFocus={() => {
                      if (!isMobile) {
                        setActiveIndex(index);
                        setIsInteracting(true);
                      }
                    }}
                    onClick={() => {
                      if (isMobile) {
                        setExpandedIndex((currentIndex) => currentIndex === index ? null : index);
                        return;
                      }
                      setActiveIndex(index);
                      setIsInteracting(true);
                    }}
                    className={`portfolio22-service group inline-block rounded-none bg-transparent p-0 text-left transition-colors duration-200 hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary ${
                      isDimmed ? "text-white/35" : ""
                    }`}
                  >
                    <span className="heading-h4 block">{item.label}</span>
                  </button>
                  {isExpanded && (
                    <div
                      id={`portfolio22-service-panel-${index}`}
                      role="region"
                      aria-labelledby={`portfolio22-service-trigger-${index}`}
                      className="mt-5 md:hidden"
                    >
                      <ServiceMedia src={item.image.src} alt={item.image.alt} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
