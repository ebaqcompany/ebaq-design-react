import React from "react";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import clsx from "clsx";

type TimelineCircleProps = { backgroundColor: MotionStyle; className?: string };
type TimelineItem = { heading: string; title: string; description: string; buttons: ButtonProps[] };
type Props = { tagline: string; taglineClassName?: string; heading: string; description: string; buttons: ButtonProps[]; timelineItems: TimelineItem[] };

export type Timeline10Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Timeline10 = (props: Timeline10Props) => {
  const { tagline, taglineClassName, heading, description, buttons, timelineItems } = { ...Timeline10Defaults, ...props };
  return (
    <section id="relume" className="overflow-clip bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="relative z-10 w-full max-w-lg">
              <p className={clsx("mb-3 font-semibold md:mb-4", taglineClassName)}>{tagline}</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
              <p className="md:text-md">{description}</p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                {buttons.map((button, index) => <Button key={index} {...button}>{button.title}</Button>)}
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-1 justify-items-center gap-12 md:gap-20">
            <div className="absolute flex h-full w-8 flex-col items-center justify-self-start md:justify-self-auto">
              <div className="timeline-track-fade-start absolute z-10 h-16 w-1" />
              <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-brand-primary" />
              <div className="h-full w-[3px] bg-brand-primary opacity-30" />
              <div className="timeline-track-fade-end absolute bottom-0 z-0 h-16 w-1" />
              <div className="absolute top-[-50vh] h-[50vh] w-full bg-brand-light" />
            </div>
            <React.Fragment>
              {timelineItems.map((item, index) => <TimelineItem key={index} index={index} item={item} />)}
            </React.Fragment>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const isEven = index % 2 === 0;
  const circleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: circleRef, offset: ["end end", "end center"] });
  const backgroundColor = {
    backgroundColor: useTransform(scrollYProgress, [0.85, 1], ["#95dff9", "#00afec"]),
  };
  return (
    <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
      {isEven ? (
        <React.Fragment>
          <div className="hidden w-full md:block" />
          <TimelineCircle ref={circleRef} backgroundColor={backgroundColor} />
          <TimelineContent item={item} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TimelineContent item={item} />
          <TimelineCircle ref={circleRef} backgroundColor={backgroundColor} className="order-first md:order-none" />
          <div className="hidden w-full md:block" />
        </React.Fragment>
      )}
    </div>
  );
};

const TimelineCircle = React.forwardRef<HTMLDivElement, TimelineCircleProps>(
  ({ backgroundColor, className }, ref) => (
    <div className={clsx("flex h-full w-8 justify-center", className)}>
      <motion.div ref={ref} style={backgroundColor} className="z-20 mt-9 size-[0.9375rem] rounded-full shadow-[0_0_0_8px_var(--color-brand-light)] md:mt-12" />
    </div>
  ),
);

const TimelineContent = ({ item }: { item: TimelineItem }) => (
  <div className="pricing-textured-surface vector-card z-20 flex flex-col p-6 md:p-8">
    <div className="vector-card-handles" aria-hidden="true">
      <span className="vector-card-handle vector-card-handle-top-left" />
      <span className="vector-card-handle vector-card-handle-top-right" />
      <span className="vector-card-handle vector-card-handle-bottom-right" />
      <span className="vector-card-handle vector-card-handle-bottom-left" />
    </div>
    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">{item.heading}</h3>
    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">{item.title}</h4>
    <p>{item.description}</p>
    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
      {item.buttons.map((button, index) => <Button key={index} {...button}>{button.title}</Button>)}
    </div>
  </div>
);

export const Timeline10Defaults: Props = {
  tagline: "How it works",
  heading: "A straightforward way to work together",
  description: "Start with a conversation. I’ll help define the right engagement, then stay directly involved through the work and delivery.",
  buttons: [],
  timelineItems: [
    { heading: "01", title: "Book a call", description: "Start with a short conversation so we can confirm availability, fit, and whether the project is ready to move forward.", buttons: [] },
    { heading: "02", title: "Discuss the project", description: "We discuss the business context, goals, timing, existing materials, decision-makers, and what needs to become clearer or more effective.", buttons: [] },
    { heading: "03", title: "Define the direction", description: "I recommend the appropriate scope and confirm the direction before the creative work begins.", buttons: [] },
    { heading: "04", title: "Create and deliver", description: "I lead the work through clear review points, focused feedback, final delivery, and practical next steps.", buttons: [] },
  ],
};
