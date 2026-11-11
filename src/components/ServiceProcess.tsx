import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

import type { ServiceSlug } from "../data/services";

const brandSteps = [
  { heading: "01", title: "Book a free call", description: "Tell me about your business, goals, and audience. We’ll discuss what you need and agree on the next steps." },
  { heading: "02", title: "Build your identity", description: "I develop your visual identity, share the work with you, and refine the chosen direction together." },
  { heading: "03", title: "Launch your brand", description: "Put your new identity to work with the files and guidelines you need to show up consistently." },
];

const processCopy: Record<ServiceSlug, typeof brandSteps> = {
  "brand-design": brandSteps,
  "brand-strategy": [
    { heading: "01", title: "Book a free call", description: "Tell me about your business and the decisions you need to make. We agree on the workshop, scope, and feedback schedule." },
    { heading: "02", title: "Define your direction", description: "We work through your audience, purpose, and positioning in a workshop. I develop the messaging and visual direction for us to review." },
    { heading: "03", title: "Put strategy to work", description: "You receive the agreed strategy brief, messaging, and mood boards to guide your identity and communications." },
  ],
  "logo-design": [
    { heading: "01", title: "Book a free call", description: "Show me your existing logo or tell me what you need. We agree on the scope, start date, and feedback schedule for your one-week sprint." },
    { heading: "02", title: "Create or refine your logo", description: "I explore new concepts or refine your existing mark, then develop the chosen direction with your feedback, colors, and fonts." },
    { heading: "03", title: "Put your new logo to work", description: "You receive your logo variations, core colors and fonts, editable files, and a simple usage guide." },
  ],
  "web-design": [
    { heading: "01", title: "Let’s plan your website", description: "We discuss your audience, content, and goals, then agree on the pages and experience you need." },
    { heading: "02", title: "Design your website", description: "I shape the structure and responsive layouts in Figma. We review and refine the design, then I build it if development is part of your scope." },
    { heading: "03", title: "Launch your website", description: "For design-only projects, you receive the organized Figma files. For a build, we test the agreed pages, forms, and features before launch and handover." },
  ],
  "web-development": [
    { heading: "01", title: "Book a free call", description: "We review your approved designs, content, and technical needs, then agree on scope and the right platform." },
    { heading: "02", title: "Build your website", description: "I build the responsive pages and agreed integrations. We review the working site and refine the details." },
    { heading: "03", title: "Launch your website", description: "We complete the agreed checks, launch your website, and walk through how to keep it updated." },
  ],
  "motion-graphics": [
    { heading: "01", title: "Book a free call", description: "We discuss your brand, channels, and goals, then agree on assets, animation length, formats, and timing." },
    { heading: "02", title: "Create the animation", description: "I develop keyframes and animation, then we refine the movement and timing together." },
    { heading: "03", title: "Put motion to work", description: "You receive the agreed exports, prepared for the websites, presentations, or social channels you need." },
  ],
};

// Relume Layout 485: sticky rolling number beside vertically scrolling steps.
export const ServiceProcess = ({ slug = "brand-design" }: { slug?: ServiceSlug }) => {
  const steps = processCopy[slug].map((step, index) => index === 0 && slug !== "logo-design" && slug !== "brand-strategy" && slug !== "web-development" && slug !== "motion-graphics" ? brandSteps[0] : step);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const updateActive = useCallback(() => {
    let next = 0;
    cards.current.forEach((card, index) => {
      if (card && card.getBoundingClientRect().top <= window.innerHeight * 0.3) next = index;
    });
    setActive(next);
  }, []);
  useMotionValueEvent(scrollY, "change", updateActive);
  useEffect(() => {
    updateActive();
    window.addEventListener("resize", updateActive);
    return () => window.removeEventListener("resize", updateActive);
  }, [updateActive]);
  return (
    <section id="brand-design-process" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <header className="mb-12 max-w-lg md:mb-16">
          <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">The process</p>
          <h2>How we work together</h2>
        </header>
        <div className="relative grid grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-[0.75fr_1fr] lg:grid-cols-[max-content_1fr] lg:gap-x-20">
          <div aria-hidden="true" className="sticky top-[20%] hidden h-56 overflow-hidden text-[14rem] font-bold leading-none md:flex">
            <span className="block h-56 shrink-0">0</span>
            <motion.div data-process-digits data-active-step={active + 1} className="shrink-0 self-start" animate={{ y: `${-active * 14}rem` }} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}>
              {steps.map((step, index) => <div key={step.heading} className="flex h-56 items-start leading-none">{index + 1}</div>)}
            </motion.div>
          </div>
          <div className="grid grid-cols-1 gap-y-12 md:gap-y-28">
            {steps.map((step, index) => <div key={step.heading} ref={node => { cards.current[index] = node; }} data-process-step>
              <ProcessStep step={step} />
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step }: { step: typeof brandSteps[number] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 30%", "end 30%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <div ref={ref} className="py-8 md:py-0">
      <span className="mb-8 block text-7xl font-bold md:sr-only">{step.heading}</span>
      <div aria-hidden="true" className="mb-8 h-0.5 overflow-hidden bg-black/20">
        <motion.div className="h-full origin-left bg-brand-primary" style={{ scaleX: reduced ? 1 : progress }} />
      </div>
      <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Step {step.heading}</p>
      <h3 className="heading-h2 mb-5 md:mb-6">{step.title}</h3>
      <p className="md:text-md">{step.description}</p>
    </div>
  );
};
