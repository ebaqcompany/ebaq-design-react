import { Reorder } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type FooterWordmarkMode = "static" | "reorder";

type FooterWordmarkProps = {
  alt: string;
  mode?: FooterWordmarkMode;
  src: string;
};

type LetterTransform = {
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
  translateY?: number;
};

type LetterGlyph = {
  accentId?: string;
  pathId: string;
  rightKerning?: number;
  sourceX: number;
  visualBounds?: { left: number; right: number };
};

type Letter = {
  accentId?: string;
  bodyWidth: number;
  id: string;
  label: string;
  pathId: string;
  glyphs?: LetterGlyph[];
  rightKerning?: number;
  transforms: LetterTransform[];
  visualBounds?: Array<{ left: number; right: number }>;
  x: number;
};

type InteractiveLetter = Letter & {
  dimmed: boolean;
  transformIndex: number;
};

const unchanged: LetterTransform[] = [{}];
const sAndZ: LetterTransform[] = [{}, { scaleX: -1 }];
const qAndG: LetterTransform[] = [{}, {}];
// The lowercase body runs from y=33.471 to the shared y=119.085 baseline.
// Rotating around the full wordmark center adds 3.412 units, so remove exactly that drift.
const baselineCorrection = -3.412;
const eAndA: LetterTransform[] = [{}, { rotate: 180, translateY: baselineCorrection }];
const nAndU: LetterTransform[] = [{}, { scaleY: -1, translateY: baselineCorrection }];
const bdpFromB: LetterTransform[] = [
  {},
  { scaleX: -1 },
  { scaleY: -1, translateY: baselineCorrection },
];
const bdpFromD: LetterTransform[] = [
  {},
  { scaleX: -1 },
  { scaleX: -1, scaleY: -1, translateY: baselineCorrection },
];

const standardBodyWidth = 51.34;
const opticalGap = 9.75;
const qVisualWidth = 76.85;

const initialLetters: Letter[] = [
  { id: "e1", label: "e", pathId: "letter-e1", accentId: "accent-e1", x: 0, bodyWidth: standardBodyWidth, transforms: eAndA },
  { id: "b", label: "b", pathId: "letter-b", x: 61.09, bodyWidth: standardBodyWidth, transforms: bdpFromB },
  { id: "a", label: "a", pathId: "letter-a", accentId: "accent-a", x: 122.18, bodyWidth: standardBodyWidth, transforms: eAndA },
  {
    id: "q",
    label: "q",
    pathId: "letter-q",
    accentId: "accent-q",
    x: 183.27,
    bodyWidth: standardBodyWidth,
    transforms: qAndG,
    glyphs: [
      {
        pathId: "letter-q",
        accentId: "accent-q",
        sourceX: 183.27,
        rightKerning: standardBodyWidth - qVisualWidth,
        visualBounds: { left: 0, right: qVisualWidth },
      },
      {
        pathId: "letter-g",
        accentId: "accent-g",
        sourceX: 454.5,
      },
    ],
  },
  { id: "d", label: "d", pathId: "letter-d", x: 244.42, bodyWidth: standardBodyWidth, transforms: bdpFromD },
  { id: "e2", label: "e", pathId: "letter-e2", accentId: "accent-e2", x: 305.51, bodyWidth: standardBodyWidth, transforms: eAndA },
  { id: "s", label: "s", pathId: "letter-s", x: 366.6, bodyWidth: standardBodyWidth, transforms: sAndZ },
  { id: "i", label: "i", pathId: "letter-i", accentId: "accent-i", x: 427.69, bodyWidth: 17.06, transforms: unchanged },
  {
    id: "g",
    label: "g",
    pathId: "letter-g",
    accentId: "accent-g",
    x: 454.5,
    bodyWidth: standardBodyWidth,
    transforms: qAndG,
    glyphs: [
      {
        pathId: "letter-g",
        accentId: "accent-g",
        sourceX: 454.5,
      },
      {
        pathId: "letter-q",
        accentId: "accent-q",
        sourceX: 183.27,
        rightKerning: standardBodyWidth - qVisualWidth,
        visualBounds: { left: 0, right: qVisualWidth },
      },
    ],
  },
  { id: "n", label: "n", pathId: "letter-n", x: 515.59, bodyWidth: standardBodyWidth, transforms: nAndU },
];

