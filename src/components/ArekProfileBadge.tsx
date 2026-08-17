import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ContraIcon } from "./ContraIcon";

type Props = {
  className?: string;
  variant?: "tools" | "author";
  portraitHref?: string;
};

export const arekToolIcons = [
  ["/adobe-illustrator.svg", "Adobe Illustrator"],
  ["/adobe-photoshop.svg", "Adobe Photoshop"],
  ["/adobe-after-effects.svg", "Adobe After Effects"],
  ["/figma-mark-baked.png", "Figma"],
  ["/figma-mark.png", "Framer"],
  ["/webflow-mark.png", "Webflow"],
  ["/spline-mark.png", "Spline", "bg-black p-0.5"],
  ["/jitter-mark.png", "Jitter"],
  ["/lottiefiles-mark.png", "LottieFiles"],
  ["/hero-tool-mark.png", "Motion design tool"],
  ["/rive-mark.png", "Rive"],
] as const;

const socialLinks = [
  { label: "Facebook", url: "https://www.facebook.com/ebaqdesign", icon: <BiLogoFacebookCircle className="size-4" /> },
  { label: "Instagram", url: "https://www.instagram.com/ebaqdesign/", icon: <BiLogoInstagram className="size-4" /> },
  { label: "X", url: "https://x.com/ebaqdesign", icon: <FaXTwitter className="size-4 p-0.5" /> },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ebaqdesign/", icon: <BiLogoLinkedinSquare className="size-4" /> },
  { label: "YouTube", url: "https://www.youtube.com/@ebaqdesign", icon: <BiLogoYoutube className="size-4" /> },
  { label: "Contra", url: "https://contra.com/ebaqdesign", icon: <ContraIcon className="size-4" /> },
] as const;

export const ArekProfileBadge = ({ className = "", variant = "tools", portraitHref }: Props) => {
  return <div className={`flex w-fit items-center gap-4 ${className}`.trim()}>
    {portraitHref ? <Link to={portraitHref} aria-label="About Arek Dvornechuck" className="shrink-0"><img src="/arek-profile-hero.png" alt="Arek Dvornechuck" className="size-20 rounded-full object-cover" /></Link> : <img src="/arek-profile-hero.png" alt="Arek Dvornechuck" className="size-20 shrink-0 rounded-full object-cover" />}
    <div className="flex min-w-0 flex-col">
      <div className="flex flex-col gap-0">
        {variant === "author" ? <p className="heading-h7 whitespace-nowrap">Arek Dvornechuck</p> : <h5 className="whitespace-nowrap">Arek Dvornechuck</h5>}
        {variant === "author" && <p className="heading-h7 whitespace-nowrap text-brand-primary">Branding Expert</p>}
      </div>
      {variant === "author" ? <>
        <div className="mt-1 flex items-center gap-1 text-black" aria-label="Arek Dvornechuck on social media">
          {socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} className="heading-link inline-flex text-black">{link.icon}</a>)}
        </div>
      </> : <div className="flex shrink-0 items-center gap-1" role="list" aria-label="Tools I use as a senior designer">
        {arekToolIcons.map(([src, alt, className]) => <img key={src} src={src} alt={alt} className={`size-4 rounded-[20%] object-cover ${className ?? ""}`.trim()} />)}
      </div>}
    </div>
  </div>
};
