import { useId, useState, type KeyboardEvent } from "react";
import { BiCheck } from "react-icons/bi";
import { AvailableButton } from "./AvailableButton";
import { pricing } from "../content/siteFacts";
import type { ServiceSlug } from "../data/services";

type Scope = { weekly: string[]; monthly: string[] };
const scopes: Record<ServiceSlug, Scope> = {
  "brand-strategy": {
    weekly: ["Brand and competitor review", "Audience and positioning workshop", "Strategy brief and positioning", "Core messaging and tagline direction", "Mood boards for visual direction"],
    monthly: ["Broader brand and competitor research", "Audience profiles and positioning", "Brand story and messaging system", "Tagline exploration", "Strategy presentation and refinement", "Guidance for the visual identity"],
  },
  "logo-design": {
    weekly: ["New logo or existing logo refinement", "Primary logo and key variations", "Core colors and font pairing", "Revisions within the agreed scope", "Editable files and simple usage guide"],
    monthly: ["Logo research and concept development", "Refined logo and responsive lockups", "Color palette and typography", "Brand application design", "Logo animation", "Brand guidelines and final files"],
  },
  "brand-design": {
    weekly: ["Keep, refine, or create a logo", "Color & typography", "Supporting visuals", "A few social templates", "A few brand applications", "Brand guidelines online"],
    monthly: ["Logo & visual identity", "Custom visuals & icons", "Photography / illustration", "Social profiles & templates", "Presentation / pitch deck", "Print & digital collateral", "Logo animation / motion graphics", "Brand guidelines (PDF & online)", "All editable source files"],
  },
  "web-design": {
    weekly: ["Design roughly 3–5 pages in Figma", "OR design and build a simple landing page", "Responsive desktop and mobile layouts", "Work with your existing brand and content", "Revisions within the agreed scope"],
    monthly: ["A more complex multi-page website", "Custom graphics and responsive design", "Agreed animation and interactive elements", "CMS collections where needed", "Agreed integrations and forms", "Image optimization and launch checks"],
  },
  "web-development": {
    weekly: ["A focused landing-page build", "Responsive desktop and mobile layouts", "Existing design and content integration", "Basic form or booking embed", "Agreed checks and launch setup"],
    monthly: ["A broader multi-page website build", "Reusable templates and agreed animation", "Blog or other agreed CMS collections", "Content migration and image preparation", "Agreed forms, calendar, and integrations", "Technical SEO, social previews, and launch checks"],
  },
  "motion-graphics": {
    weekly: ["Logo animation", "Animated social or Instagram content", "Website feature-card graphics", "Animated illustrations or icons", "Other agreed motion graphics"],
    monthly: ["Brand, service, or product promo videos", "Basic explainer videos", "Longer animations", "Extended motion graphics", "Brand-launch content"],
  },
};
const pricingCopy: Record<ServiceSlug, { heading: string; description: string }> = {
  "brand-strategy": { heading: "How much does brand strategy cost?", description: "A focused strategy sprint costs $3,000 for one week. We agree on the workshop, deliverables, and feedback schedule before booking; payment is due upfront." },
  "logo-design": { heading: "How much does logo design cost?", description: "A focused one-week sprint is $3,000. Create a new logo or refine your existing one, with core identity fundamentals. We agree on scope before booking; payment is due upfront." },
  "brand-design": { heading: "How much does brand design cost?", description: "A typical brand design sprint takes one week, focused on your visual identity and key applications. For a bigger rollout, book me for a month." },
  "web-design": { heading: "How much does web design cost?", description: "One week can cover roughly 3–5 pages designed in Figma OR design and development of a simple landing page. A month allows a more complex website. These are examples, not guarantees: content readiness, features, and feedback determine the agreed scope; not every feature fits every booking. Payment is due upfront." },
  "web-development": { heading: "How much does web development cost?", description: "A focused week is $3,000; a month booked upfront is $10,000. A week can cover a simple landing-page build from approved designs and ready-to-use content. Larger builds may need a month or longer. The lists are scope examples: we agree on pages, features, content, and timing before booking. Payment is due upfront." },
  "motion-graphics": { heading: "How much do motion graphics cost?", description: "A focused week costs $3,000; a month booked upfront is $10,000. A week can cover a selection of short animations, while a month allows more extensive video or launch content. The lists are examples, not a package of everything: we agree on deliverables, length, complexity, formats, and feedback before booking. Payment is due upfront." },
};

