import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { clientLogoClass } from "../clientLogo";
import { TextLink } from "./TextLink";
import type { CaseStudyOverviewContent, CaseStudyTestimonial } from "../data/caseStudies";

type CaseStudyOverviewProps = Pick<CaseStudyOverviewContent, "heading" | "description" | "stats"> & {
  testimonial: CaseStudyTestimonial;
};

function StatValue({ value }: { value: string }) {
  const counter = useRef<HTMLSpanElement>(null);
  const inView = useInView(counter, { once: true, amount: 0.6, margin: "0px 0px -10% 0px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = counter.current;
    const parts = value.match(/^([^\d]*?)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (!node || !parts || !inView || reducedMotion) return;

    const [, prefix, number, suffix] = parts;
    const target = Number(number.replaceAll(",", ""));
    if (!Number.isFinite(target) || target === 0) return;

    const decimals = number.split(".")[1]?.length ?? 0;
    const format = new Intl.NumberFormat("en-US", {
      useGrouping: number.includes(","),
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    node.textContent = prefix + format.format(0) + suffix;
    const animation = animate(0, target, {
      delay: 0.16,
      duration: Math.abs(target) >= 100 ? 1.4 : 1.1,
      ease: (progress) => 1 - Math.pow(1 - progress, 4),
      onUpdate: (current) => {
        node.textContent = prefix + format.format(current) + suffix;
      },
      onComplete: () => {
        node.textContent = value;
      },
    });

    return () => {
      animation.stop();
      node.textContent = value;
    };
  }, [inView, reducedMotion, value]);

  return (
    <dd className="heading-h2 grid tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{value}</span>
      <span aria-hidden="true" ref={counter} className="col-start-1 row-start-1">{value}</span>
    </dd>
  );
}

export function CaseStudyOverview({ heading, description, stats, testimonial }: CaseStudyOverviewProps) {
  const metrics = (
    <dl className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
      {stats.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse justify-end gap-2 rounded-xl border border-brand-primary/30 bg-white p-8 text-center">
          <dt className="text-black/80">{label}</dt>
          <StatValue value={value} />
        </div>
      ))}
    </dl>
  );

  // Adapted from offline Relume Stats 58.
  return (
    <section id="project-overview" aria-label="Project overview" className="bg-brand-light px-[5%] py-16 text-black md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold">Project overview</p>
          <h2 className="heading-h2">{heading}</h2>
          <p className="mt-5 text-medium text-black/80">{description}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
          {metrics}
          <figure className="flex flex-col items-start justify-center rounded-xl border border-brand-primary/30 bg-white p-8 text-left md:p-12">
            <div className="mb-6 flex w-full flex-wrap items-center justify-between gap-4">
              <img src={testimonial.logo.src} alt={testimonial.logo.alt} className={clientLogoClass(testimonial.logo.scale)} loading="lazy" />
              {testimonial.sourceUrl && (
                <TextLink href={testimonial.sourceUrl} target="_blank" rel="noreferrer" className="ml-auto">
                  Verify on LinkedIn
                </TextLink>
              )}
            </div>
            <blockquote className="heading-h5">{testimonial.excerpt ?? testimonial.quote}</blockquote>
            <figcaption className="mt-6 md:mt-8">
              <div className="flex items-center gap-4">
                {testimonial.avatar && <img src={testimonial.avatar.src} alt="" className="size-14 shrink-0 rounded-full object-cover" loading="lazy" />}
                <div>
                  <p className="font-semibold leading-tight">{testimonial.name}</p>
                  <p className="leading-tight text-brand-primary">{[testimonial.position, testimonial.companyName].filter(Boolean).join(", ")}</p>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
