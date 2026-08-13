import type { ButtonProps } from "@relume_io/relume-ui";
import { BiCheck } from "react-icons/bi";
import { AvailableButton } from "./AvailableButton";

type PricingPlan = { planName: string; planDescription: string; originalPrice?: string; monthlyPrice: string; yearlyPrice: string; period: string; alternateLabel: string; availability: string; features: string[]; button: ButtonProps };
type Props = { tagline: string; heading: string; description: string; pricingPlans: PricingPlan[] };
export type Pricing8Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Pricing8 = (props: Pricing8Props) => {
  const { heading, description, pricingPlans } = { ...Pricing8Defaults, ...props };
  return (
    <section {...props} id="pricing" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 md:mb-6">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, index) => <PricingPlan key={index} plan={plan} />)}
        </div>
      </div>
    </section>
  );
};

const PricingPlan = ({ plan }: { plan: PricingPlan }) => (
  <div className="pricing-textured-surface vector-card flex h-full flex-col justify-between px-6 py-8 md:p-8">
    <div className="vector-card-handles" aria-hidden="true">
      <span className="vector-card-handle vector-card-handle-top-left" />
      <span className="vector-card-handle vector-card-handle-top-right" />
      <span className="vector-card-handle vector-card-handle-bottom-right" />
      <span className="vector-card-handle vector-card-handle-bottom-left" />
    </div>
    <div>
      <h3 className="text-md font-bold leading-[1.4] md:text-xl">{plan.planName}</h3>
      {plan.planDescription && <p className="mt-2 text-black/60">{plan.planDescription}</p>}
      <h4 className="my-2 pricing-amount"><span className="pricing-number">{plan.monthlyPrice}</span><span className="pricing-amount-period">{plan.period}</span></h4>
      <p>{plan.alternateLabel}</p>
      <div className="mb-8 mt-4 grid grid-cols-1 gap-y-4 py-2">{plan.features.map((feature, index) => <div key={index} className="flex self-start"><div className="mr-4 flex-none self-start"><BiCheck className="size-6 text-brand-primary" /></div><p>{feature}</p></div>)}</div>
    </div>
    <AvailableButton pricing availability={plan.availability} className="self-end" />
  </div>
);

export const Pricing8Defaults: Props = {
  tagline: "Pricing",
  heading: "Simple pricing",
  description: "Choose the pace that fits your business.",
  pricingPlans: [
    { planName: "Weekly subscription", planDescription: "", monthlyPrice: "$3,000", yearlyPrice: "$10,000", period: "/wk", alternateLabel: "Branding fundamentals typically take one week.", availability: "2 spots available", features: ["Custom Logo Design", "Logo Animation", "Color Palette", "Typography", "Custom visuals (icons, etc.)", "Brand Guidelines", "Hero design", "Social Media Graphics", "Unlimited revisions"], button: { title: "Book a Call" } },
    { planName: "Monthly subscription", planDescription: "", monthlyPrice: "$10,000", yearlyPrice: "$3,000", period: "/mo", alternateLabel: "Save $2,000 when you commit upfront", availability: "1 spot available", features: ["Everything as in weekly", "Brand Strategy", "Messaging", "Pitch Decks", "Figma Web Design", "Framer/Webflow Dev.", "Motion Graphics", "Web Development", "Unlimited revisions"], button: { title: "Book a Call" } },
  ],
};
