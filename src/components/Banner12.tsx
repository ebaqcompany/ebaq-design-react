type Props = { headings: string[] };
export type Banner12Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Banner12 = (props: Banner12Props) => {
  const { headings, className, ...sectionProps } = { ...Banner12Defaults, ...props };
  return <section {...sectionProps} className={`bg-brand-grid flex w-screen max-w-full overflow-hidden ${className ?? ""}`}><div className="services-marquee-track"><div className="services-marquee-group">{headings.map((heading, i) => <div key={i} className="flex shrink-0 items-center justify-center"><h2 className="whitespace-nowrap text-md md:text-lg">{heading}</h2></div>)}</div><div aria-hidden className="services-marquee-group">{headings.map((heading, i) => <div key={i} className="flex shrink-0 items-center justify-center"><h2 className="whitespace-nowrap text-md md:text-lg">{heading}</h2></div>)}</div></div></section>;
};

export const Banner12Defaults: Props = { headings: ["Brand Strategy", "Custom Logo Design", "Logo Animation", "Color Palette", "Type System", "Brand Guidelines", "Figma Web Design", "Framer Dev", "Webflow Dev", "Messaging", "Pitch Decks", "Social Media Graphics", "Motion Graphics"] };
