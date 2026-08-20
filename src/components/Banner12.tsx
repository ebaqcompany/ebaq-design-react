import { useEffect, useRef } from "react";

type Props = { headings: string[]; scrollDriven: boolean };
export type Banner12Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Banner12 = (props: Banner12Props) => {
  const { headings, scrollDriven, className, ...sectionProps } = { ...Banner12Defaults, ...props };
  const loopHeadings = [...headings, ...headings, ...headings];
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollDriven) return;
    const track = trackRef.current;
    const group = track?.firstElementChild as HTMLElement | null;
    if (!track || !group) return;

    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = false;
    const update = () => {
      frame = 0;
      const groupWidth = group.getBoundingClientRect().width;
      track.style.transform = `translate3d(${-groupWidth + window.scrollY * 0.12}px, 0, 0)`;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const deactivate = () => {
      if (!active) return;
      active = false;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      track.style.removeProperty("transform");
    };
    const syncMotion = () => {
      const shouldRun = desktopQuery.matches && !reducedMotionQuery.matches;
      if (!shouldRun) {
        deactivate();
        return;
      }
      if (active) return;
      active = true;
      update();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
    };

    syncMotion();
    desktopQuery.addEventListener("change", syncMotion);
    reducedMotionQuery.addEventListener("change", syncMotion);
    return () => {
      deactivate();
      desktopQuery.removeEventListener("change", syncMotion);
      reducedMotionQuery.removeEventListener("change", syncMotion);
    };
  }, [scrollDriven]);

  return <section {...sectionProps} className={`services-marquee bg-brand-grid ${scrollDriven ? "services-marquee--scroll-driven" : ""} ${className ?? ""}`}><div ref={trackRef} className="services-marquee-track"><div className="services-marquee-group">{loopHeadings.map((heading, i) => <div key={i} className="flex shrink-0 items-center justify-center"><h2 className="whitespace-nowrap text-md md:text-lg">{heading}</h2></div>)}</div><div aria-hidden className="services-marquee-group">{loopHeadings.map((heading, i) => <div key={i} className="flex shrink-0 items-center justify-center"><h2 className="whitespace-nowrap text-md md:text-lg">{heading}</h2></div>)}</div></div></section>;
};

export const Banner12Defaults: Props = { headings: ["Brand Strategy", "Custom Logo Design", "Logo Animation", "Color Palette", "Type System", "Brand Guidelines", "Figma Web Design", "Framer Dev", "Webflow Dev", "Messaging", "Pitch Decks", "Social Media Graphics", "Motion Graphics"], scrollDriven: false };
