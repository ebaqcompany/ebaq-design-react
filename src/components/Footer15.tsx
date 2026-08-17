import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ContraIcon } from "./ContraIcon";
import { FooterWordmark } from "./FooterWordmark";

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
      role="separator"
      aria-label="Draggable footer guide"
      aria-orientation="horizontal"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      onDoubleClick={() => setOffsetY(0)}
    />
  );
};

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
            <a href={logo.url} aria-label={logo.alt}>
              <span className="footer-brandmark block size-12" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4">
            <div>
            <div className="rb-6 mb-6 md:mb-8">
              <div>
                <p className="mb-1 text-sm font-semibold">{address.label}</p>
                <p className="mb-5 whitespace-pre-line text-sm md:mb-6">{address.value}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{contact.label}</p>
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
              </div>
            </div>
            <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="transition-colors duration-300 hover:text-brand-primary"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            </div>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-4">
              {columnLinks.map((column, index) => (
                <ul key={index}>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-2 text-sm font-semibold">
                      <Link
                        to={link.url}
                        onClick={() => {
                          document.documentElement.scrollTop = 0;
                          document.body.scrollTop = 0;
                        }}
                      >
                        {link.title}
                      </Link>
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
        <div className="flex flex-col-reverse items-start justify-between py-6 text-sm md:flex-row md:items-center md:py-8">
          <p className="mt-8 md:mt-0">{footerText}</p>
          <p>{rightsText}</p>
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
    label: "Studio:",
    value: "Ebaqdesign LLC\n495 Flatbush Ave\nBrooklyn, NY 11225",
  },
  contact: {
    label: "Contact:",
    phone: "+1 (929) 245-9811",
    email: "arek@ebaqdesign.com",
  },
  columnLinks: [
    {
      links: [
        { title: "About", url: "/about" },
        { title: "Work", url: "/#work" },
        { title: "Blog", url: "/blog" },
        { title: "Podcast", url: "/podcast" },
        { title: "Contact", url: "/contact" },
      ],
    },
    {
      links: [
        { title: "Shop", url: "/shop" },
        { title: "Tools", url: "/tools" },
        { title: "Privacy Policy", url: "/privacy-policy" },
        { title: "Fulfillment Policy", url: "/fulfillment-policy" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "https://www.facebook.com/ebaqdesign", icon: <BiLogoFacebookCircle className="size-6" /> },
    { url: "https://www.instagram.com/ebaqdesign/", icon: <BiLogoInstagram className="size-6" /> },
    { url: "https://x.com/ebaqdesign", icon: <FaXTwitter className="size-6 p-0.5" /> },
    { url: "https://www.linkedin.com/in/ebaqdesign/", icon: <BiLogoLinkedinSquare className="size-6" /> },
    { url: "https://www.youtube.com/@ebaqdesign", icon: <BiLogoYoutube className="size-6" /> },
    { url: "https://contra.com/ebaqdesign", icon: <ContraIcon className="size-5" /> },
  ],
  footerText: "© 2026 Ebaq Design LLC",
  rightsText: "All rights reserved.",
  wordmarkMode: "reorder",
};
