"use client";

import { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { Navbar16 } from "../Navbar16";
import { Header78 } from "../Header78";
import { Testimonial32 } from "../Testimonial32";
import { BookerSection } from "../BookerSection";

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
            duration: "Week 1–2", 
            items: "Stakeholder interviews · City history & heritage audit · Current brand assets review · Competitor & peer city analysis · Community identity research" 
          },
          { 
            num: "02", 
            title: "Concept Development", 
            duration: "Week 3–4", 
            items: "Strategic brand direction · 2–3 logo concepts · Color palette exploration · Typography selections · Initial feedback rounds" 
          },
          { 
            num: "03", 
            title: "Design Refinement", 
            duration: "Week 5–6", 
            items: "Selected concept polish · Full logo system buildout · Primary, horizontal, vertical, badge versions · Color system finalization · Typography hierarchy" 
          },
          { 
            num: "04", 
            title: "Brand System & Delivery", 
            duration: "Week 7–8", 
            items: "Comprehensive brand guidelines · Template design & production · Canva Brand Kit setup · Final file delivery · Training & handoff session" 
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

/* ---- Pricing section ---- */
const PricingSection = () => (
  <section id="pricing" className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
    <div className="container max-w-xl">
      <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Investment</p>
        <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Complete City Brand System</h2>
        <p className="md:text-md text-black/50">Everything outlined in RFSB No. 226023 — delivered in 8 weeks.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Single package — black card */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Complete City Brand System
          </h3>
          <p className="text-white/50">Full municipal logo redesign + comprehensive branding guide + templates.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $24,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /8 weeks</span>
          </div>
          <p className="text-white/30 text-sm mt-2">$3,000/week — consistent with ebaq.design pricing</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "Logo system (primary, horizontal, vertical, circular/badge)",
              "All file formats (AI, EPS, SVG, PNG, PDF)",
              "Color system (Pantone, CMYK, RGB, HEX values)",
              "Typography system (licensed font selections + hierarchy)",
              "Comprehensive brand guidelines document",
              "Usage rules, do's/don'ts, and clear space specs",
              "Letterhead design",
              "Business card design",
              "Email signature template",
              "Presentation template",
              "Social media templates",
              "Canva Brand Kit setup for city staff",
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

/* ---- Why Ebaq section ---- */
const WhyEbaqSection = () => (
  <section id="why-ebaq" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="container">
      <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Why Ebaq</p>
        <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
          The right fit<br />for this project.
        </h2>
      </div>
      <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12 max-w-4xl mx-auto">
        {[
          { heading: "Municipal experience", description: "I've designed identities for civic organizations, government agencies, and community institutions. I understand the need for gravitas balanced with approachability." },
          { heading: "Longevity-built systems", description: "City brands need to last decades, not years. I create flexible systems that remain relevant through administrations, technologies, and trends." },
          { heading: "Remote-first workflow", description: "Based in NYC but work with clients nationwide. Clear deliverables, video check-ins, and async updates keep projects on track regardless of distance." },
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
export const AugustaProposal = () => {
  useEffect(() => {
    // Track proposal view
    const img = new Image();
    img.src = `/api/track?page=augusta&t=${Date.now()}`;
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
          { label: "Timeline", href: "#timeline" },
          { label: "Pricing", href: "#pricing" },
          { label: "Book a Call", href: "#book" },
        ]} />

        {/* Hero */}
        <Header78
          tagline="February 18, 2026"
          heading={"City Logo & Branding Guide\nCity of Augusta, Maine"}
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
                Modernize without erasing history.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Augusta is Maine's capital — a city with deep roots, civic responsibility, and a distinct New England character. Your visual identity needs to project <strong className="text-black">civic pride, longevity, and professionalism</strong>.
                </p>
                <p>
                  The current mark has served the city since 2008. After nearly two decades, it's time for a refresh — but not a wholesale reinvention. The goal is to honor Augusta's heritage while creating a modern, versatile identity that works across every touchpoint.
                </p>
                <p>
                  You need a complete logo system (primary, horizontal, vertical, badge), a comprehensive branding guide with full color and typography specifications, and ready-to-use templates that empower city staff to maintain brand consistency.
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
                { label: "Logo system", value: "Primary, horizontal, vertical, and circular/badge versions — all formats (AI, EPS, SVG, PNG, PDF) for print and digital use" },
                { label: "Color system", value: "Full palette with Pantone, CMYK, RGB, and HEX values — primary, secondary, and accent colors with usage guidance" },
                { label: "Typography system", value: "Licensed font selections with complete hierarchy — headlines, subheads, body text, and captions" },
                { label: "Brand guidelines document", value: "Comprehensive usage rules, logo clear space, minimum sizes, do's/don'ts, and application examples" },
                { label: "Letterhead", value: "Professional letterhead design ready for print production" },
                { label: "Business cards", value: "Standard business card design with variable fields for different staff" },
                { label: "Email signature", value: "HTML email signature template for consistent digital correspondence" },
                { label: "Presentation template", value: "PowerPoint/Google Slides template with branded layouts" },
                { label: "Social media templates", value: "Profile images, cover photos, and post templates for major platforms" },
                { label: "Canva Brand Kit", value: "Colors, fonts, and logos uploaded to Canva for easy staff access and self-service design" },
              ].map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-4">
                  <p className="font-semibold mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-black/50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container max-w-xl">
            <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Timeline</p>
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Project schedule.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Submission deadline", value: "March 23, 2026 — response to RFSB No. 226023" },
                { label: "Project start", value: "May 4, 2026 — kickoff and discovery begins" },
                { label: "Duration", value: "8 weeks of focused design and development" },
                { label: "Completion", value: "July 1, 2026 — final delivery and handoff" },
                { label: "Communication", value: "Weekly video check-ins + async updates via email" },
              ].map((item, i) => (
                <div key={i} className="border-b border-black/10 pb-4">
                  <p className="font-semibold mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-black/50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* Why Ebaq */}
        <WhyEbaqSection />

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
