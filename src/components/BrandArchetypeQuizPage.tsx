import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";
import { bookingUrl, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// A free tool at /tools/brand-archetype-quiz, rebuilt from the quiz on the old Webflow site.
// The seven questions and their answers are the originals; each answer counts toward one of the
// twelve archetypes, in the order of the `archetypes` list. The result is shown on the page, so
// nothing is sent anywhere. The quiz card is the comparison pages' quiz (Relume Multi-step Form 1).
const pageUrl = `${siteUrl}/tools/brand-archetype-quiz`;
const pageTitle = "Brand Archetype Quiz: Find Your Archetype | Ebaq Design";
const pageDescription = "Answer seven questions about your customers and your brand to find which of the 12 brand archetypes fits best, with a second archetype to mix in.";

const archetypes = [
  { name: "Innocent", slug: "innocent-archetype", summary: "Simple, honest, and optimistic. It promises safety and a happier, easier life." },
  { name: "Sage", slug: "sage-archetype", summary: "Wise and trusted. It helps people understand the world through knowledge." },
  { name: "Explorer", slug: "explorer-archetype", summary: "Independent and restless. It invites people to discover new places and themselves." },
  { name: "Outlaw", slug: "outlaw-archetype", summary: "Rebellious and bold. It breaks the rules that are not working." },
  { name: "Magician", slug: "magician-archetype", summary: "Visionary and transformative. It turns dreams into something real." },
  { name: "Hero", slug: "hero-archetype", summary: "Brave and determined. It pushes people to prove what they can do." },
  { name: "Lover", slug: "lover-archetype", summary: "Passionate and intimate. It makes people feel wanted and appreciated." },
  { name: "Jester", slug: "jester-archetype", summary: "Playful and funny. It reminds people to enjoy the moment." },
  { name: "Everyman", slug: "everyman-archetype", summary: "Friendly and down to earth. It makes everyone feel they belong." },
  { name: "Caregiver", slug: "caregiver-archetype", summary: "Warm and protective. It looks after people and puts them first." },
  { name: "Ruler", slug: "ruler-archetype", summary: "Confident and in control. It stands for order, status, and success." },
  { name: "Creator", slug: "creator-archetype", summary: "Imaginative and expressive. It builds things of lasting value." },
] as const;

// Every question lists its twelve answers in the order of `archetypes`. `max` is how many can be picked.
// `images` names the picture set in /public/tools/archetype-quiz, one file per archetype.
const questions: { question: string; hint: string; min: number; max: number; images?: "film" | "color" | "brand"; options: string[] }[] = [
  { question: "What do your customers desire the most?", hint: "Pick one.", min: 1, max: 1, options: ["To experience paradise", "To discover the truth", "To find out who they are", "To get revenge or revolution", "To make their dreams come true", "To prove their worth through bold actions", "To experience intimacy and pleasure", "To live in the moment", "To connect with others", "To protect others from harm", "To become successful in life", "To create something of value"] },
  { question: "If your brand were a fictional character, who would it be?", hint: "Pick one.", min: 1, max: 1, images: "film", options: ["Forrest Gump", "Yoda", "Indiana Jones", "Zorro", "Gandalf", "Maximus in Gladiator", "Sugar in Some Like It Hot", "Ace Ventura", "Chris in The Pursuit of Happyness", "Patch Adams", "Don Corleone", "Willy Wonka"] },
  { question: "Which word best describes your brand?", hint: "Pick one to three words.", min: 1, max: 3, options: ["Safety", "Knowledge", "Freedom", "Liberation", "Power", "Mastery", "Intimacy", "Enjoyment", "Belonging", "Service", "Control", "Innovation"] },
  { question: "Which color resonates with your brand the most?", hint: "Pick one.", min: 1, max: 1, images: "color", options: ["Soft pastel pink", "Emerald green", "Earthy brown", "Dark charcoal gray", "Mystical purple", "Fluorescent green", "Romantic red", "Bubbly tangerine", "Neutral gray", "Gentle sky blue", "Regal deep blue", "Inspiring yellow"] },
  { question: "Which quote represents your brand’s philosophy?", hint: "Pick one.", min: 1, max: 1, options: ["Free to be you and me.", "The truth will set you free.", "You only get one life. Make it count.", "Rules are meant to be broken.", "Anything can happen!", "Where there’s a will, there’s a way.", "Love is all you need.", "Laughter is the best medicine.", "All people are created equal.", "Love your neighbor as yourself.", "Power isn’t everything. It’s the only thing.", "If it can be imagined, it can be created."] },
  { question: "Which of these brands is your North Star?", hint: "Pick one, or skip this question.", min: 0, max: 1, images: "brand", options: ["Dove", "Google", "The North Face", "Harley-Davidson", "Disney", "Nike", "Chanel", "M&M’s", "Target", "WWF", "Rolex", "Apple"] },
  { question: "What emotion do you want your customers to feel?", hint: "Pick one to three emotions.", min: 1, max: 3, options: ["Comforted and at ease", "Enlightened and educated", "Adventurous and independent", "Liberated and rebellious", "Astonished and transformed", "Empowered and courageous", "Passionate and appreciated", "Joyful and amused", "Accepted and related to", "Protected and cared for", "In control and secure", "Inspired and creative"] },
];

// The answers are shown in a different order on each question, so an archetype is not always in the same place.
const displayOrder = (step: number) => archetypes.map((_, index) => (index + step * 5) % archetypes.length);

const faqs: FactFaq[] = [
  { question: "What is a brand archetype?", answer: "An archetype is a character type people recognize at once, such as the Hero or the Caregiver. Brands use the 12 archetypes to decide on a personality, so the tone of voice and the design feel like one person." },
  { question: "How does the quiz work?", answer: "There are seven questions. Every answer counts toward one of the 12 archetypes. The archetype with the most points is your primary one, and the next is your secondary." },
  { question: "Can a brand have two archetypes?", answer: "Yes. Most brands lean on a primary archetype and mix in a secondary one for nuance. The quiz shows both." },
  { question: "What do I do with the result?", answer: "Use it as a starting point for your brand personality, tone of voice, and visual identity. Read the guide to your archetype, then check that your messaging and design match it." },
  { question: "Do you save my answers?", answer: "No. The result is worked out in your browser and nothing is sent or stored. If you book a call from the result, your archetypes are added to the booking note." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#webapp`,
    url: pageUrl,
    name: "Brand Archetype Quiz",
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
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Brand Archetype Quiz", path: "/tools/brand-archetype-quiz" }], siteUrl),
];

const eyebrow = "mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4";

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);
  const done = step === questions.length;
  const current = questions[Math.min(step, questions.length - 1)];
  const picked = answers[step] ?? [];

  const toggle = (index: number) => setAnswers((previous) => {
    const own = previous[step] ?? [];
    const next = own.includes(index) ? own.filter((item) => item !== index) : current.max === 1 ? [index] : own.length < current.max ? [...own, index] : own;
    return Object.assign([...previous], { [step]: next });
  });

  // One point per answer; ties keep the order of the `archetypes` list.
  const totals = archetypes.map((_, index) => answers.reduce((sum, own) => sum + ((own ?? []).includes(index) ? 1 : 0), 0));
  const ranked = archetypes.map((archetype, index) => ({ ...archetype, points: totals[index] })).sort((a, b) => b.points - a.points);
  const [primary, secondary] = ranked;
  const bookingHref = `${bookingUrl}?notes=${encodeURIComponent(`Brand archetype quiz: ${primary.name}${secondary.points ? `, then ${secondary.name}` : ""}.`)}`;

  return (
    <div className="w-full rounded-xl border border-black/20 bg-white p-6 md:p-8">
      <div className="mb-6 grid grid-cols-7 gap-2 md:mb-8" aria-hidden="true">
        {questions.map((_, index) => <div key={index} className={`h-1 rounded-full ${index < step || done ? "bg-black" : index === step ? "bg-brand-primary" : "bg-black/20"}`} />)}
      </div>
      {done ? (
        <div aria-live="polite">
          <p className={eyebrow}>Your brand archetype</p>
          <h3 className="heading-h3 mb-3 md:mb-4">The {primary.name}</h3>
          <p className="md:text-md">{primary.summary}</p>
          <div className="mt-4"><TextLink href={`/blog/${primary.slug}`}>Read the {primary.name} guide</TextLink></div>
          {secondary.points > 0 && (
            <div className="mt-6 rounded-xl bg-brand-light p-4 md:mt-8 md:p-5">
              <h4 className="heading-h7 mb-2">Mix in: the {secondary.name}</h4>
              <p className="mb-2">{secondary.summary}</p>
              <TextLink href={`/blog/${secondary.slug}`}>Read the {secondary.name} guide</TextLink>
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-8">
            <a href={bookingHref} className="button-inverted">Book a call</a>
            <button type="button" className="underline-offset-4 hover:underline" onClick={() => { setAnswers([]); setStep(0); }}>Start again</button>
          </div>
        </div>
      ) : (
        <>
          <h3 id="archetype-question" className="heading-h4 mb-3">{current.question}</h3>
          <p className="mb-6 md:mb-8">{current.hint}</p>
          {current.images ? (
            <div role="group" aria-labelledby="archetype-question" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {displayOrder(step).map((index) => (
                <label key={index} className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-black/20 bg-white has-[:checked]:border-brand-primary has-[:checked]:bg-brand-light has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-primary">
                  <input type="checkbox" className="sr-only" checked={picked.includes(index)} onChange={() => toggle(index)} />
                  <img src={`/tools/archetype-quiz/${current.images}-${archetypes[index].slug.replace("-archetype", "")}.webp`} alt="" loading="lazy" decoding="async" className={current.images === "brand" ? "aspect-video w-full bg-white object-contain p-3" : "aspect-video w-full object-cover"} />
                  <span className="px-3 py-2 text-sm font-semibold">{current.options[index]}</span>
                </label>
              ))}
            </div>
          ) : (
            <div role="group" aria-labelledby="archetype-question" className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {displayOrder(step).map((index) => (
                <button key={index} type="button" aria-pressed={picked.includes(index)} onClick={() => toggle(index)}
                  className={`flex w-full items-center rounded-full border px-4 py-2 text-left text-sm font-semibold transition-colors ${picked.includes(index) ? "border-brand-primary bg-brand-light" : "border-black/20 bg-white hover:border-black"}`}>
                  {current.options[index]}
                </button>
              ))}
            </div>
          )}
          <div className="mt-6 flex items-center justify-between gap-4 md:mt-8">
            <p className="font-mono text-sm uppercase tracking-wide">Question {step + 1} of {questions.length}</p>
            <div className="flex items-center gap-6">
              {step > 0 && <button type="button" className="underline-offset-4 hover:underline" onClick={() => setStep(step - 1)}>Back</button>}
              <button type="button" className="button-inverted disabled:pointer-events-none disabled:opacity-40" disabled={picked.length < current.min} onClick={() => setStep(step + 1)}>{step === questions.length - 1 ? "See my archetype" : current.min === 0 && picked.length === 0 ? "Skip" : "Next"}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const BrandArchetypeQuizPage = () => (
  <div className="relative bg-white text-black">
    <Helmet>
      <title>Brand Archetype Quiz: Find Your Archetype | Ebaq Design</title>
      <meta name="description" content="Answer seven questions about your customers and your brand to find which of the 12 brand archetypes fits best, with a second archetype to mix in." />
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
      {/* Relume Header 1, with the tool column wider than the intro so twelve picture answers fit in three rows. */}
      <section id="quiz" className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
        <div className="container grid grid-cols-1 gap-y-12 lg:grid-cols-[0.6fr_1fr] lg:items-start lg:gap-x-16">
          <header>
            <p className={eyebrow}>Free tool</p>
            <h1 className="heading-h2 mb-5 md:mb-6">Brand archetype quiz</h1>
            <p className="max-w-md md:text-md">Answer seven questions to find which of the 12 archetypes fits your brand. Use the result for your brand personality, tone of voice, and identity. It takes about three minutes.</p>
            <div className="mt-6 md:mt-8"><TextLink href="/blog/brand-archetypes">What are brand archetypes?</TextLink></div>
          </header>
          <Quiz />
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <p className={eyebrow}>The framework</p>
            <h2 className="mb-5 md:mb-6">The 12 brand archetypes</h2>
            <p className="md:text-md">Each one is a character people already know. Your result is the one your answers point to most.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {archetypes.map(({ name, slug, summary }) => (
              <article key={slug} data-surface="white" className="service-card relative flex flex-col rounded-xl p-6 md:p-8 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-black/20 after:content-['']">
                <h3 className="heading-h5 mb-5 font-bold">{name}</h3>
                <p className="mb-6 md:mb-8">{summary}</p>
                <div className="mt-auto"><TextLink href={`/blog/${slug}`}>The {name}</TextLink></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Faq4 tagline="FAQs" heading="Brand archetype questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Want help using your archetype?" description="Book a 15-minute call. Tell me about your brand and I’ll tell you how I would bring that character to life." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
