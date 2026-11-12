import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Relume Banner 13: two lines move toward opposite sides as the section crosses the viewport.
export const AiStartupBanner = ({ lines = ["Give your AI startup a brand as ambitious as your idea.", "Turn a complex product into a story people can understand."] }: { lines?: [string, string] }) => {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const firstX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const secondX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="bg-brand-grid overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container text-center text-black">
        <h2 className="flex flex-col items-center">
          <motion.span className={reducedMotion ? "block" : "block shrink-0 whitespace-nowrap"} style={{ x: reducedMotion ? 0 : firstX }}>{lines[0]}</motion.span>
          <motion.span className={reducedMotion ? "block" : "block shrink-0 whitespace-nowrap"} style={{ x: reducedMotion ? 0 : secondX }}>{lines[1]}</motion.span>
        </h2>
      </div>
    </section>
  );
};
