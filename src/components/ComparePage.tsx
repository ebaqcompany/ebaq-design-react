import { useState } from "react";
import { Helmet } from "react-helmet-async";
import type { IconType } from "react-icons";
import { LuBot, LuCalculator, LuClock, LuCodeXml, LuCreditCard, LuDatabase, LuFigma, LuGraduationCap, LuHammer, LuPenTool, LuSearch, LuShieldCheck, LuSparkles, LuSquarePen, LuTarget, LuUsers } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { siteUrl } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { caseStudies } from "../data/caseStudies";
import { comparisonName, comparisons, comparisonsUpdated, comparisonTitle, costRows, criteria, eitherResult, platformFacts, quizQuestions, type Comparison, type CostId, type CriterionId, type PlatformId } from "../data/comparisons";
import { AiLandingAbout } from "./AiLandingAbout";
import { ArekProfileBadge } from "./ArekProfileBadge";
import { PlatformName, PlatformPair, platformIcons } from "./ComparePlatform";
import { Cta17 } from "./Cta17";
import { FaqAccordion } from "./FaqAccordion";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { NotFoundPage } from "./NotFoundPage";
import { TestimonialSlider, testimonialClients, type TestimonialClient } from "./ServiceTestimonialOptions";
import { TextLink } from "./TextLink";

// One comparison page from src/data/comparisons.ts, built from Relume sections: Header 62 (hero),
// Comparison 11 and Pricing 55 (tables), Layout 620 (which to choose), Multi-step Form 1 (quiz),
// Testimonial 32 cards (client work), and FAQ 6.

const eyebrow = "mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4";
const card = "rounded-xl border border-black/20 bg-white";
// The services cards' treatment (AiLandingServices): white fill, rounded corners, hairline border.
const serviceCard = "service-card relative rounded-xl p-6 text-black md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']";

const criterionIcons: Record<CriterionId, IconType> = { bestFor: LuTarget, design: LuPenTool, motion: LuSparkles, cms: LuDatabase, seo: LuSearch, editing: LuSquarePen, upkeep: LuShieldCheck, learning: LuGraduationCap, code: LuCodeXml, ai: LuBot, plan: LuCreditCard, builtByMe: LuClock };
const costIcons: Record<CostId, IconType> = { design: LuFigma, build: LuHammer, plan: LuCreditCard, editors: LuUsers, total: LuCalculator };

type Row = { label: string; note?: string; Icon: IconType; values: string[]; total?: boolean };

