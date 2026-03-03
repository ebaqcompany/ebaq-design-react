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
        <h2 className="mb-5 md:mb-6">Campaign Brand Identity Package</h2>
        <p className="md:text-md text-black/50">Campaign logo, visual identity system, style guide, and templates — four weeks, ready to launch the Frame by Frame campaign.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Complete Campaign Brand Identity
          </h3>
          <p className="text-white/50">Campaign logo system, brand style guide, and print + digital templates — structured for a 3-year campaign with a $15M goal.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $12,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /4 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "Campaign logo system — primary mark + horizontal, stacked, and badge variations",
              "Brand style guide — color palette, typography, logo usage rules, visual language",
              "Templates: case statement booklet, major donor prospectus, naming opportunities brochure",
              "Digital templates: social media (Facebook, Instagram, LinkedIn), email, PowerPoint",
              "Campaign leave-behind materials: one-pagers, folder, direct mail, event invitations",
              "Web graphics and banners for campaign webpage",
              "Three stakeholder touchpoints: kickoff, concept presentation, final review",
              "All files delivered: AI, EPS, SVG, PNG, InDesign, print-ready PDFs",
              "Ongoing support: $150/hr after delivery",
            ].map((f, i) => (
              <div key={i} className="flex self-start">
                <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                <p>{f}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/40">Hourly rate: $150/hr · Estimated 80 hours · Not-to-exceed $12,000 · Reimbursable expenses billed at cost</p>
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
            title: "Discovery & Brand Direction",
            duration: "Week 1",
            items: "Kickoff call with your team · Campaign audit and brand research · Understand The Byrd's 97-year history and community identity · Define the visual territory for 'Frame by Frame' · Campaign name typography and logo concept exploration begins"
          },
          {
            num: "02",
            title: "Campaign Identity Development",
            duration: "Week 2",
            items: "Present 2–3 campaign logo directions · Color palette and typography exploration · Stakeholder feedback and refinement · Narrow to one direction · Begin style guide and template frameworks"
          },
          {
            num: "03",
            title: "Materials & Templates",
            duration: "Week 3",
            items: "Case statement and donor prospectus templates · Naming opportunities brochure · Direct mail and event invitation templates · Social media template suite · Digital presentation templates"
          },
          {
            num: "04",
            title: "Final Delivery",
            duration: "Week 4",
            items: "All print-ready files with bleeds and crop marks · Complete brand style guide · Digital templates finalized · Full file package delivered (AI, EPS, SVG, PNG, InDesign) · 30-day post-delivery support"
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
          { heading: "20 years of brand identity work", description: "I've built campaign identities, logo systems, and brand guides for nonprofits, cultural institutions, and civic organizations. This is the core of what I do — not a side service." },
          { heading: "Historic and cultural brand experience", description: "I understand what it means to build a brand that honors 97 years of history while opening a new chapter. The Frame by Frame identity needs to feel both timeless and urgent." },
          { heading: "Campaign design that converts donors", description: "Major donor materials, case statements, and naming opportunity brochures need to do more than look good — they need to inspire giving. Every design decision serves that goal." },
          { heading: "Deliverables your team can actually use", description: "The brand style guide and templates are built for non-designers on your staff to operate independently. No design degree required to apply the brand consistently." },
          { heading: "A 3-year campaign needs a durable identity", description: "The Frame by Frame campaign runs through March 2029. The brand I build will need to scale from launch materials to donor recognition to restoration celebration. I design for the full arc." },
          { heading: "On budget, on time", description: "Four weeks, $12,000 flat. Print-ready files, complete brand guide, and all digital templates — delivered with enough lead time to plan your campaign launch." },
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
export const ByrdTheatreProposal = () => {
  useEffect(() => {
    const img = new Image();
    img.src = `/api/track?page=byrdtheatre&t=${Date.now()}`;
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
          tagline="February 24, 2026"
          heading={"Graphic Design Proposal\nThe Byrd Theatre Foundation"}
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
                A campaign worthy of Richmond's movie palace.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  The Byrd Theatre has been the beating heart of Richmond's cultural life since 1928. Listed on the Virginia Landmarks Register and the National Register of Historic Places, it's not just a building — it's a community institution that has survived nearly a century of change.
                </p>
                <p>
                  The <strong className="text-black">Frame by Frame</strong> capital campaign sets out to raise $15 million to restore and preserve this landmark for the next generation. That mission deserves a campaign identity that feels as significant as the building itself — historically grounded, visually compelling, and built to carry a 3-year fundraising effort from launch through completion.
                </p>
                <p>
                  The ask is clear: a <strong className="text-black">campaign brand identity</strong> that works across print donor materials, digital channels, and major gift presentations — and a visual system your team can operate independently for the full campaign lifecycle.
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
                { heading: "The background", description: "20 years designing brand identities and campaign materials. Started in Poland, worked in Berlin, now based in New York City. I've worked with nonprofits, cultural institutions, and preservation organizations." },
                { heading: "The approach", description: "Campaign brands need to live in two worlds simultaneously — inspiring major donors in a boardroom presentation and speaking to the broader community on social media. I design for both." },
                { heading: "The work", description: "Logo systems, brand guides, print materials, and digital template suites for mission-driven organizations. Everything delivered to spec and on schedule. Portfolio at ebaq.design." },
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
                { label: "Campaign logo system", value: "Primary campaign mark + horizontal, stacked, and badge variations — designed for signage, print collateral, digital, and large-format applications across the full 3-year campaign" },
                { label: "Brand style guide", value: "Color palette (hex, CMYK, Pantone), typography selections, logo usage rules, clear space, and brand elements — everything needed for consistent campaign application" },
                { label: "Case statement booklet template", value: "8–12 page InDesign template — laid out for your content, photography, and donor messaging. Print-ready with bleeds and crop marks." },
                { label: "Major donor prospectus template", value: "8–12 page premium donor booklet — structured for naming opportunities, impact storytelling, and gift levels" },
                { label: "Print materials suite", value: "Naming opportunity brochure, campaign leave-behinds, folder design, direct mail appeal template, event invitation template" },
                { label: "Digital template suite", value: "Social media templates (Facebook, Instagram, LinkedIn), email marketing templates, PowerPoint presentation, web graphics and banners" },
                { label: "All source files", value: "AI, EPS, SVG, PNG (all logo variations) + InDesign package files + print-ready PDFs with bleeds — everything your printer and digital team needs" },
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
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Done before summer.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Start date", value: "Ready to begin immediately upon contract signing — targeting early March 2026" },
                { label: "Duration", value: "4 weeks from kickoff to final delivery" },
                { label: "Milestone 1 — Week 1", value: "Kickoff call + discovery · Campaign brand territory defined · Initial logo concepts and visual direction" },
                { label: "Milestone 2 — Week 2", value: "Logo concept presentation · Feedback and refinement · Color, typography, and brand system decisions" },
                { label: "Milestone 3 — Week 3", value: "Print and digital template development · Case statement, donor prospectus, social media templates" },
                { label: "Final delivery — Week 4", value: "All files + brand style guide + complete template suite delivered, print-ready and campaign-launch ready" },
                { label: "Ongoing support", value: "$150/hr for revisions and additional materials as the campaign evolves through March 2029" },
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
