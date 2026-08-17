import type { CaseStudyTestimonial } from "../data/caseStudies";
import { clientLogoClass } from "../clientLogo";

export type Testimonial1Props = React.ComponentPropsWithoutRef<"section"> & Partial<CaseStudyTestimonial> & {
  showLogo?: boolean;
};

export const Testimonial1 = (props: Testimonial1Props) => {
  const { quote, logo, avatar, name, position, companyName, showLogo, className, ...sectionProps } = {
    ...Testimonial1Defaults,
    ...props,
  };

  return (
    <section className={`bg-brand-light px-[5%] py-16 md:py-24 lg:py-28 ${className ?? ""}`} {...sectionProps}>
      <div className="container w-full max-w-lg">
        <div className="flex flex-col items-center text-center">
          {showLogo !== false && (
            <div className="mb-6 md:mb-8">
              <img src={logo.src} alt={logo.alt} className={clientLogoClass(logo.scale)} />
            </div>
          )}
          <blockquote className="text-xl font-bold md:text-2xl">{quote}</blockquote>
          <div className="mt-6 flex flex-col items-center justify-center md:mt-8">
            <div className="mb-3 md:mb-4">
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="size-16 min-h-16 min-w-16 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold">{name}</p>
              {(position || companyName) && (
                <p>
                  {position && <span>{position}</span>}
                  {position && companyName && <span>, </span>}
                  {companyName && <span>{companyName}</span>}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Testimonial1Defaults: CaseStudyTestimonial = {
  quote:
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."',
  logo: {
    src: "https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg",
    alt: "Webflow logo",
  },
  avatar: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Testimonial avatar",
  },
  name: "Name Surname",
  position: "Position",
  companyName: "Company name",
};
