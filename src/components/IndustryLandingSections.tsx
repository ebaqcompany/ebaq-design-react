import { BiCheck, BiSolidStar } from "react-icons/bi";

// Sections shared by the industry landing pages (law firms, AI healthcare, …).
// The markup is the original law-firm landing design; only the copy is passed in.

export type PainPoint = { title: string; body: string };

export const PainPointsSection = ({ heading, points }: { heading: string; points: PainPoint[] }) => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-white">
    <div className="container max-w-6xl">
      <p
        className="mb-3 font-semibold text-brand-primary md:mb-4"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Why it matters
      </p>
      <h2
        className="mb-12 text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] max-w-3xl"
        style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontWeight: 600,
          lineHeight: 1.05,
        }}
      >
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {points.map((point, i) => (
          <div key={i} className="border-t border-black/10 pt-6">
            <h3
              className="text-xl md:text-2xl mb-3 tracking-[-0.02em]"
              style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
            >
              {point.title}
            </h3>
            <p className="text-black/50 text-base md:text-lg leading-relaxed">
              {point.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const DeliverablesSection = ({ heading, description, items }: { heading: string; description: string; items: string[] }) => (
  <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
    <div className="container max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <p
            className="mb-3 font-semibold text-brand-primary md:mb-4"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            What you get
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] mb-6"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontWeight: 600,
              lineHeight: 1.05,
            }}
          >
            {heading}
          </h2>
          <p className="text-black/50 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <BiCheck className="size-5 flex-shrink-0 mt-0.5" />
              <span className="text-base md:text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

type IndustryTestimonialProps = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  personUrl?: string;
  logo: { src: string; alt: string };
  websiteUrl: string;
  caseStudyUrl: string;
  // Long quotes read better a size down.
  compact?: boolean;
};

const textLink = "text-xs text-black/40 hover:text-black transition-colors whitespace-nowrap";

export const IndustryTestimonial = ({ quote, name, role, avatar, personUrl, logo, websiteUrl, caseStudyUrl, compact }: IndustryTestimonialProps) => {
  const portrait = (
    <img
      src={avatar}
      alt={name}
      className="size-11 rounded-full object-cover flex-shrink-0 hover:opacity-80 transition-opacity"
    />
  );
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
      <div className={compact ? "mx-auto max-w-3xl text-center" : "mx-auto max-w-lg text-center"}>
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <BiSolidStar key={i} className="size-5 text-yellow-400" />
          ))}
        </div>
        <blockquote
          className={compact ? "text-2xl md:text-3xl lg:text-4xl tracking-[-0.03em] leading-tight mb-10" : "text-4xl md:text-5xl lg:text-6xl tracking-[-0.04em] leading-tight mb-10"}
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontVariationSettings: "'wght' 300",
          }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          {personUrl ? <a href={personUrl} target="_blank" rel="noopener noreferrer">{portrait}</a> : portrait}
          <div className="text-left">
            <p className="font-semibold text-sm leading-tight">{name}</p>
            <p className="text-sm text-black/50">{role}</p>
          </div>
          <div className="h-8 w-px bg-black/20 mx-1" />
          <div className="flex flex-col items-center gap-1">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src={logo.src} alt={logo.alt} className="h-5 w-auto" />
            </a>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={textLink}
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              View live website &rarr;
            </a>
            <a href={caseStudyUrl} className={textLink} style={{ fontFamily: "'Roboto', sans-serif" }}>
              Read the case study &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
