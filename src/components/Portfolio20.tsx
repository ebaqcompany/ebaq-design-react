import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type ImageProps = { src: string; alt?: string };
// images: the project's gallery; while its row is hovered they play as a slideshow, as on /work.
type HoverLink = { url: string; heading: string; tag: string; image: ImageProps; images?: ImageProps[] };
type Props = { tagline: string; hoverLinks: HoverLink[] };

const getDirection = (event: MouseEvent<HTMLDivElement>, element: HTMLElement) => {
  const { width, height, left, top } = element.getBoundingClientRect();
  const degrees = Math.atan2(event.clientY - (top + height / 2), event.clientX - (left + width / 2)) * (180 / Math.PI);
  const angle = degrees < 0 ? degrees + 360 : degrees;
  if (angle >= 315 || angle < 45) return "right";
  if (angle >= 45 && angle < 135) return "bottom";
  if (angle >= 135 && angle < 225) return "left";
  return "top";
};

const spring = { type: "spring", duration: 1, bounce: 0 } as const;
const imageVariants = {
  initial: { x: 0, y: 0 },
  top: { y: 50, transition: spring },
  bottom: { y: -50, transition: spring },
  left: { x: 50, transition: spring },
  right: { x: -50, transition: spring },
};
// Same pace as the project cards on /work.
const SLIDE_MS = 220;

// Relume Portfolio 20 on a black surface: numbered rows of large project names. On desktop the hovered
// project's images follow the cursor as a slideshow, opaque and above the other rows, which dim.
export const Portfolio20 = ({ tagline, hoverLinks }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState("initial");
  const [slide, setSlide] = useState(0);

  const hovered = hoveredIndex === null ? null : hoverLinks[hoveredIndex];
  const slides = hovered ? (hovered.images?.length ? hovered.images : [hovered.image]) : [];
  const slideCount = slides.length;

  useEffect(() => {
    setSlide(0);
    if (slideCount < 2) return;
    const timer = setInterval(() => setSlide((current) => (current + 1) % slideCount), SLIDE_MS);
    return () => clearInterval(timer);
  }, [hoveredIndex, slideCount]);

  const shown = slides[slide] ?? slides[0];
  const rowText = (index: number) => clsx("relative transition-colors duration-300", hoveredIndex === null || hoveredIndex === index ? "text-white" : "text-white lg:text-white/20", hoveredIndex === index && "z-20");

  return (
    <section id="work" aria-label={tagline} className="relative isolate bg-black px-[5%] py-16 text-white md:py-24 lg:py-28" onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}>
      <div className="container">
        <p className="mb-6 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-8">{tagline}</p>
        <motion.div
          initial="initial"
          whileHover={direction}
          ref={ref}
          onMouseEnter={(event) => ref.current && setDirection(getDirection(event, ref.current))}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoverLinks.map((link, index) => (
            <a key={link.url} href={link.url} onMouseEnter={() => setHoveredIndex(index)} className="flex flex-col items-start gap-4 border-b border-white/20 py-5 sm:flex-row sm:items-center md:gap-8 md:py-6">
              <div className={clsx("heading-h5", rowText(index))}>{String(index + 1).padStart(2, "0")}</div>
              <h3 className={clsx("heading-h1", rowText(index))}>{link.heading}</h3>
              <span className="font-mono text-sm font-normal uppercase tracking-wide text-white/60">{link.tag}</span>
            </a>
          ))}
          <motion.div
            aria-hidden="true"
            className={clsx("pointer-events-none fixed inset-0 z-10 hidden size-[600px] lg:block", shown ? "opacity-100" : "opacity-0")}
            style={{
              translateX: cursor.x - 300 + (direction === "left" ? -50 : 0) + (direction === "right" ? 50 : 0),
              translateY: cursor.y - 300 + (direction === "top" ? -50 : 0) + (direction === "bottom" ? 50 : 0),
            }}
          >
            {shown && <motion.img className="aspect-video w-full max-w-md rounded-xl bg-black object-cover" variants={imageVariants} src={shown.src} alt="" decoding="async" />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
