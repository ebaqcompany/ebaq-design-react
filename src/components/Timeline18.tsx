import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Button, type ButtonProps } from "./ui";
import { brandProcessPhotos } from "../data/brandProcessPhotos";

// Restores the pre-pasted Relume Timeline18 adaptation: photo milestones on a
// full-width track. Pin only when the complete track content fits vertically;
// narrow/short screens and reduced motion retain a native horizontal scroller.
type TimelineItem = { heading: string; title: string; description: string; buttons: ButtonProps[] };
type Props = { tagline: string; taglineClassName?: string; heading: string; description: string; timelineItems: TimelineItem[] };

export const Timeline18 = ({ tagline, taglineClassName = "text-brand-primary", heading, description, timelineItems }: Props) => {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const distanceRef = useRef(0);
  const pinnedRef = useRef(false);
  const [pinned, setPinned] = useState(false);
  const [runwayHeight, setRunwayHeight] = useState<number>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const runway = runwayRef.current, stage = stageRef.current, content = contentRef.current;
    const viewport = viewportRef.current, track = trackRef.current;
    if (!runway || !stage || !content || !viewport || !track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pinnedRef.current) viewport.scrollLeft = Math.min(distanceRef.current, Math.max(0, -runway.getBoundingClientRect().top));
      const card = track.firstElementChild as HTMLElement | null;
      setCurrentIndex(Math.min(timelineItems.length - 1, Math.round(viewport.scrollLeft / Math.max(1, card?.offsetWidth ?? 1))));
    };
    const queueUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      const travel = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      distanceRef.current = travel;
      const styles = getComputedStyle(stage);
      const completeHeight = content.getBoundingClientRect().height + parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const enabled = !reduced.matches && window.innerWidth >= 1024 && completeHeight + 32 <= window.innerHeight && travel > 0;
      pinnedRef.current = enabled;
      setPinned(enabled);
      setRunwayHeight(enabled ? window.innerHeight + travel : undefined);
      queueUpdate();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport); observer.observe(track); observer.observe(content);
    window.addEventListener("resize", measure);
    reduced.addEventListener("change", measure);
    window.addEventListener("scroll", queueUpdate, { passive: true });
    viewport.addEventListener("scroll", queueUpdate, { passive: true });
    measure();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure); reduced.removeEventListener("change", measure);
      window.removeEventListener("scroll", queueUpdate); viewport.removeEventListener("scroll", queueUpdate);
    };
  }, [timelineItems.length]);

  const moveTo = useCallback((position: number) => {
    const viewport = viewportRef.current, runway = runwayRef.current;
    if (!viewport || !runway) return;
    const target = Math.max(0, Math.min(distanceRef.current, position));
    if (pinnedRef.current) window.scrollTo({ top: window.scrollY + runway.getBoundingClientRect().top + target, behavior: "instant" });
    else viewport.scrollTo({ left: target, behavior: "instant" });
  }, []);
  const move = (direction: number) => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    moveTo((viewportRef.current?.scrollLeft ?? 0) + direction * (card?.offsetWidth ?? 0));
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
    if (event.key === "Home" || event.key === "End") { event.preventDefault(); moveTo(event.key === "Home" ? 0 : distanceRef.current); }
  };

  return (
    <section id="brand-design-process" aria-labelledby="brand-design-process-heading" className="bg-brand-light pt-16 md:pt-24 lg:pt-28">
      <div className="px-[5%]">
        <header className="container mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className={`mb-3 font-semibold md:mb-4 ${taglineClassName}`}>{tagline}</p>
          <h2 id="brand-design-process-heading" className="mb-5 md:mb-6">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </header>
      </div>
      <div ref={runwayRef} data-timeline-runway style={{ height: runwayHeight }}>
        <div ref={stageRef} data-timeline-stage data-pinned={pinned} className={`flex flex-col justify-center bg-brand-light py-8 md:py-12 ${pinned ? "sticky top-0 min-h-[100svh]" : ""}`}>
          <div ref={contentRef}>
            <div ref={viewportRef} data-timeline-viewport tabIndex={0} role="region" aria-label="Brand design process steps. Use left and right arrow keys to browse." onKeyDown={onKeyDown} className={`w-full ${pinned ? "overflow-x-hidden" : "overflow-x-auto snap-x snap-mandatory"} overscroll-x-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-black`}>
              <ol ref={trackRef} className="m-0 flex w-max min-w-full list-none py-4">
                {timelineItems.map((item, index) => (
                  <li key={item.heading} className="w-screen shrink-0 snap-start md:w-[50vw] xl:w-[33.333333vw]">
                    <div data-timeline-photo className="mx-auto mb-8 aspect-[4/3] w-3/5 max-w-[22rem] overflow-hidden">
                      <img src={brandProcessPhotos[index].src} alt={brandProcessPhotos[index].alt} width={brandProcessPhotos[index].width} height={brandProcessPhotos[index].height} loading="lazy" decoding="async" style={{ objectPosition: brandProcessPhotos[index].objectPosition }} className="block size-full rounded-lg object-cover" />
                    </div>
                    <div data-timeline-marker aria-hidden="true" className="mb-6 flex w-full items-center">
                      <div className="h-[3px] w-full bg-brand-primary" />
                      <div className="z-10 size-4 flex-none rounded-full bg-brand-primary shadow-[0_0_0_8px_var(--color-brand-light)]" />
                      <div className="h-[3px] w-full bg-brand-primary" />
                    </div>
                    <div className="px-6 text-center md:px-8 lg:px-12">
                      <p className="mb-3 font-semibold text-brand-primary">{item.heading}</p>
                      <h3 className="heading-h5 mb-4">{item.title}</h3>
                      <p>{item.description}</p>
                      {item.buttons.length > 0 && <div className="mt-6 flex flex-wrap justify-center gap-4">{item.buttons.map((button, buttonIndex) => <Button key={buttonIndex} {...button}>{button.title}</Button>)}</div>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className="sr-only" aria-live="polite">Showing process steps from {currentIndex + 1} of {timelineItems.length}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
