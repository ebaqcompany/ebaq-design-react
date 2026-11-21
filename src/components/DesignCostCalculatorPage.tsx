import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import type { IconType } from "react-icons";
import { BiCheck } from "react-icons/bi";
import { LuLayers, LuMonitor, LuPenTool, LuPlay, LuTarget } from "react-icons/lu";
import { bookingUrl, pricing, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { platformFacts, type PlatformId } from "../data/comparisons";
import { AvailableButton } from "./AvailableButton";
import { PlatformName } from "./ComparePlatform";
import { Comparison } from "./Comparison";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";
import { ToolReading } from "./ToolReading";

// Unified Design Cost Calculator at /tools/design-cost-calculator.
// Combines logo, brand identity, strategy, motion, and website (Framer, Webflow, Next.js) pricing
// from siteFacts and platformFacts into one transparent scope-and-estimate tool.
const pageUrl = `${siteUrl}/tools/design-cost-calculator`;
const pageTitle = "Design Cost Calculator: Logo, Branding & Website Pricing | Ebaq Design";
const pageDescription = "Pick what you need—logo, brand identity, strategy, motion, or a Framer, Webflow, or Next.js website—and see a fixed price, timeline, platform cost, and agency comparison.";

type ServiceId = "strategy" | "logo" | "identity" | "motion";
type WebsiteId = "none" | "landing" | "design" | "site" | "large";
type SitePlatform = "framer" | "webflow" | "nextjs";
type PresetId = "logo" | "branding" | "website" | "all";

const serviceOptions: { id: ServiceId; name: string; detail: string; weeks: number; Icon: IconType }[] = [
  { id: "strategy", name: "Brand strategy", detail: "Audience, positioning, core messaging, and a clear creative direction.", weeks: 1, Icon: LuTarget },
  { id: "logo", name: "Logo design", detail: "Custom logo, horizontal/stacked/icon variations, vector files (SVG, PNG, PDF), and logo animation.", weeks: 1, Icon: LuPenTool },
  { id: "identity", name: "Full brand identity", detail: "Includes logo design & animation, plus color palette, typography, online guidelines, and launch mockups.", weeks: 1, Icon: LuLayers },
  { id: "motion", name: "Motion & launch assets", detail: "Motion graphics, animated social posts, product teasers, and a pitch deck.", weeks: 1, Icon: LuPlay },
];

const websiteOptions: { id: WebsiteId; name: string; detail: string; weeks: number }[] = [
  { id: "none", name: "No website", detail: "Brand, logo, or motion work only.", weeks: 0 },
  { id: "landing", name: "Landing page", detail: "A single focused landing page, designed and built.", weeks: 1 },
  { id: "design", name: "Website design only (Figma)", detail: "Roughly 3–5 pages designed in Figma, ready for your developers.", weeks: 1 },
  { id: "site", name: "Website design & build (3–5 pages)", detail: "Designed in Figma, then built in Framer, Webflow, or Next.js.", weeks: 2 },
  { id: "large", name: "Larger multi-page website", detail: "A bigger marketing site, designed and built. Page count sets the final weeks.", weeks: 3 },
];

const platforms = ["framer", "webflow", "nextjs"] as const satisfies readonly PlatformId[];

const presets: { id: PresetId; label: string; services: ServiceId[]; website: WebsiteId }[] = [
  { id: "logo", label: "Logo only", services: ["logo"], website: "none" },
  { id: "branding", label: "Brand identity", services: ["identity"], website: "none" },
  { id: "website", label: "Website", services: [], website: "site" },
  { id: "all", label: "Brand + Website", services: ["strategy", "identity"], website: "site" },
];

const usd = (value: number) => `$${value.toLocaleString("en-US")}`;
const weekLabel = (weeks: number) => `${weeks} week${weeks === 1 ? "" : "s"}`;
const priceFor = (weeks: number) => Math.floor(weeks / 4) * pricing.monthlyRate + (weeks % 4) * pricing.weeklyRate;
const planYear = (platform: SitePlatform) => Number(platformFacts[platform].costs.plan.match(/\$([\d,]+)/)?.[1].replace(",", "") ?? 0);
const yearOne = (platform: SitePlatform, build: number) => (planYear(platform) ? usd(build + planYear(platform)) : `${usd(build)}, plus hosting`);

const faqs: FactFaq[] = [
  { question: "How much does a logo, brand identity, or website cost?", answer: `Every scope uses the same published rate: ${pricing.weekly} per week. A logo and full brand identity takes 1 week (${pricing.weekly}). Adding brand strategy or motion adds a week each. A landing page is 1 week, a 3–5 page site is 2 weeks, and from 4 weeks a full month booked upfront drops to ${pricing.monthly} (saving $2,000).` },
  { question: "Why do Logo Design and Full Brand Identity both cost 1 week?", answer: "A standalone logo without colors, type, and usage rules rarely holds together once you launch. My 1-week Brand Sprint delivers the custom logo, variations, final vector files, logo animation, palette, typography, and online guidelines together for one flat $3,000 fee." },
  { question: "Does the website price change depending on Framer, Webflow, or Next.js?", answer: "No. Design and build cost the same regardless of platform. What changes is the hosting/CMS subscription you pay the platform directly—shown automatically in the calculator when you select a website build." },
  { question: "How does this compare to traditional agencies?", answer: "Traditional studios and agencies typically charge $10k–$25k for a logo/identity and $25k–$100k+ over 3–9 months for brand plus website—mostly due to account managers and overhead. With me, you work directly with one senior designer at a fixed weekly rate." },
  { question: "Is this estimate a final quote?", answer: "It is based directly on my published rates. On a 15-minute intro call we confirm the exact scope, week count, and fixed total before any work begins." },
  { question: "When do I pay, and is the timeline guaranteed?", answer: `${pricing.payment} ${pricing.guarantee}` },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#webapp`,
    url: pageUrl,
    name: "Design Cost Calculator",
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
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Design Cost Calculator", path: "/tools/design-cost-calculator" }], siteUrl),
];

const optionCard =
  "flex cursor-pointer items-start gap-4 rounded-xl border border-black/20 bg-white p-5 has-[:checked]:border-brand-primary has-[:checked]:bg-brand-light/40 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-primary md:p-6";
const optionInput = "mt-1 size-5 shrink-0 accent-brand-primary";

export const DesignCostCalculatorPage = () => {
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(["identity"]);
  const [website, setWebsite] = useState<WebsiteId>("none");
  const [platform, setPlatform] = useState<SitePlatform>("framer");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scope = new URLSearchParams(window.location.search).get("scope") as PresetId | null;
    if (!scope) return;
    const match = presets.find((p) => p.id === scope);
    if (match) {
      setSelectedServices(match.services);
      setWebsite(match.website);
    }
  }, []);

  const toggleService = (id: ServiceId) => {
    setSelectedServices((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      // Selecting Full Brand Identity supersedes standalone Logo Design (identity already includes the logo).
      if (id === "identity") return [...current.filter((item) => item !== "logo"), "identity"];
      if (id === "logo") return [...current.filter((item) => item !== "identity"), "logo"];
      return [...current, id];
    });
  };

  const applyPreset = (preset: (typeof presets)[number]) => {
    setSelectedServices(preset.services);
    setWebsite(preset.website);
  };

  const chosenServices = serviceOptions.filter((option) => selectedServices.includes(option.id));
  const chosenWebsite = websiteOptions.find((option) => option.id === website)!;
  const needsPlatform = website === "landing" || website === "site" || website === "large";

  const lines = [
    ...chosenServices.map((item) => ({ id: item.id, name: item.name, weeks: item.weeks })),
    ...(chosenWebsite.weeks > 0 ? [{ id: chosenWebsite.id, name: needsPlatform ? `${chosenWebsite.name} (${platformFacts[platform].name})` : chosenWebsite.name, weeks: chosenWebsite.weeks }] : []),
  ];

  const weeks = lines.reduce((sum, line) => sum + line.weeks, 0);
  const total = priceFor(weeks);
  const saving = weeks * pricing.weeklyRate - total;
  const platformName = platformFacts[platform].name;

  const agencyEstimate =
    weeks === 0
      ? "$10k–$100k+"
      : weeks === 1 && selectedServices.includes("logo") && website === "none"
        ? "$5,000–$15,000 (senior studio)"
        : weeks === 1
          ? "$10,000–$25,000 · 4–8 weeks"
          : weeks === 2
            ? "$20,000–$45,000 · 2–4 months"
            : "$35,000–$100,000+ · 3–9 months";

  const summary = `${lines.map((line) => line.name).join(", ")}: ${weekLabel(weeks)}, ${usd(total)}`;
  const bookingHref = weeks ? `${bookingUrl}?notes=${encodeURIComponent(`Design cost calculator estimate. ${summary}.`)}` : undefined;

  const activePreset = presets.find(
    (p) => p.website === website && p.services.length === selectedServices.length && p.services.every((s) => selectedServices.includes(s)),
  )?.id;

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Design Cost Calculator: Logo, Branding &amp; Website Pricing | Ebaq Design</title>
        <meta name="description" content="Pick what you need—logo, brand identity, strategy, motion, or a Framer, Webflow, or Next.js website—and see a fixed price, timeline, platform cost, and agency comparison." />
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
        <section id="calculator" className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-16">
            <div>
              <header className="mb-8 md:mb-10">
                <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Free tool</p>
                <h1 className="heading-h1 mb-4 md:mb-5">Design cost calculator</h1>
                <p className="max-w-lg md:text-md text-black/80">
                  Price a logo, full brand identity, strategy, motion, or website in one place. Every number comes from my published flat rate: {pricing.weekly} per week ({pricing.monthly} per 4-week month).
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={activePreset === preset.id}
                      onClick={() => applyPreset(preset)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                        activePreset === preset.id ? "border-brand-primary bg-brand-light text-black" : "border-black/20 bg-white text-black hover:border-black"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </header>

              <form className="grid gap-10" onSubmit={(event) => event.preventDefault()}>
                <fieldset className="grid gap-3.5">
                  <legend className="heading-h5 mb-4">1. Brand, logo &amp; motion</legend>
                  {serviceOptions.map(({ id, name, detail, weeks: w, Icon }) => (
                    <label key={id} className={optionCard}>
                      <input type="checkbox" className={optionInput} checked={selectedServices.includes(id)} onChange={() => toggleService(id)} />
                      <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-primary" />
                      <span className="grid flex-1 gap-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <span className="heading-h7">{name}</span>
                          <span className="font-mono text-xs uppercase tracking-wide text-black/60">{weekLabel(w)}</span>
                        </span>
                        <span className="text-sm text-black/65">{detail}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>

                <fieldset className="grid gap-3.5">
                  <legend className="heading-h5 mb-4">2. Website</legend>
                  {websiteOptions.map((option) => (
                    <label key={option.id} className={optionCard}>
                      <input type="radio" name="website" className={optionInput} checked={website === option.id} onChange={() => setWebsite(option.id)} />
                      <LuMonitor aria-hidden="true" className="mt-1 size-5 shrink-0 text-black/60" />
                      <span className="grid flex-1 gap-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <span className="heading-h7">{option.name}</span>
                          {option.weeks > 0 && (
                            <span className="font-mono text-xs uppercase tracking-wide text-black/60">
                              {option.id === "large" ? `From ${weekLabel(option.weeks)}` : weekLabel(option.weeks)}
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-black/65">{option.detail}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>

                {needsPlatform && (
                  <fieldset className="grid gap-3.5">
                    <legend className="heading-h5 mb-4">3. Website platform</legend>
                    {platforms.map((id) => (
                      <label key={id} className={optionCard}>
                        <input type="radio" name="platform" className={optionInput} checked={platform === id} onChange={() => setPlatform(id)} />
                        <span className="grid flex-1 gap-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <span className="heading-h7"><PlatformName platform={id} /></span>
                            <span className="font-mono text-xs uppercase tracking-wide text-black/60">{platformFacts[id].costs.plan}</span>
                          </span>
                          <span className="text-sm text-black/65">{platformFacts[id].criteria.bestFor}</span>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                )}
              </form>
            </div>

            <div aria-live="polite" className="rounded-xl border border-black/20 bg-white p-6 text-black md:p-8 lg:sticky lg:top-28">
              <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">Your fixed estimate</p>
              <p className="my-2 pricing-amount"><span className="pricing-number">{usd(total)}</span></p>
              <p className="mb-6 text-black/80">
                {weeks === 0 ? "Pick at least one service to calculate your scope." : `${weekLabel(weeks)} of senior design work, total fixed before we start.`}
                {saving > 0 && ` Includes the 4-week monthly rate, saving ${usd(saving)}.`}
              </p>

              {lines.length > 0 && (
                <div className="mb-6 border-t border-black/10 pt-5">
                  <h2 className="heading-h7 mb-3">What’s included</h2>
                  <ul className="grid gap-3">
                    {lines.map((line) => (
                      <li key={line.id} className="flex items-start gap-2 text-sm">
                        <BiCheck aria-hidden="true" className="size-5 shrink-0 text-brand-primary" />
                        <span className="flex flex-1 flex-wrap justify-between gap-x-4">
                          <span>{line.name}</span>
                          <span className="font-mono text-xs text-black/60">{weekLabel(line.weeks)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {needsPlatform && weeks > 0 && (
                <div className="mb-6 rounded-xl bg-surface-muted p-4 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-black/70">{platformName} first-year plan</span>
                    <span className="font-semibold">{platformFacts[platform].costs.plan}</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-black/10 pt-2">
                    <span className="font-semibold">Year-one total</span>
                    <span className="font-semibold">{yearOne(platform, total)}</span>
                  </div>
                </div>
              )}

              {weeks > 0 && (
                <div className="mb-6 rounded-xl border border-brand-primary/30 bg-brand-light p-4 text-sm">
                  <p className="mb-1 font-mono text-xs uppercase tracking-wide text-brand-primary">Typical agency range</p>
                  <p className="font-semibold text-black">{agencyEstimate}</p>
                </div>
              )}

              <p className="mb-6 text-xs text-black/60">Estimate in USD from published rates. Exact scope and weeks are confirmed on a 15-minute intro call.</p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <TextLink href="/tools/creative-brief-generator" className="text-sm">Build a creative brief</TextLink>
                <AvailableButton pricing href={bookingHref} />
              </div>
            </div>
          </div>
        </section>

        <Comparison
          heading={"The same scope,\nfrom me or an agency"}
          rows={[
            { left: weeks ? `${usd(total)} for your scope` : `${pricing.weekly} per week, flat`, right: agencyEstimate },
            { left: weeks ? `${weekLabel(weeks)}, start to finish` : "Brand identity in 1 week", right: "3–9 months or more" },
            { left: "Total agreed before work starts", right: "Estimates that grow" },
            { left: "Revisions within agreed scope", right: "Change orders" },
            { left: "One senior designer, start to finish", right: "Account managers and juniors" },
          ]}
        />
        <ToolReading
          links={[
            { label: "Creative brief generator", href: "/tools/creative-brief-generator" },
            { label: "Compare website platforms", href: "/compare" },
            { label: "Logo design cost guide", href: "/blog/logo-design-cost" },
          ]}
        />
        <Faq4 tagline="FAQs" heading="Design pricing questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
        <Cta17 heading="Want an exact fixed quote?" description="Book a 15-minute call. You’ll leave with a clear scope, week count, and fixed price." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
