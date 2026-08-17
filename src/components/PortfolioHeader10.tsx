import { useEffect, useRef, useState, type ReactNode } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type ImageProps = {
  src: string;
  alt?: string;
  kind?: "image" | "lottie";
  backgroundColor?: string;
};

type Tag = {
  label: string;
};

type ProjectLink = {
  href: string;
  label: string;
};

type Props = {
  heading: string;
  subheading: string;
  description: string;
  tags: Tag[];
  links: ProjectLink[];
  image: ImageProps;
  navigation?: ReactNode;
};

export type PortfolioHeader10Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const HeaderMedia = ({ image }: { image: ImageProps }) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (image.kind !== "lottie") return;

    fetch(image.src)
      .then((response) => response.json())
      .then(setAnimationData)
      .catch((error) => console.error("Failed to load portfolio header Lottie:", error));
  }, [image.kind, image.src]);

  if (image.kind === "lottie") {
    const replayAnimation = () => lottieRef.current?.goToAndPlay(0, true);

    return (
      <button
        type="button"
        className="portfolio-header-replay absolute inset-0 flex size-full cursor-pointer items-center justify-center rounded-none px-[5%]"
        style={{ backgroundColor: image.backgroundColor }}
        onClick={replayAnimation}
        aria-label={`Replay ${image.alt ?? "logo animation"}`}
      >
        {animationData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            autoplay
            loop={false}
            className="container mx-auto size-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        )}
      </button>
    );
  }

  return <img src={image.src} alt={image.alt} className="absolute size-full object-cover" />;
};

export const PortfolioHeader10 = (props: PortfolioHeader10Props) => {
  const { heading, subheading, description, tags, links, image, navigation, className, ...sectionProps } = {
    ...PortfolioHeader10Defaults,
    ...props,
  };

  return (
    <section className={className} {...sectionProps}>
      <div className="flex h-svh flex-col">
        {navigation}
        <div className="relative flex-1">
          <HeaderMedia image={image} />
        </div>
      </div>
      <div className="px-[5%]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-start gap-6 py-12 md:grid-cols-2 md:gap-x-12 md:py-16 lg:gap-20 lg:py-20">
            <div>
              <h1 className="mb-5 md:mb-6">{heading}</h1>
              <h2 className="heading-h5 mb-5 md:mb-6">{subheading}</h2>
              <ul className="mt-5 flex flex-wrap gap-2 md:mt-6" aria-label="Project services">
                {tags.map((tag) => (
                  <li key={tag.label} className="flex">
                    <span className="rounded-full bg-background-secondary px-3 py-1.5 text-sm font-semibold text-black/60">
                      {tag.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="md:text-md">{description}</p>
              {links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 md:mt-8">
                  {links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="font-semibold">
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PortfolioHeader10Defaults: Props = {
  heading: "Project name here",
  subheading: "Short project descriptor here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  tags: [
    { label: "Tag one" },
    { label: "Tag two" },
    { label: "Tag three" },
  ],
  links: [],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image 1",
    kind: "image",
  },
};
