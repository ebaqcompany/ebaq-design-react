import { useState, type PointerEvent } from "react";

import { elevateWebsiteComparison as comparison, websiteComparisonViewport as viewport } from "../data/websiteComparisons";

// Relume Comparison 14 section framing, with the logo comparison's reveal control.
// Equal top-aligned source crops exported from the verified Figma website frames.
export const WebsiteComparison = () => {
  const [position, setPosition] = useState(50);
  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.min(100, Math.max(0, (event.clientX - bounds.left) / bounds.width * 100))));
  };
  return (
    <section id="website-comparison" aria-labelledby="website-comparison-heading" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl">
        <header className="mx-auto mb-10 max-w-lg text-center md:mb-12">
          <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Before &amp; after</p>
          <h2 id="website-comparison-heading">Elevate’s website, reimagined</h2>
        </header>
        <figure className="mx-auto max-w-[40rem]">
          <div className="mb-3 flex justify-between text-sm font-semibold" aria-hidden="true"><span>Before</span><span>After</span></div>
          <div style={{ aspectRatio: `${viewport.width} / ${viewport.height}` }} className="relative touch-pan-y cursor-ew-resize overflow-hidden bg-white"
            onPointerDown={(event) => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); updatePosition(event); }}
            onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updatePosition(event); }}
            onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}>
            <img src={comparison.after} width={viewport.width} height={viewport.height} alt="Elevate redesigned website with the new wordmark, green and blue gradients, and centered Shopify A/B testing headline" loading="lazy" decoding="async" draggable={false} className="pointer-events-none absolute inset-0 size-full" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
              <img src={comparison.before} width={viewport.width} height={viewport.height} alt="Elevate original website with the bird logo and A/B Testing Built for Shopify Growth headline" loading="lazy" decoding="async" draggable={false} className="absolute inset-0 size-full" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand-primary" style={{ left: `${position}%` }}>
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-primary bg-white text-xl text-black shadow-lg">↔</span>
            </div>
          </div>
          <figcaption className="sr-only">Elevate website before and after redesign. Matching 1600 by 1000 top-of-page viewports exported from the original Figma frames.</figcaption>
          <input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Elevate website before and after reveal" aria-valuetext={`${position}% original website, ${100 - position}% redesigned website`} className="sr-only focus:not-sr-only focus:mx-auto focus:block focus:h-8 focus:w-full focus:max-w-sm accent-black" />
        </figure>
      </div>
    </section>
  );
};
