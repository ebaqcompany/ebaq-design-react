import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const symbols = ["next-dimension", "elevate", "savory", "spark", "orbio", "aero", "ventur", "wingnut", "foxberman", "medihuanna", "airport-executive", "periti"];

export const RotatingLogoSymbol = () => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion !== false || paused) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % symbols.length), 500);
    return () => window.clearInterval(timer);
  }, [reduceMotion, paused]);

  return (
    <button
      type="button"
      aria-label={paused ? "Play logo symbols" : "Pause logo symbols"}
      aria-pressed={paused}
      onClick={() => setPaused((value) => !value)}
      className="inline-logo-symbol mx-[0.15em] inline-flex size-[1em] shrink-0 items-center justify-center bg-black p-[0.15em] align-middle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
    >
      <span aria-hidden="true" className="relative block size-full">
        {symbols.map((name, frame) => <img key={name} src={`/images/services/symbols/${name}.svg`} alt="" width="200" height="200" className={`absolute inset-0 size-full object-contain ${name === "elevate" || name === "periti" ? "scale-[0.8]" : ""} ${frame === index ? "opacity-100" : "opacity-0"}`} />)}
      </span>
    </button>
  );
};
