import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui";
import { clientLogoClass } from "../clientLogo";
import { Testimonial32Defaults } from "./Testimonial32";

const clients = ["Lakshita Chhikara", "Karim Zitouni"].map(name => Testimonial32Defaults.testimonials.find(client => client.name === name)!).map((client, index) => ({
  ...client,
  work: index === 0 ? "/portfolio/identities/nexdim-bento.webp" : "/portfolio/identities/elevate-bento.webp",
}));
type Client = typeof clients[number];
const Attribution = ({ client }: { client: Client }) => (
  <div className="mt-6 flex w-full flex-wrap items-center gap-x-16 gap-y-6 md:mt-8">
    <div className="flex items-center gap-4">
      <img src={client.avatar.src} alt={client.avatar.alt} loading="lazy" className="size-14 shrink-0 rounded-full object-cover" />
      <div><p className="font-semibold">{client.name}</p><p>{client.position}</p></div>
    </div>
    {client.logo && <img src={client.logo.src} alt={client.logo.alt} loading="lazy" className={`${clientLogoClass(client.logo.scale)} ${client.logo.className ?? ""}`.trim()} />}
  </div>
);
const SplitQuote = ({ client }: { client: Client }) => (
  <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
    <img src={client.work} alt={`${client.logo?.alt} brand identity work`} loading="lazy" className="block h-auto w-full rounded-xl object-contain" />
    <div><blockquote className="testimonial-quote">{client.quote}</blockquote><Attribution client={client} /></div>
  </div>
);

// Selected Relume Testimonial 15 layout.
// Reuses actual quotes verbatim; no star ratings are inferred from written feedback.
export const ServiceTestimonialOptions = () => {
  return <>
    <section id="testimonial-option-15" className="overflow-hidden bg-white px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <header className="mb-12 max-w-lg md:mb-18 lg:mb-20"><p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Testimonials</p><h2>What my clients say</h2></header>
        <Carousel opts={{loop:true,align:"start"}} className="overflow-hidden">
          <CarouselContent>{clients.map(client=><CarouselItem key={client.name}><SplitQuote client={client}/></CarouselItem>)}</CarouselContent>
          <div className="mt-8 flex items-center justify-between gap-6"><a href="https://www.linkedin.com/in/ebaqdesign/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noopener noreferrer">Verified on LinkedIn</a><div className="flex gap-4"><CarouselPrevious className="testimonial-carousel-button static translate-y-0"/><CarouselNext className="testimonial-carousel-button static translate-y-0"/></div></div>
        </Carousel>
      </div>
    </section>
  </>;
};
