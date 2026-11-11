import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { LuMessageCircle } from "react-icons/lu";

// Relume Contact 21: four ways to get in touch.
export const ContactDetails = () => <section className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28"><div className="container"><div className="grid auto-cols-fr gap-x-8 gap-y-12 sm:gap-x-8 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
  <div className="flex flex-col items-center justify-start text-center"><HiOutlineEnvelope className="mb-5 size-8 text-brand-primary sm:mb-6" /><h2 className="heading-h5 mb-3 sm:mb-4">Email</h2><p className="mb-5 md:mb-6">Have files or details to share? Send me an email.</p><a className="underline" href="mailto:arek@ebaqdesign.com">arek@ebaqdesign.com</a></div>
  <div className="flex flex-col items-center justify-start text-center"><LuMessageCircle className="mb-5 size-8 text-brand-primary sm:mb-6" /><h2 className="heading-h5 mb-3 sm:mb-4">WhatsApp</h2><p className="mb-5 md:mb-6">Outside the US? Send me a message on WhatsApp.</p><a className="underline" href="https://wa.me/19292459811">Message me on WhatsApp</a></div>
  <div className="flex flex-col items-center justify-start text-center"><HiOutlinePhone className="mb-5 size-8 text-brand-primary sm:mb-6" /><h2 className="heading-h5 mb-3 sm:mb-4">Phone</h2><p className="mb-5 md:mb-6">In the US? Please text me before giving me a call.</p><a className="underline" href="tel:+19292459811">+1 (929) 245-9811</a></div>
  <div className="flex flex-col items-center justify-start text-center"><HiOutlineMapPin className="mb-5 size-8 text-brand-primary sm:mb-6" /><h2 className="heading-h5 mb-3 sm:mb-4">Studio</h2><p className="mb-5 md:mb-6">Based in Brooklyn and working with clients worldwide.</p><p>495 Flatbush Ave, Brooklyn, NY 11225</p></div>
</div></div></section>;
