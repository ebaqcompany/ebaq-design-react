"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Button } from "@relume_io/relume-ui";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  logo: ImageProps;
};

export type NotificationBarProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const NotificationBar = (props: NotificationBarProps) => {
  const { heading, logo } = {
    ...NotificationBarDefaults,
    ...props,
  };

  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <section id="relume" className="notification-bar">
      <div className="container relative flex flex-col justify-start p-3 md:flex-row md:items-center md:px-4 md:py-2">
        <div className="mb-3 mr-7 flex flex-1 items-start md:mb-0 md:mr-8 md:items-center">
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} className="notification-bar-logo mr-4 hidden size-8 lg:block" />
          </a>
          <h6 className="font-semibold">{heading}</h6>
        </div>
        <Button asChild size="sm" className="button-inverted--dark-surface mb-3 self-start md:mb-0 md:mr-6 md:self-auto">
          <Link
            to="/work"
            onClick={() => {
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
          >
            See my work
          </Link>
        </Button>
        <button type="button" aria-label="Dismiss designer notification" className="absolute right-2 top-2 ml-4 text-white md:static" onClick={() => setIsVisible(false)}>
          <RxCross2 className="size-8 p-1" />
        </button>
      </div>
    </section>
  );
};

export const NotificationBarDefaults: Props = {
  heading: "Looking for a designer?",
  logo: {
    url: "/",
    src: "/ebaq-mark-one-color.svg",
    alt: "Ebaq Design",
  },
};
