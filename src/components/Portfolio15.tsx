type ImageProps = {
  src: string;
  alt?: string;
};
import { RotatingProjectPreview } from "./RotatingProjectPreview";

type ProjectProps = {
  title: string;
  subheading: string;
  image: ImageProps;
  images?: ImageProps[];
  lottie?: ImageProps;
  url: string;
  tags: string[];
};

type Props = {
  projects: ProjectProps[];
};

export type Portfolio15Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Portfolio15 = (props: Portfolio15Props) => {
  const { projects, ...sectionProps } = {
    ...Portfolio15Defaults,
    ...props,
  };

  return (
    <section {...sectionProps} className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Carousel opts={{ loop: true, align: "start" }} className="overflow-hidden">
          <CarouselContent className="ml-0">
            {projects.map((project) => (
              <CarouselItem key={project.url} className="pl-0">
                <Project {...project} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-between md:mt-12">
            <a href="/work" className="underline-offset-4 hover:underline">
              View all case studies
            </a>
            <div className="flex items-end justify-end gap-2 md:gap-4">
              <CarouselPrevious className="testimonial-carousel-button static right-0 top-0 size-12 -translate-y-0" />
              <CarouselNext className="testimonial-carousel-button static right-0 top-0 size-12 -translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const Project = ({ title, subheading, image, images = [], lottie, url }: ProjectProps) => {
  return (
    <article className="grid grid-cols-1 items-center gap-x-12 gap-y-6 py-8 md:grid-cols-2 md:gap-y-0 lg:gap-x-20 lg:py-12">
      <RotatingProjectPreview image={image} images={images} lottie={lottie} url={url} className="aspect-video w-full" />
      <div className="md:pr-[10%]">
        <p className="mb-3 font-semibold md:mb-4">Next project</p>
        <h3 className="mb-2">
          <a href={url}>{title}</a>
        </h3>
        <h2 className="heading-h5">{subheading}</h2>
      </div>
    </article>
  );
};

export const Portfolio15Defaults: Props = {
  projects: [],
};
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
