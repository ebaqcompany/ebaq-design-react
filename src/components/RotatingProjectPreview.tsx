import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { LottiePlayer as Lottie } from "./LottiePlayer";
import { useNearViewport } from "./Media";
import { Link } from "react-router-dom";

export type ProjectPreviewImage = {
  src: string;
  alt?: string;
};

type RotatingProjectPreviewProps = {
  image: ProjectPreviewImage;
  images?: ProjectPreviewImage[];
  lottie?: ProjectPreviewImage;
  url: string;
  className?: string;
  imageClassName?: string;
  useRouterLink?: boolean;
  // The first card on a page is on screen at load (often the largest paint), so it isn't lazy.
  priority?: boolean;
  fit?: "cover" | "contain";
};

const StaticLastFrameLottie = ({
  src,
  alt,
  fallback,
  priority = false,
  fit = "cover",
}: ProjectPreviewImage & { fallback: ProjectPreviewImage; priority?: boolean; fit?: "cover" | "contain" }) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [hasError, setHasError] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  // Fetch the animation only as the card comes near the screen; a page of cards would otherwise
  // download every card's animation at load.
  const { ref, near } = useNearViewport<HTMLDivElement>("300px");

  useEffect(() => {
    if (!near) return;
    setAnimationData(null);
    setHasError(false);
    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`Lottie request failed: ${response.status}`);
        return response.json();
      })
      .then(setAnimationData)
      .catch((error) => {
        setHasError(true);
        console.error("Failed to load project-preview Lottie:", error);
      });
  }, [src, near]);

  if (!animationData || hasError) {
    return <div ref={ref} className="size-full"><img loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" src={fallback.src} className={`size-full ${fit === "contain" ? "object-contain" : "object-cover"} object-center`} alt={fallback.alt} /></div>;
  }

  return (
    <div ref={ref} className="flex size-full items-center justify-center overflow-hidden">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        className="flex size-full items-center justify-center"
        aria-label={alt}
        onDOMLoaded={() => {
          const lastFrame = Math.max(0, ((animationData as { op?: number }).op ?? 1) - 1);
          lottieRef.current?.goToAndStop(lastFrame, true);
        }}
        rendererSettings={{ preserveAspectRatio: fit === "contain" ? "xMidYMid meet" : "xMidYMid slice" }}
      />
    </div>
  );
};

export const RotatingProjectPreview = ({
  image,
  images = [],
  lottie,
  url,
  className,
  imageClassName,
  useRouterLink = false,
  priority = false,
  fit = "cover",
}: RotatingProjectPreviewProps) => {
  const previewImages = images.length > 0 ? images : [image];
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const rotationTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopRotation = () => {
    if (rotationTimer.current) clearInterval(rotationTimer.current);
    rotationTimer.current = null;
    setImageIndex(0);
    setIsHovering(false);
  };

  const startRotation = () => {
    setIsHovering(true);
    if (previewImages.length < 2 || rotationTimer.current) return;
    rotationTimer.current = setInterval(() => {
      setImageIndex((currentIndex) => (currentIndex + 1) % previewImages.length);
    }, 220);
  };

  useEffect(
    () => () => {
      if (rotationTimer.current) clearInterval(rotationTimer.current);
    },
    [],
  );

  const currentImage = previewImages[imageIndex] ?? image;
  // At rest, show the project's own preview image; the gallery only rotates on hover.
  const shownImage = isHovering ? currentImage : image;
  const content = !isHovering && lottie ? (
    <StaticLastFrameLottie {...lottie} fallback={currentImage} priority={priority} fit={fit} />
  ) : (
    <img loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" src={shownImage.src} className={`size-full ${fit === "contain" ? "object-contain" : "object-cover"} object-center ${imageClassName ?? ""}`.trim()} alt={shownImage.alt} />
  );
  const linkClassName = `flex items-center justify-center overflow-hidden ${className ?? ""}`;

  if (useRouterLink) {
    return (
      <Link to={url} className={linkClassName} onMouseEnter={startRotation} onMouseLeave={stopRotation}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={url}
      className={linkClassName}
      onMouseEnter={startRotation}
      onMouseLeave={stopRotation}
    >
      {content}
    </a>
  );
};
