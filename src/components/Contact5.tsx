import { AvailableButton } from "./AvailableButton";
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoLinkedinSquare, BiLogoYoutube } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { ContraIcon } from "./ContraIcon";

const contactDetails = [
  { href: "mailto:arek@ebaqdesign.com", icon: HiOutlineEnvelope, label: "arek@ebaqdesign.com" },
  { href: "tel:+19292459811", icon: HiOutlinePhone, label: "+1 (929) 245-9811" },
  { icon: HiOutlineMapPin, label: "495 Flatbush Ave, Brooklyn, NY 11225" },
];

const socialLinks = [
  { href: "https://www.facebook.com/ebaqdesign", icon: BiLogoFacebookCircle, label: "Facebook" },
  { href: "https://www.instagram.com/ebaqdesign/", icon: BiLogoInstagram, label: "Instagram" },
  { href: "https://x.com/ebaqdesign", icon: FaXTwitter, label: "X" },
  { href: "https://www.linkedin.com/in/ebaqdesign/", icon: BiLogoLinkedinSquare, label: "LinkedIn" },
  { href: "https://www.youtube.com/@ebaqdesign", icon: BiLogoYoutube, label: "YouTube" },
  { href: "https://contra.com/ebaqdesign", icon: ContraIcon, label: "Contra" },
];

export const Contact5 = () => {
  return <div className="flex flex-col">
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto grid grid-cols-1 items-stretch gap-y-10 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <img src="/images/about-candidates/arek-brevidio-logo-review.jpeg" alt="Arek Dvornechuck reviewing logo concepts in his Brooklyn studio" className="aspect-[4/5] size-full object-cover" />
        <div className="flex flex-col justify-center">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">Start a conversation</p>
          <h1 className="mb-5 text-h1 md:mb-6">Tell me about your project</h1>
          <p className="max-w-lg text-md">Book a free 15-minute call to discuss your branding or website project, or email me directly.</p>
          <AvailableButton className="mt-8 self-start" />
          <div className="mt-8 grid gap-4">
            {contactDetails.map(({ href, icon: Icon, label }) => {
              const content = <><Icon className="size-6 shrink-0" /><span>{label}</span></>;
              return href ? <a key={label} href={href} className="flex w-fit items-center gap-4">{content}</a> : <p key={label} className="flex items-center gap-4">{content}</p>;
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3" aria-label="Arek Dvornechuck on social media">
            {socialLinks.map(({ href, icon: Icon, label }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition-colors hover:text-brand-primary"><Icon className="size-6" /></a>)}
          </div>
        </div>
      </div>
    </section>

  </div>;
};
