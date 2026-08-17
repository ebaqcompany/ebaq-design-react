import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { RotatingProjectPreview } from "./RotatingProjectPreview";

type ImageProps = {
  src: string;
  alt?: string;
};

type ProjectProps = {
  title: string;
  description: string;
  image: ImageProps;
  images?: ImageProps[];
  lottie?: ImageProps;
  url: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  projects: ProjectProps[];
};

export type Portfolio16Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Portfolio16 = (props: Portfolio16Props) => {
  const { tagline, heading, description, projects, className, ...sectionProps } = {
    ...Portfolio16Defaults,
    ...props,
  };

  return (
    <section {...sectionProps} className={`px-[5%] py-16 md:py-24 lg:py-28 ${className ?? ""}`}>
      <div className="container">
        <header className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h1 className="mb-5 md:mb-6">{heading}</h1>
          <p className="md:text-md">{description}</p>
        </header>
        <div>
          {projects.map((project, index) => (
            <Project key={project.url} {...project} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Project = ({ title, description, image, images, lottie, url, reverse }: ProjectProps & { reverse: boolean }) => {
  const button: ButtonProps = {
    title: "View case study",
    variant: "link",
    size: "link",
    iconRight: <RxChevronRight />,
  };

  return (
    <article className="grid grid-cols-1 items-center gap-x-12 gap-y-8 py-10 md:grid-cols-2 md:gap-y-0 lg:gap-x-20 lg:py-16">
      <RotatingProjectPreview
        image={image}
        images={images}
        lottie={lottie}
        url={url}
        className={`aspect-video w-full ${reverse ? "md:order-2" : "md:order-1"}`}
      />
      <div className={reverse ? "md:order-1 md:pl-[10%]" : "md:order-2 md:pr-[10%]"}>
        <h2 className="heading-h3 mb-3 md:mb-4">
          <a href={url}>{title}</a>
        </h2>
        <h3 className="heading-h5 mb-4 md:mb-5">{description}</h3>
        <Button {...button} asChild className="mt-6 md:mt-8">
          <a href={url}>{button.title}</a>
        </Button>
      </div>
    </article>
  );
};

export const Portfolio16Defaults: Props = {
  tagline: "Portfolio",
  heading: "Selected work",
  description: "Brand identities and digital experiences built to make ambitious businesses clearer and more memorable.",
  projects: [],
};
