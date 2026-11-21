import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import type { IconType } from "react-icons";
import { BiCheck, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import {
  LuBuilding2,
  LuCheck,
  LuCopy,
  LuDownload,
  LuFileText,
  LuLayers,
  LuLink,
  LuMonitor,
  LuPenTool,
  LuPlay,
  LuPrinter,
  LuRotateCcw,
  LuSend,
  LuSparkles,
  LuTarget,
  LuUpload,
  LuUsers,
} from "react-icons/lu";
import { bookingUrl, pricing, siteUrl, type FactFaq } from "../content/siteFacts";
import { buildBreadcrumbSchema, serializeJsonLd } from "../content/structuredData";
import { requestBookingToken } from "../conversionAttribution";
import { Cta17 } from "./Cta17";
import { Faq4 } from "./Faq4";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { ToolReading } from "./ToolReading";

const pageUrl = `${siteUrl}/tools/creative-brief-generator`;
const pageTitle = "Creative Brief Generator: Build a Brand & Design Brief in 60s | Ebaq Design";
const pageDescription = "Build a structured branding, logo, or website creative brief in 60 seconds with simple visual prompts. Copy as Markdown, save as PDF, or send directly for a fixed-price quote.";

type ScopeId = "strategy" | "logo" | "identity" | "rebrand" | "website" | "motion";
type StageId = "scratch" | "outgrew" | "pivot" | "dated";
type AudienceId = "founders" | "saas" | "enterprise" | "luxury" | "services" | "consumer";
type StyleId = "minimal" | "bold" | "editorial" | "technical" | "warm" | "playful";
type PlatformId = "framer" | "webflow" | "nextjs" | "figma" | "unsure";
type TimelineId = "asap" | "month" | "quarter" | "planning";
type BudgetId = "sprint" | "brand-web" | "full" | "unsure";

const scopeOptions: { id: ScopeId; name: string; detail: string; weeks: number; service: string; Icon: IconType }[] = [
  { id: "strategy", name: "Brand strategy", detail: "Audience, positioning, messaging pillars, and creative direction.", weeks: 1, service: "Brand Strategy", Icon: LuTarget },
  { id: "logo", name: "Logo design", detail: "Custom mark, horizontal/stacked lockups, and final vector files.", weeks: 1, service: "Logo Design", Icon: LuPenTool },
  { id: "identity", name: "Full brand identity", detail: "Logo, color palette, typography, guidelines, and launch mockups.", weeks: 1, service: "Brand Design", Icon: LuLayers },
  { id: "rebrand", name: "Brand refresh / rebrand", detail: "Modernize or rebuild an identity that no longer fits your growth.", weeks: 1, service: "Brand Design", Icon: LuSparkles },
  { id: "website", name: "Website design & build", detail: "High-converting marketing site designed in Figma and built cleanly.", weeks: 2, service: "Web Design", Icon: LuMonitor },
  { id: "motion", name: "Motion & launch assets", detail: "Logo animation, animated social posts, and pitch deck visuals.", weeks: 1, service: "Motion Graphics", Icon: LuPlay },
];

const stageOptions: { id: StageId; name: string; detail: string }[] = [
  { id: "scratch", name: "Launching from scratch", detail: "Pre-launch or stealth—building the brand right from day one." },
  { id: "outgrew", name: "Outgrew our DIY brand", detail: "Traction is real, and we need to look credible for clients or investors." },
  { id: "pivot", name: "Rebranding or pivoting", detail: "New market, merged company, or major product shift." },
  { id: "dated", name: "Established, looking dated", detail: "Strong reputation, but the visuals and website lag behind." },
];

const audienceOptions: { id: AudienceId; name: string; detail: string }[] = [
  { id: "founders", name: "Founders & B2B decision-makers", detail: "CEOs, VPs, and operators buying high-trust solutions." },
  { id: "saas", name: "Tech, SaaS & AI users", detail: "Product-led buyers who judge software by craft and clarity." },
  { id: "enterprise", name: "Enterprise & corporate", detail: "Multi-stakeholder teams looking for authority and reliability." },
  { id: "luxury", name: "Luxury & high-net-worth", detail: "Discerning buyers drawn to restraint, taste, and detail." },
  { id: "services", name: "Professional services clients", detail: "Law, finance, consulting, healthcare, or real estate." },
  { id: "consumer", name: "Everyday consumers (DTC)", detail: "Retail, lifestyle, or consumer products needing shelf recall." },
];

const styleOptions: { id: StyleId; name: string; detail: string; swatches: [string, string, string] }[] = [
  { id: "minimal", name: "Minimal & Swiss", detail: "Crisp grids, sharp sans-serif type, zero clutter.", swatches: ["bg-black", "bg-white", "bg-brand-primary"] },
  { id: "bold", name: "Bold & Disruptive", detail: "High contrast, confident color, impossible to ignore.", swatches: ["bg-black", "bg-brand-yellow", "bg-[#C8344B]"] },
  { id: "editorial", name: "Editorial & Luxury", detail: "Refined typography, generous whitespace, calm authority.", swatches: ["bg-stone-900", "bg-[#F4F1EA]", "bg-[#B89B5E]"] },
  { id: "technical", name: "Technical & Modern", detail: "Precision geometry, dark/mono cues, AI/SaaS edge.", swatches: ["bg-neutral-950", "bg-brand-primary", "bg-neutral-200"] },
  { id: "warm", name: "Warm & Approachable", detail: "Human, tactile, friendly, and immediately trustworthy.", swatches: ["bg-emerald-950", "bg-[#F9EECE]", "bg-[#6CB181]"] },
  { id: "playful", name: "Playful & Expressive", detail: "Energetic shapes, motion-first, memorable personality.", swatches: ["bg-brand-primary", "bg-[#F9E0E9]", "bg-brand-yellow"] },
];

const deliverableChoices = [
  "Custom logo & variations (SVG/PNG/PDF)",
  "Logo animation",
  "Online brand guidelines",
  "Color palette & typography system",
  "Landing page",
  "Multi-page marketing website",
  "Pitch deck / sales collateral",
  "Social media launch kit",
  "Stationery / print / packaging",
];

const platformOptions: { id: PlatformId; name: string; detail: string }[] = [
  { id: "framer", name: "Framer", detail: "Fast launches, rich motion, easy edits." },
  { id: "webflow", name: "Webflow", detail: "Content-heavy sites, strong CMS, scale." },
  { id: "nextjs", name: "Next.js / React", detail: "Custom code, web apps, full flexibility." },
  { id: "figma", name: "Figma design only", detail: "Our team will handle development." },
  { id: "unsure", name: "Recommend for me", detail: "Help us choose the right fit on a call." },
];

const timelineOptions: { id: TimelineId; name: string; detail: string }[] = [
  { id: "asap", name: "ASAP (1–2 weeks)", detail: "Launching, fundraising, or announcing soon." },
  { id: "month", name: "This month (3–4 weeks)", detail: "Ready to kick off in the next couple of weeks." },
  { id: "quarter", name: "Next 1–3 months", detail: "Planning scope and locking in the right partner." },
  { id: "planning", name: "Just exploring", detail: "Putting thoughts together before getting quotes." },
];

const budgetOptions: { id: BudgetId; name: string; detail: string }[] = [
  { id: "sprint", name: "$3,000 (1-week Brand Sprint)", detail: "Focused senior sprint: logo, identity, guidelines & animation." },
  { id: "brand-web", name: "$6,000–$10,000", detail: "Brand identity plus website design & build or a full month." },
  { id: "full", name: "$10,000+", detail: "Full brand strategy, visual system, motion, and multi-page site." },
  { id: "unsure", name: "Not sure yet", detail: "Show me a transparent estimate based on my scope." },
];

const goalChips = [
  "Look credible before fundraising",
  "Win higher-ticket clients",
  "Launch a new product cleanly",
  "Unify scattered visuals & messaging",
  "Replace an outdated website",
];

const steps = [
  { id: "scope", label: "Scope", skippable: false },
  { id: "stage", label: "Stage", skippable: true },
  { id: "audience", label: "Audience", skippable: true },
  { id: "style", label: "Direction", skippable: true },
  { id: "deliverables", label: "Deliverables", skippable: true },
  { id: "logistics", label: "Timeline", skippable: true },
  { id: "context", label: "Context", skippable: true },
] as const;

const faqs: FactFaq[] = [
  { question: "What should a good creative brief include?", answer: "A clear creative brief covers five essentials: what you are building, why now, who the audience is, the visual and verbal direction, and concrete deliverables with timeline and budget. This generator turns simple clicks into all five in under a minute." },
  { question: "Do I have to type everything out?", answer: "No. Every step works with quick visual selections—and you can skip any step you are unsure about—so you can finish in 60 seconds without staring at a blank page." },
  { question: "Can I use this brief with any designer or agency?", answer: "Yes. You can copy the brief as clean Markdown, download it as a file, or print/save it as a PDF—no email required. If you want a fixed-price quote from me directly, you can send it straight from the results screen." },
  { question: "How is the Ebaqdesign estimate calculated?", answer: `Every scope maps to my published flat rate of ${pricing.weekly} per week (${pricing.monthly} per 4-week month booked upfront). We confirm the exact week count and fixed total on a 15-minute call before work starts.` },
  { question: "Is anything uploaded or shared automatically?", answer: "No. Everything stays in your browser while you build the brief. It is only sent to me if you explicitly submit the optional “Send brief to Arek” form at the end." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#webapp`,
    url: pageUrl,
    name: "Creative Brief Generator",
    description: pageDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: pricing.currency },
    provider: { "@id": `${siteUrl}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  },
  buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Creative Brief Generator", path: "/tools/creative-brief-generator" }], siteUrl),
];

const usd = (value: number) => `$${value.toLocaleString("en-US")}`;
const priceFor = (weeks: number) => Math.floor(weeks / 4) * pricing.monthlyRate + (weeks % 4) * pricing.weeklyRate;
const weekLabel = (weeks: number) => `${weeks} week${weeks === 1 ? "" : "s"}`;

// Rounded cards use <label> + visually hidden <input> so they inherit crisp rounded-xl card geometry
// rather than global pill-button radius rules.
const optionCard = (active: boolean) =>
  `flex cursor-pointer items-start gap-4 rounded-xl border p-5 text-left transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-primary ${
    active ? "border-brand-primary bg-brand-light/60 text-black" : "border-black/20 bg-white text-black hover:border-black"
  }`;

const encodeBriefParam = (data: Record<string, unknown>) => {
  try {
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch {
    return "";
  }
};

const decodeBriefParam = (raw: string): Record<string, unknown> | null => {
  try {
    const padded = raw.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((raw.length + 3) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const CreativeBriefGeneratorPage = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [scopes, setScopes] = useState<ScopeId[]>(["identity"]);
  const [stage, setStage] = useState<StageId>("outgrew");
  const [audiences, setAudiences] = useState<AudienceId[]>(["founders"]);
  const [styles, setStyles] = useState<StyleId[]>([]);
  const [deliverables, setDeliverables] = useState<string[]>([
    "Custom logo & variations (SVG/PNG/PDF)",
    "Color palette & typography system",
    "Online brand guidelines",
  ]);
  const [platform, setPlatform] = useState<PlatformId>("framer");
  const [timeline, setTimeline] = useState<TimelineId>("month");
  const [budget, setBudget] = useState<BudgetId>("sprint");

  const [company, setCompany] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [investmentReady, setInvestmentReady] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ kind: "idle" | "ok" | "error"; text: string }>({ kind: "idle", text: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = new URLSearchParams(window.location.search).get("brief");
    if (!raw) return;
    const parsed = decodeBriefParam(raw);
    if (!parsed) return;
    if (Array.isArray(parsed.scopes) && parsed.scopes.length) setScopes(parsed.scopes as ScopeId[]);
    if (typeof parsed.stage === "string") setStage(parsed.stage as StageId);
    if (Array.isArray(parsed.audiences) && parsed.audiences.length) setAudiences(parsed.audiences as AudienceId[]);
    if (Array.isArray(parsed.styles)) setStyles(parsed.styles as StyleId[]);
    if (Array.isArray(parsed.deliverables)) setDeliverables(parsed.deliverables as string[]);
    if (typeof parsed.platform === "string") setPlatform(parsed.platform as PlatformId);
    if (typeof parsed.timeline === "string") setTimeline(parsed.timeline as TimelineId);
    if (typeof parsed.budget === "string") setBudget(parsed.budget as BudgetId);
    if (typeof parsed.company === "string") setCompany(parsed.company);
    if (typeof parsed.websiteUrl === "string") setWebsiteUrl(parsed.websiteUrl);
    if (Array.isArray(parsed.goals)) setGoals(parsed.goals as string[]);
    if (typeof parsed.notes === "string") setNotes(parsed.notes);
    setDone(true);
  }, []);

  const toggleRequired = <T,>(list: T[], setList: (next: T[]) => void, value: T) => {
    if (list.includes(value)) {
      if (list.length === 1) return;
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const toggleOptional = <T,>(list: T[], setList: (next: T[]) => void, value: T, max?: number) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else if (max && list.length >= max) {
      setList([...list.slice(1), value]);
    } else {
      setList([...list, value]);
    }
  };

  const skipStep = () => {
    if (step === 3) setStyles([]);
    if (step < steps.length - 1) setStep((current) => current + 1);
    else setDone(true);
  };

  // Logo + Full Identity + Rebrand share the same 1-week Brand Sprint foundation when combined.
  const hasBrandFoundation = scopes.some((id) => id === "logo" || id === "identity" || id === "rebrand");
  const estimatedWeeks =
    (hasBrandFoundation ? 1 : 0) +
    (scopes.includes("strategy") ? 1 : 0) +
    (scopes.includes("motion") ? 1 : 0) +
    (scopes.includes("website") ? (platform === "figma" ? 1 : 2) : 0);
  const effectiveWeeks = Math.max(1, estimatedWeeks);
  const estimatedPrice = priceFor(effectiveWeeks);
  const monthlySaving = effectiveWeeks * pricing.weeklyRate - estimatedPrice;

  const chosenScopes = scopeOptions.filter((item) => scopes.includes(item.id));
  const chosenStage = stageOptions.find((item) => item.id === stage)!;
  const chosenAudiences = audienceOptions.filter((item) => audiences.includes(item.id));
  const chosenStyles = styleOptions.filter((item) => styles.includes(item.id));
  const chosenPlatform = platformOptions.find((item) => item.id === platform)!;
  const chosenTimeline = timelineOptions.find((item) => item.id === timeline)!;
  const chosenBudget = budgetOptions.find((item) => item.id === budget)!;

  const projectName = company.trim() || "Untitled Brand Project";
  const agencyRange = effectiveWeeks >= 3 ? "$25,000–$100,000+ · 3–9 months" : effectiveWeeks === 2 ? "$15,000–$45,000 · 2–4 months" : "$10,000–$25,000 · 6–12 weeks";

  const styleSummary = chosenStyles.length
    ? `The visual and verbal direction should feel ${chosenStyles.map((s) => s.name.toLowerCase()).join(", ")},`
    : "Visual direction and palette are open to designer recommendations,";

  const executiveSummary = `${projectName} (${chosenStage.name.toLowerCase()}) is seeking ${chosenScopes
    .map((s) => s.name.toLowerCase())
    .join(", ")} aimed at ${chosenAudiences.map((a) => a.name.toLowerCase()).join(" and ")}. ${styleSummary} targeting a ${chosenTimeline.name.toLowerCase()} timeline.`;

  const briefMarkdown = [
    `# Creative Brief: ${projectName}`,
    websiteUrl.trim() ? `Website: ${websiteUrl.trim()}` : null,
    `Generated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    "",
    "## Executive Summary",
    executiveSummary,
    "",
    "## Project Scope",
    ...chosenScopes.map((s) => `- ${s.name}: ${s.detail}`),
    "",
    "## Current Stage & Objectives",
    `- Stage: ${chosenStage.name} — ${chosenStage.detail}`,
    ...(goals.length ? goals.map((g) => `- Goal: ${g}`) : []),
    "",
    "## Target Audience",
    ...chosenAudiences.map((a) => `- ${a.name}: ${a.detail}`),
    "",
    "## Visual Direction & Tone",
    ...(chosenStyles.length ? chosenStyles.map((s) => `- ${s.name}: ${s.detail}`) : ["- Open to designer recommendations"]),
    "",
    "## Deliverables",
    ...(deliverables.length ? deliverables.map((d) => `- ${d}`) : ["- Core deliverables to be confirmed on kickoff"]),
    ...(scopes.includes("website") ? [`- Preferred website platform: ${chosenPlatform.name} (${chosenPlatform.detail})`] : []),
    "",
    "## Timeline, Budget & Estimate",
    `- Target timeline: ${chosenTimeline.name}`,
    `- Budget comfort: ${chosenBudget.name}`,
    `- Ebaqdesign estimate: ${usd(estimatedPrice)} (${weekLabel(effectiveWeeks)} at ${pricing.weekly}/wk${monthlySaving > 0 ? `, includes ${usd(monthlySaving)} monthly savings` : ""})`,
    `- Typical agency range: ${agencyRange}`,
    ...(notes.trim() || uploadedFileName
      ? ["", "## Additional Context", ...(uploadedFileName ? [`Attached reference file: ${uploadedFileName}`] : []), ...(notes.trim() ? [notes.trim()] : [])]
      : []),
  ]
    .filter((line) => line !== null)
    .join("\n");

  const encodedBrief = encodeBriefParam({
    scopes,
    stage,
    audiences,
    styles,
    deliverables,
    platform,
    timeline,
    budget,
    company: company.trim(),
    websiteUrl: websiteUrl.trim(),
    goals,
    notes: notes.trim().slice(0, 600),
  });
  const shareUrl = `${siteUrl}/tools/creative-brief-generator${encodedBrief ? `?brief=${encodedBrief}` : ""}`;

  const copyShareLink = async () => {
    const liveUrl = typeof window !== "undefined" ? `${window.location.origin}/tools/creative-brief-generator${encodedBrief ? `?brief=${encodedBrief}` : ""}` : shareUrl;
    if (typeof window !== "undefined" && encodedBrief) window.history.replaceState(null, "", `?brief=${encodedBrief}`);
    await navigator.clipboard?.writeText(liveUrl).catch(() => {});
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 1600);
  };

  const handleFileUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploadedFileName(file.name);
    const isPlainText = /\.(txt|md|markdown|csv|json)$/i.test(file.name) || file.type.startsWith("text/");
    if (isPlainText) {
      const content = (await file.text()).trim().slice(0, 2500);
      if (content) setNotes((current) => (current.trim() ? `${current.trim()}\n\n--- ${file.name} ---\n${content}` : content));
      return;
    }
    setNotes((current) => {
      const note = `Reference document noted: ${file.name} (attach or share link during follow-up).`;
      return current.includes(file.name) ? current : current.trim() ? `${current.trim()}\n\n${note}` : note;
    });
  };

  const copyBrief = async () => {
    await navigator.clipboard?.writeText(briefMarkdown).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const downloadBrief = () => {
    const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "creative-brief";
    const blob = new Blob([briefMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug}-creative-brief.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const sendToArek = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!investmentReady) {
      setSendStatus({ kind: "error", text: "Sorry, I can’t accept projects below $3,000 per week." });
      return;
    }
    setSending(true);
    setSendStatus({ kind: "idle", text: "" });
    const services = [...new Set(chosenScopes.map((s) => s.service))];
    const messageBody = `${executiveSummary}\n\nShareable brief link:\n${shareUrl}\n\n${briefMarkdown}`.slice(0, 4950);
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      services: services.length ? services : ["Brand Design"],
      investment: true,
      message: messageBody,
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(response.status === 404 ? "local-dev" : "Delivery failed");
      const calendar = new URL(bookingUrl);
      calendar.searchParams.set("name", `${payload.firstName} ${payload.lastName}`.trim());
      calendar.searchParams.set("email", payload.email);
      calendar.searchParams.set("notes", `${executiveSummary}\n\nBrief: ${shareUrl}`.slice(0, 1200));
      calendar.searchParams.set("Ready", "true");
      const token = await requestBookingToken("contact");
      if (token) calendar.searchParams.set("metadata[ebaq_click]", token);
      setSendStatus({ kind: "ok", text: "Your brief is sent—redirecting you to book a 15-minute call…" });
      window.location.assign(calendar.toString());
    } catch (error) {
      const isLocalDev = error instanceof Error && error.message === "local-dev";
      setSendStatus({
        kind: "error",
        text: isLocalDev
          ? "Local Vite dev doesn’t run /api/contact (it sends live on Vercel just like /contact). On production this emails Arek and redirects straight to Cal.com."
          : "Your brief couldn’t be sent. Please email arek@ebaqdesign.com or try again.",
      });
      setSending(false);
    }
  };

  const resetAll = () => {
    setStep(0);
    setDone(false);
    setSendStatus({ kind: "idle", text: "" });
  };

  const progressWidths = ["w-[14%]", "w-[29%]", "w-[43%]", "w-[57%]", "w-[71%]", "w-[86%]", "w-full"];
  const progressWidth = done ? "w-full" : progressWidths[step] ?? "w-full";

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Creative Brief Generator: Build a Brand &amp; Design Brief in 60s | Ebaq Design</title>
        <meta name="description" content="Build a structured branding, logo, or website creative brief in 60 seconds with simple visual prompts. Copy as Markdown, save as PDF, or send directly for a fixed-price quote." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {schemas.map((schema) => (
          <script key={schema["@type"]} type="application/ld+json">{serializeJsonLd(schema)}</script>
        ))}
      </Helmet>
      <Navbar16 />
      <main>
        <section className="bg-surface-muted px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container">
            <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
              <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Free tool</p>
              <h1 className="heading-h1 mb-4 md:mb-5">Creative brief generator</h1>
              <p className="md:text-md text-black/80">
                Hiring for branding, a logo, or a new website? Turn scattered thoughts into a crisp, studio-ready creative brief in 60 seconds—mostly by clicking.
              </p>
            </header>

            {!done ? (
              <div className="mx-auto max-w-3xl rounded-xl border border-black/20 bg-white p-6 md:p-10">
                <div className="mb-8">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-wide text-brand-primary">
                      Step {step + 1} of {steps.length} · {steps[step].label}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wide text-black/60">
                      Est. {usd(estimatedPrice)} · {weekLabel(effectiveWeeks)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                    <div className={`h-full bg-brand-primary transition-all duration-300 ${progressWidth}`} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {steps.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setStep(idx)}
                        className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                          idx === step
                            ? "border-brand-primary bg-brand-light font-semibold text-black"
                            : idx < step
                              ? "border-black/20 bg-white text-black hover:border-black"
                              : "border-black/10 bg-white text-black/50 hover:border-black/30"
                        }`}
                      >
                        {idx + 1}. {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {step === 0 && (
                  <div>
                    <h2 className="heading-h4 mb-2">What are we creating?</h2>
                    <p className="mb-6 text-sm text-black/65">Select everything you need—you can combine multiple services.</p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {scopeOptions.map(({ id, name, detail, Icon }) => {
                        const active = scopes.includes(id);
                        return (
                          <label key={id} className={optionCard(active)}>
                            <input type="checkbox" className="sr-only" checked={active} onChange={() => toggleRequired(scopes, setScopes, id)} />
                            <Icon aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${active ? "text-brand-primary" : "text-black/70"}`} />
                            <span className="grid flex-1 gap-1">
                              <span className="heading-h7">{name}</span>
                              <span className="text-sm text-black/65">{detail}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="heading-h4 mb-2">Where is the business right now?</h2>
                    <p className="mb-6 text-sm text-black/65">Pick the closest match so the brief explains the “why now.”</p>
                    <div className="grid gap-3.5">
                      {stageOptions.map((option) => {
                        const active = stage === option.id;
                        return (
                          <label key={option.id} className={optionCard(active)}>
                            <input
                              type="radio"
                              name="stage"
                              className="sr-only"
                              checked={active}
                              onChange={() => {
                                setStage(option.id);
                                setStep(2);
                              }}
                            />
                            <LuBuilding2 aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${active ? "text-brand-primary" : "text-black/70"}`} />
                            <span className="grid flex-1 gap-1">
                              <span className="heading-h7">{option.name}</span>
                              <span className="text-sm text-black/65">{option.detail}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="heading-h4 mb-2">Who are you trying to win over?</h2>
                    <p className="mb-6 text-sm text-black/65">Pick one or more primary buyer groups.</p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {audienceOptions.map((option) => {
                        const active = audiences.includes(option.id);
                        return (
                          <label key={option.id} className={optionCard(active)}>
                            <input type="checkbox" className="sr-only" checked={active} onChange={() => toggleRequired(audiences, setAudiences, option.id)} />
                            <LuUsers aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${active ? "text-brand-primary" : "text-black/70"}`} />
                            <span className="grid flex-1 gap-1">
                              <span className="heading-h7">{option.name}</span>
                              <span className="text-sm text-black/65">{option.detail}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="heading-h4 mb-2">Pick up to 3 visual &amp; tone directions</h2>
                    <p className="mb-6 text-sm text-black/65">Choose the aesthetic energy that fits your brand—or hit Skip to leave it open to recommendations.</p>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {styleOptions.map((option) => {
                        const active = styles.includes(option.id);
                        return (
                          <label key={option.id} className={optionCard(active)}>
                            <input type="checkbox" className="sr-only" checked={active} onChange={() => toggleOptional(styles, setStyles, option.id, 3)} />
                            <span className="grid flex-1 gap-2">
                              <span className="flex items-center justify-between gap-3">
                                <span className="heading-h7">{option.name}</span>
                                <span className="flex items-center gap-1" aria-hidden="true">
                                  {option.swatches.map((swatch, idx) => (
                                    <span key={`${option.id}-${idx}`} className={`size-3.5 rounded-full border border-black/20 ${swatch}`} />
                                  ))}
                                </span>
                              </span>
                              <span className="text-sm text-black/65">{option.detail}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="grid gap-8">
                    <div>
                      <h2 className="heading-h4 mb-2">Key deliverables</h2>
                      <p className="mb-5 text-sm text-black/65">Tap the assets you expect in the final handoff.</p>
                      <div className="flex flex-wrap gap-2.5">
                        {deliverableChoices.map((item) => {
                          const active = deliverables.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleOptional(deliverables, setDeliverables, item)}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                                active ? "border-brand-primary bg-brand-light text-black" : "border-black/20 bg-white text-black hover:border-black"
                              }`}
                            >
                              {active && <LuCheck aria-hidden="true" className="size-4 text-brand-primary" />}
                              <span>{item}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {scopes.includes("website") && (
                      <div className="border-t border-black/10 pt-6">
                        <h3 className="heading-h6 mb-3">Preferred website platform</h3>
                        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                          {platformOptions.map((option) => (
                            <label key={option.id} className={optionCard(platform === option.id)}>
                              <input type="radio" name="platform" className="sr-only" checked={platform === option.id} onChange={() => setPlatform(option.id)} />
                              <span className="grid gap-1">
                                <span className="heading-h7">{option.name}</span>
                                <span className="text-sm text-black/65">{option.detail}</span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="grid gap-8">
                    <div>
                      <h2 className="heading-h4 mb-2">Target timeline</h2>
                      <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        {timelineOptions.map((option) => (
                          <label key={option.id} className={optionCard(timeline === option.id)}>
                            <input type="radio" name="timeline" className="sr-only" checked={timeline === option.id} onChange={() => setTimeline(option.id)} />
                            <span className="grid gap-1">
                              <span className="heading-h7">{option.name}</span>
                              <span className="text-sm text-black/65">{option.detail}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-black/10 pt-6">
                      <h3 className="heading-h5 mb-2">Budget comfort</h3>
                      <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        {budgetOptions.map((option) => (
                          <label key={option.id} className={optionCard(budget === option.id)}>
                            <input type="radio" name="budget" className="sr-only" checked={budget === option.id} onChange={() => setBudget(option.id)} />
                            <span className="grid gap-1">
                              <span className="heading-h7">{option.name}</span>
                              <span className="text-sm text-black/65">{option.detail}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="grid gap-6">
                    <div>
                      <h2 className="heading-h4 mb-2">Optional context</h2>
                      <p className="text-sm text-black/65">
                        Skip straight to your brief, or drop in your company name, quick goals, or scattered notes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="grid gap-1.5 text-sm font-semibold">
                        Company or project name
                        <input
                          type="text"
                          value={company}
                          onChange={(event) => setCompany(event.target.value)}
                          placeholder="e.g. Acme Labs"
                          className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-normal focus:border-black focus:outline-none"
                        />
                      </label>
                      <label className="grid gap-1.5 text-sm font-semibold">
                        Current website (optional)
                        <input
                          type="url"
                          value={websiteUrl}
                          onChange={(event) => setWebsiteUrl(event.target.value)}
                          placeholder="https://yourcompany.com"
                          className="rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-normal focus:border-black focus:outline-none"
                        />
                      </label>
                    </div>

                    <div>
                      <p className="mb-2.5 text-sm font-semibold">Main goal (tap any)</p>
                      <div className="flex flex-wrap gap-2">
                        {goalChips.map((chip) => {
                          const active = goals.includes(chip);
                          return (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => toggleOptional(goals, setGoals, chip)}
                              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                                active ? "border-brand-primary bg-brand-light text-black" : "border-black/20 bg-white text-black hover:border-black"
                              }`}
                            >
                              {chip}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <label htmlFor="brief-notes" className="text-sm font-semibold">
                          Scattered notes, competitors, or links (optional)
                        </label>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3 py-1 text-xs font-semibold text-black hover:border-black"
                        >
                          <LuUpload aria-hidden="true" className="size-3.5" />
                          <span>{uploadedFileName ? `Added: ${uploadedFileName}` : "Drop / upload .txt, .md, or .pdf"}</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".txt,.md,.markdown,.csv,.pdf"
                          className="hidden"
                          onChange={(event) => void handleFileUpload(event.target.files?.[0])}
                        />
                      </div>
                      <textarea
                        id="brief-notes"
                        rows={4}
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        placeholder="Paste rough notes from Notion, Slack, or a pitch deck—or leave blank."
                        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-normal focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(0, current - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black disabled:opacity-40"
                  >
                    <BiLeftArrowAlt className="size-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>

                  <div className="flex items-center gap-3">
                    {steps[step].skippable && (
                      <button
                        type="button"
                        onClick={skipStep}
                        className="rounded-full border border-black/20 bg-white px-4 py-2.5 text-sm font-semibold text-black/75 transition-colors hover:border-black hover:text-black"
                      >
                        Skip
                      </button>
                    )}

                    {step < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((current) => current + 1)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-background-alternative px-6 py-2.5 text-sm font-semibold text-text-alternative"
                      >
                        <span>Continue</span>
                        <BiRightArrowAlt className="size-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDone(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-background-alternative px-6 py-3 text-sm font-semibold text-text-alternative"
                      >
                        <LuFileText aria-hidden="true" className="size-4" />
                        <span>Generate creative brief</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
                <article className="rounded-xl border border-black/20 bg-white p-6 md:p-10">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-black/15 pb-6">
                    <div>
                      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-brand-primary">Creative Brief</p>
                      <h2 className="heading-h3 mb-1">{projectName}</h2>
                      {websiteUrl.trim() && <p className="text-sm text-black/60">{websiteUrl.trim()}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2 print:hidden">
                      <button
                        type="button"
                        onClick={copyShareLink}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:border-black"
                      >
                        {linkCopied ? <LuCheck className="size-3.5 text-brand-primary" /> : <LuLink className="size-3.5" />}
                        <span>{linkCopied ? "Link copied" : "Copy link"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={copyBrief}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:border-black"
                      >
                        {copied ? <LuCheck className="size-3.5 text-brand-primary" /> : <LuCopy className="size-3.5" />}
                        <span>{copied ? "Copied" : "Copy Markdown"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={downloadBrief}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:border-black"
                      >
                        <LuDownload className="size-3.5" />
                        <span>Download .md</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:border-black"
                      >
                        <LuPrinter className="size-3.5" />
                        <span>Save PDF</span>
                      </button>
                      <button
                        type="button"
                        onClick={resetAll}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:border-black"
                      >
                        <LuRotateCcw className="size-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    <div>
                      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-black/60">Executive summary</p>
                      <p className="md:text-md text-black">{executiveSummary}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 border-t border-black/10 pt-6 md:grid-cols-2">
                      <div>
                        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-black/60">Current stage &amp; goals</p>
                        <p className="mb-2 font-semibold">{chosenStage.name}</p>
                        <p className="text-sm text-black/75">{chosenStage.detail}</p>
                        {goals.length > 0 && (
                          <ul className="mt-3 grid gap-1.5">
                            {goals.map((g) => (
                              <li key={g} className="flex items-start gap-2 text-sm">
                                <BiCheck className="mt-0.5 size-4 shrink-0 text-brand-primary" />
                                <span>{g}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-black/60">Target audience</p>
                        <ul className="grid gap-2">
                          {chosenAudiences.map((a) => (
                            <li key={a.id} className="text-sm">
                              <strong>{a.name}:</strong> <span className="text-black/75">{a.detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 border-t border-black/10 pt-6 md:grid-cols-2">
                      <div>
                        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-black/60">Visual &amp; verbal direction</p>
                        {chosenStyles.length > 0 ? (
                          <div className="grid gap-2.5">
                            {chosenStyles.map((s) => (
                              <div key={s.id} className="rounded-xl bg-surface-muted p-3.5">
                                <div className="mb-1 flex items-center justify-between gap-2">
                                  <span className="text-sm font-semibold">{s.name}</span>
                                  <span className="flex gap-1" aria-hidden="true">
                                    {s.swatches.map((swatch, idx) => (
                                      <span key={`${s.id}-${idx}`} className={`size-3 rounded-full border border-black/20 ${swatch}`} />
                                    ))}
                                  </span>
                                </div>
                                <p className="text-xs text-black/70">{s.detail}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-black/75">Open to designer recommendations based on positioning and audience.</p>
                        )}
                      </div>

                      <div>
                        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-black/60">Scope &amp; deliverables</p>
                        <ul className="grid gap-2">
                          {deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm">
                              <BiCheck className="mt-0.5 size-4 shrink-0 text-brand-primary" />
                              <span>{d}</span>
                            </li>
                          ))}
                          {scopes.includes("website") && (
                            <li className="flex items-start gap-2 text-sm">
                              <BiCheck className="mt-0.5 size-4 shrink-0 text-brand-primary" />
                              <span>Website platform: <strong>{chosenPlatform.name}</strong></span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 rounded-xl border border-brand-primary/30 bg-brand-light p-5 sm:grid-cols-3">
                      <div>
                        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-black/60">Target timeline</p>
                        <p className="text-sm font-semibold">{chosenTimeline.name}</p>
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-black/60">Ebaqdesign estimate</p>
                        <p className="text-sm font-semibold">
                          {usd(estimatedPrice)} · {weekLabel(effectiveWeeks)}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-black/60">Typical agency range</p>
                        <p className="text-sm font-semibold">{agencyRange}</p>
                      </div>
                    </div>

                    {(notes.trim() || uploadedFileName) && (
                      <div className="border-t border-black/10 pt-6">
                        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-black/60">Additional context</p>
                        {uploadedFileName && <p className="mb-2 font-mono text-xs text-black/60">Reference file: {uploadedFileName}</p>}
                        {notes.trim() && <p className="whitespace-pre-wrap text-sm text-black/80">{notes.trim()}</p>}
                      </div>
                    )}
                  </div>
                </article>

                <aside className="grid gap-6 lg:sticky lg:top-24 print:hidden">
                  <div className="rounded-xl bg-black p-6 text-white md:p-7">
                    <p className="mb-2 font-mono text-xs uppercase tracking-wide text-brand-primary">Get a fixed quote</p>
                    <h3 className="heading-h5 mb-2 text-white">Send this brief to Arek</h3>
                    <p className="mb-5 text-sm text-white/75">
                      I’ll review your brief personally and reply within 1 business day with exact weeks and a fixed total—no account managers.
                    </p>

                    {sendStatus.kind === "ok" ? (
                      <div className="rounded-xl border border-brand-primary/40 bg-white/10 p-4 text-sm text-white">
                        <p className="font-semibold text-brand-primary">Brief received</p>
                        <p className="mt-1 text-white/85">{sendStatus.text}</p>
                      </div>
                    ) : (
                      <form onSubmit={sendToArek} className="grid gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            placeholder="First name"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-brand-primary focus:outline-none"
                          />
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            placeholder="Last name"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-brand-primary focus:outline-none"
                          />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Work email"
                          className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-brand-primary focus:outline-none"
                        />
                        <label className="flex cursor-pointer items-start gap-2.5 text-xs text-white/75">
                          <input
                            type="checkbox"
                            required
                            checked={investmentReady}
                            onChange={(event) => setInvestmentReady(event.target.checked)}
                            className="mt-0.5 size-4 shrink-0 accent-brand-primary"
                          />
                          <span>My budget starts at $3,000+ for senior design execution.</span>
                        </label>
                        {sendStatus.kind === "error" && <p className="text-xs text-red-400">{sendStatus.text}</p>}
                        <button
                          type="submit"
                          disabled={sending}
                          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white disabled:opacity-50"
                        >
                          <LuSend aria-hidden="true" className="size-4" />
                          <span>{sending ? "Sending brief…" : "Send brief to Arek"}</span>
                        </button>
                      </form>
                    )}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>

        <ToolReading
          links={[
            { label: "Design cost calculator", href: "/tools/design-cost-calculator" },
            { label: "Brand grader", href: "/tools/brand-grader" },
            { label: "Branding glossary", href: "/glossary" },
          ]}
        />
        <Faq4 tagline="FAQs" heading="Creative brief questions" questions={faqs.map(({ question, answer }) => ({ title: question, answer }))} />
        <Cta17 heading="Ready to turn your brief into a brand?" description="Book a 15-minute call. We confirm scope, weeks, and a fixed price before work starts." />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
