# Relume 2 components  (2 sections · 3 primitive files)

Vendored shadcn-style: write these files into your project and you own them — no @relume_io/relume-ui dependency.

## Sections — write these

### Portfolio 11  (slug: portfolio11)
// File: Portfolio11.tsx
```tsx
import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight } from "relume-icons";

type ImageProps = {
  src: string;
  alt?: string;
};

type Tag = {
  label: string;
  url: string;
};

type ProjectProps = {
  title: string;
  description: string;
  image: ImageProps;
  url: string;
  button: ButtonProps;
  tags: Tag[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  projects: ProjectProps[];
  button: ButtonProps;
};

export type Portfolio11Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Portfolio11 = (props: Portfolio11Props) => {
  const { tagline, heading, description, projects, button } = {
    ...Portfolio11Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <header className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </header>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
        <footer className="mt-12 flex justify-center md:mt-18 lg:mt-20">
          <Button {...button}>{button.title}</Button>
        </footer>
      </div>
    </section>
  );
};

const Project: React.FC<ProjectProps> = ({ title, description, image, url, button, tags }) => (
  <article>
    <div className="mb-5 md:mb-6">
      <a href={url}>
        <img src={image.src} className="w-full rounded-image object-cover" alt={image.alt} />
      </a>
    </div>
    <h3 className="mb-2 text-h5 font-bold">
      <a href={url}>{title}</a>
    </h3>
    <p>{description}</p>
    <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
      {tags.map((tag, index) => (
        <Badge key={index}>
          <a href={tag.url}>{tag.label}</a>
        </Badge>
      ))}
    </div>
    <Button {...button} asChild className="mt-5 md:mt-6">
      <a href={url}>{button.title}</a>
    </Button>
  </article>
);

const project: ProjectProps = {
  title: "Project name here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Relume placeholder image",
  },
  url: "#",
  button: {
    title: "View project",
    variant: "link",
    size: "link",
    iconRight: <ChevronRight className="text-scheme-text" />,
  },
  tags: [
    {
      label: "Tag one",
      url: "#",
    },
    {
      label: "Tag two",
      url: "#",
    },
    {
      label: "Tag three",
      url: "#",
    },
  ],
};

export const Portfolio11Defaults: Props = {
  tagline: "Portfolio",
  heading: "Short heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  projects: [project, project, project],
  button: {
    title: "View all",
    variant: "secondary",
  },
};
```

### Layout 242  (slug: layout242)
// File: Layout242.tsx
```tsx
import { ChevronRight, RelumeIcon } from "relume-icons";

import { Button, type ButtonProps } from "@/components/ui/button";

type SectionProps = {
  heading: string;
  description: string;
  button: ButtonProps;
};

type Props = {
  heading: string;
  sections: SectionProps[];
};

export type Layout242Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout242 = (props: Layout242Props) => {
  const { heading, sections } = { ...Layout242Defaults, ...props };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
            <h3 className="text-h3 font-bold">{heading}</h3>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            {sections.map((section, index) => (
              <div key={index}>
                <div className="mb-5 md:mb-6">
                  <RelumeIcon className="size-12 text-scheme-text" />
                </div>
                <h3 className="mb-5 text-h5 font-bold md:mb-6">{section.heading}</h3>
                <p className="mb-5 md:mb-6">{section.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <Button {...section.button}>{section.button.title}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout242Defaults: Props = {
  heading: "Long heading is what you see here in this feature section",
  sections: [
    {
      heading: "Long heading is what you see here in this feature section",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      button: {
        title: "Button",
        variant: "link",
        size: "link",
        iconRight: <ChevronRight className="text-scheme-text" />,
      },
    },
    {
      heading: "Long heading is what you see here in this feature section",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      button: {
        title: "Button",
        variant: "link",
        size: "link",
        iconRight: <ChevronRight className="text-scheme-text" />,
      },
    },
    {
      heading: "Long heading is what you see here in this feature section",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      button: {
        title: "Button",
        variant: "link",
        size: "link",
        iconRight: <ChevronRight className="text-scheme-text" />,
      },
    },
  ],
};
```

## Primitives — fetch their source with get_primitives

- utils  →  lib/utils.ts
- badge  →  components/ui/badge.tsx
- button  →  components/ui/button.tsx

## Install
npm i @radix-ui/react-slot class-variance-authority@0.7.1 clsx@^2.1.1 relume-icons@1.3.0 tailwind-merge@^2.2.2

## One-time setup (idempotent — safe to re-run)
- Path alias: ensure "@/*" resolves to your source root (tsconfig paths).
- Tailwind: add the @relume_io/relume-tailwind preset + content globs.
- Icons: npm i relume-icons.
Run get_setup_instructions once for the full, copy-paste setup.
