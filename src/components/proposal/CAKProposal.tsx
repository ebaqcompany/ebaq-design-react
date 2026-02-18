"use client";

import { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { Navbar16 } from "../Navbar16";
import { Header78 } from "../Header78";
import { Testimonial32 } from "../Testimonial32";
import { BookerSection } from "../BookerSection";

/* ---- Investment section ---- */
const InvestmentSection = () => (
  <section id="investment" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="container max-w-xl">
      <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Investment</p>
        <h2 className="mb-5 md:mb-6">Let's scope it together.</h2>
        <p className="md:text-md text-black/50">Airport branding projects vary significantly based on terminal footprint, stakeholder complexity, and rollout requirements. Rather than guess, let's discuss your specific needs.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Contact card — black */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8 text-center">
          <h3 className="mb-4 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Custom Proposal
          </h3>
          <p className="text-white/50 mb-8">Brand refresh + website redesign scoped to CAK's specific requirements, timeline, and rollout plan.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2 text-left">
            {[
              "Full brand audit and stakeholder discovery",
              "Brand strategy and positioning framework",
              "Visual identity refresh (logo, typography, color, iconography)",
              "Complete website redesign (UX, UI, responsive, accessible)",
              "In-terminal application mockups",
              "Comprehensive brand guidelines",
              "Social media and marketing templates",
              "Rollout support and training",
            ].map((f, i) => (
              <div key={i} className="flex self-start">
                <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                <p>{f}</p>
              </div>
            ))}
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <a 
            href="https://cal.com/ebaqdesign/15min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
          >
            Schedule a Call →
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ---- Approach section ---- */
const ApproachSection = () => (
  <section id="approach" className="px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Approach</p>
        <h2 className="mb-5 md:mb-6 whitespace-pre-line" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
          Five phases to<br />a stronger CAK.
        </h2>
      </div>

      <div className="mx-auto max-w-lg">
        {[
          { 
            num: "01", 
            title: "Discovery & Brand Audit", 
            duration: "Weeks 1–3", 
            items: "Stakeholder interviews · Competitor airport analysis · Current brand equity assessment · Traveler perception research · Document what to preserve vs. evolve" 
          },
          { 
            num: "02", 
            title: "Brand Strategy", 
            duration: "Weeks 4–5", 
            items: "Brand positioning framework · Personality and voice definition · Messaging pillars · Internal alignment workshops · Strategic foundation document" 
          },
          { 
            num: "03", 
            title: "Visual Identity Refresh", 
            duration: "Weeks 6–9", 
            items: "Logo evolution (not reinvention) · Typography system · Color palette refinement · Iconography and graphic elements · Wayfinding visual principles" 
          },
          { 
            num: "04", 
            title: "Digital Design", 
            duration: "Weeks 10–13", 
            items: "Website UX architecture · UI design system · Desktop, tablet, mobile responsive · WCAG accessibility compliance · Interactive prototypes" 
          },
          { 
            num: "05", 
            title: "Brand System & Handoff", 
            duration: "Weeks 14–16", 
            items: "Comprehensive brand guidelines · In-terminal application mockups · Social media templates · Marketing collateral templates · Team training and rollout support" 
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
          The right partner<br />for CAK.
        </h2>
      </div>
      <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12 max-w-4xl mx-auto">
        {[
          { heading: "20 years of brand work", description: "Two decades building brand identities — from funded startups to established organizations. Brand systems are my core expertise." },
          { heading: "Brand systems specialist", description: "I design identities that scale across touchpoints — digital, print, environmental. Exactly what an airport needs." },
          { heading: "Evolution, not revolution", description: "You've built trust with travelers over decades. I preserve brand equity while modernizing for today's expectations." },
          { heading: "Remote-first, national clients", description: "Based in NYC, working with organizations across the US. Video calls, async updates, and clear deliverables keep projects on track." },
          { heading: "Digital + physical fluency", description: "I understand how brands translate from screens to signage. Terminal environments require careful consideration of scale, distance, and context." },
          { heading: "Single point of contact", description: "You work directly with me — not a rotating cast of juniors. Accountability and consistency from kickoff to handoff." },
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
export const CAKProposal = () => {
  useEffect(() => {
    // Track proposal view
    const img = new Image();
    img.src = `/api/track?page=cak&t=${Date.now()}`;
  }, []);

  return (
    <div className="relative">
      {/* Main content - scrolls over footer */}
      <div className="relative z-10 bg-white">
        {/* Navbar */}
        <Navbar16 navLinks={[
          { label: "Understanding", href: "#understanding" },
          { label: "About", href: "#about" },
          { label: "Approach", href: "#approach" },
          { label: "Deliverables", href: "#deliverables" },
          { label: "Why Ebaq", href: "#why-ebaq" },
          { label: "Book a Call", href: "#book" },
        ]} />

        {/* Hero */}
        <Header78
          tagline="February 18, 2026"
          heading={"Brand Refresh &\nWebsite Redesign\nAkron-Canton Airport"}
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
                Modernize, don't reinvent.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Akron-Canton Airport has spent decades building trust with Northeast Ohio travelers. Your brand represents reliability, convenience, and regional pride. That equity is valuable — and worth preserving.
                </p>
                <p>
                  What CAK needs isn't a complete rebrand. It's <strong className="text-black">a thoughtful evolution</strong> — one that modernizes your visual identity across digital platforms, in-terminal environments, and external communications while maintaining the trust you've earned.
                </p>
                <p>
                  The goal: clarity, consistency, and adaptability. A brand system that feels current and professional, works seamlessly from website to wayfinding signage, and positions CAK as a confident, forward-looking regional airport.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
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
                { heading: "The background", description: "20 years designing brand identities and digital experiences. Started in Poland, worked in Berlin, now based in New York City." },
                { heading: "The specialty", description: "Brand systems that scale — identities that work across screens, print, and physical environments. Digital design with the same rigor." },
                { heading: "The clients", description: "Funded startups, established organizations, and institutions. Work with national clients remotely. Portfolio at ebaq.design." },
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
                { label: "Refreshed logo & identity system", value: "Evolved CAK logo with refined typography, modernized color palette, and complete iconography system — vector files in all formats" },
                { label: "Brand guidelines", value: "Comprehensive guidelines covering logo usage, typography, color, photography, voice, and application across all touchpoints" },
                { label: "Full website redesign", value: "Complete UX architecture and UI design — homepage through booking flows, responsive across all devices, WCAG accessible" },
                { label: "In-terminal application mockups", value: "Signage, wayfinding, gate displays, and environmental applications — showing how the brand translates to physical space" },
                { label: "Social media templates", value: "Ready-to-use templates for Instagram, Facebook, LinkedIn, and X — on-brand content creation made easy" },
                { label: "Marketing collateral templates", value: "Print ads, digital banners, presentation decks — everything your team needs for consistent communication" },
                { label: "Rollout support", value: "Training sessions, asset handoff, and 30-day post-delivery support to ensure smooth implementation" },
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

        {/* Timeline */}
        <section id="timeline" className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-xl">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Timeline</p>
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>16 weeks, start to finish.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Total duration", value: "16 weeks from signed contract to final delivery" },
                { label: "Your deadline", value: "March 16, 2026 RFP deadline — ready to discuss and begin immediately after selection" },
                { label: "Milestone check-ins", value: "Structured reviews at each phase — discovery, strategy, visual identity, digital design, final handoff" },
                { label: "Communication", value: "Weekly video check-ins + async updates in your preferred channel (Slack, Teams, email)" },
              ].map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-4">
                  <p className="font-semibold mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-black/50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment */}
        <InvestmentSection />

        {/* Testimonials */}
        <div className="[&>section]:bg-white">
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
