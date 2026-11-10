import { useEffect, useState } from "react";
import { LottiePlayer as Lottie } from "./LottiePlayer";
import { LazyVideo } from "./Media";

// Week 1 shown, not listed: each deliverable with a real piece of client work (16:9 media only).
const sprintDeliverables = [
  { title: "Logo design", body: "Several concepts, refined into one distinctive mark.", media: "/case-study/next-dimension/logos.webp", alt: "NextDimension logo system" },
  { title: "Logo animation", body: "Your logo in motion, ready for the web, social, and video.", media: "/portfolio/logos/airporteexecutive-logo.json", alt: "Airport Executive logo animation" },
  { title: "Final logo files", body: "Every version in SVG, PNG, and PDF, for print and screen.", media: "/case-study/fox-berman/01-logos.webp", alt: "Fox Berman logo variations" },
  { title: "Color palette", body: "A primary palette and accents, with values for every medium.", media: "/case-study/orbio/03-colors.mp4", alt: "Orbio color palette" },
  { title: "Typography", body: "Typefaces and a type scale for headlines and body copy.", media: "/foxberman/foxberman-fonts.webp", alt: "Fox Berman typography" },
  { title: "Brand guidelines", body: "A live style guide on guidelines.online, not a forgotten PDF.", media: "/images/site/pricing/guidelines-online.mp4", alt: "Next Dimension brand guidelines on guidelines.online" },
  { title: "Business cards", body: "Print-ready cards your team can order the same week.", media: "/case-study/elevate/05-business-cards.webp", alt: "Elevate business cards" },
  { title: "Social media kit", body: "Profile images and launch posts for LinkedIn and Instagram.", media: "/images/site/pricing/social-wall.mp4", alt: "Orbio social media posts" },
  { title: "Email signature", body: "A branded signature for every inbox on the team.", media: "/foxberman/foxberman-signature.webp", alt: "Fox Berman email signature" },
];

// Lottie tiles load on the client, on the same black backdrop as the homepage grid; the prerender shows the backdrop.
const LottieTile = ({ src }: { src: string }) => {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    fetch(src).then((res) => res.json()).then(setData).catch(() => setData(null));
  }, [src]);
  return data ? <Lottie animationData={data} loop className="size-full" /> : null;
};

export const BrandSprintIncluded = () => (
  <section id="brand-sprint" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-3 font-mono font-normal uppercase tracking-wide text-sm text-brand-primary md:mb-4">Week 1</p>
        <h2 className="mb-5 md:mb-6">What's in the Brand Sprint</h2>
        <p className="md:text-md">A complete brand identity or rebrand in one week. We lock the scope on the kickoff call, so the week is guaranteed and you get every piece below.</p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
        {sprintDeliverables.map(({ title, body, media, alt }) => (
          <div key={title}>
            <div className="aspect-video overflow-hidden rounded-lg bg-surface-muted">
              {media.endsWith(".json") ? (
                <div role="img" aria-label={alt} className="size-full bg-black">
                  <LottieTile src={media} />
                </div>
              ) : media.endsWith(".mp4") ? (
                <LazyVideo src={media} aria-label={alt} className="size-full object-cover" preload="metadata" />
              ) : (
                <img src={media} alt={alt} loading="lazy" className="size-full object-cover" />
              )}
            </div>
            <h3 className="mt-5 mb-2 heading-h6">{title}</h3>
            <p className="text-black/60">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 border-t border-black/10 pt-6 md:mt-16 md:text-md">
        <strong>Revisions within the agreed scope</strong> are included, and you keep every source file.
      </p>
    </div>
  </section>
);
