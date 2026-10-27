import { RotatingLogoSymbol } from "./RotatingLogoSymbol";
import { HomepageMarkerCircle, HomepageMarkerExclamation, HomepageMarkerUnderline } from "./Layout484";

// Adapted from Relume Header 104, retrieved through Relume-library MCP.
type Props = {
  description: string;
};

export const Header104 = ({ description }: Props) => (
  <section id="service-hero" className="relative px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container max-w-xl text-center">
      <h1 aria-label="A logo that captures your brand!" className="logo-annotated-heading mb-5 md:mb-6">
        <span className="inline-block whitespace-nowrap">A logo<RotatingLogoSymbol /></span>{" "}
        that <span className="relative mx-[0.08em] inline-block">captures<HomepageMarkerCircle /></span> your{" "}
        <span className="relative mr-[0.65em] inline-block">brand<span className="sr-only">!</span><HomepageMarkerUnderline /><HomepageMarkerExclamation className="pointer-events-none absolute left-[calc(100%+0.08em)] top-[-0.05em] h-[1em] w-[0.4em] rotate-6 overflow-visible" /></span>
      </h1>
      <p className="mx-auto max-w-lg md:text-md">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
        <a href="/start" className="button-primary inline-flex items-center justify-center px-6 py-3">Discuss your logo</a>
        <a href="#selected-work" className="button-inverted button-inverted--dark-surface hero-work-button inline-flex items-center justify-center px-6 py-3">See the work</a>
      </div>
    </div>
  </section>
);
