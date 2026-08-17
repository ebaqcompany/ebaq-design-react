import { useMediaQuery } from "@relume_io/relume-ui";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { caseStudies } from "../data/caseStudies";

type ImageProps = { src: string; alt?: string; kind?: "image" | "video" };
type Props = React.ComponentPropsWithoutRef<"section"> & {
  heading?: string;
  description?: string;
  images?: ImageProps[];
};

const imageClasses = {
  one: "absolute -left-16 bottom-[80%] w-full max-w-[9rem] sm:-left-8 sm:max-w-[15rem] md:bottom-3/4 md:left-[20%] lg:max-w-xs",
  two: "absolute -left-8 top-[72%] w-full max-w-[9rem] sm:-left-24 sm:top-[60%] sm:max-w-[15rem] md:left-auto md:top-[65%] lg:max-w-xs",
  three: "absolute top-[75%] w-full max-w-[9rem] sm:top-[65%] sm:max-w-[15rem] md:-right-[80%] md:top-[80%] lg:max-w-xs",
  four: "absolute -right-8 bottom-[78%] w-full max-w-[9rem] sm:-right-24 sm:bottom-[72%] sm:max-w-[15rem] md:bottom-[70%] md:right-0 lg:max-w-xs",
  five: "absolute -right-16 bottom-[22%] flex w-full max-w-[9rem] items-center sm:-right-12 sm:bottom-[18%] sm:max-w-[15rem] md:bottom-[4%] md:right-[10%] lg:bottom-[2%] lg:max-w-xs",
};

const landscapeFallback: ImageProps[] = [
  "/case-study/wingnut/01-logos.png",
  "/case-study/wingnut/02-cards.jpg",
  "/case-study/wingnut/03-website.jpg",
  "/case-study/wingnut/06-social.jpg",
  "/case-study/wingnut/07-macbook.jpg",
].map((src) => ({ src, kind: "image" }));

const mediaByCaseStudy = caseStudies.map((caseStudy) => ({
  slug: caseStudy.slug,
  media: [
    ...caseStudy.leadGallery,
    ...caseStudy.content.flatMap((block) => block.type === "gallery" ? block.images : []),
  ].filter((media, index, all) =>
    media.kind !== "video"
    && media.kind !== "lottie"
    && !media.src.endsWith(".mp4")
    && !media.src.endsWith(".json")
    && all.findIndex(({ src }) => src === media.src) === index
  ),
})).filter(({ media }) => media.length >= 5);

const shuffle = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const isLandscapeImage = (src: string) => new Promise<boolean>((resolve) => {
  const image = new Image();
  image.onload = () => resolve(image.naturalWidth > image.naturalHeight);
  image.onerror = () => resolve(false);
  image.src = src;
});

const getRandomLandscapeCaseStudyImages = async (): Promise<ImageProps[]> => {
  for (const project of shuffle(mediaByCaseStudy)) {
    const landscapeImages: ImageProps[] = [];
    for (const media of shuffle(project.media)) {
      if (await isLandscapeImage(media.src)) {
        landscapeImages.push({ src: media.src, alt: media.alt, kind: "image" });
      }
      if (landscapeImages.length === 5) return landscapeImages;
    }
  }
  return landscapeFallback;
};

type TransformParams = { scrollYProgress: MotionValue<number>; isMobile: boolean; isTablet: boolean };
const useResponsiveTransform = ({ scrollYProgress, isMobile, isTablet }: TransformParams, mobile: [string,string], tablet: [string,string], desktop: [string,string]) => useTransform(scrollYProgress, [0, 1], isMobile ? mobile : isTablet ? tablet : desktop);

