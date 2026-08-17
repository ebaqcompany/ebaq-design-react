import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { useId, useState } from "react";
import { ContraIcon } from "./ContraIcon";

type Props = {
  className?: string;
  variant?: "tools" | "author";
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

export const ArekProfileBadge = ({ className = "", variant = "tools" }: Props) => {
  const [showTools, setShowTools] = useState(false);
  const toolsId = useId();
  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return <div className={`flex w-fit items-center gap-4 ${className}`.trim()}>
    {variant === "author" ? <div className={`profile-photo-stage relative size-20 shrink-0 ${showTools ? "is-visible" : ""}`.trim()} onMouseEnter={() => { if (canHover()) setShowTools(true); }} onMouseLeave={() => setShowTools(false)}><button type="button" aria-label="Show software tools used by Arek Dvornechuck" aria-controls={toolsId} aria-expanded={showTools} className="profile-photo-trigger size-20 rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary" onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setShowTools(true); }} onBlur={() => setShowTools(false)}><img src="/arek-profile-hero.png" alt="Arek Dvornechuck" className="profile-photo-image size-20 rounded-full object-cover" /></button><div id={toolsId} role="list" aria-label="Software tools used by Arek Dvornechuck" aria-hidden={!showTools} className={`profile-tool-orbit ${showTools ? "is-visible" : ""}`}>{arekToolIcons.map(([src, alt, iconClassName]) => <img key={src} src={src} alt={alt} className={iconClassName ?? ""} />)}</div></div> : <img src="/arek-profile-hero.png" alt="Arek Dvornechuck" className="size-20 rounded-full object-cover" />}
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
