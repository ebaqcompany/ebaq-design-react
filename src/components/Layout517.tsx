"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";

type Props = React.ComponentPropsWithoutRef<"section"> & { image?: { src: string; alt?: string }; tagline?: string; heading?: string; description?: string };

export const Layout517 = (props: Props) => {
  const { image, tagline, heading, description } = { ...Layout517Defaults, ...props };
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["center end", "center start"] });
  const imageStyle = { width: useTransform(scrollYProgress, [0, 1], ["20%", "100%"]), height: useTransform(scrollYProgress, [0, 1], ["40%", "100%"]), y: "0%" } as MotionStyle;
  const cardStyle = { y: useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "100%", "0%"] ) } as MotionStyle;
  return <section ref={ref} className="h-[200vh]"><div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"><motion.img src={image.src} alt={image.alt ?? ""} className="size-full object-cover" style={imageStyle} /><motion.div className="absolute inset-0 mx-auto flex size-full max-w-xxl items-center justify-end px-[5%]" style={cardStyle}><div className="flex w-[90%] flex-col border border-border-primary bg-white p-6 md:max-w-[658px] md:p-12"><p className="mb-3 font-semibold md:mb-4">{tagline}</p><h2 className="mb-5 md:mb-6">{heading}</h2><p>{description}</p></div></motion.div></div></section>;
};

export const Layout517Defaults = { image: { src: "/arek-pic-pro.jpg", alt: "Arek - Senior Designer" }, tagline: "", heading: "Hello I'm Arek, a senior designer based in NY", description: "Working with clients worldwide." };
