import { Helmet } from "react-helmet-async";
import { BiCheck } from "react-icons/bi";
import { AiLandingAbout } from "./AiLandingAbout";
import { AvailableButton } from "./AvailableButton";
import { Comparison } from "./Comparison";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TestimonialSlider } from "./ServiceTestimonialOptions";
import { ToolReading } from "./ToolReading";
import { founder, pricing, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// The freelancer-vs-agency page at /compare/freelancer-vs-agency, listed on the /compare hub: the case for hiring a senior designer
// directly, with honest notes on when an agency is still the better choice. Prices are the published
// ones in siteFacts and the site's agency comparison. Layout: the tool pages' split hero, the black
// comparison table, three white cards, then the shared about, testimonial, FAQ, and CTA sections.
const pageUrl = `${siteUrl}/compare/freelancer-vs-agency`;
const pageDescription = "Compare a freelance designer and a branding agency by scope, price, timeline, continuity, and who does the work.";

const fits = [
  {
    title: "Hire a senior freelancer when",
    points: [
      "You need a brand identity or website in weeks, not quarters.",
      "One or two people make the decisions.",
      "You want to talk to the designer, not an account manager.",
      "A junior freelancer or a marketplace already cost you months.",
    ],
  },
  {
    title: "Hire an agency when",
    points: [
      "Many regions, products, or teams need work at the same time.",
      "The scope includes packaging, retail, events, and a global rollout.",
      "Procurement or the board requires a multi-person team on paper.",
      "You need research at a scale one person cannot run.",
    ],
  },
  {
    title: "Hire neither when",
    points: [
      "The real problem is sales, product, or timing, not how you look.",
      "You are still testing the idea and nobody has to remember the brand yet.",
      "You cannot say who the customer is. Settle that first.",
    ],
  },
];

const faqs: FactFaq[] = [
  { question: "Is a freelance designer cheaper than an agency?", answer: `It depends on the people and the scope. My Brand Sprint is ${pricing.weekly} for one week; agencies quote different amounts for different teams, research, deliverables, and rollout needs. Compare written proposals before drawing a conclusion.` },
  { question: "What does an agency fee cover?", answer: "Depending on the engagement, an agency may include a broader team, research, project management, and coordination across deliverables. Ask who will do the work and what each proposal includes." },
  { question: "Is the quality lower with a freelancer?", answer: `It depends on the freelancer, which is why seniority matters more than the label. I have designed brand identities for ${founder.experience} for startups, law firms, and real estate teams, and the case studies on this site show the work.` },
  { question: "What if I need more than one person?", answer: "Some projects need a larger team or specialist skills. I cover strategy, identity, motion, web design, and development in Framer, Webflow, and Next.js. For a large multi-team rollout, an agency may be the better fit, and I will say so on the call." },
  { question: "What is the risk of hiring one person?", answer: "Availability. We agree the start date and scope before you pay, and the one-week brand identity timeline is guaranteed." },
  { question: "How do I check whether a designer is reliable?", answer: "Ask who will do the work, review a relevant case study, speak with a client reference, and get the schedule, feedback rounds, deliverables, and payment terms in writing. Ask what happens if the designer is unavailable or the scope changes." },
  { question: "What should the agreement cover?", answer: "Confirm the scope, milestones, payment, revisions, final files, ownership or licenses, and how changes are handled. Ask who is responsible for any third-party fonts, images, or software licenses." },
  { question: "How do I start?", answer: `Book a 15-minute call. We agree the scope, the number of weeks, and a fixed total before any work starts. ${pricing.payment}` },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Freelance Designer vs Agency",
    description: pageDescription,
    isPartOf: { "@id": `${siteUrl}/#website` },
    author: { "@id": `${siteUrl}/#founder` },
  },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }, { name: "Freelancer vs Agency", path: "/compare/freelancer-vs-agency" }], siteUrl),
];

