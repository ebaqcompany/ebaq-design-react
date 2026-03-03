"use client";

import { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { Navbar16 } from "../Navbar16";
import { Header78 } from "../Header78";
import { Testimonial32 } from "../Testimonial32";
import { BookerSection } from "../BookerSection";

/* ---- Pricing section ---- */
const PricingSection = () => (
  <section id="pricing" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="container max-w-xl">
      <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Investment</p>
        <h2 className="mb-5 md:mb-6">Brand & Website Package</h2>
        <p className="md:text-md text-black/50">Complete organizational rebrand + website redesign — delivered in 41 weeks, within your budget.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Single package — black card */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Full Rebrand + Website Redesign
          </h3>
          <p className="text-white/50">New identity system, brand guidelines, and a rebuilt website — your complete transformation, end to end.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $123,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /41 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "Brand discovery & stakeholder workshops",
              "Optional name exploration (from 'Landmarks Illinois' if desired)",
              "New logo system (primary, horizontal, vertical, badge-style)",
              "Full visual identity — color palette, typography, imagery direction",
              "Comprehensive brand guidelines document",
              "Communications tone & voice guidelines",
              "Website redesign — strategy, UX, visual design, and development",
              "Responsive build optimized for all devices",
              "Staff brand training + handoff session",
              "Vector files in all formats (AI, EPS, SVG, PNG)",
              "30-day post-launch support",
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

/* ---- Approach section ---- */
const ApproachSection = () => (
  <section id="process" className="px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Process</p>
        <h2 className="mb-5 md:mb-6 whitespace-pre-line" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
          How we'll work together.
        </h2>
      </div>

      <div className="mx-auto max-w-lg">
        {[
          {
            num: "01",
            title: "Discovery & Brand Audit",
            duration: "Weeks 1–4",
            items: "Stakeholder interviews (remote) · Audience research · Current identity audit · Competitive landscape · Define brand positioning · Optional name exploration · Strategic brief approval"
          },
          {
            num: "02",
            title: "Brand Identity Design",
            duration: "Weeks 5–14",
            items: "2–3 creative directions · Logo system (primary, horizontal, vertical, badge) · Color palette + typography · Imagery direction · Stakeholder review rounds · Final identity approval"
          },
          {
            num: "03",
            title: "Brand Guidelines + Collateral",
            duration: "Weeks 15–20",
            items: "Comprehensive brand guidelines document · Tone & voice guidelines · Branded templates · Staff brand training session · All vector file delivery"
          },
          {
            num: "04",
            title: "Website Strategy & UX",
            duration: "Weeks 21–28",
            items: "Content architecture · Sitemap + wireframes · UX flows · Copy direction · Stakeholder approval before visual design begins"
          },
          {
            num: "05",
            title: "Website Visual Design & Build",
            duration: "Weeks 29–39",
            items: "Full visual design (desktop + mobile) · Design review + approval · Development build · CMS setup + staff training · QA + accessibility review"
          },
          {
            num: "06",
            title: "Launch & Handoff",
            duration: "Weeks 40–41",
            items: "Staged rollout · Live launch · Domain + hosting transfer · Staff training session · 30-day post-launch support period begins"
          },
        ].map((phase) => (
          <div key={phase.num} className="border-b border-black/20 py-5 md:py-6">
            <div className="flex items-start gap-6">
              <span className="text-8xl md:text-9xl lg:text-10xl text-black/[0.08] leading-[1]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 300, marginTop: '-0.05em' }}>
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

/* ---- Why Ebaq section ---- */
const WhyEbaqSection = () => (
  <section id="why-ebaq" className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Why Ebaq</p>
        <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
          The right fit<br />for this project.
        </h2>
      </div>
      <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12 max-w-4xl mx-auto">
        {[
          { heading: "20 years of brand work", description: "Two decades of brand identity systems — from startups to established institutions. I know how to build brands that outlast trends." },
          { heading: "Nonprofit fluency", description: "Worked with values-driven organizations where the mission is the brand. I understand the balance between purpose-led storytelling and visual credibility." },
          { heading: "Remote-first", description: "Based in NYC, working with clients nationwide. Brand discovery conducted fully remotely — video workshops, async reviews, clean documentation." },
          { heading: "Strategy before aesthetics", description: "Every design decision flows from the strategic brief. A new logo means nothing without the positioning work underneath it." },
          { heading: "Brand + web, one partner", description: "No handoff friction between brand and web vendors. I design and build both — the site launches as an expression of the identity, not an interpretation of it." },
          { heading: "Within budget", description: "Proposed investment of $123,000 — within your $125K minimum — covering the full scope: discovery, identity, guidelines, and a complete website rebuild." },
        ].map((section, i) => (
          <div key={i}>
            <h3 className="mb-3 text-xl md:mb-4 md:text-2xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>{section.heading}</h3>
            <p className="text-black/50">{section.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a
          href="https://ebaq.design"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#00afec] font-semibold hover:underline"
        >
          View portfolio at ebaq.design →
        </a>
      </div>
    </div>
  </section>
);

/* ============ MAIN PROPOSAL ============ */
export const LandmarksILProposal = () => {
  useEffect(() => {
    // Track proposal view
    const img = new Image();
    img.src = `/api/track?page=landmarks-il&t=${Date.now()}`;
  }, []);

  return (
    <div className="relative">
      {/* Main content - scrolls over footer */}
      <div className="relative z-10 bg-white">
        {/* Navbar */}
        <Navbar16 navLinks={[
          { label: "Understanding", href: "#understanding" },
          { label: "Process", href: "#process" },
          { label: "Deliverables", href: "#deliverables" },
          { label: "Why Ebaq", href: "#why-ebaq" },
          { label: "Pricing", href: "#pricing" },
          { label: "Book a Call", href: "#book" },
        ]} />

        {/* Hero */}
        <Header78
          tagline="February 26, 2026"
          heading={"Organizational Rebrand &\nWebsite Redesign Proposal\nLandmarks Illinois"}
          description="Prepared by Arek Dvornechuck — ebaq.design"
          buttons={[]}
          showRows={[1, 2, 3]}
        />

        {/* Understanding the Brief */}
        <section id="understanding" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Understanding the Brief</p>
              <h2 className="mb-8 text-4xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
                A new direction deserves a new face.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Landmarks Illinois has been the state's leading voice for historic preservation for decades. Now, with a new strategic direction called <strong className="text-black">"Transformational"</strong> and a fresh mandate to grow your impact, your brand needs to reflect that ambition — not hold it back.
                </p>
                <p>
                  This isn't a cosmetic refresh. You're asking whether the name itself still serves you, whether your visual identity communicates the scale of your work, and whether your website can carry the weight of what you're building. Those are the right questions.
                </p>
                <p>
                  What I'm proposing is a <strong className="text-black">fully integrated rebrand + website redesign</strong> — discovery, strategy, identity, guidelines, and a rebuilt digital presence that works together as a single system. Remote-friendly from day one, with a clear stakeholder process that keeps your team in control at every milestone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container">
            {/* Top row: heading left, photo right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-20 lg:mb-24">
              <div className="lg:col-span-2">
                <p className="mb-3 font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>About</p>
                <h2 className="text-5xl md:text-7xl lg:text-8xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 250" }}>
                  Hi, I'm Arek.
                </h2>
              </div>
              <div className="flex items-start lg:justify-end">
                <img
                  src="/arek-pic.jpg"
                  alt="Arek Dvornechuck — Senior Brand Designer"
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover"
                />
              </div>
            </div>
            {/* Bottom row: 3 columns */}
            <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
              {[
                { heading: "The background", description: "20 years designing brand identities. Started in Poland, worked in Berlin, now based in New York City. I've built identity systems for mission-driven organizations at every scale." },
                { heading: "The approach", description: "Strategy first. I spend real time understanding what an organization stands for before touching a logo file. Brand is positioning made visible." },
                { heading: "The work", description: "Nonprofits, civic orgs, cultural institutions, and purpose-led companies. Portfolio at ebaq.design." },
              ].map((section, i) => (
                <div key={i}>
                  <h3 className="mb-3 text-xl md:mb-4 md:text-2xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>{section.heading}</h3>
                  <p className="text-black/50">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach — phases */}
        <div className="[&>section]:bg-[#f5f5f5]">
          <ApproachSection />
        </div>

        {/* Deliverables */}
        <section id="deliverables" className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-xl">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Deliverables</p>
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>What you'll receive.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Brand discovery report", value: "Stakeholder research synthesis, competitive audit, positioning framework, and strategic brief — the foundation every design decision builds on" },
                { label: "Name exploration (optional)", value: "If Landmarks Illinois decides to explore a new name, we'll develop 3–5 strategic name options with rationale before any visual work begins" },
                { label: "Logo system", value: "New primary logo plus horizontal, vertical, and badge-style configurations — all in vector formats (AI, EPS, SVG, PNG)" },
                { label: "Visual identity", value: "Full color palette (hex/CMYK/Pantone), typography selections with licensing guidance, imagery direction and photography style guide" },
                { label: "Brand guidelines document", value: "Comprehensive PDF/web guide covering logo usage, color specs, typography, imagery, co-branding rules, and do's/don'ts" },
                { label: "Tone & voice guidelines", value: "Messaging framework, vocabulary, writing principles — so every staff member writes with the same voice" },
                { label: "Website redesign", value: "Full sitemap, UX wireframes, visual design, responsive development, CMS setup, and staff training — built on your brand identity from day one" },
                { label: "Staff training + handoff", value: "Brand presentation for staff + board, website CMS walkthrough, all source files organized and documented" },
              ].map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-4">
                  <p className="font-semibold mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-black/50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Ebaq */}
        <div className="[&>section]:bg-[#f5f5f5]">
          <WhyEbaqSection />
        </div>

        {/* Pricing */}
        <PricingSection />

        {/* Timeline */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-xl">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Timeline</p>
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>41 weeks. Start to finish.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Start date", value: "Flexible — ready to begin as early as April 2026" },
                { label: "Phase 1: Discovery & brand identity", value: "Weeks 1–20 — strategy, naming exploration (if applicable), full visual identity, brand guidelines" },
                { label: "Phase 2: Website redesign", value: "Weeks 21–41 — sitemap, UX, visual design, development, QA, launch" },
                { label: "Total duration", value: "41 weeks from signed agreement to website launch" },
                { label: "Communication", value: "Weekly async updates + milestone review calls. All remote, all documented." },
              ].map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-4">
                  <p className="font-semibold mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-black/50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <div className="[&>section]:bg-[#f5f5f5]">
          <Testimonial32 />
        </div>
      </div>

      {/* Booker Section — reveals from behind */}
      <div id="book">
        <BookerSection />
      </div>
    </div>
  );
};
