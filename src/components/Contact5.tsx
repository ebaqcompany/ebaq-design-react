import { useState } from "react";
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

const services = ["Brand Strategy", "Brand Identity", "Web Design", "Web Development", "Motion Graphics", "Other"];

export const Contact5 = () => {
  const [investment, setInvestment] = useState<"" | "yes" | "no">("");

  return <div className="flex flex-col">
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto grid grid-cols-1 items-stretch gap-y-10 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <img src="/images/about-candidates/arek-brevidio-logo-review.jpeg" alt="Arek Dvornechuck reviewing logo concepts in his Brooklyn studio" className="aspect-[4/5] size-full object-cover" />
        <div className="flex flex-col justify-center">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">Start a conversation</p>
          <h1 className="mb-5 text-h1 md:mb-6">Tell me about your project</h1>
          <p className="max-w-lg text-md">Share what you’re launching, changing, or trying to make clearer. I’ll reply personally with the most useful next step.</p>
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

    <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto grid grid-cols-1 items-start gap-y-10 md:grid-cols-[0.8fr_1.2fr] md:gap-x-12 lg:gap-x-20">
        <div>
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">Project fit</p>
          <h2 className="mb-5 md:mb-6">A few details before we talk</h2>
          <p className="max-w-md text-md">This front-end form helps you check fit before booking. Your answers are not submitted, saved, or stored.</p>
        </div>

        <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 font-medium" htmlFor="contact-name">Name
              <input className="min-h-12 rounded-md border border-black bg-white px-4 py-3 font-normal outline-none transition-colors focus:border-brand-primary" id="contact-name" name="name" type="text" autoComplete="name" />
            </label>
            <label className="grid gap-2 font-medium" htmlFor="contact-email">Email
              <input className="min-h-12 rounded-md border border-black bg-white px-4 py-3 font-normal outline-none transition-colors focus:border-brand-primary" id="contact-email" name="email" type="email" autoComplete="email" />
            </label>
            <label className="grid gap-2 font-medium" htmlFor="contact-company">Company name
              <input className="min-h-12 rounded-md border border-black bg-white px-4 py-3 font-normal outline-none transition-colors focus:border-brand-primary" id="contact-company" name="company" type="text" autoComplete="organization" />
            </label>
            <label className="grid gap-2 font-medium" htmlFor="contact-website">Company website
              <input className="min-h-12 rounded-md border border-black bg-white px-4 py-3 font-normal outline-none transition-colors focus:border-brand-primary" id="contact-website" name="website" type="url" autoComplete="url" placeholder="https://" />
            </label>
          </div>

          <label className="grid gap-2 font-medium" htmlFor="contact-description">Short project description
            <textarea className="min-h-36 resize-y rounded-md border border-black bg-white px-4 py-3 font-normal outline-none transition-colors focus:border-brand-primary" id="contact-description" name="description" />
          </label>

          <fieldset className="grid gap-3">
            <legend className="mb-1 font-medium">What are you looking to get done?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => <label key={service} className="flex cursor-pointer items-center gap-3 rounded-md border border-black bg-white px-4 py-3 font-medium">
                <input type="checkbox" name="services" value={service} className="size-4 accent-black" />
                {service}
              </label>)}
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="mb-1 font-medium">Are you prepared to invest at least $3,000 per week or $10,000 per month?</legend>
            <div className="flex flex-wrap gap-3">
              {(["yes", "no"] as const).map((value) => <label key={value} className="flex min-w-28 cursor-pointer items-center gap-3 rounded-md border border-black bg-white px-4 py-3 font-medium">
                <input type="radio" name="investment" value={value} checked={investment === value} onChange={() => setInvestment(value)} className="size-4 accent-black" />
                {value === "yes" ? "Yes" : "No"}
              </label>)}
            </div>
          </fieldset>

          <div className="min-h-12" aria-live="polite">
            {investment === "yes" && <a href="/start" className="button-primary inline-flex px-6 py-3 font-semibold">Book my call</a>}
            {investment === "no" && <p className="font-semibold">Sorry, I can’t work with you right now.</p>}
            {!investment && <p className="text-sm text-neutral-600">Select Yes or No to see the next step.</p>}
          </div>
        </form>
      </div>
    </section>
  </div>;
};
