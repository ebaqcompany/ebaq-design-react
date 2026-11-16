import { Helmet } from "react-helmet-async";
import { Navbar16 } from "./Navbar16";
import { Layout425 } from "./Layout425";
import { Portfolio20 } from "./Portfolio20";
import { workProjects } from "../data/workProjects";
import { BrandSprintIncluded } from "./BrandSprintIncluded";
import { ServiceProcess } from "./ServiceProcess";
import { Comparison } from "./Comparison";
import { ServiceTestimonialOptions } from "./ServiceTestimonialOptions";
import { Faq4 } from "./Faq4";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { brandSprint, pricing, pricingFaqs, siteUrl, studio, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";

// The flagship offer on its own page. Every price, guarantee and deliverable comes from siteFacts,
// and the week's stages repeat the wording already used on the homepage and service pages.
const pageUrl = `${siteUrl}/brand-sprint`;
const title = "Brand Sprint: Brand Identity in One Week, $3,000 | Ebaq Design";
const description = "The Brand Sprint is a complete brand identity or rebrand delivered in one week, guaranteed, for a flat $3,000. See what you get and how the week runs.";

// Every project on the /work roster, by client name and industry.
const portfolioLinks = workProjects.map(({ url, title, industry, image, images }) => ({ url, heading: title, tag: industry, image, images }));

const weekSteps = [
  { heading: "01", title: "Book a call", description: "We discuss your business, what you need, and your timing. We confirm the deliverables, start date, feedback schedule, and total before you book." },
  { heading: "02", title: "Kick off and explore", description: "Early in the week we lock the scope on the kickoff call. Then I explore several logo concepts for your brand." },
  { heading: "03", title: "Review and refine", description: "Mid-week you review the work and choose a direction. We refine it together with your colors and typography." },
  { heading: "04", title: "Get your brand", description: "By the end of the week you receive your final logo files, logo animation, guidelines, and launch assets, ready to use." },
  { heading: "05", title: "Add weeks if you need more", description: "Motion graphics or a pitch deck usually take one more week. Website design in Figma is another, and development in Framer, Webflow, or Next.js takes one or two more, all at the same flat rate." },
];

const sprintQuestions = new Set([
  "Is the $3,000 per week or per project?",
  "Is the one-week timeline guaranteed?",
  "What do I get in the one-week Brand Sprint?",
  "What if I don't like the first concepts?",
  "Are revisions included?",
  "What if I need more than branding?",
  "When do I pay?",
  "What happens on the introductory call?",
]);
const faqs: FactFaq[] = pricingFaqs.filter(({ question }) => sprintQuestions.has(question));

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: brandSprint.name,
    serviceType: "Brand identity design",
    description: `${brandSprint.description} Includes: ${brandSprint.deliverables.join(", ")}.`,
    url: pageUrl,
    provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#organization`, name: studio.name },
    areaServed: [{ "@type": "City", name: "New York City" }, { "@type": "Place", name: "Worldwide" }],
    offers: { "@type": "Offer", price: String(pricing.weeklyRate), priceCurrency: pricing.currency, description: pricing.guarantee },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Brand Sprint", path: "/brand-sprint" }], siteUrl),
];

export const BrandSprintPage = () => (
  <div className="relative bg-white">
    <Helmet>
      <title>Brand Sprint: Brand Identity in One Week, $3,000 | Ebaq Design</title>
      <meta name="description" content="The Brand Sprint is a complete brand identity or rebrand delivered in one week, guaranteed, for a flat $3,000. See what you get and how the week runs." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {schemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
      ))}
    </Helmet>
    <Navbar16 />
    <main>
      <Layout425 id="brand-sprint-hero" reverse tagline="Brand Sprint" headingLevel="h1" button={{ title: "Book a call", href: "/start" }} />
      <Portfolio20 tagline="Selected work" hoverLinks={portfolioLinks} />
      <BrandSprintIncluded />
      <ServiceProcess customSteps={weekSteps} />
      <Comparison
        heading={"One week with a senior designer,\nnot months with an agency"}
        rows={[
          { left: "$3,000 flat", right: "$25k–$100k+ per project" },
          { left: "Brand identity in 1 week, guaranteed", right: "3–9 months or more" },
          { left: "Total agreed before work starts", right: "Estimates that grow" },
          { left: "Revisions within agreed scope", right: "Change orders" },
          { left: "One senior designer, start to finish", right: "Account managers and juniors" },
        ]}
      />
      <ServiceTestimonialOptions autoPlay />
      <Faq4 tagline="FAQs" heading="Brand Sprint questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
      <Cta17 heading="Ready to plan your week?" description="Book a 15-minute call. You'll leave with a scope, a start date, and a fixed total." />
    </main>
    <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
  </div>
);
