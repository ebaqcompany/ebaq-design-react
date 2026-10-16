import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LottiePlayer as Lottie } from "./LottiePlayer";
import { LazyVideo } from "./Media";
import { Navbar16 } from "./Navbar16";
import { AvailableButton } from "./AvailableButton";
import { Pricing8 } from "./Pricing8";
import { Timeline10 } from "./Timeline10";
import { Comparison } from "./Comparison";
import { Faq4 } from "./Faq4";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { pricing, pricingFaqs, siteUrl, studio, studioFaqs, weekPlan } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// Published 2026-10-14 for search engines and answer engines (linked from the footer only, not
// the navbar) while the design is still being refined. Every number comes from siteFacts.
const pageUrl = `${siteUrl}/pricing`;
const faqs = [...pricingFaqs, ...studioFaqs];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Pricing | Ebaq Design",
    description: `${pricing.summary} ${pricing.guarantee} ${pricing.fixedTotal}`,
    about: { "@id": `${siteUrl}/#organization` },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "Ebaq Design pricing",
      itemListElement: weekPlan.map((step) => ({
        "@type": "Offer",
        name: `${step.weeks}: ${step.name}`,
        description: step.detail,
        priceSpecification: { "@type": "PriceSpecification", price: step.price.replace(/[^0-9]/g, ""), priceCurrency: pricing.currency },
        seller: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }], siteUrl),
];

// Week 1 shown, not listed: each deliverable with a real piece of client work (16:9 media only).
const sprintDeliverables = [
  { title: "Logo design", body: "Several concepts, refined into one distinctive mark.", media: "/case-study/next-dimension/logos.webp", alt: "NextDimension logo system" },
  { title: "Logo animation", body: "Your logo in motion, ready for the web, social, and video.", media: "/portfolio/logos/airporteexecutive-logo.json", alt: "Airport Executive logo animation" },
  { title: "Final logo files", body: "Every version in SVG, PNG, and PDF, for print and screen.", media: "/case-study/fox-berman/01-logos.webp", alt: "Fox Berman logo variations" },
  { title: "Color palette", body: "A primary palette and accents, with values for every medium.", media: "/case-study/orbio/03-colors.mp4", alt: "Orbio color palette" },
  { title: "Typography", body: "Typefaces and a type scale for headlines and body copy.", media: "/foxberman/foxberman-fonts.webp", alt: "Fox Berman typography" },
  { title: "Brand guidelines", body: "A live style guide on guidelines.online, not a forgotten PDF.", media: "/images/site/pricing/guidelines-online.mp4", alt: "Next Dimension brand guidelines on guidelines.online" },
  { title: "Business cards", body: "Print-ready cards your team can order the same week.", media: "/case-study/elevate/05-business-cards.webp", alt: "Elevate business cards" },
  { title: "Social media kit", body: "Profile images and launch posts for LinkedIn and Instagram.", media: "/images/site/pricing/social-wall.mp4", alt: "Orbio social media posts" },
  { title: "Email signature", body: "A branded signature for every inbox on the team.", media: "/foxberman/foxberman-signature.webp", alt: "Fox Berman email signature" },
];

// Lottie tiles load on the client, on the same black backdrop as the homepage grid; the prerender shows the backdrop.
const LottieTile = ({ src }: { src: string }) => {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    fetch(src).then((res) => res.json()).then(setData).catch(() => setData(null));
  }, [src]);
  return data ? <Lottie animationData={data} loop className="size-full" /> : null;
};

