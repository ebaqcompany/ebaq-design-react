import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import type { ServiceSlug } from "../data/services";

export const JasperReferenceArtwork = ({ slug }: { slug: ServiceSlug }) => {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const supported = slug === "brand-strategy" || slug === "web-design";
  useEffect(() => {
    if (!supported || !container.current) return;
    const element = container.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: AnimationItem | undefined;
    let disposed = false;
    let visible = false;
    let ready = false;
    const update = () => {
      if (!animation || !ready) return;
      if (reduced.matches) animation.goToAndStop(0, true);
      else if (visible && !document.hidden) animation.play();
      else animation.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      update();
    }, { threshold: [0, 0.1] });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    import("lottie-web").then(({ default: lottie }) => {
      if (disposed) return;
      animation = lottie.loadAnimation({
        container: element, renderer: "svg", loop: true, autoplay: false,
        path: `/images/services/jasper-reference/${slug}.json`,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: true },
      });
      animation.addEventListener("DOMLoaded", () => { ready = true; animation?.goToAndStop(0, true); update(); });
      animation.addEventListener("data_failed", () => { if (!disposed) setFailed(true); });
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      animation?.destroy();
    };
  }, [slug, supported]);
  return <div data-tone="light" data-art="vector" className="service-artwork bg-brand-grid relative flex aspect-[3/2] w-full items-center overflow-hidden">
    {supported && <div className="w-full" role="img" aria-label={`Jasper ${slug === "brand-strategy" ? "Strategy" : "Agents"} animation reference`}>
      {failed ? <p className="p-6 text-center">Animation could not load.</p> : <div ref={container} data-jasper-animation={slug} className="aspect-[430/201] w-full" aria-hidden="true" />}
    </div>}
  </div>;
};
