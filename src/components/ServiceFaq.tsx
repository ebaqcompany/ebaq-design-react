import type { ReactNode } from "react";
import { FaqAccordion } from "./FaqAccordion";

export const brandDesignQuestions = [
  { title: "Logo design or brand design?", answer: "Logo design creates or refines your mark. Brand design builds the wider visual identity around it, including colors, typography, visuals, and applications." },
  { title: "Do I need a new logo?", answer: "No. We can keep your existing logo, refine it, or create a new one, depending on what you need." },
  { title: "How much does it cost?", answer: "A focused engagement is $3,000 per week. A month is $10,000 when booked upfront. We agree on the scope, timing, and total before work starts." },
  { title: "How long does it take?", answer: "A focused Brand Sprint can be delivered in one week. A broader rollout may take longer; we agree on the schedule before booking." },
  { title: "What if I don’t like the concepts?", answer: "We discuss what isn’t working and refine the chosen direction together. Revisions within the agreed scope are included; extra work is agreed before proceeding." },
  { title: "What do I receive?", answer: "You receive the files and guidelines agreed for your project. We confirm the applications, formats, and editable source files before work begins." },
  { title: "When do I pay?", answer: "Once we agree on scope and timing, I send the agreement and invoice. Payment for the booked engagement is due upfront, before work begins." },
];

const Heading = ({ label, centered = false, heading = "Common questions" }: { label: string; centered?: boolean; heading?: string }) => <header className={centered ? "mb-12 text-center md:mb-18 lg:mb-20" : "mb-5 max-w-lg md:mb-6"}>
  <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">{label}</p>
  <h2>{heading}</h2>
</header>;

// Selected Relume FAQ 6: heading left, one column of boxed answers right.
export const ServiceFaq = ({ serviceName = "Brand Design", questions = brandDesignQuestions, heading, showButton = true }: { serviceName?: string; questions?: { title: string; answer: ReactNode }[]; heading?: string; showButton?: boolean }) => (
  <section id="faq" className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr_1fr] lg:gap-x-20">
      <div><Heading label="FAQs" heading={heading} /><p className="md:text-md">Learn how {serviceName.toLowerCase()} works, what’s included, and what to expect before we get started.</p>{showButton && <a href="/start" className="button-inverted mt-6 md:mt-8">Book a call</a>}</div>
      <FaqAccordion questions={questions} />
    </div>
  </section>
);
