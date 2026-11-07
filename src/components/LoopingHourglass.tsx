import { useState } from "react";

export const LoopingHourglass = () => {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      aria-label={paused ? "Play hourglass animation" : "Pause hourglass animation"}
      aria-pressed={paused}
      onClick={() => setPaused((value) => !value)}
      className="inline-logo-symbol mx-[0.15em] inline-flex size-[1em] shrink-0 items-center justify-center bg-black p-[0.15em] align-middle text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
    >
      <svg aria-hidden="true" focusable="false" className="hourglass-icon size-full" style={{ animationPlayState: paused ? "paused" : "running" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 22h14" />
        <path d="M5 2h14" />
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
      </svg>
    </button>
  );
};
