import { Helmet } from "react-helmet-async";
import { BiCheck, BiSolidStar } from "react-icons/bi";
import {
  Navbar16,
  Header78,
  Layout527,
  AboutSection,
  BookerSection,
} from "./index";

// Fox Berman CDN images
const CDN = "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545";

const FB = {
  logos: `${CDN}/68e2d4ccccf2d263b1514f7c_fox-berman-logos.png`,
  cards: `${CDN}/68e2d4e1b725b2d2890a6b37_FoxBerman_cards2.jpg`,
  web: `${CDN}/68eebc3595149260b83ed0a0_FoxBerman_web2.jpg`,
  sign2: `${CDN}/68e2d55b3e2a76afeac86840_FoxBerman_sign2.jpg`,
  sign3: `${CDN}/68e2d50cbc2f8e7f7df16e85_FoxBerman_sign3.jpg`,
  linkedin: `${CDN}/68e2d575462ce99fd24fd489_FoxBerman-LinkedIn.jpg`,
  folder: `${CDN}/68e2d5867879ae62a61ef780_FoxBerman-folder.jpg`,
  letterhead: `${CDN}/68e2db0fa8f710b7f0c9354f_FoxBerman_letterhead.jpg`,
  letterhead2: `${CDN}/68e2da0ec795495cbadf443c_FoxBerman_letterhead2.jpg`,
  booklet: `${CDN}/69a09f4f7c15d5cffec68e2d_FoxBerman_booklet%20(1)-p-2000.webp`,
  favicon: `${CDN}/68e2d89c8972c00821c8aa8e_FoxBerman-favicon.jpg`,
  pin: `${CDN}/68e2d5f8e9fde343d71d4444_FoxBErman_pin.jpg`,
  office: `${CDN}/68eacc5fde17cec38b404a98_FoxBerman-office-exterior.jpg`,
};

// Header rows — Fox Berman case study
const foxRow1 = [
  { type: "lottie" as const, src: "/portfolio/logos/foxberman-logo.json", bgColor: "#f3603c" },
  { type: "image" as const, src: FB.cards, alt: "Fox Berman business cards" },
  { type: "image" as const, src: FB.favicon, alt: "Fox Berman favicon" },
  { type: "image" as const, src: FB.pin, alt: "Fox Berman pin" },
  { type: "image" as const, src: FB.linkedin, alt: "Fox Berman LinkedIn banner" },
];

const foxRow2 = [
  { type: "image" as const, src: FB.letterhead, alt: "Fox Berman letterhead" },
  { type: "image" as const, src: FB.letterhead2, alt: "Fox Berman letterhead 2" },
  { type: "image" as const, src: FB.folder, alt: "Fox Berman folder" },
  { type: "image" as const, src: FB.booklet, alt: "Fox Berman booklet" },
];

const foxRow3 = [
  { type: "video" as const, src: "/portfolio/websites/fox-berman-web.mp4", alt: "Fox Berman website" },
  { type: "image" as const, src: FB.office, alt: "Fox Berman office exterior" },
  { type: "image" as const, src: FB.sign2, alt: "Fox Berman wall sign" },
  { type: "image" as const, src: FB.sign3, alt: "Fox Berman pylon sign" },
];

const foxHoverLinks = [
  { url: "#", heading: "Logo", image: { src: FB.logos, alt: "Fox Berman logo" } },
  { url: "#", heading: "Colors", image: { src: "/portfolio/identities/foxberman-colors2.jpg", alt: "Fox Berman brand colors" } },
  { url: "#", heading: "Type", image: { src: "/portfolio/identities/foxberman-fonts.png", alt: "Fox Berman typography" } },
  { url: "#", heading: "Business Cards", image: { src: FB.cards, alt: "Fox Berman business cards" } },
  { url: "#", heading: "Collateral", image: { src: FB.folder, alt: "Fox Berman collateral" } },
  { url: "#", heading: "Social", image: { src: FB.linkedin, alt: "Fox Berman social media" } },
  { url: "https://foxberman.com/", heading: "Web Design", image: { src: FB.web, alt: "Fox Berman website design" } },
  { url: "#", heading: "Signature", image: { src: "/portfolio/identities/foxberman-signature.png", alt: "Fox Berman email signature" } },
  { url: "#", heading: "+ More", image: { src: FB.office, alt: "Fox Berman office signage" } },
];

// Pain points — law firm specific
const painPoints = [
  {
    title: "First impressions close cases.",
    body: "Clients decide in seconds. A professional brand signals competence before you say a word\u2014and lets you charge what you\u2019re worth.",
  },
  {
    title: "Your website is your intake form.",
    body: "It needs to load fast, work on every device, and make it dead simple to book a consultation. Slow or broken = lost retainer.",
  },
  {
    title: "Stand out in a saturated market.",
    body: "Most law firms look identical. A distinctive identity\u2014custom logo, bold typography, clear color system\u2014makes you the obvious choice.",
  },
  {
    title: "One week. Done.",
    body: "No 6-month agency engagements. No junior designers. You work directly with Arek\u2014nearly 20 years of experience, delivered in a focused sprint.",
  },
];

