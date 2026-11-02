// Relume Gallery 10: a three-column masonry of process sketches and studio photos.
// Adapted with intrinsic sizes (no layout shift) and lazy loading.
type ImageProps = { src: string; alt: string; width: number; height: number };

type Props = {
  heading: string;
  description: string;
  images: ImageProps[];
};

export type Gallery10Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Gallery10 = (props: Gallery10Props) => {
  const { heading, description, images, ...sectionProps } = { ...Gallery10Defaults, ...props };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" aria-labelledby="gallery10-heading" {...sectionProps}>
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 id="gallery10-heading" className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="gap-8 md:columns-3">
          {images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="mb-8 block h-auto w-full break-inside-avoid"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const process = (file: string, alt: string, width: number, height: number): ImageProps => ({
  src: `/images/about/process/${file}.webp`,
  alt,
  width,
  height,
});

export const Gallery10Defaults: Props = {
  heading: "Every logo starts on paper",
  description: "Before anything goes digital, I sketch dozens of directions by hand, pin them on the wall, and pressure-test them. This is what that looks like.",
  images: [
    process("arek-sketching-logo-concepts", "Arek Dvornechuck sketching logo concepts with markers", 1500, 1500),
    process("airport-executive-monogram-sketches", "Airport Executive AE monogram sketches on grid paper", 1200, 800),
    process("dti-logo-concepts-wall", "Drilling Tools International DTI logo concepts pinned to the studio wall with handwritten notes", 900, 1600),
    process("brevidee-logo-concepts-wall", "Brevidee logo concepts pinned to the studio wall", 1200, 1600),
    process("arek-reviewing-concept-wall", "Arek reviewing logo concepts pinned to a whiteboard", 900, 1600),
    process("gear-logo-pencil-sketch", "Pencil sketch of interlocking gear marks", 600, 375),
    process("ink-calligraphy-lettering", "Blackletter calligraphy drawn in ink with a wooden pen on grid paper", 600, 375),
    process("arek-studio-desk-setup", "Arek Dvornechuck at his Brooklyn studio desk with brand work on screen and a Pantone fan guide", 1200, 1600),
    process("hand-drawing-logo-construction", "Hand-drawing a logo construction with pen and ruler", 1200, 1600),
    process("wingnut-wordmark-construction-sketch", "Close-up of the Wingnut wordmark sketch with alignment and font notes on grid paper", 1200, 675),
    process("w-entertainment-crown-sketches", "W Entertainment crown mark sketches", 890, 688),
    process("clay-smiley-mark", "Smiley mark modelled in green clay", 600, 375),
    process("savory-monogram-sketchbook", "Savory S monogram explorations in a sketchbook", 1200, 1600),
    process("arek-sketching-at-desk", "Arek sketching at his studio desk", 1400, 933),
    process("fox-berman-logo-animation-sketch", "Fox Berman ampersand animation sketch", 1600, 900),
    process("probasket-logo-sketch", "Probasket basketball logo sketch", 1240, 775),
    process("kultra-k-construction-sketch", "Kultra K mark construction lines on grid paper", 1200, 1600),
    process("sukoon-logo-sketch", "Sukoon logo sketch", 600, 400),
    process("logo-concept-sketches-markers", "Logo concept sketches with markers", 1600, 1200),
    process("client-session-lobby", "Working through logo options in a client session", 576, 1024),
    process("carwao-logo-sketch", "Carwao wordmark sketch with notes", 736, 569),
    process("whiteboard-logo-concepts", "Logo concepts sketched on a whiteboard", 1200, 1600),
    process("foodiecard-logo-sketch", "FoodieCard logo sketch with a red brush", 1240, 775),
    process("logo-explorations-laptop", "Logo explorations on a laptop beside paper sketches", 1200, 1600),
    process("flush-wordmark-sketch", "Flush wordmark sketch on dot-grid paper", 720, 540),
    process("savory-monogram-sketchbook-2", "More Savory monogram explorations in a sketchbook", 1200, 1600),
    process("studio-sketch-review", "Reviewing sketches in the studio", 1600, 900),
    process("logo-explorations-desk", "Logo explorations printed and laid out on the desk", 1200, 1600),
  ],
};
