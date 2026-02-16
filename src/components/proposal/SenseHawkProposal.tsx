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
    <div className="container max-w-3xl">
      <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Investment</p>
        <h2 className="mb-5 md:mb-6">Two options.</h2>
        <p className="md:text-md text-black/50">Both include a Figma file (or Framer Remix Link) with Auto-Layout, component logic, and optimized assets — ready for your dev to build.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
              "2–3 visual directions (style tiles) with brand vibe",
              "Reusable component library (Nav, Footer, Buttons, Cards)",
              "5–7 content section templates",
              "AI-generated hero visuals, product snippets & motion assets",
              "Typography, color palette & component style guide",
              "CMS card + detail page template",
              "Figma file with Auto-Layout (or Framer Remix Link)",
              "Raw asset folder (videos, icons, images, SVGs)",
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
              "15+ unique page designs (Products, Lifecycle, Careers, About…)",
              "7 CMS master templates (Blog, Events, Jobs, News…)",
              "Full UX flow & site-wide navigation strategy",
              "Dedicated Taskmapper & Therm product pages",
              "Scroll transforms, parallax & transition specs",
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
          { num: "01", title: "Moodboard & Concept", duration: "3–4 days", items: "2–3 visual directions (style tiles) · Color, type & brand vibe · Hero section concepts · AI-generated visuals · Competitive analysis" },
          { num: "02", title: "Full Homepage Design", duration: "5–7 days", items: "Desktop wireframe → high-fidelity design · Taskmapper & Therm visual storytelling · Scroll transforms & parallax specs · Stylized product UI snippets · Background video concepts" },
          { num: "03", title: "The Toolkit & Responsive", duration: "5–7 days", items: "Tablet + mobile responsive · Component sticker sheet (Nav, Footer, Buttons, Cards) · 5–7 reusable content sections · Typography & color library · CMS card + detail templates" },
          { num: "04", title: "Handover & Assets", duration: "2–3 days", items: "Figma file with Auto-Layout (or Framer Remix Link) · Raw asset folder (H.264/WebM video, WebP/SVG images) · Style guide with component states · Developer handoff docs" },
        ].map((phase) => (
          <div key={phase.num} className="border-b border-black/20 py-5 md:py-6">
            <div className="flex items-start gap-6">
              <span className="text-5xl md:text-6xl lg:text-7xl text-black/[0.08] leading-[1]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 100, marginTop: '0.05em' }}>
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
                  Backed by Elevation Capital and Alpha Wave Global, SenseHawk deserves a world-class digital presence — clean, high-tech, Apple-standard design. We'll make Taskmapper and Therm look intuitive, premium, and unforgettable.
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
            { left: "Figma + Framer Remix — your dev ships same-day", right: "Pretty mockups to rebuild from scratch" },
            { left: "Auto-Layout & true component logic", right: "Flat designs, no structure" },
            { left: "AI-generated hero visuals & motion assets", right: "Stock photos or placeholders" },
            { left: "Senior designer, 1:1, Apple-standard quality", right: "Junior designer juggling 5 projects" },
            { left: "$3k/week, clear phases & timeline", right: "Vague scope, hidden costs" },
          ]}
        />

        {/* Approach — phases */}
        <ApproachSection />

        {/* Pricing */}
        <PricingSection />

        {/* Scope notes */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container max-w-lg">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Good to know</p>
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>What's included & what's not.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Delivery format", value: "Figma file with Auto-Layout or Framer Remix Link — your choice" },
                { label: "Component logic", value: "Every element built as a true component — change a button color once, it updates site-wide" },
                { label: "Asset optimization", value: "All videos H.264/WebM, all images WebP/SVG — web-ready out of the box" },
                { label: "Motion specs", value: "Scroll transforms, parallax, smooth transitions — documented for your Framer dev" },
                { label: "Copywriting", value: "Not included — all text provided by SenseHawk, as outlined in your brief" },
              ].map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-4">
                  <p className="font-semibold mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-black/50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
