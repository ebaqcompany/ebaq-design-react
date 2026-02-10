import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoInstagram,
  BiLogoLinkedinSquare,
} from "react-icons/bi";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  links: Links[];
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  logo: ImageProps;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  footerText: string;
  footerLinks: FooterLink[];
};

export type Footer15Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Footer15 = (props: Footer15Props) => {
  const { logo, footerText, columnLinks, footerLinks, socialMediaLinks } = {
    ...Footer15Defaults,
    ...props,
  };
  return (
    <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20 bg-black text-white">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 md:pb-18 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20">
          <a href={logo.url} className="lg:justify-self-start">
            <img src={logo.src} alt={logo.alt} className="inline-block" />
          </a>
          {columnLinks.map((column, index) => (
            <ul
              key={index}
              className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start"
            >
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex} className="font-semibold">
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          ))}
          <div className="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end">
            {socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-white/20" />
        <div className="flex flex-col-reverse items-center justify-center justify-items-center pb-4 pt-6 text-sm md:flex-row md:gap-x-6 md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li key={index} className="underline decoration-white underline-offset-1 ">
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const Footer15Defaults: Props = {
  logo: {
    url: "#",
    src: "/ebaqdesign-logo.svg",
    alt: "Ebaq Design",
  },
  columnLinks: [
    {
      links: [
        { title: "Work", url: "#work" },
        { title: "Services", url: "#services" },
        { title: "Pricing", url: "#pricing" },
        { title: "About", url: "#about" },
        { title: "Contact", url: "mailto:hello@ebaqdesign.com" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "https://instagram.com/ebaqdesign", icon: <BiLogoInstagram className="size-6" /> },
    { url: "https://x.com/ebaqdesign", icon: <FaXTwitter className="size-6 p-0.5" /> },
    { url: "https://linkedin.com/in/arekzak", icon: <BiLogoLinkedinSquare className="size-6" /> },
  ],
  footerText: "© 2026 Ebaq Design. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
  ],
};
