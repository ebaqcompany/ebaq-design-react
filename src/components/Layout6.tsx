// Adapted from Relume Layout 6, retrieved through Relume-library MCP.
type Props = {
  heading: string;
  description: string;
  subHeadings: { title: string; description: string }[];
  image: { src: string; alt: string; width: number; height: number };
};

export const Layout6 = ({ heading, description, subHeadings, image }: Props) => (
  <section id="overview" className="bg-brand-light px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
        <div>
          <h2 className="heading-h3 mb-5 md:mb-6">{heading}</h2>
          <p className="mb-6 md:mb-8 md:text-md">{description}</p>
          <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
            {subHeadings.map((subHeading) => (
              <div key={subHeading.title}>
                <h3 className="heading-h6 mb-3 md:mb-4">{subHeading.title}</h3>
                <p>{subHeading.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img {...image} loading="lazy" decoding="async" className="h-auto w-full" />
        </div>
      </div>
    </div>
  </section>
);
