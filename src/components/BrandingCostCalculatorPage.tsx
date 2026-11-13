import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiCheck } from "react-icons/bi";
import { AvailableButton } from "./AvailableButton";
import { Comparison } from "./Comparison";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { bookingUrl, pricing, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// A free tool at /tools/branding-cost-calculator. Every figure comes from siteFacts: the flat weekly
// rate, the month-upfront rate, and the week-by-week plan. The layout is the two-column service
// pricing section (ServicePricing, Relume Pricing 35): options on the left, the price card on the right.
const pageUrl = `${siteUrl}/tools/branding-cost-calculator`;
const pageTitle = "Branding Cost Calculator: Price Your Brand & Website | Ebaq Design";
const pageDescription = "Pick what you need (brand identity, strategy, motion, website) and see a fixed price and timeline at a flat $3,000 per week, next to typical agency ranges.";

const brandOptions = [
  { id: "identity", name: "Brand identity", detail: "Logo, logo animation, colors, typography, guidelines, and launch mockups.", weeks: 1 },
  { id: "strategy", name: "Brand strategy", detail: "Audience, positioning, core messaging, and a direction for design.", weeks: 1 },
  { id: "motion", name: "Motion & launch assets", detail: "Motion graphics, animated social posts, and a pitch deck.", weeks: 1 },
] as const;
type BrandId = typeof brandOptions[number]["id"];

const websiteOptions = [
  { id: "none", name: "No website", detail: "Brand work only.", weeks: 0 },
  { id: "landing", name: "Landing page", detail: "A simple landing page, designed and built.", weeks: 1 },
  { id: "design", name: "Website design", detail: "Roughly 3–5 pages designed in Figma.", weeks: 1 },
  { id: "site", name: "Website design and build", detail: "Roughly 3–5 pages designed, then built in Framer, Webflow, or Next.js.", weeks: 2 },
  { id: "large", name: "Larger website", detail: "A bigger multi-page site, designed and built. The page count sets the final weeks.", weeks: 3 },
] as const;
type WebsiteId = typeof websiteOptions[number]["id"];

const usd = (value: number) => `$${value.toLocaleString("en-US")}`;
const weekLabel = (weeks: number) => `${weeks} week${weeks === 1 ? "" : "s"}`;
// A month is four weeks; booked upfront it costs the monthly rate instead of four weekly ones.
const priceFor = (weeks: number) => Math.floor(weeks / 4) * pricing.monthlyRate + (weeks % 4) * pricing.weeklyRate;

const faqs: FactFaq[] = [
  { question: "How much does branding cost?", answer: `With me, a brand identity or rebrand costs ${pricing.weekly} and takes one week. Strategy, motion, and website work add weeks at the same flat rate, so a brand plus a small website is usually ${usd(priceFor(3))}. Traditional agencies typically charge $25k–$100k+ over 3–9 months.` },
  { question: "How is the estimate calculated?", answer: `Each part of the project takes a set number of weeks, and every week costs ${pricing.weekly}. From four weeks, a month booked upfront costs ${pricing.monthly} instead of ${usd(pricing.weeklyRate * 4)}, and the calculator applies that automatically.` },
  { question: "Is this a quote?", answer: "It is an estimate from my published rates. On a 15-minute call we agree on the scope, the number of weeks, and the total, and that total is fixed before work starts." },
  { question: "What can change the price?", answer: "Only the number of weeks. Larger websites, extra pages, content that is not ready, and added integrations can add a week. Revisions within the agreed scope are included and there is no hourly billing." },
  { question: "When do I pay?", answer: pricing.payment },
  { question: "Is the one-week brand identity guaranteed?", answer: pricing.guarantee },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#webapp`,
    url: pageUrl,
    name: "Branding Cost Calculator",
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
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Branding Cost Calculator", path: "/tools/branding-cost-calculator" }], siteUrl),
];

const optionCard = "flex cursor-pointer items-start gap-4 rounded-xl border border-black/20 bg-white p-5 has-[:checked]:border-brand-primary has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-primary md:p-6";
const optionInput = "mt-1 size-5 shrink-0 accent-brand-primary";

export const BrandingCostCalculatorPage = () => {
  const [brand, setBrand] = useState<BrandId[]>(["identity"]);
  const [website, setWebsite] = useState<WebsiteId>("none");

  const chosenBrand = brandOptions.filter(({ id }) => brand.includes(id));
  const chosenWebsite = websiteOptions.find(({ id }) => id === website)!;
  const lines = [...chosenBrand, ...(chosenWebsite.weeks ? [chosenWebsite] : [])];
  const weeks = lines.reduce((sum, line) => sum + line.weeks, 0);
  const total = priceFor(weeks);
  const saving = weeks * pricing.weeklyRate - total;
  const summary = `${lines.map(({ name }) => name).join(", ")}: ${weekLabel(weeks)}, ${usd(total)}`;
  const bookingHref = weeks ? `${bookingUrl}?notes=${encodeURIComponent(`Cost calculator estimate. ${summary}.`)}` : undefined;
  const toggleBrand = (id: BrandId) => setBrand((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Branding Cost Calculator: Price Your Brand & Website | Ebaq Design</title>
        <meta name="description" content="Pick what you need (brand identity, strategy, motion, website) and see a fixed price and timeline at a flat $3,000 per week, next to typical agency ranges." />
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
        <header className="px-[5%] pb-12 pt-16 text-center md:pb-16 md:pt-24 lg:pb-20 lg:pt-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">Free tool</p>
            <h1 className="text-balance">Branding cost calculator</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Pick what you need and see the price and timeline. Every figure is my published rate: a flat {pricing.weekly} per week, with the total fixed before work starts.
            </p>
          </div>
        </header>

        <section id="calculator" className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-20">
            <form className="grid gap-12" onSubmit={(event) => event.preventDefault()}>
              <fieldset className="grid gap-4">
                <legend className="heading-h5 mb-6">1. Your brand</legend>
                {brandOptions.map((option) => (
                  <label key={option.id} className={optionCard}>
                    <input type="checkbox" className={optionInput} checked={brand.includes(option.id)} onChange={() => toggleBrand(option.id)} />
                    <span className="grid flex-1 gap-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <span className="heading-h7">{option.name}</span>
                        <span className="font-mono text-sm uppercase tracking-wide text-black/60">{weekLabel(option.weeks)}</span>
                      </span>
                      <span className="text-black/60">{option.detail}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
              <fieldset className="grid gap-4">
                <legend className="heading-h5 mb-6">2. Your website</legend>
                {websiteOptions.map((option) => (
                  <label key={option.id} className={optionCard}>
                    <input type="radio" name="website" className={optionInput} checked={website === option.id} onChange={() => setWebsite(option.id)} />
                    <span className="grid flex-1 gap-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <span className="heading-h7">{option.name}</span>
                        {option.weeks > 0 && <span className="font-mono text-sm uppercase tracking-wide text-black/60">{option.id === "large" ? `From ${weekLabel(option.weeks)}` : weekLabel(option.weeks)}</span>}
                      </span>
                      <span className="text-black/60">{option.detail}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
            </form>

            <div aria-live="polite" className="rounded-xl border border-black/20 bg-white p-6 text-black md:p-8 lg:sticky lg:top-28">
              <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">Your estimate</p>
              <p className="my-2 pricing-amount"><span className="pricing-number">{usd(total)}</span></p>
              <p className="mb-6">
                {weeks === 0 ? "Pick at least one option to see a price." : `${weekLabel(weeks)} of work, total fixed before we start.`}
                {saving > 0 && ` Includes a month booked upfront, saving ${usd(saving)}.`}
              </p>
              {lines.length > 0 && (
                <div className="mb-6">
                  <h2 className="heading-h7 mb-4">What's included</h2>
                  <ul className="grid gap-4">
                    {lines.map((line) => (
                      <li key={line.id} className="flex items-start gap-2">
                        <BiCheck aria-hidden="true" className="size-6 shrink-0 text-brand-primary" />
                        <span className="flex flex-1 flex-wrap justify-between gap-x-4">
                          <span>{line.name}</span>
                          <span className="text-black/60">{weekLabel(line.weeks)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mb-6 text-sm text-black/60">An estimate from published rates, in USD. Scope and weeks are confirmed on a 15-minute call.</p>
              <div className="flex justify-end"><AvailableButton pricing href={bookingHref} /></div>
            </div>
          </div>
        </section>

        <Comparison
          heading={"The same scope,\nfrom me or an agency"}
          rows={[
            { left: weeks ? `${usd(total)} for your scope` : `${pricing.weekly} per week, flat`, right: "$25k–$100k+ per project" },
            { left: weeks ? `${weekLabel(weeks)}, start to finish` : "Brand identity in 1 week", right: "3–9 months or more" },
            { left: "Total agreed before work starts", right: "Estimates that grow" },
            { left: "Revisions within agreed scope", right: "Change orders" },
            { left: "One senior designer, start to finish", right: "Account managers and juniors" },
          ]}
        />
        <Faq4 tagline="FAQs" heading="Branding cost questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
        <Cta17 heading="Want an exact number?" description="Book a 15-minute call. You'll leave with a scope, a week count, and a fixed total." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
