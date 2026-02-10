"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiCheck } from "react-icons/bi";

type Feature = {
  icon: React.ReactNode;
  text: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  planName: string;
  planDescription: string;
  price: string;
  period: string;
  features: Feature[];
  button: ButtonProps;
};

export type Pricing8Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const scrollToBook = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

export const Pricing8 = (props: Pricing8Props) => {
  const { tagline, heading, description, planName, planDescription, price, period, features, button } = {
    ...Pricing8Defaults,
    ...props,
  };

  return (
    <section id="pricing" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 md:mb-6">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="h-full bg-black text-white rounded-3xl px-6 py-8 md:p-8">
            <h3 className="mb-1 text-md leading-[1.4] md:text-xl">{planName}</h3>
            <p>{planDescription}</p>
            <div className="my-8 h-px w-full bg-white/20" />
            <div className="my-2 text-6xl md:text-9xl lg:text-10xl">
              {price}
              <span className="text-2xl md:text-3xl lg:text-4xl">{period}</span>
            </div>
            <div className="mt-6 md:mt-8">
              <Button {...button} className="w-full" onClick={scrollToBook}>
                {button.title}
              </Button>
            </div>
            <div className="my-8 h-px w-full bg-white/20" />
            <div className="grid grid-cols-1 gap-y-4 py-2">
              {features.map((feature, index) => (
                <div key={index} className="flex self-start">
                  <div className="mr-4 flex-none self-start">{feature.icon}</div>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Pricing8Defaults: Props = {
  tagline: "Pricing",
  heading: "Simple pricing",
  description: "One clear price. No hidden costs. Everything included.",
  planName: "Monthly Retainer",
  planDescription: "Complete branding and website design",
  price: "$3k",
  period: "/mo",
  features: [
    { icon: <BiCheck className="size-6" />, text: "Logo & brand identity design" },
    { icon: <BiCheck className="size-6" />, text: "Brand guidelines document" },
    { icon: <BiCheck className="size-6" />, text: "Figma web design" },
    { icon: <BiCheck className="size-6" />, text: "Webflow/Framer/React web dev" },
    { icon: <BiCheck className="size-6" />, text: "Website copywriting" },
    { icon: <BiCheck className="size-6" />, text: "Direct work with Arek" },
    { icon: <BiCheck className="size-6" />, text: "Unlimited revisions" },
  ],
  button: { title: "Book a Call" },
};
