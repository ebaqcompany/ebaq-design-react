# Relume Layout 412  (1 section)

Vendored shadcn-style: write these files into your project and you own them — no @relume_io/relume-ui dependency.

## Sections — write these

### Layout 412  (slug: layout412)
// File: Layout412.tsx
```tsx
import { motion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight } from "relume-icons";

type ImageProps = {
  src: string;
  alt?: string;
};

type SubHeadingProps = {
  title: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  subHeadings: SubHeadingProps[];
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Layout412Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout412 = (props: Layout412Props) => {
  const { tagline, heading, description, buttons, image, subHeadings } = {
    ...Layout412Defaults,
    ...props,
  };

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-0">
          <div className="md:mr-12 lg:mr-20">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h1>
            <p className="mb-6 text-medium md:mb-8">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <h6 className="mb-3 text-h6 font-bold md:mb-4">{subHeading.title}</h6>
                  <p>{subHeading.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <motion.div
            className="relative justify-self-end pt-[100%]"
            initial={
              isMobile ? { width: "100%", height: "100%" } : { width: "200%", height: "100%" }
            }
            whileInView={{ width: "100%", height: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 size-full rounded-image object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Layout412Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  subHeadings: [
    {
      title: "Subheading one",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    },
    {
      title: "Subheading two",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    },
  ],
  buttons: [
    { title: "Button", variant: "secondary" },
    {
      title: "Button",
      variant: "link",
      size: "link",
      iconRight: <ChevronRight />,
    },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
};
```

## Install
npm i motion@^12.15.0 relume-icons@1.3.0

## One-time setup (idempotent — safe to re-run)
- Path alias: ensure "@/*" resolves to your source root (tsconfig paths).
- Tailwind: add the @relume_io/relume-tailwind preset + content globs.
- Icons: npm i relume-icons.
Run get_setup_instructions once for the full, copy-paste setup.
