import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { LuPlus } from "react-icons/lu";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ContraIcon } from "./ContraIcon";
import { services } from "../data/services";
import { arekToolIcons } from "./ArekProfileBadge";
import { FooterWordmark } from "./FooterWordmark";
import { TextLink } from "./TextLink";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type ColumnLinks = {
  title: string;
  links: Links[];
};

type Address = {
  label: string;
  value: string;
};

type Contact = {
  label: string;
  phone: string;
  email: string;
};

type Props = {
  logo: ImageProps;
  address: Address;
  contact: Contact;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  companyImage: ImageProps;
  footerText?: string;
  rightsText?: string;
  wordmarkMode?: "static" | "reorder";
};

export type Footer15Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const DraggableFooterGuide = ({ footerRef }: { footerRef: React.RefObject<HTMLElement | null> }) => {
  const guideRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const dragRef = useRef({ pointerY: 0, offsetY: 0 });

  const constrainOffset = (nextOffset: number) => {
    const guide = guideRef.current;
    const footer = footerRef.current;
    if (!guide || !footer) return nextOffset;
    const guideRect = guide.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const baseY = guideRect.top - offsetY + guideRect.height / 2;
    return Math.min(footerRect.bottom - baseY, Math.max(footerRect.top - baseY, nextOffset));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerY: event.clientY, offsetY };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setOffsetY(constrainOffset(dragRef.current.offsetY + event.clientY - dragRef.current.pointerY));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    setOffsetY((current) => constrainOffset(current + (event.key === "ArrowUp" ? -10 : 10)));
  };

  return (
    <div
      ref={guideRef}
      className="footer-guide mt-10 md:mt-14"
      style={{ transform: `translate(-50%, ${offsetY}px)` }}
      role="slider"
      aria-label="Draggable footer guide position"
      aria-orientation="horizontal"
      aria-valuemin={-100}
      aria-valuemax={100}
      aria-valuenow={Math.round(offsetY)}
      aria-valuetext={`${Math.round(offsetY)} pixels`}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      onDoubleClick={() => setOffsetY(0)}
    />
  );
};

// The best-known tools from the About page's set; the plus after them stands for the rest.
const keyCertifications = ["Adobe Illustrator", "Adobe Photoshop", "Adobe After Effects", "Framer", "Webflow", "Rive"];
const certifications = arekToolIcons.filter(([, name]) => keyCertifications.includes(name));

