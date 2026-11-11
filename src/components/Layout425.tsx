import { useMediaQuery } from "./ui";
import { LazyVideo } from "./Media";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudyBrandSprintGallery } from "../data/caseStudies";

type ImageProps = { src: string; alt?: string; kind?: "image" | "video" };
type Props = React.ComponentPropsWithoutRef<"section"> & {
  heading?: string;
  description?: string;
  images?: ImageProps[];
  caseStudyUrl?: string;
};

const toImage = ({ src, alt, kind }: CaseStudyBrandSprintGallery["logo"]): ImageProps => ({
  src,
  alt,
  kind: kind === "video" ? "video" : "image",
});

const toOrderedImages = (gallery: CaseStudyBrandSprintGallery): ImageProps[] => [
  toImage(gallery.logo),
  toImage(gallery.typeface),
  toImage(gallery.color),
  toImage(gallery.website),
];

const brandSprintCaseStudies = caseStudies.flatMap((caseStudy) => {
  if (!caseStudy.brandSprintGallery) return [];
  const images = toOrderedImages(caseStudy.brandSprintGallery);
  const additionalImages = [
    ...caseStudy.leadGallery,
    ...caseStudy.content.flatMap((block) => block.type === "gallery" ? block.images : []),
  ].filter((media, index, all) =>
    media.kind !== "video"
    && media.kind !== "lottie"
    && !media.src.endsWith(".mp4")
    && !media.src.endsWith(".json")
    && !images.some((image) => image.src === media.src)
    && all.findIndex(({ src }) => src === media.src) === index
  );
  return [{ images, additionalImages, url: `/work/${caseStudy.slug}` }];
});

const brandSprintFallback = brandSprintCaseStudies[0];

const getImageRatio = (src: string) => new Promise<number | null>((resolve) => {
  const image = new Image();
  image.onload = () => resolve(image.naturalWidth / image.naturalHeight);
  image.onerror = () => resolve(null);
  image.src = src;
});

const getProportionateLandscapeImage = async (images: ImageProps[], candidates: CaseStudyBrandSprintGallery["logo"][], projectUrl: string) => {
  const ratios = (await Promise.all(images.map(({ src }) => getImageRatio(src)))).filter((ratio): ratio is number => ratio !== null);
  if (ratios.length === 0) return null;
  const averageRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length;
  const storageKey = `brand-sprint-fifth:${projectUrl}`;
  const storedSrc = window.sessionStorage.getItem(storageKey);
  const startIndex = storedSrc ? Math.max(0, candidates.findIndex(({ src }) => src === storedSrc)) : Math.floor(Math.random() * candidates.length);

  for (let offset = 0; offset < candidates.length; offset += 1) {
    const candidate = candidates[(startIndex + offset) % candidates.length];
    const ratio = await getImageRatio(candidate.src);
    if (ratio && ratio > 1 && ratio >= averageRatio * 0.7 && ratio <= averageRatio * 1.3) {
      window.sessionStorage.setItem(storageKey, candidate.src);
      return toImage(candidate);
    }
  }
  return null;
};

const isLandscapeImage = (src: string) => new Promise<boolean>((resolve) => {
  const image = new Image();
  image.onload = () => resolve(image.naturalWidth > image.naturalHeight);
  image.onerror = () => resolve(false);
  image.src = src;
});

const getRandomLandscapeCaseStudy = async () => {
  const startIndex = Math.floor(Math.random() * brandSprintCaseStudies.length);
  for (let offset = 0; offset < brandSprintCaseStudies.length; offset += 1) {
    const project = brandSprintCaseStudies[(startIndex + offset) % brandSprintCaseStudies.length];
    const landscapeChecks = await Promise.all(project.images.map(({ src }) => isLandscapeImage(src)));
    if (landscapeChecks.every(Boolean)) return project;
  }
  return brandSprintFallback;
};

type TransformParams = { scrollYProgress: MotionValue<number>; isMobile: boolean; isTablet: boolean };
const useResponsiveTransform = ({ scrollYProgress, isMobile, isTablet }: TransformParams, mobile: [string,string], tablet: [string,string], desktop: [string,string]) => useTransform(scrollYProgress, [0, 1], isMobile ? mobile : isTablet ? tablet : desktop);

