"use client";
import { AvailableButton } from "./AvailableButton";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = React.ComponentPropsWithoutRef<"section"> & { navLinks?: { label: string; href: string }[] };
export type Navbar16Props = Props;

export const Navbar16 = (props: Navbar16Props) => {
  const hamburgerEnabled = false;
  const [open, setOpen] = useState(false);
  const links = props.navLinks ?? [{ label: "Work", href: "#work" }, { label: "Services", href: "#services" }, { label: "About", href: "#about" }];
  return <section {...props} className="relative z-[999] w-full bg-background-primary px-[5%]"><div className="container mx-auto flex min-h-16 w-full items-center justify-between md:min-h-18"><a href="/"><img src="/ebaqdesign-logo-bold.svg" alt="Ebaq Design" className="h-10 w-auto" /></a><div className="flex items-center gap-2 lg:gap-4"><AvailableButton nav />{hamburgerEnabled && <button aria-label="Toggle menu" className="flex size-12 flex-col items-center justify-center" onClick={() => setOpen(v => !v)}><span className="h-0.5 w-6 bg-black" /><span className="my-1 h-0.5 w-6 bg-black" /><span className="h-0.5 w-6 bg-black" /></button>}</div></div><AnimatePresence>{hamburgerEnabled && open && <motion.div initial={{ height: 0 }} animate={{ height: "100dvh" }} exit={{ height: 0 }} className="absolute left-0 right-0 top-full overflow-hidden bg-background-primary"><div className="container mx-auto grid h-full grid-cols-1 content-center gap-y-4 py-4 text-center md:py-0">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2 text-2xl font-bold leading-[1.2] md:text-10xl">{link.label}</a>)}</div></motion.div>}</AnimatePresence></section>;
};

export const Navbar16Defaults = {};
