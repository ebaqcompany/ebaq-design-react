# Relume Layout 6  (1 section)

Vendored shadcn-style: write these files into your project and you own them — no @relume_io/relume-ui dependency.

## Sections — write these

### Layout 6  (slug: layout6)
// File: Layout6.tsx
```tsx
type ImageProps = {
  src: string;
  alt?: string;
};

type SubHeadingProps = {
  title: string;
  description: string;
};

type Props = {
  heading: string;
  description: string;
  subHeadings: SubHeadingProps[];
  image: ImageProps;
};

export type Layout6Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout6 = (props: Layout6Props) => {
  const { heading, description, image, subHeadings } = {
    ...Layout6Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="mb-5 text-h3 font-bold md:mb-6">{heading}</h1>
            <p className="mb-6 text-medium md:mb-8">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <h6 className="mb-3 text-h6 font-bold md:mb-4">{subHeading.title}</h6>
                  <p>{subHeading.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={image.src} className="w-full rounded-image object-cover" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout6Defaults: Props = {
  heading: "Long heading is what you see here in this feature section",
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
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
};
```

## Install
(no third-party dependencies)

## One-time setup (idempotent — safe to re-run)
- Path alias: ensure "@/*" resolves to your source root (tsconfig paths).
- Tailwind: add the @relume_io/relume-tailwind preset + content globs.
- Icons: npm i relume-icons.
Run get_setup_instructions once for the full, copy-paste setup.
