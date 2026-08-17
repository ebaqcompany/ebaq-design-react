import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
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
};

const StaticLastFrameLottie = ({
  src,
  alt,
  fallback,
}: ProjectPreviewImage & { fallback: ProjectPreviewImage }) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [hasError, setHasError] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
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
  }, [src]);

  if (!animationData || hasError) {
    return <img src={fallback.src} className="size-full object-cover object-center" alt={fallback.alt} />;
  }

  return (
    <div className="flex size-full items-center justify-center overflow-hidden">
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
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
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
  const content = !isHovering && lottie ? (
    <StaticLastFrameLottie {...lottie} fallback={currentImage} />
  ) : (
    <img src={currentImage.src} className={`size-full object-cover object-center ${imageClassName ?? ""}`.trim()} alt={currentImage.alt} />
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
