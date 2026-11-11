import { useState, type PointerEvent } from "react";

import { elevateWebsiteComparison, nextDimensionWebsiteComparison, websiteComparisonViewport as viewport } from "../data/websiteComparisons";

// Relume Comparison 14 section framing, with the logo comparison's reveal control.
// Equal top-aligned crops from the original local client presentation sheets.
const ComparisonFigure = ({ comparison }: { comparison: { client: string; before: string; after: string } }) => {
  const [position, setPosition] = useState(50);
  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.min(100, Math.max(0, (event.clientX - bounds.left) / bounds.width * 100))));
  };
  return (
        <figure className="mx-auto w-full max-w-[40rem]">
          <figcaption className="heading-h5 mb-6">{comparison.client}</figcaption>
          <div className="mb-3 flex justify-between text-sm font-semibold" aria-hidden="true"><span>Before</span><span>After</span></div>
          <div className="aspect-[8/5] relative touch-pan-y cursor-ew-resize overflow-hidden bg-white"
            onPointerDown={(event) => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); updatePosition(event); }}
            onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updatePosition(event); }}
            onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}>
            <img src={comparison.after} width={viewport.width} height={viewport.height} alt={`${comparison.client} website after redesign`} loading="lazy" decoding="async" draggable={false} className="pointer-events-none absolute inset-0 size-full" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
              <img src={comparison.before} width={viewport.width} height={viewport.height} alt={`${comparison.client} website before redesign`} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 size-full" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand-primary" style={{ left: `${position}%` }}>
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-primary bg-white text-xl text-black shadow-lg">↔</span>
            </div>
          </div>
          <p className="sr-only">{comparison.client} website before and after redesign. Matching top-of-page crops from the original client presentation.</p>
          <input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label={`${comparison.client} website before and after reveal`} aria-valuetext={`${position}% original website, ${100 - position}% redesigned website`} className="sr-only focus:not-sr-only focus:mx-auto focus:block focus:h-8 focus:w-full focus:max-w-sm accent-black" />
        </figure>

  );
};

export const WebsiteComparison = () => (
  <section id="website-comparison" aria-labelledby="website-comparison-heading" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <header className="mx-auto mb-10 max-w-lg text-center md:mb-12">
        <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Before &amp; after</p>
        <h2 id="website-comparison-heading">Websites, reimagined</h2>
      </header>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {[elevateWebsiteComparison, nextDimensionWebsiteComparison].map(comparison => <ComparisonFigure key={comparison.client} comparison={comparison} />)}
      </div>
    </div>
  </section>
);
