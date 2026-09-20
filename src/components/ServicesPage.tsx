import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import {
  Navbar16,
  Logo3,
  Layout423,
  Timeline10,
  Testimonial32,
  Faq4,
  Cta17,
  Footer15,
} from "./index";

const pageUrl = "https://www.ebaqdesign.com/services";
const pageTitle = "Branding Services NYC | Logo, Identity & Web Design | Ebaqdesign";
const pageDescription =
  "Professional branding services in New York City. From brand strategy to logo design, identity systems, and Webflow websites. Book a free consultation with Arek.";

// The five-step process the Webflow services page described.
const processSteps = [
  {
    heading: "01",
    title: "Intro call",
    description:
      "A short call to cover the business, the goal, and the timing, so we can both tell whether the project is a fit before anyone commits.",
    buttons: [],
  },
  {
    heading: "02",
    title: "Discovery & strategy",
    description:
      "Audit where the brand stands today, study the competition, and agree on positioning and messaging. Design decisions get much easier once this is settled.",
    buttons: [],
  },
  {
    heading: "03",
    title: "Sketching & design",
    description:
      "Concepts start on paper before anything goes into Figma, then the strongest direction is developed into a logo and the identity system around it.",
    buttons: [],
  },
  {
    heading: "04",
    title: "Feedback & revisions",
    description:
      "You review the work in structured rounds. Feedback is consolidated so revisions stay focused and the direction keeps moving forward.",
    buttons: [],
  },
  {
    heading: "05",
    title: "Delivery & launch",
    description:
      "Final files, guidelines, and source assets are handed over, with support through launch so the brand ships consistently everywhere it appears.",
    buttons: [],
  },
];

const faqs = [
  {
    title: "What do branding services cost?",
    answer:
      "Pricing is scoped per project rather than sold as a fixed package, because a logo refresh and a full identity with a website are very different pieces of work. Book a call and you'll get a clear scope and quote for what you actually need.",
  },
  {
    title: "How long does a branding project take?",
    answer:
      "Most projects run a few weeks rather than a few months. The exact timeline depends on scope and on how quickly feedback comes back, and you'll have a schedule before the work starts.",
  },
  {
    title: "Do I have to take every service?",
    answer:
      "No. Plenty of projects are a logo and identity only, or a website only. Strategy, identity, web, and motion are offered together because they reinforce each other, not because they're a bundle you have to buy whole.",
  },
  {
    title: "Do you work with clients outside New York?",
    answer:
      "Yes. The studio is based in NYC and works with clients locally and globally. The whole process runs remotely, so where you're based makes no practical difference.",
  },
  {
    title: "Who actually does the work?",
    answer:
      "Arek does, directly. You work with one senior designer from the first call through delivery, with no account layer and no hand-off to a junior team.",
  },
];

export const ServicesPage = () => {
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousCanonical = canonical?.href;
    const previousDescription = description?.content;
    if (canonical) canonical.href = pageUrl;
    if (description) description.content = pageDescription;
    return () => {
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Branding Services NYC | Logo, Identity &amp; Web Design | Ebaqdesign</title>
        <meta name="description" content="Professional branding services in New York City. From brand strategy to logo design, identity systems, and Webflow websites. Book a free consultation with Arek." />
        <meta
          name="keywords"
          content="branding services, branding agency nyc, brand strategy, logo design services, identity design, web design nyc, webflow development"
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://www.ebaqdesign.com/case-study/fox-berman/01-logos.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Ebaq Design",
            description: pageDescription,
            url: pageUrl,
            areaServed: "Worldwide",
            serviceType: [
              "Brand Strategy",
              "Logo Design",
              "Identity Systems",
              "Web Design",
              "Web Development",
              "Motion Graphics",
            ],
            founder: { "@type": "Person", name: "Arek Dvornechuck" },
            address: {
              "@type": "PostalAddress",
              addressLocality: "New York",
              addressRegion: "NY",
              addressCountry: "US",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <Navbar16 />

      <main>
        <header className="px-[5%] pb-12 pt-16 text-center md:pb-16 md:pt-24 lg:pb-20 lg:pt-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 font-semibold text-brand-primary md:mb-4">Services</p>
            <h1>Branding Services</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Based in the heart of NYC, I craft distinctive brand identities for businesses near and
              far &mdash; from strategy and logo design through identity systems, websites, and motion.
            </p>
          </div>
        </header>

        <Logo3 />
        <Layout423 />
        <Timeline10
          tagline="How it works"
          heading="An overview of my branding process"
          description="Every project follows the same five steps, so you always know what happens next and what's expected of you at each stage."
          timelineItems={processSteps}
        />
        <Testimonial32 />
        <Faq4
          tagline="FAQs"
          heading="Questions about working together"
          description="What most founders ask before starting a branding project."
          questions={faqs.map((faq) => ({ title: faq.title, answer: <p>{faq.answer}</p> }))}
        />
      </main>

      <Cta17 />
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
