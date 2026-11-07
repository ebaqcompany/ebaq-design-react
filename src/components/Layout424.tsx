import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Relume Layout 424 retrieved via MCP. Retains its 300vh sticky changing-heading
// treatment, using installed Framer Motion and SECTION-local scroll progress.
const headings = ["More than a logo", "One visual language", "Guidelines that work", "Ready to launch"];

export const Layout424 = () => {
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const transforms = [
    { opacity: useTransform(scrollYProgress, [0, .18, .25], [1, 1, 0]), y: useTransform(scrollYProgress, [0, .18, .25], ["0%", "0%", "-100%"]), },
    { opacity: useTransform(scrollYProgress, [.18, .25, .43, .5], [0, 1, 1, 0]), y: useTransform(scrollYProgress, [.18, .25, .43, .5], ["100%", "0%", "0%", "-100%"]), },
    { opacity: useTransform(scrollYProgress, [.43, .5, .68, .75], [0, 1, 1, 0]), y: useTransform(scrollYProgress, [.43, .5, .68, .75], ["100%", "0%", "0%", "-100%"]), },
    { opacity: useTransform(scrollYProgress, [.68, .75, 1], [0, 1, 1]), y: useTransform(scrollYProgress, [.68, .75, 1], ["100%", "0%", "0%"]), },
  ];
  return (
    <section id="overview" aria-label="Brand design: one coherent visual system" className="bg-white px-[5%] text-black">
      <div className="container">
        <div ref={target} data-layout424-progress className={reduceMotion ? "py-16 md:py-24 lg:py-28" : "relative h-[300svh]"}>
          {reduceMotion ? <div className="text-center"><p className="mb-8 font-semibold text-brand-primary">Brand Design</p><div className="space-y-8">{headings.map((heading) => <h2 key={heading}>{heading}</h2>)}</div></div> : <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
            <div className="w-full text-center">
              <p className="mb-3 font-semibold text-brand-primary md:mb-4">Brand Design</p>
              <h2 className="sr-only">{headings.join(". ")}</h2>
              <div aria-hidden="true" className="relative h-[1.3em] overflow-hidden" style={{ fontSize: "clamp(1.5rem, 5.5vw, 6rem)" }}>
                {headings.map((heading, index) => <motion.h2 key={heading} data-layout424-heading className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-bold" style={{ ...transforms[index], fontSize: "inherit", lineHeight: 1.2 }}>{heading}</motion.h2>)}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
};
