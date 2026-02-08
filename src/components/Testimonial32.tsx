import React from "react";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiSolidStar } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type Testimonial = {
  numberOfStars: number;
  quote: string;
  avatar: ImageProps;
  name: string;
  position: string;
  companyName: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  testimonials: Testimonial[];
};

export type Testimonial32Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Testimonial32 = (props: Testimonial32Props) => {
  const { heading, description, buttons, testimonials } = {
    ...Testimonial32Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="static md:sticky md:top-[30%]">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="sticky mb-8 border border-border-primary bg-background-primary p-8"
                style={{ top: `${30 + index * 2}%` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <React.Fragment>
      <div className="rb-5 mb-5 md:mb-6">
        <div className="rb-6 mb-6 flex items-center">
          {Array(testimonial.numberOfStars)
            .fill(null)
            .map((_, starIndex) => (
              <BiSolidStar key={starIndex} className="mr-1 size-6" />
            ))}
        </div>
        <blockquote className="md:text-md">{testimonial.quote}</blockquote>
      </div>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <img
          src={testimonial.avatar.src}
          alt={testimonial.avatar.alt}
          className="size-12 min-h-12 min-w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p>
            <span>{testimonial.position}</span>, <span>{testimonial.companyName}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export const Testimonial32Defaults: Props = {
  heading: "What clients say",
  description:
    "Founders and teams trust Ebaq Design to deliver branding that attracts clients and investors. Here's what they have to say.",
  buttons: [
    { title: "Start Your Project", variant: "secondary" },
    {
      title: "View Case Studies",
      variant: "link",
      size: "link",
      iconRight: <RxChevronRight />,
    },
  ],
  testimonials: [
    {
      numberOfStars: 5,
      quote:
        '"Arek\'s methodology was incredibly organized. He brought clarity to our vision and delivered beyond what we expected after disappointing experiences elsewhere."',
      avatar: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Client avatar",
      },
      name: "Sarah Chen",
      position: "Founder",
      companyName: "Brevidee",
    },
    {
      numberOfStars: 5,
      quote:
        '"The attention to detail was remarkable. Every element of our brand identity felt intentional and cohesive. The one-week turnaround was a game-changer for our launch."',
      avatar: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Client avatar",
      },
      name: "Michael Torres",
      position: "CEO",
      companyName: "Ventur",
    },
    {
      numberOfStars: 5,
      quote:
        '"Working directly with a senior designer made all the difference. No junior handoffs, no miscommunication—just exceptional work delivered fast."',
      avatar: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Client avatar",
      },
      name: "Emily Park",
      position: "Co-founder",
      companyName: "Sweetgrass",
    },
    {
      numberOfStars: 5,
      quote:
        '"Fixed pricing with no surprises was exactly what we needed as a startup. The brand identity helped us secure our seed round—investors loved it."',
      avatar: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Client avatar",
      },
      name: "David Kim",
      position: "Founder",
      companyName: "Focal",
    },
  ],
};
