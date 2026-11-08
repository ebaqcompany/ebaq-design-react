import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

import type { ServiceSlug } from "../data/services";

const brandSteps = [
  { heading: "01", title: "Let’s talk about your brand", description: "I learn about your business, goals, and audience. We agree on scope and direction." },
  { heading: "02", title: "See your identity take shape", description: "I present concepts, and we refine the chosen direction together." },
  { heading: "03", title: "Put your new brand to work", description: "You receive the agreed files and guidelines, ready to use." },
];

const processCopy: Record<ServiceSlug, typeof brandSteps> = {
  "brand-design": brandSteps,
  "brand-strategy": [
    { heading: "01", title: "Let’s understand your business", description: "We discuss your goals, audience, and competitive landscape to define the questions your strategy needs to answer." },
    { heading: "02", title: "Find your brand’s direction", description: "I develop positioning and messaging, then we work through the recommendations together." },
    { heading: "03", title: "Build on a clear strategy", description: "You receive the agreed strategy and messaging in a practical reference for your brand decisions." },
  ],
  "logo-design": [
    { heading: "01", title: "Let’s talk about your logo", description: "I learn about your business and where your logo needs to work. We agree on scope and creative direction." },
    { heading: "02", title: "See your logo take shape", description: "I present concepts, explain the ideas, and refine the chosen direction with your feedback." },
    { heading: "03", title: "Put your new logo to work", description: "You receive the agreed logo variations, final files, and usage guidance." },
  ],
  "web-design": [
    { heading: "01", title: "Let’s plan your website", description: "We discuss your audience, content, and goals, then agree on the pages and experience you need." },
    { heading: "02", title: "See your website take shape", description: "I develop the structure and visual designs, then we refine the desktop and mobile layouts together." },
    { heading: "03", title: "Move into development", description: "You receive the agreed Figma designs, components, and handoff notes for the build." },
  ],
  "web-development": [
    { heading: "01", title: "Let’s plan the build", description: "We review your approved designs, content, and technical needs, then agree on scope and the right platform." },
    { heading: "02", title: "See your website come to life", description: "I build the responsive pages and agreed integrations. We review the working site and refine the details." },
    { heading: "03", title: "Launch with confidence", description: "We complete the agreed checks, launch your website, and walk through how to keep it updated." },
  ],
  "motion-graphics": [
    { heading: "01", title: "Let’s define the movement", description: "We discuss your brand, channels, and goals, then agree on the animation scope and direction." },
    { heading: "02", title: "See your brand in motion", description: "I develop keyframes and animation, then we refine the movement and timing together." },
    { heading: "03", title: "Share your brand in motion", description: "You receive the agreed exports, prepared for the websites, presentations, or social channels you need." },
  ],
};

// Relume Layout 485: sticky rolling number beside vertically scrolling steps.
export const ServiceProcess = ({ slug = "brand-design" }: { slug?: ServiceSlug }) => {
  const steps = processCopy[slug];
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
