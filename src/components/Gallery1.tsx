import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
  kind?: "image" | "video" | "lottie";
  span?: "full" | "half";
  overlaySrc?: string;
};

const GalleryLottie = ({ src, alt }: Pick<ImageProps, "src" | "alt">) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    fetch(src)
      .then((response) => response.json())
      .then(setAnimationData)
      .catch((error) => console.error("Failed to load gallery Lottie:", error));
  }, [src]);

  return (
    <button
      type="button"
      className="flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden"
      onClick={() => lottieRef.current?.goToAndPlay(0, true)}
      aria-label={`Replay ${alt ?? "gallery animation"}`}
    >
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay
          loop={false}
          className="size-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      )}
    </button>
  );
};

type Props = {
  heading: string;
  description: string;
  images: ImageProps[];
};

export type Gallery1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Gallery1 = (props: Gallery1Props) => {
  const { heading, description, images, className, ...sectionProps } = {
    ...Gallery1Defaults,
    ...props,
  };

  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${className ?? ""}`} {...sectionProps}>
      <div className="container">
        {(heading || description) && (
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            {heading && <h2 className="mb-5 md:mb-6">{heading}</h2>}
            {description && <p className="md:text-md">{description}</p>}
          </div>
        )}
        <div className="grid auto-cols-fr grid-cols-1 gap-8 md:grid-cols-2">
          {images.map((image) => {
            const media = image.kind === "video" ? (
              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  src={image.src}
                  aria-label={image.alt}
                  className="size-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {image.overlaySrc && (
                  <img src={image.overlaySrc} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
                )}
              </div>
            ) : image.kind === "lottie" ? (
              <GalleryLottie src={image.src} alt={image.alt} />
            ) : (
              <div className="w-full overflow-hidden">
                <img src={image.src} alt={image.alt} className="h-auto w-full" />
              </div>
            );

            return (
              <div key={`${image.src}-${image.url ?? ""}`} className={image.span === "half" ? "md:col-span-1" : "md:col-span-2"}>
                {image.url ? <a href={image.url} className="block size-full">{media}</a> : media}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Gallery1Defaults: Props = {
  heading: "Image Gallery",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  images: [
    {
      url: "#",
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 1",
    },
  ],
};
