import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { VideoSources, isVideoSrc, useNearViewport } from "./Media";

// The Brand Sprint week as three stages on one track (Relume Timeline 18 structure: centered
// steps on a marker line), with a collage stage above it. Each collage is a short "build-in"
// clip: it plays forward when its step opens and scrubs backwards when the step closes.
// Media can be a video (.mp4 with a .webm beside it) or a still image; stills cross-fade.
type SprintStep = { when: string; title: string; description: string; media: string; alt: string };

// PLACEHOLDER MEDIA: the three clips are stand-ins and must be replaced before this ships.
const steps: SprintStep[] = [
  { when: "Early week", title: "Kick off and explore", description: "We lock the scope on the kickoff call. Then I explore several logo concepts for your brand.", media: "/images/site/sprint-week/placeholder-step-1.mp4", alt: "Kickoff notes and early logo concepts" },
  { when: "Mid-week", title: "Review and refine", description: "You review the work and choose a direction. We refine it together with your colors and typography.", media: "/images/site/sprint-week/placeholder-step-2.mp4", alt: "The chosen direction being refined with colors and typography" },
  { when: "End of week", title: "Get your brand", description: "You receive your final logo files, logo animation, guidelines, and launch assets, ready to use.", media: "/images/site/sprint-week/placeholder-step-3.mp4", alt: "Final brand files, guidelines, and launch assets" },
];

