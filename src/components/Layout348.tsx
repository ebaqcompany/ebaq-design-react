"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { useEffect, useState, useRef } from "react";
import { RxChevronRight } from "react-icons/rx";
import clsx from "clsx";

type ImageProps = {
  src: string;
  alt?: string;
};

type ContentProps = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

type Props = {
  contents: ContentProps[];
  images: ImageProps[];
};

export type Layout348Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout348 = (props: Layout348Props) => {
  const { contents, images } = {
    ...Layout348Defaults,
    ...props,
  };

  const [activeSection, setActiveSection] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Check if section is in view
      const sectionBottom = sectionTop + sectionHeight;
      const inView = scrollPosition + viewportHeight > sectionTop && scrollPosition < sectionBottom;
      setIsInView(inView);

      // Calculate progress through the section (0 to 1)
      const relativeScroll = scrollPosition - sectionTop + viewportHeight / 2;
      const contentHeight = sectionHeight / contents.length;

      // Determine which content section is active
      const currentSection = Math.floor(relativeScroll / contentHeight);
      const clampedSection = Math.max(0, Math.min(currentSection, contents.length - 1));

      setActiveSection(clampedSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contents.length]);

  return (
    <section id="relume" className="px-[5%]" ref={sectionRef}>
      <div className="container">
        <div className="relative grid gap-x-12 py-16 sm:gap-y-12 md:grid-cols-2 md:py-0 lg:gap-x-20">
          <div className="sticky top-0 hidden h-screen md:flex md:flex-col md:items-center md:justify-center">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                className={clsx("absolute w-full", {
                  "opacity-100": activeSection === index,
                  "opacity-0": activeSection !== index,
                })}
                alt={image.alt}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 md:block">
            {contents.map((content, index) => (
              <div key={index}>
                <div className="flex flex-col items-start justify-center md:h-screen">
                  <p className="mb-3 font-semibold md:mb-4">{content.tagline}</p>
                  <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                    {content.heading}
                  </h2>
                  <p className="md:text-md">{content.description}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                    {content.buttons.map((button, index) => (
                      <Button key={index} {...button}>
                        {button.title}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-10 block w-full md:hidden">
                    <img src={content.image.src} className="w-full" alt={content.image.alt} />
                  </div>
                  {/* White background for sections 0, 2 */}
                  <div
                    className={clsx(
                      "fixed inset-0 -z-10 bg-white transition-opacity duration-300",
                      {
                        "opacity-100": isInView && (activeSection === 0 || activeSection === 2),
                        "opacity-0": !isInView || (activeSection !== 0 && activeSection !== 2),
                      },
                    )}
                  />
                  {/* Gray background for sections 1, 3 */}
                  <div
                    className={clsx(
                      "fixed inset-0 -z-10 bg-[#e5e5e5] transition-opacity duration-300",
                      {
                        "opacity-100": isInView && (activeSection === 1 || activeSection === 3),
                        "opacity-0": !isInView || (activeSection !== 1 && activeSection !== 3),
                      },
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout348Defaults: Props = {
  contents: [
    {
      tagline: "Logo Design",
      heading: "A mark that speaks for you",
      description:
        "Your logo is the face of your brand. Get a custom, versatile logo that works across all platforms—from business cards to billboards. Includes full logo system with variations and usage guidelines.",
      buttons: [
        { title: "See Logos", variant: "secondary" },
        { title: "Learn More", variant: "link", size: "link", iconRight: <RxChevronRight /> },
      ],
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-1.svg",
        alt: "Logo design showcase",
      },
    },
    {
      tagline: "Brand Identity",
      heading: "The complete package",
      description:
        "More than just a logo—get a cohesive visual system. Colors, typography, imagery style, and brand guidelines that ensure consistency across every touchpoint. Built to scale with your business.",
      buttons: [
        { title: "View Identities", variant: "secondary" },
        { title: "Learn More", variant: "link", size: "link", iconRight: <RxChevronRight /> },
      ],
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-2.svg",
        alt: "Brand identity system",
      },
    },
    {
      tagline: "Web Design",
      heading: "Your brand, online",
      description:
        "A stunning website that converts visitors into customers. Designed in Figma, built in Webflow—responsive, fast, and SEO-ready. Includes copywriting and launch support.",
      buttons: [
        { title: "See Websites", variant: "secondary" },
        { title: "Learn More", variant: "link", size: "link", iconRight: <RxChevronRight /> },
      ],
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-3.svg",
        alt: "Web design showcase",
      },
    },
  ],
  images: [
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-1.svg",
      alt: "Relume placeholder image 1",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-2.svg",
      alt: "Relume placeholder image 2",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-3.svg",
      alt: "Relume placeholder image 3",
    },
  ],
};
