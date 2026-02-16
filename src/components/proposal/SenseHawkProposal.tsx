"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { BiCheck } from "react-icons/bi";

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
    url: "https://www.ebaq.design/work/aero",
  },
  {
    name: "FoxBerman",
    desc: "Corporate consulting firm — full rebrand & component library",
    tags: ["Enterprise", "Components", "Rebrand"],
    image: "/case-study/aero-stationery.webp",
    url: "https://www.ebaq.design/work/foxberman",
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

const optionA = {
  name: "Option A",
  subtitle: "Landing Page + Component System",
  price: "$9,000",
  timeline: "3 weeks",
  desc: "Flagship homepage redesign with a complete design system your Framer dev can scale across the entire site.",
  features: [
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
  ],
};

const optionB = {
  name: "Option B",
  subtitle: "Full Website Redesign",
  price: "$21,000",
  timeline: "7 weeks",
  desc: "End-to-end design for every page. Your developer gets a complete, pixel-perfect blueprint for the entire site.",
  featured: true,
  features: [
    "Everything in Option A",
    "15+ unique page designs (Products, Lifecycle, Careers, About…)",
    "7 CMS master templates (Blog, Events, Jobs, News…)",
    "Full UX flow & site-wide navigation strategy",
    "Dedicated product pages for Taskmapper & Therm",
    "Advanced motion & interaction design specs",
    "Content migration field mapping",
    "Extended revision rounds",
    "30-day post-handoff design support",
  ],
};

export const SenseHawkProposal = () => {
  return (
    <div className="bg-white text-black min-h-screen" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-[5%] py-5 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5">
        <a href="https://ebaq.design" className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
          ebaqdesign
        </a>
        <span className="text-sm text-black/40">Proposal — SenseHawk</span>
      </nav>

      {/* HERO */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-[5%] pt-20 bg-white"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="container max-w-5xl">
          <motion.p variants={fadeUp} className="text-sm tracking-[0.3em] uppercase text-black/30 mb-6">
            Prepared for SenseHawk · February 2026
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl lg:text-[120px] leading-[0.95] tracking-[-0.05em] mb-12"
            style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}
          >
            Website<br />Redesign
          </motion.h1>
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-black/40">
            <span className="text-sm font-semibold" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>ebaqdesign</span>
            <span className="text-sm">·</span>
            <span className="text-sm">New York City</span>
          </motion.div>
        </div>
      </motion.section>

      {/* UNDERSTANDING */}
      <Section label="Understanding">
        <h2 className="text-3xl md:text-5xl leading-[1.15] tracking-[-0.04em] mb-8" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}>
          SenseHawk deserves a digital presence as sophisticated as its platform.
        </h2>
        <p className="text-base md:text-lg text-black/50 leading-relaxed max-w-2xl">
          You're the operating system for solar — trusted by the world's largest energy companies, backed by Elevation Capital and Alpha Wave Global. But your current site doesn't reflect that. We'll create a world-class design that makes complex products like Taskmapper and Therm look intuitive, premium, and unforgettable. Apple-standard aesthetics, Framer-native execution.
        </p>
      </Section>

      {/* WHY EBAQ */}
      <Section label="Why Ebaq">
        <h2 className="text-3xl md:text-5xl leading-[1.15] tracking-[-0.04em] mb-8" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}>
          We design systems that scale — not just pages that look good.
        </h2>
        <div className="space-y-4 text-base md:text-lg text-black/50 leading-relaxed max-w-2xl">
          <p>
            NYC-based branding agency with nearly 20 years across SaaS, tech, and enterprise. We specialize in design systems and component libraries that let developers build fast without design debt.
          </p>
          <p>
            We understand Framer. We build with Auto-Layout, Stacks, and component logic so your developer gets a file that translates 1:1 — not a pretty picture they have to reverse-engineer.
          </p>
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section label="Selected Work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.map((p) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener"
              className="group block rounded-2xl border border-black/10 overflow-hidden hover:border-black/20 transition-colors bg-white"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.name}</h3>
                <p className="text-sm text-black/40 mb-4">{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] tracking-[0.1em] uppercase text-black/30 border border-black/10 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <a
          href="https://www.ebaq.design"
          target="_blank"
          rel="noopener"
          className="inline-block mt-8 text-sm text-[#00afec] hover:underline font-semibold"
        >
          View all work →
        </a>
      </Section>

      {/* APPROACH — matches their 4 phases exactly */}
      <Section label="Approach">
        <p className="text-base text-black/40 mb-8 max-w-2xl">
          Our process maps directly to your RFP phases. Each milestone has clear deliverables — no ambiguity, no scope creep.
        </p>
        <div className="space-y-0">
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
                  <h3 className="text-xl md:text-2xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.title}</h3>
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
      </Section>

      {/* PRICING — matches their Option A / Option B exactly */}
      <Section label="Investment">
        <p className="text-base text-black/40 mb-8 max-w-2xl">
          Two scopes as requested. Both include Framer-ready deliverables with Auto-Layout, component logic, and optimized assets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PricingCard {...optionA} />
          <PricingCard {...optionB} />
        </div>
      </Section>

      {/* HANDOFF */}
      <Section label="Handoff Process">
        <h2 className="text-3xl md:text-4xl leading-[1.15] tracking-[-0.04em] mb-8" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}>
          Your developer gets production-ready files. Not mockups.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HandoffCard
            title="Figma File"
            desc="Auto-Layout, component variants, responsive breakpoints. Direct Framer import."
          />
          <HandoffCard
            title="Asset Folder"
            desc="Optimized videos (H.264/WebM), images (WebP/SVG), icons, and hero visuals."
          />
          <HandoffCard
            title="Style Guide"
            desc="Text styles, color variables, component states, spacing tokens. One source of truth."
          />
        </div>
      </Section>

      {/* CTA */}
      <section className="px-[5%] py-32 text-center border-t border-black/10 bg-white">
        <h2
          className="text-4xl md:text-6xl mb-6 tracking-[-0.04em]"
          style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}
        >
          Let's build something exceptional.
        </h2>
        <p className="text-black/40 mb-12 text-lg">
          Reply to this email or book a quick intro call to discuss next steps.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:ebaqcompany@gmail.com"
            className="inline-block px-8 py-4 bg-black text-white rounded-[99px] text-sm font-semibold tracking-[0.05em] hover:bg-[#00afec] transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="https://cal.com/ebaqdesign/15min"
            target="_blank"
            rel="noopener"
            className="inline-block px-8 py-4 border border-black/20 rounded-[99px] text-sm font-semibold tracking-[0.05em] hover:border-black/50 transition-colors"
          >
            Book a Call
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-[5%] py-8 border-t border-black/5 flex justify-between text-xs text-black/30 bg-white">
        <span>© 2026 Ebaq Design</span>
        <a href="https://ebaq.design" className="hover:text-black/60 transition-colors">ebaq.design</a>
      </footer>
    </div>
  );
};

