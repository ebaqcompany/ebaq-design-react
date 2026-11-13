import type { ReactNode } from "react";
import { useTestimonialAutoplay } from "../hooks/useTestimonialAutoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui";
import { clientLogoClass } from "../clientLogo";
import { Testimonial32Defaults, TestimonialPosition } from "./Testimonial32";
import { TextLink } from "./TextLink";

// Work imagery is matched by client identity, never by carousel position.
// Clients without a verified project visual keep a text-and-attribution layout.
const projectVisuals: Partial<Record<string, { src: string; alt: string }>> = {
  "Lakshita Chhikara": { src: "/portfolio/identities/nexdim-bento.webp", alt: "NextDimension AI brand identity" },
  "Karim Zitouni": { src: "/portfolio/identities/elevate-bento.webp", alt: "Elevate brand identity" },
  "Pavel Bulkiewicz": { src: "/portfolio/identities/medihuanna-bento.webp", alt: "Medihuanna brand identity" },
  "Darla Powell": { src: "/portfolio/identities/wingnut-bento.webp", alt: "Wingnut Social brand identity" },
  "Alan Rudt": { src: "/portfolio/identities/brevidee-bento.webp", alt: "Brevidee brand identity" },
  "Chris Nixon": { src: "/portfolio/identities/airport-executive-bento.webp", alt: "Airport Executive brand identity" },
  "Lucas Berman": { src: "/portfolio/identities/forberman-bento.webp", alt: "FOX BERMAN brand identity" },
  "Jane de Abreu": { src: "/portfolio/identities/sweetgrass-bento.webp", alt: "SweetGrass brand identity" },
};
const featuredNames = ["Lakshita Chhikara", "Karim Zitouni"];
const originals = Testimonial32Defaults.testimonials;
const clients = [
  ...originals.filter(client => featuredNames.includes(client.name)),
  ...originals.filter(client => !featuredNames.includes(client.name)),
].map(client => ({ ...client, work: projectVisuals[client.name] }));
// A page can add a line above the quote (for example the platform a site was built in) and a link under it.
export type TestimonialClient = typeof clients[number] & { label?: ReactNode; link?: { label: string; href: string } };
type Client = TestimonialClient;
export const testimonialClients: TestimonialClient[] = clients;
const Attribution = ({ client }: { client: Client }) => (
  <div className="mt-6 flex w-full flex-wrap items-center gap-x-16 gap-y-6 md:mt-8">
    <div className="flex items-center gap-4">
      <img src={client.avatar.src} alt={client.avatar.alt} loading="lazy" className="size-14 shrink-0 rounded-full object-cover" />
      <div><p className="font-semibold leading-tight">{client.name}</p><TestimonialPosition name={client.name} position={client.position} /></div>
    </div>
    {client.logo && <img src={client.logo.src} alt={client.logo.alt} loading="lazy" className={`${clientLogoClass(client.logo.scale)} ${client.logo.className ?? ""}`.trim()} />}
  </div>
);
const Quote = ({ client }: { client: Client }) => (
  <div>
    {client.label && <p className="mb-3 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">{client.label}</p>}
    <blockquote className="testimonial-quote">{client.quote}</blockquote>
    <Attribution client={client} />
    {client.link && <div className="mt-6 md:mt-8"><TextLink href={client.link.href} {...(/^https?:/.test(client.link.href) ? { target: "_blank", rel: "noreferrer" } : {})}>{client.link.label}</TextLink></div>}
  </div>
);
const SplitQuote = ({ client }: { client: Client }) => client.work ? (
  <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
    <img src={client.work.src} alt={client.work.alt} loading="lazy" decoding="async" className="block h-auto w-full rounded-xl object-contain" />
    <Quote client={client} />
  </div>
) : (
  <div className="mx-auto w-full max-w-lg"><Quote client={client} /></div>
);

// Selected Relume Testimonial 15 layout.
// Reuses actual quotes verbatim; no star ratings are inferred from written feedback.
type SliderProps = { clients?: TestimonialClient[]; eyebrow?: string; heading?: ReactNode; description?: string; autoPlay?: boolean; id?: string; className?: string };
export const TestimonialSlider = ({ clients: shown = clients, eyebrow = "Testimonials", heading = "What my clients say", description, autoPlay = false, id, className = "bg-white" }: SliderProps) => {
  const { setApi, containerProps } = useTestimonialAutoplay(autoPlay);
  return (
    <section id={id} className={`overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 ${className}`}>
      <div className="container">
        <header className="mb-12 max-w-lg md:mb-18 lg:mb-20"><p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">{eyebrow}</p><h2>{heading}</h2>{description && <p className="mt-5 md:mt-6 md:text-md">{description}</p>}</header>
        <div {...containerProps}>
        <Carousel setApi={setApi} opts={{loop:true,align:"start"}} className="overflow-hidden">
          <CarouselContent className="items-stretch">{shown.map(client=><CarouselItem key={client.name} className="flex items-center justify-center" aria-label={`Testimonial from ${client.name}`}><SplitQuote client={client}/></CarouselItem>)}</CarouselContent>
          <div className="mt-8 flex items-center justify-between gap-6"><a href="https://www.linkedin.com/in/ebaqdesign/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noopener noreferrer">Verified on LinkedIn</a><div className="flex gap-4"><CarouselPrevious className="testimonial-carousel-button static translate-y-0"/><CarouselNext className="testimonial-carousel-button static translate-y-0"/></div></div>
        </Carousel>
        </div>
      </div>
    </section>
  );
};

export const ServiceTestimonialOptions = ({ autoPlay = false }: { autoPlay?: boolean }) => <TestimonialSlider id="testimonial-option-15" autoPlay={autoPlay} />;
