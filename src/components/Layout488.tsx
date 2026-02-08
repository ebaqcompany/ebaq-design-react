"use client";

import { useRef } from "react";
import { useMediaQuery } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";

type ImageProps = {
  src: string;
  alt: string;
};

type Props = {
  leftHeading: string;
  image: ImageProps;
  rightHeading: string;
  mobileHeading: string;
};

export type Layout488Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout488 = (props: Layout488Props) => {
  const { leftHeading, image, rightHeading, mobileHeading } = {
    ...Layout488Defaults,
    ...props,
  };

  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Headings slide in during first half of scroll
  const leftHeadingX = useTransform(scrollYProgress, [0, 0.35], ["10rem", "0rem"]);
  const rightHeadingX = useTransform(scrollYProgress, [0, 0.35], ["-10rem", "0rem"]);

  // Image scales up during first half
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.35],
    isMobile ? [0.7, 1] : [0.2, 1]
  );

  // Overlay expands during second half
  const overlaySize = useTransform(
    scrollYProgress,
    [0.35, 0.7],
    isMobile ? ["10vw", "250vw"] : ["10vw", "200vw"]
  );

  return (
    <section id="relume" className="relative h-[200vh]" ref={sectionRef}>
      <div className="sticky top-0 grid h-svh grid-cols-[60%] content-center items-center justify-center justify-items-center gap-4 overflow-hidden px-[5%] md:grid-cols-[40%_max-content_40%] md:gap-8 lg:h-screen">
        <motion.h2
          className="relative z-10 hidden justify-self-end whitespace-nowrap text-[4rem] font-bold md:flex lg:text-[6rem]"
          style={{ x: leftHeadingX }}
        >
          {leftHeading}
        </motion.h2>
        <motion.div
          className="relative order-first flex w-full min-w-16 max-w-[24rem] items-center justify-center md:order-none"
          style={{ scale: imageScale }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="aspect-square size-full rounded-full object-cover"
          />
          <motion.div
            className="absolute -z-10 rounded-full bg-neutral-lightest"
            style={{ width: overlaySize, height: overlaySize }}
          />
        </motion.div>
        <motion.h2
          className="relative z-10 hidden justify-self-start whitespace-nowrap text-[4rem] font-bold md:flex lg:text-[6rem]"
          style={{ x: rightHeadingX }}
        >
          {rightHeading}
        </motion.h2>
        <motion.h2 className="relative z-10 mt-10 flex justify-self-center whitespace-nowrap text-3xl font-bold leading-[1.2] sm:text-8xl md:hidden">
          {mobileHeading}
        </motion.h2>
      </div>
      <div className="absolute inset-0 -z-10 mt-[100vh]" />
    </section>
  );
};

export const Layout488Defaults: Props = {
  leftHeading: "Hire a",
  image: {
    src: "/arek-pic.jpg",
    alt: "Arek",
  },
  rightHeading: "real expert.",
  mobileHeading: "Hire a real expert.",
};
