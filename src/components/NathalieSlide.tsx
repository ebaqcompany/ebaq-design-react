import { useEffect, useRef, useState } from "react";
import { prepareNathalieMotion } from "./nathalieMotion";
import "./NathalieSlide.css";

export function NathalieSlide({ src, alt, palette }: { src: string; alt?: string; palette: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vector, setVector] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/case-study/nathalie-sadler/${palette ? "palette" : "type"}-layers.svg`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("Vector slide unavailable"); return response.text(); })
      .then(setVector)
      .catch(() => {});
    return () => controller.abort();
  }, [palette]);

  useEffect(() => {
    const element = ref.current, svg = element?.querySelector("svg");
    if (!element || !svg || !vector) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const apply = prepareNathalieMotion(svg, palette);
    apply(0);
    let frame = 0, start = 0;
    const tick = (now: number) => { if (!start) start = now; const elapsed = now-start; apply(elapsed); if (!palette || elapsed < 7000) frame = requestAnimationFrame(tick); };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting && entry.intersectionRatio >= .15) { start=0; frame=requestAnimationFrame(tick); }
    }, { threshold: .15 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [palette, vector]);

  return (
    <div ref={ref} className="nathalie-slide" role="img" aria-label={alt}>
      {vector ? <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: vector }} /> : <img src={src} alt="" aria-hidden="true" />}
    </div>
  );
}