const OUTRO_MS = 450;
// Scroll distance per step while pinned, as a share of the viewport height.
const STEP_TRAVEL = 0.6;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const BrandSprintWeek = () => {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pinnedRef = useRef(false);
  const reducedRef = useRef(false);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const busyRef = useRef(false);
  const startedRef = useRef(false);
  const [pinned, setPinned] = useState(false);
  const [runwayHeight, setRunwayHeight] = useState<number>();
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const { ref: nearRef, near, inView } = useNearViewport<HTMLDivElement>("300px");

  // Pin the section and let page scroll step through the week, only when the whole stage fits on screen.
  useEffect(() => {
    const runway = runwayRef.current, stage = stageRef.current;
    if (!runway || !stage) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!pinnedRef.current) return;
      const travel = window.innerHeight * STEP_TRAVEL;
      const index = Math.round(-runway.getBoundingClientRect().top / travel);
      setActive(Math.max(0, Math.min(steps.length - 1, index)));
    };
    const queueUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      reducedRef.current = reduced.matches;
      const contentHeight = Array.from(stage.children).reduce((sum, child) => sum + (child as HTMLElement).scrollHeight, 0);
      const enabled = !reduced.matches && window.innerWidth >= 1024 && contentHeight <= window.innerHeight;
      pinnedRef.current = enabled;
      setPinned(enabled);
      setRunwayHeight(enabled ? window.innerHeight * (1 + STEP_TRAVEL * (steps.length - 1)) : undefined);
      queueUpdate();
    };
    const observer = new ResizeObserver(measure);
    Array.from(stage.children).forEach((child) => observer.observe(child));
    window.addEventListener("resize", measure);
    reduced.addEventListener("change", measure);
    window.addEventListener("scroll", queueUpdate, { passive: true });
    measure();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure); reduced.removeEventListener("change", measure);
      window.removeEventListener("scroll", queueUpdate);
    };
  }, []);

  const intro = useCallback((index: number) => {
    const video = mediaRefs.current[index];
    if (!video) return;
    if (reducedRef.current) { video.currentTime = video.duration || 0; return; }
    video.currentTime = 0;
    video.play().catch(() => undefined);
  }, []);

  // Scrub the open clip back to its empty first frame; stills simply wait out their fade.
  const outro = useCallback(async (index: number) => {
    const video = mediaRefs.current[index];
    if (reducedRef.current) return;
    if (!video || !video.duration) return wait(isVideoSrc(steps[index].media) ? 0 : OUTRO_MS);
    video.pause();
    const from = video.currentTime;
    await new Promise<void>((resolve) => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / OUTRO_MS);
        video.currentTime = from * (1 - progress);
        if (progress < 1) requestAnimationFrame(tick); else resolve();
      };
      requestAnimationFrame(tick);
    });
  }, []);

  // Media follows the active step one transition at a time, always heading for the latest target.
  useEffect(() => {
    targetRef.current = active;
    if (busyRef.current || !startedRef.current) return;
    busyRef.current = true;
    (async () => {
      while (shownRef.current !== targetRef.current) {
        await outro(shownRef.current);
        shownRef.current = targetRef.current;
        setShown(shownRef.current);
        await wait(60);
        intro(shownRef.current);
      }
      busyRef.current = false;
    })();
  }, [active, intro, outro]);

  // First build-in runs when the stage scrolls into view.
  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    shownRef.current = targetRef.current;
    setShown(shownRef.current);
    const frame = requestAnimationFrame(() => intro(shownRef.current));
    return () => cancelAnimationFrame(frame);
  }, [inView, intro]);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    const runway = runwayRef.current;
    if (pinnedRef.current && runway) {
      window.scrollTo({ top: window.scrollY + runway.getBoundingClientRect().top + next * window.innerHeight * STEP_TRAVEL, behavior: "smooth" });
    } else setActive(next);
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const next = Math.max(0, Math.min(steps.length - 1, active + direction));
    goTo(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section id="brand-sprint-week" aria-labelledby="brand-sprint-week-heading" className="bg-white">
      <div ref={runwayRef} data-sprint-runway style={{ height: runwayHeight }}>
        <div ref={stageRef} data-pinned={pinned} className={`flex flex-col ${pinned ? "sticky top-0 min-h-[100svh]" : ""}`}>
          <div data-tone="dark" className="bg-brand-grid flex flex-1 flex-col justify-end overflow-hidden px-[5%] pt-16 md:pt-20">
            <div className="container">
              <header className="mx-auto mb-8 max-w-lg text-center md:mb-12">
                <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">The Brand Sprint</p>
                <h2 id="brand-sprint-week-heading" className="text-white">Your brand, built in one week</h2>
              </header>
              <div ref={nearRef} className="relative">
                <div id="brand-sprint-week-stage" className="relative aspect-[2/1] overflow-hidden md:aspect-[96/25]">
                  {steps.map((step, index) => isVideoSrc(step.media) ? (
                    near && <video key={step.media} ref={(node) => { mediaRefs.current[index] = node; }} aria-label={step.alt} muted playsInline preload="auto" className={`absolute inset-0 size-full object-cover mix-blend-screen ${shown === index ? "visible" : "invisible"}`}>
                      <VideoSources src={step.media} />
                    </video>
                  ) : (
                    <img key={step.media} src={step.media} alt={step.alt} loading="lazy" decoding="async" className={`absolute inset-0 size-full object-contain transition-opacity duration-500 ${shown === index ? "opacity-100" : "opacity-0"}`} />
                  ))}
                </div>
                <div className="flex justify-center gap-4 pb-10 pt-4 md:pointer-events-none md:absolute md:inset-0 md:items-center md:justify-between md:p-0">
                  <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous stage of the week" className="button-inverted button-inverted--dark-surface disabled:opacity-30 md:pointer-events-auto"><BiLeftArrowAlt aria-hidden="true" className="size-6" /></button>
                  <button type="button" onClick={() => goTo(active + 1)} disabled={active === steps.length - 1} aria-label="Next stage of the week" className="button-inverted button-inverted--dark-surface disabled:opacity-30 md:pointer-events-auto"><BiRightArrowAlt aria-hidden="true" className="size-6" /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-black px-[5%] pb-16 md:pb-20">
            <div role="group" aria-label="Stages of the Brand Sprint week" onKeyDown={onTabKeyDown} className="container grid grid-cols-1 md:grid-cols-3 md:gap-x-12">
              {steps.map((step, index) => {
                const current = active === index;
                return (
                  <button key={step.title} ref={(node) => { tabRefs.current[index] = node; }} type="button" data-sprint-step aria-current={current ? "step" : undefined} aria-controls="brand-sprint-week-stage" onClick={() => goTo(index)} className={`-mt-3 flex-col items-center text-center ${current ? "flex" : "hidden md:flex"}`}>
                    <span aria-hidden="true" className={`mb-8 size-6 rounded-full border border-black transition-colors duration-300 md:mb-10 ${current ? "bg-brand-primary" : "bg-white"}`} />
                    <span className={`flex max-w-sm flex-col items-center transition-opacity duration-300 ${current ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
                      <span className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">{step.when}</span>
                      <span className="heading-h5 mb-4">{step.title}</span>
                      <span>{step.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="sr-only" aria-live="polite">Stage {active + 1} of {steps.length}: {steps[active].title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
