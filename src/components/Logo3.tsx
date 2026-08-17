import { clientLogoClass, type ClientLogoScale } from "../clientLogo";

type ImageProps = { src: string; alt?: string; scale?: ClientLogoScale; offset?: "up-5" | "up-10" | "down-5" };
type Props = { heading: string; logos: ImageProps[] };
export type Logo3Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Logo3 = (props: Logo3Props) => {
  const { heading, logos } = { ...Logo3Defaults, ...props };
  return (
    <section {...props} className="overflow-hidden pb-12 pt-6 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10">
      <div className="container mb-8 w-full max-w-lg px-[5%] md:mb-10 lg:mb-12">
        <h5 className="text-center">{heading}</h5>
      </div>
      <div className="flex items-center overflow-hidden pt-7 md:pt-0">
        <div className="logo-marquee-track">
          {[0, 1].map((groupIndex) => <div key={groupIndex} aria-hidden={groupIndex === 1} className="logo-marquee-group">{logos.map((logo, logoIndex) => <img key={logoIndex} className={`${clientLogoClass(logo.scale)}${logo.offset ? ` logo-marquee-offset--${logo.offset}` : ""}`} src={logo.src} alt={logo.alt ?? ""} />)}</div>)}
        </div>
      </div>
    </section>
  );
};

export const Logo3Defaults: Props = {
  heading: "Trusted by ambitious teams",
  logos: [
    { src: "/client-logos/elevate-wordmark.svg", alt: "Elevate", scale: 72, offset: "up-5" },
    { src: "/client-logos/nextdim-wordmark.svg", alt: "Next Dim AI", scale: 90 },
    { src: "/client-logos/foxberman-wordmark.svg", alt: "FOX BERMAN", scale: 50 },
    { src: "/client-logos/medihuanna-wordmark-black.svg", alt: "Medihuanna", scale: 80, offset: "up-10" },
    { src: "/client-logos/ventur-wordmark.svg", alt: "Ventur", scale: 81 },
    { src: "/client-logos/aero-health-logo.svg", alt: "Aero Health", scale: 72 },
    { src: "/client-logos/airport-executive-logo.svg", alt: "Airport Executive", scale: 95 },
    { src: "/client-logos/ami-logo-black.svg", alt: "AMI", scale: 110, offset: "down-5" },
    { src: "/client-logos/brevidee-logo.svg", alt: "Brevidee", scale: 80 },
    { src: "/client-logos/wingnut-logo-black.svg", alt: "Wingnut", scale: 99.75 },
    { src: "/client-logos/brand-makers-logo-black.svg", alt: "Brand Makers", scale: 60 },
    { src: "/client-logos/sweetgrass-logo-black.svg", alt: "SweetGrass", scale: 60 },
    { src: "/client-logos/periti-logo-black.svg", alt: "Periti", scale: 85.5 },
    { src: "/client-logos/octane.svg", alt: "Octane", scale: 95 },
    { src: "/client-logos/figrr.svg", alt: "Figrr", scale: 110 },
    { src: "/client-logos/lyntics-logo-black.svg", alt: "Lyntics", scale: 95 },
    { src: "/runware-logo.png", alt: "Runware", scale: 56 },
  ],
};
