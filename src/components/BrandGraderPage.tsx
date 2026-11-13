import { useState } from "react";
import { Helmet } from "react-helmet-async";
import type { IconType } from "react-icons";
import { LuBookOpen, LuMonitor, LuPenTool, LuTarget } from "react-icons/lu";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { ToolReading } from "./ToolReading";
import { TextLink } from "./TextLink";
import { bookingUrl, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// A free tool at /tools/brand-grader: a self-check that scores a brand in four areas and points to
// what to fix first. The quiz card is the comparison pages' quiz (Relume Multi-step Form 1).
// Nothing is sent anywhere; the score is worked out in the browser.
const pageUrl = `${siteUrl}/tools/brand-grader`;
const pageTitle = "Brand Grader: Score Your Brand in 2 Minutes | Ebaq Design";
const pageDescription = "Answer 11 questions about your strategy, logo, identity, and website. Get a brand score out of 100 and see what to fix first.";

type AreaId = "strategy" | "logo" | "consistency" | "website";

const areas: Record<AreaId, { name: string; Icon: IconType; checks: string; fix: string; link: { label: string; href: string } }> = {
  strategy: { name: "Strategy", Icon: LuTarget, checks: "Who the brand is for and what sets it apart.", fix: "Write down who you are for and what makes you different, so design has something to express.", link: { label: "Brand strategy", href: "/services/brand-strategy" } },
  logo: { name: "Logo", Icon: LuPenTool, checks: "Whether the mark is distinctive, readable when small, and delivered in the right files.", fix: "Redraw or refine the logo so it stays clear at small sizes, and get a full set of files.", link: { label: "Logo design", href: "/services/logo-design" } },
  consistency: { name: "Identity", Icon: LuBookOpen, checks: "Guidelines, colors, and type used the same way everywhere.", fix: "Put your colors, type, and logo rules in one guide the whole team can follow.", link: { label: "Brand design", href: "/services/brand-design" } },
  website: { name: "Website", Icon: LuMonitor, checks: "Whether the site matches the brand, explains what you do, and is easy to update.", fix: "Rebuild the site around the brand, with a clear first screen your team can edit.", link: { label: "Web design", href: "/services/web-design" } },
};
const areaIds = Object.keys(areas) as AreaId[];

// Each question has three answers, worth 2, 1, and 0 points in the order written.
const questions: { area: AreaId; question: string; hint: string; options: [string, string, string] }[] = [
  { area: "strategy", question: "Can you say who your brand is for in one sentence?", hint: "Think of how your team would answer, not only you.", options: ["Yes, and the whole team says the same thing", "Roughly, but everyone words it differently", "Not really"] },
  { area: "strategy", question: "Do you know what sets you apart from competitors?", hint: "Something a customer would notice and repeat.", options: ["Yes, and it shows in our messaging", "We know it, but it is not written down", "We sound like everyone else"] },
  { area: "logo", question: "Does your logo stay clear when it is small?", hint: "A browser tab, an app icon, a social avatar.", options: ["Yes, it stays clear", "It gets hard to read", "We have never checked"] },
  { area: "logo", question: "Do you have your logo in every file you need?", hint: "Vector files, plus versions for light and dark backgrounds.", options: ["Yes, a full set", "A few files, some are missing", "One PNG or JPG"] },
  { area: "logo", question: "Could your logo be mistaken for another in your field?", hint: "Put it next to three competitors.", options: ["No, it is clearly ours", "It is a little similar", "Yes, it looks like the others"] },
  { area: "consistency", question: "Do you have brand guidelines?", hint: "Rules for the logo, colors, and typography.", options: ["Yes, a guide the team uses", "Some rules, not in one place", "No"] },
  { area: "consistency", question: "Do your colors and fonts match everywhere?", hint: "Website, social posts, decks, and documents.", options: ["Yes, everywhere", "Mostly", "They vary"] },
  { area: "consistency", question: "When someone new makes something for the brand, does it look right?", hint: "A freelancer, a new hire, a partner.", options: ["Usually the first time", "After a few rounds", "Rarely"] },
  { area: "website", question: "Does your website look like the rest of your brand?", hint: "Same logo, colors, type, and tone.", options: ["Yes", "Partly, the site is older than the brand", "No"] },
  { area: "website", question: "Can a visitor tell what you do in five seconds?", hint: "From the first screen, without scrolling.", options: ["Yes", "Only after scrolling", "Not clearly"] },
  { area: "website", question: "Can your team update the site without a developer?", hint: "Text, images, and new pages.", options: ["Yes", "Only small things", "No"] },
];

const bands = [
  { min: 85, heading: "Strong brand", body: "Your brand is in good shape. Keep the guidelines current and fix the small gaps below before they spread." },
  { min: 60, heading: "Solid, with gaps", body: "The foundations are there, and a few weak spots are costing you consistency. Start with the areas below." },
  { min: 35, heading: "Holding you back", body: "The brand works against you in several places. A focused refresh of the areas below would change how you come across." },
  { min: 0, heading: "Time for a rebrand", body: "Most of the basics are missing or out of date. It is usually faster to rebuild the brand properly than to patch it." },
];

const faqs: FactFaq[] = [
  { question: "What does the brand grader check?", answer: "Four areas: strategy, logo, identity, and website. Each answer is worth zero to two points, and the total is shown as a score out of 100, with a separate score for each area." },
  { question: "How accurate is the score?", answer: "It is a self-check, not an audit. The score is only as honest as your answers, and it cannot see your brand. Use it to find where to look first." },
  { question: "What should I do with a low score?", answer: "Start with the weakest area the result names. Strategy comes first if it is low, because the logo, the guidelines, and the website all depend on it." },
  { question: "Do you save my answers?", answer: "No. The score is worked out in your browser and nothing is sent or stored. If you book a call from the result, your score is added to the booking note so we can start from it." },
  { question: "Can you review my brand for me?", answer: "Yes. Book a 15-minute call, share your current logo and website, and I will tell you what I would change and what it would take." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#webapp`,
    url: pageUrl,
    name: "Brand Grader",
    description: pageDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Brand Grader", path: "/tools/brand-grader" }], siteUrl),
];

const eyebrow = "mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4";
const percent = (points: number, count: number) => Math.round((points / (count * 2)) * 100);

const Grader = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = step === questions.length;
  const current = questions[Math.min(step, questions.length - 1)];
  const selected = answers[step];

  const points = (index: number) => 2 - (answers[index] ?? 2);
  const score = percent(questions.reduce((sum, _, index) => sum + points(index), 0), questions.length);
  const areaScores = areaIds.map((id) => {
    const own = questions.map((question, index) => ({ question, index })).filter(({ question }) => question.area === id);
    const earned = own.reduce((sum, { index }) => sum + points(index), 0);
    return { id, earned, max: own.length * 2, score: percent(earned, own.length) };
  });
  const band = bands.find(({ min }) => score >= min)!;
  // The two weakest areas that lost points, weakest first; ties keep the order strategy, logo, consistency, website.
  const fixes = areaScores.filter((area) => area.score < 100).sort((a, b) => a.score - b.score).slice(0, 2);
  const bookingHref = `${bookingUrl}?notes=${encodeURIComponent(`Brand grader: ${score}/100. ${areaScores.map((area) => `${areas[area.id].name} ${area.score}`).join(", ")}.`)}`;

  return (
    <div className="mx-auto w-full max-w-lg rounded-xl border border-black/20 bg-white p-6 md:p-8">
      <div className="mb-6 grid grid-cols-11 gap-1 md:mb-8 md:gap-2" aria-hidden="true">
        {questions.map((_, index) => <div key={index} className={`h-1 rounded-full ${index < step || done ? "bg-black" : index === step ? "bg-brand-primary" : "bg-black/20"}`} />)}
      </div>
      {done ? (
        <div aria-live="polite">
          <p className={eyebrow}>Your brand score</p>
          <p className="my-2 pricing-amount"><span className="pricing-number">{score}</span> <span className="heading-h5">out of 100</span></p>
          <h3 className="heading-h4 mb-3 md:mb-4">{band.heading}</h3>
          <p className="md:text-md">{band.body}</p>
          <ul className="mt-6 grid gap-4 md:mt-8">
            {areaScores.map((area) => (
              <li key={area.id}>
                <div className="mb-2 flex justify-between gap-4"><span className="font-semibold">{areas[area.id].name}</span><span className="font-mono text-sm">{area.score}</span></div>
                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: area.max }, (_, index) => <div key={index} className={`h-1 flex-1 rounded-full ${index < area.earned ? "bg-brand-primary" : "bg-black/20"}`} />)}
                </div>
              </li>
            ))}
          </ul>
          {fixes.length > 0 && (
            <div className="mt-6 rounded-xl bg-brand-light p-4 md:mt-8 md:p-5">
              <h4 className="heading-h7 mb-3">Fix first</h4>
              <ul className="grid gap-4">
                {fixes.map((area) => (
                  <li key={area.id}>
                    <p className="mb-1">{areas[area.id].fix}</p>
                    <TextLink href={areas[area.id].link.href}>{areas[area.id].link.label}</TextLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8">
            <a href={bookingHref} className="button-inverted">Book a call</a>
            <button type="button" className="underline-offset-4 hover:underline" onClick={() => { setAnswers([]); setStep(0); }}>Start again</button>
          </div>
        </div>
      ) : (
        <>
          <p className={eyebrow}>{areas[current.area].name}</p>
          <h3 id="grader-question" className="heading-h4 mb-3">{current.question}</h3>
          <p className="mb-6 md:mb-8">{current.hint}</p>
          <div role="radiogroup" aria-labelledby="grader-question" className="grid gap-3">
            {current.options.map((option, index) => (
              <button key={option} type="button" role="radio" aria-checked={selected === index}
                onClick={() => setAnswers((previous) => Object.assign([...previous], { [step]: index }))}
                className={`flex w-full items-center gap-3 rounded-full border px-4 py-3 text-left font-semibold transition-colors ${selected === index ? "border-brand-primary bg-brand-light" : "border-black/20 bg-white hover:border-black"}`}>
                <span aria-hidden="true" className="flex size-8 flex-none items-center justify-center rounded-full border border-black/20 bg-white font-mono text-sm">{"ABC"[index]}</span>
                {option}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 md:mt-8">
            <p className="font-mono text-sm uppercase tracking-wide">Question {step + 1} of {questions.length}</p>
            <div className="flex items-center gap-6">
              {step > 0 && <button type="button" className="underline-offset-4 hover:underline" onClick={() => setStep(step - 1)}>Back</button>}
              <button type="button" className="button-inverted disabled:pointer-events-none disabled:opacity-40" disabled={selected === undefined} onClick={() => setStep(step + 1)}>{step === questions.length - 1 ? "See my score" : "Next"}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const BrandGraderPage = () => (
  <div className="relative bg-white text-black">
    <Helmet>
      <title>Brand Grader: Score Your Brand in 2 Minutes | Ebaq Design</title>
      <meta name="description" content="Answer 11 questions about your strategy, logo, identity, and website. Get a brand score out of 100 and see what to fix first." />
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
      {/* Relume Header 1: title and intro on the left, the tool on the right, so it is in view on load. */}
      <section id="grader" className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
        <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-20">
          <header>
            <p className={eyebrow}>Free tool</p>
            <h1 className="heading-h2 mb-5 md:mb-6">Brand grader</h1>
            <p className="max-w-md md:text-md">Answer {questions.length} questions about your brand and get a score out of 100, with what to fix first. It takes about two minutes and nothing is saved.</p>
          </header>
          <Grader />
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <p className={eyebrow}>What it checks</p>
            <h2 className="mb-5 md:mb-6">Four parts of a brand</h2>
            <p className="md:text-md">Each one gets its own score, so you can see where the brand is strong and where it lets you down.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {areaIds.map((id) => {
              const { name, Icon, checks, link } = areas[id];
              return (
                <article key={id} data-surface="white" className="service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
                  <Icon aria-hidden="true" className="mb-6 size-8 md:mb-8" />
                  <h3 className="heading-h5 mb-5 font-bold">{name}</h3>
                  <p className="mb-6 md:mb-8">{checks}</p>
                  <div className="mt-auto"><TextLink href={link.href}>{link.label}</TextLink></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ToolReading links={[{ label: "How to do a brand audit", href: "/blog/brand-audit" }, { label: "Rebranding examples", href: "/blog/rebranding-examples" }, { label: "Brand refresh", href: "/blog/brand-refresh" }]} />
      <Faq4 tagline="FAQs" heading="Brand grader questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Want a second opinion?" description="Book a 15-minute call. Share your logo and website and I’ll tell you what I would change." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
