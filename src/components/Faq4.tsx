import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useMediaQuery,
} from "@relume_io/relume-ui";
import { useEffect, useRef, useState } from "react";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { AIToolIconRow } from "./AIToolIconRow";
import { arekToolIcons } from "./ArekProfileBadge";

type Question = {
  title: string;
  answer: React.ReactNode;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  questions: Question[];
};

export type Faq4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Faq4 = (props: Faq4Props) => {
  const [openItem, setOpenItem] = useState("");
  const hoverTimer = useRef<number | null>(null);
  const opensOnHover = useMediaQuery("(min-width: 768px) and (hover: hover) and (pointer: fine)");
  const { tagline, heading, questions } = {
    ...Faq4Defaults,
    ...props,
  };

  const clearHoverTimer = () => {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };

  useEffect(() => clearHoverTimer, []);

  const openOnHover = (itemValue: string, isOpen: boolean) => {
    clearHoverTimer();
    if (!opensOnHover || isOpen) return;
    hoverTimer.current = window.setTimeout(() => {
      setOpenItem(itemValue);
      hoverTimer.current = null;
    }, 120);
  };

  const toggleFromKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, itemValue: string) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    clearHoverTimer();
    setOpenItem((item) => item === itemValue ? "" : itemValue);
  };

  return (
    <section {...props} id="faq" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold text-brand-primary md:mb-4">{tagline}</p>
            <h2>{heading}</h2>
          </div>
        </div>
        <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="mx-auto grid w-full max-w-md grid-cols-1 items-start gap-3 md:gap-4">
          {questions.map((question, index) => {
            const itemValue = `item-${index}`;
            const isOpen = openItem === itemValue;
            return (
            <AccordionItem key={index} value={itemValue} onMouseEnter={() => openOnHover(itemValue, isOpen)} onMouseLeave={clearHoverTimer} className="vector-card first:border-t bg-white px-4 md:px-6">
              <div className="vector-card-handles" aria-hidden="true">
                <span className="vector-card-handle vector-card-handle-top-left" />
                <span className="vector-card-handle vector-card-handle-top-right" />
                <span className="vector-card-handle vector-card-handle-bottom-right" />
                <span className="vector-card-handle vector-card-handle-bottom-left" />
              </div>
              <AccordionTrigger
                icon={isOpen ? <RxChevronUp className="size-6 shrink-0 md:size-8" /> : <RxChevronDown className="size-6 shrink-0 md:size-8" />}
                onPointerDown={clearHoverTimer}
                onKeyDown={(event) => toggleFromKeyboard(event, itemValue)}
                className="gap-4 py-4 font-heading text-base leading-[1.2] tracking-normal md:py-5 md:text-md"
              >
                {question.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed md:pb-6 md:text-base">{question.answer}</AccordionContent>
            </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export const Faq4Defaults: Props = {
  tagline: "FAQs",
  heading: "What clients often ask",
  description: "A few practical details about working together.",
  questions: [
    {
      title: "What do you actually help with?",
      answer: "I help companies with brand strategy, visual identity, websites, motion design, pitch decks, and the supporting assets needed to launch consistently.",
    },
    {
      title: "How fast can you start?",
      answer: <div className="flex flex-col items-start gap-3"><p>Availability depends on the current schedule. Reserve your spot and I’ll confirm the earliest realistic start date after learning what you need.</p><div className="flex flex-wrap gap-2" aria-label="Current availability"><span role="status" aria-label="1 monthly spot available" className="inline-flex items-center gap-2 rounded-full bg-background-secondary px-3 py-1.5 text-sm font-semibold"><span className="relative flex size-2" aria-hidden="true"><span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-40 motion-reduce:animate-none" /><span className="relative inline-flex size-2 rounded-full bg-green-500" /></span>1 monthly spot available</span><span role="status" aria-label="2 weekly spots available" className="inline-flex items-center gap-2 rounded-full bg-background-secondary px-3 py-1.5 text-sm font-semibold"><span className="relative flex size-2" aria-hidden="true"><span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-40 motion-reduce:animate-none" /><span className="relative inline-flex size-2 rounded-full bg-green-500" /></span>2 weekly spots available</span></div></div>,
    },
    {
      title: "How does weekly work?",
      answer: "You work directly with me for a flat weekly rate. We prioritize the highest-impact deliverables, review progress frequently, and continue for as many weeks as the engagement requires.",
    },
    {
      title: "What does monthly include?",
      answer: "The monthly option is designed for broader engagements that may combine strategy, identity, web design, development, motion, and ongoing creative support.",
    },
    {
      title: "How do revisions work?",
      answer: "Revisions are included throughout the active engagement. Clear feedback and focused priorities help us move quickly without compromising the quality of the work.",
    },
    {
      title: "Do you use AI?",
      answer: <div className="flex flex-col gap-3"><p>Yes—when it genuinely supports the work. Once I’ve established the creative direction, I may use tools such as Figma MCP, Codex, ChatGPT, and Claude to help with appropriate production tasks, from batch-uploading content across a website to batch-processing assets in Photoshop or Figma. I retain the human art direction and orchestrate the process, so clients can move suitable multi-page or content-heavy projects forward faster and get more done without giving up design judgment, strategy, or craft.</p><AIToolIconRow /></div>,
    },
    {
      title: "What tools do you use?",
      answer: <div className="flex flex-col gap-3"><p>With over 20 years of experience, I use Adobe Illustrator, Photoshop, and After Effects across branding and motion projects. I design websites—and increasingly brand identities—in Figma, then develop primarily in Framer or Webflow, with deep expertise in both. I use Spline for 3D design and animation, alongside Jitter, Lottie, Rive, and Unicorn for animation and motion graphics.</p><div className="flex flex-wrap items-center gap-2" role="list" aria-label="Software I use">{arekToolIcons.map(([src, alt, className]) => <img key={src} src={src} alt={alt} className={`size-5 rounded-[20%] object-cover ${className ?? ""}`.trim()} />)}</div></div>,
    },
    {
      title: "What do you need from me?",
      answer: "A clear decision-maker, honest feedback, and timely access to the information and assets the project needs. I’ll guide the process and keep the asks focused.",
    },
    {
      title: "Who are you best for?",
      answer: "Ambitious founders and teams who value clear thinking, distinctive design, direct collaboration, and the momentum to make decisions and move the work forward.",
    },
    {
      title: "What’s the minimum engagement?",
      answer: "Focused engagements start at $3,000 for one week. Broader ongoing work typically starts at $10,000 per month, and the contact form helps confirm the right fit before we book a call.",
    },
  ],
};
