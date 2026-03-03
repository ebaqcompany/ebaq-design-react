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
        <h2 className="mb-5 md:mb-6">Brand Identity Package</h2>
        <p className="md:text-md text-black/50">New logo system, brand identity guide, and tagline — three weeks, ready for the ribbon cutting.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Complete Brand Identity
          </h3>
          <p className="text-white/50">New logo, brand guide, and tagline — structured with stakeholder input, delivered before the ceremony.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $9,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /3 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "New Tree House Books logo — primary mark + horizontal, stacked, and icon variations",
              "Tagline — capturing the spirit of literacy, community, and joy of reading",
              "Brand style guide: color palette, typography, usage rules, and brand elements",
              "Three stakeholder touchpoints: kickoff, concept presentation, final review",
              "Application mockups (signage, tote bags, social media, bookmarks) in context",
              "All files delivered: AI, EPS, SVG, PNG (full-color, white, one-color)",
              "Brand Kit ready for your team's day-to-day use",
              "30-day post-delivery support",
            ].map((f, i) => (
              <div key={i} className="flex self-start">
                <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                <p>{f}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/40">Hourly rate: $150/hr · Estimated 60 hours · Not-to-exceed $9,000 · Reimbursable expenses billed at cost</p>
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
            title: "Discovery & Direction",
            duration: "Week 1",
            items: "Kickoff call with your team · Brand audit of existing materials · Audience and community research · Define brand territory: warmth, literacy, community access · Tagline exploration begins"
          },
          {
            num: "02",
            title: "Concepts & Refinement",
            duration: "Week 2",
            items: "Present 2–3 logo directions + tagline candidates · Color palette and typography exploration · Team feedback and input · Narrow to one direction and refine · Application mockup development"
          },
          {
            num: "03",
            title: "Final Delivery",
            duration: "Week 3",
            items: "Final logo system + tagline finalized · Brand style guide completed · All files packaged and delivered · Brand Kit set up · Ceremony-ready assets prepared · 30-day support period begins"
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
          { heading: "20 years of brand identity work", description: "I've built logo systems and brand guides for organizations from scrappy nonprofits to nationally recognized institutions. This is the core of what I do." },
          { heading: "Nonprofit & literacy org experience", description: "I understand the balance between professional design and the accessible, community-first values that define organizations like Tree House Books. The brand needs to feel both elevated and inviting." },
          { heading: "A ceremonial deadline you can count on", description: "A ribbon cutting is a real, immovable date. I build in structured milestones so you know exactly where the project stands — no surprises, no scrambles." },
          { heading: "Deliverables your whole team can use", description: "The final brand guide is designed for non-designers. Clear rules, practical templates, and a Brand Kit your staff and volunteers can open and use from day one." },
          { heading: "Purpose-driven design", description: "Tree House Books is doing something meaningful — giving North Philadelphia kids access to books and a place to love reading. That mission deserves a brand with the same care and intentionality." },
          { heading: "On budget, on time", description: "Three weeks start to finish. $9,000 flat — no hidden fees. Ready long before the ribbon cutting ceremony date." },
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
export const TreeHouseProposal = () => {
  useEffect(() => {
    const img = new Image();
    img.src = `/api/track?page=treehouse&t=${Date.now()}`;
  }, []);

  return (
    <div className="relative">
      <div className="relative z-10 bg-white">
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
          tagline="February 23, 2026"
          heading={"Brand Identity Proposal\nTree House Books"}
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
                A brand worth revealing.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Since 2005, Tree House Books has been a giving library and literacy center in North Philadelphia — a place where kids and families come to discover a love of reading. That mission is powerful. The brand needs to match it.
                </p>
                <p>
                  You're planning a ribbon cutting ceremony — a public moment where the new brand is revealed to the community. That's not just a delivery deadline. It's a launch. The new logo and identity need to show up perfectly on signage, materials, and digital channels from day one.
                </p>
                <p>
                  The ask is clear: a <strong className="text-black">new logo and brand identity</strong> that honors Tree House Books' roots while giving the organization a visual language that can grow alongside its impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container">
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
            <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
              {[
                { heading: "The background", description: "20 years designing brand identities. Started in Poland, worked in Berlin, now based in New York City. I've worked with nonprofits, literacy organizations, community centers, and civic institutions." },
                { heading: "The approach", description: "The best nonprofit brands feel like they belong to their community, not like they were designed in a vacuum. I start with deep listening — to your team, your history, your people." },
                { heading: "The work", description: "Logo systems, brand guides, and identity frameworks for mission-driven organizations. Everything delivered with the care the work deserves. Portfolio at ebaq.design." },
              ].map((section, i) => (
                <div key={i}>
                  <h3 className="mb-3 text-xl md:mb-4 md:text-2xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>{section.heading}</h3>
                  <p className="text-black/50">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
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
                { label: "New logo system", value: "Primary mark + horizontal, stacked, and icon/badge variations — designed for signage, bookmarks, tote bags, social media, and any size application" },
                { label: "Tagline", value: "A line that captures Tree House Books' warmth and mission — works standalone or paired with the logo at the ribbon cutting and beyond" },
                { label: "Brand style guide", value: "Color palette (hex, CMYK, Pantone), typography selections, logo usage rules, clear space, and brand elements — everything needed for consistent application" },
                { label: "Application mockups", value: "Brand shown in context: storefront signage, tote bags, bookmarks, social media, and event materials — so your board and donors see the full vision" },
                { label: "Brand Kit", value: "Colors, fonts, and logo variations organized and ready for your team's day-to-day use" },
                { label: "All source files", value: "AI, EPS, SVG, PNG — full-color, reversed (white), and one-color versions of every logo variation" },
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
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Ready for the ribbon cutting.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Start date", value: "Ready to begin immediately upon contract signing — targeting early March 2026" },
                { label: "Duration", value: "3 weeks from kickoff to final delivery" },
                { label: "Milestone 1 — Week 1", value: "Kickoff call + discovery · Brand territory defined · Initial logo sketches and tagline directions" },
                { label: "Milestone 2 — Week 2", value: "Logo concept presentation · Feedback and refinement · Color and typography decisions" },
                { label: "Final delivery — Week 3", value: "All files + brand guide + Brand Kit delivered, ceremony-ready" },
                { label: "Communication", value: "Async updates between checkpoints + fast turnaround. You'll always know where things stand." },
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

      <div id="book">
        <BookerSection />
      </div>
    </div>
  );
};
