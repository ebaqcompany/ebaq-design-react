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
        <h2 className="mb-5 md:mb-6">Brand Refresh Package</h2>
        <p className="md:text-md text-black/50">Everything outlined in your RFP — delivered in 5 weeks, within budget.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Single package — black card */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Complete Brand Refresh
          </h3>
          <p className="text-white/50">Logo refinement + design system + Canva templates your team can use.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $15,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /5 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "DBP logo refinement (typography, color saturation, bold presence)",
              "Final typography selections + color palette",
              "Program & event branding system (consistent but flexible)",
              "Comprehensive brand guidelines document",
              "Canva templates: poster (11×17), quarter-page flyer, core brand",
              "Admin package: email signature, business card, letterhead",
              "Vector files in all formats (AI, EPS, SVG, PNG)",
              "Canva Brand Kit setup for team self-service",
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
            title: "Discovery & Audit", 
            duration: "Week 1", 
            items: "Current brand assets review · Stakeholder alignment call · Competitor & community landscape · Document strengths to preserve · Identify refinement opportunities" 
          },
          { 
            num: "02", 
            title: "Brand Refinement", 
            duration: "Week 2", 
            items: "Logo typography polish · Color saturation & vibrancy · 2–3 visual directions · Typography selections · Color palette finalization" 
          },
          { 
            num: "03", 
            title: "Design System", 
            duration: "Week 3–4", 
            items: "Program/event branding templates · Canva template creation · Poster, flyer & core brand templates · Admin package design · Brand guidelines document" 
          },
          { 
            num: "04", 
            title: "Delivery & Handoff", 
            duration: "Week 5", 
            items: "Canva Brand Kit setup · All vector files delivered · Guidelines walkthrough session · Team training on templates · 30-day support period begins" 
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
          { heading: "20 years of brand work", description: "I've spent two decades crafting identities — from startups to established organizations. Brand systems are my specialty." },
          { heading: "Nonprofit experience", description: "Worked with community organizations, arts nonprofits, and civic groups. I understand the balance between professional polish and accessible warmth." },
          { heading: "Remote-friendly", description: "Based in NYC but work with clients nationwide. Video calls, async updates, and clear deliverables keep projects moving smoothly." },
          { heading: "Templates that work", description: "I design Canva kits that non-designers actually use — clear constraints, obvious layouts, brand-safe every time." },
          { heading: "Refinement, not reinvention", description: "I hear you: DBP doesn't need a new identity — it needs its current one elevated. Preserve what works, strengthen what doesn't." },
          { heading: "On budget, on time", description: "This proposal hits your $15K max exactly. Five weeks start to finish. No scope creep, no surprises." },
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
export const BellinghamProposal = () => {
  useEffect(() => {
    // Track proposal view
    const img = new Image();
    img.src = `/api/track?page=bellingham&t=${Date.now()}`;
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
          tagline="February 18, 2026"
          heading={"Brand Refresh Proposal\nDowntown Bellingham Partnership"}
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
                Strengthen, don't reinvent.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  DBP has been the connective tissue of downtown Bellingham for years — supporting businesses, producing events, and advocating for the district. Your brand already means something to this community.
                </p>
                <p>
                  What you need isn't a new identity. It's a <strong className="text-black">refined, elevated, more confident version</strong> of what you already have. A logo that holds up at any size. Colors that pop. Templates your team can actually use without design training.
                </p>
                <p>
                  You want DBP to feel like the umbrella brand — with events and programs visually connected but individually recognizable. That's exactly what a thoughtful design system delivers.
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
                { heading: "The work", description: "I've built brand systems for startups, nonprofits, and established organizations. Portfolio at ebaq.design." },
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
                { label: "Logo refinement", value: "Updated DBP logo with refined typography, optimized color saturation, and bolder presence — vector files in AI, EPS, SVG, PNG" },
                { label: "Typography & color", value: "Final font selections with licensing guidance + comprehensive color palette with hex/CMYK/Pantone values" },
                { label: "Brand guidelines", value: "Complete guidelines document covering logo usage, spacing, colors, typography, and do's/don'ts" },
                { label: "Program/event branding", value: "Flexible design system for sub-brands — consistent with DBP while allowing individual personality" },
                { label: "Canva templates", value: "Poster (11×17), quarter-page flyer, and core brand template — built so non-designers can create on-brand materials" },
                { label: "Admin package", value: "Email signature, business card, and letterhead designs ready for print/digital use" },
                { label: "Canva Brand Kit", value: "Your colors, fonts, and logo uploaded to Canva's Brand Kit for easy team access" },
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

        {/* Timeline note */}
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
          <div className="container max-w-xl">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Timeline</p>
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Ready when you are.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Start date", value: "Flexible — ready to begin as early as April 2026" },
                { label: "Duration", value: "5 weeks from signed contract to final delivery" },
                { label: "Your 2027 launch", value: "Plenty of runway for your planned post-Greenways rebrand rollout" },
                { label: "Communication", value: "Weekly check-ins via video + async updates in your preferred channel" },
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
