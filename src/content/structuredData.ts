// Dependency-free on purpose: scripts/generate-route-shells.mjs transpiles and imports this file directly.
export type FaqPair = { question: string; answer: string };

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

// A faq field is only rendered on the page for non-roster posts, so only then may it feed the schema.
export const resolveFaqPairs = (post: Pick<SchemaPost, "faq" | "logoRoster">, bodyHtml: string): FaqPair[] => {
  const listed = post.logoRoster ? [] : (post.faq || []).map((item) => cleanPair(item.question, item.answer)).filter(isComplete);
  return listed.length ? listed : extractFaqFromHtml(bodyHtml);
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
    author: byFounder ? { "@type": "Person", "@id": `${siteUrl}/#founder`, name: "Arek Dvornechuck", url: `${siteUrl}/about`, jobTitle: "Senior Brand Designer" } : organization,
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

export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
