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
        <h2 className="mb-5 md:mb-6">Branding & Identity Package</h2>
        <p className="md:text-md text-black/50">Master brand + three district sub-brands — delivered in 28 weeks, within budget.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Single package — black card */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Complete Branding & Identity Plan
          </h3>
          <p className="text-white/50">New logo system, tagline, color palette, master brand, three sub-brands, and full design guidelines.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $84,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /28 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "New village logo — primary, horizontal, vertical, and badge/seal variations",
              "Tagline development (research-backed, community-tested)",
              "Uniform color palette with hex, RGB, CMYK, and Pantone values",
              "Master brand system — positioning and visual language",
              "3 district sub-brands: Ogden Avenue, Downtown, 8 Corners",
              "Comprehensive brand guidelines document",
              "Branded templates: letterhead, business cards, email signatures, signage",
              "Social media profile and cover image templates",
              "Vector master files in AI, EPS, SVG, and PNG formats",
              "Canva Brand Kit setup for Village staff self-service",
              "30-day post-delivery support",
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
            title: "Discovery & Research",
            duration: "Weeks 1–4",
            items: "Community and stakeholder interviews · Brand audit of current 1962 logo · Competitor & comparable city identity review · Define brand values and positioning pillars · Align on vision for all three business districts"
          },
          {
            num: "02",
            title: "Concept Development",
            duration: "Weeks 5–10",
            items: "2–3 master brand directions · Logo concepts (primary mark + wordmark variations) · Tagline options presented with rationale · Color palette explorations · Community committee review and feedback"
          },
          {
            num: "03",
            title: "Refinement & Sub-brands",
            duration: "Weeks 11–20",
            items: "Master brand refinement based on selected direction · Develop Ogden Avenue sub-brand · Develop Downtown sub-brand · Develop 8 Corners sub-brand · Ensure cohesion across all four brand expressions"
          },
          {
            num: "04",
            title: "System Build & Guidelines",
            duration: "Weeks 21–26",
            items: "Finalize all logo variations · Typography & color system documentation · Branded templates: letterhead, cards, email signatures, presentations, signage · Social media templates · Comprehensive brand guidelines document"
          },
          {
            num: "05",
            title: "Delivery & Handoff",
            duration: "Weeks 27–28",
            items: "Final file package delivery · Canva Brand Kit setup for staff use · Guidelines walkthrough presentation · Staff training session · 30-day support period begins"
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
          { heading: "20 years of brand identity work", description: "I've built brand systems for organizations at every scale — from community groups to established institutions. Identity systems are my core practice." },
          { heading: "Multi-brand system experience", description: "Master brand plus district sub-brands is a complex system design challenge. I know how to keep it cohesive at the top and distinctive at the sub-brand level." },
          { heading: "Community-centered process", description: "Great civic branding reflects its community. I build discovery and review touchpoints into every phase so stakeholders feel heard, not just informed." },
          { heading: "Templates that actually get used", description: "I design for staff who aren't designers. Canva Brand Kits, clear guidelines, and constrained templates mean the brand stays consistent long after delivery." },
          { heading: "Remote, agile, accountable", description: "Based in NYC, I work with clients across the country. Clear milestones, weekly updates, and asynchronous communication keep projects on track." },
          { heading: "Within budget, no surprises", description: "This proposal is $84,000 — just under your $85K budget. 28 weeks gives us the runway to do this right, with no scope creep." },
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
export const BrookfieldProposal = () => {
  useEffect(() => {
    // Track proposal view
    const img = new Image();
    img.src = `/api/track?page=brookfield&t=${Date.now()}`;
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
          tagline="February 21, 2026"
          heading={"Branding & Identity Plan\nVillage of Brookfield"}
          description="Prepared by Arek Dvornechuck — ebaq.design"
          buttons={[]}
          showRows={[1]}
        />

        {/* Understanding the Brief */}
        <section id="understanding" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Understanding the Brief</p>
              <h2 className="mb-8 text-4xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
                A logo from 1962. A village ready for what's next.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Brookfield has a lot going for it — three distinct business districts, a tight-knit community, and a historic Chicago suburb identity that resonates with residents. What it doesn't have is a visual identity that reflects any of that.
                </p>
                <p>
                  A logo designed 64 years ago tells a story — just not the right one. You need a <strong className="text-black">modern master brand</strong> that positions Brookfield as a forward-thinking community, with sub-brands for Ogden Avenue, Downtown, and 8 Corners that feel like family — distinct but unmistakably connected.
                </p>
                <p>
                  This is more than a logo refresh. It's a brand system built for the next generation of Brookfield residents, businesses, and visitors — one your staff can actually use, across every communication channel, for years to come.
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
                { heading: "The background", description: "20 years designing brand identities. Started in Poland, worked in Berlin, now based in New York City." },
                { heading: "The approach", description: "I believe great branding is invisible scaffolding — it makes everything else look intentional and cohesive." },
                { heading: "The work", description: "I've built brand systems for municipalities, nonprofits, and growing organizations. Portfolio at ebaq.design." },
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
                { label: "Village logo system", value: "Primary, horizontal, vertical, and badge/seal variations — vector files in AI, EPS, SVG, PNG, ready for any use" },
                { label: "Tagline", value: "Research-backed tagline developed through community discovery, presented with multiple options and rationale" },
                { label: "Color palette", value: "Uniform color system with hex, RGB, CMYK, and Pantone values — documented for print, digital, and signage use" },
                { label: "3 district sub-brands", value: "Distinct identity systems for Ogden Avenue, Downtown, and 8 Corners — cohesive with the master brand, individually recognizable" },
                { label: "Brand guidelines", value: "Comprehensive document covering logo usage, spacing rules, color applications, typography, and do's/don'ts" },
                { label: "Branded templates", value: "Letterhead, business cards, email signatures, presentation decks, and social media graphics — ready for staff use" },
                { label: "Canva Brand Kit", value: "Colors, fonts, and logos uploaded to Canva — staff can create on-brand materials without design training" },
                { label: "Vehicle & signage guidance", value: "Application specs for physical branding — wayfinding, signage, and fleet/uniform guidelines" },
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
        <section id="timeline" className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-xl">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Timeline</p>
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Ready after board approval.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Board selection", value: "April 13, 2026 — per RFP timeline" },
                { label: "Project kickoff", value: "Late April 2026 — discovery begins immediately after contract signing" },
                { label: "Duration", value: "28 weeks from kickoff to final delivery" },
                { label: "Projected completion", value: "November 2026 — final files, guidelines, and Canva kit handed off" },
                { label: "Communication", value: "Bi-weekly check-ins with community committee + async updates between sessions" },
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
