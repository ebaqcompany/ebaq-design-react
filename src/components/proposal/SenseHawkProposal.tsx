"use client";

import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";

import type { Variants } from "framer-motion";

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
    desc: "AI-powered drone logistics — brand identity & web design",
    tags: ["SaaS", "Tech", "Identity"],
    image: "/case-study/aero-web.webp",
    url: "https://www.ebaq.design/work/aero",
  },
  {
    name: "FoxBerman",
    desc: "Corporate consulting firm — complete rebrand",
    tags: ["Enterprise", "Corporate", "Rebrand"],
    image: "/case-study/aero-stationery.webp",
    url: "https://www.ebaq.design/work/foxberman",
  },
];

const phases = [
  {
    num: "01",
    title: "Discovery & Site Audit",
    duration: "3 days",
    items: [
      "Full audit of current sensehawk.com",
      "Competitive analysis (Raptor Maps, Zeitview, Aurora Solar)",
      "Stakeholder alignment call — goals, audience, messaging",
      "Information architecture & sitemap proposal",
    ],
  },
  {
    num: "02",
    title: "Design Direction",
    duration: "5 days",
    items: [
      "2–3 homepage concepts in Figma",
      "Design system foundations — type, color, spacing, components",
      "Mobile-first responsive approach",
      "Interactive Figma prototype for stakeholder review",
    ],
  },
  {
    num: "03",
    title: "Full Page Design",
    duration: "7 days",
    items: [
      "All pages designed — desktop + tablet + mobile",
      "Component library for your internal Framer dev",
      "Interaction & micro-animation specs",
      "Asset library (icons, illustrations, imagery direction)",
    ],
  },
  {
    num: "04",
    title: "Refinement & Handoff",
    duration: "3 days",
    items: [
      "2 rounds of stakeholder feedback",
      "Pixel-perfect polish across all breakpoints",
      "Developer-ready Figma handoff with specs",
      "Style guide documentation",
    ],
  },
];

const optionA = {
  name: "Design Only",
  price: "$8,000",
  timeline: "3 weeks",
  desc: "Complete website design with Figma handoff for your internal Framer developer.",
  features: [
    "Homepage + all key pages",
    "Mobile-first responsive design",
    "Design system & component library",
    "Figma developer handoff",
    "2 rounds of revisions",
    "Style guide documentation",
  ],
};

const optionB = {
  name: "Design + Build",
  price: "$20,000",
  timeline: "8 weeks",
  desc: "End-to-end: brand refinement, website design, Framer build, launch video, and support.",
  featured: true,
  features: [
    "Everything in Design Only",
    "Brand identity refinement",
    "Framer development & deployment",
    "2D/3D product launch video",
    "CMS setup & content migration",
    "SEO optimization & analytics",
    "30-day post-launch support",
  ],
};

