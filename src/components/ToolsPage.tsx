import { Helmet } from "react-helmet-async";
import type { IconType } from "react-icons";
import { LuBookOpen, LuBot, LuCalculator, LuDrama, LuFileText, LuGauge, LuMonitor, LuQuote, LuType } from "react-icons/lu";
import { SiAdobeillustrator, SiFigma } from "react-icons/si";
import { siteUrl } from "../content/siteFacts";
import { buildBreadcrumbSchema, buildCollectionSchema, serializeJsonLd } from "../content/structuredData";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { TextLink } from "./TextLink";

// The tools hub: the same centered header and white service cards as the comparison hub.
// Only tools that are live today are listed.
const pageUrl = `${siteUrl}/tools`;
const description = "Free branding tools: a brand grader, an archetype quiz, name and tagline generators, and branding and website cost calculators.";

// A tool with an `image` gets a cover: `tall` puts it under the text in a card two rows high,
// otherwise the card is two columns wide with the image beside the text (Relume Layout 392).
type Tool = { name: string; kind: string; description: string; link: string; href: string; Icon: IconType; image?: { src: string; alt: string }; tall?: boolean };

const tools: Tool[] = [
  {
    name: "Brand grader",
    kind: "Self-check",
    description: "Answer 11 questions and get a brand score out of 100, with what to fix first.",
    link: "Grade your brand",
    href: "/tools/brand-grader",
    Icon: LuGauge,
  },
  {
    name: "Brand archetype quiz",
    kind: "Quiz",
    description: "Seven questions to find which of the 12 brand archetypes fits your brand, with a second one to mix in.",
    link: "Find your archetype",
    href: "/tools/brand-archetype-quiz",
    Icon: LuDrama,
  },
  {
    name: "Brand voice template",
    kind: "Template",
    description: "A one-page PDF worksheet to set your tone on four scales: humour, formality, respect, and enthusiasm.",
    link: "Download the template",
    href: "/tools/brand-templates",
    Icon: LuFileText,
    image: { src: "/tools/templates/voice.webp", alt: "Brand voice framework worksheet printed on a sheet of paper" },
    tall: true,
  },
  {
    name: "Brand name generator",
    kind: "Generator",
    description: "Pick one of six name types, describe your business, and get nine name ideas with the reasoning behind each.",
    link: "Generate names",
    href: "/tools/brand-name-generator",
    Icon: LuType,
  },
  {
    name: "Tagline generator",
    kind: "Generator",
    description: "Pick one of five tagline types and get nine tagline ideas built from your offer, audience, and main benefit.",
    link: "Generate taglines",
    href: "/tools/tagline-generator",
    Icon: LuQuote,
  },
  {
    name: "BrandStrategist.ai",
    kind: "AI assistant",
    description: "An AI assistant for working through your brand strategy before you brief a designer.",
    link: "Open BrandStrategist.ai",
    href: "https://brandstrategist.ai/",
    Icon: LuBot,
    image: { src: "/tools/covers/brandstrategist.webp", alt: "BrandStrategist.ai home page: Get your brand strategy done in just minutes" },
  },
  {
    name: "Branding cost calculator",
    kind: "Calculator",
    description: "Pick what you need and see a fixed price and timeline, next to typical agency ranges.",
    link: "Estimate your project",
    href: "/tools/branding-cost-calculator",
    Icon: LuCalculator,
  },
  {
    name: "Website cost calculator",
    kind: "Calculator",
    description: "Pick your site size and platform and see the price, the timeline, and the first year on Framer, Webflow, or Next.js.",
    link: "Price your website",
    href: "/tools/website-cost-calculator",
    Icon: LuMonitor,
  },
  {
    name: "Guidelines.online",
    kind: "Style guides",
    description: "Build an online style guide for your brand, with your logo, colors, and typography in one link.",
    link: "Open Guidelines.online",
    href: "https://guidelines.online/",
    Icon: LuBookOpen,
    image: { src: "/tools/covers/guidelines-online.webp", alt: "Guidelines.online home page: Free brand guidelines generator" },
  },
];

