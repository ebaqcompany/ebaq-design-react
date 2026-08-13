"use client";

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

export const Layout484 = (props: Layout484Props) => {
  const { heading, description } = {
    ...Layout484Defaults,
    ...props,
  };

  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start center", "end center"],
  });

  const highlightedPhrases = new Set(["AI has no taste,", "directly with me.", "slowed down", "\n"]);
  const tokens = heading
    .split(/(AI has no taste,|directly with me\.|slowed down|\n)/g)
    .filter(Boolean)
    .flatMap((segment) => highlightedPhrases.has(segment) ? [segment] : segment.trim().split(/\s+/).filter(Boolean));
  const firstBrandingIndex = tokens.indexOf("branding");
  const traditionalAgenciesIndex = tokens.indexOf("agencies");


  return (
    <section id="about" className="dark-section-ruler overflow-hidden bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
      <div className="container max-w-xl">
        <h2 ref={headingRef}>
          {tokens.map((token, index) => {
            if (token === "\n") {
              return <React.Fragment key={index}><br /><br /></React.Fragment>;
            }

            const start = index / tokens.length;
            const end = Math.min(1, start + 1 / tokens.length);
            const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
            const highlightStart = Math.max(0, start - 0.08);
            const highlightEnd = Math.min(1, end + 0.22);
            const highlightProgress = useTransform(scrollYProgress, [highlightStart, highlightEnd], [0, 1]);
            const highlightOpacity = useTransform(highlightProgress, [0, 0.015], [0, 1]);
            const shouldCircle = token === "AI,";
            const shouldOvalPhrase = token === "AI has no taste,";
            const shouldUnderlineBranding = token === "branding" && index === firstBrandingIndex;
            const shouldZigzag = token === "important";
            const shouldUnderlineDirect = token === "directly with me.";
            const shouldOvalPrice = token === "$25k–$100k+";
            const shouldUnderlineAgencies = token === "agencies" && index === traditionalAgenciesIndex;
            const shouldCrossOutSlowedDown = token === "slowed down";
            const shouldExclaim = index === tokens.length - 1;
            const nextToken = tokens[index + 1];
            return (
              <React.Fragment key={index}>
                <motion.span
                  className={`relative inline-block ${shouldCircle || shouldOvalPhrase ? "mx-[0.08em]" : ""}`}
                  style={{ opacity: 1 } as MotionStyle}
                >
                  <motion.span style={{ opacity } as MotionStyle}>{token}</motion.span>
                  {shouldCircle && (
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-x-[0.16em] -inset-y-[0.18em] h-[calc(100%+0.36em)] w-[calc(100%+0.32em)] overflow-visible"
                      viewBox="0 0 100 45"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M 50 2 C 78 2, 98 10, 98 23 C 98 36, 78 43, 50 43 C 22 43, 2 36, 2 23 C 2 10, 22 2, 50 2 Z"
                        className="layout484-highlight-path"
                        fill="none"
                        stroke="#00AEEF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle}
                      />
                    </svg>
                  )}
                  {shouldOvalPhrase && (
                    <svg aria-hidden="true" className="pointer-events-none absolute -inset-x-[0.08em] -inset-y-[0.12em] h-[calc(100%+0.24em)] w-[calc(100%+0.16em)] overflow-visible" viewBox="0 0 180 45" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 91 2 C 142 1, 178 10, 176 23 C 174 37, 137 44, 88 42 C 39 44, 3 36, 4 22 C 5 9, 39 3, 91 2 Z" fill="none" stroke="#00AEEF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                  {shouldUnderlineBranding && (
                    <svg aria-hidden="true" className="pointer-events-none absolute -inset-x-[0.04em] bottom-[-0.08em] h-[0.22em] w-[calc(100%+0.08em)] overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 2 10 C 24 4, 43 16, 64 9 C 77 5, 88 13, 98 8" fill="none" stroke="#00AEEF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                  {shouldZigzag && (
                    <svg aria-hidden="true" className="pointer-events-none absolute -inset-x-[0.04em] bottom-[-0.1em] h-[0.24em] w-[calc(100%+0.08em)] overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 1 13 L 8 5 L 15 14 L 22 6 L 29 14 L 36 5 L 43 13 L 50 6 L 57 14 L 64 5 L 71 13 L 78 6 L 85 14 L 92 5 L 99 12" fill="none" stroke="#00AEEF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                  {shouldUnderlineDirect && (
                    <svg aria-hidden="true" className="pointer-events-none absolute -inset-x-[0.03em] bottom-[-0.08em] h-[0.22em] w-[calc(100%+0.06em)] overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 1 11 C 19 16, 37 5, 55 11 C 71 16, 84 7, 99 10" fill="none" stroke="#00AEEF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                  {shouldUnderlineAgencies && (
                    <svg aria-hidden="true" className="pointer-events-none absolute -inset-x-[0.04em] bottom-[-0.08em] h-[0.22em] w-[calc(100%+0.08em)] overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 2 11 C 23 5, 44 15, 63 9 C 78 5, 89 13, 98 8" fill="none" stroke="#00AEEF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                  {shouldOvalPrice && (
                    <svg aria-hidden="true" className="pointer-events-none absolute -inset-x-[0.09em] -inset-y-[0.12em] h-[calc(100%+0.24em)] w-[calc(100%+0.18em)] overflow-visible" viewBox="0 0 150 45" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 76 2 C 118 1, 148 10, 146 23 C 145 37, 114 44, 73 42 C 32 44, 3 36, 4 22 C 5 9, 33 3, 76 2 Z" fill="none" stroke="#00AEEF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                  {shouldCrossOutSlowedDown && (
                    <svg aria-hidden="true" className="pointer-events-none absolute -inset-x-[0.04em] -inset-y-[0.04em] h-[calc(100%+0.08em)] w-[calc(100%+0.08em)] overflow-visible" viewBox="0 0 100 45" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 2 3 C 26 14, 73 31, 98 42" fill="none" stroke="#00AEEF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                      <motion.path className="layout484-highlight-path" d="M 97 2 C 75 12, 25 33, 3 43" fill="none" stroke="#00AEEF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                  {shouldExclaim && (
                    <svg aria-hidden="true" className="pointer-events-none absolute left-[calc(100%+0.08em)] top-[calc(-0.18em-5px)] h-[1.4em] w-[0.5em] rotate-6 overflow-visible" viewBox="0 0 24 50" preserveAspectRatio="none">
                      <motion.path className="layout484-highlight-path" d="M 4 3 C 9 2, 15 3, 20 5 L 14 35 C 12 37, 10 37, 8 34 Z" fill="none" stroke="#00AEEF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                      <motion.path className="layout484-highlight-path" d="M 7 44 C 8 40, 15 40, 17 44 C 18 48, 9 49, 7 44 Z" fill="none" stroke="#00AEEF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: highlightOpacity, pathLength: highlightProgress } as MotionStyle} />
                    </svg>
                  )}
                </motion.span>
                {index < tokens.length - 1 && nextToken !== "\n" && " "}
              </React.Fragment>
            );
          })}
        </h2>
        {description && <p className="mt-8 max-w-2xl text-white/70">{description}</p>}
      </div>
    </section>
  );
};

export const Layout484Defaults: Props = {
  tagline: "Brand Sprint",
  heading:
    "In the age of AI, branding is more important than ever. Anyone can make a website and generate a logo now, but too many brands look alike—AI has no taste, and sameness costs you credibility.\nTraditional agencies charge $25k–$100k+ and take months to deliver. Avoid guesswork, endless handoffs, and patchwork solutions.\nDon’t get slowed down by bloated agencies. At Ebaq Design, you work directly with me. I believe good branding is possible without the wait or breaking the bank.",
  buttons: [
    { title: "Book a Call" },
  ],
};
