import { FaqAccordion } from "./FaqAccordion";

export const brandDesignQuestions = [
  { title: "What’s the difference between logo design and brand design?", answer: "Logo design creates or redesigns your logo, with colors, typography, and a focused style guide. Brand design builds the wider visual system and applications around it. You can start with a logo you already have or continue after a logo design sprint; you don’t need to redesign a logo that already works." },
  { title: "What can we realistically complete in one week?", answer: "A focused week can cover a defined part of your identity, such as colors, typography, and selected brand applications. The right scope depends on what already exists and the complexity of the work. We agree on priorities and deliverables before booking." },
  { title: "What do you need from me before we start?", answer: "Bring your business goals, audience, existing brand files, and any useful references. We’ll confirm who gives feedback and approves the work. If you need strategy or messaging first, we can include that in the project plan." },
  { title: "What happens if I don’t like the first concepts?", answer: "We talk through what isn’t working and refine the chosen direction together. Revisions within the agreed scope are included. If you want a new direction or additional work beyond that scope, we agree on the time and cost before proceeding." },
  { title: "What files and guidelines will I receive?", answer: "You receive the files agreed for your project, which may include logo variations, color and typography specifications, supporting graphics, application templates, and brand guidelines. We confirm the formats and any editable source files before work begins." },
];

const Heading = ({ label, centered = false }: { label: string; centered?: boolean }) => <header className={centered ? "mb-12 text-center md:mb-18 lg:mb-20" : "mb-5 max-w-lg md:mb-6"}>
  <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">{label}</p>
  <h2>Questions clients ask about brand design</h2>
</header>;

// Selected Relume FAQ 6: heading left, one column of boxed answers right.
export const ServiceFaq = () => (
  <section id="faq" className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr_1fr] lg:gap-x-20">
      <div><Heading label="FAQs" /><p className="md:text-md">A few things to know before we start working on your brand.</p><a href="/start" className="button-inverted mt-6 md:mt-8">Book a call</a></div>
      <FaqAccordion questions={brandDesignQuestions} />
    </div>
  </section>
);
