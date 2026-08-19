"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Button } from "@relume_io/relume-ui";
import { Banner12 } from "./Banner12";

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
      <div className="container relative mx-auto flex flex-col justify-start p-3 md:flex-row md:items-center md:px-4 md:py-2 xl:grid xl:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] xl:gap-x-20 xl:px-0 xl:py-0">
        <div className="mb-3 mr-7 flex flex-1 items-center pr-10 md:mb-0 md:mr-8 md:pr-0 xl:mr-0 xl:pl-6">
          <a href={logo.url} className="shrink-0">
            <img src={logo.src} alt={logo.alt} className="notification-bar-logo mr-4 size-8" />
          </a>
          <h6 className="text-xl font-semibold leading-tight md:text-[1.5625rem] md:leading-none">{heading}</h6>
        </div>
        <div className="contents xl:flex xl:h-full xl:min-w-0 xl:items-center">
          <Banner12 className="notification-services-panel" />
          <Button asChild size="sm" className="button-inverted--dark-surface mb-3 self-start md:mb-0 md:mr-6 md:self-auto xl:ml-4 xl:mr-0">
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
      </div>
    </section>
  );
};

export const NotificationBarDefaults: Props = {
  heading: "Need a designer?",
  logo: {
    url: "/",
    src: "/ebaq-mark-one-color.svg",
    alt: "Ebaq Design",
  },
};