const eyebrow = "mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4";
const card = "service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']";

export const FreelancerVsAgencyPage = () => (
  <div className="relative bg-white text-black">
    <Helmet>
      <title>Freelance Designer vs Agency: Cost & Who Does the Work | Ebaq Design</title>
      <meta name="description" content="Compare a freelance designer and a branding agency by scope, price, timeline, continuity, and who does the work." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Freelance Designer vs Agency: Cost & Who Does the Work | Ebaq Design" />
      <meta property="og:description" content={pageDescription} />
      {schemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>
    <Navbar16 />
    <main>
      {/* Relume Header 1: the argument on the left, the two prices on the right. */}
      <section className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
        <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-center lg:gap-x-20">
          <header>
            <p className={eyebrow}>Freelancer vs agency</p>
            <h1 className="heading-h2 mb-5 md:mb-6">Work directly with a senior designer</h1>
            <p className="max-w-md md:text-md">A freelance designer and an agency can offer different levels of access, capacity, and support. Compare the scope and the people doing the work before you choose.</p>
            <div className="mt-6 md:mt-8"><AvailableButton pricing /></div>
          </header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div data-surface="white" className={card}>
              <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">With me</p>
              <p className="my-2 pricing-amount"><span className="pricing-number">{pricing.weekly}</span></p>
              <p className="mb-2 font-semibold">Brand identity in 1 week</p>
              <p className="text-black/60">Fixed total, agreed before work starts. You talk to the designer.</p>
            </div>
            <div data-surface="white" className={card}>
              <p className="mb-2 font-mono text-sm uppercase tracking-wide text-black/60">Traditional agency</p>
              <p className="my-2 pricing-amount"><span className="pricing-number">Varies</span></p>
              <p className="mb-2 font-semibold">Price and timing depend on scope</p>
              <p className="text-black/60">Ask who leads the work and what the proposal includes.</p>
            </div>
          </div>
        </div>
      </section>

      <Comparison
        heading={"What you pay for,\nside by side"}
        leftTitle="Senior freelancer"
        rows={[
          { left: `${pricing.weekly} per week, flat`, right: "Project fee varies by team and scope" },
          { left: "Scoped brand identity in 1 week", right: "Timeline depends on the engagement" },
          { left: "You talk to the designer", right: "Ask who your day-to-day contact is" },
          { left: "One senior designer, start to finish", right: "May include several specialists" },
          { left: "Direct working relationship", right: "May offer a broader team and capacity" },
          { left: "Total agreed before work starts", right: "Check milestones and change terms" },
        ]}
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <header className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <p className={eyebrow}>Which one fits</p>
            <h2 className="mb-5 md:mb-6">When each option is the right call</h2>
            <p className="md:text-md">An agency is not always the wrong choice, and a designer is not always the right one. This is the same advice I give on calls.</p>
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {fits.map(({ title, points }) => (
              <article key={title} data-surface="white" className={card}>
                <h3 className="heading-h5 mb-5 font-bold md:mb-6">{title}</h3>
                <ul className="grid gap-4">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <BiCheck aria-hidden="true" className="size-6 shrink-0 text-brand-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AiLandingAbout heading="You work with me, start to finish" description="I’m Arek Dvornechuck, a senior brand designer in New York. I run the strategy, design the identity, animate the logo, and build the website myself. There is no account manager and no handoff to a junior." bookingHref="/start" />
      <TestimonialSlider className="bg-surface-muted" />
      <ToolReading links={[{ label: "All comparisons", href: "/compare" }, { label: "Design cost calculator", href: "/tools/design-cost-calculator" }, { label: "Creative brief generator", href: "/tools/creative-brief-generator" }]} />
      <Faq4 tagline="FAQs" heading="Freelancer or agency?" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Find out in 15 minutes" description="Book a call. Tell me what you need and I’ll tell you honestly whether I’m the right hire or an agency is." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
