import { useEffect, useState } from "react";
import brands from "../data/brandGuideAssets.json";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Pick a fresh starting project on page load; assign distinct projects to the cards.
export const useBrandGuides = () => {
  const [offset, setOffset] = useState(0);
  useEffect(() => { if (brands.length > 1) setOffset(Math.floor(Math.random() * brands.length)); }, []);
  return [0, 1, 2].map(index => brands[(offset + index) % brands.length]);
};

type Brand = (typeof brands)[number];

const LogoStack = ({ brand }: { brand: Brand }) => {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const frameCount = Math.min(brand.logoSets.length, ...brand.logoSets.map(set => set.variants.length));
  useEffect(() => {
    if (reduced || frameCount < 2) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % frameCount), 2600);
    return () => window.clearInterval(timer);
  }, [reduced, frameCount]);
  const set = brand.logoSets[active % frameCount];
  return <div data-tone="light" data-art="vector" role="img" aria-label={`${brand.name} logo variations in approved color combinations`} className="service-artwork bg-brand-grid relative aspect-[3/2] w-full overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div key={active} className="absolute inset-0 flex items-center justify-center px-[9%]" initial={reduced ? false : { y: "100%" }} animate={{ y: "0%" }} exit={reduced ? { opacity: 0 } : { y: "-100%" }} transition={{ duration: reduced ? 0 : 0.65, ease: [0.4, 0, 0.2, 1] }}>
          <div className="flex aspect-[2.9/1] w-full items-center justify-center" style={{ backgroundColor: set.variants[active % frameCount].background }}><img src={set.variants[active % frameCount].src} alt="" className="w-[74%] max-h-[70%] object-contain" /></div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
};

const ApplicationStack = ({ brand }: { brand: Brand }) => {
  const reduced = useReducedMotion();
  const [front, setFront] = useState(2);
  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setFront(current => (current + 1) % 3), 3200);
    return () => window.clearInterval(timer);
  }, [reduced]);
  return <div data-tone="light" data-art="vector" role="img" aria-label={`${brand.name} brand applications`} className="service-artwork bg-brand-grid relative aspect-[3/2] w-full overflow-hidden">
    {brand.applicationImages.map((item, index) => {
      const depth = (front - index + 3) % 3;
      return <motion.img key={item.src} src={item.src} alt="" loading="lazy" className="absolute w-[65%] aspect-video object-cover" initial={false}
        animate={{ left: `${24 - depth * 10}%`, top: `${12 + depth * 13}%`, zIndex: 3 - depth }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }} />;
    })}
  </div>;
};
const GuidelinesPreview = ({ brand }: { brand: Brand }) => {
  const reduced = useReducedMotion();
  const [fallback, setFallback] = useState(false);
  const [travel, setTravel] = useState(0);
  useEffect(() => { setFallback(false); setTravel(0); }, [brand.source]);
  const slug = new URL(brand.source).pathname.replace(/^\//, "").replace(/\.md$/, "");
  const source = fallback ? (brand.name === "Savory" ? "/images/services/brand-guidelines/savory-full.jpg" : "") : `https://guidelines.online/api/styleguides/screenshot/${encodeURIComponent(slug)}.jpg?v=2`;
  return <div data-tone="light" data-art="vector" role="img" aria-label={`${brand.name} brand guidelines screenshot`} className="service-artwork bg-brand-grid relative aspect-[3/2] w-full overflow-hidden">
    <div className="absolute inset-[9%] overflow-hidden">
      {source && <motion.img key={source} src={source} alt="" className="absolute left-0 top-0 w-full max-w-none" onError={() => setFallback(true)} onLoad={event => { const image = event.currentTarget; setTravel(Math.max(0, 100 * (1 - (2 / 3) * image.naturalWidth / image.naturalHeight))); }} initial={false} animate={reduced ? { y: "0%" } : { y: ["0%", "0%", `-${travel}%`, `-${travel}%`, "0%"] }} transition={reduced ? { duration: 0 } : { duration: 18, times: [0, 0.12, 0.48, 0.6, 1], ease: "easeInOut", repeat: Infinity }} />}
    </div>
  </div>;
};

export const BrandGuideArtwork = ({ brand, kind }: { brand: Brand; kind: number }) => {
  if (kind === 0) return <LogoStack brand={brand} />;
  if (kind === 1) return <ApplicationStack brand={brand} />;
  return <GuidelinesPreview brand={brand} />;
};
