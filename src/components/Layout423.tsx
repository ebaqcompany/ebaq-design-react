import { useRef, useState, type KeyboardEvent } from "react";
import { RxChevronRight } from "react-icons/rx";

type Feature = {
  tagline: string;
  url: string;
  heading: string;
  description: string;
  deliverables: string[];
  linkLabel: string;
};

type Props = React.ComponentPropsWithoutRef<"section"> & {
  tagline?: string;
  heading?: string;
  description?: string;
  features?: Feature[];
  variant?: "light" | "dark";
};

export const Layout423 = (props: Props) => {
  const { tagline, heading, description, features, variant = "light", className = "", ...sectionProps } = { ...Layout423Defaults, ...props };
  const [activeFeature, setActiveFeature] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const feature = features[activeFeature] ?? features[0];
  const isDark = variant === "dark";

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % features.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + features.length) % features.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = features.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveFeature(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section {...sectionProps} className={`${isDark ? "bg-black text-white" : "bg-white text-black"} px-[5%] py-16 md:py-24 lg:py-28 ${className}`.trim()}>
      <div className="container">
        <div className="mb-12 w-full max-w-lg md:mb-16 lg:mb-20">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">{tagline}</p>
          <h2 className="mb-5 md:mb-6">{heading}</h2>
          <p className={isDark ? "text-white/70 md:text-md" : "text-black/70 md:text-md"}>{description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-16">
          <div
            id={`service-panel-${activeFeature}`}
            role="tabpanel"
            aria-labelledby={`service-tab-${activeFeature}`}
            tabIndex={0}
            className={`flex min-h-[30rem] flex-col justify-between border-y py-8 md:min-h-[34rem] md:py-10 lg:min-h-[38rem] ${isDark ? "border-white/30" : "border-black/30"}`}
          >
            <p className="heading-h2 text-brand-primary">{feature.tagline}</p>
            <div className="mt-12 max-w-2xl">
              <h3>{feature.heading}</h3>
              <p className={`mt-5 md:mt-6 md:text-md ${isDark ? "text-white/75" : "text-black/75"}`}>{feature.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {feature.deliverables.map((item) => (
                  <li key={item} className={`border px-3 py-2 text-sm font-semibold ${isDark ? "border-white/40" : "border-black/40"}`}>{item}</li>
                ))}
              </ul>
              <a href={feature.url} className="heading-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                {feature.linkLabel}<RxChevronRight aria-hidden="true" className="size-5" />
              </a>
            </div>
          </div>

          <div role="tablist" aria-label="Services" aria-orientation="vertical" className={`flex flex-col border-t ${isDark ? "border-white/30" : "border-black/30"}`}>
            {features.map((item, index) => {
              const isActive = index === activeFeature;
              return (
                <button
                  key={item.heading}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  id={`service-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveFeature(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`service-text-tab flex items-baseline gap-4 rounded-none border-b border-l-2 py-4 pl-4 pr-1 text-left transition-colors md:py-5 ${isDark ? "border-b-white/30" : "border-b-black/30"} ${isActive ? "border-l-brand-primary text-brand-primary" : `border-l-transparent ${isDark ? "text-white/60 hover:text-white focus-visible:text-white" : "text-black/60 hover:text-black focus-visible:text-black"}`}`}
                >
                  <span className="heading-h5 flex-1">{item.heading}</span>
                  <span className="font-semibold" aria-hidden="true">{item.tagline}</span>
                </button>
              );
            })}
          </div>
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
    { tagline: "01", url: "/contact", heading: "Brand Strategy", description: "Clarify what the brand stands for, who it needs to reach, and how it should compete before design decisions begin.", deliverables: ["Brand Audit", "Competitive Analysis", "Brand Positioning", "Customer & Audience Profiles", "Brand Tagline & Messaging"], linkLabel: "Discuss brand strategy" },
    { tagline: "02", url: "/contact", heading: "Logo Design", description: "Create a distinctive, practical logo that captures the brand idea and works clearly across digital and physical applications.", deliverables: ["Custom Logo Design", "Logo Concepts", "Logo Refinement", "Responsive Logo Set", "Logo Animation"], linkLabel: "Discuss logo design" },
    { tagline: "03", url: "/contact", heading: "Identity Systems", description: "Turn the logo into a coherent visual language that gives every brand touchpoint a recognizable and consistent character.", deliverables: ["Color Palette", "Type System", "Brand Guidelines", "Custom Visuals & Icons", "Pitch Decks", "Social Media Graphics"], linkLabel: "Discuss identity systems" },
    { tagline: "04", url: "/contact", heading: "Web Design", description: "Design a clear, responsive website experience that brings the brand to life and guides visitors toward the right action.", deliverables: ["Figma UX/UI", "Website Design", "Wireframes", "Responsive Design", "Brand Messaging"], linkLabel: "Discuss web design" },
    { tagline: "05", url: "/contact", heading: "Web Development", description: "Build the approved website into a responsive, maintainable experience with careful interaction and launch-ready implementation.", deliverables: ["Framer Development", "Webflow Development", "Responsive Build", "Custom Integrations", "CMS Setup", "Launch Support"], linkLabel: "Discuss web development" },
    { tagline: "06", url: "/contact", heading: "Motion Graphics", description: "Use purposeful motion to make the identity more expressive, memorable, and effective across brand and digital channels.", deliverables: ["Logo Animation", "Motion Direction", "Brand Transitions", "Social Motion Assets", "Website Animation"], linkLabel: "Discuss motion graphics" },
  ],
};
