import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useBrandGuides } from "./BrandGuideArtwork";

export const VisualIdentityOptions = () => {
  const brand = useBrandGuides()[1];
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const fonts = [brand.fontFaces.find(font => font.style === "normal"), brand.fontFaces.find(font => font.style === "italic") ?? brand.fontFaces[1]].filter(font => font !== undefined);
  const fontKey = brand.source;
  useEffect(() => {
    let cancelled = false;
    const added: FontFace[] = [];
    setLoaded([]);
    const selected = [brand.fontFaces.find(font => font.style === "normal"), brand.fontFaces.find(font => font.style === "italic") ?? brand.fontFaces[1]].filter(font => font !== undefined);
    selected.forEach((font, index) => {
      const proxy = `https://guidelines.online/api/font-proxy?url=${encodeURIComponent(font.url)}`;
      const face = new FontFace(`guide-specimen-${index}`, `url("${proxy}")`, { style: font.style });
      face.load().then(loadedFace => {
        if (cancelled) return;
        document.fonts.add(loadedFace);
        added.push(loadedFace);
        setLoaded(previous => { const next = [...previous]; next[index] = true; return next; });
      }).catch(() => {});
    });
    return () => { cancelled = true; added.forEach(face => document.fonts.delete(face)); };
  }, [fontKey, brand.fontFaces]);
  const logo = brand.logoSets[0].variants[2] ?? brand.logoSets[0].variants[0];
  const slide = (from: number, delay: number) => reduced ? undefined : { x: [from, 0, 0, from], transition: { duration: 6, delay, repeat: Infinity, ease: [0.4, 0, 0.2, 1] as [number, number, number, number], times: [0, .15, .85, 1] } };
  return <section id="visual-identity-options" className="bg-surface-muted px-[5%] pb-16 md:pb-24">
    <div className="container">
      <p className="mb-4 font-mono text-sm uppercase tracking-wide text-brand-primary">Visual identity · live guide option</p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <article className="overflow-hidden rounded-xl border border-black/20 bg-white">
          <div data-tone="light" data-art="vector" role="img" aria-label={`${brand.name} logo, typography and color system`} className="service-artwork bg-brand-grid relative aspect-[3/2] overflow-hidden">
            <motion.div animate={slide(-45, 0)} className="absolute left-[8%] top-[8%] w-[66%] rounded-lg bg-white p-[4%]">
              <p className="mb-1 text-[10px] text-black/70">Logo</p><div className="flex h-9 items-center justify-center" style={{ backgroundColor: logo.background }}><img src={logo.src} alt="" className="max-h-[70%] w-[70%] object-contain" /></div>
            </motion.div>
            <motion.div animate={slide(45, .12)} className="absolute right-[8%] top-[34%] w-[56%] rounded-lg bg-white p-[4%] text-black">
              <p className="text-[10px] text-black/70">Typography</p><p className="truncate text-[9px] text-black/60">{fonts[0]?.family ?? "Font unavailable"}</p>
              <div className="mt-1 flex items-baseline gap-4" style={{ color: brand.colors[0] ?? "#222" }}>{fonts.length ? fonts.map((font, index) => <span key={font.url} className="text-3xl leading-none" style={{ fontFamily: loaded[index] ? `guide-specimen-${index}` : "serif", fontStyle: font.style }}>Aa</span>) : <span className="text-3xl leading-none">Aa</span>}</div>
            </motion.div>
            <motion.div animate={slide(-45, .24)} className="absolute bottom-[8%] left-[8%] w-[66%] rounded-lg bg-white p-[4%]">
              <p className="mb-1 text-[10px] text-black/70">Color palette</p><div className="flex h-7">{brand.colors.slice(0, 5).map(color => <span key={color} className="flex-1" style={{ backgroundColor: color }} />)}</div>
            </motion.div>
          </div>
          <div className="p-6 md:p-8"><h3 className="heading-h5">Live guide option</h3><p className="mt-2">{brand.name}</p></div>
        </article>
      </div>
    </div>
  </section>;
};
