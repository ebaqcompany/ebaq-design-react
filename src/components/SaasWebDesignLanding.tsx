import { Helmet } from "react-helmet-async";
import { BiCheck, BiSolidStar } from "react-icons/bi";
import {
  Navbar16,
  Header78,
  Layout527,
  AboutSection,
  BookerSection,
} from "./index";

const pageUrl = "https://www.ebaqdesign.com/saas-web-design";

// Header rows — Elevate (SaaS) and Ventur (AI app) case studies
const row1 = [
  { type: "lottie" as const, src: "/case-study/elevate/hero-logo.json", bgColor: "#000000" },
  { type: "image" as const, src: "/case-study/elevate/03-website.jpg", alt: "Elevate SaaS website design" },
  { type: "image" as const, src: "/case-study/elevate/02-icon-set.png", alt: "Elevate product icon system" },
  { type: "image" as const, src: "/case-study/elevate/01-logos.png", alt: "Elevate logo system" },
];

const row2 = [
  { type: "image" as const, src: "/case-study/ventur/06-website.jpg", alt: "Ventur AI travel app website" },
  { type: "image" as const, src: "/case-study/ventur/04-app.jpg", alt: "Ventur mobile app" },
  { type: "lottie" as const, src: "/case-study/ventur/hero-logo.json", bgColor: "#9047ff" },
  { type: "image" as const, src: "/case-study/ventur/07-mobile.jpg", alt: "Ventur mobile brand experience" },
];

const row3 = [
  { type: "video" as const, src: "/case-study/ventur/02-social.mp4", alt: "Ventur social launch assets" },
  { type: "image" as const, src: "/case-study/elevate/05-business-cards.jpg", alt: "Elevate business cards" },
  { type: "video" as const, src: "/case-study/elevate/04-merchandise.mp4", alt: "Elevate merchandise" },
  { type: "image" as const, src: "/case-study/ventur/03-billboard.jpg", alt: "Ventur billboard campaign" },
];

const workLinks = [
  { url: "/work/elevate", heading: "Elevate — SaaS", image: { src: "/case-study/elevate/03-website.jpg", alt: "Elevate website" } },
  { url: "https://elevateab.com/", heading: "Elevate live site", image: { src: "/portfolio/websites/elevate-web.jpg", alt: "Elevate live website" } },
  { url: "/work/ventur", heading: "Ventur — AI app", image: { src: "/case-study/ventur/06-website.jpg", alt: "Ventur website" } },
  { url: "https://www.venturtravel.com/", heading: "Ventur live site", image: { src: "/portfolio/websites/ventur-web.jpg", alt: "Ventur live website" } },
  { url: "/work", heading: "+ All work", image: { src: "/portfolio/identities/elevate-bento.jpg", alt: "Selected work" } },
];

const painPoints = [
  {
    title: "Your site is your best salesperson",
    body: "Before a demo, buyers read your homepage. It needs to explain the product in seconds and make the next step obvious.",
  },
  {
    title: "Look as funded as you are",
    body: "Investors, early hires, and enterprise buyers judge credibility fast. A sharp brand and site close that gap before you say a word.",
  },
  {
    title: "Ship fast, keep shipping",
    body: "Built in Framer, Webflow, or React so your team can update pages, launch features, and test messaging without waiting on a developer.",
  },
  {
    title: "Senior designer, no hand-offs",
    body: "You work directly with Arek, with nearly 20 years of experience, from positioning and copy through the live build.",
  },
];

const deliverables = [
  "Positioning and homepage messaging",
  "Website copywriting (homepage, product, pricing)",
  "Figma design for desktop, tablet, and mobile",
  "Framer, Webflow, or React build, fast and live",
  "Product screenshots and UI mockups styled for marketing",
  "Launch landing pages and waitlist or demo flows",
  "SEO basics: metadata, schema, sitemap",
  "Analytics and booking or signup integration",
  "Logo and brand system refresh (optional)",
  "All source files delivered",
];

const faqs = [
  {
    question: "Which platform should my SaaS website use?",
    answer: "Framer suits most early-stage startups that want to move fast and edit pages themselves. Webflow fits content-heavy sites with a large CMS. React fits teams that want the marketing site inside their own codebase.",
  },
  {
    question: "Do you write the copy?",
    answer: "Yes. Clear positioning and homepage copy are usually what make a SaaS site convert, so messaging is part of the project, not an afterthought.",
  },
  {
    question: "Can you also design our logo and brand?",
    answer: "Yes. Elevate and Ventur both got a full identity and website together, so the brand and the site launch as one system.",
  },
  {
    question: "How do we get started?",
    answer: "Book a call below. We'll talk through your product, audience, and launch timeline, and you'll get a clear scope and quote.",
  },
];

const heading = { fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 600, lineHeight: 1.05 };
const label = { fontFamily: "'Roboto', sans-serif" };

