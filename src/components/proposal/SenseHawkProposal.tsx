"use client";

import { BiCheck } from "react-icons/bi";
import { Navbar16 } from "../Navbar16";
import { Header78 } from "../Header78";
import { Comparison } from "../Comparison";
import { Testimonial32 } from "../Testimonial32";
import { AboutSection } from "../AboutSection";
import { BookerSection } from "../BookerSection";

/* ---- Pricing section (reuses Pricing8 visual pattern) ---- */
const PricingSection = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
    <div className="container max-w-lg">
      <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Investment</p>
        <h2 className="mb-5 md:mb-6">Two options.</h2>
        <p className="md:text-md text-black/50">Both include a Figma file with Auto-Layout, component logic, and optimized assets — ready for your Framer dev to build.</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Option A — light card */}
        <div className="bg-[#f5f5f5] rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-md leading-[1.4] md:text-xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Option A: Landing Page + Component System
          </h3>
          <p className="text-black/50">Homepage design + a complete design system your Framer dev can scale independently.</p>
          <div className="my-8 h-px w-full bg-black/10" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            $9,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-black/30"> /3 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-black/10" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "Homepage design — Desktop, Tablet, Mobile",
              "2–3 visual direction concepts (style tiles)",
              "Reusable component library (Nav, Footer, Buttons, Cards)",
              "5–7 content section templates",
              "AI-generated hero visuals & product UI snippets",
              "Typography, color & component style guide",
              "CMS card + detail page template",
              "Figma file with Auto-Layout — handoff-ready",
            ].map((f, i) => (
              <div key={i} className="flex self-start">
                <div className="mr-4 flex-none self-start"><BiCheck className="size-6" /></div>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Option B — black card */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-md leading-[1.4] md:text-xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Option B: Full Website Redesign
          </h3>
          <p className="text-white/50">End-to-end design for every page. A complete blueprint your dev builds from.</p>
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
              "Motion & interaction specs for your dev",
              "CMS field mapping & content migration logic",
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
);

/* ---- Approach section (reuses Comparison visual style) ---- */
const ApproachSection = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Process</p>
        <h2 className="mb-5 md:mb-6 whitespace-pre-line" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
          How it works.
        </h2>
      </div>

      <div className="mx-auto max-w-xl">
        {[
          { num: "01", title: "Moodboard & Concept", duration: "3–4 days", items: "2–3 visual directions · Hero section concepts · Competitive analysis · AI-generated visuals" },
          { num: "02", title: "Full Homepage Design", duration: "5–7 days", items: "Desktop wireframe & high-fidelity design · Taskmapper & Therm storytelling · Motion specs · Product UI snippets" },
          { num: "03", title: "The Toolkit & Responsive", duration: "5–7 days", items: "Mobile + tablet responsive · Component library · 5–7 content sections · Typography & color library · CMS templates" },
          { num: "04", title: "Handover & Assets", duration: "2–3 days", items: "Figma file with Auto-Layout · Optimized assets (H.264/WebP/SVG) · Style guide · Dev handoff documentation" },
        ].map((phase) => (
          <div key={phase.num} className="border-b border-black/20 py-5 md:py-6">
            <div className="flex items-baseline gap-6">
              <span className="text-5xl md:text-6xl lg:text-7xl text-black/[0.08] leading-none" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 100 }}>
                {phase.num}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-lg md:text-xl lg:text-2xl tracking-[-0.02em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 400" }}>
                    {phase.title}
                  </h3>
                  <span className="text-sm text-[#00afec] font-semibold flex-shrink-0">{phase.duration}</span>
                </div>
                <p className="text-sm md:text-base text-black/40">{phase.items}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============ MAIN PROPOSAL — same structure as App.tsx ============ */
export const SenseHawkProposal = () => {
  return (
    <div className="relative">
      {/* Main content - scrolls over footer */}
      <div className="relative z-10 bg-white">
        {/* Navbar — exact same component */}
        <Navbar16 />

        {/* Hero — same Header78, different heading + same portfolio ticker */}
        <Header78
          heading={"Website redesign\nfor SenseHawk."}
          description=""
          buttons={[]}
          showRows={[3]}
        />

        {/* Opportunity — image left, text right */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="overflow-hidden rounded-2xl border border-black/10">
                <img
                  src="/portfolio/sensehawk-current.jpg"
                  alt="SenseHawk current website"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>The Opportunity</p>
                <h2 className="mb-5 text-5xl md:text-7xl lg:text-8xl md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
                  Your current site doesn't do justice.
                </h2>
                <p className="text-md md:text-lg text-black/50">
                  Backed by Elevation Capital and Alpha Wave Global, SenseHawk deserves a web presence that matches. We'll make Taskmapper and Therm look intuitive, premium, and unforgettable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison — Ebaq vs Other Designers */}
        <Comparison
          heading={"Why Ebaq."}
          leftTitle="Ebaq Design"
          rightTitle="Other Designers"
          rows={[
            { left: "Figma files your dev ships same-day", right: "Pretty mockups to rebuild" },
            { left: "Auto-Layout & real component logic", right: "Flat designs, no structure" },
            { left: "AI-generated hero visuals", right: "Stock photos or placeholders" },
            { left: "Senior designer, 1:1", right: "Junior designer, 5 projects" },
            { left: "$3k/week, clear timeline", right: "Vague scope, hidden costs" },
          ]}
        />

        {/* Approach — phases */}
        <ApproachSection />

        {/* Pricing */}
        <PricingSection />

        {/* Testimonials — exact same component */}
        <Testimonial32 />

        {/* About — exact same component */}
        <AboutSection />
      </div>

      {/* Booker Section — exact same, reveals from behind */}
      <BookerSection />
    </div>
  );
};
