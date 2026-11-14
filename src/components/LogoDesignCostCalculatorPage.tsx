import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiCheck } from "react-icons/bi";
import { AvailableButton } from "./AvailableButton";
import { Comparison } from "./Comparison";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { ToolReading } from "./ToolReading";
import { bookingUrl, pricing, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// A free tool at /tools/logo-design-cost-calculator. Two questions (what you need, how custom) pick
// one of the provider bands published in /blog/logo-design-cost, and the card shows that band next
// to my own fixed price from siteFacts. Layout: the branding cost calculator's split hero.
const pageUrl = `${siteUrl}/tools/logo-design-cost-calculator`;
const pageTitle = "Logo Design Cost Calculator: What Should a Logo Cost? | Ebaq Design";
const pageDescription = "Answer two questions and see what a logo should cost for your scope, from AI tools to agencies, next to a fixed $3,000 one-week identity from a senior designer.";

// The planning bands from the logo design cost guide. Approximate ranges, not surveyed averages.
const bands = [
  { id: "ai", name: "AI tools and templates", range: "$0–$100", scope: "Self-directed design. Downloads and licenses vary." },
  { id: "entry", name: "Entry-level freelancer", range: "$100–$1,000", scope: "A narrow brief, limited exploration, and a basic handoff." },
  { id: "senior", name: "Senior designer", range: "$1,000–$5,000", scope: "Custom logo exploration, refinement, variations, and final files." },
  { id: "studio", name: "Expert or studio", range: "$5,000–$25,000", scope: "Deeper discovery and design direction." },
  { id: "firm", name: "Branding firm", range: "$25,000+", scope: "Brand strategy, identity system, guidelines, and key applications." },
] as const;
type BandId = typeof bands[number]["id"];

const needs = [
  { id: "file", name: "Just a logo", detail: "One logo to get started with." },
  { id: "files", name: "Logo with variations", detail: "Horizontal, stacked, and icon versions, with final SVG, PNG, and PDF files." },
  { id: "identity", name: "Full brand identity", detail: "Logo, colors, typography, and guidelines." },
  { id: "strategy", name: "Identity and strategy", detail: "Positioning and messaging first, then the identity." },
] as const;
type NeedId = typeof needs[number]["id"];

const levels = [
  { id: "template", name: "A template is fine", detail: "I need something presentable, fast." },
  { id: "custom", name: "Custom for my business", detail: "Designed from scratch, with my input." },
  { id: "rounds", name: "Custom, with more people involved", detail: "Several directions, a team or board to align, more review rounds." },
] as const;
type LevelId = typeof levels[number]["id"];

// Which band fits each answer pair: rows are what you need, columns are how custom.
const fit: Record<NeedId, Record<LevelId, BandId>> = {
  file: { template: "ai", custom: "entry", rounds: "senior" },
  files: { template: "ai", custom: "senior", rounds: "senior" },
  identity: { template: "entry", custom: "senior", rounds: "studio" },
  strategy: { template: "entry", custom: "studio", rounds: "firm" },
};

const usd = (value: number) => `$${value.toLocaleString("en-US")}`;

const faqs: FactFaq[] = [
  { question: "How much should a logo cost?", answer: `It depends on who makes it and what you get. AI tools cost $0–$100, entry-level freelancers $100–$1,000, senior designers $1,000–$5,000, studios $5,000–$25,000, and branding firms $25,000 or more. With me, a full identity including the logo is ${pricing.weekly}, delivered in one week.` },
  { question: "Where do these ranges come from?", answer: "They are the planning bands from my logo design cost guide. They are approximate ranges for comparing options, not surveyed averages or quotes from other providers." },
  { question: "Why do agencies charge so much more?", answer: "A larger part of the fee pays for account management, meetings, and overhead. The design itself is often done by one senior designer. Hiring that designer directly, you pay for the design work only." },
  { question: "What do I get for $3,000?", answer: "The Brand Sprint: a logo and its variations, final SVG, PNG, and PDF files, a color palette, typography, guidelines, and a logo animation, in one week." },
  { question: "When is an AI logo enough?", answer: "When you are testing an idea and nobody has to remember the brand yet. Once customers, investors, or partners start judging the business by how it looks, a custom identity pays for itself." },
  { question: "Is the one-week timeline guaranteed?", answer: pricing.guarantee },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#webapp`,
    url: pageUrl,
    name: "Logo Design Cost Calculator",
    description: pageDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: pricing.currency },
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Logo Design Cost Calculator", path: "/tools/logo-design-cost-calculator" }], siteUrl),
];

const optionCard = "flex cursor-pointer items-start gap-4 rounded-xl border border-black/20 bg-white p-5 has-[:checked]:border-brand-primary has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-primary md:p-6";
const optionInput = "mt-1 size-5 shrink-0 accent-brand-primary";

