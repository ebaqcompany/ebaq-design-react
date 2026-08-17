"use client";
import { AvailableButton } from "./AvailableButton";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = React.ComponentPropsWithoutRef<"section"> & { navLinks?: { label: string; href: string }[] };
export type Navbar16Props = Props;

export const Navbar16 = (props: Navbar16Props) => {
  const hamburgerEnabled = true;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const locationHref = window.location.href;
    const { body, documentElement } = document;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    const previousDocumentOverflow = documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      documentElement.style.overflow = previousDocumentOverflow;
      body.style.overflow = previousBodyStyles.overflow;
      body.style.paddingRight = previousBodyStyles.paddingRight;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      if (window.location.href === locationHref) window.scrollTo(0, scrollY);
    };
  }, [open]);
  const links = props.navLinks ?? [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Podcast", href: "/podcast" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/contact" },
  ];
  return <section {...props} className="relative z-[999] w-full px-[5%]"><div className="container relative z-10 mx-auto flex min-h-16 w-full items-center justify-between md:min-h-18"><a href="/"><img src={open ? "/ebaqdesign-logo-bold-light.svg" : "/ebaqdesign-logo-bold.svg"} alt="Ebaq Design" className="h-10 w-auto" /></a><div className="flex items-center gap-2 lg:gap-4"><AvailableButton nav inverse={open} />{hamburgerEnabled && <button type="button" aria-label="Toggle menu" aria-expanded={open} aria-controls="primary-menu" className="flex size-12 items-center justify-center" onClick={() => setOpen(v => !v)}><span aria-hidden="true" className="relative block h-5 w-6"><motion.span className={`absolute left-0 top-px block h-0.5 w-6 origin-center ${open ? "bg-white" : "bg-black"}`} animate={{ y: open ? 8 : 0, rotate: open ? 45 : 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} /><motion.span className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 ${open ? "bg-white" : "bg-black"}`} animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15, ease: "easeInOut" }} /><motion.span className={`absolute bottom-px left-0 block h-0.5 w-6 origin-center ${open ? "bg-white" : "bg-black"}`} animate={{ y: open ? -8 : 0, rotate: open ? -45 : 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} /></span></button>}</div></div><AnimatePresence>{hamburgerEnabled && open && <motion.div id="primary-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="fixed inset-0 overflow-hidden bg-black" onClick={() => setOpen(false)}><div className="container mx-auto flex h-full flex-col items-center justify-center gap-y-4 py-4 text-center md:py-0">{links.map(link => <a key={link.href} href={link.href} onClick={event => { event.stopPropagation(); setOpen(false); }} className="heading-link heading-nav inline-block py-2 text-2xl text-white hover:text-brand-primary md:text-10xl">{link.label}</a>)}</div></motion.div>}</AnimatePresence></section>;
};

export const Navbar16Defaults = {};
