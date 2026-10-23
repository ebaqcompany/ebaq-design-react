import type { ClientLogoScale } from "../clientLogo";

export type CaseStudyMedia = {
  src: string;
  alt: string;
  kind?: "image" | "video" | "lottie";
  backgroundColor?: string;
  span?: "full" | "half";
  fit?: "cover" | "contain";
  // Lottie heroes: a phone version with the logo filling more of the frame.
  mobileSrc?: string;
};

type CaseStudyImage = {
  src: string;
  alt?: string;
  scale?: ClientLogoScale;
};

export type CaseStudyGalleryImage = CaseStudyImage & {
  url?: string;
  kind?: "image" | "video" | "lottie";
  span?: "full" | "half";
  // Half-width tile that runs the height of the two tiles beside it (desktop only).
  rowSpan?: 2;
  overlaySrc?: string;
  aspectRatio?: string;
};

export type CaseStudyBrandSprintGallery = {
  logo: CaseStudyGalleryImage;
  typeface: CaseStudyGalleryImage;
  color: CaseStudyGalleryImage;
  website: CaseStudyGalleryImage;
};

export type CaseStudyContentBlock =
  | {
      type: "header";
      heading: string;
      description: string;
    }
  | {
      type: "gallery";
      images: CaseStudyGalleryImage[];
    };

export type CaseStudyTestimonial = {
  quote: string;
  logo: CaseStudyImage;
  avatar: CaseStudyImage;
  name: string;
  position: string;
  companyName: string;
};

export type CaseStudyNextProject = {
  title: string;
  subheading: string;
  image: CaseStudyImage;
  url: string;
  tags: string[];
};

export type CaseStudy = {
  published?: boolean;
  slug: string;
  client: string;
  title: string;
  summary: string;
  services: string[];
  industry: string;
  year: string;
  // What was actually designed, for structured data and llms-full.txt (the services tags stay broad).
  deliverables?: string[];
  website?: { label: string; href: string };
  guidelines?: { label: string; href: string };
  preview: CaseStudyImage;
  hero: CaseStudyMedia;
  leadGallery: CaseStudyGalleryImage[];
  brandSprintGallery?: CaseStudyBrandSprintGallery;
  content: CaseStudyContentBlock[];
  testimonial?: CaseStudyTestimonial;
  nextProject?: CaseStudyNextProject;
  // Search and AI-overview copy; falls back to "client — title" and the summary.
  seo?: { title?: string; description?: string; keywords?: string[] };
};

