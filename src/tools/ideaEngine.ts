// The built-in generators behind the tagline and brand name tools. They run in the browser and
// need no API key; /api/generate-ideas replaces them with AI results when a key is configured.
// Both take a seed, so "Generate more" gives a different, repeatable set.

export type Idea = { text: string; explanation: string };

const random = (seed: number) => () => {
  // mulberry32
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const shuffled = <T,>(items: readonly T[], next: () => number) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const other = Math.floor(next() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};
const clean = (value: string) => value.trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
const lower = (value: string) => { const text = clean(value); return text.charAt(0).toLowerCase() + text.slice(1); };
const upper = (value: string) => { const text = clean(value); return text.charAt(0).toUpperCase() + text.slice(1); };

// ---------------------------------------------------------------- Taglines

// `logos` are files in /public/tools, cropped to the artwork. `sizes` gives each one a width and height
// that cover about the same area, so wide wordmarks and square marks look equally large. `brands` names them.
export const taglineTypes = [
  { id: "imperative", name: "Imperative", description: "Commands action, usually starting with a verb.", examples: "Just Do It. Think Different. Open Happiness.", logos: ["/tools/tagline-types/imperative.svg"], sizes: [[91, 57]], brands: ["Nike"] },
  { id: "descriptive", name: "Descriptive", description: "Says what the product, service, or promise is.", examples: "Imagination at Work. Expect More. Pay Less.", logos: ["/tools/tagline-types/descriptive.svg"], sizes: [[101, 51]], brands: ["GE"] },
  { id: "superlative", name: "Superlative", description: "Claims to be the best or the only one.", examples: "The Ultimate Driving Machine. King of Beers.", logos: ["/tools/tagline-types/superlative.svg"], sizes: [[66, 60]], brands: ["BMW"] },
  { id: "provocative", name: "Provocative", description: "Asks a question or makes people think.", examples: "Impossible Is Nothing. Got Milk?", logos: ["/tools/tagline-types/provocative.svg"], sizes: [[73, 60]], brands: ["Adidas"] },
  { id: "specific", name: "Specific", description: "Focuses on one feature or benefit.", examples: "We Have the Meats. Love the Skin You’re In.", logos: ["/tools/tagline-types/specific.svg"], sizes: [[103, 51]], brands: ["Arby’s"] },
] as const;
export type TaglineType = typeof taglineTypes[number]["id"];
export type TaglineInput = { type: TaglineType; brand: string; offer: string; audience: string; benefit: string };

// {b}/{B} benefit, {o}/{O} offer, {a} audience; capital letters start a sentence.
const taglineTemplates: Record<TaglineType, { why: string; lines: string[] }> = {
  imperative: { why: "Tells the customer what to do, which makes the benefit feel within reach.", lines: ["{B}.", "{B}. Starting today.", "Stop waiting. {B}.", "Go ahead. {B}.", "{B}, the easy way.", "Make it simple. {B}.", "{B}. No excuses.", "Do less. {B}.", "{B} and don’t look back.", "Just {b}.", "Start here. {B}.", "{B}. Then do it again."] },
  descriptive: { why: "Explains what you offer and who it is for, so nobody has to guess.", lines: ["{O} for {a}.", "{O} that helps {a} {b}.", "The {o} built for {a}.", "{O}, made for {a}.", "Helping {a} {b}.", "{O} so you can {b}.", "Where {a} {b}.", "{O} for {a} who want to {b}.", "Simple {o} for {a}.", "Your {o}, sorted.", "{O} that works the way {a} do.", "Everything {a} need to {b}."] },
  superlative: { why: "Stakes a claim to first place. Use it only if you can back it up.", lines: ["The easiest way to {b}.", "The fastest way to {b}.", "Nothing helps {a} {b} like this.", "The {o} {a} trust most.", "Simply the best way to {b}.", "The smartest {o} for {a}.", "No one helps {a} {b} better.", "The last {o} you will need.", "The only {o} made just for {a}.", "First choice for {a}.", "The best {o}. By far.", "{O} at its best."] },
  provocative: { why: "Opens a question in the customer’s mind that your brand answers.", lines: ["What if you could {b}?", "Ready to {b}?", "Why wait to {b}?", "Still trying to {b} the hard way?", "Who says {a} can’t {b}?", "What would change if you could {b}?", "Tired of {o} that doesn’t deliver?", "Isn’t it time to {b}?", "{B}? Yes, really.", "Think {a} can’t {b}? Think again.", "What are you waiting for?", "Is your {o} holding you back?"] },
  specific: { why: "Puts one benefit front and center, which makes it easy to remember.", lines: ["{B}. That is all we do.", "One job: help {a} {b}.", "{O}. Made to {b}.", "Built to {b}.", "{B}, every time.", "{O} with one goal: {b}.", "For {a}. To {b}.", "{B}. Nothing else.", "All about helping you {b}.", "{O}, focused on {a}.", "{B}. Done.", "Made for one thing: to {b}."] },
};

export const generateTaglines = ({ type, brand, offer, audience, benefit }: TaglineInput, seed: number, count = 12): Idea[] => {
  const values: Record<string, string> = { b: lower(benefit), B: upper(benefit), o: lower(offer), O: upper(offer), a: lower(audience) };
  const { why, lines } = taglineTemplates[type];
  const name = clean(brand);
  return shuffled(lines, random(seed)).slice(0, count).map((line, index) => {
    const text = line.replace(/\{([bBoOa])\}/g, (_, key: string) => values[key]);
    // Every third line carries the brand name, when one was given.
    return { text: name && index % 3 === 2 ? `${name}. ${text}` : text, explanation: why };
  });
};

// ---------------------------------------------------------------- Brand names

export const nameTypes = [
  { id: "descriptive", name: "Descriptive", description: "Literally describes the product or service.", examples: "Whole Foods, American Airlines, Pizza Hut, PayPal, Bank of America.", logos: ["/tools/name-styles/descriptive-1.svg", "/tools/name-styles/descriptive-2.svg", "/tools/name-styles/descriptive-3.svg", "/tools/name-styles/descriptive-4.svg", "/tools/name-styles/descriptive-5.svg"], sizes: [[58, 40], [82, 32], [50, 40], [88, 30], [80, 33]], brands: ["Whole Foods", "American Airlines", "Pizza Hut", "PayPal", "Bank of America"] },
  { id: "suggestive", name: "Suggestive", description: "Hints at an idea about the product without being literal.", examples: "Uber, LinkedIn, Facebook, Slack, Grubhub.", logos: ["/tools/name-styles/suggestive-1.svg", "/tools/name-styles/suggestive-2.svg", "/tools/name-styles/suggestive-3.svg", "/tools/name-styles/suggestive-4.svg", "/tools/name-styles/suggestive-5.svg"], sizes: [[87, 30], [103, 25], [112, 22], [101, 26], [112, 23]], brands: ["Uber", "LinkedIn", "Facebook", "Slack", "Grubhub"] },
  { id: "associative", name: "Associative", description: "Borrows an image or a value the brand wants to stand for.", examples: "Amazon, Apple, Tesla, Oracle, Nike.", logos: ["/tools/name-styles/associative-1.svg", "/tools/name-styles/associative-2.svg", "/tools/name-styles/associative-3.svg", "/tools/name-styles/associative-4.svg", "/tools/name-styles/associative-5.svg"], sizes: [[93, 28], [33, 40], [112, 11], [112, 15], [71, 37]], brands: ["Amazon", "Apple", "Tesla", "Oracle", "Nike"] },
  { id: "foreign", name: "Foreign", description: "Uses a word or a sound from another language.", examples: "Lacoste, Gucci, Samsung, IKEA, Toyota.", logos: ["/tools/name-styles/foreign-1.svg", "/tools/name-styles/foreign-2.svg", "/tools/name-styles/foreign-3.svg", "/tools/name-styles/foreign-4.svg", "/tools/name-styles/foreign-5.svg"], sizes: [[74, 35], [112, 18], [112, 17], [112, 21], [99, 26]], brands: ["Lacoste", "Gucci", "Samsung", "IKEA", "Toyota"] },
  { id: "abstract", name: "Abstract", description: "Has no clear meaning, and sounds good.", examples: "Kodak, Rolex, Sony, Adidas, Häagen-Dazs.", logos: ["/tools/name-styles/abstract-1.svg", "/tools/name-styles/abstract-2.svg", "/tools/name-styles/abstract-3.svg", "/tools/name-styles/abstract-4.svg", "/tools/name-styles/abstract-5.svg"], sizes: [[101, 26], [68, 38], [112, 20], [60, 40], [74, 35]], brands: ["Kodak", "Rolex", "Sony", "Adidas", "Häagen-Dazs"] },
  { id: "invented", name: "Invented", description: "A made-up or respelled word.", examples: "Kleenex, Xerox, Google, Coca-Cola, Verizon.", logos: ["/tools/name-styles/invented-1.svg", "/tools/name-styles/invented-2.svg", "/tools/name-styles/invented-3.svg", "/tools/name-styles/invented-4.svg", "/tools/name-styles/invented-5.svg"], sizes: [[72, 36], [112, 23], [89, 29], [91, 29], [108, 24]], brands: ["Kleenex", "Xerox", "Google", "Coca-Cola", "Verizon"] },
] as const;
export type NameType = typeof nameTypes[number]["id"];
export type NameInput = { type: NameType; description: string };

const stopWords = new Set(["the", "and", "for", "with", "that", "this", "our", "your", "their", "from", "into", "are", "who", "what", "have", "has", "help", "helps", "make", "makes", "sell", "sells", "provide", "provides", "offer", "offers", "company", "business", "brand", "service", "services", "product", "products", "small", "new", "based", "people", "about", "software", "app", "apps", "platform", "online", "digital", "solution", "solutions", "agency", "tool", "tools", "shop", "store", "local", "best", "quality"]);
// "invoicing" becomes "invoice" and "designers" becomes "designer", so names are built on the base word.
const base = (word: string) => {
  let stem = word;
  if (stem.length > 5 && stem.endsWith("ies")) stem = `${stem.slice(0, -3)}y`;
  else if (stem.length > 4 && stem.endsWith("s") && !stem.endsWith("ss")) stem = stem.slice(0, -1);
  if (stem.length > 6 && stem.endsWith("ing")) {
    stem = stem.slice(0, -3);
    if (stem.at(-1) === stem.at(-2)) stem = stem.slice(0, -1);
    else if (/[cvz]$/.test(stem) || /[^aeiou][aeiou][^aeiouwxy]$/.test(stem)) stem = `${stem}e`;
  }
  return stem;
};
export const keywordsFrom = (description: string) => [...new Set((description.toLowerCase().match(/[a-z]{3,}/g) ?? []).filter((word) => !stopWords.has(word)).map(base))].filter((word) => !stopWords.has(word)).slice(0, 5);
const title = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const suffixWords = ["Works", "Lab", "Studio", "Supply", "Collective", "Partners", "Group", "Hub", "House", "Guild", "Made", "Co"];
const suggestive: [string, string][] = [["Summit", "reaching the top"], ["Beacon", "guidance"], ["Anchor", "stability"], ["Ember", "warmth that lasts"], ["Compass", "direction"], ["Harbor", "safety"], ["Catalyst", "change"], ["Keystone", "the piece that holds everything together"], ["Bloom", "growth"], ["Forge", "making things"], ["Atlas", "carrying the load"], ["Signal", "clarity"], ["Lantern", "showing the way"], ["Tide", "momentum"], ["Root", "a solid foundation"], ["Spark", "a beginning"], ["Orbit", "reach"], ["Canopy", "shelter"], ["Meridian", "the high point"], ["Kindred", "belonging"]];
const foreign: [string, string, string][] = [["Lumen", "light", "Latin"], ["Vero", "true", "Italian"], ["Nova", "new", "Latin"], ["Kaizen", "steady improvement", "Japanese"], ["Alma", "soul", "Spanish"], ["Sisu", "grit", "Finnish"], ["Vida", "life", "Spanish"], ["Terra", "earth", "Latin"], ["Kumo", "cloud", "Japanese"], ["Sol", "sun", "Spanish"], ["Mira", "look", "Spanish"], ["Ikigai", "a reason for being", "Japanese"], ["Verde", "green", "Italian"], ["Fuerte", "strong", "Spanish"], ["Dolce", "sweet", "Italian"], ["Lux", "light", "Latin"], ["Primo", "first", "Italian"], ["Sora", "sky", "Japanese"], ["Fika", "a coffee break with friends", "Swedish"], ["Claro", "clear", "Spanish"]];
const imagePrefixes = ["North", "Blue", "Bright", "Wild", "Iron", "Open", "High", "True"];
const imageNouns = ["Fox", "Oak", "Wave", "Peak", "Kite", "Owl", "Pine", "Stone", "Loop", "Nest"];
const onsets = ["z", "k", "v", "l", "m", "n", "t", "s", "r", "br", "tr", "kr", "fl", "pl", "d"];
const vowels = ["a", "e", "i", "o", "u"];
const endings = ["a", "o", "ia", "io", "ix", "on", "ex", "ra", "va", "eo"];
const twists: ((word: string) => string)[] = [
  (word) => `${word}ly`, (word) => `${word.replace(/[aeiou]$/, "")}ify`, (word) => `${word.replace(/[aeiou]$/, "")}io`, (word) => `${word.replace(/[aeiou]$/, "")}ora`,
  (word) => word.replace(/([^aeiou])e(r)$/, "$1$2"), (word) => `${word.replace(/[aeiou]$/, "")}ex`, (word) => word.replace(/c(?=[aou]|$)/g, "k").replace(/ph/g, "f"),
  (word) => `${word.replace(/[aeiou]$/, "")}a`, (word) => `${word.replace(/[aeiou]$/, "")}ium`, (word) => `${word.replace(/[aeiou]$/, "")}eo`,
];

export const generateNames = ({ type, description }: NameInput, seed: number, count = 30): Idea[] => {
  // The description is part of the seed, so two businesses do not get the same abstract names.
  const next = random(seed * 7919 + [...description].reduce((sum, letter) => (sum * 31 + letter.charCodeAt(0)) | 0, 0));
  const pick = <T,>(items: readonly T[]) => items[Math.floor(next() * items.length)];
  const words = keywordsFrom(description);
  const keys = words.length ? words : ["brand"];
  const ideas = new Map<string, string>();
  const add = (text: string, explanation: string) => { if (!ideas.has(text)) ideas.set(text, explanation); };

  for (let attempt = 0; ideas.size < count && attempt < 200; attempt++) {
    const key = pick(keys);
    if (type === "descriptive") {
      if (keys.length > 1 && next() < 0.3) { const other = pick(keys.filter((word) => word !== key)); add(`${title(key)} & ${title(other)}`, `Names the two things you do: ${key} and ${other}.`); }
      else { const suffix = pick(suffixWords); add(`${title(key)} ${suffix}`, `Says what you do (${key}) and what kind of business it is.`); }
    } else if (type === "suggestive") {
      const [word, idea] = pick(suggestive); add(word, `A real word that suggests ${idea}.`);
    } else if (type === "foreign") {
      const [word, meaning, language] = pick(foreign); add(word, `Means “${meaning}” in ${language}.`);
    } else if (type === "associative") {
      if (next() < 0.5) { const image = pick(imagePrefixes); add(`${image}${title(key)}`, `Pairs “${key}” with an image people can picture: ${image.toLowerCase()}.`); }
      else { const image = pick(imageNouns); add(`${title(key)}${image}`, `Pairs “${key}” with an image people can picture: a ${image.toLowerCase()}.`); }
    } else if (type === "abstract") {
      const word = `${pick(onsets)}${pick(vowels)}${pick(onsets)}${pick(endings)}`; add(title(word), "An invented sound with no built-in meaning, so the brand can define it.");
    } else {
      const word = pick(twists)(key); if (word !== key && word.length >= 4) add(title(word), `A twist on “${key}” that is easier to own than the plain word.`);
    }
  }
  return [...ideas].map(([text, explanation]) => ({ text, explanation }));
};
