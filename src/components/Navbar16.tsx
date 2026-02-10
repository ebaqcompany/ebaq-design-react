"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  logo: ImageProps;
  button: ButtonProps;
};

export type Navbar16Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const scrollToBook = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

export const Navbar16 = (props: Navbar16Props) => {
  const { logo, button } = {
    ...Navbar16Defaults,
    ...props,
  };

  return (
    <section
      id="relume"
      className="relative z-[999] flex min-h-16 w-full items-center bg-background-primary px-[5%] md:min-h-18"
    >
      <div className="mx-auto flex size-full items-center justify-between">
        <a href={logo.url}>
          <img src={logo.src} alt={logo.alt} className="h-10 w-auto" />
        </a>
        <Button {...button} variant="secondary" onClick={scrollToBook}>
          {button.title}
        </Button>
      </div>
    </section>
  );
};

export const Navbar16Defaults: Props = {
  logo: {
    url: "#",
    src: "/ebaqdesign-logo-bold.svg",
    alt: "Ebaq Design",
  },
  button: {
    title: "Book a Call",
  },
};
