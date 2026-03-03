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
        <h2 className="mb-5 md:mb-6">Brand & Messaging Framework</h2>
        <p className="md:text-md text-black/50">Complete brand strategy, visual identity, and messaging framework — within your $30,000 budget.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Brand & Messaging Framework
          </h3>
          <p className="text-white/50">Discovery, brand strategy, visual identity system, messaging guidelines, and comprehensive brand book.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $30,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /10 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "Brand discovery & assessment — stakeholder interviews, audience research, competitive landscape",
              "Audience personas & journey mapping — primary segments across Education, Immigration, Housing",
              "Brand positioning framework — clear articulation of Latino Policy Forum's distinct value",
              "Messaging architecture — core messages, tone of voice, and communication priorities by audience",
              "Updated visual brand guide — refreshed logo usage, color palette, typography system",
              "Tone, voice & style guidelines — written communication standards for all channels",
              "Comprehensive brand book — complete reference document for staff and board",
              "Staff & board presentation — walkthrough of the full framework with Q&A",
              "Canva Brand Kit setup for staff self-service",
              "30-day post-delivery support",
            ].map((f, i) => (
              <div key={i} className="flex self-start">
                <div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-[#00afec]" /></div>
                <p>{f}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/40">Fixed fee: $30,000 · Billing: 30% at kickoff, 40% at mid-point delivery, 30% at final delivery · Reimbursable expenses billed at cost</p>
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
            title: "Discovery & Assessment",
            duration: "Weeks 1–2",
            items: "Stakeholder interviews (staff, board, community partners) · Audience research across Education, Immigration, Housing focus areas · Brand audit of current materials · Competitive landscape analysis · Identify positioning gaps and communication strengths"
          },
          {
            num: "02",
            title: "Strategy & Personas",
            duration: "Weeks 3–4",
            items: "Audience personas developed for each key segment · Journey mapping across touchpoints · Brand positioning statement and value proposition · Messaging hierarchy — primary, secondary, and tertiary messages · Internal review + stakeholder alignment session"
          },
          {
            num: "03",
            title: "Visual Identity & Voice",
            duration: "Weeks 5–7",
            items: "Updated visual brand guide — logo usage, color palette, typography · Brand elements and visual language · Tone, voice & style guidelines · Written communication standards · Application examples across print and digital"
          },
          {
            num: "04",
            title: "Brand Book & Presentation",
            duration: "Weeks 8–10",
            items: "Comprehensive brand book compiled · All frameworks, guidelines, and tools in one document · Canva Brand Kit setup · Staff and board presentation with Q&A · Final revisions and delivery · 30-day support period begins"
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
          { heading: "20 years of brand identity work", description: "I've built brand systems for advocacy organizations, nonprofits, academic institutions, and mission-driven businesses. Brand strategy combined with visual execution — not one or the other." },
          { heading: "Advocacy org & equity brand experience", description: "Organizations doing policy and equity work have a unique communication challenge: speaking credibly to policy audiences while staying connected to the communities they serve. I understand that tension." },
          { heading: "Strategy + design in one engagement", description: "Most engagements split brand strategy and visual identity into separate contracts. I deliver both — a cohesive framework where the messaging and the visuals reinforce each other." },
          { heading: "Deliverables your whole team can use", description: "The brand book and guidelines are designed for real staff use — not a PDF that lives in a drawer. Practical, accessible, and built for your day-to-day communication needs." },
          { heading: "Purpose-driven approach", description: "Latino Policy Forum's work on education, immigration, and housing equity matters. That mission deserves a brand that communicates with clarity and conviction to every audience." },
          { heading: "On budget, on time", description: "10 weeks. $30,000 fixed fee — within your stated budget. Complete by July 2026 with milestones you can plan around." },
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
export const LatinoForumProposal = () => {
  useEffect(() => {
    const img = new Image();
    img.src = `/api/track?page=latinoforum&t=${Date.now()}`;
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
          heading={"Brand & Messaging Framework\nLatino Policy Forum"}
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
                Brand clarity at the intersection of policy and community.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  Latino Policy Forum has been at the center of Latino equity advocacy in Illinois for decades — driving policy on education, immigration, and housing. That work is real and consequential. But brand clarity matters now more than ever.
                </p>
                <p>
                  You need a framework that answers: what do we stand for, who are we speaking to, and how do we say it consistently? A brand that works for a state legislator and a Chicago community member. A visual identity that signals credibility without losing warmth.
                </p>
                <p>
                  The deliverables are clear: <strong className="text-black">brand assessment, audience personas, positioning framework, messaging architecture, updated visual brand guide, tone and voice guidelines, and a comprehensive brand book</strong>. I've done exactly this work for advocacy organizations — and I know how to build tools your team will actually use.
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
                { heading: "The background", description: "20 years of brand strategy and identity design. Started in Poland, worked in Berlin, now based in New York. I've worked with nonprofits, advocacy organizations, academic institutions, and civic bodies." },
                { heading: "The approach", description: "Effective brand frameworks start with listening — to stakeholders, to audiences, to the history of the organization. Then the visual and verbal identity flows naturally from that strategic foundation." },
                { heading: "The work", description: "Brand systems, messaging frameworks, and identity guides for purpose-driven organizations. I work solo — your project gets my full attention, not a junior team. Portfolio at ebaq.design." },
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
                { label: "Discovery & assessment report", value: "Findings from stakeholder interviews, audience research, brand audit, and competitive landscape — the foundation everything else builds on" },
                { label: "Audience personas", value: "Detailed personas for primary segments across Education, Immigration, and Housing focus areas — with communication implications for each" },
                { label: "Journey mapping", value: "How each audience type discovers, engages with, and builds trust with Latino Policy Forum — identifies gaps and opportunities" },
                { label: "Brand positioning framework", value: "Clear articulation of what makes Latino Policy Forum distinct: your positioning statement, core value proposition, and strategic narrative" },
                { label: "Messaging architecture", value: "Core messages, secondary messages, and audience-specific messaging by persona — a practical matrix for your communications team" },
                { label: "Updated visual brand guide", value: "Refreshed logo usage rules, color palette with full specs, typography system, and visual language guidance" },
                { label: "Tone, voice & style guidelines", value: "Written communication standards: how Latino Policy Forum sounds in advocacy materials, press releases, social media, and community communications" },
                { label: "Comprehensive brand book", value: "A single, beautifully designed reference document bringing together all strategy, messaging, and visual guidance for staff, board, and partners" },
                { label: "Staff & board presentation", value: "Live walkthrough of the full framework with Q&A — so leadership is aligned and staff know how to use it" },
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
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>Complete by July 2026.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Project start", value: "Ready to begin April 2026 following contract signing" },
                { label: "Duration", value: "10 weeks from kickoff to final delivery" },
                { label: "Discovery phase (Weeks 1–2)", value: "Stakeholder interviews + audience research + brand audit" },
                { label: "Strategy phase (Weeks 3–4)", value: "Personas, journey mapping, positioning, and messaging framework draft delivered for review" },
                { label: "Visual + voice phase (Weeks 5–7)", value: "Updated visual brand guide and tone/voice guidelines" },
                { label: "Brand book + presentation (Weeks 8–10)", value: "Full brand book compiled, Canva Kit set up, staff/board presentation delivered" },
                { label: "Completion", value: "Final delivery by July 2026 — within your stated project window" },
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