const BrandSprintIncluded = () => (
  <section id="brand-sprint" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-3 font-semibold text-brand-primary md:mb-4">Week 1</p>
        <h2 className="mb-5 md:mb-6">What's in the Brand Sprint</h2>
        <p className="md:text-md">A complete brand identity or rebrand in one week. We lock the scope on the kickoff call, so the week is guaranteed and you get every piece below.</p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
        {sprintDeliverables.map(({ title, body, media, alt }) => (
          <div key={title}>
            <div className="aspect-video overflow-hidden rounded-lg bg-[#f5f5f5]">
              {media.endsWith(".json") ? (
                <div role="img" aria-label={alt} className="size-full bg-black">
                  <LottieTile src={media} />
                </div>
              ) : media.endsWith(".mp4") ? (
                <LazyVideo src={media} aria-label={alt} className="size-full object-cover" preload="metadata" />
              ) : (
                <img src={media} alt={alt} loading="lazy" className="size-full object-cover" />
              )}
            </div>
            <h3 className="mt-5 mb-2 text-xl md:text-2xl">{title}</h3>
            <p className="text-black/60">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 border-t border-black/10 pt-6 md:mt-16 md:text-md">
        <strong>Revisions included</strong> throughout the week, and you keep every source file.
      </p>
    </div>
  </section>
);

// A real (redacted) Contra invoice: one week, $3,000, paid in full, with the memo listing the sprint.
const PricingHero = () => (
  <section id="pricing-hero" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
      <div>
        <p className="mb-3 font-semibold text-brand-primary md:mb-4">Pricing</p>
        <h1 className="mb-5 whitespace-pre-line md:mb-6">{"Know your investment\nup front."}</h1>
        <p className="md:text-md">One flat weekly rate, a guaranteed deliverable every week, and a total we agree on before any work starts. No hourly billing, no change orders, no surprise invoices.</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8">
          <AvailableButton nav keepLabel />
          <a href="#brand-sprint" className="font-semibold">What's included &rarr;</a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[30rem] overflow-hidden rounded-lg md:mr-0">
        <img loading="eager" fetchPriority="high"
          src="/images/site/pricing/invoice.webp"
          alt="A real Ebaq Design invoice for a one-week brand sprint, client name hidden: $3,000 paid in full, covering logo design with revisions, a style guide, and logo animation"
          width={1600}
          height={2000}
          className="h-auto w-full"
        />
      </div>
    </div>
  </section>
);

export const PricingPage = () => (
  <div className="relative bg-white">
    <Helmet>
      <title>Pricing: Brand Identity in One Week for $3,000 | Ebaq Design</title>
      <meta name="description" content="A flat $3,000 per week for branding, motion, pitch decks, and websites. A new brand identity or rebrand is delivered in one week, guaranteed." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Pricing: Brand Identity in One Week for $3,000 | Ebaq Design" />
      <meta property="og:description" content="A flat $3,000 per week for branding, motion, pitch decks, and websites. A new brand identity or rebrand is delivered in one week, guaranteed." />
      {schemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>
    <Navbar16 />
    <main>
      <PricingHero />
      <Pricing8 tagline="Plans" heading="Weekly or monthly" description="The same senior designer either way. The monthly plan covers ongoing work and saves $2,000 compared with four separate weeks." />
      <BrandSprintIncluded />
      <Timeline10
        tagline="Bigger projects"
        heading="How the weeks add up"
        description="Every week is the same flat rate with its own guaranteed deliverable. We plan the weeks together on the kickoff call, so you know the total before anything starts."
        timelineItems={weekPlan.map((step) => ({ heading: step.weeks, title: `${step.name} · ${step.price}`, description: step.detail, buttons: [] }))}
      />
      <Comparison
        heading={"Agency-level work,\nwithout the agency invoice"}
        rows={[
          { left: "$3,000 per week, flat", right: "$25k–$100k+ per project" },
          { left: "Brand identity in 1 week, guaranteed", right: "3–9 months or more" },
          { left: "Total agreed before work starts", right: "Estimates that grow" },
          { left: "Revisions included", right: "Change orders" },
          { left: "One senior designer, start to finish", right: "Account managers and juniors" },
        ]}
      />
      <Faq4 tagline="FAQs" heading="Pricing questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Ready to plan your weeks?" description="Book a 15-minute call. You'll leave with a scope, a week count, and a fixed total." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
