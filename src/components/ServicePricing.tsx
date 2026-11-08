import { useId, useState, type KeyboardEvent } from "react";
import { BiCheck } from "react-icons/bi";
import { AvailableButton } from "./AvailableButton";
import { pricing } from "../content/siteFacts";
import { serviceBySlug, type ServiceSlug } from "../data/services";

type Scope = { weekly: string[]; monthly: string[] };
const scopes: Record<ServiceSlug, Scope> = {
  "brand-strategy": {
    weekly: ["Focused brand and competitor review", "Audience and positioning workshop", "Core positioning statement", "Key messaging direction"],
    monthly: ["Broader brand and competitor research", "Audience profiles and positioning", "Brand story and messaging system", "Tagline exploration", "Strategy presentation and refinement", "Guidance for the visual identity"],
  },
  "logo-design": {
    weekly: ["Research and initial sketches", "Original logo concepts", "Concept presentation and rationale", "Refinement of the chosen direction", "Agreed logo lockups and final files"],
    monthly: ["Logo research and concept development", "Refined logo and responsive lockups", "Color palette and typography", "Brand application design", "Logo animation", "Brand guidelines and final files"],
  },
  "brand-design": {
    weekly: ["Build on your existing or newly designed logo", "Color palette and typography", "Supporting graphic elements", "Selected social templates or launch assets", "Brand applications, such as stationery or slides", "Focused brand usage guidelines"],
    monthly: ["Logo and visual identity development", "Color, typography, and graphic system", "Social profiles and reusable templates", "Selected pitch deck or brand applications", "Logo animation", "Brand guidelines and handoff"],
  },
  "web-design": {
    weekly: ["Focused landing-page structure", "Desktop and mobile Figma design", "Design using your existing identity", "Key interface components", "Agreed handoff or straightforward build"],
    monthly: ["Multi-page website structure", "Desktop and mobile page designs", "Reusable component system", "Content and image preparation", "Agreed development and CMS scope", "Review, testing, and launch priorities"],
  },
  "web-development": {
    weekly: ["A focused landing-page build", "Responsive desktop and mobile layouts", "Existing design and content integration", "Basic form or booking embed", "Agreed checks and launch setup"],
    monthly: ["A broader multi-page website build", "Reusable page templates", "Blog or other agreed CMS collections", "Content migration and image preparation", "Agreed forms, calendar, and integrations", "Technical SEO, social previews, and launch checks"],
  },
  "motion-graphics": {
    weekly: ["Focused motion direction and keyframes", "A logo animation or short brand sequence", "Refinement of timing and movement", "Agreed channel sizes and exports"],
    monthly: ["A coordinated brand motion system", "Logo animation and brand transitions", "Selected animated social templates", "Website or presentation motion assets", "Multiple agreed formats and versions", "Motion guidance and organized handoff"],
  },
};
const pricingCopy: Record<ServiceSlug, { heading: string; description: string }> = {
  "brand-strategy": { heading: "How much does brand strategy cost?", description: "Start with a focused strategy sprint, or book a month for a broader engagement. Book a call to agree on the scope and deliverables." },
  "logo-design": { heading: "How much does logo design cost?", description: "A typical logo design sprint takes a week. For a broader identity project, book a month. Let’s discuss your scope and deliverables on a call." },
  "brand-design": { heading: "How much does brand design cost?", description: "A typical brand design sprint takes a week, focused on your visual identity and key applications. For a bigger rollout, book me for a month. Let’s agree on your scope on a call." },
  "web-design": { heading: "How much does web design cost?", description: "Start with a focused landing page, or book a month for a bigger website. Book a call to discuss your pages, scope, and timeline." },
  "web-development": { heading: "How much does web development cost?", description: "Book a focused build or a month for more pages and integrations. Let’s discuss your requirements and agree on the scope on a call." },
  "motion-graphics": { heading: "How much do motion graphics cost?", description: "Book a focused animation sprint or a month for a broader motion project. Let’s agree on the assets, scope, and timing on a call." },
};

const periods = ["weekly", "monthly"] as const;
type Period = typeof periods[number];

// Relume Pricing 35, adapted to weekly/monthly service scopes and a dark surface.
export const ServicePricing = ({ slug }: { slug: ServiceSlug }) => {
  const [period, setPeriod] = useState<Period>("weekly");
  const id = useId();
  const service = serviceBySlug(slug);
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
    setPeriod(periods[next]);
    document.getElementById(`${id}-${periods[next]}-tab`)?.focus();
  };
  return (
    <section id="pricing" className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:gap-x-20">
        <div>
          <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">{service.heading} pricing</p>
          <h2 className="mb-5 md:mb-6">{pricingCopy[slug].heading}</h2>
          <p className="md:text-md">{pricingCopy[slug].description}</p>
        </div>
        <div>
          <div role="tablist" aria-label="Engagement length" className="relative mb-8 grid w-fit grid-cols-2 rounded-full border border-white/30 p-1 lg:ml-auto">
            <span aria-hidden="true" className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${period === "monthly" ? "translate-x-full" : "translate-x-0"}`} />
            {periods.map((value, index) => <button key={value} id={`${id}-${value}-tab`} type="button" role="tab" aria-selected={period === value} aria-controls={`${id}-${value}-panel`} tabIndex={period === value ? 0 : -1} onKeyDown={event => onTabKey(event, index)} onClick={() => setPeriod(value)} className={`pricing-period-tab relative z-10 rounded-full bg-transparent px-6 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${period === value ? "text-black" : "text-white"}`}>{value === "weekly" ? "Weekly" : "Monthly"}</button>)}
          </div>
          {periods.map(value => <div key={value} id={`${id}-${value}-panel`} role="tabpanel" aria-labelledby={`${id}-${value}-tab`} hidden={period !== value} tabIndex={0} className="rounded-xl border border-white/30 bg-white p-6 text-black md:p-8">
            <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">{value === "weekly" ? "Focused week" : "Broader engagement"}</p>
            <h3 className="my-2 pricing-amount"><span className="pricing-number">${(value === "weekly" ? pricing.weeklyRate : pricing.monthlyRate).toLocaleString("en-US")}</span></h3>
            <p className="mb-6 text-black">{value === "weekly" ? "A defined scope, built around your priorities." : "Save $2,000 compared with four separate weeks."}</p>
            <div className="mb-6">
              <h5 className="heading-h6 mb-4">Example {value === "weekly" ? "weekly" : "monthly"} scope</h5>
              <ul className="grid gap-4">{scopes[slug][value].map(item => <li key={item} className="flex gap-3"><BiCheck aria-hidden="true" className="size-6 shrink-0 text-brand-primary" /><span>{item}</span></li>)}</ul>
            </div>
            <div className="flex justify-end"><AvailableButton pricing /></div>
          </div>)}
        </div>
      </div>
    </section>
  );
};