/* ---- Helpers ---- */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="px-[5%] py-20 md:py-28 border-t border-black/10 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
    >
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          <motion.div variants={fadeUp}>
            <span className="text-[11px] tracking-[0.3em] uppercase text-black/30 font-semibold">{label}</span>
          </motion.div>
          <motion.div variants={fadeUp}>{children}</motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function PricingCard({ name, subtitle, price, timeline, desc, features, featured }: {
  name: string; subtitle: string; price: string; timeline: string; desc: string; features: string[]; featured?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-8 md:p-10 ${featured ? 'bg-black text-white' : 'border border-black/10 bg-[#f9f9f9]'}`}>
      <span className={`text-[10px] tracking-[0.2em] uppercase font-bold ${featured ? 'text-[#00afec]' : 'text-black/30'}`}>{name}</span>
      <h3 className="text-lg mt-1 mb-4" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{subtitle}</h3>
      <div className="mb-1 text-5xl md:text-6xl tracking-[-0.04em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}>
        {price}
      </div>
      <span className={`text-sm ${featured ? 'text-white/40' : 'text-black/30'}`}>{timeline}</span>
      <p className={`mt-6 text-sm leading-relaxed ${featured ? 'text-white/50' : 'text-black/40'}`}>{desc}</p>
      <div className="mt-8 space-y-3">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-3">
            <BiCheck className={`flex-shrink-0 mt-0.5 ${featured ? 'text-[#00afec]' : 'text-black/20'}`} />
            <span className={`text-sm ${featured ? 'text-white/60' : 'text-black/50'}`}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HandoffCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-black/10 p-6 bg-[#f9f9f9]">
      <h4 className="text-base font-semibold mb-2" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{title}</h4>
      <p className="text-sm text-black/40 leading-relaxed">{desc}</p>
    </div>
  );
}
