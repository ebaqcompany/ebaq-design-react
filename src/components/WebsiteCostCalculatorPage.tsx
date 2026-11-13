import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiCheck } from "react-icons/bi";
import { AvailableButton } from "./AvailableButton";
import { PlatformName } from "./ComparePlatform";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { ToolReading } from "./ToolReading";
import { TextLink } from "./TextLink";
import { bookingUrl, pricing, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { platformFacts, type PlatformId } from "../data/comparisons";

// A free tool at /tools/website-cost-calculator, built on the branding cost calculator's layout
// (ServicePricing, Relume Pricing 35): options on the left, the price card on the right.
// Design and build figures come from siteFacts; each platform's plan comes from src/data/comparisons.ts.
const pageUrl = `${siteUrl}/tools/website-cost-calculator`;
const pageTitle = "Website Cost Calculator: Framer, Webflow & Next.js | Ebaq Design";
const pageDescription = "Pick your site size and platform to see a fixed design and build price, the timeline, and what the first year costs on Framer, Webflow, or Next.js.";

const sizeOptions = [
  { id: "landing", name: "Landing page", detail: "A single landing page, designed and built.", weeks: 1 },
  { id: "site", name: "Website, 3–5 pages", detail: "Designed in Figma, then built on the platform you pick.", weeks: 2 },
  { id: "large", name: "Larger website", detail: "A bigger multi-page site, designed and built. The page count sets the final weeks.", weeks: 3 },
] as const;
type SizeId = typeof sizeOptions[number]["id"];

const platforms = ["framer", "webflow", "nextjs"] as const satisfies readonly PlatformId[];
type SitePlatform = typeof platforms[number];

const brandOptions = [
  { id: "identity", name: "Brand identity", detail: "Logo, logo animation, colors, typography, guidelines, and launch mockups.", weeks: 1 },
  { id: "strategy", name: "Brand strategy", detail: "Audience, positioning, core messaging, and a direction for design.", weeks: 1 },
] as const;
type BrandId = typeof brandOptions[number]["id"];

const usd = (value: number) => `$${value.toLocaleString("en-US")}`;
const weekLabel = (weeks: number) => `${weeks} week${weeks === 1 ? "" : "s"}`;
// A month is four weeks; booked upfront it costs the monthly rate instead of four weekly ones.
const priceFor = (weeks: number) => Math.floor(weeks / 4) * pricing.monthlyRate + (weeks % 4) * pricing.weeklyRate;
// The first-year plan figure in the comparison data ("$360 (Pro)"); Next.js has none, its hosting is billed by the host.
const planYear = (platform: SitePlatform) => Number(platformFacts[platform].costs.plan.match(/\$([\d,]+)/)?.[1].replace(",", "") ?? 0);
const yearOne = (platform: SitePlatform, build: number) => (planYear(platform) ? usd(build + planYear(platform)) : `${usd(build)}, plus hosting`);

const faqs: FactFaq[] = [
  { question: "How much does a website cost?", answer: `With me, a landing page costs ${usd(priceFor(1))} and takes one week. A site of three to five pages costs ${usd(priceFor(2))} and takes two weeks. Larger sites start at ${usd(priceFor(3))}. The platform bills its own plan on top of that.` },
  { question: "How is the estimate calculated?", answer: `Each part of the project takes a set number of weeks, and every week costs ${pricing.weekly}. From four weeks, a month booked upfront costs ${pricing.monthly} instead of ${usd(pricing.weeklyRate * 4)}, and the calculator applies that automatically.` },
  { question: "What does the platform cost?", answer: `Framer: ${platformFacts.framer.criteria.plan} Webflow: ${platformFacts.webflow.criteria.plan} Next.js: ${platformFacts.nextjs.criteria.plan} You pay the platform directly, so the plan stays in your name.` },
  { question: "Does the price change with the platform?", answer: "No. Design and build cost the same on Framer, Webflow, and Next.js. What changes is the plan you pay the platform afterwards, and how your team edits the site." },
  { question: "Is this a quote?", answer: "It is an estimate from my published rates. On a 15-minute call we agree on the scope, the number of weeks, and the total, and that total is fixed before work starts." },
  { question: "When do I pay?", answer: pricing.payment },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#webapp`,
    url: pageUrl,
    name: "Website Cost Calculator",
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
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Website Cost Calculator", path: "/tools/website-cost-calculator" }], siteUrl),
];

const optionCard = "flex cursor-pointer items-start gap-4 rounded-xl border border-black/20 bg-white p-5 has-[:checked]:border-brand-primary has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-primary md:p-6";
const optionInput = "mt-1 size-5 shrink-0 accent-brand-primary";
const eyebrow = "font-mono text-sm uppercase tracking-wide text-brand-primary";

export const WebsiteCostCalculatorPage = () => {
  const [size, setSize] = useState<SizeId>("site");
  const [platform, setPlatform] = useState<SitePlatform>("framer");
  const [brand, setBrand] = useState<BrandId[]>([]);

  const chosenSize = sizeOptions.find(({ id }) => id === size)!;
  const lines = [chosenSize, ...brandOptions.filter(({ id }) => brand.includes(id))];
  const weeks = lines.reduce((sum, line) => sum + line.weeks, 0);
  const total = priceFor(weeks);
  const saving = weeks * pricing.weeklyRate - total;
  const platformName = platformFacts[platform].name;
  const summary = `${lines.map(({ name }) => name).join(", ")} on ${platformName}: ${weekLabel(weeks)}, ${usd(total)}`;
  const bookingHref = `${bookingUrl}?notes=${encodeURIComponent(`Website cost calculator estimate. ${summary}.`)}`;
  const toggleBrand = (id: BrandId) => setBrand((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Website Cost Calculator: Framer, Webflow & Next.js | Ebaq Design</title>
        <meta name="description" content="Pick your site size and platform to see a fixed design and build price, the timeline, and what the first year costs on Framer, Webflow, or Next.js." />
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
        {/* Relume Header 1: title and intro on the left, the tool's result on the right, so the tool is in view on load. */}
        <section id="calculator" className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-20">
            <div>
            <header className="mb-10 md:mb-12">
              <p className={`mb-3 md:mb-4 ${eyebrow}`}>Free tool</p>
              <h1 className="heading-h2 mb-5 md:mb-6">Website cost calculator</h1>
              <p className="max-w-md md:text-md">Pick the size of your site and the platform. You get the design and build price, the timeline, and what the first year costs with the platform’s plan. Design and build is a flat {pricing.weekly} per week.</p>
            </header>
            <form className="grid gap-12" onSubmit={(event) => event.preventDefault()}>
              <fieldset className="grid gap-4">
                <legend className="heading-h5 mb-6">1. Your website</legend>
                {sizeOptions.map((option) => (
                  <label key={option.id} className={optionCard}>
                    <input type="radio" name="size" className={optionInput} checked={size === option.id} onChange={() => setSize(option.id)} />
                    <span className="grid flex-1 gap-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <span className="heading-h7">{option.name}</span>
                        <span className="font-mono text-sm uppercase tracking-wide text-black/60">{option.id === "large" ? `From ${weekLabel(option.weeks)}` : weekLabel(option.weeks)}</span>
                      </span>
                      <span className="text-black/60">{option.detail}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
              <fieldset className="grid gap-4">
                <legend className="heading-h5 mb-6">2. Your platform</legend>
                {platforms.map((id) => (
                  <label key={id} className={optionCard}>
                    <input type="radio" name="platform" className={optionInput} checked={platform === id} onChange={() => setPlatform(id)} />
                    <span className="grid flex-1 gap-1">
                      <span className="heading-h7"><PlatformName platform={id} /></span>
                      <span className="text-black/60">{platformFacts[id].criteria.bestFor}</span>
                    </span>
                  </label>
                ))}
                <p className="text-black/60">Not sure which one? <TextLink href="/compare">Compare the platforms</TextLink></p>
              </fieldset>
              <fieldset className="grid gap-4">
                <legend className="heading-h5 mb-6">3. Need a brand first?</legend>
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
            </form>
            </div>

            <div aria-live="polite" className="rounded-xl border border-black/20 bg-white p-6 text-black md:p-8 lg:sticky lg:top-28">
              <p className={`mb-2 ${eyebrow}`}>Design and build</p>
              <p className="my-2 pricing-amount"><span className="pricing-number">{usd(total)}</span></p>
              <p className="mb-6">
                {`${weekLabel(weeks)} of work, total fixed before we start.`}
                {saving > 0 && ` Includes a month booked upfront, saving ${usd(saving)}.`}
              </p>
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
              <div className="mb-6 rounded-xl bg-brand-light p-4 md:p-5">
                <h2 className="heading-h7 mb-3">First year on <PlatformName platform={platform} /></h2>
                <dl className="grid gap-2">
                  <div className="flex flex-wrap justify-between gap-x-4"><dt>Design and build</dt><dd>{usd(total)}</dd></div>
                  <div className="flex flex-wrap justify-between gap-x-4"><dt>Platform plan, first year</dt><dd>{platformFacts[platform].costs.plan}</dd></div>
                  <div className="flex flex-wrap justify-between gap-x-4 font-semibold"><dt>Year one</dt><dd>{yearOne(platform, total)}</dd></div>
                </dl>
              </div>
              <p className="mb-6 text-sm text-black/60">An estimate from published rates, in USD. The platform bills its plan to you directly. Scope and weeks are confirmed on a 15-minute call.</p>
              <div className="flex justify-end"><AvailableButton pricing href={bookingHref} /></div>
            </div>
          </div>
        </section>

        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
              <p className={`mb-3 md:mb-4 ${eyebrow}`}>Side by side</p>
              <h2 className="mb-5 md:mb-6">Your site on each platform</h2>
              <p className="md:text-md">The same scope on all three. Design and build cost the same; the platform’s plan is the difference.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {platforms.map((id) => (
                <article key={id} data-surface="white" className={`service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:content-[''] ${id === platform ? "after:border-brand-primary" : "after:border-black/20"}`}>
                  <h3 className="heading-h5 mb-5 font-bold"><PlatformName platform={id} /></h3>
                  <dl className="mb-6 grid gap-3 md:mb-8">
                    <div><dt className="text-black/60">Design and build</dt><dd>{usd(total)}</dd></div>
                    <div><dt className="text-black/60">Platform plan, first year</dt><dd>{platformFacts[id].costs.plan}</dd></div>
                    <div><dt className="text-black/60">Year one</dt><dd className="heading-h7">{yearOne(id, total)}</dd></div>
                  </dl>
                  <div className="mt-auto"><TextLink href={platformFacts[id].choice.link.href}>{platformFacts[id].choice.link.label}</TextLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ToolReading links={[{ label: "SaaS website design", href: "/saas-web-design" }, { label: "WordPress vs Webflow vs Framer", href: "/blog/wordpress-vs-webflow-vs-framer" }, { label: "Platform comparisons", href: "/compare" }]} />
        <Faq4 tagline="FAQs" heading="Website cost questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
        <Cta17 heading="Want an exact number?" description="Book a 15-minute call. You'll leave with a scope, a week count, and a fixed total." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
