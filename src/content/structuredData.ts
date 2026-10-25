// Dependency-free on purpose: scripts/generate-route-shells.mjs transpiles and imports this file directly.
export type FaqPair = { question: string; answer: string };

// Must match founder.jobTitle in siteFacts.ts (this file can't import it; see the note above).
const founderJobTitle = "Branding Expert";

export type SchemaPost = {
  url: string;
  title: string;
  description?: string;
  date?: string;
  author?: string;
  body?: string;
  youtubeEmbed?: string;
  category?: string;
  tags?: string[];
  image?: { src?: string };
  seo?: { title?: string; description?: string; image?: string };
  faq?: FaqPair[];
  logoRoster?: unknown;
};

const namedEntities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201D", ldquo: "\u201C", mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", copy: "\u00A9", reg: "\u00AE", trade: "\u2122" };
const fromCodePoint = (code: number, fallback: string) => (Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : fallback);
const decodeEntities = (value: string) => value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
  if (entity[0] !== "#") return namedEntities[entity.toLowerCase()] ?? match;
  return fromCodePoint(/^#x/i.test(entity) ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10), match);
});

export const htmlToText = (html: string) => decodeEntities(html
  .replace(/<(figure|script|style|iframe)\b[\s\S]*?<\/\1\s*>/gi, " ")
  .replace(/<\/?(?:p|div|br|li|ul|ol|h[1-6]|tr|td|th|table|blockquote|section|figcaption)\b[^>]*>/gi, " ")
  .replace(/<[^<>]+>/g, ""))
  .replace(/[\u200B-\u200D\uFEFF]/g, "")
  .replace(/\s+/g, " ")
  .trim();

