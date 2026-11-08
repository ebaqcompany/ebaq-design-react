import { FaqAccordion } from "./FaqAccordion";
import { AIToolIconRow } from "./AIToolIconRow";
import { arekToolIcons } from "./ArekProfileBadge";
import { founder, pricingFaqs, studioFaqs, type FactFaq } from "../content/siteFacts";

// Keep answers in the HTML on the server and client; closed panels are hidden visually.
const factQuestion = ({ question, answer }: FactFaq): Question => ({ title: question, answer });

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
  const { tagline, heading, questions } = {
    ...Faq4Defaults,
    ...props,
  };
  // Content props configure the section; only real HTML attributes belong on the element.
  const sectionProps = Object.fromEntries(Object.entries(props).filter(([key]) => !(key in Faq4Defaults)));

  return (
    <section {...sectionProps} id="faq" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">{tagline}</p>
            <h2 className="whitespace-pre-line text-balance">{heading}</h2>
          </div>
        </div>
        <FaqAccordion questions={questions} columns={2} blueSurface />
      </div>
    </section>
  );
};

export const Faq4Defaults: Props = {
  tagline: "FAQs",
  heading: "What clients often ask",
  description: "A few practical details about working together.",
  questions: [
    ...pricingFaqs.map(factQuestion),
    {
      title: "How fast can you start?",
      answer: <p>Book a call to discuss your project and confirm a start date.</p>,
    },
    ...studioFaqs.map(factQuestion),
    {
      title: "What tools do you use?",
      answer: <div className="flex flex-col gap-3"><p>With {founder.experience} of experience, I use Adobe Illustrator, Photoshop, and After Effects across branding and motion projects. I design websites—and increasingly brand identities—in Figma, then develop primarily in Framer or Webflow, with deep expertise in both. I use Spline for 3D design and animation, alongside Jitter, Lottie, Rive, and Unicorn for animation and motion graphics.</p><div className="flex flex-wrap items-center gap-2" role="list" aria-label="Software I use">{arekToolIcons.map(([src, alt, className]) => <img loading="lazy" decoding="async" key={src} src={src} alt={alt} className={`size-5 rounded-[20%] object-cover ${className ?? ""}`.trim()} />)}</div></div>,
    },
    {
      title: "Do you use AI?",
      answer: <div className="flex flex-col gap-3"><p>Yes—when it genuinely supports the work. Once I’ve established the creative direction, I may use tools such as Figma MCP, Codex, ChatGPT, and Claude to help with appropriate production tasks, from batch-uploading content across a website to batch-processing assets in Photoshop or Figma. I retain the human art direction and orchestrate the process, so clients can move suitable multi-page or content-heavy projects forward faster and get more done without giving up design judgment, strategy, or craft.</p><AIToolIconRow /></div>,
    },
  ],
};
