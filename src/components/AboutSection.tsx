"use client";

type Props = {
  greeting: string;
  heading: string;
  servicesLabel: string;
  servicesLeft: string[];
  servicesRight: string[];
  image: {
    src: string;
    alt: string;
  };
};

export type AboutSectionProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const AboutSection = (props: AboutSectionProps) => {
  const { greeting, heading, servicesLabel, servicesLeft, servicesRight, image } = {
    ...AboutSectionDefaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
      <div className="container">
        {/* Top section with greeting, heading and image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20 md:mb-28 lg:mb-36">
          <div className="lg:col-span-2">
            <p className="text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-[-0.05em] font-extralight" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{greeting}</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight">
              {heading}
            </h2>
          </div>
          <div className="flex justify-start lg:justify-end">
            <img
              src={image.src}
              alt={image.alt}
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Services section */}
        <div>
          <p className="text-base mb-6 md:mb-8 font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>{servicesLabel}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24">
            <div className="flex flex-col gap-1">
              {servicesLeft.map((service, index) => (
                <p key={index} className="text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em]">{service}</p>
              ))}
            </div>
            <div className="flex flex-col gap-1 mt-1 md:mt-0">
              {servicesRight.map((service, index) => (
                <p key={index} className="text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em]">{service}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutSectionDefaults: Props = {
  greeting: "Hello 👋",
  heading: "I'm Arek, a senior designer based in NY, working with clients worldwide.",
  servicesLabel: "Services I offer",
  servicesLeft: [
    "Brand Strategy",
    "Custom Logo Design",
    "Logo Animation",
    "Color Palette",
    "Type System",
    "Brand Guidelines",
  ],
  servicesRight: [
    "Figma Web Design",
    "Framer/Webflow Dev.",
    "Messaging",
    "Pitch Decks",
    "Social Media Graphics",
    "Motion Graphics",
  ],
  image: {
    src: "/arek-pic.jpg",
    alt: "Arek - Senior Designer",
  },
};
