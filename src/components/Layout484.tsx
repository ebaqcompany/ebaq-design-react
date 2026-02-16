"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionStyle } from "framer-motion";

type Props = {
  tagline: string;
  heading: string;
  description?: string;
  buttons: ButtonProps[];
};

export type Layout484Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const scrollToBook = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

export const Layout484 = (props: Layout484Props) => {
  const { tagline, heading, description, buttons } = {
    ...Layout484Defaults,
    ...props,
  };

  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start center", "end center"],
  });

  const words = heading.split(" ");

  return (
    <section id="relume" className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 bg-white">
      <div className="container max-w-xl">
        <p className="mb-3 font-semibold md:mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>{tagline}</p>
        <h2 ref={headingRef} className="text-5xl md:text-7xl lg:text-8xl">
          {words.map((word, index) => {
            const start = index * 0.025;
            const end = start + 0.025;
            const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
            return (
              <React.Fragment key={index}>
                <motion.span className="inline-block" style={{ opacity } as MotionStyle}>
                  {word}
                </motion.span>
                {index < words.length - 1 && " "}
              </React.Fragment>
            );
          })}
        </h2>
        {description && (
          <p className="mt-5 text-md md:text-lg text-black/50 md:mt-6">{description}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button key={index} {...button} onClick={scrollToBook}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout484Defaults: Props = {
  tagline: "Brand Sprints",
  heading:
    "At ebaqdesign, I believe exceptional branding is possible without the wait. With nearly 20 years of experience, I've decided to create Brand Sprints. Get your branding done in just one week. Need a website?—Get it right next week.",
  buttons: [
    { title: "Book a Call", variant: "secondary" },
  ],
};