const periods = ["weekly", "monthly"] as const;
type Period = typeof periods[number];

// Relume Pricing 35, adapted to weekly/monthly service scopes and a dark surface.
export const ServicePricing = ({ slug }: { slug: ServiceSlug }) => {
  const [period, setPeriod] = useState<Period>("weekly");
  const id = useId();
  const weeklyOnly = slug === "logo-design" || slug === "brand-strategy";
  const visiblePeriods: readonly Period[] = weeklyOnly ? ["weekly"] : periods;
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
          <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Pricing</p>
          <h2 className="mb-5 md:mb-6">What does it cost?</h2>
          <p className="md:text-md">{pricingCopy[slug].description}</p>
        </div>
        <div>
          {!weeklyOnly && <div role="tablist" aria-label="Engagement length" className="relative mb-8 grid w-fit grid-cols-2 rounded-full border border-white/30 p-1 lg:ml-auto">
            <span aria-hidden="true" className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none ${period === "monthly" ? "translate-x-full" : "translate-x-0"}`} />
            {periods.map((value, index) => <button key={value} id={`${id}-${value}-tab`} type="button" role="tab" aria-selected={period === value} aria-controls={`${id}-${value}-panel`} tabIndex={period === value ? 0 : -1} onKeyDown={event => onTabKey(event, index)} onClick={() => setPeriod(value)} className={`pricing-period-tab relative z-10 rounded-full bg-transparent px-6 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${period === value ? "text-black" : "text-white"}`}>{value === "weekly" ? "Weekly" : "Monthly"}</button>)}
          </div>}
          {visiblePeriods.map(value => <div key={value} id={`${id}-${value}-panel`} role={weeklyOnly ? undefined : "tabpanel"} aria-label={weeklyOnly ? `One-week ${slug === "brand-strategy" ? "strategy" : "logo"} sprint` : undefined} aria-labelledby={weeklyOnly ? undefined : `${id}-${value}-tab`} hidden={!weeklyOnly && period !== value} tabIndex={weeklyOnly ? undefined : 0} className="rounded-xl border border-white/30 bg-white p-6 text-black md:p-8">
            <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">{value === "weekly" ? "Focused week" : "Broader engagement"}</p>
            <h3 className="my-2 pricing-amount"><span className="pricing-number">${(value === "weekly" ? pricing.weeklyRate : pricing.monthlyRate).toLocaleString("en-US")}</span></h3>
            <p className="mb-6 text-black">{value === "weekly" ? (slug === "brand-strategy" ? "Positioning, messaging, and a direction for design." : slug === "logo-design" ? "Your logo and core identity fundamentals, in one week." : slug === "brand-design" ? "A focused visual identity system." : "A defined scope, built around your priorities.") : "Save $2,000 over four weekly bookings."}</p>
            <div className="mb-6">
              <h5 className="heading-h7 mb-4">Example {value === "weekly" ? "weekly" : "monthly"} scope</h5>
              <ul className="grid gap-4">{scopes[slug][value].map(item => <li key={item} className="flex items-start gap-2"><BiCheck aria-hidden="true" className="size-6 shrink-0 text-brand-primary" /><span>{item}</span></li>)}</ul>
            </div>
            <div className="flex justify-end"><AvailableButton pricing /></div>
          </div>)}
        </div>
      </div>
    </section>
  );
};
