"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Header109 = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const width = useTransform(scrollYProgress, [0, 1], ["10%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 1], ["20%", "100%"]);
  const top = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const left = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  return <section ref={ref} className="relative h-[300vh] bg-white"><div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"><motion.div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden" style={{ width, height, top, left }}><video src="/case-study/AeroBillboards-4K.mp4" autoPlay loop muted playsInline className="size-full object-cover" /></motion.div><div className="relative z-20 mt-[42vh] px-[5%] text-center"><div className="container max-w-lg"><h2 className="mb-5 md:mb-6">See the work take shape</h2><p>From the first idea to the final frame, build a clear, confident brand system with one senior designer.</p></div></div></div></section>;
};
