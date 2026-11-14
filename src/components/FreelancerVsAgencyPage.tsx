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

// The freelancer-vs-agency page at /freelancer-vs-agency: the case for hiring a senior designer
// directly, with honest notes on when an agency is still the better choice. Prices are the published
// ones in siteFacts and the site's agency comparison. Layout: the tool pages' split hero, the black
// comparison table, three white cards, then the shared about, testimonial, FAQ, and CTA sections.
const pageUrl = `${siteUrl}/freelancer-vs-agency`;
const pageDescription = "Freelance designer or branding agency? Compare price, timeline, and who does the work: a senior designer for $3,000 in one week, or an agency for $25k–$100k+ over months.";

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
  { question: "Is a freelance designer cheaper than an agency?", answer: `Usually by a wide margin. With me, a brand identity is ${pricing.weekly} in one week and other work is the same flat weekly rate. Traditional agencies typically charge $25k–$100k+ over 3–9 months for comparable identity work.` },
  { question: "Why do agencies cost so much more?", answer: "An agency fee pays for account managers, project managers, sales, an office, and the agency's margin, on top of the design. The design itself is often done by one senior designer, and many agencies bring in senior freelancers for it. Hiring that designer directly, you pay for the design work only." },
  { question: "Is the quality lower with a freelancer?", answer: `It depends on the freelancer, which is why seniority matters more than the label. I have designed brand identities for ${founder.experience} for startups, law firms, and real estate teams, and the case studies on this site show the work.` },
  { question: "What if I need more than one person?", answer: "Most brand and website projects need one senior designer who can also build. I cover strategy, identity, motion, web design, and development in Framer, Webflow, and Next.js. For large multi-team rollouts, an agency is the better fit, and I will say so on the call." },
  { question: "What is the risk of hiring one person?", answer: "Availability. We agree the start date and scope before you pay, and the one-week brand identity timeline is guaranteed." },
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
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Freelancer vs Agency", path: "/freelancer-vs-agency" }], siteUrl),
];

const eyebrow = "mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4";
const card = "service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']";

export const FreelancerVsAgencyPage = () => (
  <div className="relative bg-white text-black">
    <Helmet>
      <title>Freelance Designer vs Agency: Cost & Who Does the Work | Ebaq Design</title>
      <meta name="description" content="Freelance designer or branding agency? Compare price, timeline, and who does the work: a senior designer for $3,000 in one week, or an agency for $25k–$100k+ over months." />
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
            <h1 className="heading-h2 mb-5 md:mb-6">The same senior designer, without the agency margin</h1>
            <p className="max-w-md md:text-md">At many agencies, one senior designer does the design and the rest of the fee pays for everything around them. Hire that designer directly and you pay for the work.</p>
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
              <p className="my-2 pricing-amount"><span className="pricing-number">$25k+</span></p>
              <p className="mb-2 font-semibold">Brand identity in 3–9 months</p>
              <p className="text-black/60">Typically $25k–$100k+. You talk to an account manager.</p>
            </div>
          </div>
        </div>
      </section>

      <Comparison
        heading={"What you pay for,\nside by side"}
        leftTitle="Senior freelancer"
        rows={[
          { left: `${pricing.weekly} per week, flat`, right: "$25k–$100k+ per project" },
          { left: "Brand identity in 1 week", right: "3–9 months or more" },
          { left: "You talk to the designer", right: "You talk to an account manager" },
          { left: "One senior designer, start to finish", right: "A senior lead, then juniors" },
          { left: "Pay for the design work", right: "Pay for overhead and margin too" },
          { left: "Total agreed before work starts", right: "Estimates that grow" },
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
      <ToolReading links={[{ label: "Branding cost calculator", href: "/tools/branding-cost-calculator" }, { label: "Logo design cost calculator", href: "/tools/logo-design-cost-calculator" }, { label: "Logo design cost guide", href: "/blog/logo-design-cost" }]} />
      <Faq4 tagline="FAQs" heading="Freelancer or agency?" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Find out in 15 minutes" description="Book a call. Tell me what you need and I’ll tell you honestly whether I’m the right hire or an agency is." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
