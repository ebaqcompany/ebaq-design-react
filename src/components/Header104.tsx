import type { ReactNode } from "react";
import { HomepageMarkerCircle, HomepageMarkerUnderline } from "./Layout484";

// Adapted from Relume Header 104, retrieved through Relume-library MCP.
type Props = {
  description: string;
  headline?: ReactNode;
  headlineLabel?: string;
  ctaLabel?: string;
  showcaseId?: string;
};

export const Header104 = ({ description, headline, headlineLabel = "Logo design that captures your brand", ctaLabel = "Discuss your logo", showcaseId = "logo-showcase" }: Props) => (
  <section id="service-hero" className="relative px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container max-w-xl text-center">
      <h1 aria-label={headlineLabel} className="logo-annotated-heading mx-auto mb-5 max-w-[52rem] md:mb-6">
        {headline ?? <><span className="block">Logo design</span>{" "}<span className="block">that <span className="relative mx-[0.08em] inline-block">captures<HomepageMarkerCircle /></span> your <span className="relative inline-block">brand<HomepageMarkerUnderline /></span></span></>}
      </h1>
      <p className="mx-auto max-w-lg md:text-md">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
        <a href="/start" className="button-primary inline-flex items-center justify-center px-6 py-3">{ctaLabel}</a>
        <a href={`#${showcaseId}`} className="button-inverted button-inverted--dark-surface hero-work-button inline-flex items-center justify-center px-6 py-3">See the work</a>
      </div>
    </div>
  </section>
);
