import type { ButtonProps } from "./ui";
import { BiCheck } from "react-icons/bi";
import { AvailableButton } from "./AvailableButton";

type PricingPlan = { planName: string; planDescription: string; originalPrice?: string; monthlyPrice: string; yearlyPrice: string; period: string; alternateLabel: string; features: string[]; button: ButtonProps };
type Props = { tagline: string; heading: string; description: string; pricingPlans: PricingPlan[] };
export type Pricing8Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props> & { surface?: "light" | "dark" | "white"; headingLevel?: "h1" | "h2" };

export const Pricing8 = (props: Pricing8Props) => {
  const { tagline, heading, description, pricingPlans, surface = "light", headingLevel: Heading = "h2", ...sectionProps } = { ...Pricing8Defaults, ...props };
  return (
    <section {...sectionProps} id="pricing" className={`${surface === "dark" ? "bg-black text-white" : surface === "white" ? "bg-white" : "bg-surface-muted"} px-[5%] py-16 md:py-24 lg:py-28`}>
      <div className="container max-w-xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">{tagline}</p>
          <Heading className="text-balance">{heading}</Heading>
          {description && <p className="mt-5 md:mt-6 md:text-md">{description}</p>}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, index) => <PricingPlan key={index} plan={plan} lightBlue={surface === "white"} />)}
        </div>
      </div>
    </section>
  );
};

const PricingPlan = ({ plan, lightBlue }: { plan: PricingPlan; lightBlue: boolean }) => (
  <div className={`${lightBlue ? "bg-brand-light border-brand-primary/50" : "pricing-textured-surface border-black/20"} rounded-xl border text-black flex h-full flex-col justify-between px-6 py-8 md:p-8`}>
    <div>
      <h3 className={`mb-2 font-mono text-sm font-normal uppercase tracking-wide ${lightBlue ? "text-black" : "text-brand-primary"}`}>{plan.planName}</h3>
      {plan.planDescription && <p className="mt-2 text-black/60">{plan.planDescription}</p>}
      <h4 className="my-2 pricing-amount"><span className="pricing-number">{plan.monthlyPrice}</span></h4>
      <p>{plan.alternateLabel}</p>
      <h5 className="heading-h6 mb-4 mt-6">{plan.period === "/week" ? "Example weekly scope" : "Example monthly scope"}</h5>
      <div className="mb-8 grid grid-cols-1 gap-y-4 py-2">{plan.features.map((feature, index) => <div key={index} className="flex self-start"><div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-brand-primary" /></div><p>{feature}</p></div>)}</div>
    </div>
    <AvailableButton pricing className="self-end" />
  </div>
);

export const Pricing8Defaults: Props = {
  tagline: "Pricing",
  heading: "One flat weekly rate. Guaranteed deliverables.",
  description: "A complete brand identity in one week for $3,000. Work directly with me, with scope agreed upfront and revisions included.",
  pricingPlans: [
    { planName: "Weekly", planDescription: "", monthlyPrice: "$3,000", yearlyPrice: "$10,000", period: "/week", alternateLabel: "Brand identity or rebrand delivered in one week, guaranteed.", features: ["Custom Logo Design", "Logo Animation", "Color Palette", "Typography", "Custom visuals (icons, etc.)", "Brand Guidelines", "Hero design", "Social Media Graphics"], button: { title: "Book a Call" } },
    { planName: "Monthly", planDescription: "", monthlyPrice: "$10,000", yearlyPrice: "$3,000", period: "/month", alternateLabel: "Save $2,000 when you book a month upfront", features: ["Everything as in weekly", "Brand Strategy", "Messaging", "Pitch Decks", "Figma Web Design", "Framer/Webflow Dev.", "Motion Graphics", "Web Development"], button: { title: "Book a Call" } },
  ],
};
