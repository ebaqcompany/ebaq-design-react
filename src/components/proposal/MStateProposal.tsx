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
        <h2 className="mb-5 md:mb-6">Brand Audit &amp; Positioning Package</h2>
        <p className="md:text-md text-black/50">Comprehensive brand audit and strategic positioning — delivered in 10 weeks.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Single package — black card */}
        <div className="bg-black text-white rounded-3xl px-6 py-8 md:p-8">
          <h3 className="mb-1 text-xl leading-[1.3] md:text-2xl lg:text-3xl" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>
            Brand Audit &amp; Position
          </h3>
          <p className="text-white/50">A full strategic audit of M State's current brand, plus a clear positioning framework to guide every future creative decision.</p>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
            $30,000
            <span className="text-2xl md:text-3xl lg:text-4xl text-white/30"> /10 weeks</span>
          </div>
          <div className="my-8 h-px w-full bg-white/20" />
          <div className="grid grid-cols-1 gap-y-4 py-2">
            {[
              "Stakeholder interviews (leadership, faculty, students, alumni)",
              "Current brand audit — visual identity, tone, messaging, channels",
              "Competitive landscape analysis (peer colleges in MN/Midwest)",
              "Student perception survey design & synthesis",
              "Brand positioning framework: core value, promise, personality",
              "Messaging architecture: tagline, key messages per audience",
              "Brand narrative document (the M State story in words)",
              "Strategic recommendations report with visual direction brief",
              "Executive presentation for stakeholder alignment",
              "30-day implementation support period",
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
            title: "Discovery & Stakeholder Research",
            duration: "Weeks 1–2",
            items: "Kickoff call with leadership · Stakeholder interview plan · Faculty, staff & student focus groups · Alumni perception outreach · Collect existing brand assets and materials",
          },
          {
            num: "02",
            title: "Brand Audit",
            duration: "Weeks 3–4",
            items: "Visual identity review (logo, colors, typography, photography) · Messaging & tone audit across all channels · Web, social, print, and environmental presence · Peer institution benchmarking · Gap analysis vs. aspirational position",
          },
          {
            num: "03",
            title: "Positioning Development",
            duration: "Weeks 5–7",
            items: "Synthesize research findings · Draft brand positioning frameworks (3 strategic directions) · Define core value proposition per audience · Develop messaging architecture · Stakeholder alignment workshop",
          },
          {
            num: "04",
            title: "Recommendations & Narrative",
            duration: "Weeks 8–9",
            items: "Final positioning recommendation · Brand personality + voice guidelines · Messaging matrix (taglines, headlines, key messages) · Brand narrative document · Visual direction brief for future creative work",
          },
          {
            num: "05",
            title: "Presentation & Handoff",
            duration: "Week 10",
            items: "Executive stakeholder presentation · Implementation roadmap + quick wins · Handoff of all documents and research · 30-day support period begins",
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
          { heading: "20 years of brand strategy", description: "Two decades of brand work means I've seen what positions stick and what gets ignored the moment the ink dries. Strategy before aesthetics, always." },
          { heading: "Education sector experience", description: "Academic institutions have layered audiences — prospective students, faculty, administrators, alumni. I know how to build messaging that serves all of them without becoming generic." },
          { heading: "Research-driven process", description: "No assumptions. Every recommendation comes from real data: stakeholder interviews, competitive analysis, and quantitative perception research." },
          { heading: "Clear, actionable output", description: "You'll walk away with a document leadership can actually use — not a 200-page PDF that collects dust, but a focused strategic playbook." },
          { heading: "Community college expertise", description: "M State serves working students, career-changers, and transfer seekers. I understand the distinct positioning challenge that separates community colleges from four-year institutions." },
          { heading: "Remote-ready, always on time", description: "Based in NYC, working with clients across the country. Video-first process with async updates keeps projects moving on your schedule." },
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
export const MStateProposal = () => {
  useEffect(() => {
    // Track proposal view
    const img = new Image();
    img.src = `/api/track?page=mstate&t=${Date.now()}`;
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
          tagline="February 19, 2026"
          heading={"Brand Audit & Positioning Proposal\nM State — Minnesota State Community & Technical College"}
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
                Know where you stand before you decide where to go.
              </h2>
              <div className="space-y-6 text-lg text-black/60">
                <p>
                  M State serves a uniquely complex audience: working adults making practical life decisions, recent high school graduates weighing options, career-changers, and transfer students. Each group needs a different message — but they all need to feel like M State was built for them.
                </p>
                <p>
                  A brand audit doesn't just catalog what exists. Done right, it surfaces the <strong className="text-black">gap between how M State sees itself and how its audiences actually experience it.</strong> That gap is where the real positioning opportunity lives.
                </p>
                <p>
                  This engagement will give M State a clear, research-backed strategic foundation: who you are, who you're for, what you stand for, and exactly what to say to every audience that matters.
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
                { heading: "The approach", description: "Strategy first. I believe brand work that skips the audit phase is just decoration — pretty, but not persuasive." },
                { heading: "The work", description: "I've built positioning frameworks and identity systems for colleges, nonprofits, and established organizations. Portfolio at ebaq.design." },
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
                { label: "Brand audit report", value: "Comprehensive written assessment of M State's current visual identity, messaging, tone-of-voice, and channel presence — with competitive benchmarks and a clear gap analysis" },
                { label: "Stakeholder research synthesis", value: "Structured summary of interviews, focus groups, and survey findings — themes, tensions, and unmet audience needs documented and organized" },
                { label: "Positioning framework", value: "Core value proposition, brand promise, and personality pillars — the strategic foundation every future marketing and design decision should be tested against" },
                { label: "Messaging architecture", value: "Tagline options, audience-specific key messages (prospective students, current students, faculty, alumni, community partners), and tone-of-voice guidelines" },
                { label: "Brand narrative document", value: "The M State story told in words — a living document that communicates who you are, what you stand for, and why it matters" },
                { label: "Visual direction brief", value: "Strategic brief for future creative work — not a new identity, but clear direction for how the visual brand should evolve to match the position" },
                { label: "Executive presentation", value: "Stakeholder-ready slide deck presenting research findings, positioning recommendation, and implementation roadmap" },
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
              <h2 className="mb-5 md:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}>10 weeks, start to finish.</h2>
            </div>
            <div className="mx-auto max-w-md space-y-4">
              {[
                { label: "Contract start", value: "Ready to begin March 24, 2026 per RFP project timeline" },
                { label: "Duration", value: "10 weeks — research, audit, positioning, and final deliverables" },
                { label: "Completion target", value: "Early June 2026 — well ahead of typical academic planning cycles" },
                { label: "Collaboration format", value: "Weekly syncs via video + async Slack/email updates between sessions" },
                { label: "Your involvement", value: "Approximately 2–3 hours per week for stakeholder coordination, review sessions, and feedback rounds" },
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
        <WhyEbaqSection />

        {/* Pricing */}
        <PricingSection />

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
