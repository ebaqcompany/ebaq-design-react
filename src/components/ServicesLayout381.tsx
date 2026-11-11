import { services, type Service } from "../data/services";
import { ServiceArtwork } from "./ServiceArtwork";

const headlines = [
  "Find your brand’s direction", "Design an iconic logo", "Build a recognizable brand",
  "Make a stronger first impression", "Launch a website that works", "Bring your brand to life",
];

const ServiceCard = ({ service, format }: { service: Service; format: "big" | "small" | "feature" }) => <article data-service={service.slug} className={`overflow-hidden rounded-xl border border-black/20 bg-white ${format === "small" ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col"}`}>
  {format === "feature" ? <div className="px-6 pt-6 md:px-8 md:pt-8"><div className="w-12"><ServiceArtwork slug={service.slug} vector pixelEdge={false} className="rounded-lg" /></div></div> : <ServiceArtwork slug={service.slug} vector pixelEdge={false} />}
  <div className={`flex flex-1 flex-col justify-center p-6 ${format === "big" ? "md:p-8 lg:p-12" : format === "feature" ? "md:p-8" : ""}`}>
    <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">{service.heading}</p>
    <h3 className={format === "big" ? "mb-5 heading-h3 md:mb-6" : "mb-2 heading-h5"}>{headlines[service.index]}</h3>
    <p>{service.description}</p>
    <div className="mt-6 md:mt-8"><a href={service.url} className="button-primary inline-flex items-center justify-center px-6 py-3">Explore {service.heading.toLowerCase()}</a></div>
  </div>
</article>;

// Official Relume Layout 381: two-column bento with big, horizontal, and compact cards.
// One extra compact card accommodates the sixth service without repeating an offering.
export const ServicesLayout381 = () => <section id="services-layout-381" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
  <div className="container">
    <header className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
      <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Services · Layout 381 alternative</p>
      <h2 className="mb-5 heading-h2 md:mb-6">Six brand services. One expert partner.</h2>
      <p className="md:text-md">From strategy and identity to websites and motion. Work directly with me on the full project or the part you need.</p>
    </header>
    <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
      <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8">
        <ServiceCard service={services[0]} format="big" />
        <ServiceCard service={services[1]} format="small" />
        <ServiceCard service={services[2]} format="feature" />
      </div>
      <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8">
        <ServiceCard service={services[3]} format="feature" />
        <ServiceCard service={services[4]} format="feature" />
        <ServiceCard service={services[5]} format="big" />
      </div>
    </div>
  </div>
</section>;
