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
        <h2 className="mb-5 md:mb-6">Brand Identity + Website</h2>
        <p className="md:text-md text-black/50">Complete brand system and new website for the merged organization — ten weeks, within your $30,000 budget.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Brand + Website Package
          </h3>
          <p className="text-white/50">New brand identity and website built to scale with special events and grow with the merged organization.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $30,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /10 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <p className="text-sm text-white/60 uppercase tracking-widest mb-4">Phase 1 — Brand Identity · $12,000</p>
          <div className="grid grid-cols-1 gap-y-4 py-2 mb-8">
            {[
              "New logo for the merged organization — primary mark + horizontal, stacked, and icon variations",
              "Color palette, typography, and complete visual identity system",
              "Brand style guide — usage rules, clear space, color specs (hex, CMYK, Pantone)",
              "Application mockups: signage, social media, event materials",
              "All source files: AI, EPS, SVG, PNG — full-color, reversed, and one-color versions",
            ].map((f, i) => (
              <div key={i} className="flex self-start">
                <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                <p>{f}</p>
              </div>
            ))}
          </div>
          <div className="my-4 h-px w-full bg-white/20" />
          <p className="text-sm text-white/60 uppercase tracking-widest mb-4 mt-4">Phase 2 — Website · $18,000</p>
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "Website strategy and sitemap — built around the merged org's programs and audiences",
              "Full visual design (desktop + mobile) — consistent with the new brand system",
              "Development and build — optimized for special events, internal scaling, and content management",
              "Integrations for events, membership, and newsletter as needed",
              "30-day post-launch support",
            ].map((f, i) => (
              <div key={i} className="flex self-start">
                <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                <p>{f}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/40">Hourly rate: $150/hr · Estimated 200 hours · Fixed-price $30,000 · Reimbursable expenses billed at cost</p>
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
            title: "Discovery & Brand Strategy",
            duration: "Weeks 1–2",
            items: "Kickoff call with both organizations' leadership · Stakeholder interviews · Community and audience research · Audit of existing LC and LU visual assets · Define the merged org's brand territory, values, and positioning · Name direction alignment (if needed)"
          },
          {
            num: "02",
            title: "Brand Identity Design",
            duration: "Weeks 3–4",
            items: "Present 2–3 logo concepts with rationale · Color palette, typography, and visual language exploration · Stakeholder feedback and refinement · Finalize logo system · Application mockups (signage, social, event collateral) · Brand style guide completed"
          },
          {
            num: "03",
            title: "Website Strategy & Design",
            duration: "Weeks 5–7",
            items: "Sitemap and information architecture · Wireframes for key pages · Full visual design aligned with new brand · Mobile-first responsive design · Internal review and revisions · Design handoff"
          },
          {
            num: "04",
            title: "Website Development & Launch",
            duration: "Weeks 8–10",
            items: "Development build · Events and special event integrations · CMS setup so your team can update content · QA across devices · Launch · 30-day post-launch support period"
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
          { heading: "20 years of brand identity work", description: "I've built visual identities for community development orgs, nonprofits, and civic institutions. A merger brand is one of the most nuanced projects in this work — I understand the internal and external dimensions." },
          { heading: "Merger narratives are a specialty", description: "When two organizations with 25-year histories come together, the brand has to honor both legacies while feeling genuinely new. I know how to navigate that conversation with leadership and community stakeholders alike." },
          { heading: "Brand + web as one system", description: "The website and brand identity are built together from day one — not handed off between separate vendors who don't talk to each other. Every design decision feeds both." },
          { heading: "Built to scale internally", description: "Your CMS will be straightforward enough for your team to manage. I build content architecture that your staff can maintain and your community can use, without ongoing developer dependency." },
          { heading: "Special event support built in", description: "The website is designed from the start to handle event pages, registration, and community programming. Not bolted on as an afterthought." },
          { heading: "On budget, fixed scope", description: "Fixed-price $30,000 — within your stated budget. No scope creep, no billing surprises. Clear milestones so you know exactly where things stand at every point." },
        ].map((section, i) => (
          <div key={i}>
            <h3 className="mb-3 text-xl md:mb-4 md:text-2xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>{section.heading}</h3>
            <p className="text-black/50">{section.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a href="https://ebaq.design" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00afec] font-semibold hover:underline">
          View portfolio at ebaq.design →
        </a>
      </div>
    </div>
  </section>
);

/* ============ MAIN PROPOSAL ============ */
export const LawrencevilleProposal = () => {
  useEffect(() => {
    const img = new Image();
    img.src = `/api/track?page=lawrenceville&t=${Date.now()}`;
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
          tagline="February 25, 2026"
          heading={"Brand Identity + Website Proposal\nLawrenceville Corporation + Lawrenceville United"}
          description="Prepared by Arek Dvornechuck — ebaq.design"
          buttons={[]}
          showRows={[1, 3]}
        />

        {/* Understanding the Brief */}
        <section id="understanding" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Understanding the Brief</p>
              <h2 className="mb-8 text-4xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>
                One organization. A new identity.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Lawrenceville United and Lawrenceville Corporation have been the backbone of Pittsburgh's Lawrenceville neighborhood for 25 years — working side by side on residential development, small business support, and community planning. After a two-year joint strategic planning process, the two organizations are merging into one.
                </p>
                <p>
                  That's a significant moment. A merger isn't just an operational change — it's a chance to build something new that honors both histories without being defined by either one. The new brand needs to speak for the whole community: residents, small businesses, stakeholders, and the next generation of Lawrenceville.
                </p>
                <p>
                  Alongside the brand, the merged organization needs a <strong className="text-black">new website</strong> — one built to support special events, scale with internal capacity, and serve as the definitive digital home for everything the new organization does.
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
                { heading: "The background", description: "20 years designing brand identities and websites for organizations that matter to their communities. Started in Poland, worked in Berlin, now based in New York City." },
                { heading: "The approach", description: "Community organizations carry decades of trust. The design process has to involve the people who hold that trust — leadership, stakeholders, and community voices — not just a designer working alone." },
                { heading: "The work", description: "Brand systems, websites, and identity frameworks for nonprofits, civic orgs, and community development corporations. Portfolio at ebaq.design." },
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
                { label: "New logo system", value: "Primary mark + horizontal, stacked, and icon/badge variations — designed for signage, social media, print, and every scale the merged org operates at" },
                { label: "Visual identity system", value: "Color palette (hex, CMYK, Pantone), typography, visual language, and all brand elements — built for a community development organization with diverse audiences" },
                { label: "Brand style guide", value: "Complete usage rules, clear space, color specs, typography hierarchy — everything needed for consistent, confident application across all channels" },
                { label: "Application mockups", value: "Brand shown in real contexts: signage, event materials, social media, print — so your board, leadership, and community can see the full vision" },
                { label: "New website (design + development)", value: "Strategy, sitemap, wireframes, visual design, development, and launch — mobile-first, event-ready, CMS-powered so your team can manage content independently" },
                { label: "All source files", value: "AI, EPS, SVG, PNG — full-color, reversed (white), and one-color versions of every logo variation, plus full design files for the website" },
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
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Ten weeks to launch.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Start date", value: "Ready to begin immediately upon contract signing — targeting late March 2026" },
                { label: "Phase 1 — Brand Identity", value: "Weeks 1–4 · Discovery, stakeholder interviews, logo concepts, refinement, final brand system and style guide" },
                { label: "Phase 2 — Website", value: "Weeks 5–10 · Strategy, sitemap, wireframes, visual design, development, QA, and launch" },
                { label: "Total duration", value: "10 weeks from kickoff to website launch" },
                { label: "Milestones", value: "4 structured review points — brand strategy, logo concepts, website design, and pre-launch QA. Your leadership always knows exactly where things stand." },
                { label: "Post-launch support", value: "30-day included support period after website launch. Team training on CMS included." },
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
