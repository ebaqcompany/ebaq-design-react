import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import { RxPlus } from "react-icons/rx";

type Question = {
  title: string;
  answer: string;
};

type Props = {
  heading: string;
  description: string;
  questions: Question[];
};

export type Faq4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Faq4 = (props: Faq4Props) => {
  const { heading, description, questions } = {
    ...Faq4Defaults,
    ...props,
  };

  return (
    <section {...props} id="faq" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <h2 className="mb-5 md:mb-6">{heading}</h2>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <Accordion type="multiple" className="grid w-full grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="vector-card first:border-t bg-white px-4 md:px-6">
              <div className="vector-card-handles" aria-hidden="true">
                <span className="vector-card-handle vector-card-handle-top-left" />
                <span className="vector-card-handle vector-card-handle-top-right" />
                <span className="vector-card-handle vector-card-handle-bottom-right" />
                <span className="vector-card-handle vector-card-handle-bottom-left" />
              </div>
              <AccordionTrigger
                icon={<RxPlus className="size-6 shrink-0 transition-transform duration-300 md:size-8" />}
                className="gap-4 py-4 font-heading text-base leading-[1.2] tracking-normal md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                {question.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed md:pb-6 md:text-base">{question.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export const Faq4Defaults: Props = {
  heading: "FAQs",
  description: "A few practical details about working together.",
  questions: [
    {
      title: "What can you help us design?",
      answer: "I help companies with brand strategy, visual identity, websites, motion design, pitch decks, and the supporting assets needed to launch consistently.",
    },
    {
      title: "How quickly can we get started?",
      answer: "Availability depends on the current schedule. Reserve your spot and I’ll confirm the earliest realistic start date after learning what you need.",
    },
    {
      title: "How does the weekly subscription work?",
      answer: "You work directly with me for a flat weekly rate. We prioritize the highest-impact deliverables, review progress frequently, and continue for as many weeks as the engagement requires.",
    },
    {
      title: "What is included in the monthly subscription?",
      answer: "The monthly option is designed for broader engagements that may combine strategy, identity, web design, development, motion, and ongoing creative support.",
    },
    {
      title: "How do revisions work?",
      answer: "Revisions are included throughout the active engagement. Clear feedback and focused priorities help us move quickly without compromising the quality of the work.",
    },
  ],
};