const allCaseStudies: CaseStudy[] = [
  {
    slug: "savory",
    client: "Savory",
    title: "An editorial identity for a Brooklyn real estate team",
    summary:
      "The Savory Team is a Brooklyn real estate team at Compass. After six months of design explorations that never felt right, they came to us for a fresh start. We created a premium identity built around a distinctive wordmark, with a wax seal, refined typography, and a warm color palette.",
    services: ["Visual identity", "Logo design", "Motion", "Brand guidelines"],
    industry: "Real estate",
    year: "2026",
    deliverables: ["Rebrand", "Logo design", "Logo lockups", "Logo animation", "Color palette", "Typography", "Business cards", "Wax seal stamp", "Brand guidelines", "Instagram templates", "LinkedIn banner", "HTML email signature", "Favicon", "Merchandise"],
    seo: {
      title: "Savory: Real Estate Branding Case Study | Ebaq Design",
      description:
        "Real estate rebrand case study for The Savory Team, a Brooklyn team at Compass: a new SAVORY wordmark with a split O, a wax-seal stamp, favicon and slogan lockups, logo animation, a Wax Red palette, and editorial typography.",
      keywords: [
        "real estate branding",
        "real estate logo design",
        "luxury real estate brand identity",
        "Brooklyn branding",
        "wordmark design",
        "logo animation",
        "NYC real estate marketing",
      ],
    },
    guidelines: { label: "Brand guidelines", href: "https://guidelines.online/savory" },
    preview: { src: "/case-study/savory/thumbnail.webp", alt: "SAVORY wordmark in cream on wax red, wax red on blue, charcoal on cream, and cream on charcoal" },
    hero: {
      src: "/case-study/savory/hero-logo.json",
      alt: "Animated SAVORY wordmark: wax red capitals roll up into place on baby blue and the O comes to rest on its split",
      kind: "lottie",
      backgroundColor: "#B3C3D6",
      mobileSrc: "/case-study/savory/hero-logo-mobile.json",
    },
    leadGallery: [
      { src: "/case-study/savory/01-colorways.webp", alt: "SAVORY wordmark in four colorways: cream on wax red, wax red on blue, charcoal on cream, and cream on charcoal" },
      { src: "/case-study/savory/06-business-card.webp", alt: "Baby blue business card for Scott Savory with wax red capitals and an embossed SAVORY seal, over a wax red card back" },
    ],
    content: [
      {
        type: "header",
        heading: "An editorial foundation",
        description:
          "Roxborough CF capitals give SAVORY its distinctive voice, paired with PP Editorial Old Italic. Wax Red anchors the palette, balanced by Off-white, Asphalt, Cream, and Sky Blue. Together, color and typography bring the same refined character to every touchpoint.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/case-study/savory/18-colors.webm",
            alt: "The Savory Team palette in five columns, Off-white, Wax Red, Asphalt, Cream, and Sky Blue, each widening in turn to show its HEX, RGB, CMYK, HSL, and Pantone values",
            kind: "video",
          },
          {
            src: "/case-study/savory/17-type-specimen.webm",
            alt: "Roxborough CF specimen on wax red: Roxborough CF and AaBbCc slide in letter by letter, with its style, weight, use, and a note on the typeface",
            kind: "video",
          },
        ],
      },
      {
        type: "header",
        heading: "One letter out of place",
        description:
          "The split O gives a classic wordmark an unexpected rhythm. In motion, the letters roll into place before the O settles on its split. On its own, it suggests a figure with raised arms: the moment a client finds their place. The wordmark and circular seal carry that idea across digital details and physical objects.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/case-study/savory/11-find-your-place.webm",
            alt: "SAVORY in wax red on baby blue beside the line Find your place, as a chain of Os scrolls through the split O and Brooklyn interiors drift past",
            kind: "video",
          },
          { src: "/case-study/savory/21-wall.jpg", alt: "Circular SAVORY emblem embossed into a textured wall in warm sunlight" },
          { src: "/case-study/savory/13-tile-favicon.webp", alt: "Browser tab for The Savory Team with the split O favicon in cream on wax red", span: "half" },
          {
            src: "/case-study/savory/15-tile-signature.webp",
            alt: "Scott Savory's email signature in a mail window, with a portrait, the SAVORY wordmark in wax red, New York coordinates, and contact details",
            span: "half",
            rowSpan: 2,
          },
          { src: "/case-study/savory/14-tile-instagram.webp", alt: "Instagram profile for thesavoryteam with the split O avatar in cream on wax red and New York coordinates in the bio", span: "half" },
          { src: "/case-study/savory/23-pen.webp", alt: "Wax red pen with a warm off-white SAVORY wordmark and metallic shading on a cream background" },
        ],
      },
      {
        type: "header",
        heading: "A place in the everyday",
        description:
          "From a rooftop billboard to social posts, the identity pairs editorial typography with warm color and a clear message. New York coordinates connect the applications to the team’s home, while the wordmark and seal bring the system to cups, totes, and a wax stamp.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/savory/09-linkedin.png", alt: "LinkedIn profile banner with THE SAVORY TEAM in cream on wax red and the line Expert agents invested in you in italic" },
          {
            src: "/case-study/savory/19-social-carousel.webm",
            alt: "Four Instagram posts in wax red, sky blue, off-white, and asphalt sliding right in a row, each growing into focus in the centre: the split O over a screening room, Expert agents invested in you, A thoughtful approach to New York real estate, and New developments in Brooklyn",
            kind: "video",
          },
          { src: "/case-study/savory/22-billboard-building.webp", alt: "SAVORY rooftop billboard featuring 487 Henry St. and the line A place to call yours above a white building" },
          { src: "/case-study/savory/02-cup.webp", alt: "Baby blue coffee cup with a wax red lid and SAVORY stacked in wax red capitals", span: "half" },
          { src: "/case-study/savory/03-tote.webp", alt: "Wax red tote bag with SAVORY stacked in light capitals and New York coordinates", span: "half" },
          { src: "/case-study/savory/25-website-design.jpg", alt: "The Savory Team website design with Expert Agents, Invested in You in wax red over the New York skyline, beside a couple raising their arms on a rooftop terrace" },
          { src: "/case-study/savory/20-stamp.webp", alt: "Brass wax seal stamp beside a wax red seal pressed with SAVORY stacked in a circle" },
        ],
      },
    ],
    nextProject: {
      title: "Orbio",
      subheading: "A Greco-Roman brand evolution for tokenized AI inference",
      image: { src: "/case-study/orbio/thumbnail.webp", alt: "Orbio brand identity" },
      url: "/work/orbio",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "orbio",
    client: "Orbio",
    title: "A Greco-Roman brand evolution for tokenized AI inference",
    summary:
      "Orbio is an AI startup that tokenizes AI inference: every CREDIT is $1 of AI usage, earned by $ORBIO stakers, traded below list price, and spent through one API key across every major model. In a one-week AI startup branding sprint, we evolved the identity rather than replacing it, keeping the 3D marble orb and building one system around it: an all-caps serif wordmark, a marble-and-brass palette with a single orange accent, a three-face type system, and social templates designed to move.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "AI infrastructure",
    year: "2026",
    deliverables: ["Brand evolution", "Logo design in 3D and flat versions", "Logo animation", "Brand architecture for three products", "Color palette", "Type system", "Website design", "Instagram posts", "Billboard design", "Merchandise design"],
    seo: {
      title: "Orbio: AI Startup Branding Case Study | Ebaq Design",
      description:
        "AI startup branding case study: a one-week brand sprint for Orbio, an AI inference platform, covering the logo system, color palette, typography, motion and social templates.",
      keywords: [
        "AI startup branding",
        "AI brand identity",
        "AI company logo design",
        "brand sprint",
        "crypto brand identity",
        "Web3 branding",
        "motion branding",
        "social media templates",
      ],
    },
    preview: { src: "/case-study/orbio/thumbnail.webp", alt: "Horizontal Orbio logo lockup: the 3D marble orb beside the ORBIO wordmark" },
    hero: {
      src: "/case-study/orbio/hero-orb.webm",
      alt: "Horizontal Orbio logo lockup: the 3D marble orb turning beside the ORBIO wordmark",
      kind: "video",
      backgroundColor: "#0B0B0C",
    },
    leadGallery: [
      { src: "/case-study/orbio/01-logos.webp", alt: "Orbio logo lockups in 3D and flat versions on light and dark" },
      { src: "/case-study/orbio/01-flat-orb-sky.webp", alt: "Flat Orbio orb over a Renaissance sky painting" },
    ],
    content: [
      {
        type: "header",
        heading: "One master brand, one accent",
        description:
          "Orbio leads, and each product is named with a plain descriptor: Orbio Launchpad, Orbio Marketplace, Orbio Incognito. The palette comes from the marble itself. Void, Marble, and Stone set the fields, Vein orange is the only accent, and Brass, Celeste, and Iris give Marketplace, Launchpad, and Incognito their own color.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/orbio/02-brand-architecture.webp", alt: "Orbio brand architecture with Launchpad, Marketplace, and Incognito lockups" },
          {
            src: "/case-study/orbio/03-colors.webm",
            alt: "Orbio primary and secondary color palette in motion",
            kind: "video",
          },
        ],
      },
      {
        type: "header",
        heading: "Three typefaces, each with one job",
        description:
          "ABC Arizona Flare sets the headlines in caps. Geist Mono handles labels, menus, and data in tracked caps, and Geist sets everything people read at length.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/case-study/orbio/25-type-trio.webm",
            alt: "Orbio typefaces typed in sequence: Arizona Flare as the primary typeface, then Geist as the secondary and Geist Mono as the tertiary",
            kind: "video",
          },
          {
            src: "/case-study/orbio/24-type-scale.webp",
            alt: "Orbio type scale on black with headline, subhead, body, and label samples and their font, size, leading, tracking, and scale specs",
          },
        ],
      },
      {
        type: "header",
        heading: "Marble leads, the bits stay quiet",
        description:
          "Every surface has one dominant visual. Marble sculptures come first, Renaissance paintings second, and a field of zeros and ones adds depth at low opacity. On the website heroes the bits wake up under the cursor and fade as it moves on.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/case-study/orbio/04-heroes.webm",
            alt: "Orbio website heroes for Home, Launchpad, Marketplace, and Incognito in sequence",
            kind: "video",
            aspectRatio: "4 / 3",
          },
          {
            src: "/case-study/orbio/05-banner.webm",
            alt: "Orbio banner with CREDIT coins tossed across the headline",
            kind: "video",
          },
        ],
      },
      {
        type: "header",
        heading: "Built to move",
        description:
          "The cards, posts, and templates were designed as motion from the start, so the same layouts work as still graphics, short loops, and social clips.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/case-study/orbio/11-card-carousel.webm",
            alt: "Orbio card carousel with fresco paintings and serif headlines",
            kind: "video",
          },
          {
            src: "/case-study/orbio/12-card-where-meets.webm",
            alt: "Orbio cards pairing paintings with Where X meets Y headlines",
            kind: "video",
          },
          {
            src: "/case-study/orbio/16-social-wall.webm",
            alt: "Wall of nine Orbio Instagram posts sliding in three columns on stone",
            kind: "video",
          },
        ],
      },
      {
        type: "header",
        heading: "Out in the world",
        description:
          "The same rules hold at street scale and in your hand: a long billboard on a brick wall, a coffee cup, a tote, and a tee.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/orbio/28-billboard.webp", alt: "Long Orbio billboard on a brick wall: a reclining marble figure holding the orb between Smarter spend and Same tokens on dusty blue" },
          { src: "/case-study/orbio/27-cup.webp", alt: "Hand holding a black Orbio coffee cup printed in orange: Humans run on coffee. Agents run on credit.", span: "half" },
          { src: "/case-study/orbio/20-tote.webp", alt: "Brass-gold Orbio tote bag with a marble head over a fading grid of zeros and ones and the serif wordmark", span: "half" },
          { src: "/case-study/orbio/26-tee-horae.webp", alt: "White Orbio T-shirt with a round Renaissance painting of four women dancing around a marble orb, ringed by the words Every model within reach" },
        ],
      },
    ],
    nextProject: {
      title: "NextDim AI",
      subheading: "A futuristic brand identity for AI-powered healthcare, beyond the clinical",
      image: { src: "/portfolio/identities/nexdim-bento.webp", alt: "NextDim AI brand identity" },
      url: "/work/next-dimension",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "next-dimension",
    client: "NextDim AI",
    title: "A futuristic brand identity for AI-powered healthcare, beyond the clinical",
    summary:
      "NextDimension helps medical practices automate operations with AI agents. We created a new identity and digital system that moves the brand beyond the typical healthcare look—combining a subtle space theme with reeded glass, expressive motion, and a modern interactive website.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Healthcare AI",
    year: "2026",
    deliverables: ["Brand strategy", "Logo design", "Logo animation", "Typography", "Color palette", "Brand guidelines on guidelines.online", "Website design with an interactive shader", "Presentation folders and business cards", "Animated billboard", "Merchandise design"],
    seo: {
      title: "NextDim AI: Healthcare AI Branding Case Study | Ebaq Design",
      description: "Healthcare AI branding case study: a new logo, logo animation, color palette, typography, online brand guidelines, and an interactive website for NextDimension, an AI-agent platform for medical practices.",
      keywords: ["healthcare AI branding", "AI startup branding", "healthcare logo design", "medical AI website design", "logo animation"],
    },
    website: { label: "Visit live website", href: "https://nextdim.io" },
    guidelines: { label: "Brand guidelines", href: "https://guidelines.online/next-dim" },
    preview: { src: "/portfolio/identities/nexdim-bento.webp", alt: "NextDim AI brand identity" },
    hero: {
      src: "/portfolio/logos/nextdim-combined-logo-scenes-wordmark-footer-reveal.lottie.json",
      alt: "Animated NextDimension logo",
      kind: "lottie",
      backgroundColor: "#181735",
    },
    leadGallery: [
      { src: "/case-study/next-dimension/old-site/01-logos.webp", alt: "NextDimension logo system" },
      { src: "/case-study/next-dimension/old-site/02-type.webp", alt: "NextDimension typography system" },
      { src: "/case-study/next-dimension/old-site/03-colors.webp", alt: "NextDimension color palette" },
    ],
    brandSprintGallery: {
      logo: { src: "/case-study/next-dimension/logos.webp", alt: "NextDimension logo design" },
      typeface: { src: "/case-study/next-dimension/type.webp", alt: "NextDimension typeface" },
      color: { src: "/case-study/next-dimension/colors.webp", alt: "NextDimension color palette" },
      website: { src: "/case-study/next-dimension/old-site/04-website.webp", alt: "NextDimension website design" },
    },
    testimonial: {
      quote:
        '"Arek worked with us on the complete redesign of the NextDimension AI visual identity and website. He was thoughtful, responsive, and patient throughout the process, from exploring the logo direction to refining the website’s content, design, and functionality. What stood out most was his ability to clearly explain and defend his creative vision while still listening to our feedback. We are both convinced by the final direction and very happy with the result."',
      logo: { src: "/client-logos/nextdim-wordmark.svg", alt: "NextDimension AI", scale: 90 },
      avatar: { src: "/testimonials/lakshita-chhikara.webp", alt: "Lakshita Chhikara" },
      name: "Lakshita Chhikara",
      position: "Co-Founder",
      companyName: "NextDimension AI",
    },
    nextProject: {
      title: "Fox Berman",
      subheading: "A modern brand identity for a boutique law firm with Caribbean character",
      image: { src: "/portfolio/identities/forberman-bento.webp", alt: "Fox Berman brand identity" },
      url: "/work/fox-berman",
      tags: ["Brand strategy", "Visual identity", "Web design"],
    },
    content: [
      {
        type: "header",
        heading: "A visual language built for intelligence in motion",
        description: "The mark, palette, typography, and grid create a precise but non-clinical system. Deep Space anchors the identity while Violet Dream and warm neutrals add energy and dimension.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/next-dimension/old-site/04-website.webp", alt: "NextDimension website design" },
          {
            src: "/case-study/next-dimension/old-site/05-hero-shader.mp4",
            alt: "NextDimension interactive website shader",
            kind: "video",
          },
          { src: "/case-study/next-dimension/old-site/06-full-website.webp", alt: "Full NextDimension website design" },
        ],
      },
      {
        type: "header",
        heading: "Reeded glass turns a digital idea into something tangible",
        description: "Fluted-glass effects bend light, imagery, and typography into a recognizable brand behavior that works across physical and digital applications.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/next-dimension/old-site/07-cap.webp", alt: "NextDimension branded cap", span: "half" },
          { src: "/case-study/next-dimension/old-site/08-bottle.webp", alt: "NextDimension branded bottle", span: "half" },
          { src: "/case-study/next-dimension/old-site/09-folders.webp", alt: "NextDimension presentation folders" },
          { src: "/case-study/next-dimension/old-site/10-cards.webp", alt: "NextDimension branded cards" },
          {
            src: "/case-study/next-dimension/old-site/11-billboard-loop.mp4",
            alt: "NextDimension animated billboard",
            kind: "video",
            overlaySrc: "/case-study/next-dimension/old-site/11-billboard-overlay.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "fox-berman",
    client: "Fox Berman",
    title: "A modern brand identity for a boutique law firm with Caribbean character",
    summary:
      "Fox Berman is a boutique law firm based in Sint Maarten, Dutch Caribbean, specializing in business and international law. We created a modern identity that balances legal authority with the island’s vibrant character through a bold custom wordmark, precise inktraps, and a vivid orange palette.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Legal services",
    year: "2025",
    deliverables: ["Logo design (custom wordmark)", "Logo animation", "Color palette", "Brand guidelines on guidelines.online", "Business cards", "Letterhead and presentation folder", "Printed booklet", "Email signature", "Website design", "Social media graphics for Instagram and LinkedIn", "Wall and pylon signage", "Favicon"],
    seo: {
      title: "Fox Berman: Law Firm Branding Case Study | Ebaq Design",
      description: "Law firm branding case study: a custom wordmark, logo animation, brand guidelines, stationery, signage, Instagram and LinkedIn graphics, and a website for Fox Berman, a boutique business law firm in Sint Maarten.",
      keywords: ["law firm branding", "law firm logo design", "legal brand identity", "law firm website design", "law firm social media graphics"],
    },
    website: { label: "Visit live website", href: "https://www.foxberman.com/" },
    guidelines: { label: "Brand guidelines", href: "https://guidelines.online/foxberman" },
    preview: { src: "/portfolio/identities/forberman-bento.webp", alt: "Fox Berman brand identity" },
    hero: {
      src: "/case-study/fox-berman/hero-logo.json",
      alt: "Animated Fox Berman logo",
      kind: "lottie",
      backgroundColor: "#f3603c",
    },
    leadGallery: [
      { src: "/case-study/fox-berman/01-logos.webp", alt: "Fox Berman logo system" },
      {
        src: "/case-study/fox-berman/02-colors.mp4",
        alt: "Fox Berman color palette in motion",
        kind: "video",
      },
      { src: "/case-study/fox-berman/03-cards.webp", alt: "Fox Berman business cards" },
    ],
    content: [
      {
        type: "header",
        heading: "Legal authority, without the expected restraint",
        description:
          "Bright orange reflects the firm’s Sint Maarten presence while the all-caps custom wordmark and precise inktraps communicate confidence, clarity, and contemporary expertise.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/fox-berman/04-website.webp", alt: "Fox Berman website design" },
          { src: "/case-study/fox-berman/05-signature.webp", alt: "Fox Berman email signature" },
          { src: "/case-study/fox-berman/06-signage-wall.webp", alt: "Fox Berman wall signage", span: "half" },
          { src: "/case-study/fox-berman/07-signage-pylon.webp", alt: "Fox Berman pylon signage", span: "half" },
          {
            src: "/case-study/fox-berman/08-social.mp4",
            alt: "Fox Berman social identity in motion",
            kind: "video",
          },
        ],
      },
      {
        type: "header",
        heading: "One precise system, carried across every touchpoint",
        description:
          "The identity scales from digital experiences and social content to folders, stationery, printed materials, environmental signage, and the smallest branded details.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/fox-berman/09-folder.webp", alt: "Fox Berman presentation folder" },
          { src: "/case-study/fox-berman/10-letterhead.webp", alt: "Fox Berman letterhead", span: "half" },
          { src: "/case-study/fox-berman/11-letterhead-detail.webp", alt: "Fox Berman letterhead detail", span: "half" },
          { src: "/case-study/fox-berman/12-booklet.webp", alt: "Fox Berman printed booklet" },
          { src: "/case-study/fox-berman/13-favicon.webp", alt: "Fox Berman favicon", span: "half" },
          { src: "/case-study/fox-berman/14-pin.webp", alt: "Fox Berman branded pin", span: "half" },
          {
            src: "/case-study/fox-berman/15-lawyers.mp4",
            alt: "Fox Berman attorneys",
            kind: "video",
          },
        ],
      },
    ],
    testimonial: {
      quote: '"Excellent work! Fast, reliable and look and feel matched beyond our expectations."',
      logo: { src: "/client-logos/foxberman-wordmark.svg", alt: "Fox Berman", scale: 50 },
      avatar: { src: "/testimonials/lucas.webp", alt: "Lucas Berman" },
      name: "Lucas Berman",
      position: "Partner",
      companyName: "Fox Berman",
    },
    nextProject: {
      title: "Elevate",
      subheading: "A progressive SaaS identity for a Shopify testing platform built around growth",
      image: { src: "/portfolio/identities/elevate-bento.webp", alt: "Elevate brand identity" },
      url: "/work/elevate",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "elevate",
    client: "Elevate",
    title: "A progressive SaaS identity for a Shopify testing platform built around growth",
    summary:
      "Elevate is a Shopify-native A/B testing platform that helps store owners improve performance through faster, smarter experimentation. We created an abstract growth mark and bespoke wordmark that balance technical precision with confidence and momentum, giving the brand a clear and ownable presence in the Shopify ecosystem.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Ecommerce technology",
    year: "2026",
    deliverables: ["Logo design", "Logo animation", "Icon system", "Brand guidelines on guidelines.online", "Website design", "Business cards and collateral", "Team ID badge", "Merchandise design", "Office branding"],
    seo: {
      title: "Elevate: SaaS Branding Case Study | Ebaq Design",
      description: "SaaS branding case study: a growth mark, bespoke wordmark, logo animation, icon system, online brand guidelines, and website design for Elevate, a Shopify A/B testing platform.",
      keywords: ["SaaS branding", "SaaS logo design", "Shopify app branding", "startup brand identity", "SaaS website design"],
    },
    website: { label: "Visit live website", href: "https://elevateab.com/" },
    guidelines: { label: "Brand guidelines", href: "https://guidelines.online/elevate-ab" },
    preview: { src: "/portfolio/identities/elevate-bento.webp", alt: "Elevate brand identity" },
    hero: {
      src: "/case-study/elevate/hero-logo.json",
      alt: "Animated Elevate logo",
      kind: "lottie",
      backgroundColor: "#000000",
    },
    leadGallery: [
      { src: "/case-study/elevate/01-logos.webp", alt: "Elevate logo system" },
      { src: "/case-study/elevate/02-icon-set.webp", alt: "Elevate icon system" },
      { src: "/case-study/elevate/03-website.webp", alt: "Elevate website design" },
    ],
    content: [
      {
        type: "header",
        heading: "A visual system designed for continuous improvement",
        description:
          "The abstract mark captures growth, progress, and the elevation of a Shopify store. A bespoke wordmark makes the identity distinctive and ownable while retaining the precision expected from an experimentation platform.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/case-study/elevate/04-merchandise.mp4",
            alt: "Elevate merchandise in motion",
            kind: "video",
          },
          { src: "/case-study/elevate/05-business-cards.webp", alt: "Elevate business cards" },
          { src: "/case-study/elevate/06-collateral.webp", alt: "Elevate branded collateral" },
        ],
      },
      {
        type: "header",
        heading: "Built to perform across product, print, and place",
        description:
          "The identity carries a consistent sense of momentum from the digital product and website to business materials, team credentials, merchandise, and environmental applications.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/elevate/07-envelope.webp", alt: "Elevate branded envelope" },
          { src: "/case-study/elevate/08-id-badge.webp", alt: "Elevate team ID badge" },
          {
            src: "/case-study/elevate/09-office.mp4",
            alt: "Elevate office branding in motion",
            kind: "video",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        '"Arek did an outstanding job on our full brand redesign. From understanding our vision, to crafting the direction, to executing with speed, he nailed it from the beginning. We absolutely love all of it. What stood out most was how quickly he understood exactly what we were looking for. He was creative, came back with ideas that felt modern and genuinely good, and landed on something that fit our brand perfectly. He made himself available throughout the process and kept things moving fast without cutting corners on quality. Working with him was easy from start to finish. I’d recommend him to anyone looking for a designer who gets it and delivers. Thanks, Arek."',
      logo: { src: "/client-logos/elevate-wordmark.svg", alt: "Elevate", scale: 80 },
      avatar: { src: "/testimonials/karim-zitouni.webp", alt: "Karim Zitouni" },
      name: "Karim Zitouni",
      position: "Co-Founder",
      companyName: "Elevate",
    },
    nextProject: {
      title: "Aero",
      subheading: "A clinical identity for breath-analysis technology built around precision",
      image: { src: "/portfolio/identities/aero-bento.webp", alt: "Aero brand identity" },
      url: "/work/aero",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "aero",
    client: "Aero",
    title: "A clinical identity for breath-analysis technology built around precision",
    summary:
      "Aero is a breath-analysis company delivering precise, non-invasive health insights through advanced sensor technology. We created a clean, clinical identity that pairs a custom lowercase wordmark with a lab-grade green palette, balancing scientific precision with clarity, trust, and approachability.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Health technology",
    year: "2026",
    deliverables: ["Logo design", "Logo animation", "Color system", "Typography", "Stationery", "Website design", "Mobile and wearable app design", "Environmental signage", "Billboard campaign", "Event branding", "Social media content in motion"],
    seo: {
      title: "Aero: Health Tech Branding Case Study | Ebaq Design",
      description: "Health tech branding case study: a custom lowercase wordmark, logo animation, lab-grade color system, website, app, signage, and campaign design for Aero, a breath-analysis company.",
      keywords: ["health tech branding", "medical device branding", "healthcare logo design", "health app design", "logo animation"],
    },
    preview: { src: "/portfolio/identities/aero-bento.webp", alt: "Aero brand identity" },
    hero: {
      src: "/case-study/aero/hero-logo.json",
      alt: "Animated Aero logo",
      kind: "lottie",
      backgroundColor: "#63f3c0",
    },
    leadGallery: [
      {
        src: "/case-study/aero/01-logo-grid.mp4",
        alt: "Aero logo construction in motion",
        kind: "video",
      },
      { src: "/case-study/aero/02-color.webp", alt: "Aero color system" },
      { src: "/case-study/aero/03-stationery.webp", alt: "Aero stationery system" },
    ],
    brandSprintGallery: {
      logo: { src: "/case-study/aero-logo.webp", alt: "Aero logo design" },
      typeface: { src: "/case-study/aero-fonts.webp", alt: "Aero typeface" },
      color: { src: "/case-study/aero-palette.webp", alt: "Aero color palette" },
      website: { src: "/case-study/aero-web-pro.webp", alt: "Aero website design" },
    },
    content: [
      {
        type: "header",
        heading: "Clinical precision, made clear and approachable",
        description:
          "The custom lowercase wordmark uses refined geometry and subtle optical adjustments to stay clear at every scale. A controlled green palette evokes a lab-grade medical environment while communicating reliability and calm confidence.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/case-study/aero/04-type-color.mp4",
            alt: "Aero typography and color in motion",
            kind: "video",
          },
          { src: "/case-study/aero/05-website.webp", alt: "Aero website design" },
          { src: "/case-study/aero/06-misc.webp", alt: "Aero branded applications" },
          { src: "/case-study/aero/07-sign.webp", alt: "Aero environmental signage" },
          {
            src: "/case-study/aero/08-billboards.mp4",
            alt: "Aero billboard campaign in motion",
            kind: "video",
          },
        ],
      },
      {
        type: "header",
        heading: "A flexible system for health technology in motion",
        description:
          "The identity extends across events, product interfaces, wearables, merchandise, social content, and environmental graphics without losing its scientific focus or human clarity.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/aero/09-event.webp", alt: "Aero event branding" },
          { src: "/case-study/aero/10-app.webp", alt: "Aero mobile application" },
          { src: "/case-study/aero/11-watch.webp", alt: "Aero wearable application" },
          { src: "/case-study/aero/12-cap.webp", alt: "Aero branded cap" },
          {
            src: "/case-study/aero/13-social.mp4",
            alt: "Aero social content in motion",
            kind: "video",
          },
          { src: "/case-study/aero/14-socks.webp", alt: "Aero branded socks" },
          {
            src: "/case-study/aero/15-wall.mp4",
            alt: "Aero wall installation in motion",
            kind: "video",
          },
        ],
      },
    ],
    nextProject: {
      title: "Brevidee",
      subheading: "A playful identity for a video-editing platform built for schools",
      image: { src: "/portfolio/identities/brevidee-bento.webp", alt: "Brevidee brand identity" },
      url: "/work/brevidee",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "brevidee",
    client: "Brevidee",
    title: "A playful identity for a video-editing platform built for schools",
    summary:
      "Brevidee is a video-editing SaaS that helps schools create short, engaging promotional videos. We designed a playful but minimal identity around a teacher-with-camera symbol integrated directly into the wordmark, giving the platform an instantly recognizable presence across product, social, print, and digital touchpoints.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Education technology",
    year: "2025",
    deliverables: ["Logo design", "Logo animation", "App icon", "Teacher mobile app design", "Website design", "Social media design", "Business cards", "Educational booklet and flyers", "Event banner", "Merchandise design"],
    seo: {
      title: "Brevidee: EdTech Branding Case Study | Ebaq Design",
      description: "EdTech branding case study: a playful logo with a teacher-and-camera symbol, logo animation, app icon, teacher app, social media design, print, and website for Brevidee, a video-editing platform for schools.",
      keywords: ["edtech branding", "education SaaS logo", "school software branding", "app icon design", "logo animation"],
    },
    website: { label: "Visit live website", href: "https://www.brevidee.com/" },
    preview: { src: "/portfolio/identities/brevidee-bento.webp", alt: "Brevidee brand identity" },
    hero: {
      src: "/case-study/brevidee/hero-logo.json",
      alt: "Animated Brevidee logo",
      kind: "lottie",
      backgroundColor: "#f8e6e8",
    },
    leadGallery: [
      { src: "/case-study/brevidee/01-logos.png", alt: "Brevidee logo system" },
      { src: "/case-study/brevidee/02-cards.webp", alt: "Brevidee business cards" },
      { src: "/case-study/brevidee/03-app-icon.webp", alt: "Brevidee application icon", span: "half" },
      { src: "/case-study/brevidee/04-teacher-phone.webp", alt: "Brevidee teacher mobile application", span: "half" },
    ],
    content: [
      {
        type: "header",
        heading: "A character built directly into the wordmark",
        description:
          "Replacing the letter r with a teacher holding a camera makes the idea immediately recognizable and relevant to education-focused video creation. The system stays minimal enough to remain clear across every scale and format.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/brevidee/05-hoodie.webp", alt: "Brevidee branded hoodie" },
          { src: "/case-study/brevidee/06-bag.webp", alt: "Brevidee branded bag", span: "half" },
          { src: "/case-study/brevidee/07-banner.webp", alt: "Brevidee event banner", span: "half" },
          { src: "/case-study/brevidee/08-flyers.webp", alt: "Brevidee promotional flyers" },
        ],
      },
      {
        type: "header",
        heading: "Simple enough for the product, expressive enough for the brand",
        description:
          "The visual language carries its warmth and clarity from social content and the website to printed materials, educational resources, merchandise, and launch communications.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/brevidee/09-social.webp", alt: "Brevidee social media design" },
          { src: "/case-study/brevidee/10-website.webp", alt: "Brevidee website design" },
          { src: "/case-study/brevidee/11-book.webp", alt: "Brevidee educational booklet", span: "half" },
          { src: "/case-study/brevidee/12-beanie.webp", alt: "Brevidee branded beanie", span: "half" },
        ],
      },
    ],
    testimonial: {
      quote:
        '"After struggling to build our website on Squarespace and wasting valuable time with underwhelming designers on Upwork, we finally discovered Arek at Ebaqdesign—and what a game-changer that was. From the very start, he understood our vision, took control of the process, and delivered a brand transformation that exceeded all our expectations. The results were beyond anything we could have imagined!"',
      logo: { src: "/client-logos/brevidee-logo.svg", alt: "Brevidee", scale: 80 },
      avatar: { src: "/case-study/brevidee/alan-rudt.webp", alt: "Alan Rudt" },
      name: "Alan Rudt",
      position: "Founder",
      companyName: "Brevidee",
    },
    nextProject: {
      title: "Wingnut",
      subheading: "A refined identity for a digital agency serving high-end interiors",
      image: { src: "/portfolio/identities/wingnut-bento.webp", alt: "Wingnut brand identity" },
      url: "/work/wingnut",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "wingnut",
    client: "Wingnut",
    title: "A refined identity for a digital agency serving high-end interiors",
    summary:
      "Wingnut Social is a digital marketing agency for interior designers and home brands. We elevated the identity for its high-end audience with a simplified wingnut symbol, a clean sans-serif wordmark, a refined color palette, and a flexible graphic system that positions the agency as a category expert.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Digital marketing",
    year: "2025",
    deliverables: ["Logo design", "Logo animation", "Pitch deck", "Social media system", "Website design for desktop and mobile", "Business cards", "Employee badge", "Merchandise design", "Office branding"],
    seo: {
      title: "Wingnut Social: Logo & Pitch Deck Case Study | Ebaq Design",
      description: "Agency branding case study: a refined logo, logo animation, pitch deck, social media system, and website for Wingnut Social, a digital marketing agency for interior designers and home brands.",
      keywords: ["marketing agency branding", "pitch deck design", "agency logo design", "social media design", "interior design marketing brand"],
    },
    preview: { src: "/portfolio/identities/wingnut-bento.webp", alt: "Wingnut brand identity" },
    hero: {
      src: "/case-study/wingnut/hero-logo.json",
      alt: "Animated Wingnut logo",
      kind: "lottie",
      backgroundColor: "#77aeb1",
    },
    leadGallery: [
      { src: "/case-study/wingnut/01-logos.png", alt: "Wingnut logo system" },
      { src: "/case-study/wingnut/02-cards.webp", alt: "Wingnut business cards" },
      { src: "/case-study/wingnut/03-website.webp", alt: "Wingnut website design" },
    ],
    content: [
      {
        type: "header",
        heading: "A familiar symbol, simplified for a more elevated audience",
        description:
          "The redesigned wingnut mark is paired with a clean sans-serif wordmark and a refined version of the original palette. Together they create a sharper, more contemporary identity without losing the character that made the agency recognizable.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/wingnut/04-iphone.webp", alt: "Wingnut mobile website", span: "half" },
          { src: "/case-study/wingnut/05-socks.webp", alt: "Wingnut branded socks", span: "half" },
          { src: "/case-study/wingnut/06-social.webp", alt: "Wingnut social media system" },
          { src: "/case-study/wingnut/07-macbook.webp", alt: "Wingnut video content on a laptop" },
        ],
      },
      {
        type: "header",
        heading: "Built to position Wingnut as the expert in its category",
        description:
          "A flexible set of custom graphics carries the identity across digital content, presentations, merchandise, credentials, and the workplace while maintaining a sleek and consistent point of view.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/wingnut/08-badge.webp", alt: "Wingnut employee badge", span: "half" },
          { src: "/case-study/wingnut/09-tote.webp", alt: "Wingnut branded tote bag", span: "half" },
          { src: "/case-study/wingnut/10-deck.webp", alt: "Wingnut presentation deck" },
          { src: "/case-study/wingnut/11-shirt.webp", alt: "Wingnut branded shirt", span: "half" },
          { src: "/case-study/wingnut/12-pins.webp", alt: "Wingnut branded pins", span: "half" },
          {
            src: "/case-study/wingnut/13-office.mp4",
            alt: "Wingnut office branding in motion",
            kind: "video",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        '"We had a terrific experience working with Arek on our logos and pitch deck. Highly recommended!"',
      logo: { src: "/client-logos/wingnut-logo-black.svg", alt: "Wingnut Social", scale: 105 },
      avatar: { src: "/case-study/wingnut/darla-powell.webp", alt: "Darla Powell" },
      name: "Darla Powell",
      position: "Founder",
      companyName: "Wingnut Social",
    },
    nextProject: {
      title: "Ventur",
      subheading: "A vibrant identity for an AI travel planner built around discovery",
      image: { src: "/portfolio/identities/ventur-bento.webp", alt: "Ventur brand identity" },
      url: "/work/ventur",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "ventur",
    client: "Ventur",
    title: "A vibrant identity for an AI travel planner built around discovery",
    summary:
      "Ventur is an AI-powered travel planning app that helps people spend less and travel more. We created a bold identity around a distinctive V monogram drawn as a flowing path, supported by a clean wordmark, a vibrant palette, and a flexible line motif that makes smart travel feel effortless.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Travel technology",
    year: "2025",
    deliverables: ["Logo design (V monogram)", "Logo animation", "Social media graphics in motion", "Mobile app design", "Website design", "Billboard campaign", "Merchandise design"],
    seo: {
      title: "Ventur: Travel App Branding Case Study | Ebaq Design",
      description: "Travel app branding case study: a flowing V monogram, logo animation, vibrant palette, social media motion, mobile app, website, and billboard design for Ventur, an AI travel planner.",
      keywords: ["travel app branding", "AI app logo design", "monogram logo", "mobile app branding", "logo animation"],
    },
    website: { label: "Visit live website", href: "https://www.venturtravel.com/" },
    preview: { src: "/portfolio/identities/ventur-bento.webp", alt: "Ventur brand identity" },
    hero: {
      src: "/case-study/ventur/hero-logo.json",
      alt: "Animated Ventur logo",
      kind: "lottie",
      backgroundColor: "#9047ff",
    },
    leadGallery: [
      { src: "/case-study/ventur/01-logos.png", alt: "Ventur logo system" },
      {
        src: "/case-study/ventur/02-social.mp4",
        alt: "Ventur social identity in motion",
        kind: "video",
      },
      { src: "/case-study/ventur/03-billboard.webp", alt: "Ventur billboard campaign" },
    ],
    content: [
      {
        type: "header",
        heading: "A journey distilled into one continuous path",
        description:
          "The V monogram is drawn as a flowing route, turning movement, adventure, and discovery into a simple visual signature. A clean sans-serif wordmark gives the playful symbol a confident and trustworthy foundation.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/ventur/04-app.webp", alt: "Ventur mobile application", span: "half" },
          { src: "/case-study/ventur/05-cup.webp", alt: "Ventur branded travel cup", span: "half" },
          { src: "/case-study/ventur/06-website.webp", alt: "Ventur website design" },
        ],
      },
      {
        type: "header",
        heading: "A flexible line system that keeps the brand moving",
        description:
          "The route motif weaves through layouts, messaging, product screens, and physical applications. Vibrant purple creates a premium foundation while a playful orange accent adds warmth, energy, and approachability.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/ventur/07-mobile.webp", alt: "Ventur mobile brand experience", span: "half" },
          { src: "/case-study/ventur/08-bag.webp", alt: "Ventur branded travel bag", span: "half" },
          { src: "/case-study/ventur/09-shirt.webp", alt: "Ventur branded shirt" },
        ],
      },
    ],
    nextProject: {
      title: "Airport Executive",
      subheading: "A sophisticated identity for a London chauffeur service built around discreet travel",
      image: { src: "/portfolio/identities/airport-executive-bento.webp", alt: "Airport Executive brand identity" },
      url: "/work/airport-executive",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "airport-executive",
    client: "Airport Executive",
    title: "A sophisticated identity for a London chauffeur service built around discreet travel",
    summary:
      "Airport Executive is a premium London chauffeur service with more than 25 years of experience. Under new ownership, we elevated the brand with a refined aviation-inspired monogram, elegant typography, a minimalist visual system, and a sophisticated website built to support its global ambition.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Luxury transportation",
    year: "2025",
    deliverables: ["Rebrand", "Monogram and logo design", "Logo animation", "Business cards", "Branded publication", "Campaign banners", "Chauffeur badge", "App icon", "Website design", "Environmental signage"],
    seo: {
      title: "Airport Executive: Luxury Chauffeur Rebrand | Ebaq Design",
      description: "Luxury rebrand case study: an aviation-inspired monogram, elegant typography, logo animation, print, signage, and website for Airport Executive, a premium London chauffeur service.",
      keywords: ["luxury rebrand", "luxury brand identity", "monogram logo design", "chauffeur service branding", "premium website design"],
    },
    website: { label: "Visit live website", href: "https://www.airportexecutive.com/" },
    preview: { src: "/portfolio/identities/airport-executive-bento.webp", alt: "Airport Executive brand identity" },
    hero: {
      src: "/case-study/airport-executive/hero-logo.json",
      alt: "Animated Airport Executive logo",
      kind: "lottie",
      backgroundColor: "#000000",
    },
    leadGallery: [
      { src: "/case-study/airport-executive/01-logos.webp", alt: "Airport Executive logo system" },
      { src: "/case-study/airport-executive/02-business-cards.webp", alt: "Airport Executive business cards" },
      { src: "/case-study/airport-executive/03-book.webp", alt: "Airport Executive branded publication" },
    ],
    content: [
      {
        type: "header",
        heading: "A refined monogram shaped by aviation and service",
        description:
          "The symbol brings the initials together with a subtle reference to flight, creating a compact mark that feels precise, assured, and distinctly premium. Elegant typography and a restrained palette reinforce the discretion expected from the service.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/airport-executive/04-banner.webp", alt: "Airport Executive campaign banner" },
          { src: "/case-study/airport-executive/05-badge.webp", alt: "Airport Executive chauffeur badge", span: "half" },
          { src: "/case-study/airport-executive/06-app-icon.webp", alt: "Airport Executive application icon", span: "half" },
          { src: "/case-study/airport-executive/07-website.webp", alt: "Airport Executive website design" },
        ],
      },
      {
        type: "header",
        heading: "A modern expression of discreet, high-end travel",
        description:
          "The identity extends from the booking experience and digital product to uniforms, environmental graphics, campaign materials, and client-facing details—positioning a trusted London operator as a contemporary global contender.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/airport-executive/08-banner-detail.webp", alt: "Airport Executive banner detail", span: "half" },
          { src: "/case-study/airport-executive/09-merchandise.webp", alt: "Airport Executive branded merchandise", span: "half" },
          { src: "/case-study/airport-executive/10-signage.webp", alt: "Airport Executive environmental signage" },
          {
            src: "/case-study/airport-executive/11-escalator.mp4",
            alt: "Airport Executive escalator campaign in motion",
            kind: "video",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        '"Arek is a branding expert with extensive experience in graphic design, logos, and web design. We have collaborated with him on several rebranding projects. I highly recommend him."',
      logo: { src: "/client-logos/airport-executive-logo.svg", alt: "Airport Executive" },
      avatar: { src: "/case-study/airport-executive/chris-nixon.webp", alt: "Chris Nixon" },
      name: "Chris Nixon",
      position: "Founder",
      companyName: "Airport Executive",
    },
    nextProject: {
      title: "SweetGrass",
      subheading: "A refined identity for a Southern cannabis dispensary rooted in luxury",
      image: { src: "/portfolio/identities/sweetgrass-bento.webp", alt: "SweetGrass brand identity" },
      url: "/work/sweetgrass",
      tags: ["Brand strategy", "Visual identity", "Packaging", "Web design"],
    },
  },
  {
    slug: "sweetgrass",
    client: "SweetGrass",
    title: "A refined identity for a Southern cannabis dispensary rooted in luxury",
    summary:
      "SweetGrass is a premium cannabis dispensary in Mississippi that blends Southern roots with a refined modern aesthetic. We created an Art Deco-inspired wordmark, bespoke typography, seamless patterns, luxurious packaging, and a complete digital experience that distinguishes the brand in the emerging Southern cannabis market.",
    services: ["Brand strategy", "Visual identity", "Packaging", "Web design"],
    industry: "Cannabis retail",
    year: "2025",
    deliverables: ["Logo design (Art Deco wordmark)", "Logo animation", "Custom typography and patterns", "Packaging design", "Brand guidelines", "Business cards", "Brochure", "Billboard and outdoor advertising", "Website design"],
    seo: {
      title: "SweetGrass: Cannabis Branding & Packaging Case Study | Ebaq Design",
      description: "Cannabis branding case study: an Art Deco wordmark, custom typography, patterns, packaging, brochure, billboards, and website for SweetGrass, a luxury dispensary in Mississippi.",
      keywords: ["cannabis branding", "dispensary logo design", "cannabis packaging design", "luxury retail branding", "dispensary website design"],
    },
    website: { label: "Visit live website", href: "https://www.sweetgrassdispensaries.com/" },
    guidelines: {
      label: "Brand guidelines",
      href: "https://indd.adobe.com/view/5b85fc9a-0e79-4ec8-8fbf-c4a28d520a96?startpage=1&allowFullscreen=true",
    },
    preview: { src: "/portfolio/identities/sweetgrass-bento.webp", alt: "SweetGrass brand identity" },
    hero: {
      src: "/case-study/sweetgrass/hero-logo.json",
      alt: "Animated SweetGrass logo",
      kind: "lottie",
      backgroundColor: "#434343",
    },
    leadGallery: [
      { src: "/case-study/sweetgrass/01-bag.webp", alt: "SweetGrass cannabis packaging" },
      {
        src: "/case-study/sweetgrass/02-product.mp4",
        alt: "SweetGrass product identity in motion",
        kind: "video",
      },
      { src: "/case-study/sweetgrass/03-business-cards.webp", alt: "SweetGrass business cards" },
    ],
    content: [
      {
        type: "header",
        heading: "Southern character, expressed through modern Art Deco detail",
        description:
          "A custom wordmark and bespoke display typeface give SweetGrass an unmistakable voice. Turquoise and gold accents create a sense of calm luxury, while supporting patterns bring rhythm and richness to every application.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/sweetgrass/04-dropper.webp", alt: "SweetGrass cannabis dropper packaging" },
          { src: "/case-study/sweetgrass/05-polo.webp", alt: "SweetGrass branded polo shirt", span: "half" },
          { src: "/case-study/sweetgrass/06-billboard.webp", alt: "SweetGrass billboard campaign", span: "half" },
          { src: "/case-study/sweetgrass/07-billboard-2.webp", alt: "SweetGrass outdoor advertising" },
        ],
      },
      {
        type: "header",
        heading: "A complete brand experience built for an emerging market",
        description:
          "The secondary palette and graphic system adapt across packaging, printed education, advertising, merchandise, and digital touchpoints—giving the dispensary a premium but approachable presence at every stage of the customer journey.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/sweetgrass/08-brochure.webp", alt: "SweetGrass cannabis brochure", span: "half" },
          { src: "/case-study/sweetgrass/09-jar.webp", alt: "SweetGrass cannabis jar packaging", span: "half" },
          { src: "/case-study/sweetgrass/10-bags.webp", alt: "SweetGrass retail packaging system" },
        ],
      },
    ],
    testimonial: {
      quote: '"Arek is a magic visionary with sharp attention to detail."',
      logo: { src: "/client-logos/sweetgrass-logo-black.svg", alt: "SweetGrass", scale: 60 },
      avatar: { src: "/case-study/sweetgrass/jane-de-abreu.webp", alt: "Jane de Abreu" },
      name: "Jane de Abreu",
      position: "Founder",
      companyName: "SweetGrass",
    },
    nextProject: {
      title: "Periti Digital",
      subheading: "A precise identity for a pan-European HubSpot consultancy built for clarity",
      image: { src: "/portfolio/identities/periti-bento.webp", alt: "Periti Digital brand identity" },
      url: "/work/periti",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "periti",
    client: "Periti Digital",
    title: "A precise identity for a pan-European HubSpot consultancy built for clarity",
    summary:
      "Periti Digital is a HubSpot consultancy with teams across Dublin, Bray, Lisbon, and Munich. We created a confident identity around a bold architectural mark, clear verbal positioning, and a structured visual system that communicates precision, professionalism, and trust across borders.",
    services: ["Brand strategy", "Visual identity", "Verbal identity", "Web design"],
    industry: "Digital consultancy",
    year: "2025",
    deliverables: ["Logo design", "Logo animation", "Verbal identity and positioning", "Brand guidelines", "Business cards, letterhead, and stationery", "Email signature", "Website design", "Social media system", "Promotional flyer"],
    seo: {
      title: "Periti Digital: Consultancy Branding Case Study | Ebaq Design",
      description: "Consultancy branding case study: an architectural mark, logo animation, verbal identity, stationery, social media system, and website for Periti Digital, a pan-European HubSpot consultancy.",
      keywords: ["consultancy branding", "B2B brand identity", "professional services logo", "HubSpot partner branding", "B2B website design"],
    },
    website: { label: "Visit live website", href: "https://peritidigital.com/" },
    guidelines: {
      label: "Brand guidelines",
      href: "https://indd.adobe.com/view/f088380d-7ba9-47b9-b4bb-5a881e492c73?startpage=1&allowFullscreen=true",
    },
    preview: { src: "/portfolio/identities/periti-bento.webp", alt: "Periti Digital brand identity" },
    hero: {
      src: "/case-study/periti/hero-logo.json",
      alt: "Animated Periti Digital logo",
      kind: "lottie",
      backgroundColor: "#000000",
    },
    leadGallery: [
      { src: "/case-study/periti/01-cards.webp", alt: "Periti Digital business cards" },
      { src: "/case-study/periti/02-macbook.webp", alt: "Periti Digital brand on a laptop" },
      { src: "/case-study/periti/03-mug.webp", alt: "Periti Digital branded mug" },
    ],
    content: [
      {
        type: "header",
        heading: "An architectural mark for making complexity feel structured",
        description:
          "The bold symbol gives Periti a precise and memorable visual anchor. Clean typography, disciplined layouts, and direct language reflect the consultancy’s ability to bring order and clarity to complex digital operations.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/periti/04-letter.webp", alt: "Periti Digital letterhead", span: "half" },
          { src: "/case-study/periti/05-website.webp", alt: "Periti Digital website design" },
          { src: "/case-study/periti/06-hoodie.webp", alt: "Periti Digital branded hoodie", span: "half" },
          { src: "/case-study/periti/07-social.webp", alt: "Periti Digital social media system", span: "half" },
        ],
      },
      {
        type: "header",
        heading: "One clear system, designed to work across borders",
        description:
          "From the website and social templates to stationery, campaign materials, email signatures, and team merchandise, every element communicates the same confident professionalism—regardless of market or time zone.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/periti/08-stationery.webp", alt: "Periti Digital stationery system" },
          { src: "/case-study/periti/09-flyer.webp", alt: "Periti Digital promotional flyer", span: "half" },
          { src: "/case-study/periti/10-signature.webp", alt: "Periti Digital email signature", span: "half" },
        ],
      },
    ],
    nextProject: {
      title: "Medihuanna",
      subheading: "A trusted identity for medicinal cannabis education built around clarity",
      image: { src: "/portfolio/identities/medihuanna-bento.webp", alt: "Medihuanna brand identity" },
      url: "/work/medihuanna",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "medihuanna",
    client: "Medihuanna",
    title: "A trusted identity for medicinal cannabis education built around clarity",
    summary:
      "Medihuanna is an accredited medicinal cannabis education provider in Sydney, Australia, offering trusted resources to healthcare professionals. We created a clean identity around a distinctive minimalist mark, modular patterns, and accessible digital and print applications that communicate expertise without unnecessary complexity.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Medical education",
    year: "2025",
    deliverables: ["Logo redesign", "Logo animation", "Social media animation", "Brand guidelines", "Business cards and stationery", "Educational documents", "Billboard campaign", "Environmental signage"],
    seo: {
      title: "Medihuanna: Medical Education Rebrand Case Study | Ebaq Design",
      description: "Rebrand case study: a minimalist logo redesign, logo animation, social media animation, stationery, and print for Medihuanna, an accredited medicinal cannabis education provider in Sydney.",
      keywords: ["rebrand case study", "logo redesign", "medical education branding", "healthcare brand identity", "logo animation"],
    },
    website: { label: "Visit live website", href: "https://www.medihuanna.com/" },
    guidelines: {
      label: "Brand guidelines",
      href: "https://indd.adobe.com/view/9907a87c-29c2-4164-92ee-dac1551442c3?startpage=1&allowFullscreen=true",
    },
    preview: { src: "/portfolio/identities/medihuanna-bento.webp", alt: "Medihuanna brand identity" },
    hero: {
      src: "/case-study/medihuanna/hero-logo.json",
      alt: "Animated Medihuanna logo",
      kind: "lottie",
      backgroundColor: "#11403f",
    },
    leadGallery: [
      { src: "/case-study/medihuanna/01-logos.png", alt: "Medihuanna logo system" },
      { src: "/case-study/medihuanna/02-cards.webp", alt: "Medihuanna business cards" },
      {
        src: "/case-study/medihuanna/03-product.mp4",
        alt: "Medihuanna product identity in motion",
        kind: "video",
      },
    ],
    content: [
      {
        type: "header",
        heading: "Medical credibility, expressed without clinical complexity",
        description:
          "The minimalist mark and restrained typography give the brand a clear, credible foundation. Modular patterns and graphics expand the system with enough flexibility to support education, communication, and professional resources.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/medihuanna/04-document.webp", alt: "Medihuanna educational document", span: "half" },
          {
            src: "/case-study/medihuanna/05-social.json",
            alt: "Medihuanna social identity animation",
            kind: "lottie",
            span: "half",
            aspectRatio: "2 / 3",
          },
          { src: "/case-study/medihuanna/06-stationery.webp", alt: "Medihuanna stationery system" },
        ],
      },
      {
        type: "header",
        heading: "A flexible system for education, trust, and accessibility",
        description:
          "The identity carries a consistent sense of expertise across social content, documents, stationery, environmental graphics, outdoor campaigns, and the website—positioning Medihuanna as a leading voice in medicinal cannabis education.",
      },
      {
        type: "gallery",
        images: [
          { src: "/case-study/medihuanna/07-bag.webp", alt: "Medihuanna branded bag", span: "half" },
          { src: "/case-study/medihuanna/08-billboard.webp", alt: "Medihuanna billboard campaign", span: "half" },
          { src: "/case-study/medihuanna/09-signage.webp", alt: "Medihuanna environmental signage" },
          { src: "/case-study/medihuanna/10-logo-before.webp", alt: "Medihuanna logo before redesign", span: "half" },
          { src: "/case-study/medihuanna/11-logo-after.png", alt: "Medihuanna logo after redesign", span: "half" },
        ],
      },
    ],
    testimonial: {
      quote:
        '"After several failures of using Fiverr and 99designs to handle our rebranding project, we finally found Arek and Ebaq Design who nailed it at first. There was no time wasted, Arek was very organized and methodical about his approach from the start."',
      logo: { src: "/client-logos/medihuanna-wordmark-black.svg", alt: "Medihuanna", scale: 90 },
      avatar: { src: "/case-study/medihuanna/pavel-bulkiewicz.webp", alt: "Pavel Bulkiewicz" },
      name: "Pavel Bulkiewicz",
      position: "Founder",
      companyName: "Medihuanna",
    },
    nextProject: {
      title: "Savory",
      subheading: "An editorial identity for a Brooklyn real estate team",
      image: { src: "/case-study/savory/thumbnail.webp", alt: "The Savory Team brand identity" },
      url: "/work/savory",
      tags: ["Visual identity", "Logo design", "Motion", "Brand guidelines"],
    },
  },
];

// Public consumers share one filtered collection; unfinished drafts remain available locally.
export const caseStudies = allCaseStudies.filter((study) => study.published !== false);
export const draftCaseStudies = allCaseStudies.filter((study) => study.published === false);

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