const PainPointsSection = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
    <div className="container max-w-6xl">
      <p className="mb-3 font-semibold text-brand-primary md:mb-4" style={label}>Why it matters</p>
      <h2 className="mb-12 text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] max-w-3xl" style={heading}>
        A website that sells the product
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {painPoints.map((point) => (
          <div key={point.title} className="border-t border-black/10 pt-6">
            <h3 className="text-xl md:text-2xl mb-3 tracking-[-0.02em]" style={{ fontFamily: heading.fontFamily }}>{point.title}</h3>
            <p className="text-black/50 text-base md:text-lg leading-relaxed">{point.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DeliverablesSection = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="container max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <p className="mb-3 font-semibold text-brand-primary md:mb-4" style={label}>What you get</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] mb-6" style={heading}>
            Everything you need to launch
          </h2>
          <p className="text-black/50 text-base md:text-lg leading-relaxed">
            One designer from messaging to the live site, scoped to your stage and launch date.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {deliverables.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <BiCheck className="size-5 flex-shrink-0 mt-0.5" />
              <span className="text-base md:text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SaasTestimonial = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => <BiSolidStar key={i} className="size-5 text-yellow-400" />)}
      </div>
      <blockquote className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.04em] leading-tight mb-10" style={{ ...label, fontVariationSettings: "'wght' 300" }}>
        &ldquo;He was creative, came back with ideas that felt modern and genuinely good, and kept things moving fast without cutting corners on quality.&rdquo;
      </blockquote>
      <div className="flex items-center justify-center gap-4">
        <img src="/testimonials/karim-zitouni.jpg" alt="Karim Zitouni" className="size-11 rounded-full object-cover flex-shrink-0" />
        <div className="text-left">
          <p className="font-semibold text-sm leading-tight">Karim Zitouni</p>
          <p className="text-sm text-black/50">Co-Founder, Elevate</p>
        </div>
        <div className="h-8 w-px bg-black/20 mx-1" />
        <a href="https://elevateab.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
          <img src="/client-logos/elevate-wordmark.svg" alt="Elevate" className="h-5 w-auto" />
        </a>
      </div>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
    <div className="container max-w-4xl">
      <p className="mb-3 font-semibold text-brand-primary md:mb-4" style={label}>FAQ</p>
      <h2 className="mb-12 text-5xl md:text-6xl tracking-[-0.04em]" style={heading}>SaaS website questions</h2>
      <div className="grid gap-8">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-t border-black/10 pt-6">
            <h3 className="text-xl md:text-2xl mb-3 tracking-[-0.02em]" style={{ fontFamily: heading.fontFamily }}>{faq.question}</h3>
            <p className="text-black/50 text-base md:text-lg leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SaasWebDesignLanding = () => (
  <div className="relative">
    <Helmet>
      <title>SaaS Website Design for Startups | Ebaq Design</title>
      <meta
        name="description"
        content="SaaS and startup website design by a senior designer. Positioning, copy, Figma design, and a fast Framer, Webflow, or React build that turns visitors into demos and signups."
      />
      <meta
        name="keywords"
        content="saas website design, saas web design agency, startup website design, ai startup website, framer agency, webflow agency, saas landing page design, b2b saas website"
      />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="SaaS Website Design for Startups | Ebaq Design" />
      <meta property="og:description" content="Positioning, copy, design, and a fast Framer, Webflow, or React build for SaaS and AI startups." />
      <meta property="og:image" content="https://www.ebaqdesign.com/case-study/elevate/03-website.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="SaaS Website Design for Startups | Ebaq Design" />
      <meta name="twitter:description" content="Positioning, copy, design, and a fast Framer, Webflow, or React build for SaaS and AI startups." />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Ebaq Design",
          description: "Website design and development for SaaS and AI startups",
          url: pageUrl,
          serviceType: ["SaaS Website Design", "Startup Website Design", "Framer Development", "Webflow Development"],
          founder: { "@type": "Person", name: "Arek Dvornechuck" },
          review: {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: "5" },
            author: { "@type": "Person", name: "Karim Zitouni" },
            reviewBody: "Arek did an outstanding job on our full brand redesign.",
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
        })}
      </script>
    </Helmet>

    <div className="relative z-10 bg-white">
      <Navbar16 />
      <Header78
        heading={`Websites for\nSaaS & AI Startups`}
        tagline="SaaS Website Design"
        description={`Clear messaging, sharp design, and a fast site your team can update,\nbuilt to turn visitors into demos and signups.`}
        subLink={{ label: "see our work", url: "#saas-work" }}
        showScrollArrow
        row1={row1}
        row2={row2}
        row3={row3}
        showRows={[1, 2, 3]}
      />
      <PainPointsSection />
      <DeliverablesSection />
      <div id="saas-work">
        <Layout527 hoverLinks={workLinks} />
      </div>
      <SaasTestimonial />
      <FaqSection />
      <AboutSection heading="I'm Arek, a senior designer based in NYC, helping startups launch websites that sell" />
    </div>

    <BookerSection />
  </div>
);
