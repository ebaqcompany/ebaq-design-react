import { useEffect, useState } from "react";
import { LuCheck, LuCopy, LuDownload, LuPin, LuPinOff } from "react-icons/lu";
import type { Idea } from "../tools/ideaEngine";
import { TextLink } from "./TextLink";

// The form and result list shared by the tagline and brand name generators, following the flow of
// the original Tagliner and Brand Namer apps: pick a style from logo cards, describe the business,
// fine-tune (creativity, length, words to avoid), then pin, copy, or download the results.
// It asks /api/generate-ideas first and falls back to the page's built-in generator when that
// endpoint is not configured, fails, or takes too long, so the tool always returns ideas.

type Field = { id: string; label: string; placeholder: string; multiline?: boolean; optional?: boolean; max: number };
export type IdeaType = { id: string; name: string; description: string; examples: string; logos: readonly string[]; sizes: readonly (readonly [number, number])[]; brands: readonly string[] };
type Length = { id: string; label: string; min: number; max: number };
export type IdeaGeneratorProps = {
  kind: "tagline" | "name";
  noun: string;
  styleLabel: string;
  types: readonly IdeaType[];
  fields: Field[];
  // Lengths are counted in `unit`; the middle option is the default.
  unit: "characters" | "words";
  lengths: Length[];
  describe: (values: Record<string, string>) => { description: string; brand?: string };
  fallback: (type: string, values: Record<string, string>, seed: number) => Idea[];
  note: string;
  nextStep: { heading: string; body: string; link: { label: string; href: string } };
};

const input = "w-full rounded-xl border border-black/20 bg-white px-4 py-3 font-normal focus:border-black focus:outline-none";
const pill = (active: boolean) => `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? "border-brand-primary bg-brand-light" : "border-black/20 bg-white hover:border-black"}`;
const iconButton = "flex size-10 flex-none items-center justify-center rounded-full border border-black/20 hover:border-black";
const creativityLabels = ["Safe", "Careful", "Balanced", "Bold", "Wild"];

// Shows one logo at a time and moves to the next every few seconds, each card slightly out of step.
export const LogoCycle = ({ logos, sizes, brands, offset = 0 }: Pick<IdeaType, "logos" | "sizes" | "brands"> & { offset?: number }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (logos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => { interval = setInterval(() => setIndex((current) => (current + 1) % logos.length), 3000); }, offset * 400);
    return () => { clearTimeout(start); if (interval) clearInterval(interval); };
  }, [logos.length, offset]);
  // The box keeps the tallest logo's height, so the card does not move when the logo changes.
  return (
    <span className={`flex items-center ${logos.length > 1 ? "h-10" : "h-16"}`}>
      <img src={logos[index]} alt={`${brands[index]} logo`} width={sizes[index][0]} height={sizes[index][1]} loading="lazy" decoding="async" className="block max-w-full" />
    </span>
  );
};

const fromApi = async (body: object): Promise<Idea[] | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const response = await fetch("/api/generate-ideas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: controller.signal });
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data?.ideas) && data.ideas.length ? data.ideas : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

