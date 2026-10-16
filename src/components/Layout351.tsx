"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./ui";
import { VideoSources } from "./Media";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type Feature = {
  columnText: string;
  verticalText: string;
  horizontalText: string;
  heading: string;
  description: string;
  image: ImageProps;
  // Site additions: the services pages list deliverables and link each card.
  deliverables?: string[];
  url?: string;
  linkLabel?: string;
};

type FeatureWithState = Feature & {
  index: number;
  featureCount: number;
  isActive: boolean;
  setIsActive: () => void;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  features: Feature[];
  // Detail pages open on their own service instead of the first card.
  initialActive?: number;
};

export type Layout351Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout351 = (props: Layout351Props) => {
  const { tagline, heading, description, features, initialActive = 0, className, ...sectionProps } = {
    ...Layout351Defaults,
    ...props,
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(initialActive);

  const handleSetIsActive = (index: number) => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === index && features.filter((_, i) => i === prevIndex).length === 1) {
        return prevIndex;
      }
      return prevIndex === index ? null : index;
    });
  };

  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${className ?? ""}`.trim()} {...sectionProps}>
      <div className="container">
        <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">{tagline}</p>
          {/* An h2 rather than Relume's h1: the page hero already owns the h1. */}
          <h2 className="mb-5 md:mb-6">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="flex w-full flex-col overflow-hidden border-b border-l border-r border-border-primary lg:h-[90vh] lg:flex-row lg:border-r-0 lg:border-t">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              featureCount={features.length}
              isActive={activeIndex === index}
              setIsActive={() => handleSetIsActive(index)}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureVideo = ({ image, isActive }: { image: ImageProps; isActive: boolean }) => {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Mount the <video> only once its frame is on screen. A muted autoplay video
  // that starts below the fold (e.g. a detail page opening on this card) was
  // reproduced reporting "playing" but never painting after scrolling into
  // view; one created on screen paints reliably. It also means visitors who
  // never reach this card never download the file.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !isActive) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [isActive]);

  return (
    <div ref={frameRef} className="size-full bg-black/5">
      {isActive && inView && (
        <video
          key={image.src}
          aria-label={image.alt}
          className="size-full object-cover"
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
        >
          <VideoSources src={image.src} />
        </video>
      )}
    </div>
  );
};

const FeatureMedia = ({ image, isActive }: { image: ImageProps; isActive: boolean }) => {
  if (image.src.endsWith(".mp4")) return <FeatureVideo image={image} isActive={isActive} />;
  return <img src={image.src} alt={image.alt} loading="lazy" className="size-full object-cover" />;
};

const FeatureCard = ({ index, featureCount, isActive, setIsActive, ...feature }: FeatureWithState) => {
  const isMobile = useMediaQuery("(max-width: 991px)");
  const CardContent = isMobile ? motion.div : "div";
  const panelId = `layout351-panel-${index}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setIsActive();
  };

  return (
    <motion.div
      className="flex flex-col justify-start overflow-hidden lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-r lg:border-border-primary"
      initial={false}
      animate={{
        width: isMobile ? "100%" : isActive ? "100%" : "5rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* The trigger is the only clickable area, and it is keyboard operable. */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-controls={panelId}
        onClick={setIsActive}
        onKeyDown={handleKeyDown}
        className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center border-t border-border-primary py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between lg:border-none"
      >
        <p className={`absolute left-6 whitespace-nowrap text-xl font-bold md:left-10 md:text-2xl lg:relative lg:left-0 ${isActive ? "text-brand-primary" : ""}`}>
          {feature.columnText}
        </p>
        <h3 className="hidden [writing-mode:vertical-rl] lg:mx-auto lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
          {feature.verticalText}
        </h3>
        <p className="text-xl font-bold md:text-2xl lg:hidden">{feature.horizontalText}</p>
      </div>
      {/* Relume sets lg:min-w-[200vw] lg:overflow-auto here so text doesn't
          reflow while the card animates open. That makes a 200vw-wide scroll
          container, and Chromium won't paint a <video> inside it. The content
          below has an explicit width, so it can't reflow anyway; the card's
          own overflow-hidden does the clipping. */}
      <CardContent
        id={panelId}
        className="w-full overflow-hidden lg:h-full lg:w-auto"
        initial={false}
        animate={{
          height: isActive ? "auto" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Relume fixes this at 40rem, which assumes four cards. Every collapsed
            card and the open card's own trigger take 5rem each, so cap the width
            at what is actually left, or the copy clips on smaller desktops. */}
        <div
          className="flex h-full flex-col px-6 pb-8 pt-4 md:px-10 md:pb-12 md:pt-12 lg:w-[var(--layout351-content-width)] lg:px-12 lg:pb-12 lg:pt-12"
          style={{ "--layout351-content-width": `min(40rem, calc(90vw - ${featureCount * 5}rem))` } as React.CSSProperties}
        >
          <h4 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
            {feature.heading}
          </h4>
          <p className="md:text-md">{feature.description}</p>
          {feature.deliverables && feature.deliverables.length > 0 && (
            <ul className="mt-6 grid gap-x-6 border-t border-border-primary sm:grid-cols-2">
              {feature.deliverables.map((item) => (
                <li key={item} className="border-b border-border-primary py-2 text-sm font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          )}
          {feature.url && (
            <a href={feature.url} className="heading-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
              {feature.linkLabel ?? "Learn more"}<RxChevronRight aria-hidden="true" className="size-5" />
            </a>
          )}
          {/* On desktop the media fills whatever height the copy leaves, so the
              card never overflows its 90vh frame. */}
          <div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-8 lg:h-auto lg:min-h-0 lg:flex-1">
            <FeatureMedia image={feature.image} isActive={isActive} />
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
};

export const Layout351Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

  // Relume ships cloudfront placeholders here; the site hosts every image
  // itself, so the defaults point at local assets instead.
  features: [
    {
      columnText: "01",
      verticalText: "Feature one",
      horizontalText: "Feature one",
      heading: "Short heading goes here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      image: { src: "/case-study/aero/05-website.webp", alt: "Placeholder image 1" },
    },
    {
      columnText: "02",
      verticalText: "Feature two",
      horizontalText: "Feature two",
      heading: "Short heading goes here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      image: { src: "/case-study/elevate/01-logos.webp", alt: "Placeholder image 2" },
    },
    {
      columnText: "03",
      verticalText: "Feature three",
      horizontalText: "Feature three",
      heading: "Short heading goes here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      image: { src: "/case-study/fox-berman/12-booklet.webp", alt: "Placeholder image 3" },
    },
    {
      columnText: "04",
      verticalText: "Feature four",
      horizontalText: "Feature four",
      heading: "Short heading goes here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      image: { src: "/case-study/periti/02-macbook.webp", alt: "Placeholder image 4" },
    },
  ],
};
