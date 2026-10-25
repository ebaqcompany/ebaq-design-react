import { arekToolIcons } from "./ArekProfileBadge";
import { founder } from "../content/siteFacts";

type ImageProps = { src: string; alt: string };
type Props = {
  title: string;
  description: string;
  // Pass an empty array for a text-only hero; the grid needs three portraits.
  images: ImageProps[];
  // The icon row describes Arek himself, so it belongs to the About hero only.
  showToolIcons?: boolean;
};

export type Header107Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header107 = (props: Header107Props) => {
  const { title, description, images, showToolIcons = true, className, ...sectionProps } = { ...Header107Defaults, ...props };

  return (
    <section
      id="about-hero"
      className={`overflow-hidden px-[5%] pb-16 pt-16 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28 ${className ?? ""}`}
      {...sectionProps}
    >
      <div className="container">
        <div className="w-full max-w-lg">
          <h1 className="mb-5 md:mb-6">{title}</h1>
          <p className="md:text-md">{description}</p>
          {showToolIcons && (
            <div className="mt-5 flex flex-wrap items-center gap-2 md:mt-6" role="group" aria-label="Software tools used by Arek Dvornechuck">
              {arekToolIcons.map(([src, alt, iconClassName]) => <img loading="lazy" decoding="async" key={src} src={src} alt={alt} className={`size-5 rounded-[20%] object-cover ${iconClassName ?? ""}`.trim()} />)}
            </div>
          )}
        </div>

        {images.length >= 3 && (
          <div className="mt-12 grid grid-cols-3 items-start gap-2 md:mt-16 md:gap-5 lg:mt-20 lg:gap-8">
            <div className="mt-10 aspect-[9/16] overflow-hidden md:mt-20 lg:mt-28">
              <img loading="eager" fetchPriority="high" className="size-full object-cover object-center" {...images[1]} />
            </div>

            <div className="aspect-[9/16] overflow-hidden">
              <img loading="eager" className="size-full object-cover object-center" {...images[0]} />
            </div>

            <div className="mt-6 aspect-[9/16] overflow-hidden md:mt-12 lg:mt-16">
              <img loading="eager" className="size-full object-cover object-center" {...images[2]} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const Header107Defaults: Props = {
  title: "Branding Expert in NY",
  description: `I’m Arek Dvornechuck, a Branding Expert and art director based in Brooklyn, New York, with ${founder.experience} of experience, including identity work at ${founder.formerStudio.name}. I lead every engagement myself, from strategy through brand identity, websites, and motion, for companies worldwide.`,
  images: [
    { src: "/images/about-candidates/arek-studio-portrait-dsc00067.webp", alt: "Arek Dvornechuck in his design studio" },
    { src: "/images/about-candidates/arek-logo-modernism-dsc00068.webp", alt: "Arek Dvornechuck holding the Logo Modernism design book in his studio" },
    { src: "/images/about-candidates/arek-sketching-logo-concepts-dsc00075.webp", alt: "Arek Dvornechuck sketching logo concepts at his studio desk" },
  ],
};
