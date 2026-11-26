import { Link } from "react-router-dom";
import { ArekProfileBadge } from "./ArekProfileBadge";
import { bookingUrl, founder } from "../content/siteFacts";

// Author note at the end of every blog article: the sidebar signature plus a short bio.
// It discloses who wrote the piece, which keeps roundups and comparisons from reading as
// unlabelled self-promotion to readers and to AI search engines.
export const AuthorNote = () => (
  <aside aria-labelledby="about-the-author" className="not-prose mt-12 rounded-xl border border-black/10 bg-white p-6 md:p-8">
    <p id="about-the-author" className="mb-4 font-mono text-sm uppercase tracking-wide text-brand-primary">About the author</p>
    <ArekProfileBadge variant="author" portraitHref="/about" />
    <p className="mt-5">
      I'm {founder.name}, a <strong>senior brand designer in Brooklyn</strong> with {founder.experience} of experience, previously at {founder.formerStudio.name}.
    </p>
    <p className="mt-3">
      I design brand identities, pitch decks and Framer or Webflow websites for startups and growing businesses, and I write about what I see in that client work.
    </p>
    <p className="mt-3">
      A complete brand identity takes <strong>one week for a flat $3,000</strong>, and you work with me directly.
    </p>
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
      <Link to="/about">About me</Link>
      <Link to="/work">See my work</Link>
      <a href={bookingUrl} target="_blank" rel="noreferrer">Book a free 15-minute call</a>
    </div>
  </aside>
);
