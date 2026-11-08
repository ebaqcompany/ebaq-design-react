import type { ServiceSlug } from "../data/services";

type DeliverableGroup = { title: string; description: string; items: string[] };
const groups: Record<ServiceSlug, DeliverableGroup[]> = {
  "brand-strategy": [
    { title: "Brand audit", description: "Understand where your brand stands today.", items: ["Existing brand review", "Competitor landscape", "Opportunities to stand apart"] },
    { title: "Brand positioning", description: "Define who you serve and why they should choose you.", items: ["Audience profiles", "Brand differentiation", "Positioning statement"] },
    { title: "Brand messaging", description: "Give your business a clear story to build on.", items: ["Core brand idea", "Key messages", "Tagline direction"] },
  ],
  "logo-design": [
    { title: "Logo concepts", description: "Explore ideas grounded in your business and audience.", items: ["Research and sketches", "Original logo concepts", "Design rationale"] },
    { title: "Logo system", description: "Refine the chosen idea into a flexible set of marks.", items: ["Primary logo", "Alternate lockups", "Small-scale variations"] },
    { title: "Final logo files", description: "Get the files and guidance to use your logo consistently.", items: ["Vector and raster exports", "Color and monochrome versions", "Logo usage guidance"] },
  ],
  "brand-design": [
    { title: "Logo system", description: "A recognizable mark that works wherever your brand appears.", items: ["Primary logo", "Alternate lockups", "Responsive logo variations"] },
    { title: "Visual identity", description: "A connected visual language beyond the logo.", items: ["Color palette", "Typography system", "Supporting graphic elements"] },
    { title: "Brand guidelines", description: "A practical reference for keeping your brand consistent.", items: ["Logo usage rules", "Color and type specifications", "Brand application examples"] },
  ],
  "web-design": [
    { title: "Website structure", description: "Organize the experience around what visitors need to do.", items: ["Page structure", "Wireframes", "Content hierarchy"] },
    { title: "Website design", description: "Translate your brand into clear, considered web pages.", items: ["High-fidelity Figma designs", "Desktop layouts", "Mobile layouts"] },
    { title: "Design handoff", description: "Give development a clear, organized starting point.", items: ["Reusable interface components", "Interaction notes", "Organized Figma files"] },
  ],
  "web-development": [
    { title: "Responsive build", description: "Turn approved designs into a working website.", items: ["Page implementation", "Responsive layouts", "Navigation and interactions"] },
    { title: "Content and integrations", description: "Connect the tools your website needs to function.", items: ["Agreed CMS setup", "Forms and integrations", "Content population"] },
    { title: "Launch handoff", description: "Prepare the site for launch and everyday updates.", items: ["Browser and device checks", "Domain and launch setup", "Editing guidance"] },
  ],
  "motion-graphics": [
    { title: "Motion direction", description: "Define how your brand should move and feel.", items: ["Visual references", "Storyboard or keyframes", "Timing and movement direction"] },
    { title: "Brand animation", description: "Bring the agreed ideas to life in motion.", items: ["Logo animation", "Brand transitions", "Agreed social or website animations"] },
    { title: "Ready-to-use exports", description: "Get animation files prepared for their intended channels.", items: ["Agreed video formats", "Channel-specific sizes", "Lottie exports where suitable"] },
  ],
};

const benefitTitles: Record<ServiceSlug, string[]> = {
  "brand-strategy": ["See the bigger picture", "Find your place", "Tell a clearer story"],
  "logo-design": ["Explore the possibilities", "Make your mark", "Put your logo to work"],
  "brand-design": ["Make your mark", "Build a visual language", "Keep it consistent"],
  "web-design": ["Create a clear path", "Make an impression", "Move into development"],
  "web-development": ["Bring the design to life", "Connect what you need", "Get ready to launch"],
  "motion-graphics": ["Set things in motion", "Bring your brand to life", "Share it everywhere"],
};

// Adapted from Relume Layout 235; artwork slots intentionally await custom graphics.
export const ServiceDeliverables = ({ slug }: { slug: ServiceSlug }) => (
  <section id="what-you-get" className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mb-12 max-w-lg md:mb-16">
        <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">What you get</p>
        <h2 className="mb-5 md:mb-6">Clear deliverables. Built around your brand.</h2>
        <p className="md:text-md">We agree on the exact scope before work begins. Here’s what we can build together.</p>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
        {groups[slug].map((group, index) => (
          <article key={group.title} className="service-card relative flex flex-col overflow-hidden rounded-xl transition-colors duration-200 ease-out motion-reduce:transition-none after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
            <div role="img" aria-label={`${group.title} graphic placeholder`} className="bg-brand-grid flex aspect-square items-center justify-center overflow-hidden bg-brand-primary">
              <span className="rounded bg-white px-3 py-2 font-mono text-xs uppercase tracking-wide text-black">Graphic to come</span>
            </div>
            <div className="grow p-6 md:p-8">
            <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary">{group.title}</p>
            <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl">{benefitTitles[slug][index]}</h3>
            <p className="mb-5">{group.description}</p>
            <ul className="list-disc space-y-2 pl-5">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
