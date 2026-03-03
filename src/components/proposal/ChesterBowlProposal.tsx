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
        <p className="md:text-md text-black/50">Complete logo, brand guide, and tagline — four weeks, all stakeholders included.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Single package — black card */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Complete Brand Identity
          </h3>
          <p className="text-white/50">New logo system + brand style guide + tagline, with four structured stakeholder touchpoints.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $12,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /4 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "New Chester Bowl logo — primary mark + horizontal, vertical, and icon variations",
              "Tagline — tested with stakeholders, works standalone or alongside the logo",
              "Brand style guide: color palette, typography, usage rules, and brand elements",
              "Stakeholder engagement: kickoff, concept workshop, feedback session, final presentation",
              "Application mockups (signage, apparel, digital) showing the brand in context",
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
            <p className="text-sm text-white/40">Hourly rate: $150/hr · Estimated 80 hours · Not-to-exceed $12,000 · Reimbursable expenses (travel if needed) billed at cost</p>
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
            title: "Kickoff & Discovery",
            duration: "Week 1",
            items: "Stakeholder kickoff meeting · Brand audit of existing assets · Stakeholder survey (board, staff, community) · Competitive landscape review · Identify emotional and functional brand territory"
          },
          {
            num: "02",
            title: "Strategy & Concepts",
            duration: "Week 2",
            items: "Workshop: logo concepts + tagline candidates · 2–3 visual directions presented · Color palette and typography exploration · Stakeholder input on directions · Shortlist to one direction"
          },
          {
            num: "03",
            title: "Refinement & Feedback",
            duration: "Week 3",
            items: "Logo refinement based on feedback · Tagline finalization · Brand style guide draft · Application mockups (signage, apparel, digital) · Feedback session with Marketing Committee"
          },
          {
            num: "04",
            title: "Final Presentation & Delivery",
            duration: "Week 4",
            items: "Board/Executive Director presentation · Final brand guide document · All file formats delivered · Brand Kit setup · 30-day support period begins"
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
          { heading: "20 years of brand identity work", description: "I've built logo systems and brand guides for organizations ranging from scrappy nonprofits to nationally recognized institutions. This is the core of what I do." },
          { heading: "Nonprofit & community org experience", description: "Worked with arts nonprofits, civic groups, and community-driven organizations. I understand the balance: professional polish that still feels human and accessible." },
          { heading: "Structured stakeholder process", description: "I don't work in isolation. My process has four built-in touchpoints — kickoff, concept workshop, feedback, and final presentation — so your board stays informed and aligned." },
          { heading: "Deliverables your team can use", description: "The final brand guide is designed for non-designers. Clear rules, practical templates, and a Brand Kit your staff can open and use tomorrow." },
          { heading: "Perfect timing", description: "A new chalet and a new five-year strategic plan — this is exactly the right moment to build a brand identity that grows with Chester Bowl for the next decade." },
          { heading: "On budget, on time", description: "Four weeks start to finish. Delivered well before your May 31 deadline. $12,000 flat — no hidden fees, no scope creep." },
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
export const ChesterBowlProposal = () => {
  useEffect(() => {
    // Track proposal view
    const img = new Image();
    img.src = `/api/track?page=chesterbowl&t=${Date.now()}`;
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
          tagline="February 20, 2026"
          heading={"Brand Identity Proposal\nChester Bowl Improvement Club"}
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
                The right brand for the next chapter.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Chester Bowl has been at the heart of Duluth's outdoor community for over 40 years. Generations of Minnesotans learned to ski here. Families built summer memories here. The mission — outdoor recreation, youth development, and open access for all — is strong.
                </p>
                <p>
                  Now, with a new chalet arriving in 2026 and a fresh five-year strategic plan in place, the timing couldn't be better for a brand identity that reflects where Chester Bowl is going, not just where it's been.
                </p>
                <p>
                  The ask is clear: a <strong className="text-black">new logo with variations, a brand style guide, and a tagline</strong> that can stand alone or anchor the mark. What I'd add: a brand that feels as welcoming, rugged, and community-rooted as Chester Park itself.
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
                { heading: "The background", description: "20 years designing brand identities. Started in Poland, worked in Berlin, now based in New York City. I've worked with nonprofits, universities, startups, and civic organizations." },
                { heading: "The approach", description: "I believe great branding starts with listening — to stakeholders, to the community, to the history. Then you build something that feels inevitable, not forced." },
                { heading: "The work", description: "I've built brand systems for community organizations, sports nonprofits, and place-based institutions. Portfolio at ebaq.design." },
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
                { label: "New logo system", value: "Primary mark + horizontal, vertical, and icon/badge variations — built for signage, apparel, digital, and print at any size" },
                { label: "Tagline", value: "A single line that captures Chester Bowl's mission and community spirit — works standalone or paired with the logo" },
                { label: "Brand style guide", value: "Color palette (hex, CMYK, Pantone), typography selections, logo usage rules, clear space, brand elements, and do's/don'ts" },
                { label: "Application mockups", value: "Brand shown in context: ski trail signage, apparel, event materials, and social media — so your board sees it come to life" },
                { label: "Brand Kit", value: "Colors, fonts, and logo variations uploaded and organized for your team's day-to-day use" },
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
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Done before summer.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Start date", value: "Ready to begin as soon as the contract is signed — targeting late March 2026" },
                { label: "Duration", value: "4 weeks from kickoff to final delivery" },
                { label: "Deliverable deadline", value: "Complete well before your May 31, 2026 target — leaving buffer for any final adjustments" },
                { label: "Chalet launch", value: "Brand in place before the 2026 chalet opening — ready to appear on signage, materials, and new programming" },
                { label: "Meetings", value: "Four structured touchpoints: kickoff, concept workshop, feedback session, final board presentation" },
                { label: "Communication", value: "Async updates between meetings + responsive turnaround. You won't be left wondering where things stand." },
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