export const SenseHawkProposal = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-[5%] py-5 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5">
        <a href="https://ebaq.design" className="text-sm tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors">
          Ebaq
        </a>
        <span className="text-sm text-white/40">Proposal — SenseHawk</span>
      </nav>

      {/* HERO */}
      <motion.section
        className="min-h-screen flex flex-col justify-center px-[5%] pt-20"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="container max-w-5xl">
          <motion.p variants={fadeUp} className="text-sm tracking-[0.3em] uppercase text-white/30 mb-6">
            Prepared for SenseHawk · February 2026
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl lg:text-[120px] leading-[0.95] tracking-[-0.04em] mb-12"
            style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 200 }}
          >
            Website<br />Redesign
          </motion.h1>
          <motion.div variants={fadeUp} className="flex items-center gap-4 text-white/40">
            <img src="/ebaqdesign-logo-big.svg" alt="Ebaq" className="h-6 invert" />
            <span className="text-sm">ebaq.design</span>
          </motion.div>
        </div>
      </motion.section>

      {/* THE OPPORTUNITY */}
      <Section label="The Opportunity">
        <p className="text-2xl md:text-4xl leading-[1.3] tracking-[-0.02em] mb-8" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 300 }}>
          Your current site doesn't do justice to a platform backed by Elevation Capital and Alpha Wave Global.
        </p>
        <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
          SenseHawk is the operating system for solar — trusted by the world's largest energy companies. Your website should build instant credibility with enterprise buyers and reflect the sophistication your team has earned. We'll make that happen.
        </p>
      </Section>

      {/* ABOUT */}
      <Section label="About Ebaq">
        <p className="text-2xl md:text-4xl leading-[1.3] tracking-[-0.02em] mb-8" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 300 }}>
          Branding agency based in New York City. Clean, strategic, built to scale.
        </p>
        <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
          Nearly 20 years across SaaS, tech, and enterprise clients. We don't just make things look good — we design systems that convert. From logo to launch video, every touchpoint tells the same story.
        </p>
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
              className="group block rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.name}</h3>
                <p className="text-sm text-white/40 mb-4">{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] tracking-[0.1em] uppercase text-white/30 border border-white/10 rounded-full px-3 py-1">{t}</span>
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
          className="inline-block mt-8 text-sm text-[#00afec] hover:underline"
        >
          View all work →
        </a>
      </Section>

      {/* APPROACH */}
      <Section label="Approach">
        <div className="space-y-0">
          {phases.map((p) => (
            <div key={p.num} className="py-8 border-b border-white/10 first:border-t first:border-white/10">
              <div className="flex items-baseline gap-6 mb-5">
                <span
                  className="text-5xl md:text-6xl text-white/10"
                  style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 100 }}
                >
                  {p.num}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.title}</h3>
                  <span className="text-sm text-[#00afec]">{p.duration}</span>
                </div>
              </div>
              <ul className="pl-[72px] md:pl-[88px] space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="text-sm text-white/40 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1 before:h-1 before:rounded-full before:bg-white/20">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section label="Investment">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PricingCard {...optionA} />
          <PricingCard {...optionB} />
        </div>
      </Section>

      {/* CTA */}
      <section className="px-[5%] py-32 text-center border-t border-white/10">
        <h2
          className="text-4xl md:text-6xl mb-6 tracking-[-0.03em]"
          style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 300 }}
        >
          Let's build something exceptional.
        </h2>
        <p className="text-white/40 mb-12 text-lg">
          Reply to this email or book a 15-minute intro call.
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
            className="inline-block px-8 py-4 border border-white/20 rounded-[99px] text-sm font-semibold tracking-[0.05em] hover:border-white/50 transition-colors"
          >
            Book a Call
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-[5%] py-8 border-t border-white/5 flex justify-between text-xs text-white/20">
        <span>© 2026 Ebaq Design</span>
        <a href="https://ebaq.design" className="hover:text-white/50 transition-colors">ebaq.design</a>
      </footer>
    </div>
  );
};

/* ---- Helpers ---- */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="px-[5%] py-20 md:py-28 border-t border-white/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
    >
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          <motion.div variants={fadeUp}>
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/30">{label}</span>
          </motion.div>
          <motion.div variants={fadeUp}>{children}</motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function PricingCard({ name, price, timeline, desc, features, featured }: {
  name: string; price: string; timeline: string; desc: string; features: string[]; featured?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-8 md:p-10 ${featured ? 'border border-[#00afec]/30 bg-gradient-to-b from-[#00afec]/5 to-transparent' : 'border border-white/10 bg-white/[0.02]'}`}>
      <span className={`text-[10px] tracking-[0.2em] uppercase ${featured ? 'text-[#00afec]' : 'text-white/30'}`}>{name}</span>
      <div className="mt-4 mb-1 text-5xl md:text-6xl tracking-[-0.03em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 300 }}>
        {price}
      </div>
      <span className="text-sm text-white/30">{timeline}</span>
      <p className="mt-6 text-sm text-white/40 leading-relaxed">{desc}</p>
      <div className="mt-8 space-y-3">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-3">
            <BiCheck className={`flex-shrink-0 mt-0.5 ${featured ? 'text-[#00afec]' : 'text-white/20'}`} />
            <span className="text-sm text-white/50">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
