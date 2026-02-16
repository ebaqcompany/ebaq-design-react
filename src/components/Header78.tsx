"use client";

import type { ButtonProps } from "@relume_io/relume-ui";
import { useRef, useEffect, useCallback, useState } from "react";
import Lottie from "lottie-react";

type MediaProps = {
  type: "image" | "lottie" | "video";
  src: string;
  alt?: string;
  bgColor?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  row1: MediaProps[];
  row2: MediaProps[];
  row3: MediaProps[];
  showRows?: (1 | 2 | 3)[];
};

export type Header78Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const LottieItem = ({ src, bgColor }: { src: string; bgColor?: string }) => {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie:", err));
  }, [src]);

  const backgroundColor = bgColor || "#171717";

  if (!animationData) {
    return <div className="absolute inset-0 size-full" style={{ backgroundColor }} />;
  }

  return (
    <div className="absolute inset-0 size-full flex items-center justify-center" style={{ backgroundColor }}>
      <Lottie
        animationData={animationData}
        loop
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const MediaItem = ({ item }: { item: MediaProps }) => {
  if (item.type === "lottie") {
    return <LottieItem src={item.src} bgColor={item.bgColor} />;
  }

  if (item.type === "video") {
    return (
      <video
        className="absolute inset-0 size-full object-cover"
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
        draggable={false}
      />
    );
  }

  return (
    <img
      className="absolute inset-0 size-full object-cover"
      src={item.src}
      alt={item.alt}
      draggable={false}
    />
  );
};

type DraggableRowProps = {
  items: MediaProps[];
  baseSpeed?: number;
  direction?: "left" | "right";
  initialOffset?: number;
  showBorder?: boolean;
};

const DraggableRow = ({ items, baseSpeed = 1, direction = "left", initialOffset = 0, showBorder = false }: DraggableRowProps) => {
  const directionMultiplier = direction === "left" ? 1 : -1;
  const rowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(-initialOffset);
  const velocityRef = useRef(baseSpeed);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  const animate = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    const totalWidth = row.scrollWidth / 3;

    if (!isDraggingRef.current) {
      // Apply velocity (base speed + any momentum from drag release)
      positionRef.current -= velocityRef.current * directionMultiplier;

      // Gradually return to base speed
      if (velocityRef.current > baseSpeed) {
        velocityRef.current *= 0.98; // Decay momentum
        if (velocityRef.current < baseSpeed + 0.1) {
          velocityRef.current = baseSpeed;
        }
      } else if (velocityRef.current < baseSpeed) {
        velocityRef.current *= 0.98;
        if (velocityRef.current > -baseSpeed - 0.1 && velocityRef.current < baseSpeed) {
          velocityRef.current = baseSpeed;
        }
      }
    }

    // Wrap around for seamless loop
    if (positionRef.current <= -totalWidth) {
      positionRef.current += totalWidth;
    } else if (positionRef.current > 0) {
      positionRef.current -= totalWidth;
    }

    row.style.transform = `translateX(${positionRef.current}px)`;
    animationRef.current = requestAnimationFrame(animate);
  }, [baseSpeed, directionMultiplier]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    dragVelocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();

    const currentX = e.clientX;
    const currentTime = Date.now();
    const deltaX = currentX - lastXRef.current;
    const deltaTime = currentTime - lastTimeRef.current;

    // Calculate drag velocity
    if (deltaTime > 0) {
      dragVelocityRef.current = deltaX / deltaTime * 16; // Normalize to ~60fps
    }

    positionRef.current += deltaX;
    lastXRef.current = currentX;
    lastTimeRef.current = currentTime;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Apply momentum from drag - speed up in drag direction
      const momentum = Math.abs(dragVelocityRef.current);
      if (momentum > 1) {
        // If dragged right (positive), go left faster; if dragged left (negative), go right
        velocityRef.current = dragVelocityRef.current > 0
          ? -momentum * 2  // Dragged right, speed up going left
          : momentum * 2;   // Dragged left, speed up going right
      }
    }
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      handleMouseUp();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.touches[0].clientX;
    lastTimeRef.current = Date.now();
    dragVelocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;

    const currentX = e.touches[0].clientX;
    const currentTime = Date.now();
    const deltaX = currentX - lastXRef.current;
    const deltaTime = currentTime - lastTimeRef.current;

    if (deltaTime > 0) {
      dragVelocityRef.current = deltaX / deltaTime * 16;
    }

    positionRef.current += deltaX;
    lastXRef.current = currentX;
    lastTimeRef.current = currentTime;
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const momentum = Math.abs(dragVelocityRef.current);
      if (momentum > 1) {
        velocityRef.current = dragVelocityRef.current > 0
          ? -momentum * 2
          : momentum * 2;
      }
    }
  };

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={rowRef}
        className="flex gap-4 will-change-transform"
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 w-[60vw] sm:w-[18rem] md:w-[26rem] aspect-[4/3] rounded-lg overflow-hidden ${showBorder ? "border border-gray-200" : ""}`}
          >
            <MediaItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Header78 = (props: Header78Props) => {
  const { heading, description: _description, buttons: _buttons, row1, row2, row3, showRows } = {
    ...Header78Defaults,
    ...props,
  };

  const visibleRows = showRows || [1, 2, 3];

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28 bg-white">
      <div className="px-[5%] mb-12 md:mb-18 lg:mb-20">
        <h1 className="text-[2.5rem] md:text-[5rem] lg:text-[6rem] whitespace-pre-line tracking-[-0.05em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300", lineHeight: 1 }}>{heading}</h1>
      </div>

      <div className="flex flex-col gap-4">
        {visibleRows.includes(1) && <DraggableRow items={row1} baseSpeed={1} direction="left" />}
        {visibleRows.includes(2) && <DraggableRow items={row2} baseSpeed={1} direction="right" showBorder />}
        {visibleRows.includes(3) && <DraggableRow items={row3} baseSpeed={1.5} direction="left" initialOffset={208} />}
      </div>
    </section>
  );
};

export const Header78Defaults: Props = {
  heading: "World-class branding\nfor one clear price.",
  description:
    "Work directly with a senior designer to launch your complete brand identity in just one week. Nearly 20 years of experience. No junior handoffs.",
  buttons: [{ title: "See Pricing" }, { title: "View Work", variant: "secondary" }],

  // Row 1: Logo Animations
  row1: [
    { type: "lottie", src: "/portfolio/logos/aero-logo.json", alt: "Aero", bgColor: "#63f3c0" },
    { type: "lottie", src: "/portfolio/logos/airporteexecutive-logo.json", alt: "Airport Executive", bgColor: "#000000" },
    { type: "lottie", src: "/portfolio/logos/brevidee-logo.json", alt: "Brevidee", bgColor: "#FCE5E9" },
    { type: "lottie", src: "/portfolio/logos/focal-logo.json", alt: "Focal", bgColor: "#0065cc" },
    { type: "lottie", src: "/portfolio/logos/foxberman-logo.json", alt: "Foxberman", bgColor: "#f3603c" },
    { type: "lottie", src: "/portfolio/logos/lauraceara-logo.json", alt: "Laura Ceara", bgColor: "#123951" },
    { type: "lottie", src: "/portfolio/logos/medihuanna-logo.json", alt: "Medihuanna", bgColor: "#11403f" },
    { type: "lottie", src: "/portfolio/logos/periti-logo.json", alt: "Periti", bgColor: "#000000" },
    { type: "lottie", src: "/portfolio/logos/sweetgrass-logo.json", alt: "Sweetgrass", bgColor: "#434343" },
    { type: "lottie", src: "/portfolio/logos/ventur-logo.json", alt: "Ventur", bgColor: "#9047ff" },
    { type: "lottie", src: "/portfolio/logos/wingnut-logo.json", alt: "Wingnut", bgColor: "#77aeb1" },
    { type: "lottie", src: "/portfolio/logos/lyntics-logo.json", alt: "Lyntics", bgColor: "#374652" },
  ],

  // Row 2: Identity/Bento Shots
  row2: [
    { type: "image", src: "/portfolio/identities/aero-bento.webp", alt: "Aero Identity" },
    { type: "image", src: "/portfolio/identities/airport-executive-bento.jpg", alt: "Airport Executive Identity" },
    { type: "image", src: "/portfolio/identities/brevidee-bento.jpg", alt: "Brevidee Identity" },
    { type: "image", src: "/portfolio/identities/forberman-bento.jpg", alt: "Foxberman Identity" },
    { type: "image", src: "/portfolio/identities/laura-ceara-bento.jpg", alt: "Laura Ceara Identity" },
    { type: "image", src: "/portfolio/identities/lyntics-bento.jpg", alt: "Lyntics Identity" },
    { type: "image", src: "/portfolio/identities/medihuanna-bento.jpg", alt: "Medihuanna Identity" },
    { type: "image", src: "/portfolio/identities/periti-bento.jpg", alt: "Periti Identity" },
    { type: "image", src: "/portfolio/identities/sweetgrass-bento.jpg", alt: "Sweetgrass Identity" },
    { type: "image", src: "/portfolio/identities/ventur-bento.jpg", alt: "Ventur Identity" },
    { type: "image", src: "/portfolio/identities/wingnut-bento.jpg", alt: "Wingnut Identity" },
  ],

  // Row 3: Website Shots
  row3: [
    { type: "image", src: "/portfolio/websites/aero-web.jpg", alt: "Aero Website" },
    { type: "video", src: "/portfolio/websites/airport-executive-web.mp4", alt: "Airport Executive Website" },
    { type: "video", src: "/portfolio/websites/brevidee-web.mp4", alt: "Brevidee Website" },
    { type: "video", src: "/portfolio/websites/fox-berman-web.mp4", alt: "Foxberman Website" },
    { type: "image", src: "/portfolio/websites/laura-ceara-web.jpg", alt: "Laura Ceara Website" },
    { type: "video", src: "/portfolio/websites/periti-web.mp4", alt: "Periti Website" },
    { type: "image", src: "/portfolio/websites/sweetgras-web.jpg", alt: "Sweetgrass Website" },
    { type: "image", src: "/portfolio/websites/ventur-web.jpg", alt: "Ventur Website" },
    { type: "video", src: "/portfolio/websites/wingnut-web.mp4", alt: "Wingnut Website" },
  ],
};
