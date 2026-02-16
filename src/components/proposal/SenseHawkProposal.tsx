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
          <motion.p variants={fadeUp} className="text-sm tracking-[0.3em] uppercase text-black/30 mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
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

      {/* THE OPPORTUNITY */}
      <Section label="The Opportunity">
        <h2 className="text-3xl md:text-5xl leading-[1.15] tracking-[-0.04em] mb-8" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}>
          Your current site doesn't do justice to a platform backed by Elevation Capital and Alpha Wave Global.
        </h2>
        <p className="text-base md:text-lg text-black/50 leading-relaxed max-w-2xl" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          SenseHawk is the operating system for solar — trusted by the world's largest energy companies. Your website should build instant credibility with enterprise buyers and reflect the sophistication your team has earned. We'll make that happen.
        </p>
      </Section>

      {/* ABOUT */}
      <Section label="About Ebaq">
        <h2 className="text-3xl md:text-5xl leading-[1.15] tracking-[-0.04em] mb-8" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}>
          Branding agency based in New York City. Clean, strategic, built to scale.
        </h2>
        <p className="text-base md:text-lg text-black/50 leading-relaxed max-w-2xl" style={{ fontFamily: "'Open Sans', sans-serif" }}>
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

      {/* APPROACH */}
      <Section label="Approach">
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

      {/* PRICING */}
      <Section label="Investment">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PricingCard {...optionA} />
          <PricingCard {...optionB} />
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
          Reply to this email or book a 15-minute intro call.
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

function PricingCard({ name, price, timeline, desc, features, featured }: {
  name: string; price: string; timeline: string; desc: string; features: string[]; featured?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-8 md:p-10 ${featured ? 'bg-black text-white' : 'border border-black/10 bg-[#f9f9f9]'}`}>
      <span className={`text-[10px] tracking-[0.2em] uppercase font-semibold ${featured ? 'text-[#00afec]' : 'text-black/30'}`}>{name}</span>
      <div className="mt-4 mb-1 text-5xl md:text-6xl tracking-[-0.04em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400 }}>
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
