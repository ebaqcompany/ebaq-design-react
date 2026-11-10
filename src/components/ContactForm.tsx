import { useState, type FormEvent } from "react";
import { Button, Input } from "./ui";
import { bookingUrl } from "../content/siteFacts";
import { services } from "../data/services";

// Relume Contact 2: centered introduction and project inquiry form.
export const ContactForm = () => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [budget, setBudget] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("investment") !== "yes") {
      setError(data.get("investment") === "no" ? "Sorry, I can’t accept projects below this budget." : "Please choose yes or no to continue.");
      return;
    }
    setError("");
    setSending(true);
    const payload = {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
      services: data.getAll("services").map(String),
      investment: true,
    };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Delivery failed");
      const calendar = new URL(bookingUrl);
      calendar.searchParams.set("name", `${payload.firstName} ${payload.lastName}`.trim());
      calendar.searchParams.set("email", payload.email);
      if (payload.phone) calendar.searchParams.set("Phone", payload.phone);
      if (payload.message) calendar.searchParams.set("notes", payload.message);
      calendar.searchParams.set("Ready", "true");
      window.location.assign(calendar.toString());
    } catch {
      setError("Your message couldn’t be sent. Please email arek@ebaqdesign.com or try again.");
      setSending(false);
    }
  };
  return <section className="px-[5%] py-16 md:py-24 lg:py-28"><div className="container max-w-md">
    <div className="mx-auto mb-8 w-full max-w-lg text-center md:mb-10 lg:mb-12"><p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Contact</p><h1 className="mb-5 md:mb-6">Tell me about your project</h1><p className="md:text-md">Share a few details, then book a free 15-minute call.</p></div>
    <form className="grid grid-cols-1 gap-6" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2"><label className="grid w-full gap-2">First name<Input className="rounded-none border-0 border-b border-black/20 px-0 focus:border-black" name="firstName" autoComplete="given-name" required maxLength={100} /></label><label className="grid w-full gap-2">Last name<Input className="rounded-none border-0 border-b border-black/20 px-0 focus:border-black" name="lastName" autoComplete="family-name" required maxLength={100} /></label></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2"><label className="grid w-full gap-2">Email<Input className="rounded-none border-0 border-b border-black/20 px-0 focus:border-black" type="email" name="email" autoComplete="email" required maxLength={254} /></label><label className="grid w-full gap-2">Phone number<Input className="rounded-none border-0 border-b border-black/20 px-0 focus:border-black" type="tel" name="phone" autoComplete="tel" maxLength={40} /></label></div>
      <fieldset className="grid w-full gap-4 py-3 md:py-4"><legend>What services do you need?</legend><div className="flex flex-wrap gap-3">{[...services.map(service => ({ id: service.slug, name: service.heading })), { id: "other", name: "Other" }].map(service => <label key={service.id}><input className="peer sr-only" type="checkbox" name="services" value={service.name} /><span className="inline-flex cursor-pointer items-center rounded-full border border-black/20 bg-white px-4 py-2 text-sm font-semibold text-black peer-checked:border-brand-primary peer-checked:bg-brand-primary peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary peer-focus-visible:ring-offset-2">{service.name}</span></label>)}</div></fieldset>
      <label className="grid w-full gap-2">Tell me about your project.<textarea name="message" required maxLength={5000} className="min-h-[11.25rem] w-full rounded-none border border-black/20 bg-background-primary p-4 focus:border-black focus:outline-none" placeholder="Start typing here..." /></label>
      <fieldset className="grid gap-4"><legend className="mb-4">Are you prepared to invest at least $3,000 per week?</legend><div className="grid grid-cols-2 gap-4">{["yes", "no"].map(value => <label key={value}><input className="peer sr-only" type="radio" name="investment" value={value} checked={budget === value} aria-describedby={error ? "contact-error" : undefined} onChange={() => { setBudget(value); setError(value === "no" ? "Sorry, I can’t accept projects below this budget." : ""); }} /><span className="flex cursor-pointer items-center justify-center rounded-full border border-black/20 bg-white px-6 py-2 font-semibold text-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary peer-focus-visible:ring-offset-2">{value === "yes" ? "Yes" : "No"}</span></label>)}</div></fieldset>
      {error && budget !== "no" && <p id="contact-error" role="alert" className="rounded-lg border border-red-700 bg-red-50 p-4 text-red-700">{error}</p>}
      {budget === "no" ? <button className="w-full rounded-full bg-[#ff0000] px-6 py-5 text-sm font-semibold text-white" type="button"><span id="contact-error" role="alert">Sorry, I can’t accept projects below this budget.</span></button> : <Button className="w-full py-5" type="submit" disabled={sending}>{sending ? "Sending..." : "Book my call"}</Button>}
    </form>
  </div></section>;
};
