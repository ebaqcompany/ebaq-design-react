"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import { Navbar16 } from "../Navbar16";
import { Footer15 } from "../Footer15";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const portfolio = [
  {
    name: "Aero",
    desc: "AI-powered drone logistics — brand identity, design system & web",
    tags: ["SaaS", "Design System", "Framer"],
    image: "/case-study/aero-web.webp",
  },
  {
    name: "FoxBerman",
    desc: "Corporate consulting firm — full rebrand & component library",
    tags: ["Enterprise", "Components", "Rebrand"],
    image: "/case-study/aero-stationery.webp",
  },
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
      "Stakeholder review & direction selection",
    ],
  },
  {
    num: "02",
    title: "Full Homepage Design",
    duration: "5–7 days",
    items: [
      "Complete desktop wireframe & high-fidelity homepage design",
      "Visual storytelling for Taskmapper & Therm products",
      "Scroll-triggered animations & motion design specs",
      "Stylized product UI snippets — making your software look premium",
      "Hero imagery: flagship AI-generated or 3D-rendered visual",
    ],
  },
  {
    num: "03",
    title: "The Toolkit & Responsive",
    duration: "5–7 days",
    items: [
      "Mobile + tablet responsive homepage",
      "Framer UI Kit: Nav, Footer, Buttons, Cards, Input fields, Tooltips",
      "5–7 reusable content sections (feature grids, side-by-side blocks, solution cards)",
      "Typography & color library (H1–H6, Body, Accents)",
      "CMS card component + detail page layout (Blog/News/Events)",
    ],
  },
  {
    num: "04",
    title: "Handover & Assets",
    duration: "2–3 days",
    items: [
      "Final Figma file with Auto-Layout & component logic",
      "Raw asset folder: optimized videos (H.264/WebM), images (WebP/SVG)",
      "Style guide: text styles, color variables, component states",
      "Documentation for your Framer developer to build consistently",
    ],
  },
];

