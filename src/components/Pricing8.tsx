import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiCheck } from "react-icons/bi";

type Feature = {
  icon: React.ReactNode;
  text: string;
};

type Billing = "monthly" | "yearly";

type PricingPlan = {
  planName: string;
  description: string;
  originalPrice?: string;
  price: string;
  period: string;
  discount?: string;
  features: Feature[];
  button: ButtonProps;
};

type Tab = {
  value: Billing;
  tabName: string;
  plans: PricingPlan[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  defaultTabValue: Billing;
  tabs: Tab[];
};

export type Pricing8Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const scrollToBook = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

export const Pricing8 = (props: Pricing8Props) => {
  const { tagline, heading, description, defaultTabValue, tabs } = {
    ...Pricing8Defaults,
    ...props,
  };
  return (
    <section id="pricing" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2
            className="mb-5 text-5xl md:mb-6 md:text-7xl lg:text-8xl"
            style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
          >
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mx-auto mb-12 flex w-fit gap-3">
            {tabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.value}>
                {tab.tabName}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab, index) => (
            <TabsContent
              key={index}
              value={tab.value}
              className="container max-w-md data-[state=active]:animate-tabs"
            >
              {tab.plans.map((plan, index) => (
                <PricingPlan key={index} plan={plan} billing={tab.value} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const PricingPlan = ({ plan, billing }: { plan: PricingPlan; billing: Billing }) => (
  <div className="h-full border border-black/20 px-6 py-8 md:p-8">
    <h3
      className="mb-1 text-md leading-[1.4] tracking-normal md:text-xl"
      style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 400" }}
    >
      {plan.planName}
    </h3>
    <p className="leading-[1.6] text-black/60">{plan.description}</p>
    <div className="my-8 h-px w-full bg-black/20" />
    {plan.originalPrice && (
      <p className="mb-2 text-xl leading-[1.2] text-black/40 line-through md:text-2xl">
        {plan.originalPrice}
      </p>
    )}
    <div
      className="my-2 text-6xl leading-[1] tracking-[-0.05em] md:text-9xl lg:text-10xl"
      style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
    >
      {plan.price}
      <span className="text-2xl tracking-normal md:text-3xl lg:text-4xl">{plan.period}</span>
    </div>
    {billing === "yearly" && "discount" in plan && (
      <p className="mt-2 font-medium">{plan.discount}</p>
    )}
    <div className="mt-6 md:mt-8">
      <Button {...plan.button} className="w-full" onClick={scrollToBook}>
        {plan.button.title}
      </Button>
    </div>
    <div className="my-8 h-px w-full bg-black/20" />
    <div className="grid grid-cols-1 gap-y-4 py-2">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex self-start">
          <div className="mr-4 flex-none self-start">{feature.icon}</div>
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Pricing8Defaults: Props = {
  tagline: "Pricing",
  heading: "Simple pricing",
  description: "One clear price. No hidden costs. Everything included.",
  defaultTabValue: "monthly",
  tabs: [
    {
      value: "monthly",
      tabName: "Brand Sprint",
      plans: [
        {
          planName: "Brand Sprint",
          description: "Complete brand identity in one focused sprint",
          price: "$3,000",
          period: "/wk",
          features: [
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Brand Strategy" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Custom Logo Design" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Logo Animation" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Color Palette" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Type System" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Brand Guidelines" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Direct work with Arek" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Unlimited revisions" },
          ],
          button: { title: "Book a Call" },
        },
      ],
    },
    {
      value: "yearly",
      tabName: "Brand + Website",
      plans: [
        {
          planName: "Brand + Website",
          description: "Complete brand identity plus Webflow website",
          originalPrice: "$12,000",
          price: "$10,000",
          period: "/mo",
          discount: "Save $2,000 when you commit upfront",
          features: [
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Everything in Brand Sprint" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Figma Web Design" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Framer/Webflow Dev." },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Messaging" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Pitch Decks" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Social Media Graphics" },
            { icon: <BiCheck className="size-6 text-[#00afec]" />, text: "Motion Graphics" },
          ],
          button: { title: "Book a Call" },
        },
      ],
    },
  ],
};
