// The handful of Relume UI pieces this site uses, rebuilt on the same primitives with the same classes.
// @relume_io/relume-ui ships as one module that bundlers can't tree-shake, so importing a single Button
// from it pulled date pickers, form libraries and resizable panels into every page.
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import * as React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { RxChevronDown } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const buttonVariants = cva(
  "focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border border-border-primary bg-background-alternative text-text-alternative",
        secondary: "border border-border-primary text-text-primary bg-background-primary",
        "secondary-alt": "border border-border-alternative text-text-alternative",
        tertiary: "text-text-primary",
        link: "border-0 text-text-primary gap-2",
        "link-alt": "border-0 text-text-alternative gap-2",
        ghost: "hover:bg-background-alternative hover:text-text-alternative",
      },
      size: { primary: "px-6 py-3", sm: "px-5 py-2", link: "p-0", icon: "size-10" },
    },
    defaultVariants: { variant: "primary", size: "primary" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; iconLeft?: React.ReactNode; iconRight?: React.ReactNode };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconLeft, iconRight, children, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {iconLeft}
        <Slottable>{children}</Slottable>
        {iconRight}
      </Component>
    );
  },
);
Button.displayName = "Button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode; iconPosition?: "left" | "right" };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, iconPosition = "left", ...props }, ref) => (
  <div className="relative flex w-full items-center">
    {icon && iconPosition === "left" && <div className="absolute left-3">{icon}</div>}
    <input
      type={type}
      className={cn(
        "flex size-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        icon ? (iconPosition === "left" ? "pl-[2.75rem] pr-3" : "pl-3 pr-[2.75rem]") : "px-3",
        className,
      )}
      ref={ref}
      {...props}
    />
    {icon && iconPosition === "right" && <div className="absolute right-3">{icon}</div>}
  </div>
));
Input.displayName = "Input";

// Layout effect in the browser (no flash of the wrong layout), plain effect during the prerender.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export function useMediaQuery(query: string, { defaultValue = false, initializeWithValue = true } = {}) {
  const matches = (value: string) => (typeof window === "undefined" ? defaultValue : window.matchMedia(value).matches);
  const [value, setValue] = React.useState(() => (initializeWithValue ? matches(query) : defaultValue));
  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setValue(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return value;
}

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("border-b border-border-primary first:border-t", className)} {...props} />);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  // Radix wraps the trigger in an <h3>; `header="div"` is for accordions that aren't a section of headings (a table of contents).
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { icon?: React.ReactNode; header?: "h3" | "div" }
>(({ className, children, icon = <RxChevronDown className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />, header: Header = "h3", ...props }, ref) => (
  <AccordionPrimitive.Header asChild>
    <Header className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn("flex flex-1 items-center justify-between py-4 font-bold transition-all focus-visible:outline-none focus-visible:ring-0 [&[data-state=open]>svg]:rotate-180", className)}
      {...props}
    >
      {children}
      {icon}
    </AccordionPrimitive.Trigger>
    </Header>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
    <div className={cn("pb-5", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

type CarouselApi = UseEmblaCarouselType[1];
type CarouselProps = {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};
type CarouselContextValue = CarouselProps & {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
};

export const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((carousel: CarouselApi) => {
      if (!carousel) return;
      setCanScrollPrev(carousel.canScrollPrev());
      setCanScrollNext(carousel.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
    const onKeyDownCapture = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );
    React.useEffect(() => {
      if (api && setApi) setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return (
      <CarouselContext.Provider value={{ carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
        <div ref={ref} onKeyDownCapture={onKeyDownCapture} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef}>
      <div ref={ref} className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return <div ref={ref} role="group" aria-roledescription="slide" className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)} {...props} />;
});
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "secondary", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute size-14 rounded-full bg-neutral-white", orientation === "horizontal" ? "left-0 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <BiLeftArrowAlt className="size-6" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "secondary", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute size-14 rounded-full bg-neutral-white", orientation === "horizontal" ? "right-0 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <BiRightArrowAlt className="size-6" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";
