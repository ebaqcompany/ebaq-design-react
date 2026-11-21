# Relume Header 104  (1 section · 2 primitive files)

Vendored shadcn-style: write these files into your project and you own them — no @relume_io/relume-ui dependency.

## Sections — write these

### Header 104  (slug: header104)
// File: Header104.tsx
```tsx
import { Button, type ButtonProps } from "@/components/ui/button";

type HeaderProps = {
  heading: string;
  bgUrl?: string;
};

type Props = {
  headers: HeaderProps[];
  description: string;
  buttons: ButtonProps[];
};

export type Header104Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header104 = (props: Header104Props) => {
  const { headers, description, buttons } = {
    ...Header104Defaults,
    ...props,
  };
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl overflow-hidden text-center">
        <h1 className="mb-5 text-[1.75rem] leading-[1.2] font-bold sm:text-[2.5rem] md:mb-6 md:text-[3.25rem] lg:text-[5rem]">
          {headers.map((header, index) => (
            <span key={index}>
              {header.bgUrl ? (
                <span
                  className="bg-contain bg-no-repeat pr-16 [background-position-x:100%] [background-position-y:center] sm:pr-[5.75rem] md:pr-[7.5rem] lg:pr-[11.5rem]"
                  style={{
                    backgroundImage: `url('${header.bgUrl}')`,
                  }}
                >
                  {header.heading}
                </span>
              ) : (
                " " + header.heading + " "
              )}
            </span>
          ))}
        </h1>
        <p className="text-medium">{description}</p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Header104Defaults: Props = {
  headers: [
    {
      heading: "Long",
      bgUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    },
    {
      heading: "heading is what you see here in this",
    },
    {
      heading: "header",
      bgUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    },
    {
      heading: "section",
    },
  ],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  buttons: [
    {
      title: "Button",
    },
    {
      title: "Button",
      variant: "secondary",
    },
  ],
};
```

## Primitives — fetch their source with get_primitives

- utils  →  lib/utils.ts
- button  →  components/ui/button.tsx

## Install
npm i @radix-ui/react-slot class-variance-authority@0.7.1 clsx@^2.1.1 tailwind-merge@^2.2.2

## One-time setup (idempotent — safe to re-run)
- Path alias: ensure "@/*" resolves to your source root (tsconfig paths).
- Tailwind: add the @relume_io/relume-tailwind preset + content globs.
- Icons: npm i relume-icons.
Run get_setup_instructions once for the full, copy-paste setup.