export const useLayoutTransforms = (scrollYProgress: MotionValue<number>, isMobile: boolean, isTablet: boolean) => {
  const params = { scrollYProgress, isMobile, isTablet };
  return {
    content: { opacity: 1, scale: useTransform(scrollYProgress, [0, 1], [0.95, 1]) },
    imageOne: { x: useResponsiveTransform(params, ["120%", "0%"], ["90%", "0%"], ["120%", "0%"]), y: useResponsiveTransform(params, ["60vh", "0%"], ["90%", "0%"], ["100%", "0%"] ) },
    imageTwo: { x: useResponsiveTransform(params, ["100%", "0%"], ["120%", "0%"], ["120%", "0%"]), y: useResponsiveTransform(params, ["-60vh", "0%"], ["-80%", "0%"], ["-90%", "0%"] ) },
    imageThree: { x: useResponsiveTransform(params, ["0%", "0%"], ["20%", "0%"], ["20%", "0%"]), y: useResponsiveTransform(params, ["-80vh", "0%"], ["-180%", "0%"], ["-170%", "0%"] ) },
    imageFour: { x: useResponsiveTransform(params, ["-100%", "0%"], ["-110%", "0%"], ["-110%", "0%"]), y: useResponsiveTransform(params, ["60vh", "0%"], ["90%", "0%"], ["90%", "0%"] ) },
    imageFive: { x: useResponsiveTransform(params, ["-110%", "0%"], ["-100%", "0%"], ["-100%", "0%"]), y: useResponsiveTransform(params, ["-60vh", "0%"], ["-90%", "0%"], ["-90%", "0%"] ) },
  };
};

const Media = ({ image }: { image: ImageProps }) => image.kind === "video" || image.src.endsWith(".mp4") ? <video src={image.src} autoPlay loop muted playsInline className="size-full" /> : <img src={image.src} alt={image.alt ?? ""} className="size-full" />;

export const Layout425 = (props: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [randomImages, setRandomImages] = useState<ImageProps[]>(landscapeFallback);
  const { heading, description } = { ...Layout425Defaults, ...props };
  const images = props.images ?? randomImages;
  useEffect(() => {
    if (props.images) return;
    let isActive = true;
    getRandomLandscapeCaseStudyImages().then((nextImages) => {
      if (isActive) setRandomImages(nextImages);
    });
    return () => { isActive = false; };
  }, [props.images]);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 991px)");
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const transforms = useLayoutTransforms(scrollYProgress, isMobile, isTablet);
  return <section ref={sectionRef} id="brand-sprint" className="bg-brand-grid relative h-[300vh] md:pb-[12%] lg:pb-[15%]">
    <div className="sticky top-0 z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden md:overflow-visible">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex h-full w-full items-center justify-center md:right-auto md:ml-[5%] md:w-[30%] md:justify-start"><motion.div className={imageClasses.one} style={transforms.imageOne}><Media image={images[0]} /></motion.div><motion.div className={imageClasses.two} style={transforms.imageTwo}><Media image={images[1]} /></motion.div><motion.div className={imageClasses.three} style={transforms.imageThree}><Media image={images[2]} /></motion.div></div>
      <div className="absolute bottom-0 right-0 top-0 z-20 flex h-full w-full items-center justify-center md:mx-[5%] md:w-[30%] md:justify-end"><motion.div className={imageClasses.four} style={transforms.imageFour}><Media image={images[3]} /></motion.div><motion.div className={imageClasses.five} style={transforms.imageFive}><Media image={images[4]} /></motion.div></div>
      <motion.div className="relative z-10 -mt-[20%] w-full md:mt-0" style={transforms.content}><div className="px-[5%] py-16 text-center md:py-24 lg:py-28"><div className="container mx-auto flex w-full max-w-lg flex-col items-center"><h2 className="mb-5 w-full text-center text-6xl uppercase leading-display md:mb-6 md:text-10xl">{heading.split("\n").map((line) => <span key={line} className="block whitespace-nowrap text-center">{line}</span>)}</h2>{description && <p className="mx-auto max-w-sm text-center font-semibold md:text-md">{description}</p>}</div></div></motion.div>
    </div><div className="absolute inset-0 -z-10 mt-[100vh]" />
  </section>;
};

export const Layout425Defaults = { heading: "Branding Done\nIn One Week", description: "Start with a weekly engagement. Typical branding foundation takes a week. Need a landing page? It can be done right next week." };
