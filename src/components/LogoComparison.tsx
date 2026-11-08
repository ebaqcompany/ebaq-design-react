import { useState, type PointerEvent } from "react";
import { logoComparisonFrames } from "../data/logoComparisonFrames";
import { Button } from "./ui";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { Gallery15Defaults } from "./Gallery15";

// Section framing adapted from Relume Comparison 14. Pairs come from the
// existing Gallery15 archive, already normalized to matching 1200 × 800 frames.
const projects = Gallery15Defaults.redesigns;

export const LogoComparison = () => {
  const [selected, setSelected] = useState(projects[0].slug);
  const [position, setPosition] = useState(50);
  const project = projects.find(({ slug }) => slug === selected)!;
  const showProject = (index: number) => {
    setSelected(projects[(index + projects.length) % projects.length].slug);
    setPosition(50);
  };
  const currentIndex = projects.findIndex(({ slug }) => slug === selected);
  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.min(100, Math.max(0, (event.clientX - bounds.left) / bounds.width * 100))));
  };
  const frames = logoComparisonFrames[selected];
  const imagePath = `/images/about/logofix/${project.slug}`;

  return (
    <section id="logo-comparisons" aria-labelledby="logo-comparisons-heading" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl">
        <header className="mx-auto mb-10 max-w-lg text-center md:mb-12">
          <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Before &amp; after</p>
          <h2 id="logo-comparisons-heading" className="mb-5 md:mb-6">Logo redesigns, before and after</h2>
          <p className="md:text-md">Explore real logo redesigns from my archive. Browse the clients, then drag the divider to compare the original with the redesign.</p>
        </header>
        <div className="mx-auto max-w-[50rem]">
        <div className="relative px-12 md:px-20">
        <figure className="mx-auto w-full max-w-[40rem]">
          <div id="logo-comparison-frame" className="relative aspect-[3/2] touch-pan-y cursor-ew-resize overflow-hidden rounded-lg border border-black/10 bg-white"
            onPointerDown={(event) => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); updatePosition(event); }}
            onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updatePosition(event); }}
            onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}>
            <img key={`${selected}-after`} src={`${imagePath}-after.webp`} alt={`${project.client} redesigned logo`} width="1200" height="800" loading="lazy" decoding="async" draggable={false} style={frames.after} className="pointer-events-none absolute object-contain" />
            <div className="pointer-events-none absolute inset-0 bg-white" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
              <img key={`${selected}-before`} src={`${imagePath}-before.webp`} alt={`${project.client} original logo`} width="1200" height="800" loading="lazy" decoding="async" draggable={false} style={frames.before} className="absolute object-contain" />
            </div>
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white md:left-6 md:top-6">Before</span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white md:right-6 md:top-6">After</span>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand-primary" style={{ left: `${position}%` }}>
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-primary bg-white text-xl text-black shadow-lg">↔</span>
            </div>
          </div>
          <figcaption className="sr-only" aria-live="polite">{project.client}{selected === "ccl" && ". Designed by me while working at Chermayeff & Geismar & Haviv."}</figcaption>
          <input id="logo-reveal" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label={`${project.client}: before and after reveal`} aria-valuetext={`${position}% original logo, ${100 - position}% redesigned logo`} className="sr-only focus:not-sr-only focus:mx-auto focus:block focus:h-8 focus:w-full focus:max-w-sm accent-black" />
        </figure>
          <div>
            <Button type="button" variant="secondary" size="icon" onClick={() => showProject(currentIndex - 1)} aria-label="Previous logo redesign" className="testimonial-carousel-button size-12 rounded-full absolute left-0 top-1/2 -translate-y-1/2"><BiLeftArrowAlt aria-hidden="true" className="size-6" /></Button>
            <Button type="button" variant="secondary" size="icon" onClick={() => showProject(currentIndex + 1)} aria-label="Next logo redesign" className="testimonial-carousel-button size-12 rounded-full absolute right-0 top-1/2 -translate-y-1/2"><BiRightArrowAlt aria-hidden="true" className="size-6" /></Button>
          </div>
        </div>
          <div role="group" aria-label="Choose a logo redesign" className="mt-8 flex flex-wrap items-center justify-center md:mt-12">
            {projects.map(({ slug, client }, index) => (
              <button key={slug} type="button" onClick={() => showProject(index)} aria-label={`Show ${client}`} aria-current={selected === slug} aria-controls="logo-comparison-frame" className="p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                <span className={`block size-2 rounded-full ${selected === slug ? "bg-black" : "bg-black/20"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
