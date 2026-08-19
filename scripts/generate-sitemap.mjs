import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const canonicalOrigin = "https://ebaqdesign.com";

const publicStaticRoutes = [
  "/",
  "/about",
  "/start",
  "/work",
  "/blog",
  "/podcast",
  "/shop",
  "/law-firm-branding",
  "/startup-redesign-lab",
  "/glassmorphism-web-design",
  "/cybersecurity-startup-web-design",
  "/healthcare-startup-web-design",
];

const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));

const readSlugs = async (path) => {
  const source = await readFile(resolve(root, path), "utf8");
  return [...source.matchAll(/^\s{4}slug:\s*["']([^"']+)["']/gm)].map((match) => match[1]);
};

const normalizeIndex = (index) => {
  if (Array.isArray(index)) return index;
  const collection = Object.values(index).find(Array.isArray);
  if (!collection) throw new Error("Content index does not contain an array");
  return collection;
};

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const [caseStudySlugs, shopSlugs, blogIndex, podcastIndex] = await Promise.all([
  readSlugs("src/data/caseStudies.ts"),
  readSlugs("src/data/shopProducts.ts"),
  readJson("public/content/blog/index.json"),
  readJson("public/content/podcast/index.json"),
]);

const routes = [
  ...publicStaticRoutes,
  ...caseStudySlugs.map((slug) => `/work/${slug}`),
  ...shopSlugs.map((slug) => `/shop/${slug}`),
  ...normalizeIndex(blogIndex).map(({ slug }) => `/blog/${slug}`),
  ...normalizeIndex(podcastIndex).map(({ slug }) => `/podcast/${slug}`),
];

const uniqueRoutes = [...new Set(routes)].sort((a, b) => a.localeCompare(b));
if (uniqueRoutes.length !== routes.length) {
  throw new Error(`Duplicate sitemap routes found: ${routes.length - uniqueRoutes.length}`);
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...uniqueRoutes.map((route) => `  <url><loc>${escapeXml(`${canonicalOrigin}${route}`)}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

await writeFile(resolve(root, "public/sitemap.xml"), xml);
console.log(`Generated public/sitemap.xml with ${uniqueRoutes.length} unique URLs.`);
