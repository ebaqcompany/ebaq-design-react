import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Header78Defaults, LottieItem } from "./Header78";
import { LazyVideo } from "./Media";

// Relume Gallery 24: a pinned, scroll-driven horizontal gallery.
// Adapted to measure the complete homepage roster rather than a fixed three-image strip.
const ratios: Record<string, number> = {
  Savory: 1920 / 1080, Orbio: 1200 / 900, Elevate: 1920 / 1440, NextDim: 1200 / 800,
  Aero: 1920 / 1080, "Airport Executive": 1200 / 800, Brevidee: 1920 / 1080,
  Focal: 1200 / 800, Foxberman: 640 / 360, "Laura Ceara": 771 / 453,
  Medihuanna: 1200 / 800, Periti: 1200 / 800, Sweetgrass: 1200 / 800,
  Ventur: 1200 / 800, Wingnut: 1280 / 800, Lyntics: 1200 / 800,
};
const projectLinks: Record<string, string> = {
  Savory: "savory", Orbio: "orbio", Elevate: "elevate", NextDim: "next-dimension",
  Aero: "aero", "Airport Executive": "airport-executive", Brevidee: "brevidee",
  Foxberman: "fox-berman", Medihuanna: "medihuanna", Periti: "periti",
  Sweetgrass: "sweetgrass", Ventur: "ventur", Wingnut: "wingnut",
};

export const Gallery24 = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="selected-work" className="bg-black text-white">
      <div className="px-[5%] pt-16 md:pt-24 lg:pt-28">
        <div className="container text-center">
          <h2 className="mb-5 md:mb-6">Selected logo design work</h2>
          <p className="md:text-md">Logo animations from my portfolio.</p>
        </div>
      </div>
      <div ref={stageRef} style={{ height: reduceMotion ? "auto" : distance ? `calc(100vh + ${distance}px)` : "400vh" }}>
        <div className={`${reduceMotion ? "py-16" : "sticky top-0 flex h-screen flex-col justify-center"} px-[5%]`}>
          <div ref={viewportRef} className={reduceMotion ? "overflow-x-auto" : "overflow-hidden"}>
            <motion.div ref={trackRef} style={{ x: reduceMotion ? 0 : x }} className="flex w-max items-center gap-x-6 md:gap-x-8">
              {Header78Defaults.row1.map((item) => {
                const name = item.alt ?? "Logo animation";
                const ratio = ratios[name];
                const slug = projectLinks[name];
                return (
                  <figure key={item.src} data-logo={name} data-source={item.src} className="shrink-0" style={{ width: `min(80vw, ${ratio * 65}vh)` }}>
                    <div className="relative w-full" style={{ aspectRatio: ratio, backgroundColor: item.bgColor }}>
                      {item.type === "lottie" ? <LottieItem src={item.src} bgColor={item.bgColor} fit="contain" scale={item.scale} offsetY={item.offsetY} /> : <LazyVideo src={item.src} aria-label={name} frameClassName="absolute inset-0 size-full" className="size-full object-contain" />}
                    </div>
                    <figcaption className="mt-5">
                      <h3 className="heading-h5 mb-2">{name}</h3>
                      {slug && <a className="text-link" aria-label={`View ${name} project`} href={`/work/${slug}`}>View project</a>}
                    </figcaption>
                  </figure>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
