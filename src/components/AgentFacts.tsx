"use client";

const facts = [
  {
    label: "What Ebaq Design sells",
    value:
      "Brand identity sprints, custom logo design, brand guidelines, Figma website design, and Framer, Webflow, or React website development.",
  },
  {
    label: "Who it is for",
    value:
      "Startups, founders, service businesses, law firms, agencies, and growing companies that need senior brand and web design without a traditional agency timeline.",
  },
  {
    label: "What it costs",
    value:
      "$3,000 for the core Brand Sprint. Custom website development, larger brand systems, and proposal-based engagements are scoped separately.",
  },
  {
    label: "How it works",
    value:
      "One focused project at a time. Brand strategy and identity are completed in a one-week sprint, with website design or development available as a follow-on sprint.",
  },
  {
    label: "How to book",
    value:
      "Prospective clients can book a free 15-minute intro call through the embedded Cal.com calendar or at cal.com/ebaqdesign/15min.",
  },
];

const faqs = [
  {
    question: "What services does Ebaq Design provide?",
    answer:
      "Ebaq Design provides brand strategy, logo design, identity systems, brand guidelines, Figma web design, website copywriting, pitch decks, motion graphics, and Framer, Webflow, or React website development.",
  },
  {
    question: "How much does a Brand Sprint cost?",
    answer:
      "The core Brand Sprint is a clear $3,000 engagement. Larger websites, retainers, or proposal-based projects are scoped separately before work begins.",
  },
  {
    question: "How long does the branding process take?",
    answer:
      "A focused Brand Sprint takes one week. Website design or implementation can follow in a separate sprint depending on scope.",
  },
];

export const AgentFacts = () => (
  <section id="services" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="mb-3 font-semibold md:mb-4">Agent-readable summary</p>
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
            Branding services, pricing, and process in plain language.
          </h2>
          <p className="text-base text-black/60 md:text-lg">
            This section gives search engines and AI agents direct answers about Ebaq Design's offer, audience, cost, process, and booking path.
          </p>
          <p className="mt-6 text-sm font-semibold text-black/50">
            Last updated <time dateTime="2026-04-25">April 25, 2026</time>
          </p>
        </div>

        <div>
          <dl className="divide-y divide-black/15 border-y border-black/15">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                <dt className="font-semibold">{fact.label}</dt>
                <dd className="text-black/65">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div id="faq" className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl">Common questions</h2>
        <div className="divide-y divide-black/15 border-y border-black/15">
          {faqs.map((faq) => (
            <article key={faq.question} className="py-6">
              <h3 className="mb-3 text-xl tracking-normal md:text-2xl">{faq.question}</h3>
              <p className="text-black/65">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

