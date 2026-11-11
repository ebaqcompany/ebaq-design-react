import type { Service } from "../data/services";

const roleBySlug: Record<Service["slug"], string> = {
  "brand-strategy": "Brand Strategist",
  "logo-design": "Logo Designer",
  "brand-design": "Brand Designer",
  "web-design": "Web Designer",
  "web-development": "Web Developer",
  "motion-graphics": "Motion Designer",
};

const quotes: Record<Service["slug"], string> = {
  "brand-strategy": "Before designing your brand, we need a clear idea of who it’s for and why it matters. I use workshops to turn those questions into positioning, messaging, and a direction for design.",
  "logo-design": "A logo needs to do more than look good on its own. I develop a distinctive mark that captures your brand idea and works wherever people encounter it.",
  "brand-design": "I’ve seen brands invest in a great logo, then lose consistency across applications. A clear visual identity and brand guidelines help every piece work together.",
  "web-design": "A beautiful website alone isn’t enough if visitors don’t know where to go. I design clear experiences that express your brand and guide people toward action.",
  "web-development": "A website needs to work as well as it looks. I build fluid, engaging experiences that adapt across devices and lay a foundation for search and AI discovery.",
  "motion-graphics": "Static visuals can only tell part of your brand’s story. I use animation to add character and make your identity more memorable across digital channels.",
};

export const BrandDesignSectionOptions = ({ service }: { service: Service }) => <section id="brand-design-section-options" className="bg-black px-[5%] py-20 text-white md:py-28 lg:py-32">
  <div className="container mx-auto flex max-w-4xl flex-col items-center text-center">
    <blockquote className="w-full max-w-lg testimonial-quote">“{quotes[service.slug]}”</blockquote>
    <div className="mt-6 flex w-full max-w-lg flex-wrap items-center justify-center gap-x-16 gap-y-6 text-left md:mt-8">
      <div className="flex items-center gap-4">
        <img src="/arek-profile-hero-240.webp" alt="" width="56" height="56" className="size-14 shrink-0 rounded-full object-cover" />
        <div><p className="font-semibold leading-tight">Arek Dvornechuck</p><p className="leading-tight text-brand-primary">{roleBySlug[service.slug]}</p></div>
      </div>
    </div>
  </div>
</section>;
