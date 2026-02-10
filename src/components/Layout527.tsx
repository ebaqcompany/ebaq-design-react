"use client";

import { useState } from "react";
import clsx from "clsx";

type ImageProps = {
  src: string;
  alt?: string;
};

type HoverLinkProps = {
  url: string;
  heading: string;
  image: ImageProps;
};

type Props = {
  hoverLinks: HoverLinkProps[];
};

export type Layout527Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout527 = (props: Layout527Props) => {
  const { hoverLinks } = {
    ...Layout527Defaults,
    ...props,
  };
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
      <div className="container">
        <h2 className="mb-12 text-4xl md:text-5xl lg:text-6xl md:mb-16">
          $3k goes a long way. All this plus much more.
        </h2>
        <div className="relative block lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          {/* Image container - shows on left side (3/4 width) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-8 relative">
              {hoverLinks.map((link, index) => (
                <img
                  key={index}
                  className={clsx(
                    "w-full h-auto transition-opacity duration-300",
                    hoveredIndex === index ? "opacity-100 relative" : "opacity-0 absolute inset-0",
                  )}
                  src={link.image.src}
                  alt={link.image.alt}
                />
              ))}
            </div>
          </div>
          {/* Links container - shows on right side (1/4 width, starting at column 4) */}
          <div className="lg:col-start-4 lg:col-span-1">
            {hoverLinks.map((link, index) => (
              <div key={index}>
                <a
                  href={link.url}
                  className="relative z-10 flex flex-col flex-wrap items-start justify-start gap-4 border-b border-black/20 py-[17px] no-underline transition-all duration-300 sm:flex-row sm:items-center md:gap-8 md:py-[21px]"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <h3
                    className={clsx(
                      "text-lg transition-colors duration-300 md:text-xl md:leading-[1.3] lg:text-2xl tracking-[0.01em]",
                      {
                        "lg:text-black/20": hoveredIndex !== index && hoveredIndex !== null,
                        "lg:text-black": hoveredIndex === index || hoveredIndex === null,
                      },
                    )}
                  >
                    {link.heading}
                  </h3>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout527Defaults: Props = {
  hoverLinks: [
    {
      url: "#",
      heading: "Logo",
      image: {
        src: "/case-study/aero-logo.png",
        alt: "Aero logo",
      },
    },
    {
      url: "#",
      heading: "Color",
      image: {
        src: "/case-study/aero-palette.webp",
        alt: "Aero color palette",
      },
    },
    {
      url: "#",
      heading: "Type",
      image: {
        src: "/case-study/aero-fonts.png",
        alt: "Aero typography",
      },
    },
    {
      url: "#",
      heading: "Colateral",
      image: {
        src: "/case-study/aero-stationery.webp",
        alt: "Aero colateral",
      },
    },
    {
      url: "#",
      heading: "Social",
      image: {
        src: "/case-study/aero-social.webp",
        alt: "Aero social",
      },
    },
    {
      url: "#",
      heading: "Web Design",
      image: {
        src: "/case-study/aero-web.webp",
        alt: "Aero web design",
      },
    },
    {
      url: "#",
      heading: "+ More",
      image: {
        src: "/case-study/aero-more.gif",
        alt: "Aero more",
      },
    },
  ],
};