export const SenseHawkProposal = () => {
  return (
    <div className="relative" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="relative z-10 bg-white">
        {/* NAVBAR — same as main site */}
        <Navbar16
          logo={{ url: "https://ebaq.design", src: "/ebaqdesign-logo-thinner.svg", alt: "Ebaq Design" }}
          button={{ title: "Book a Call" }}
        />

        {/* HERO */}
        <motion.section
          className="px-[5%] py-24 md:py-32 lg:py-40 bg-white"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="container max-w-lg">
            <motion.p
              variants={fadeUp}
              className="mb-3 font-semibold md:mb-4"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Proposal
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl mb-6"
            >
              Website Redesign
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-black/50">
              Prepared for <strong className="text-black">SenseHawk</strong> · February 2026
            </motion.p>
          </div>
        </motion.section>

        {/* UNDERSTANDING — uses Layout484 pattern (text reveal section) */}
        <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-xl">
            <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>The Opportunity</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl">
              SenseHawk deserves a digital presence as sophisticated as its platform.
            </h2>
            <p className="mt-6 text-base md:text-lg text-black/50 leading-relaxed max-w-2xl md:mt-8">
              You're the operating system for solar — trusted by the world's largest energy companies, backed by Elevation Capital and Alpha Wave Global. Your current site doesn't reflect that. We'll create a world-class design that makes Taskmapper and Therm look intuitive, premium, and unforgettable. Apple-standard aesthetics, Framer-native execution.
            </p>
          </div>
        </section>

        {/* WHY EBAQ — same pattern */}
        <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-xl">
            <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Why Ebaq</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl">
              We design systems that scale — not just pages that look good.
            </h2>
            <p className="mt-6 text-base md:text-lg text-black/50 leading-relaxed max-w-2xl md:mt-8">
              NYC-based branding agency with nearly 20 years across SaaS, tech, and enterprise. We build with Auto-Layout, Stacks, and component logic so your Framer developer gets a file that translates 1:1 — not a pretty picture they have to reverse-engineer.
            </p>
          </div>
        </section>

        {/* COMPARISON — reuse Comparison pattern: Ebaq vs Traditional */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
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
                { left: "Auto-Layout & component logic", right: "Flat designs with no structure" },
                { left: "AI-generated hero visuals", right: "Stock photos or placeholders" },
                { left: "Senior designer, 1:1", right: "Junior designer, 5 projects" },
                { left: "$3k/week, clear timeline", right: "Vague scope, hidden costs" },
              ].map((row, index) => (
                <div key={index} className="grid grid-cols-2 gap-8">
                  <div className="flex items-center gap-3 border-b border-black/20 py-5 md:py-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 md:size-6"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="text-base font-medium md:text-lg tracking-[-0.02em]">{row.left}</span>
                  </div>
                  <div className="flex items-center gap-3 border-b border-black/20 py-5 md:py-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 md:size-6 text-black/40"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    <span className="text-base text-black/40 md:text-lg tracking-[-0.02em]">{row.right}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO — uses Layout527-style hover cards */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container">
            <h2 className="mb-12 text-4xl md:text-5xl lg:text-6xl md:mb-16">
              Recent SaaS & tech projects.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolio.map((p) => (
                <motion.div
                  key={p.name}
                  className="group block rounded-2xl border border-black/10 overflow-hidden hover:border-black/20 transition-colors bg-white"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2 tracking-[-0.02em]" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.name}</h3>
                    <p className="text-sm text-black/40 mb-4">{p.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] tracking-[0.1em] uppercase text-black/30 border border-black/10 rounded-full px-3 py-1">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <a
                href="https://www.ebaq.design"
                target="_blank"
                rel="noopener"
                className="inline-flex gap-x-2 items-center border border-black px-6 py-3 text-black rounded-[99px] text-sm font-semibold hover:bg-[#00afec] hover:border-[#00afec] hover:text-white transition-colors"
              >
                View all work
              </a>
            </div>
          </div>
        </section>

        {/* APPROACH — phases */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container">
            <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Process</p>
              <h2 style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
                Four phases. Clear deliverables.
              </h2>
            </div>
            <div className="mx-auto max-w-2xl">
              {phases.map((p) => (
                <div key={p.num} className="py-8 border-b border-black/10 first:border-t first:border-black/10">
                  <div className="flex items-baseline gap-6 mb-5">
                    <span
                      className="text-5xl md:text-6xl text-black/10"
                      style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 100 }}
                    >
                      {p.num}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl tracking-[-0.02em]" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.title}</h3>
                      <span className="text-sm text-[#00afec] font-semibold">{p.duration}</span>
                    </div>
                  </div>
                  <ul className="pl-[72px] md:pl-[88px] space-y-2">
                    {p.items.map((item) => (
                      <li key={item} className="text-sm text-black/50 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-black/20">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING — uses Pricing8 pattern (black cards) */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-lg">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4">Investment</p>
              <h2 className="mb-5 md:mb-6">Two scopes. One rate: $3k/week.</h2>
              <p className="md:text-md text-black/50">Both include Framer-ready deliverables with Auto-Layout, component logic, and optimized assets.</p>
            </div>

            <div className="space-y-6">
              {/* Option A */}
              <div className="bg-[#f5f5f5] rounded-3xl px-6 py-8 md:p-8">
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
                    "Raw asset folder (video, icons, images)",
                    "2 rounds of revisions",
                  ].map((f, i) => (
                    <div key={i} className="flex self-start">
                      <div className="mr-4 flex-none self-start"><BiCheck className="size-6" /></div>
                      <p>{f}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Option B — featured, black card like Pricing8 */}
              <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
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
                    "15+ unique page designs (Products, Lifecycle, Careers, About…)",
                    "7 CMS master templates (Blog, Events, Jobs, News…)",
                    "Full UX flow & site-wide navigation strategy",
                    "Dedicated product pages for Taskmapper & Therm",
                    "Advanced motion & interaction design specs",
                    "Content migration field mapping",
                    "Extended revision rounds",
                    "30-day post-handoff design support",
                  ].map((f, i) => (
                    <div key={i} className="flex self-start">
                      <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                      <p>{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HANDOFF — 3 cards */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container">
            <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Handoff</p>
              <h2 style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
                Your developer gets production-ready files. Not mockups.
              </h2>
            </div>
            <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Figma File", desc: "Auto-Layout, component variants, responsive breakpoints. Direct Framer import." },
                { title: "Asset Folder", desc: "Optimized videos (H.264/WebM), images (WebP/SVG), icons, and hero visuals." },
                { title: "Style Guide", desc: "Text styles, color variables, component states, spacing tokens. One source of truth." },
              ].map((card) => (
                <div key={card.title} className="rounded-xl bg-white border border-black/10 p-6">
                  <h4 className="text-base font-semibold mb-2" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{card.title}</h4>
                  <p className="text-sm text-black/40 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER — same as main site, reveals from behind */}
      <div className="sticky bottom-0 z-0">
        <section className="relative px-[5%] pt-24 md:pt-32 lg:pt-40 pb-16 bg-black text-white min-h-[50vh] flex flex-col items-center justify-center text-center">
          <div className="container relative z-10 max-w-2xl">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.03em]">
              Let's build something exceptional.
            </h2>
            <p className="text-white/40 mb-10 text-lg">
              Reply to this email or book a quick intro call.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="mailto:ebaqcompany@gmail.com"
                className="inline-block px-8 py-4 bg-white text-black rounded-[99px] text-sm font-semibold tracking-[0.05em] hover:bg-[#00afec] hover:text-white transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="https://cal.com/ebaqdesign/15min"
                target="_blank"
                rel="noopener"
                className="inline-block px-8 py-4 border border-white/20 text-white rounded-[99px] text-sm font-semibold tracking-[0.05em] hover:border-white/50 transition-colors"
              >
                Book a Call
              </a>
            </div>
          </div>
        </section>
        <Footer15 />
      </div>
    </div>
  );
};
