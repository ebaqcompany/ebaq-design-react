import { useEffect, useState, type FocusEvent } from "react";
import { useNearViewport } from "../components/Media";
import type { CarouselApi } from "../components/ui";

export const useTestimonialAutoplay = (enabled = true) => {
  const [api, setApi] = useState<CarouselApi>();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const { ref, inView } = useNearViewport<HTMLDivElement>("0px");

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const onPointerDown = () => setDragging(true);
    const onPointerUp = () => setDragging(false);
    api.on("pointerDown", onPointerDown);
    api.on("pointerUp", onPointerUp);
    return () => { api.off("pointerDown", onPointerDown); api.off("pointerUp", onPointerUp); };
  }, [api]);

  useEffect(() => {
    if (!enabled || !api || !inView || hovered || focused || dragging || reduceMotion) return;
    const timer = window.setInterval(() => { if (!document.hidden) api.scrollNext(); }, 2000);
    return () => window.clearInterval(timer);
  }, [enabled, api, inView, hovered, focused, dragging, reduceMotion]);

  return {
    setApi,
    containerProps: {
      ref,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: (event: FocusEvent<HTMLDivElement>) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); },
    },
  };
};