const faqHeadingText = /\bfaqs?\b|frequently asked|common questions/i;
const faqHeadingId = /(?:^|\s)id=(["'])(?:faqs?|questions|frequently-asked-questions)\1/i;
const cleanPair = (question: string, answer: string): FaqPair => ({ question: htmlToText(question).replace(/^Q:\s*/i, ""), answer: htmlToText(answer).replace(/^A:\s*/i, "") });
const isComplete = (pair: FaqPair) => pair.question.length > 0 && pair.answer.length > 0;
// Headings only count as questions when they read as one, so a section that merely mentions FAQs yields nothing.
const isQuestion = (pair: FaqPair) => isComplete(pair) && /\?$/.test(pair.question);

type Heading = { level: number; attributes: string; inner: string; start: number; end: number };

const extractFaqSection = (html: string, headings: Heading[], faqIndex: number): FaqPair[] => {
  const faqHeading = headings[faqIndex];
  const following = headings.slice(faqIndex + 1);
  const closingIndex = following.findIndex((heading) => heading.level <= faqHeading.level);
  const sectionEnd = closingIndex < 0 ? html.length : following[closingIndex].start;
  const sectionHeadings = closingIndex < 0 ? following : following.slice(0, closingIndex);
  if (!sectionHeadings.length) {
    // Older posts write each pair as <p><strong>Question?</strong><br>Answer</p>.
    return [...html.slice(faqHeading.end, sectionEnd).matchAll(/<p\b[^>]*>\s*<strong\b[^>]*>([\s\S]*?)<\/strong>\s*<br\s*\/?>([\s\S]*?)<\/p\s*>/gi)].map((match) => cleanPair(match[1], match[2])).filter(isQuestion);
  }
  const questionLevel = Math.min(...sectionHeadings.map((heading) => heading.level));
  return sectionHeadings.flatMap((heading, index) => {
    if (heading.level !== questionLevel) return [];
    const next = sectionHeadings.slice(index + 1).find((candidate) => candidate.level <= questionLevel);
    return [cleanPair(heading.inner, html.slice(heading.end, next ? next.start : sectionEnd))];
  }).filter(isQuestion);
};

export const extractFaqFromHtml = (html: string): FaqPair[] => {
  if (!html) return [];
  const headings: Heading[] = [...html.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1\s*>/gi)].map((match) => ({ level: Number(match[1]), attributes: match[2], inner: match[3], start: match.index ?? 0, end: (match.index ?? 0) + match[0].length }));
  const sectionLevel = headings.map((heading, index) => (heading.level === 2 || heading.level === 3 ? index : -1)).filter((index) => index >= 0);
  // An explicit id wins; otherwise the last matching heading, since FAQs close an article and earlier headings may only mention them.
  const candidates = [...sectionLevel.filter((index) => faqHeadingId.test(headings[index].attributes)), ...sectionLevel.filter((index) => !faqHeadingId.test(headings[index].attributes) && faqHeadingText.test(htmlToText(headings[index].inner))).reverse()];
  for (const index of candidates) {
    const pairs = extractFaqSection(html, headings, index);
    if (pairs.length >= 2) return pairs;
  }
  return [];
};

// A faq field is always rendered on the page, so it feeds the schema first. Roster posts build their
// visible body from the roster, so their stored body is never scanned for questions.
export const resolveFaqPairs = (post: Pick<SchemaPost, "faq" | "logoRoster">, bodyHtml: string): FaqPair[] => {
  const listed = (post.faq || []).map((item) => cleanPair(item.question, item.answer)).filter(isComplete);
  if (listed.length) return listed;
  return post.logoRoster ? [] : extractFaqFromHtml(bodyHtml);
};

export const toSchemaDate = (date?: string): string | null => {
  if (!date) return null;
  const parsed = new Date(`${date} 00:00:00 UTC`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
};

const toAbsoluteUrl = (value: string, siteUrl: string) => (/^https?:\/\//i.test(value) ? value : value.startsWith("//") ? `https:${value}` : `${siteUrl}${value.startsWith("/") ? "" : "/"}${value}`).trim().replace(/\s/g, "%20");
const firstBodyImage = (html?: string) => {
  const src = html?.match(/<img\b[^>]*?\ssrc=(["'])\s*([^"']+?)\s*\1/i)?.[2];
  return src && !/^data:/i.test(src) ? decodeEntities(src) : undefined;
};

export const buildBlogPostingSchema = (post: SchemaPost, siteUrl: string) => {
  const canonical = `${siteUrl}${post.url}`;
  const image = post.seo?.image || post.image?.src || firstBodyImage(post.body);
  const published = toSchemaDate(post.date);
  const description = post.seo?.description || post.description;
  const tags = (post.tags || []).filter(Boolean).join(", ");
  const keywords = tags.toLowerCase() === (post.category || "").toLowerCase() ? "" : tags;
  const organization = { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Ebaq Design", url: `${siteUrl}/` };
  // Posts filed under another author slug have no byline or profile page, so the studio is credited rather than the founder.
  const byFounder = !post.author || /^arek\b/i.test(post.author);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    headline: post.title.length > 110 ? `${post.title.slice(0, 109).trimEnd()}…` : post.title,
    ...(description ? { description } : {}),
    ...(image ? { image: [toAbsoluteUrl(image, siteUrl)] } : {}),
    ...(published ? { datePublished: published, dateModified: published } : {}),
    author: byFounder ? { "@type": "Person", "@id": `${siteUrl}/#founder`, name: "Arek Dvornechuck", url: `${siteUrl}/about`, jobTitle: founderJobTitle } : organization,
    publisher: { ...organization, logo: { "@type": "ImageObject", url: `${siteUrl}/ebaqdesign-logo.svg` } },
    ...(post.category ? { articleSection: post.category } : {}),
    ...(keywords ? { keywords } : {}),
    inLanguage: "en-US",
  };
};

export const buildFaqSchema = (pairs: FaqPair[], canonical?: string) => (pairs.length < 2 ? null : {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...(canonical ? { "@id": `${canonical}#faq`, isPartOf: { "@id": `${canonical}#article` } } : {}),
  mainEntity: pairs.map((pair) => ({ "@type": "Question", name: pair.question, acceptedAnswer: { "@type": "Answer", text: pair.answer } })),
});

const getYoutubeVideoId = (embedUrl?: string) => embedUrl?.match(/\/embed\/([^?&#/]+)/i)?.[1];

export const buildVideoSchema = (post: SchemaPost) => {
  const videoId = getYoutubeVideoId(post.youtubeEmbed);
  return videoId ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: post.title,
    description: post.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`],
    uploadDate: toSchemaDate(post.date) ?? post.date,
    embedUrl: post.youtubeEmbed,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
  } : null;
};

// A case study as a CreativeWork, so search engines and AI overviews can tie the project to the studio and its topics.
export const buildCaseStudySchema = (
  study: {
    slug: string;
    client: string;
    title: string;
    summary: string;
    services: string[];
    industry: string;
    year: string;
    deliverables?: string[];
    website?: { href: string };
    preview: { src: string };
    seo?: { title?: string; description?: string; keywords?: string[] };
  },
  siteUrl: string,
) => {
  const canonical = `${siteUrl}/work/${study.slug}`;
  const organization = { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Ebaq Design", url: `${siteUrl}/` };
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonical}#case-study`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    name: study.seo?.title || `${study.client}: ${study.title}`,
    headline: study.title,
    description: study.seo?.description || study.summary,
    abstract: study.summary,
    image: [toAbsoluteUrl(study.preview.src, siteUrl)],
    genre: "Brand identity case study",
    about: [
      { "@type": "Organization", name: study.client, ...(study.website?.href ? { url: study.website.href } : {}) },
      ...study.services.map((name) => ({ "@type": "Thing", name })),
    ],
    // The concrete work, so an answer engine can match "logo plus social graphics for a law firm" to this project.
    ...(study.deliverables?.length ? { hasPart: study.deliverables.map((name) => ({ "@type": "CreativeWork", name })) } : {}),
    ...(study.seo?.keywords?.length ? { keywords: study.seo.keywords.join(", ") } : {}),
    dateCreated: study.year,
    creator: organization,
    author: { "@type": "Person", "@id": `${siteUrl}/#founder`, name: "Arek Dvornechuck", url: `${siteUrl}/about`, jobTitle: founderJobTitle },
    publisher: { ...organization, logo: { "@type": "ImageObject", url: `${siteUrl}/ebaqdesign-logo.svg` } },
    audience: { "@type": "Audience", audienceType: `${study.industry} companies` },
    isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/work`, name: "Ebaq Design portfolio" },
    inLanguage: "en-US",
  };
};

export type SchemaEpisode = {
  url: string;
  title: string;
  description?: string;
  date?: string;
  episodeNumber?: number;
  guest?: string;
  image?: { src?: string };
  seo?: { title?: string; description?: string; image?: string };
  platforms?: Record<string, string | undefined>;
};

export const podcastSeries = (siteUrl: string) => ({
  "@type": "PodcastSeries",
  "@id": `${siteUrl}/podcast#series`,
  name: "On Branding Podcast",
  url: `${siteUrl}/podcast`,
  author: { "@type": "Person", "@id": `${siteUrl}/#founder`, name: "Arek Dvornechuck" },
});

// One On Branding episode: the host, the guest, and the same episode on Apple, Spotify and YouTube.
export const buildPodcastEpisodeSchema = (episode: SchemaEpisode, siteUrl: string) => {
  const canonical = `${siteUrl}${episode.url}`;
  const image = episode.seo?.image || episode.image?.src;
  const published = toSchemaDate(episode.date?.replace(/^\w{3} (\w{3} \d{1,2} \d{4}).*$/, "$1"));
  const { audio, ...platforms } = episode.platforms || {};
  // Google Podcasts shut down in 2024, so links to it are dropped.
  const listenOn = Object.values(platforms).filter((url): url is string => typeof url === "string" && /^https?:\/\//.test(url) && !url.includes("podcasts.google.com"));
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `${canonical}#episode`,
    url: canonical,
    name: episode.seo?.title || episode.title,
    description: episode.seo?.description || episode.description,
    ...(episode.episodeNumber ? { episodeNumber: episode.episodeNumber } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(image ? { image: toAbsoluteUrl(image, siteUrl) } : {}),
    partOfSeries: podcastSeries(siteUrl),
    author: { "@type": "Person", "@id": `${siteUrl}/#founder`, name: "Arek Dvornechuck", url: `${siteUrl}/about`, jobTitle: founderJobTitle },
    ...(episode.guest ? { contributor: { "@type": "Person", name: episode.guest } } : {}),
    ...(listenOn.length ? { sameAs: listenOn } : {}),
    ...(audio && /^https?:\/\//.test(audio) ? { associatedMedia: { "@type": "AudioObject", contentUrl: audio } } : {}),
    inLanguage: "en-US",
  };
};

// An index page (blog, work, podcast) as a CollectionPage listing its items in order.
export const buildCollectionSchema = (
  page: { path: string; name: string; description: string; about?: Record<string, unknown> },
  items: { name: string; path: string }[],
  siteUrl: string,
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}${page.path}#collection`,
  url: `${siteUrl}${page.path}`,
  name: page.name,
  description: page.description,
  isPartOf: { "@id": `${siteUrl}/#website` },
  publisher: { "@id": `${siteUrl}/#organization` },
  ...(page.about ? { about: page.about } : {}),
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${siteUrl}${item.path}` })),
  },
  inLanguage: "en-US",
});

// A digital product from the shop: its price as an offer, sold by the studio.
export const buildProductSchema = (
  product: { slug: string; title: string; description: string; price: string; image: string; seo?: { description?: string; image?: string } },
  siteUrl: string,
) => {
  const url = `${siteUrl}/shop/${product.slug}`;
  const price = product.price.replace(/[^0-9.]/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    description: product.seo?.description || product.description,
    image: toAbsoluteUrl(product.seo?.image || product.image, siteUrl),
    url,
    brand: { "@type": "Brand", name: "Ebaq Design" },
    category: "Digital download",
    ...(price ? {
      offers: {
        "@type": "Offer",
        url,
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${siteUrl}/#organization` },
      },
    } : {}),
  };
};

export const buildBreadcrumbSchema = (items: { name: string; path: string }[], siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })),
});

