import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Portfolio16ProjectProps } from "./Portfolio16";
import { RotatingProjectPreview } from "./RotatingProjectPreview";

type Project = Portfolio16ProjectProps & { industry: string };

type Props = {
  tagline: string;
  heading: string;
  description: string;
  projects: Project[];
};

// Relume Portfolio 23: centered introduction followed by scroll-animated project cards.
export const Portfolio23 = ({ tagline, heading, description, projects }: Props) => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <header className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">{tagline}</p>
        <h1 className="mb-5 md:mb-6">{heading}</h1>
        <p className="md:text-md">{description}</p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:gap-12 lg:gap-20">
        {projects.map((project, index) => <ProjectCard key={project.url} project={project} priority={index === 0} />)}
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, priority }: { project: Project; priority: boolean }) => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9, 1], [0.9, 1, 1, 0.95, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9, 0.95], [0, 1, 1, 0.5, 0]);

  return (
    <motion.article ref={ref} style={reduced ? undefined : { scale, opacity }} className="grid grid-cols-1 gap-x-20 gap-y-6 rounded-xl border border-black/20 bg-white p-6 text-black md:grid-cols-[3fr_4fr] md:gap-y-20 md:p-8 lg:p-12">
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="heading-h3">{project.title}</h2>
          <p className="heading-h5 mt-3 md:mt-4">{project.description}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
          <a href={project.url} className="available-button" aria-label={`View ${project.title} case study`}>View case study</a>
        </div>
      </div>
      <div>
        <RotatingProjectPreview image={project.image} images={project.images} lottie={project.lottie} url={project.url} priority={priority} fit="contain" lottieFit="cover" className="aspect-video w-full" />
      </div>
    </motion.article>
  );
};