const interactiveLogoSrc = "/ebaqdesign-logo-interactive.svg";
const logoHeight = 155.96817;
const dimSwipeThreshold = 48;

const LetterShape = ({
  dragOffset = 0,
  letter,
  markup,
  sourceX,
  slotX,
}: {
  dragOffset?: number;
  letter: InteractiveLetter;
  markup: string;
  sourceX: number;
  slotX: number;
}) => {
  const transform = letter.transforms[letter.transformIndex];
  const centerX = sourceX + letter.bodyWidth / 2;
  const centerY = logoHeight / 2;
  const svgTransform = [
    `translate(${slotX - sourceX + dragOffset} ${transform.translateY ?? 0})`,
    `translate(${centerX} ${centerY})`,
    `rotate(${transform.rotate ?? 0})`,
    `scale(${transform.scaleX ?? 1} ${transform.scaleY ?? 1})`,
    `translate(${-centerX} ${-centerY})`,
  ].join(" ");

  return (
    <g
      opacity={letter.dimmed ? 0.15 : 1}
      transform={svgTransform}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export const FooterWordmark = ({ alt, mode = "static", src }: FooterWordmarkProps) => {
  const [letters, setLetters] = useState<InteractiveLetter[]>(
    initialLetters.map((letter) => ({ ...letter, dimmed: false, transformIndex: 0 })),
  );
  const [letterMarkup, setLetterMarkup] = useState<Record<string, string[]> | null>(null);
  const [dragState, setDragState] = useState<{ id: string; offset: number; startSlotX: number } | null>(null);
  const draggedLetter = useRef<string | null>(null);
  const pointerStart = useRef<{ id: string; x: number; y: number } | null>(null);
  const swipeAction = useRef<string | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mode !== "reorder") return;
    const controller = new AbortController();
    fetch(interactiveLogoSrc, { signal: controller.signal })
      .then((response) => response.text())
      .then((source) => {
        const document = new DOMParser().parseFromString(source, "image/svg+xml");
        const markup = Object.fromEntries(initialLetters.map((letter) => {
          const glyphs = letter.glyphs ?? [{
            pathId: letter.pathId,
            accentId: letter.accentId,
            sourceX: letter.x,
          }];
          return [letter.id, glyphs.map((glyph) => {
            const mainElement = document.getElementById(glyph.pathId)?.cloneNode(true) as Element | undefined;
            const accentElement = glyph.accentId
              ? document.getElementById(glyph.accentId)?.cloneNode(true) as Element | undefined
              : undefined;
            mainElement?.setAttribute("fill", "#fff");
            accentElement?.setAttribute("fill", "#00afec");
            return `${mainElement?.outerHTML ?? ""}${accentElement?.outerHTML ?? ""}`;
          })];
        }));
        setLetterMarkup(markup);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLetterMarkup(null);
      });
    return () => controller.abort();
  }, [mode]);

  if (mode === "static" || !letterMarkup) {
    return <img src={src} alt={alt} className="h-full w-full object-contain" />;
  }

  const cycleTransform = (id: string) => {
    if (draggedLetter.current === id || swipeAction.current === id) return;
    setLetters((current) => current.map((letter) => (
      letter.id === id && letter.transforms.length > 1
        ? { ...letter, transformIndex: (letter.transformIndex + 1) % letter.transforms.length }
        : letter
    )));
  };

  const toggleDimmed = (id: string) => {
    setLetters((current) => current.map((letter) => (
      letter.id === id ? { ...letter, dimmed: !letter.dimmed } : letter
    )));
  };

  let nextSlotX = 0;
  const positionedLetters = letters.map((letter) => {
    const glyph = letter.glyphs?.[letter.transformIndex];
    const bounds = glyph?.visualBounds
      ?? letter.visualBounds?.[letter.transformIndex]
      ?? { left: 0, right: letter.bodyWidth };
    const layoutWidth = bounds.right - bounds.left + opticalGap
      + (glyph?.rightKerning ?? letter.rightKerning ?? 0);
    const positionedLetter = { glyph, letter, layoutWidth, slotX: nextSlotX };
    nextSlotX += layoutWidth;
    return positionedLetter;
  });
  const logoWidth = nextSlotX;
  const slotByLetter = Object.fromEntries(positionedLetters.map(({ letter, slotX }) => [letter.id, slotX]));

  return (
    <Reorder.Group
      as="div"
      axis="x"
      values={letters}
      onReorder={setLetters}
      ref={wordmarkRef}
      className="relative flex h-full w-full items-stretch"
      aria-label={`${alt}, draggable letter wordmark`}
    >
      <svg
        key={`${letters.map((letter) => `${letter.id}:${letter.transformIndex}:${letter.dimmed}`).join("|")}:${Math.round(dragState?.offset ?? 0)}`}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${logoWidth} ${logoHeight}`}
        aria-hidden="true"
      >
        {positionedLetters.map(({ glyph, letter, slotX }) => (
          <LetterShape
            key={letter.id}
            letter={letter}
            markup={letterMarkup[letter.id][letter.glyphs ? letter.transformIndex : 0]}
            sourceX={glyph?.sourceX ?? letter.x}
            slotX={slotX}
            dragOffset={dragState?.id === letter.id
              ? dragState.offset - (slotX - dragState.startSlotX)
              : 0}
          />
        ))}
      </svg>
      {positionedLetters.map(({ letter, layoutWidth }) => (
        <Reorder.Item
          as="div"
          key={letter.id}
          value={letter}
          dragMomentum={false}
          className="footer-wordmark-slot relative h-full shrink-0 cursor-grab active:z-10 active:cursor-grabbing"
          style={{ width: `${(layoutWidth / logoWidth) * 100}%` }}
          onContextMenu={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleDimmed(letter.id);
          }}
          onPointerDown={(event) => {
            pointerStart.current = { id: letter.id, x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            const start = pointerStart.current;
            pointerStart.current = null;
            if (!start || start.id !== letter.id) return;

            const deltaX = event.clientX - start.x;
            const deltaY = event.clientY - start.y;
            const isUpwardDimSwipe = deltaY <= -dimSwipeThreshold
              && Math.abs(deltaY) > Math.abs(deltaX) * 1.2;

            if (!isUpwardDimSwipe) return;
            event.preventDefault();
            event.stopPropagation();
            swipeAction.current = letter.id;
            draggedLetter.current = letter.id;
            toggleDimmed(letter.id);
            window.setTimeout(() => {
              if (swipeAction.current === letter.id) swipeAction.current = null;
              if (draggedLetter.current === letter.id) draggedLetter.current = null;
            }, 0);
          }}
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
          onDragStart={() => {
            draggedLetter.current = letter.id;
            setDragState({ id: letter.id, offset: 0, startSlotX: slotByLetter[letter.id] });
          }}
          onDrag={(_, info) => {
            const renderedWidth = wordmarkRef.current?.getBoundingClientRect().width ?? logoWidth;
            setDragState((current) => current?.id === letter.id
              ? { ...current, offset: info.offset.x * (logoWidth / renderedWidth) }
              : current);
          }}
          onDragEnd={() => {
            setDragState(null);
            window.setTimeout(() => { draggedLetter.current = null; }, 0);
          }}
          whileDrag={{ scale: 1.04 }}
        >
          <button
            type="button"
            className="footer-wordmark-letter block h-full w-full touch-none select-none bg-transparent p-0"
            aria-label={`${letter.label} logo letter${letter.transforms.length > 1 ? ", click to transform" : ""}`}
            onClick={() => cycleTransform(letter.id)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
