type Props = { headings: string[] };
export type Banner12Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Banner12 = (props: Banner12Props) => {
  const { headings } = { ...Banner12Defaults, ...props };
  return <section {...props} className="bg-brand-grid flex w-screen max-w-full overflow-hidden"><div className="animate-marquee-right flex w-max min-w-full"><div className="flex shrink-0 items-center gap-8 py-4 pr-8 md:gap-12 md:pr-12">{headings.map((heading, i) => <div key={i} className="flex shrink-0 items-center justify-center"><h2 className="whitespace-nowrap text-md md:text-lg">{heading}</h2></div>)}</div><div aria-hidden className="flex shrink-0 items-center gap-8 py-4 pr-8 md:gap-12 md:pr-12">{headings.map((heading, i) => <div key={i} className="flex shrink-0 items-center justify-center"><h2 className="whitespace-nowrap text-md md:text-lg">{heading}</h2></div>)}</div></div></section>;
};

export const Banner12Defaults: Props = { headings: ["Brand Strategy", "Custom Logo Design", "Logo Animation", "Color Palette", "Type System", "Brand Guidelines", "Figma Web Design", "Framer/Webflow Dev.", "Messaging", "Pitch Decks", "Social Media Graphics", "Motion Graphics"] };
