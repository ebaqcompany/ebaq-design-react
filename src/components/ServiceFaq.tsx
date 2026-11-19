import type { ReactNode } from "react";
import { ArekProfileBadge } from "./ArekProfileBadge";
import { TextLink } from "./TextLink";
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

type ServiceFaqProps = {
  questions?: { title: string; answer: ReactNode }[];
  heading?: string;
  blueSurface?: boolean;
};

// Adapted from offline Relume FAQ 6.
export const ServiceFaq = ({
  questions = brandDesignQuestions,
  heading = "Questions founders ask",
  blueSurface = false,
}: ServiceFaqProps) => (
  <section id="faq" className={`${blueSurface ? "bg-brand-light" : "bg-surface-muted"} px-[5%] py-16 md:py-24 lg:py-28`}>
    <div className="container grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr_1fr] lg:gap-x-20">
      <div>
        <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">FAQs</p>
        <h2>{heading}</h2>
        <div className="mt-6 md:mt-8">
          <ArekProfileBadge
            variant="author"
            showSocial={false}
            authorQuote={
              <p className="font-handwriting text-handwriting font-medium leading-none tracking-handwriting">
                Still deciding?
                <span className="block text-brand-primary">Ask me directly.</span>
              </p>
            }
          />
          <div className="mt-6 flex flex-col items-start gap-4">
            <a href="/start" className="button-inverted">Book an intro call</a>
            <TextLink href="/contact">Or send me a message</TextLink>
          </div>
        </div>
      </div>
      <FaqAccordion questions={questions} blueSurface={blueSurface} />
    </div>
  </section>
);