export const Footer15 = (props: Footer15Props) => {
  const footerRef = useRef<HTMLElement>(null);
  const {
    logo,
    address,
    contact,
    companyImage,
    columnLinks,
    socialMediaLinks,
    footerText,
    rightsText,
    wordmarkMode,
  } = {
    ...Footer15Defaults,
    ...props,
  };

  return (
    <footer ref={footerRef} id="relume" className="dark-section-ruler bg-black px-[5%] pt-12 text-white md:pt-18 lg:pt-20">
      <div className="container">
        <div className="pb-10 md:pb-14 lg:pb-16">
          <div className="mb-8 md:mb-12">
            <a href={logo.url} aria-label={logo.alt} className="block w-fit">
              <span className="footer-brandmark block size-12" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-[8vw] gap-y-12 md:gap-y-16 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4">
            <div>
            <div className="rb-6 mb-6 md:mb-8">
              <div>
                <p className="mb-1 font-mono text-sm uppercase tracking-wide text-white/60">{address.label}</p>
                <p className="mb-5 whitespace-pre-line text-sm md:mb-6">{address.value}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-mono text-sm uppercase tracking-wide text-white/60">{contact.label}</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="block w-fit text-sm"
                >
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="block w-fit text-sm"
                >
                  {contact.email}
                </a>
                <TextLink href="/start" className="w-fit text-sm text-white">Book a call</TextLink>
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-sm uppercase tracking-wide text-white/60">Certified expert</p>
              <ul className="flex flex-wrap items-center gap-3">
                {certifications.map(([src, name, className]) => (
                  <li key={name}><img loading="lazy" decoding="async" src={src} alt={name} title={name} width={24} height={24} className={`size-6 rounded-[20%] object-cover ${className ?? ""}`.trim()} /></li>
                ))}
                <li className="flex size-6 items-center justify-center text-white/50" title="And more"><LuPlus aria-hidden="true" className="size-5" /><span className="sr-only">and more</span></li>
              </ul>
            </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(3,max-content)] items-start justify-between gap-x-3 gap-y-4">
              {columnLinks.map((column, index) => (
                <ul key={index} aria-label={column.title}>
                  <li aria-hidden="true" className="pb-2 font-mono text-sm uppercase tracking-wide text-white/60">{column.title}</li>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-2 text-sm font-semibold">
                      {<Link
                        to={link.url}
                        onClick={() => {
                          document.documentElement.scrollTop = 0;
                          document.body.scrollTop = 0;
                        }}
                      >
                        {link.title}
                      </Link>}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mt-10 aspect-[566.93/155.96817] md:mt-14">
          {/* The preserved gravity-enabled version lives in Footer15Interactive.tsx. */}
          <FooterWordmark src={companyImage.src} alt={companyImage.alt ?? "Ebaq Design"} mode={wordmarkMode} />
        </div>
        <DraggableFooterGuide footerRef={footerRef} />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6 text-sm md:py-8">
          <p>{footerText} – {rightsText}</p>
          <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                aria-label={`Visit ${new URL(link.url).hostname.replace("www.", "")}`}
                className="transition-colors duration-300 hover:text-brand-primary"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer15Defaults: Props = {
  logo: {
    url: "#",
    src: "/ebaq-mark-one-color.svg",
    alt: "Ebaq Design",
  },
  companyImage: {
    url: "#",
    src: "/ebaqdesign-logo-footer.svg",
    alt: "Ebaq Design",
  },
  address: {
    label: "Address",
    value: "Ebaqdesign LLC\n495 Flatbush Ave\nBrooklyn, NY 11225",
  },
  contact: {
    label: "Contact",
    phone: "+1 (929) 245-9811",
    email: "arek@ebaqdesign.com",
  },
  columnLinks: [
    {
      title: "Ebaq Design",
      links: [
        { title: "Work", url: "/work" },
        { title: "About", url: "/about" },
        { title: "Services", url: "/services" },
        { title: "Pricing", url: "/pricing" },
        { title: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Services",
      links: services.map(service => ({ title: service.heading, url: service.url })),
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", url: "/blog" },
        { title: "Podcast", url: "/podcast" },
        { title: "Industries", url: "/industries" },
        { title: "Locations", url: "/locations" },
        { title: "Glossary", url: "/glossary" },
        { title: "Comparisons", url: "/compare" },
        { title: "Freelancer vs agency", url: "/freelancer-vs-agency" },
        { title: "Free tools", url: "/tools" },
        { title: "Shop", url: "/shop" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "https://x.com/ebaqdesign", icon: <FaXTwitter className="size-6 p-0.5" /> },
    { url: "https://www.instagram.com/ebaqdesign/", icon: <BiLogoInstagram className="size-6" /> },
    { url: "https://www.facebook.com/ebaqdesign", icon: <BiLogoFacebookCircle className="size-6" /> },
    { url: "https://www.linkedin.com/in/ebaqdesign/", icon: <BiLogoLinkedinSquare className="size-6" /> },
    { url: "https://www.youtube.com/@ebaqdesign", icon: <BiLogoYoutube className="size-6" /> },
    { url: "https://contra.com/ebaqdesign", icon: <ContraIcon className="size-5" /> },
  ],
  footerText: "© 2026 Ebaq Design LLC",
  rightsText: "All rights reserved.",
  wordmarkMode: "reorder",
};
