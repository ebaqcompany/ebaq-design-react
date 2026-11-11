import { BiCheck } from "react-icons/bi";
import type { ServiceSlug } from "../data/services";

type DeliverableGroup = { title: string; description: string; items: string[] };
const groups: Record<ServiceSlug, DeliverableGroup[]> = {
  "brand-strategy": [
    { title: "Brand audit", description: "Understand where your brand stands today.", items: ["Existing brand review", "Competitor landscape", "Audience priorities", "Brand strengths", "Market opportunities"] },
    { title: "Brand positioning", description: "Define who you serve and why they should choose you.", items: ["Brand purpose", "Audience profiles", "Competitive difference", "Brand personality", "Positioning statement"] },
    { title: "Brand messaging", description: "Give your business a clear story to build on.", items: ["Core brand idea", "Brand story", "Key messages", "Tagline direction", "Visual direction brief"] },
  ],
  "logo-design": [
    { title: "Logo design", description: "A new mark or a considered refinement.", items: ["New logo or redesign", "Primary logo", "Alternate lockup", "Small-scale mark", "Monochrome versions"] },
    { title: "Identity fundamentals", description: "The essentials around your logo.", items: ["Core color palette", "Font pairing", "Color specifications", "Type recommendations", "Logo and type alignment"] },
    { title: "Files & guidance", description: "Ready to use with clear guidance.", items: ["Editable vector files", "SVG and PDF exports", "Transparent PNGs", "Clear space and sizing", "Simple usage guide"] },
  ],
  "brand-design": [
    { title: "Logo design", description: "A recognizable mark that works wherever your brand appears.", items: ["Primary logo", "Alternate lockups", "Brand mark", "Favicon", "Tagline lockup"] },
    { title: "Visual identity", description: "A connected visual language beyond the logo.", items: ["Primary color palette", "Secondary colors", "Typography system", "Supporting visuals", "Custom icons"] },
    { title: "Brand guidelines", description: "A practical reference for keeping your brand consistent.", items: ["Logo usage", "Logo safe space", "Logo color variations", "Color and type specs", "Application examples"] },
  ],
  "web-design": [
    { title: "Website structure", description: "Organize the experience around what visitors need to do.", items: ["Page structure", "Wireframes", "Content hierarchy", "Brand messaging", "Audience and goals review"] },
    { title: "Website design", description: "Translate your brand into clear, considered web pages.", items: ["High-fidelity Figma designs", "Desktop layouts", "Mobile layouts", "Design review and refinement", "Organized Figma handoff"] },
    { title: "Development & launch", description: "Build the agreed experience on the right platform.", items: ["Framer, Webflow, or Next.js build", "Agreed CMS setup", "Agreed forms and integrations", "Image optimization", "Launch checks and handover"] },
  ],
  "web-development": [
    { title: "Responsive build", description: "Turn approved designs into a working website.", items: ["Framer, Webflow, or custom Next.js", "Responsive page implementation", "Reusable page templates", "Agreed interactions and animation", "Working-site review and refinement"] },
    { title: "CMS & integrations", description: "Connect the tools your website needs to function.", items: ["Agreed CMS setup", "CMS collections", "Agreed forms", "Agreed integrations", "Content population"] },
    { title: "Launch & handover", description: "Prepare the site for launch and everyday updates.", items: ["Responsive and functional checks", "Agreed metadata", "Agreed redirects", "Agreed domain setup", "Editing guidance and handover"] },
  ],
  "motion-graphics": [
    { title: "Motion direction", description: "Agree on the creative direction.", items: ["Brand asset review", "Visual references", "Storyboard or keyframes", "Timing and rhythm", "Channel requirements"] },
    { title: "Animation", description: "Create the agreed motion assets.", items: ["Logo animation", "Animated social content", "Website graphics", "Animated icons", "Promos and explainers"] },
    { title: "Delivery", description: "Prepare the agreed files.", items: ["Video exports", "Agreed aspect ratios", "Channel-ready versions", "Lottie where suitable", "Agreed source files"] },
  ],
};

const benefitTitles: Record<ServiceSlug, string[]> = {
  "brand-strategy": ["Understand your market", "Define your position", "Tell your story"],
  "logo-design": ["Make your mark", "Set the foundations", "Use it with confidence"],
  "brand-design": ["Create or refine your logo", "Build a design system", "Keep your brand consistent"],
  "web-design": ["Create a clear path", "Make an impression", "Bring your website to life"],
  "web-development": ["Bring the design to life", "Connect what you need", "Get ready to launch"],
  "motion-graphics": ["Set things in motion", "Bring your brand to life", "Share it everywhere"],
};

// Relume Layout 235 adapted to the shared service deliverables and artwork slots.
export const ServiceDeliverables = ({ slug }: { slug: ServiceSlug }) => {
  return (
  <section id="what-you-get" data-service={slug} className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mb-12 max-w-lg md:mb-16">
        <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">What you get</p>
        <h2 className="mb-5 md:mb-6">{slug === "logo-design" ? "An iconic logo design" : slug === "brand-design" ? "A coherent visual identity" : slug === "brand-strategy" ? "A clear brand direction" : slug === "web-design" ? "A website built around you" : slug === "web-development" ? "From design to a working site" : "Your brand in motion"}</h2>
        <p className="max-w-md md:text-md">{slug === "logo-design" ? "Create a new logo or refine the one you have, with the colors, fonts, and files you need to get started. One focused week, with scope agreed before we begin." : slug === "brand-design" ? "Get your logos, colors, fonts, and visuals in one scalable system, with online guidelines to keep your brand consistent." : slug === "brand-strategy" ? "Define your audience, positioning, and messaging before moving into design. We agree on the workshop and deliverables before we begin." : slug === "web-design" ? "From Figma design to a working website. Choose design only or design and development; we agree on the pages, features, and deliverables before booking." : slug === "web-development" ? "Build on your approved designs, with the platform, pages, features, and launch support agreed before booking." : "From logo animation to promotional videos, we choose the assets and formats your project needs. These are examples; your booking covers an agreed selection."}</p>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-y-12 md:grid-cols-3 md:grid-rows-[auto_auto_1fr] md:gap-x-8 md:gap-y-0 lg:gap-x-12">
        {groups[slug].map((group, index) => (
          <article key={group.title} data-surface="white" className="service-card relative flex flex-col overflow-hidden rounded-xl p-6 md:row-span-3 md:grid md:[grid-template-rows:subgrid] md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-brand-primary/50 after:content-['']">
            <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary">{group.title}</p>
            <h3 className="font-bold heading-h5">{benefitTitles[slug][index]}</h3>
            <ul className="mt-6 grid content-start gap-4 md:mt-8">{group.items.map((item) => <li key={item} className="flex items-start gap-2"><BiCheck aria-hidden="true" className="size-6 shrink-0 text-brand-primary" /><span>{item}</span></li>)}</ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);
};
