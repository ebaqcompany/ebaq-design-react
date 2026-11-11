type Feature = {
  tagline: string;
  url: string;
  heading: string;
  description: string;
  deliverables: string[];
  linkLabel: string;
  image?: { src: string; alt: string; position?: string };
};

type Props = React.ComponentPropsWithoutRef<"section"> & {
  tagline?: string;
  heading?: string;
  description?: string;
  features?: Feature[];
  variant?: "light" | "dark";
};

const servicePhotos = [
  { src: "/images/blog/brand-strategy/brand-strategy-workshop-ebaqdesign.webp", alt: "Arek leading an in-person brand strategy workshop at a whiteboard", position: "center" },
  { src: "/images/about/process/671bbf0fa0c63450dddc855e_arek_design_square.jpg", alt: "Arek reviewing printed logo concepts in his studio", position: "center" },
  { src: "/images/about/process/671bbf0fa0c63450dddc855e_arek_design_square.jpg", alt: "Arek developing brand design concepts in his studio", position: "center" },
  { src: "/images/about/process/65c3f16cfc26eeb7887a41f0_Arek_web_design.jpg", alt: "Arek working on website design at his workstation", position: "65% center" },
  { src: "/images/about/process/arek-studio-desk-setup.webp", alt: "Arek at his workstation with website and brand work on screen", position: "center 35%" },
  { src: "", alt: "Photo of Arek working on motion graphics to be selected", position: "center" },
];

// Adapted from Relume Layout 423's image-backed service cards, in two rows of three.
// Descriptions reveal on hover/focus; touch devices retain the readable fallback.
export const Layout423 = (props: Props) => {
  const { tagline, heading, description, features, variant = "light", className = "", ...sectionProps } = { ...Layout423Defaults, ...props };
  return (
    <section {...sectionProps} className={`${variant === "dark" ? "bg-black text-white" : "bg-white text-black"} px-[5%] py-16 md:py-24 lg:py-28 ${className}`.trim()}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">{tagline}</p>
          <h2 className="mb-5 md:mb-6">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {features.map((feature: Feature, index) => {
            const image = feature.image ?? servicePhotos[index % servicePhotos.length];
            return (
              <article key={feature.heading} data-service-card={feature.heading} tabIndex={0} className="service-photo-card group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden bg-black text-white outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary md:min-h-[32rem]">
                {image.src ? <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none" style={{ objectPosition: image.position ?? "center" }} /> : <div role="img" aria-label={image.alt} className="absolute inset-0 -z-20 bg-neutral-800 p-6 text-sm text-white/60 md:p-8">Photo placeholder</div>}
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <div className="p-6 md:p-8">
                  <h3 className="heading-h4">{feature.heading}</h3>
                  <div className="service-card-description">
                    <div className="overflow-hidden"><p className="pt-5 text-base leading-relaxed text-white/90 md:pt-6">{feature.description}</p></div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Layout423Defaults = {
  tagline: "What I offer",
  heading: "I design logos and websites",
  description: "I partner with visionary CEOs and teams to help them bring their ideas to life. From brand strategy, to logo, identity, web design, motion, and beyond.",
  features: [
    { tagline: "01", url: "/start", heading: "Brand Strategy", description: "Clarify what the brand stands for, who it needs to reach, and how it should compete before design decisions begin.", deliverables: ["Brand Audit", "Competitive Analysis", "Brand Positioning", "Customer & Audience Profiles", "Brand Tagline & Messaging"], linkLabel: "Book a call" },
    { tagline: "02", url: "/start", heading: "Logo Design", description: "Create a distinctive logo that captures your brand idea across various applications.", deliverables: ["Custom Logo Design", "Logo Concepts", "Logo Refinement", "Responsive Logo Set", "Logo Animation"], linkLabel: "Book a call" },
    { tagline: "03", url: "/start", heading: "Brand Design", description: "Build a coherent visual identity that gives every brand touchpoint a consistent character.", deliverables: ["Color Palette", "Type System", "Brand Guidelines", "Custom Visuals & Icons", "Pitch Decks", "Social Media Graphics"], linkLabel: "Book a call" },
    { tagline: "04", url: "/start", heading: "Web Design", description: "Design a clear, modern website experience that brings your brand to life and guides visitors to take action.", deliverables: ["Figma UX/UI", "Website Design", "Wireframes", "Responsive Design", "Brand Messaging"], linkLabel: "Book a call" },
    { tagline: "05", url: "/start", heading: "Web Development", description: "Turn approved designs into a responsive website in Framer, Webflow, or custom Next.js, with the features and launch support your project needs.", deliverables: ["Framer Development", "Webflow Development", "Custom Next.js", "Responsive Build", "Custom Integrations", "CMS Setup", "Launch Support"], linkLabel: "Book a call" },
    { tagline: "06", url: "/start", heading: "Motion Graphics", description: "Turn static visuals into engaging animations that make your brand memorable across digital channels.", deliverables: ["Logo Animation", "Motion Direction", "Brand Transitions", "Social Motion Assets", "Website Animation"], linkLabel: "Book a call" },
  ],
};