export const useLayoutTransforms = (scrollYProgress: MotionValue<number>, isMobile: boolean, isTablet: boolean) => {
  const params = { scrollYProgress, isMobile, isTablet };
  return {
    imageOne: { x: useResponsiveTransform(params, ["-3vw", "-75vw"], ["-3vw", "-55vw"], ["-3vw", "-45vw"]), y: useResponsiveTransform(params, ["-2vh", "-35vh"], ["-2vh", "-35vh"], ["-2vh", "-35vh"]) },
    imageTwo: { x: useResponsiveTransform(params, ["3vw", "75vw"], ["3vw", "55vw"], ["3vw", "45vw"]), y: useResponsiveTransform(params, ["-2vh", "-35vh"], ["-2vh", "-35vh"], ["-2vh", "-35vh"]) },
    imageThree: { x: useResponsiveTransform(params, ["0vw", "0vw"], ["0vw", "0vw"], ["0vw", "0vw"]), y: useResponsiveTransform(params, ["-3vh", "-65vh"], ["-3vh", "-65vh"], ["-3vh", "-65vh"]) },
    imageFour: { x: useResponsiveTransform(params, ["-2vw", "-75vw"], ["-2vw", "-55vw"], ["-2vw", "-45vw"]), y: useResponsiveTransform(params, ["2vh", "35vh"], ["2vh", "35vh"], ["2vh", "35vh"]) },
    imageFive: { x: useResponsiveTransform(params, ["2vw", "75vw"], ["2vw", "55vw"], ["2vw", "45vw"]), y: useResponsiveTransform(params, ["2vh", "35vh"], ["2vh", "35vh"], ["2vh", "35vh"]) },
  };
};

const Media = ({ image }: { image: ImageProps }) => image.kind === "video" || image.src.endsWith(".mp4") ? <LazyVideo src={image.src} preload="none" aria-hidden="true" className="size-full" /> : <img src={image.src} alt={image.alt ?? ""} loading="lazy" decoding="async" className="size-full" />;

export const Layout425 = (props: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [randomCaseStudy, setRandomCaseStudy] = useState(brandSprintFallback);
  const [fifthImage, setFifthImage] = useState<ImageProps | null>(null);
  const { heading, description } = { ...Layout425Defaults, ...props };
  const images = props.images ?? randomCaseStudy.images;
  const caseStudyUrl = props.caseStudyUrl ?? randomCaseStudy.url;
  // Picking the project downloads its images to measure them, so wait until the section is close.
  const [isNear, setIsNear] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsNear(true);
      observer.disconnect();
    }, { rootMargin: "800px 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (props.images || !isNear) return;
    let isActive = true;
    getRandomLandscapeCaseStudy().then((nextCaseStudy) => {
      if (isActive) setRandomCaseStudy(nextCaseStudy);
    });
    return () => { isActive = false; };
  }, [props.images, isNear]);
  useEffect(() => {
    if (!isNear) return;
    let isActive = true;
    setFifthImage(null);
    const additionalImages = props.images ? [] : randomCaseStudy.additionalImages;
    getProportionateLandscapeImage(images, additionalImages, caseStudyUrl).then((nextImage) => {
      if (isActive) setFifthImage(nextImage);
    });
    return () => { isActive = false; };
  }, [caseStudyUrl, images, props.images, randomCaseStudy.additionalImages, isNear]);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 991px)");
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const transforms = useLayoutTransforms(scrollYProgress, isMobile, isTablet);
  return <section ref={sectionRef} id="brand-sprint" className="bg-brand-grid relative h-[300vh] md:pb-[12%] lg:pb-[15%]">
    <div className="bg-brand-grid sticky top-0 z-10 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {[images[0], images[1], images[2], images[3], fifthImage].map((image, index) => image && <div key={index} className="absolute left-1/2 top-1/2 w-[55vw] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 md:w-[35vw] lg:w-[30vw] lg:max-w-xs">
          <motion.div style={[transforms.imageOne, transforms.imageTwo, transforms.imageThree, transforms.imageFour, transforms.imageFive][index]}><Media image={image} /></motion.div>
        </div>)}
      </div>
      <div className="relative z-10 w-full"><div className="px-[5%] py-16 text-center md:py-24 lg:py-28"><div className="container mx-auto flex w-full max-w-lg flex-col items-center"><h2 className="mb-5 w-full text-center uppercase md:mb-6 text-10xl">{heading.split("\n").map((line) => <span key={line} className="block text-center">{line}</span>)}</h2>{description && <p className="mx-auto max-w-sm text-center font-semibold md:text-md">{description}</p>}<div className="mt-6 md:mt-8"><a className="button-inverted button-inverted--brand-surface" href={caseStudyUrl}>See case study</a></div></div></div></div>
    </div><div className="absolute inset-0 -z-10 mt-[100vh]" />
  </section>;
};

export const Layout425Defaults = { heading: "Branding Done\nIn One Week", description: "Your new brand identity, delivered in one week. Guaranteed, for a flat $3,000. Need a website next? It can be done right next week." };
