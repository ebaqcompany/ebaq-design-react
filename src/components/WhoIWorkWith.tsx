import { HiArrowUpRight } from "react-icons/hi2";

const links = [
  { label: "Locations I work in", href: "/locations" },
  { label: "Industries I work with", href: "/industries" },
  { label: "Services I offer", href: "/services" },
  { label: "What I charge", href: "/pricing" },
  { label: "Freelancer vs agency", href: "/compare/freelancer-vs-agency" },
  { label: "How to get in touch", href: "/contact" },
];

// Adapted from Relume Banner 15, with navigation in the moving strip.
export const WhoIWorkWith = () => (
  <section className="bg-brand-yellow py-4 md:py-6">
    <nav className="who-marquee" aria-label="Who I work with">
      <div className="who-marquee-track">
        {[0, 1].map((group) => (
          <div className="services-marquee-group" key={group} aria-hidden={group === 1 ? true : undefined}>
            {links.map(({ label, href }) => (
              <a key={href} href={href} tabIndex={group === 1 ? -1 : undefined} onFocus={(event) => event.currentTarget.scrollIntoView({ block: "nearest", inline: "center" })} className="heading-h6 group inline-flex max-w-[85vw] shrink-0 items-center gap-2 text-black no-underline hover:underline focus-visible:underline md:max-w-none md:whitespace-nowrap">
                {label}<span aria-hidden="true" className="relative inline-block h-6 w-6 flex-none overflow-hidden">
                  <HiArrowUpRight stroke="currentColor" strokeWidth="0.8" className="text-link-arrow h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
                  <HiArrowUpRight stroke="currentColor" strokeWidth="0.8" className="text-link-arrow absolute top-full -left-full h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  </section>
);
