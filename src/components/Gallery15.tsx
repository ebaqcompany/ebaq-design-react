import { useEffect, useState } from "react";
import clsx from "clsx";
import { useReducedMotion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui";
import type { CarouselApi } from "./ui";

// Relume Gallery 15: a one-up carousel. Each slide pairs a client's original logo with the redesign,
// framed identically (same crop, same scale) so the comparison stays honest.
// Auto-advances; pauses while hovered or focused, and stays still for reduced-motion visitors.
const AUTOPLAY_MS = 2000;
type Redesign = { client: string; slug: string };

type Props = {
  tagline: string;
  heading: string;
  description: string;
  redesigns: Redesign[];
};

export type Gallery15Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const LogoFrame = ({ src, alt, label }: { src: string; alt: string; label: string }) => (
  <div>
    <img src={src} alt={alt} width={1200} height={800} loading="lazy" decoding="async" className="block aspect-[3/2] h-auto w-full border border-border-primary/10 bg-white" />
    <p className="mt-3 text-center text-sm font-semibold uppercase tracking-wide">{label}</p>
  </div>
);

export const Gallery15 = (props: Gallery15Props) => {
  const { tagline, heading, description, redesigns, ...sectionProps } = { ...Gallery15Defaults, ...props };
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || reduceMotion) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [api, paused, reduceMotion]);

  return (
    <section className="overflow-hidden bg-white px-[5%] py-16 md:py-24 lg:py-28" aria-labelledby="gallery15-heading" {...sectionProps}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">{tagline}</p>
          <h2 id="gallery15-heading" className="mb-5 md:mb-6">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>
        <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="mx-auto max-w-[64rem] overflow-hidden"
          aria-label="Logo redesigns, before and after"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative">
            <CarouselContent className="ml-0">
              {redesigns.map(({ client, slug }, index) => (
                <CarouselItem key={slug} className="px-0 md:px-20" aria-label={`${index + 1} of ${redesigns.length}: ${client}`}>
                  <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                    <LogoFrame src={`/images/about/logofix/${slug}-before.webp`} alt={`${client} logo before the redesign`} label="Before" />
                    <LogoFrame src={`/images/about/logofix/${slug}-after.webp`} alt={`${client} logo after the redesign`} label="After" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="testimonial-carousel-button top-[calc(50%-1rem)] hidden size-12 md:flex" />
            <CarouselNext className="testimonial-carousel-button top-[calc(50%-1rem)] hidden size-12 md:flex" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center md:mt-12">
            {redesigns.map(({ client }, index) => (
              <button
                key={client}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Show ${client}`}
                aria-current={current === index}
                className="p-1"
              >
                <span className={clsx("block size-2 rounded-full", current === index ? "bg-black" : "bg-black/20")} />
              </button>
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export const Gallery15Defaults: Props = {
  tagline: "Before & after",
  heading: "Logo redesigns, side by side",
  description: "Before arriving at a final design, I develop dozens of sketches and explore several different directions, then refine the strongest one until every detail earns its place.",
  redesigns: [
    { client: "Airport Executive", slug: "ae" },
    { client: "The Savory Team", slug: "savory" },
    { client: "Brevidee (formerly Peersuma)", slug: "brevidee" },
    { client: "Periti", slug: "periti" },
    { client: "Elevate", slug: "elevate" },
    { client: "Fox Berman", slug: "foxberman" },
    { client: "Sukoon Travel Group", slug: "sukoon" },
    { client: "Wingnut", slug: "wingnut" },
    { client: "Next Dimension", slug: "nextdim" },
    { client: "CCL Industries", slug: "ccl" },
    { client: "Flush", slug: "flush" },
    { client: "Vessels of Glory", slug: "vog" },
    { client: "Medihuanna", slug: "medihuanna" },
    { client: "Executive Helijet", slug: "helijet" },
    { client: "ProBasket", slug: "probasket" },
    { client: "Sweetgrass", slug: "sweetgrass" },
    { client: "Syncron", slug: "syncron" },
    { client: "AMI", slug: "ami" },
    { client: "Focal Project Managers", slug: "focal" },
    { client: "The Crowd’s Line", slug: "crowds" },
    { client: "Lyntics", slug: "lyntics" },
  ],
};
