import { BiBookOpen, BiPalette, BiTimeFive, BiRightArrowAlt } from "react-icons/bi";
import { serviceDetails } from "../data/services";

// Simple client-decision section adapted from Relume Layout 242 via MCP.
export const BrandDesignEngagement = () => {
  const sections = [
    { heading: "A complete visual system", description: "Color, typography, custom visuals and icons, documented as one coherent identity. Stationery and social launch assets carry the system into everyday use.", icon: BiPalette, href: "/pricing", link: "See the full scope" },
    { heading: "Timeline and investment", description: serviceDetails["brand-design"].timeline, icon: BiTimeFive, href: "/start", link: "Discuss your project" },
    { heading: "Guidelines your team can use", description: "Your brand guidelines are published on guidelines.online, a tool I built so the guide stays available as a living website. Your team can apply the rules across pitch decks, social graphics, and stationery.", icon: BiBookOpen, href: "/blog/brand-guidelines", link: "Explore brand guidelines" },
  ];
  return (
    <section id="brand-design-engagement" aria-labelledby="brand-design-engagement-heading" className="bg-white px-[5%] py-16 text-black md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
            <h2 id="brand-design-engagement-heading">What you get. What to expect.</h2>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            {sections.map(({ heading, description, icon: Icon, href, link }) => <div key={heading}>
              <Icon aria-hidden="true" className="mb-5 size-12 text-brand-primary md:mb-6" />
              <h3 className="heading-h5 mb-5 md:mb-6">{heading}</h3>
              <p className="mb-5 md:mb-6">{description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <a href={href} className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">{link}<BiRightArrowAlt aria-hidden="true" className="size-6" /></a>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
};
