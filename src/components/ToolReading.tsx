import { TextLink } from "./TextLink";

// Links from a tool page to the articles that go deeper on the same question.
export const ToolReading = ({ links }: { links: { label: string; href: string }[] }) => (
  <section className="bg-surface-muted px-[5%] py-12 md:py-16">
    <div className="container">
      <p className="mb-6 font-mono text-sm uppercase tracking-wide text-brand-primary">Related reading</p>
      <ul className="grid auto-cols-fr grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
        {links.map(({ label, href }) => (
          <li key={href} className="border-t border-black/20 py-4"><TextLink href={href}>{label}</TextLink></li>
        ))}
      </ul>
    </div>
  </section>
);
