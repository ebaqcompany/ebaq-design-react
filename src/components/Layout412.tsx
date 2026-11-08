import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./ui";

// Adapted from Relume Layout 412, retrieved through Relume-library MCP.
type Props = {
  tagline: string;
  heading: string;
  description: string[];
  subHeadings: { title: string; content: ReactNode }[];
  footer?: ReactNode;
  image: { src: string; alt: string; width: number; height: number };
};

export const Layout412 = ({ tagline, heading, description, subHeadings, footer, image }: Props) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduceMotion = useReducedMotion();

  return (
    <section id="overview" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-0">
          <div className="md:mr-12 lg:mr-20">
            <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm md:mb-4 text-brand-primary">{tagline}</p>
            <h2 className="mb-5 md:mb-6">{heading}</h2>
            <div className="mb-6 md:mb-8">
              {description.map((paragraph) => <p key={paragraph} className="mb-4 md:text-md">{paragraph}</p>)}
            </div>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map(({ title, content }) => (
                <div key={title}>
                  <h3 className="heading-h6 mb-3 md:mb-4">{title}</h3>
                  {content}
                </div>
              ))}
            </div>
            {footer}
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <a href="/start" className="button-primary inline-flex items-center justify-center px-6 py-3">Discuss your logo</a>
              <a href="/pricing" className="text-link">See pricing</a>
            </div>
          </div>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
            <motion.div
              className="absolute right-0 top-0"
              initial={{ width: isMobile || reduceMotion ? "100%" : "200%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: reduceMotion ? 0 : 1, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <img {...image} loading="lazy" decoding="async" className="h-auto w-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