export const LogoDesignCostCalculatorPage = () => {
  const [need, setNeed] = useState<NeedId>("files");
  const [level, setLevel] = useState<LevelId>("custom");

  const band = bands.find(({ id }) => id === fit[need][level])!;
  const chosenNeed = needs.find(({ id }) => id === need)!;
  // Strategy takes its own week before the identity week.
  const myWeeks = need === "strategy" ? 2 : 1;
  const myTotal = myWeeks * pricing.weeklyRate;
  const included = need === "strategy" ? ["Brand strategy: positioning and messaging", "Logo and variations, with final files", "Colors, typography, and guidelines", "Logo animation"] : ["Logo and variations, with final files", "Colors, typography, and guidelines", "Logo animation"];
  const templateIsEnough = band.id === "ai";
  const bookingHref = `${bookingUrl}?notes=${encodeURIComponent(`Logo cost calculator. ${chosenNeed.name}: ${myWeeks} week${myWeeks === 1 ? "" : "s"}, ${usd(myTotal)}.`)}`;

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Logo Design Cost Calculator: What Should a Logo Cost? | Ebaq Design</title>
        <meta name="description" content="Answer two questions and see what a logo should cost for your scope, from AI tools to agencies, next to a fixed $3,000 one-week identity from a senior designer." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        {/* Relume Header 1: title and questions on the left, the result on the right, so the tool is in view on load. */}
        <section id="calculator" className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-20">
            <div>
              <header className="mb-10 md:mb-12">
                <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Free tool</p>
                <h1 className="heading-h2 mb-5 md:mb-6">Logo design cost calculator</h1>
                <p className="max-w-md md:text-md">Answer two questions to see what a logo should cost for your scope, and what the same work costs with me.</p>
              </header>
              <form className="grid gap-12" onSubmit={(event) => event.preventDefault()}>
                <fieldset className="grid gap-4">
                  <legend className="heading-h5 mb-6">1. What you need</legend>
                  {needs.map((option) => (
                    <label key={option.id} className={optionCard}>
                      <input type="radio" name="need" className={optionInput} checked={need === option.id} onChange={() => setNeed(option.id)} />
                      <span className="grid flex-1 gap-1">
                        <span className="heading-h7">{option.name}</span>
                        <span className="text-black/60">{option.detail}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <fieldset className="grid gap-4">
                  <legend className="heading-h5 mb-6">2. How custom</legend>
                  {levels.map((option) => (
                    <label key={option.id} className={optionCard}>
                      <input type="radio" name="level" className={optionInput} checked={level === option.id} onChange={() => setLevel(option.id)} />
                      <span className="grid flex-1 gap-1">
                        <span className="heading-h7">{option.name}</span>
                        <span className="text-black/60">{option.detail}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
              </form>
            </div>

            <div aria-live="polite" className="rounded-xl border border-black/20 bg-white p-6 text-black md:p-8 lg:sticky lg:top-28">
              <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">Typical budget</p>
              <p className="my-2 pricing-amount"><span className="pricing-number">{band.range}</span></p>
              <p className="mb-2 font-semibold">{band.name}</p>
              <p className="mb-6 text-black/60">{band.scope}</p>

              <div className="mb-6 border-t border-black/20 pt-6">
                <h2 className="heading-h7 mb-2">With me: {usd(myTotal)}, {myWeeks === 1 ? "one week" : "two weeks"}</h2>
                <p className="mb-4">{templateIsEnough ? "If a template is enough for now, use an AI tool and keep the money. When the business needs something custom, this is what you get:" : "A fixed total, agreed before work starts. You get:"}</p>
                <ul className="grid gap-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <BiCheck aria-hidden="true" className="size-6 shrink-0 text-brand-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mb-6 text-sm text-black/60">Ranges are approximate planning bands in USD, not quotes from other providers.</p>
              <div className="flex justify-end"><AvailableButton pricing href={bookingHref} /></div>
            </div>
          </div>
        </section>

        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container grid grid-cols-1 gap-y-8 lg:grid-cols-[20rem_1fr] lg:gap-x-16">
            <div>
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Price bands</p>
              <h2 className="heading-h3">What a logo costs, by who makes it</h2>
            </div>
            <ul className="border-t border-black/20">
              {bands.map(({ id, name, range, scope }) => (
                <li key={id} className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-black/20 py-4 md:grid-cols-[14rem_9rem_1fr]">
                  <span className="heading-h7">{name}</span>
                  <span className="font-semibold">{range}</span>
                  <span className="text-black/60">{scope}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Comparison
          heading={"The same designer,\nwithout the agency margin"}
          rows={[
            { left: `${usd(myTotal)}, fixed`, right: "$25k–$100k+ per project" },
            { left: myWeeks === 1 ? "1 week, guaranteed" : "2 weeks", right: "3–9 months or more" },
            { left: "You talk to the designer", right: "You talk to an account manager" },
            { left: "Pay for the design work", right: "Pay for overhead and margin too" },
          ]}
        />
        <ToolReading links={[{ label: "Logo design cost guide", href: "/blog/logo-design-cost" }, { label: "Branding cost calculator", href: "/tools/branding-cost-calculator" }, { label: "Brand grader", href: "/tools/brand-grader" }]} />
        <Faq4 tagline="FAQs" heading="Logo cost questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
        <Cta17 heading="Want a logo in one week?" description="Book a 15-minute call. You'll leave with a scope, a start date, and a fixed total." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