// A brand-blue header of platform marks, then one row per criterion. On a phone the columns stack,
// so each answer carries its platform's mark.
const columns = "md:grid-cols-[1fr_1.25fr_1.25fr_1.25fr]";
const ComparisonTable = ({ label, platforms, rows }: { label: string; platforms: PlatformId[]; rows: Row[] }) => (
  <div role="table" aria-label={label} className={`${card} overflow-hidden`}>
    <div role="row" className={`hidden bg-brand-primary text-black md:grid ${columns}`}>
      <div role="columnheader" className="px-6 py-4"><span className="sr-only">Criteria</span></div>
      {platforms.map((platform) => (
        <div key={platform} role="columnheader" className="heading-h6 px-6 py-4"><PlatformName platform={platform} /></div>
      ))}
    </div>
    {rows.map((row) => (
      <div key={row.label} role="row" className={`grid grid-cols-1 pb-4 md:pb-0 ${columns} ${row.total ? "bg-brand-light" : "border-b border-black/10"}`}>
        <div role="rowheader" className="flex items-start gap-3 px-4 pb-2 pt-4 md:px-6 md:py-4">
          <row.Icon aria-hidden="true" className="mt-0.5 size-5 flex-none text-brand-primary" />
          <div>
            <p className="font-semibold">{row.label}</p>
            {row.note && <p className="text-sm text-black/60">{row.note}</p>}
          </div>
        </div>
        {platforms.map((platform, index) => (
          <div key={platform} role="cell" className="px-4 py-2 md:px-6 md:py-4">
            <p className="mb-1 text-sm font-semibold md:hidden"><PlatformName platform={platform} /></p>
            <p className={row.total ? "heading-h7" : "text-black/60"}>{row.values[index]}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Quiz = ({ platforms }: { platforms: PlatformId[] }) => {
  const [first, second] = platforms;
  // The last question asks about the two platforms in the page's title.
  const questions = [...quizQuestions, {
    question: "Does your team already use one?",
    hint: "Existing skills count for a lot.",
    options: [
      { label: `We already work in ${platformFacts[first].name}`, scores: { [first]: 3 } },
      { label: `We already work in ${platformFacts[second].name}`, scores: { [second]: 3 } },
      { label: "Neither", scores: {} },
    ],
  }];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = step === questions.length;
  const totals = platforms.map((platform) => answers.reduce((sum, choice, index) => sum + ((questions[index].options[choice].scores as Partial<Record<PlatformId, number>>)[platform] ?? 0), 0));
  const best = Math.max(...totals);
  const winners = platforms.filter((_, index) => totals[index] === best);
  const winner = winners.length === 1 ? winners[0] : undefined;
  const result = winner ? platformFacts[winner].result : eitherResult;
  const ResultIcon = winner && platformIcons[winner];
  const resultLink = winner && platformFacts[winner].choice.link;
  const current = questions[Math.min(step, questions.length - 1)];
  const selected = answers[step];

  return (
    <div className={`${card} mx-auto w-full max-w-lg p-6 md:p-8`}>
      <div className="mb-6 grid grid-cols-6 gap-2 md:mb-8" aria-hidden="true">
        {questions.map((_, index) => <div key={index} className={`h-1 rounded-full ${index < step || done ? "bg-black" : index === step ? "bg-brand-primary" : "bg-black/20"}`} />)}
      </div>
      {done ? (
        <div aria-live="polite">
          {ResultIcon && <ResultIcon aria-hidden="true" className="mb-5 size-10 md:mb-6" />}
          <p className={eyebrow}>Your result</p>
          <h3 className="heading-h4 mb-3 md:mb-4">{result.heading}</h3>
          <p className="md:text-md">{result.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8">
            <a href="/start" className="button-inverted">Book a call</a>
            {resultLink && <TextLink href={resultLink.href}>{resultLink.label}</TextLink>}
          </div>
          <button type="button" className="mt-6 underline-offset-4 hover:underline" onClick={() => { setAnswers([]); setStep(0); }}>Start again</button>
        </div>
      ) : (
        <>
          <h3 id="quiz-question" className="heading-h4 mb-3">{current.question}</h3>
          <p className="mb-6 md:mb-8">{current.hint}</p>
          <div role="radiogroup" aria-labelledby="quiz-question" className="grid gap-3">
            {current.options.map((option, index) => (
              <button key={option.label} type="button" role="radio" aria-checked={selected === index}
                onClick={() => setAnswers((previous) => Object.assign([...previous], { [step]: index }))}
                className={`flex w-full items-center gap-3 rounded-full border px-4 py-3 text-left font-semibold transition-colors ${selected === index ? "border-brand-primary bg-brand-light" : "border-black/20 bg-white hover:border-black"}`}>
                <span aria-hidden="true" className="flex size-8 flex-none items-center justify-center rounded-full border border-black/20 bg-white font-mono text-sm">{"ABCDE"[index]}</span>
                {option.label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 md:mt-8">
            <p className="font-mono text-sm uppercase tracking-wide">Question {step + 1} of {questions.length}</p>
            <div className="flex items-center gap-6">
              {step > 0 && <button type="button" className="underline-offset-4 hover:underline" onClick={() => setStep(step - 1)}>Back</button>}
              <button type="button" className="button-inverted disabled:pointer-events-none disabled:opacity-40" disabled={selected === undefined} onClick={() => setStep(step + 1)}>{step === questions.length - 1 ? "See result" : "Next"}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Comparison = ({ comparison }: { comparison: Comparison }) => {
  const platforms = [...comparison.platforms];
  const [first, second, third] = platforms.map((platform) => platformFacts[platform].name);
  const name = comparisonName(comparison);
  const title = comparisonTitle(comparison);
  const path = `/compare/${comparison.slug}`;
  const pageUrl = `${siteUrl}${path}`;

  const criteriaRows: Row[] = criteria
    .filter(({ id }) => platforms.every((platform) => platformFacts[platform].criteria[id]))
    .map(({ id, label }) => ({ label, Icon: criterionIcons[id], values: platforms.map((platform) => platformFacts[platform].criteria[id]!) }));
  const costTableRows: Row[] = costRows.map(({ id, label, note }) => ({ label, note, Icon: costIcons[id], values: platforms.map((platform) => platformFacts[platform].costs[id]), total: id === "total" }));
  const priced = platforms.flatMap((platform) => platformFacts[platform].pricing ?? []);
  // Each platform's client sites, shown with the testimonial already published for that client.
  const proof = platforms.flatMap((platform) => (platformFacts[platform].proof ?? []).flatMap((item): TestimonialClient[] => {
    const name = "caseStudy" in item ? caseStudies.find((study) => study.slug === item.caseStudy)?.testimonial?.name : item.name;
    const client = testimonialClients.find((candidate) => candidate.name === name);
    const link = "caseStudy" in item ? { label: "Read the case study", href: `/work/${item.caseStudy}` } : item.site;
    return client ? [{ ...client, label: <>Built in <PlatformName platform={platform} /></>, link }] : [];
  }));
  const proofNames = new Intl.ListFormat("en", { type: "conjunction" }).format(platforms.filter((platform) => platformFacts[platform].proof?.length).map((platform) => platformFacts[platform].name));
  const explore = [
    ...platforms.map((platform) => ({ ...platformFacts[platform].choice.link, platform: platform as PlatformId | undefined })),
    ...comparisons.filter(({ slug }) => slug !== comparison.slug).map((other) => ({ label: comparisonName(other), href: `/compare/${other.slug}`, platform: undefined })),
    { label: "All comparisons", href: "/compare", platform: undefined },
    { label: "Website cost calculator", href: "/tools/website-cost-calculator", platform: undefined },
    { label: "Pricing", href: "/pricing", platform: undefined },
  ].filter((link, index, links) => links.findIndex(({ href }) => href === link.href) === index);

  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: `${name}: Which to Choose`, description: comparison.description, about: { "@id": `${siteUrl}/#organization` } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: comparison.faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }, { name, path }], siteUrl),
  ];

  return (
    <div className="relative bg-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={comparison.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={comparison.description} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container max-w-lg text-center">
            <div className="mb-6 flex justify-center md:mb-8"><PlatformPair platforms={platforms} /></div>
            <p className={eyebrow}>Platform comparison</p>
            <h1 className="mb-5 md:mb-6">{name}: which one fits your site</h1>
            <p className="md:text-md">Short answer: {comparison.shortAnswer.charAt(0).toLowerCase()}{comparison.shortAnswer.slice(1)}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:mt-8">
              <a href="#comparison" className="button-inverted">See the comparison</a>
              <TextLink href="#quiz">Take the one-minute quiz</TextLink>
            </div>
          </div>
        </section>

        <section id="comparison" className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
              <p className={eyebrow}>Side by side</p>
              <h2 className="mb-5 md:mb-6">{name}</h2>
              <p className="md:text-md">What decides the choice, row by row, with {third} alongside for comparison.</p>
            </div>
            <ComparisonTable label={`${first}, ${second}, and ${third} compared`} platforms={platforms} rows={criteriaRows} />
            <p className="mt-6 text-sm text-black/60">Last updated {comparisonsUpdated}.</p>
          </div>
        </section>

        <section className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
          <div className="container">
            <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
              <p className={eyebrow}>At a glance</p>
              <h2 className="mb-5 md:mb-6">So, which one should you choose?</h2>
              <p className="md:text-md">It usually comes down to how much content the site holds, how much motion it needs, and who looks after it once it is live.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {platforms.map((platform) => {
                const Icon = platformIcons[platform];
                const { name: platformName, choice } = platformFacts[platform];
                return (
                  <article key={platform} data-surface="white" className={`${serviceCard} flex flex-col`}>
                    <Icon aria-hidden="true" className="mb-6 size-10 md:mb-8" />
                    <h3 className="heading-h5 mb-5 font-bold">Choose {platformName} if</h3>
                    <p className="mb-6 md:mb-8">{choice.body}</p>
                    <p className="mb-6 mt-auto rounded-xl bg-brand-light px-4 py-3 text-center font-mono text-sm uppercase tracking-wide">{choice.tag}</p>
                    <TextLink href={choice.link.href}>{choice.link.label}</TextLink>
                  </article>
                );
              })}
            </div>
            <div data-surface="white" className={`${serviceCard} mt-8 flex flex-wrap items-center justify-between gap-6`}>
              <div>
                <h3 className="heading-h5 mb-2 font-bold">Still unsure?</h3>
                <p>Tell me about your site and I’ll recommend a platform before you build.</p>
              </div>
              <a href="/start" className="button-inverted">Book a call</a>
            </div>
          </div>
        </section>

        <section className="bg-surface-muted px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
              <p className={eyebrow}>Year-one cost</p>
              <h2 className="mb-5 md:mb-6">What the first year costs on each</h2>
              <p className="md:text-md">My rate is the same on every platform I build on, so what you pay the platform or your host is the difference.</p>
            </div>
            <ComparisonTable label={`Year-one cost on ${first}, ${second}, and ${third}`} platforms={platforms} rows={costTableRows} />
            {priced.length > 0 && (
              <p className="mt-6 text-sm text-black/60">
                Platform prices as listed on {priced.map(({ label, href }, index) => (
                  <span key={href}>{index > 0 && " and "}<a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{label}</a></span>
                ))} in {comparisonsUpdated}, in USD. Check current prices before you buy.
              </p>
            )}
          </div>
        </section>

        <section id="quiz" className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
              <p className={eyebrow}>Quick quiz</p>
              <h2 className="mb-5 md:mb-6">Which one is right for your team?</h2>
              <p className="md:text-md">Six questions, about a minute, scored against the comparison above.</p>
            </div>
            <Quiz key={comparison.slug} platforms={platforms} />
          </div>
        </section>

        {proof.length > 0 && <TestimonialSlider clients={proof} eyebrow="Client work" heading={<>I build in {proofNames}</>} description="The advice above comes from client sites I designed and built, not from a feature list." className="bg-surface-muted" />}

        <AiLandingAbout heading="I design websites in Framer, Webflow & Next.js" description="I’m a certified Framer and Webflow expert, and you work with me directly from the first call to launch. Book a call, tell me about your site, and I’ll recommend the platform that fits." bookingHref="/start" />

        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          {/* Relume Grid List: a heading over a grid that goes from one to two to three columns. */}
          <div className="container">
            <div className="mb-8 max-w-lg md:mb-12">
              <p className={eyebrow}>Keep exploring</p>
              <h2>More on {first} and {second}</h2>
            </div>
            <ul className="grid auto-cols-fr grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
              {explore.map(({ label, href, platform }) => {
                const Icon = platform && platformIcons[platform];
                return (
                  <li key={href} className="flex items-center gap-3 border-t border-black/20 py-4">
                    {Icon && <Icon aria-hidden="true" className="size-4 flex-none" />}
                    <TextLink href={href}>{label}</TextLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="faq" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr_1fr] lg:gap-x-20">
            <div>
              <p className={eyebrow}>FAQs</p>
              <h2 className="mb-5 md:mb-6">Questions about {name}</h2>
              <p className="heading-h7 mb-2">Need help choosing?</p>
              <p className="md:text-md">Send me your current site, your goals, and what your team needs to manage after launch. I’ll recommend the right setup.</p>
              <ArekProfileBadge variant="author" title="Web Design Expert" portraitHref="/about" className="mt-6 md:mt-8" />
              <a href="/start" className="button-inverted mt-6 md:mt-8">Book a call</a>
            </div>
            <FaqAccordion blueSurface questions={comparison.faqs.map(({ question, answer, link }) => ({
              title: question,
              answer: link ? <p>{answer} See <a href={link.href}>{link.label}</a>.</p> : answer,
            }))} />
          </div>
        </section>
        <Cta17 heading="Not sure which one fits?" description="Book a 15-minute call. Tell me about your site and I’ll recommend a platform." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};

export const ComparePage = () => {
  const { slug } = useParams();
  const comparison = comparisons.find((entry) => entry.slug === slug);
  return comparison ? <Comparison comparison={comparison} /> : <NotFoundPage />;
};
