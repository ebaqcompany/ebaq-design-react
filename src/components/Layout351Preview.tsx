import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@relume_io/relume-ui";
import { Layout527Defaults } from "./Layout527";

const legacyDeliverables = Layout527Defaults.hoverLinks;
export const aboutDeliverables = [
  legacyDeliverables[0],
  legacyDeliverables[1],
  legacyDeliverables[2],
  legacyDeliverables[3],
  { ...legacyDeliverables[4], heading: "Web Design" },
  { ...legacyDeliverables[5], heading: "Web Development" },
  { ...legacyDeliverables[6], heading: "Ads & Campaigns" },
  {
    url: "#",
    heading: "Motion Graphics",
    image: { src: "/case-study/aero/15-wall.mp4", alt: "Aero wall installation in motion" },
  },
  legacyDeliverables[7],
  legacyDeliverables[8],
];

export const aboutPanelCopy = [
  { heading: "A custom logo built to last.", description: "Create a distinctive, practical mark that stays clear across digital and physical applications." },
  { heading: "A distinctive visual system.", description: "Define a clear color palette and type system that gives the brand a consistent character." },
  { heading: "The identity, made tangible.", description: "Carry the visual system into practical collateral that makes every brand touchpoint feel connected." },
  { heading: "A consistent social presence.", description: "Create recognizable social graphics that extend the identity across the channels your audience uses." },
  { heading: "A website that converts.", description: "Design a clear Figma UX/UI experience that brings the brand to life and guides visitors toward action." },
  { heading: "A reliable Framer or Webflow build.", description: "Turn the approved design into a responsive, maintainable website with careful implementation and launch support." },
  { heading: "Campaigns with a recognizable voice.", description: "Extend the identity across advertising and campaign formats without losing clarity or consistency." },
  { heading: "Motion that carries the brand.", description: "Use purposeful animation to make the identity more expressive across brand, social, and digital channels." },
  { heading: "A system for every touchpoint.", description: "Apply the identity wherever the brand needs to show up while keeping the visual language coherent." },
  { heading: "Support beyond the core scope.", description: "Extend the system into the additional launch-ready assets the brand needs to move forward." },
];

const DeliverableMedia = ({ src, alt }: { src: string; alt?: string }) => {
  const reduceMotion = useReducedMotion();
  if (src.endsWith(".mp4")) {
    return <video key={src} src={src} aria-label={alt} className="size-full object-cover" autoPlay={!reduceMotion} loop={!reduceMotion} muted playsInline preload="metadata" />;
  }
  return <img key={src} src={src} alt={alt} className="size-full object-cover" />;
};

export const Layout351Preview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hoverLocked = useRef(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    aboutDeliverables.forEach(({ image }) => {
      if (image.src.endsWith(".mp4")) return;
      const preloadImage = new Image();
      preloadImage.src = image.src;
    });
  }, []);

  const selectPanel = (index: number) => setActiveIndex(index);

  const handleDesktopHover = (index: number) => {
    if (isMobile || hoverLocked.current) return;
    if (!reduceMotion) {
      hoverLocked.current = true;
      window.setTimeout(() => { hoverLocked.current = false; }, 350);
    }
    selectPanel(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % aboutDeliverables.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + aboutDeliverables.length) % aboutDeliverables.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = aboutDeliverables.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectPanel(nextIndex);
    triggerRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="overflow-hidden bg-white px-[5%] py-16 text-black md:py-24 lg:py-28" aria-labelledby="layout351-preview-heading">
      <div className="container">
        <div className="mb-12 max-w-4xl md:mb-16 lg:mb-20">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">What I offer</p>
          <h2 id="layout351-preview-heading">10k goes a long way. All this plus much more.</h2>
        </div>

        <div role="tablist" aria-label="Vertical service deliverables" aria-orientation="vertical" className="flex w-full flex-col gap-4 py-1">
          {aboutDeliverables.map((item, index) => {
            const isActive = activeIndex === index;
            const copy = aboutPanelCopy[index];
            return (
              <motion.div
                key={item.heading}
                className="vector-card flex w-full flex-col justify-start"
                onMouseEnter={() => handleDesktopHover(index)}
                initial={false}
                animate={{ width: "100%" }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
              >
                <div className="vector-card-handles" aria-hidden="true">
                  <span className="vector-card-handle vector-card-handle-top-left" />
                  <span className="vector-card-handle vector-card-handle-top-right" />
                  <span className="vector-card-handle vector-card-handle-bottom-right" />
                  <span className="vector-card-handle vector-card-handle-bottom-left" />
                </div>
                <button
                  ref={(element) => { triggerRefs.current[index] = element; }}
                  id={`layout351-deliverable-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`layout351-deliverable-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectPanel(index)}
                  onFocus={() => selectPanel(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="service-text-tab layout351-panel-trigger relative flex w-full cursor-pointer items-center rounded-none bg-transparent px-6 py-3 text-left text-black md:px-10 md:py-4"
                >
                  <span className="w-full font-heading text-xl font-bold md:text-2xl">{item.heading}</span>
                </button>

                <motion.div
                  id={`layout351-deliverable-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`layout351-deliverable-tab-${index}`}
                  className="w-full overflow-hidden"
                  initial={false}
                  animate={{ height: isActive ? "auto" : "0px" }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                >
                  <div className="grid gap-8 px-6 pb-8 pt-4 md:px-10 md:pb-12 md:pt-8 lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)] lg:items-start lg:gap-12 lg:px-12 lg:pb-16 lg:pt-12">
                    <div>
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">{copy.heading}</h3>
                    <p className="text-black/60 md:text-md">{copy.description}</p>
                    </div>
                    <div className="aspect-video overflow-hidden bg-black">
                      <DeliverableMedia src={item.image.src} alt={item.image.alt} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