export const IdeaGenerator = ({ kind, noun, styleLabel, types, fields, unit, lengths, describe, fallback, note, nextStep }: IdeaGeneratorProps) => {
  const [type, setType] = useState(types[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [creativity, setCreativity] = useState(3);
  const [length, setLength] = useState(lengths[Math.floor(lengths.length / 2)].id);
  const [avoid, setAvoid] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [seen, setSeen] = useState<Idea[]>([]);
  const [pinned, setPinned] = useState<Idea[]>([]);
  const [round, setRound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const storageKey = `ebaq-${kind}-pinned`;
  const ready = fields.every(({ id, optional }) => optional || (values[id] ?? "").trim().length >= 2);
  const range = lengths.find(({ id }) => id === length)!;

  // Pinned ideas survive a reload. Storage can be unavailable (private windows), so both sides are guarded.
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]"); if (Array.isArray(saved)) setPinned(saved); } catch { /* start empty */ }
  }, [storageKey]);
  const savePinned = (next: Idea[]) => { setPinned(next); try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* keep in memory */ } };
  const togglePin = (idea: Idea) => savePinned(pinned.some(({ text }) => text === idea.text) ? pinned.filter(({ text }) => text !== idea.text) : [...pinned, idea]);

  const generate = async () => {
    setLoading(true);
    const shown = seen.map(({ text }) => text);
    const avoided = avoid.toLowerCase().split(/[,\n]/).map((word) => word.trim()).filter(Boolean);
    const size = (text: string) => (unit === "words" ? text.trim().split(/\s+/).length : text.length);
    const local = () => {
      const fresh = fallback(type, values, round + 1).filter(({ text }) => !shown.includes(text) && !avoided.some((word) => text.toLowerCase().includes(word)));
      const fitting = fresh.filter(({ text }) => size(text) >= range.min && size(text) <= range.max);
      return [...fitting, ...fresh.filter((idea) => !fitting.includes(idea))].slice(0, 9);
    };
    const next = (await fromApi({ kind, type, ...describe(values), creativity, length: { min: range.min, max: range.max, unit }, avoid, exclude: shown })) ?? local();
    setIdeas(next);
    setSeen([...seen, ...next.filter(({ text }) => !shown.includes(text))]);
    setRound(round + 1);
    setLoading(false);
  };
  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(text); } catch { setCopied(""); }
  };
  const download = () => {
    const cell = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const all = [...pinned, ...seen.filter(({ text }) => !pinned.some((idea) => idea.text === text))];
    const rows = [["Pinned", noun === "names" ? "Name" : "Tagline", "Why it works"], ...all.map((idea) => [pinned.includes(idea) ? "Yes" : "", idea.text, idea.explanation])];
    const url = URL.createObjectURL(new Blob([rows.map((row) => row.map(cell).join(",")).join("\n")], { type: "text/csv" }));
    const link = Object.assign(document.createElement("a"), { href: url, download: `ebaq-design-${noun}.csv` });
    link.click();
    URL.revokeObjectURL(url);
  };

  const row = (idea: Idea) => {
    const isPinned = pinned.some(({ text }) => text === idea.text);
    return (
      <li key={idea.text} className={`flex items-start justify-between gap-3 rounded-xl border p-4 ${isPinned ? "border-brand-primary bg-brand-light" : "border-black/20"}`}>
        <div>
          <p className="heading-h6">{idea.text}</p>
          <p className="mt-1 text-sm text-black/60">{idea.explanation}</p>
        </div>
        <div className="flex flex-none gap-2">
          <button type="button" onClick={() => togglePin(idea)} aria-pressed={isPinned} aria-label={`${isPinned ? "Unpin" : "Pin"} ${idea.text}`} className={iconButton}>
            {isPinned ? <LuPinOff aria-hidden="true" className="size-4" /> : <LuPin aria-hidden="true" className="size-4" />}
          </button>
          <button type="button" onClick={() => void copy(idea.text)} aria-label={`Copy ${idea.text}`} className={iconButton}>
            {copied === idea.text ? <LuCheck aria-hidden="true" className="size-4" /> : <LuCopy aria-hidden="true" className="size-4" />}
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="w-full rounded-xl border border-black/20 bg-white p-6 md:p-8">
      <form className="grid gap-8" onSubmit={(event) => { event.preventDefault(); if (ready && !loading) void generate(); }}>
        <fieldset>
          <legend className="heading-h7 mb-3">1. Pick a {styleLabel}</legend>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {types.map(({ id, name, description, logos, sizes, brands }, index) => (
              <label key={id} className="flex cursor-pointer flex-col gap-3 rounded-xl border border-black/20 bg-white p-4 has-[:checked]:border-brand-primary has-[:checked]:bg-brand-light has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-primary">
                <input type="radio" name={`${kind}-type`} className="sr-only" checked={type === id} onChange={() => setType(id)} />
                <LogoCycle logos={logos} sizes={sizes} brands={brands} offset={index} />
                <span>
                  <span className="heading-h7 block">{name}</span>
                  <span className="mt-1 block text-sm text-black/60">{description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="heading-h7 mb-3">2. Describe your business</legend>
          {fields.map(({ id, label, placeholder, multiline, optional, max }) => (
            <label key={id} className="grid gap-2 text-sm font-semibold">
              <span>{label}{optional && <span className="font-normal text-black/60"> (optional)</span>}</span>
              {multiline
                ? <textarea className={`${input} min-h-24`} placeholder={placeholder} maxLength={max} value={values[id] ?? ""} onChange={(event) => setValues({ ...values, [id]: event.target.value })} />
                : <input type="text" className={input} placeholder={placeholder} maxLength={max} value={values[id] ?? ""} onChange={(event) => setValues({ ...values, [id]: event.target.value })} />}
            </label>
          ))}
        </fieldset>

        <fieldset className="grid gap-6 md:grid-cols-2">
          <legend className="heading-h7 mb-3">3. Fine-tune</legend>
          <label className="grid gap-2 text-sm font-semibold">
            <span className="flex justify-between"><span>Creativity</span><span className="font-normal text-black/60">{creativityLabels[creativity - 1]}</span></span>
            <input type="range" min={1} max={5} step={1} value={creativity} onChange={(event) => setCreativity(Number(event.target.value))} className="w-full accent-brand-primary" />
          </label>
          <div className="grid gap-2 text-sm font-semibold">
            <span id={`${kind}-length`}>Length</span>
            <div role="group" aria-labelledby={`${kind}-length`} className="flex flex-wrap gap-2">
              {lengths.map(({ id, label }) => <button key={id} type="button" aria-pressed={length === id} onClick={() => setLength(id)} className={pill(length === id)}>{label}</button>)}
            </div>
          </div>
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">
            <span>Words to avoid <span className="font-normal text-black/60">(optional, separated by commas)</span></span>
            <input type="text" className={input} placeholder="cheap, easy, solutions" maxLength={200} value={avoid} onChange={(event) => setAvoid(event.target.value)} />
          </label>
        </fieldset>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xs text-sm text-black/60" aria-live="polite">{loading ? `Writing your ${noun}. This takes about ten seconds.` : note}</p>
          <button type="submit" className="button-inverted disabled:pointer-events-none disabled:opacity-40" disabled={!ready || loading}>{loading ? "Generating" : ideas.length ? `More ${noun}` : `Generate ${noun}`}</button>
        </div>
      </form>

      {(ideas.length > 0 || pinned.length > 0) && (
        <div aria-live="polite" className="mt-8 border-t border-black/20 pt-8">
          {ideas.length > 0 && (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <h2 className="heading-h7">Your {noun}</h2>
                <button type="button" onClick={download} className="flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"><LuDownload aria-hidden="true" className="size-4" />Download all</button>
              </div>
              <ul className={`grid gap-3 ${kind === "name" ? "sm:grid-cols-2" : ""}`}>{ideas.map(row)}</ul>
            </>
          )}
          {pinned.length > 0 && (
            <>
              <h2 className={`heading-h7 mb-4 ${ideas.length ? "mt-8" : ""}`}>Pinned</h2>
              <ul className={`grid gap-3 ${kind === "name" ? "sm:grid-cols-2" : ""}`}>{pinned.map(row)}</ul>
            </>
          )}
          <div className="mt-6 rounded-xl bg-brand-light p-4 md:mt-8 md:p-5">
            <h3 className="heading-h7 mb-2">{nextStep.heading}</h3>
            <p className="mb-4">{nextStep.body}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="/start" className="button-inverted">Book a call</a>
              <TextLink href={nextStep.link.href}>{nextStep.link.label}</TextLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
