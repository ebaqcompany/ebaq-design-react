"use client";

import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  logo: ImageProps;
  button: ButtonProps;
  navLinks?: NavLink[];
};

export type Navbar16Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const scrollToBook = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

export const Navbar16 = (props: Navbar16Props) => {
  const { logo, button, navLinks } = {
    ...Navbar16Defaults,
    ...props,
  };

  return (
    <section
      id="relume"
      className="relative z-[999] flex min-h-16 w-full items-center bg-background-primary px-[5%] md:min-h-18"
    >
      <div className="relative mx-auto flex size-full items-center justify-between">
        <a href={logo.url}>
          <img src={logo.src} alt={logo.alt} className="h-10 w-auto" />
        </a>
        {navLinks && (
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-medium text-black/50 hover:text-black transition-colors" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
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
    src: "/ebaqdesign-logo-thinner.svg",
    alt: "Ebaq Design",
  },
  button: {
    title: "Book a Call",
  },
};