// Plugins for designers, published on the Figma Community and Adobe Exchange.
const plugins: Tool[] = [
  {
    name: "Logo Packer",
    kind: "Figma plugin",
    description: "Export a full logo package from Figma: every lockup in every color scheme, ready to hand over.",
    link: "Open in Figma",
    href: "https://www.figma.com/community/plugin/1598455883785398805/logo-packer",
    Icon: SiFigma,
  },
  {
    name: "Brand Guidelines Generator",
    kind: "Figma plugin",
    description: "Turn a guide published on Guidelines.online into an editable Figma file.",
    link: "Open in Figma",
    href: "https://www.figma.com/community/plugin/1611793979102927622/brand-guidelines-generator",
    Icon: SiFigma,
  },
  {
    name: "Brand Guidelines Generator",
    kind: "Illustrator plugin",
    description: "Turn a guide published on Guidelines.online into editable brand guidelines in Adobe Illustrator.",
    link: "Open on Adobe Exchange",
    href: "https://exchange.adobe.com/apps/cc/205093/brand-guidelines-generator",
    Icon: SiAdobeillustrator,
  },
];

const cardSurface = "service-card relative overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:border after:border-brand-primary/30 after:content-['']";

const coverSurface = "overflow-hidden rounded-xl bg-black text-white";

const ToolCard = ({ name, kind, description: summary, link, href, Icon, image, tall }: Tool) => {
  const text = (
    <div className={`flex flex-col justify-center p-6 md:p-8 ${image && tall ? "" : "flex-1"}`}>
      {!image && <Icon aria-hidden="true" className="mb-5 size-8 md:mb-6" />}
      <p className="mb-2 font-mono text-sm uppercase tracking-wide text-brand-primary">{kind}</p>
      <h2 className="heading-h5 mb-3 font-bold md:mb-4">{name}</h2>
      <p>{summary}</p>
      <div className="mt-5 md:mt-6"><TextLink href={href} className={image ? "text-white" : ""} {...(/^https?:/.test(href) ? { target: "_blank", rel: "noreferrer" } : {})}>{link}</TextLink></div>
    </div>
  );
  if (!image) return <article data-surface="white" className={`${cardSurface} flex flex-col`}>{text}</article>;
  // Cards with a cover are inverted: black with white text, so they stand out from the icon cards.
  if (tall) return (
    <article className={`${coverSurface} flex flex-col md:row-span-2`}>
      {text}
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="min-h-0 w-full flex-1 object-cover" />
    </article>
  );
  return (
    <article className={`${coverSurface} grid auto-cols-fr grid-cols-1 sm:grid-cols-2 md:col-span-2`}>
      {text}
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="size-full object-cover" />
    </article>
  );
};

const schemas = [
  buildCollectionSchema(
    { path: "/tools", name: "Free branding tools", description },
    tools.filter(({ href }) => href.startsWith("/")).map(({ name, href }) => ({ name, path: href })),
    siteUrl,
  ),
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }], siteUrl),
];

export function ToolsPage() {
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>Free Branding Tools & Calculators | Ebaq Design</title>
        {/* A literal: scripts/generate-route-shells.mjs reads this page's title and description from the source. */}
        <meta name="description" content="Free branding tools: a brand grader, an archetype quiz, name and tagline generators, and branding and website cost calculators." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Free Branding Tools & Calculators | Ebaq Design" />
        <meta property="og:description" content={description} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        {/* Relume Layout 392: a narrow centered intro over a three-column grid that mixes cover-image cards with icon cards. */}
        <section className="bg-brand-light px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container">
            <header className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Free tools</p>
              <h1 className="heading-h2 mb-5 md:mb-6">Branding tools</h1>
              <p className="md:text-md">Tools I built to help you plan a brand project: how strong your brand is today, what a project costs, and how to share your style guide.</p>
            </header>
            <div className="grid auto-cols-fr gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {tools.map((tool) => <ToolCard key={tool.href} {...tool} />)}
            </div>
            <p className="mb-6 mt-12 font-mono text-sm uppercase tracking-wide md:mb-8 md:mt-18">For designers</p>
            <div className="grid auto-cols-fr gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {plugins.map((plugin) => <ToolCard key={plugin.href} {...plugin} />)}
            </div>
          </div>
        </section>
        <Cta17 heading="Ready to start your brand?" description="Book a 15-minute call. Tell me about your project and I’ll tell you what it takes." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
}