const PainPointsSection = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
    <div className="container max-w-6xl">
      <p
        className="mb-3 font-semibold md:mb-4"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        Why it matters
      </p>
      <h2
        className="mb-12 text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] max-w-3xl"
        style={{
          fontFamily: "'Roboto Flex', sans-serif",
          fontVariationSettings: "'wght' 300",
          lineHeight: 1.05,
        }}
      >
        Your brand is your strongest argument.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {painPoints.map((point, i) => (
          <div key={i} className="border-t border-black/10 pt-6">
            <h3
              className="text-xl md:text-2xl mb-3 tracking-[-0.02em]"
              style={{ fontFamily: "'Roboto Flex', sans-serif" }}
            >
              {point.title}
            </h3>
            <p className="text-black/50 text-base md:text-lg leading-relaxed">
              {point.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Deliverables — law firm specific
const deliverables = [
  "Custom logo (SVG, PNG, dark/light variants)",
  "Brand guidelines \u2014 colors, typography, usage rules",
  "Business cards + letterhead",
  "Email signature",
  "Figma web design \u2014 desktop, tablet, mobile",
  "Framer or Webflow build \u2014 live and fast",
  "Website copywriting (homepage + services)",
  "Booking / intake integration",
  "1 revision round included",
  "All source files delivered",
];

const DeliverablesSection = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="container max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <p
            className="mb-3 font-semibold md:mb-4"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            What you get
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] mb-6"
            style={{
              fontFamily: "'Roboto Flex', sans-serif",
              fontVariationSettings: "'wght' 300",
              lineHeight: 1.05,
            }}
          >
            Everything a law firm needs to look the part.
          </h2>
          <p className="text-black/50 text-base md:text-lg leading-relaxed">
            One price. One designer. Logo through live website &mdash; complete in two focused weeks.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {deliverables.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <BiCheck className="size-5 flex-shrink-0 mt-0.5" />
              <span className="text-base md:text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Testimonial — L. Berman
const LawFirmTestimonial = () => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="mx-auto max-w-lg text-center">
      <div className="flex justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <BiSolidStar key={i} className="size-5 text-yellow-400" />
        ))}
      </div>
      <blockquote
        className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.04em] leading-tight mb-10"
        style={{
          fontFamily: "'Roboto Flex', sans-serif",
          fontVariationSettings: "'wght' 300",
        }}
      >
        &ldquo;Excellent work! Fast, reliable and look and feel matched beyond our expectations.&rdquo;
      </blockquote>
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/lucasbermanattorney/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/testimonials/lucas.jpeg"
            alt="L. Berman"
            className="size-11 rounded-full object-cover flex-shrink-0 hover:opacity-80 transition-opacity"
          />
        </a>
        <div className="text-left">
          <p className="font-semibold text-sm leading-tight">L. Berman (LL.M)</p>
          <p className="text-sm text-black/50">Partner, Fox Berman</p>
        </div>
        <div className="h-8 w-px bg-black/20 mx-1" />
        <div className="flex flex-col items-center gap-1">
          <a
            href="https://foxberman.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="https://framerusercontent.com/images/p2L0pocENjLjCA6lN08CcTL45g.svg?height=120"
              alt="Fox Berman"
              className="h-5 w-auto"
            />
          </a>
          <a
            href="https://foxberman.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-black/40 hover:text-black transition-colors whitespace-nowrap"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            View live website &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>
);

// Main page component
export const LawFirmLanding = () => (
  <div className="relative">
    <Helmet>
      <title>Law Firm Branding &amp; Web Design | Ebaq Design</title>
      <meta
        name="description"
        content="Professional branding and website design for law firms. Custom logo, brand identity, and fast-loading website — designed to attract high-value clients and help your firm charge more. Senior designer based in NYC."
      />
      <meta
        name="keywords"
        content="law firm branding, law firm website design, branding for lawyers, legal branding agency, logo design for law firms, brand identity attorney, law firm web design, lawyer branding, legal website design"
      />
      <link rel="canonical" href="https://ebaq.design/law-firm-branding" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ebaq.design/law-firm-branding" />
      <meta property="og:title" content="Law Firm Branding & Web Design | Ebaq Design" />
      <meta
        property="og:description"
        content="Professional branding and website design for law firms. Custom logo, brand identity, and fast-loading website built to attract high-value clients."
      />
      <meta
        property="og:image"
        content="https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/68e2d4ccccf2d263b1514f7c_fox-berman-logos.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Law Firm Branding & Web Design | Ebaq Design" />
      <meta
        name="twitter:description"
        content="Professional branding and website design for law firms. Custom logo, brand identity, and website built to attract high-value clients."
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Ebaq Design",
          description: "Professional branding and website design for law firms",
          url: "https://ebaq.design/law-firm-branding",
          areaServed: { "@type": "City", name: "New York City" },
          serviceType: ["Law Firm Branding", "Logo Design", "Website Design"],
          founder: { "@type": "Person", name: "Arek Dvornechuck" },
          review: {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: "5" },
            author: { "@type": "Person", name: "L. Berman, LL.M" },
            reviewBody:
              "Excellent work! Fast, reliable and look and feel matched beyond our expectations.",
          },
        })}
      </script>
    </Helmet>

    <div className="relative z-10 bg-white">
      <Navbar16 />
      <Header78
        heading={`Branding and Websites\nfor Law Firms`}
        tagline="Law Firm Branding"
        description={`Get a professional brand and website that commands trust,\nattracts high-value clients, and helps your firm charge what it's worth.`}
        subLink={{ label: "see our work", url: "#fox-berman" }}
        showScrollArrow
        row1={foxRow1}
        row2={foxRow2}
        row3={foxRow3}
        showRows={[1, 2, 3]}
      />
      <PainPointsSection />
      <DeliverablesSection />
      <div id="fox-berman">
        <Layout527 hoverLinks={foxHoverLinks} />
      </div>
      <LawFirmTestimonial />
      <AboutSection heading="I'm Arek, a senior designer based in NYC, helping law firms look professional." />
    </div>

    <BookerSection />
  </div>
);
