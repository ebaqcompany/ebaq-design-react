import type { ClientLogoScale } from "../clientLogo";

export type CaseStudyMedia = {
  src: string;
  alt: string;
  kind?: "image" | "video" | "lottie";
  backgroundColor?: string;
  span?: "full" | "half";
  fit?: "cover" | "contain";
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
  overlaySrc?: string;
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
  slug: string;
  client: string;
  title: string;
  summary: string;
  services: string[];
  industry: string;
  year: string;
  website?: { label: string; href: string };
  guidelines?: { label: string; href: string };
  preview: CaseStudyImage;
  hero: CaseStudyMedia;
  leadGallery: CaseStudyGalleryImage[];
  brandSprintGallery?: CaseStudyBrandSprintGallery;
  content: CaseStudyContentBlock[];
  testimonial?: CaseStudyTestimonial;
  nextProject?: CaseStudyNextProject;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "next-dimension",
    client: "NextDim AI",
    title: "A futuristic brand identity for AI-powered healthcare, beyond the clinical",
    summary:
      "NextDimension helps medical practices automate operations with AI agents. We created a new identity and digital system that moves the brand beyond the typical healthcare look—combining a subtle space theme with reeded glass, expressive motion, and a modern interactive website.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Healthcare AI",
    year: "2026",
    website: { label: "Visit live website", href: "https://nextdim.io" },
    guidelines: { label: "Brand guidelines", href: "https://guidelines.online" },
    preview: { src: "/portfolio/identities/nexdim-bento.jpg", alt: "NextDim AI brand identity" },
    hero: {
      src: "/portfolio/logos/nextdim-combined-logo-scenes-wordmark-footer-reveal.lottie.json",
      alt: "Animated NextDimension logo",
      kind: "lottie",
      backgroundColor: "#181735",
    },
    leadGallery: [
      { src: "/case-study/next-dimension/old-site/01-logos.png", alt: "NextDimension logo system" },
      { src: "/case-study/next-dimension/old-site/02-type.png", alt: "NextDimension typography system" },
      { src: "/case-study/next-dimension/old-site/03-colors.png", alt: "NextDimension color palette" },
    ],
    brandSprintGallery: {
      logo: { src: "/case-study/next-dimension/logos.png", alt: "NextDimension logo design" },
      typeface: { src: "/case-study/next-dimension/type.png", alt: "NextDimension typeface" },
      color: { src: "/case-study/next-dimension/colors.png", alt: "NextDimension color palette" },
      website: { src: "/case-study/next-dimension/old-site/04-website.jpg", alt: "NextDimension website design" },
    },
    testimonial: {
      quote:
        '"Arek worked with us on the complete redesign of the NextDimension AI visual identity and website. He was thoughtful, responsive, and patient throughout the process, from exploring the logo direction to refining the website’s content, design, and functionality. What stood out most was his ability to clearly explain and defend his creative vision while still listening to our feedback. We are both convinced by the final direction and very happy with the result."',
      logo: { src: "/client-logos/nextdim-wordmark.svg", alt: "NextDimension AI", scale: 90 },
      avatar: { src: "/testimonials/lakshita-chhikara.jpg", alt: "Lakshita Chhikara" },
      name: "Lakshita Chhikara",
      position: "Co-Founder",
      companyName: "NextDimension AI",
    },
    nextProject: {
      title: "Fox Berman",
      subheading: "A modern brand identity for a boutique law firm with Caribbean character",
      image: { src: "/portfolio/identities/forberman-bento.jpg", alt: "Fox Berman brand identity" },
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
          { src: "/case-study/next-dimension/old-site/04-website.jpg", alt: "NextDimension website design" },
          {
            src: "/case-study/next-dimension/old-site/05-hero-shader.mp4",
            alt: "NextDimension interactive website shader",
            kind: "video",
          },
          { src: "/case-study/next-dimension/old-site/06-full-website.jpg", alt: "Full NextDimension website design" },
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
          { src: "/case-study/next-dimension/old-site/07-cap.jpg", alt: "NextDimension branded cap", span: "half" },
          { src: "/case-study/next-dimension/old-site/08-bottle.jpg", alt: "NextDimension branded bottle", span: "half" },
          { src: "/case-study/next-dimension/old-site/09-folders.jpg", alt: "NextDimension presentation folders" },
          { src: "/case-study/next-dimension/old-site/10-cards.jpg", alt: "NextDimension branded cards" },
          {
            src: "/case-study/next-dimension/old-site/11-billboard-loop.mp4",
            alt: "NextDimension animated billboard",
            kind: "video",
            overlaySrc: "/case-study/next-dimension/old-site/11-billboard-overlay.jpg",
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
    website: { label: "Visit live website", href: "https://www.foxberman.com/" },
    guidelines: { label: "Brand guidelines", href: "https://guidelines.online/foxberman" },
    preview: { src: "/portfolio/identities/forberman-bento.jpg", alt: "Fox Berman brand identity" },
    hero: {
      src: "/case-study/fox-berman/hero-logo.json",
      alt: "Animated Fox Berman logo",
      kind: "lottie",
      backgroundColor: "#f3603c",
    },
    leadGallery: [
      { src: "/case-study/fox-berman/01-logos.png", alt: "Fox Berman logo system" },
      {
        src: "/case-study/fox-berman/02-colors.mp4",
        alt: "Fox Berman color palette in motion",
        kind: "video",
      },
      { src: "/case-study/fox-berman/03-cards.jpg", alt: "Fox Berman business cards" },
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
          { src: "/case-study/fox-berman/04-website.jpg", alt: "Fox Berman website design" },
          { src: "/case-study/fox-berman/05-signature.jpg", alt: "Fox Berman email signature" },
          { src: "/case-study/fox-berman/06-signage-wall.jpg", alt: "Fox Berman wall signage", span: "half" },
          { src: "/case-study/fox-berman/07-signage-pylon.jpg", alt: "Fox Berman pylon signage", span: "half" },
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
          { src: "/case-study/fox-berman/09-folder.jpg", alt: "Fox Berman presentation folder" },
          { src: "/case-study/fox-berman/10-letterhead.jpg", alt: "Fox Berman letterhead", span: "half" },
          { src: "/case-study/fox-berman/11-letterhead-detail.jpg", alt: "Fox Berman letterhead detail", span: "half" },
          { src: "/case-study/fox-berman/12-booklet.webp", alt: "Fox Berman printed booklet" },
          { src: "/case-study/fox-berman/13-favicon.jpg", alt: "Fox Berman favicon", span: "half" },
          { src: "/case-study/fox-berman/14-pin.jpg", alt: "Fox Berman branded pin", span: "half" },
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
      avatar: { src: "/testimonials/lucas.jpeg", alt: "Lucas Berman" },
      name: "Lucas Berman",
      position: "Partner",
      companyName: "Fox Berman",
    },
    nextProject: {
      title: "Elevate",
      subheading: "A progressive identity for a Shopify testing platform built around growth",
      image: { src: "/portfolio/identities/elevate-bento.jpg", alt: "Elevate brand identity" },
      url: "/work/elevate",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
  {
    slug: "elevate",
    client: "Elevate",
    title: "A progressive identity for a Shopify testing platform built around growth",
    summary:
      "Elevate is a Shopify-native A/B testing platform that helps store owners improve performance through faster, smarter experimentation. We created an abstract growth mark and bespoke wordmark that balance technical precision with confidence and momentum, giving the brand a clear and ownable presence in the Shopify ecosystem.",
    services: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    industry: "Ecommerce technology",
    year: "2026",
    website: { label: "Visit live website", href: "https://elevateab.com/" },
    guidelines: { label: "Brand guidelines", href: "https://guidelines.online/elevate-ab" },
    preview: { src: "/portfolio/identities/elevate-bento.jpg", alt: "Elevate brand identity" },
    hero: {
      src: "/case-study/elevate/hero-logo.json",
      alt: "Animated Elevate logo",
      kind: "lottie",
      backgroundColor: "#000000",
    },
    leadGallery: [
      { src: "/case-study/elevate/01-logos.png", alt: "Elevate logo system" },
      { src: "/case-study/elevate/02-icon-set.png", alt: "Elevate icon system" },
      { src: "/case-study/elevate/03-website.jpg", alt: "Elevate website design" },
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
          { src: "/case-study/elevate/05-business-cards.jpg", alt: "Elevate business cards" },
          { src: "/case-study/elevate/06-collateral.jpg", alt: "Elevate branded collateral" },
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
          { src: "/case-study/elevate/07-envelope.jpg", alt: "Elevate branded envelope" },
          { src: "/case-study/elevate/08-id-badge.jpg", alt: "Elevate team ID badge" },
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
      avatar: { src: "/testimonials/karim-zitouni.jpg", alt: "Karim Zitouni" },
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
      { src: "/case-study/aero/02-color.png", alt: "Aero color system" },
      { src: "/case-study/aero/03-stationery.png", alt: "Aero stationery system" },
    ],
    brandSprintGallery: {
      logo: { src: "/case-study/aero-logo.png", alt: "Aero logo design" },
      typeface: { src: "/case-study/aero-fonts.png", alt: "Aero typeface" },
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
      image: { src: "/portfolio/identities/brevidee-bento.jpg", alt: "Brevidee brand identity" },
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
    website: { label: "Visit live website", href: "https://www.brevidee.com/" },
    preview: { src: "/portfolio/identities/brevidee-bento.jpg", alt: "Brevidee brand identity" },
    hero: {
      src: "/case-study/brevidee/hero-logo.json",
      alt: "Animated Brevidee logo",
      kind: "lottie",
      backgroundColor: "#f8e6e8",
    },
    leadGallery: [
      { src: "/case-study/brevidee/01-logos.png", alt: "Brevidee logo system" },
      { src: "/case-study/brevidee/02-cards.jpg", alt: "Brevidee business cards" },
      { src: "/case-study/brevidee/03-app-icon.jpg", alt: "Brevidee application icon", span: "half" },
      { src: "/case-study/brevidee/04-teacher-phone.jpg", alt: "Brevidee teacher mobile application", span: "half" },
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
          { src: "/case-study/brevidee/05-hoodie.jpg", alt: "Brevidee branded hoodie" },
          { src: "/case-study/brevidee/06-bag.jpg", alt: "Brevidee branded bag", span: "half" },
          { src: "/case-study/brevidee/07-banner.jpg", alt: "Brevidee event banner", span: "half" },
          { src: "/case-study/brevidee/08-flyers.jpg", alt: "Brevidee promotional flyers" },
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
          { src: "/case-study/brevidee/09-social.jpg", alt: "Brevidee social media design" },
          { src: "/case-study/brevidee/10-website.jpg", alt: "Brevidee website design" },
          { src: "/case-study/brevidee/11-book.jpg", alt: "Brevidee educational booklet", span: "half" },
          { src: "/case-study/brevidee/12-beanie.jpg", alt: "Brevidee branded beanie", span: "half" },
        ],
      },
    ],
    testimonial: {
      quote:
        '"After struggling to build our website on Squarespace and wasting valuable time with underwhelming designers on Upwork, we finally discovered Arek at Ebaqdesign—and what a game-changer that was. From the very start, he understood our vision, took control of the process, and delivered a brand transformation that exceeded all our expectations. The results were beyond anything we could have imagined!"',
      logo: { src: "/client-logos/brevidee-logo.svg", alt: "Brevidee", scale: 80 },
      avatar: { src: "/case-study/brevidee/alan-rudt.png", alt: "Alan Rudt" },
      name: "Alan Rudt",
      position: "Founder",
      companyName: "Brevidee",
    },
    nextProject: {
      title: "Wingnut",
      subheading: "A refined identity for a digital agency serving high-end interiors",
      image: { src: "/portfolio/identities/wingnut-bento.jpg", alt: "Wingnut brand identity" },
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
    preview: { src: "/portfolio/identities/wingnut-bento.jpg", alt: "Wingnut brand identity" },
    hero: {
      src: "/case-study/wingnut/hero-logo.json",
      alt: "Animated Wingnut logo",
      kind: "lottie",
      backgroundColor: "#77aeb1",
    },
    leadGallery: [
      { src: "/case-study/wingnut/01-logos.png", alt: "Wingnut logo system" },
      { src: "/case-study/wingnut/02-cards.jpg", alt: "Wingnut business cards" },
      { src: "/case-study/wingnut/03-website.jpg", alt: "Wingnut website design" },
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
          { src: "/case-study/wingnut/04-iphone.jpg", alt: "Wingnut mobile website", span: "half" },
          { src: "/case-study/wingnut/05-socks.jpg", alt: "Wingnut branded socks", span: "half" },
          { src: "/case-study/wingnut/06-social.jpg", alt: "Wingnut social media system" },
          { src: "/case-study/wingnut/07-macbook.jpg", alt: "Wingnut video content on a laptop" },
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
          { src: "/case-study/wingnut/08-badge.jpg", alt: "Wingnut employee badge", span: "half" },
          { src: "/case-study/wingnut/09-tote.jpg", alt: "Wingnut branded tote bag", span: "half" },
          { src: "/case-study/wingnut/10-deck.jpg", alt: "Wingnut presentation deck" },
          { src: "/case-study/wingnut/11-shirt.jpg", alt: "Wingnut branded shirt", span: "half" },
          { src: "/case-study/wingnut/12-pins.jpg", alt: "Wingnut branded pins", span: "half" },
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
      avatar: { src: "/case-study/wingnut/darla-powell.jpg", alt: "Darla Powell" },
      name: "Darla Powell",
      position: "Founder",
      companyName: "Wingnut Social",
    },
    nextProject: {
      title: "Ventur",
      subheading: "A vibrant identity for an AI travel planner built around discovery",
      image: { src: "/portfolio/identities/ventur-bento.jpg", alt: "Ventur brand identity" },
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
    website: { label: "Visit live website", href: "https://www.venturtravel.com/" },
    preview: { src: "/portfolio/identities/ventur-bento.jpg", alt: "Ventur brand identity" },
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
      { src: "/case-study/ventur/03-billboard.jpg", alt: "Ventur billboard campaign" },
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
          { src: "/case-study/ventur/04-app.jpg", alt: "Ventur mobile application", span: "half" },
          { src: "/case-study/ventur/05-cup.jpg", alt: "Ventur branded travel cup", span: "half" },
          { src: "/case-study/ventur/06-website.jpg", alt: "Ventur website design" },
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
          { src: "/case-study/ventur/07-mobile.jpg", alt: "Ventur mobile brand experience", span: "half" },
          { src: "/case-study/ventur/08-bag.jpg", alt: "Ventur branded travel bag", span: "half" },
          { src: "/case-study/ventur/09-shirt.jpg", alt: "Ventur branded shirt" },
        ],
      },
    ],
    nextProject: {
      title: "Airport Executive",
      subheading: "A sophisticated identity for a London chauffeur service built around discreet travel",
      image: { src: "/portfolio/identities/airport-executive-bento.jpg", alt: "Airport Executive brand identity" },
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
    website: { label: "Visit live website", href: "https://www.airportexecutive.com/" },
    preview: { src: "/portfolio/identities/airport-executive-bento.jpg", alt: "Airport Executive brand identity" },
    hero: {
      src: "/case-study/airport-executive/hero-logo.json",
      alt: "Animated Airport Executive logo",
      kind: "lottie",
      backgroundColor: "#000000",
    },
    leadGallery: [
      { src: "/case-study/airport-executive/01-logos.png", alt: "Airport Executive logo system" },
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
          { src: "/case-study/airport-executive/04-banner.jpg", alt: "Airport Executive campaign banner" },
          { src: "/case-study/airport-executive/05-badge.jpg", alt: "Airport Executive chauffeur badge", span: "half" },
          { src: "/case-study/airport-executive/06-app-icon.jpg", alt: "Airport Executive application icon", span: "half" },
          { src: "/case-study/airport-executive/07-website.jpg", alt: "Airport Executive website design" },
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
          { src: "/case-study/airport-executive/08-banner-detail.jpg", alt: "Airport Executive banner detail", span: "half" },
          { src: "/case-study/airport-executive/09-merchandise.jpg", alt: "Airport Executive branded merchandise", span: "half" },
          { src: "/case-study/airport-executive/10-signage.jpg", alt: "Airport Executive environmental signage" },
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
      avatar: { src: "/case-study/airport-executive/chris-nixon.jpeg", alt: "Chris Nixon" },
      name: "Chris Nixon",
      position: "Founder",
      companyName: "Airport Executive",
    },
    nextProject: {
      title: "SweetGrass",
      subheading: "A refined identity for a Southern cannabis dispensary rooted in luxury",
      image: { src: "/portfolio/identities/sweetgrass-bento.jpg", alt: "SweetGrass brand identity" },
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
    website: { label: "Visit live website", href: "https://www.sweetgrassdispensaries.com/" },
    guidelines: {
      label: "Brand guidelines",
      href: "https://indd.adobe.com/view/5b85fc9a-0e79-4ec8-8fbf-c4a28d520a96?startpage=1&allowFullscreen=true",
    },
    preview: { src: "/portfolio/identities/sweetgrass-bento.jpg", alt: "SweetGrass brand identity" },
    hero: {
      src: "/case-study/sweetgrass/hero-logo.json",
      alt: "Animated SweetGrass logo",
      kind: "lottie",
      backgroundColor: "#434343",
    },
    leadGallery: [
      { src: "/case-study/sweetgrass/01-bag.jpg", alt: "SweetGrass cannabis packaging" },
      {
        src: "/case-study/sweetgrass/02-product.mp4",
        alt: "SweetGrass product identity in motion",
        kind: "video",
      },
      { src: "/case-study/sweetgrass/03-business-cards.jpg", alt: "SweetGrass business cards" },
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
          { src: "/case-study/sweetgrass/04-dropper.jpg", alt: "SweetGrass cannabis dropper packaging" },
          { src: "/case-study/sweetgrass/05-polo.jpg", alt: "SweetGrass branded polo shirt", span: "half" },
          { src: "/case-study/sweetgrass/06-billboard.jpg", alt: "SweetGrass billboard campaign", span: "half" },
          { src: "/case-study/sweetgrass/07-billboard-2.jpg", alt: "SweetGrass outdoor advertising" },
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
          { src: "/case-study/sweetgrass/08-brochure.jpg", alt: "SweetGrass cannabis brochure", span: "half" },
          { src: "/case-study/sweetgrass/09-jar.jpg", alt: "SweetGrass cannabis jar packaging", span: "half" },
          { src: "/case-study/sweetgrass/10-bags.jpg", alt: "SweetGrass retail packaging system" },
        ],
      },
    ],
    testimonial: {
      quote: '"Arek is a magic visionary with sharp attention to detail."',
      logo: { src: "/client-logos/sweetgrass-logo-black.svg", alt: "SweetGrass", scale: 60 },
      avatar: { src: "/case-study/sweetgrass/jane-de-abreu.jpg", alt: "Jane de Abreu" },
      name: "Jane de Abreu",
      position: "Founder",
      companyName: "SweetGrass",
    },
    nextProject: {
      title: "Periti Digital",
      subheading: "A precise identity for a pan-European HubSpot consultancy built for clarity",
      image: { src: "/portfolio/identities/periti-bento.jpg", alt: "Periti Digital brand identity" },
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
    website: { label: "Visit live website", href: "https://peritidigital.com/" },
    guidelines: {
      label: "Brand guidelines",
      href: "https://indd.adobe.com/view/f088380d-7ba9-47b9-b4bb-5a881e492c73?startpage=1&allowFullscreen=true",
    },
    preview: { src: "/portfolio/identities/periti-bento.jpg", alt: "Periti Digital brand identity" },
    hero: {
      src: "/case-study/periti/hero-logo.json",
      alt: "Animated Periti Digital logo",
      kind: "lottie",
      backgroundColor: "#000000",
    },
    leadGallery: [
      { src: "/case-study/periti/01-cards.jpg", alt: "Periti Digital business cards" },
      { src: "/case-study/periti/02-macbook.jpg", alt: "Periti Digital brand on a laptop" },
      { src: "/case-study/periti/03-mug.jpg", alt: "Periti Digital branded mug" },
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
          { src: "/case-study/periti/04-letter.jpg", alt: "Periti Digital letterhead", span: "half" },
          { src: "/case-study/periti/05-website.jpg", alt: "Periti Digital website design" },
          { src: "/case-study/periti/06-hoodie.jpg", alt: "Periti Digital branded hoodie", span: "half" },
          { src: "/case-study/periti/07-social.jpg", alt: "Periti Digital social media system", span: "half" },
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
          { src: "/case-study/periti/08-stationery.jpg", alt: "Periti Digital stationery system" },
          { src: "/case-study/periti/09-flyer.jpg", alt: "Periti Digital promotional flyer", span: "half" },
          { src: "/case-study/periti/10-signature.jpg", alt: "Periti Digital email signature", span: "half" },
        ],
      },
    ],
    nextProject: {
      title: "Medihuanna",
      subheading: "A trusted identity for medicinal cannabis education built around clarity",
      image: { src: "/portfolio/identities/medihuanna-bento.jpg", alt: "Medihuanna brand identity" },
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
    website: { label: "Visit live website", href: "https://www.medihuanna.com/" },
    guidelines: {
      label: "Brand guidelines",
      href: "https://indd.adobe.com/view/9907a87c-29c2-4164-92ee-dac1551442c3?startpage=1&allowFullscreen=true",
    },
    preview: { src: "/portfolio/identities/medihuanna-bento.jpg", alt: "Medihuanna brand identity" },
    hero: {
      src: "/case-study/medihuanna/hero-logo.json",
      alt: "Animated Medihuanna logo",
      kind: "lottie",
      backgroundColor: "#11403f",
    },
    leadGallery: [
      { src: "/case-study/medihuanna/01-logos.png", alt: "Medihuanna logo system" },
      { src: "/case-study/medihuanna/02-cards.jpg", alt: "Medihuanna business cards" },
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
          { src: "/case-study/medihuanna/04-document.jpg", alt: "Medihuanna educational document", span: "half" },
          {
            src: "/case-study/medihuanna/05-social.json",
            alt: "Medihuanna social identity animation",
            kind: "lottie",
            span: "half",
          },
          { src: "/case-study/medihuanna/06-stationery.jpg", alt: "Medihuanna stationery system" },
          { src: "/case-study/medihuanna/07-bag.jpg", alt: "Medihuanna branded bag" },
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
          { src: "/case-study/medihuanna/08-billboard.jpg", alt: "Medihuanna billboard campaign" },
          { src: "/case-study/medihuanna/09-signage.jpg", alt: "Medihuanna environmental signage" },
          { src: "/case-study/medihuanna/10-logo-before.png", alt: "Medihuanna logo before redesign", span: "half" },
          { src: "/case-study/medihuanna/11-logo-after.png", alt: "Medihuanna logo after redesign", span: "half" },
        ],
      },
    ],
    testimonial: {
      quote:
        '"After several failures of using Fiverr and 99designs to handle our rebranding project, we finally found Arek and Ebaq Design who nailed it at first. There was no time wasted, Arek was very organized and methodical about his approach from the start."',
      logo: { src: "/client-logos/medihuanna-wordmark-black.svg", alt: "Medihuanna", scale: 90 },
      avatar: { src: "/case-study/medihuanna/pavel-bulkiewicz.jpeg", alt: "Pavel Bulkiewicz" },
      name: "Pavel Bulkiewicz",
      position: "Founder",
      companyName: "Medihuanna",
    },
    nextProject: {
      title: "NextDim AI",
      subheading: "A futuristic brand identity for AI-powered healthcare, beyond the clinical",
      image: { src: "/portfolio/identities/nexdim-bento.jpg", alt: "NextDim AI brand identity" },
      url: "/work/next-dimension",
      tags: ["Brand strategy", "Visual identity", "Motion", "Web design"],
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
