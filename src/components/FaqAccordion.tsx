import { useState, type ReactNode } from "react";
import { RxChevronDown } from "react-icons/rx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui";

type Question = { title: string; answer: ReactNode };
export const FaqAccordion = ({ questions, columns = 1, blueSurface = false }: { questions: Question[]; columns?: 1 | 2; blueSurface?: boolean }) => {
  const [open, setOpen] = useState("");
  const groups = columns === 2 ? [questions.slice(0, Math.ceil(questions.length / 2)), questions.slice(Math.ceil(questions.length / 2))] : [questions];
  return <Accordion type="single" collapsible value={open} onValueChange={setOpen} className={`grid w-full items-start gap-4 ${columns === 2 ? "mx-auto max-w-xl md:grid-cols-2 md:gap-8" : ""}`}>
    {groups.map((group, column) => <div key={column} className="grid gap-4">{group.map((question,index) => {
      const value = `${column}-${index}`;
      return <AccordionItem key={question.title} value={value} className={`rounded-xl border bg-white px-4 md:px-6 ${blueSurface ? "border-brand-primary/30" : "border-black/20"}`}>
        <AccordionTrigger icon={<RxChevronDown aria-hidden="true" className="size-6 shrink-0 md:size-8" />} className="gap-4 py-5 text-left">
          <span className="heading-h7">{question.title}</span>
        </AccordionTrigger>
        <AccordionContent forceMount hidden={open!==value} className="pb-5 text-base leading-relaxed md:pb-6">{question.answer}</AccordionContent>
      </AccordionItem>;
    })}</div>)}
  </Accordion>;
};
