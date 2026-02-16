"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import React, { useRef } from "react";

/* ---- Animations ---- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---- Scroll-reveal word animation (like your Layout484) ---- */
const RevealHeading = ({ text, className = "" }: { text: string; className?: string }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <h2 ref={headingRef} className={className}>
      {words.map((word, index) => {
        const start = index * 0.025;
        const end = start + 0.025;
        return (
          <React.Fragment key={index}>
            <RevealWord word={word} scrollYProgress={scrollYProgress} start={start} end={end} />
            {index < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </h2>
  );
};

const RevealWord = ({ word, scrollYProgress, start, end }: { word: string; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]; start: number; end: number }) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <motion.span className="inline-block" style={{ opacity }}>{word}</motion.span>
  );
};

/* ---- Portfolio ---- */
const websites = [
  { src: "/portfolio/websites/aero-web.jpg", alt: "Aero" },
  { src: "/portfolio/websites/airport-executive-web-thumb.jpg", alt: "Airport Executive" },
  { src: "/portfolio/websites/brevidee-web-thumb.jpg", alt: "Brevidee" },
  { src: "/portfolio/websites/fox-berman-web-thumb.jpg", alt: "FoxBerman" },
  { src: "/portfolio/websites/laura-ceara-web.jpg", alt: "Laura Ceara" },
  { src: "/portfolio/websites/periti-web-thumb.jpg", alt: "Periti" },
  { src: "/portfolio/websites/sweetgras-web.jpg", alt: "Sweetgrass" },
  { src: "/portfolio/websites/ventur-web.jpg", alt: "Ventur" },
  { src: "/portfolio/websites/wingnut-web-thumb.jpg", alt: "Wingnut" },
];

const phases = [
  {
    num: "01",
    title: "Moodboard & Concept",
    duration: "3–4 days",
    items: [
      "2–3 visual directions (style tiles) — color, typography, brand vibe",
      "One \"Hero\" section concept per direction",
      "Competitive analysis: Raptor Maps, Zeitview, Aurora Solar",
      "AI-generated hero visual concepts for SenseHawk",
    ],
  },
  {
    num: "02",
    title: "Full Homepage Design",
    duration: "5–7 days",
    items: [
      "Complete desktop wireframe & high-fidelity homepage",
      "Visual storytelling for Taskmapper & Therm",
      "Scroll-triggered animations & motion design specs",
      "Stylized product UI snippets",
    ],
  },
  {
    num: "03",
    title: "The Toolkit & Responsive",
    duration: "5–7 days",
    items: [
      "Mobile + tablet responsive designs",
      "Framer UI Kit: Nav, Footer, Buttons, Cards, Inputs, Tooltips",
      "5–7 reusable content sections",
      "Typography & color library · CMS templates",
    ],
  },
  {
    num: "04",
    title: "Handover & Assets",
    duration: "2–3 days",
    items: [
      "Final Figma file with Auto-Layout & component logic",
      "Raw assets: videos (H.264/WebM), images (WebP/SVG)",
      "Style guide: text styles, color variables, component states",
      "Documentation for your Framer developer",
    ],
  },
];

export const SenseHawkProposal = () => {
  return (
    <div className="bg-white w-full overflow-x-hidden" style={{ fontFamily: "'Open Sans', sans-serif" }}>

      {/* ============ NAVBAR — sticky, blur ============ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] lg:px-20 py-4 lg:py-5 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <a href="https://ebaq.design">
          <img src="/ebaqdesign-logo-thinner.svg" alt="Ebaq Design" className="h-8 lg:h-10" />
        </a>
        <a
          href="https://cal.com/ebaqdesign/15min"
          target="_blank"
          rel="noopener"
          className="px-5 lg:px-6 py-2 lg:py-2.5 bg-black text-white rounded-[99px] text-xs lg:text-sm font-semibold hover:bg-[#00afec] transition-colors"
        >
          Book a Call
        </a>
      </nav>

      {/* ============ HERO ============ */}
      <motion.section
        className="pt-28 lg:pt-36 pb-8 lg:pb-16 bg-white"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="px-[5%] lg:px-20 mb-10 lg:mb-16">
          <motion.p variants={fadeUp} className="mb-3 font-semibold text-sm lg:text-base">Proposal · February 2026</motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] leading-[0.95] tracking-[-0.05em]"
            style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
          >
            Website redesign<br />for SenseHawk.
          </motion.h1>
        </div>

        {/* Horizontally scrollable portfolio */}
        <motion.div variants={fadeUp} className="flex gap-3 lg:gap-4 pl-[5%] lg:pl-20 overflow-x-auto pb-4 scrollbar-hide">
          {websites.map((img, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[360px] lg:w-[440px] aspect-[16/10] rounded-lg overflow-hidden border border-gray-200"
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ============ THE OPPORTUNITY — scroll-reveal text ============ */}
      <section className="px-[5%] lg:px-20 py-20 md:py-28 lg:py-36 bg-white">
        <div className="max-w-5xl">
          <p className="mb-3 lg:mb-4 font-semibold text-sm lg:text-base">The Opportunity</p>
          <RevealHeading
            text="Your current site doesn't do justice to a platform backed by Elevation Capital and Alpha Wave Global."
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] leading-[1.05] tracking-[-0.05em]"
          />
          <motion.p
            className="mt-8 lg:mt-16 text-base lg:text-xl xl:text-2xl text-black/50 leading-relaxed max-w-[900px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            SenseHawk is the operating system for solar — trusted by the world's largest energy companies. We'll create a world-class design that makes Taskmapper and Therm look intuitive, premium, and unforgettable. Apple-standard aesthetics, Framer-native execution.
          </motion.p>
        </div>
      </section>

      {/* ============ ABOUT — same as homepage ============ */}
      <motion.section
        className="px-[5%] lg:px-20 py-16 md:py-24 lg:py-28 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="container">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-16 lg:mb-28">
            <div className="lg:flex-1">
              <motion.p
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 tracking-[-0.05em] leading-[1]"
                style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 250" }}
              >
                Hello 👋
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[-0.05em] leading-[1]"
                style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 250" }}
              >
                I'm Arek, a senior designer based in NY, working with clients worldwide.
              </motion.h2>
            </div>
            <motion.img
              variants={fadeUp}
              src="/arek-pic.jpg"
              alt="Arek"
              className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover flex-shrink-0"
            />
          </div>

          <motion.div variants={fadeUp}>
            <p className="text-sm lg:text-base mb-6 lg:mb-8 font-semibold">Services I offer</p>
            <div className="grid grid-cols-2 gap-x-8 lg:gap-x-24">
              <div className="flex flex-col gap-1">
                {["Brand Strategy", "Custom Logo Design", "Logo Animation", "Color Palette", "Type System", "Brand Guidelines"].map((s) => (
                  <p key={s} className="text-base lg:text-xl xl:text-2xl tracking-[0.01em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 400" }}>{s}</p>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {["Figma Web Design", "Framer/Webflow Dev.", "Messaging", "Pitch Decks", "Social Media Graphics", "Motion Graphics"].map((s) => (
                  <p key={s} className="text-base lg:text-xl xl:text-2xl tracking-[0.01em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 400" }}>{s}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============ COMPARISON ============ */}
      <section className="px-[5%] lg:px-20 py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
        <div className="container">
          <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
            <h2 className="mb-5 md:mb-6 whitespace-pre-line" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
              {"Why this is different\nfrom every other bid."}
            </h2>
          </div>

          <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-2 gap-8">
              <div className="border-b border-black/20 pb-4">
                <h3 className="text-lg md:text-xl lg:text-2xl tracking-normal">Ebaq Design</h3>
              </div>
              <div className="border-b border-black/20 pb-4">
                <h3 className="text-lg text-black/40 md:text-xl lg:text-2xl tracking-normal">Other Designers</h3>
              </div>
            </div>
            {[
              { left: "Framer-native deliverables", right: "Pretty mockups to rebuild" },
              { left: "Auto-Layout & component logic", right: "Flat designs, no structure" },
              { left: "AI-generated hero visuals", right: "Stock photos or placeholders" },
              { left: "Senior designer, 1:1", right: "Junior designer, 5 projects" },
              { left: "$3k/week, clear timeline", right: "Vague scope, hidden costs" },
            ].map((row, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-2 gap-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-3 border-b border-black/20 py-5 md:py-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 md:size-6"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-base font-medium md:text-lg tracking-[-0.02em]">{row.left}</span>
                </div>
                <div className="flex items-center gap-3 border-b border-black/20 py-5 md:py-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 md:size-6 text-black/40"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  <span className="text-base text-black/40 md:text-lg tracking-[-0.02em]">{row.right}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPROACH ============ */}
      <section className="px-[5%] lg:px-20 py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
        <div className="container">
          <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
            <p className="mb-3 font-semibold md:mb-4">Process</p>
            <h2 style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
              Four phases. Clear deliverables.
            </h2>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-20">
            {phases.map((p, i) => (
              <motion.div
                key={p.num}
                className="py-6 lg:py-10 border-b border-black/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4 lg:gap-8 mb-4 lg:mb-6">
                  <span
                    className="text-7xl md:text-8xl lg:text-[100px] xl:text-[120px] leading-none text-black/[0.06]"
                    style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 100 }}
                  >
                    {p.num}
                  </span>
                  <div className="pt-3 lg:pt-6">
                    <h3 className="text-xl lg:text-2xl xl:text-3xl tracking-[-0.02em] mb-1 lg:mb-2" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.title}</h3>
                    <span className="text-sm lg:text-base text-[#00afec] font-semibold">{p.duration}</span>
                  </div>
                </div>
                <ul className="pl-20 md:pl-24 lg:pl-[140px] xl:pl-[160px] space-y-2 lg:space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="text-sm lg:text-base text-black/50 pl-4 lg:pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[8px] lg:before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-black/15">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="px-[5%] lg:px-20 py-16 md:py-24 lg:py-28 bg-white">
        <div className="container max-w-lg">
          <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
            <p className="mb-3 font-semibold md:mb-4">Investment</p>
            <h2 className="mb-5 md:mb-6">Two scopes. One rate: $3k/week.</h2>
            <p className="md:text-md text-black/50">Both include Framer-ready deliverables with Auto-Layout, component logic, and optimized assets.</p>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            {/* Option A */}
            <motion.div
              className="bg-[#f5f5f5] rounded-3xl px-6 py-8 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-1 text-md leading-[1.4] md:text-xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>Option A: Landing Page + Component System</h3>
              <p className="text-black/50">Homepage redesign with a complete design system your dev can scale.</p>
              <div className="my-8 h-px w-full bg-black/10" />
              <div className="my-2 text-6xl md:text-9xl lg:text-10xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
                $9,000
                <span className="text-2xl md:text-3xl lg:text-4xl text-black/30"> /3 weeks</span>
              </div>
              <div className="my-8 h-px w-full bg-black/10" />
              <div className="grid grid-cols-1 gap-y-4 py-2">
                {[
                  "Homepage redesign — Desktop, Tablet, Mobile",
                  "2–3 visual direction concepts",
                  "Framer UI Kit with reusable components",
                  "5–7 content section templates",
                  "AI-generated hero visuals & product snippets",
                  "Typography, color & component style guide",
                  "CMS card + detail page template",
                  "Figma file with Auto-Layout (Framer-ready)",
                ].map((f, i) => (
                  <div key={i} className="flex self-start">
                    <div className="mr-4 flex-none self-start"><BiCheck className="size-6" /></div>
                    <p>{f}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Option B — black card like Pricing8 */}
            <motion.div
              className="bg-black text-white rounded-3xl px-6 py-8 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="mb-1 text-md leading-[1.4] md:text-xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>Option B: Full Website Redesign</h3>
              <p className="text-white/50">End-to-end design for every page. Complete blueprint for the entire site.</p>
              <div className="my-8 h-px w-full bg-white/20" />
              <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
                $21,000
                <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /7 weeks</span>
              </div>
              <div className="my-8 h-px w-full bg-white/20" />
              <div className="grid grid-cols-1 gap-y-4 py-2">
                {[
                  "Everything in Option A",
                  "15+ unique page designs",
                  "7 CMS master templates (Blog, Events, Jobs…)",
                  "Full UX flow & navigation strategy",
                  "Dedicated Taskmapper & Therm pages",
                  "Advanced motion & interaction specs",
                  "Content migration field mapping",
                  "30-day post-handoff design support",
                ].map((f, i) => (
                  <div key={i} className="flex self-start">
                    <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                    <p>{f}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CTA — sticky reveal like BookerSection ============ */}
      <section className="relative px-[5%] pt-24 md:pt-32 lg:pt-40 pb-16 bg-black text-white sticky bottom-0 z-0 overflow-hidden min-h-[70vh]">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none">
          <img src="/ebaqdesign-logo-big.svg" alt="" className="w-full max-w-6xl opacity-[0.03]" style={{ filter: "invert(1)" }} />
        </div>

        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 tracking-[-0.03em]">
            Let's build something exceptional.
          </h2>
          <p className="text-white/40 text-lg mb-10">
            Reply to this email or book a quick intro call.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:ebaqcompany@gmail.com"
              className="inline-block px-8 py-4 text-lg font-medium text-black bg-white rounded-[99px] hover:bg-[#00afec] hover:text-white transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="https://cal.com/ebaqdesign/15min"
              target="_blank"
              rel="noopener"
              className="inline-block px-8 py-4 text-lg font-medium text-white border border-white/20 rounded-[99px] hover:border-white/50 transition-colors"
            >
              Book a Call
            </a>
          </div>
          <p className="mt-16 text-white/15 text-sm">© 2026 Ebaq Design · ebaq.design</p>
        </div>
      </section>
    </div>
  );
};