// The studio, its founder, the website and the priced offers as one graph. Built from
// src/content/siteFacts.ts (passed in, so this file stays dependency-free) and placed on the homepage.
type Facts = typeof import("./siteFacts");

export const buildSiteGraph = (facts: Facts, faqs: FaqPair[], dateModified: string) => {
  const { siteUrl, studio, founder, pricing, brandSprint, weekPlan, industries } = facts;
  const organizationId = `${siteUrl}/#organization`;
  const founderId = `${siteUrl}/#founder`;
  const offer = (id: string, name: string, description: string, price: number, unitText?: string) => ({
    "@type": "Offer",
    "@id": `${siteUrl}/#${id}`,
    name,
    description,
    price: String(price),
    priceCurrency: pricing.currency,
    ...(unitText ? { priceSpecification: { "@type": "UnitPriceSpecification", price: String(price), priceCurrency: pricing.currency, unitText } } : {}),
    url: `${siteUrl}/#pricing`,
    availability: "https://schema.org/InStock",
    seller: { "@id": organizationId },
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: studio.name,
        description: facts.positioning,
        publisher: { "@id": organizationId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: "Branding Expert NYC | Branding & Web | Ebaq Design",
        description: `${pricing.guarantee} ${pricing.summary}`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": organizationId },
        dateModified,
        inLanguage: "en-US",
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: studio.name,
        legalName: studio.legalName,
        alternateName: studio.alternateNames,
        url: `${siteUrl}/`,
        logo: `${siteUrl}${studio.logo}`,
        image: `${siteUrl}${studio.image}`,
        description: `${facts.positioning} ${pricing.summary} ${pricing.guarantee}`,
        slogan: "Good design is good business",
        email: studio.email,
        telephone: studio.telephone,
        priceRange: `${pricing.weekly} per week`,
        currenciesAccepted: pricing.currency,
        address: {
          "@type": "PostalAddress",
          streetAddress: studio.address.street,
          addressLocality: studio.address.locality,
          addressRegion: studio.address.region,
          postalCode: studio.address.postalCode,
          addressCountry: studio.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: studio.geo.latitude, longitude: studio.geo.longitude },
        areaServed: [
          { "@type": "City", name: "New York City" },
          { "@type": "AdministrativeArea", name: "Brooklyn" },
          { "@type": "Country", name: "United States" },
          { "@type": "Place", name: "Worldwide" },
        ],
        knowsAbout: founder.knowsAbout,
        audience: industries.map((audienceType) => ({ "@type": "BusinessAudience", audienceType })),
        founder: { "@id": founderId },
        employee: { "@id": founderId },
        sameAs: studio.sameAs,
        makesOffer: [
          {
            ...offer("brand-sprint-offer", brandSprint.name, `${brandSprint.description} Includes: ${brandSprint.deliverables.join(", ")}.`, pricing.weeklyRate),
            itemOffered: {
              "@type": "Service",
              name: "Brand Identity Design Sprint",
              serviceType: "Brand identity design",
              description: pricing.guarantee,
              provider: { "@id": organizationId },
              areaServed: "Worldwide",
            },
          },
          offer("weekly-offer", "Weekly design engagement", pricing.summary, pricing.weeklyRate, "WEEK"),
          offer("monthly-offer", "Monthly design partnership", "Ongoing brand, web, and motion work for growing teams.", pricing.monthlyRate, "MONTH"),
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Branding, motion, and web design, priced per week",
          itemListElement: weekPlan.map((step) => ({
            "@type": "Offer",
            name: `${step.weeks}: ${step.name}`,
            description: step.detail,
            priceSpecification: { "@type": "PriceSpecification", price: step.price.replace(/[^0-9]/g, ""), priceCurrency: pricing.currency },
            itemOffered: { "@type": "Service", name: step.name, provider: { "@id": organizationId } },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: founder.name,
        jobTitle: founder.jobTitle,
        description: `${founder.jobTitle} in ${studio.location} with ${founder.experience} of experience, specializing in ${founder.knowsAbout.slice(1, 8).join(", ").toLowerCase()}. Previously at ${founder.formerStudio.name} (${founder.formerStudio.year}).`,
        hasOccupation: {
          "@type": "Occupation",
          name: "Graphic Designer",
          occupationalCategory: "27-1024.00 Graphic Designers",
          occupationLocation: { "@type": "City", name: "New York City" },
          skills: founder.knowsAbout.join(", "),
        },
        image: `${siteUrl}${founder.image}`,
        url: `${siteUrl}/about`,
        worksFor: { "@id": organizationId },
        alumniOf: { "@type": "Organization", name: founder.formerStudio.name, url: founder.formerStudio.url },
        homeLocation: { "@type": "Place", name: studio.location },
        knowsAbout: founder.knowsAbout,
        sameAs: founder.sameAs,
      },
      ...(faqs.length >= 2 ? [{
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        isPartOf: { "@id": `${siteUrl}/#webpage` },
        mainEntity: faqs.map((pair) => ({ "@type": "Question", name: pair.question, acceptedAnswer: { "@type": "Answer", text: pair.answer } })),
      }] : []),
    ],
  };
};

export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
