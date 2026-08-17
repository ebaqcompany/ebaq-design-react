type CtaButton = {
  title: string;
  href: string;
  external?: boolean;
};

type Props = {
  heading: string;
  description: string;
  buttons: CtaButton[];
  price?: string;
  oldPrice?: string;
};

export type Cta17Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Cta17 = (props: Cta17Props) => {
  const { heading, description, buttons, price, oldPrice } = {
    ...Cta17Defaults,
    ...props,
  };

  return (
    <section {...props} id="contact" className="bg-brand-grid relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="grid grid-rows-1 items-start gap-y-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20 lg:gap-y-16">
          <h2 className="text-black">{heading}</h2>
          <div>
            <p className="font-semibold text-black md:text-md">{description}</p>
            {price && (
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-white">{price}</span>
                {oldPrice && <del className="text-3xl font-semibold text-black">{oldPrice}</del>}
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map(({ href, external, title }, index) => (
                <a key={index} className="button-inverted button-inverted--brand-surface" href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{title}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Cta17Defaults: Props = {
  heading: "Ready to build a brand people remember?",
  description: "Tell me what you’re launching, changing, or trying to make clearer. I’ll recommend the most effective way to move it forward.",
  buttons: [
    { title: "Book a call", href: "https://cal.com/ebaqdesign/15min", external: true },
  ],
};
