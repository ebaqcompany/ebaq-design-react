import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@relume_io/relume-ui";
import { Layout527Defaults } from "./Layout527";

const portfolio22Labels = ["Logo Design", "Colors & Fonts", "Stationery", "Social", "UI Design", "Websites", "Ads"];
const portfolio22Services = Layout527Defaults.hoverLinks.slice(0, 7).map((item, index) => ({
  ...item,
  label: portfolio22Labels[index],
}));

type Layout350PreviewProps = {
  eyebrow?: string;
  heading?: string;
};

const ServiceMedia = ({ src, alt }: { src: string; alt?: string }) => {
  const reduceMotion = useReducedMotion();

  if (src.endsWith(".mp4")) {
    return (
      <video
        key={src}
        src={src}
        aria-label={alt}
        className="h-auto max-h-[80vh] w-full object-contain"
        autoPlay={!reduceMotion}
        loop={!reduceMotion}
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return <img key={src} src={src} alt={alt} className="h-auto max-h-[80vh] w-full object-contain" />;
};

export const Layout350Preview = ({ eyebrow = "What I offer", heading = "Everything your brand needs" }: Layout350PreviewProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const activeItem = portfolio22Services[activeIndex] ?? portfolio22Services[0];

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

        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-16 lg:gap-20">
          <div className="sticky top-24 hidden md:block">
            <ServiceMedia src={activeItem.image.src} alt={activeItem.image.alt} />
          </div>

          <div
            className="flex flex-col gap-7 md:gap-9"
            onMouseLeave={restoreInitialPreview}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) restoreInitialPreview();
            }}
          >
            {portfolio22Services.map((item, index) => {
              const isActive = activeIndex === index;
              const isDimmed = isInteracting && !isActive;
              const isExpanded = expandedIndex === index;

              return (
                <div key={item.heading}>
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
                    className={`portfolio22-service group block w-full rounded-none bg-transparent p-0 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary ${
                      isDimmed ? "text-white/35" : "text-white"
                    }`}
                  >
                    <span className="block font-heading text-3xl font-bold leading-none md:text-4xl lg:text-5xl">{item.label}</span>
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
