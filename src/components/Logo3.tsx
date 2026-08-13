import { clientLogoClass, type ClientLogoScale } from "../clientLogo";

type ImageProps = { src: string; alt?: string; scale?: ClientLogoScale };
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
        <div className="animate-loop-horizontally flex w-max shrink-0 items-center gap-12 md:gap-16">
          {[0, 1].map((groupIndex) => <div key={groupIndex} aria-hidden={groupIndex === 1} className="flex shrink-0 items-center gap-12 md:gap-16">{logos.map((logo, logoIndex) => <img key={logoIndex} className={clientLogoClass(logo.scale)} src={logo.src} alt={logo.alt ?? ""} />)}</div>)}
        </div>
      </div>
    </section>
  );
};

export const Logo3Defaults: Props = {
  heading: "Trusted by ambitious teams",
  logos: [
    { src: "/client-logos/elevate-wordmark.svg", alt: "Elevate", scale: 90 },
    { src: "/client-logos/nextdim-wordmark.svg", alt: "Next Dim AI", scale: 90 },
    { src: "/client-logos/foxberman-wordmark.svg", alt: "FOX BERMAN", scale: 50 },
    { src: "/client-logos/medihuanna-wordmark-black.svg", alt: "Medihuanna", scale: 80 },
    { src: "/client-logos/ventur-wordmark.svg", alt: "Ventur", scale: 90 },
    { src: "/client-logos/aero-health-logo.svg", alt: "Aero Health", scale: 80 },
    { src: "/client-logos/airport-executive-logo.svg", alt: "Airport Executive" },
    { src: "/client-logos/ami-logo-black.svg", alt: "AMI", scale: 110 },
    { src: "/client-logos/brevidee-logo.svg", alt: "Brevidee" },
    { src: "/client-logos/wingnut-logo-black.svg", alt: "Wingnut", scale: 105 },
    { src: "/client-logos/brand-makers-logo-black.svg", alt: "Brand Makers", scale: 60 },
    { src: "/client-logos/sweetgrass-logo-black.svg", alt: "SweetGrass", scale: 60 },
    { src: "/client-logos/periti-logo-black.svg", alt: "Periti", scale: 95 },
    { src: "/client-logos/octane.svg", alt: "Octane" },
    { src: "/client-logos/figrr.svg", alt: "Figrr", scale: 110 },
    { src: "/client-logos/lyntics-logo-black.svg", alt: "Lyntics" },
    { src: "/runware-logo.png", alt: "Runware", scale: 70 },
  ],
};
