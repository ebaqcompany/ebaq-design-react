import React from "react";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiSolidStar } from "react-icons/bi";

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
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28" style={{ backgroundColor: '#cceffc' }}>
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="static md:sticky md:top-[30%]">
            <h2 className="mb-5 md:mb-6">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button {...buttons[0]} asChild>
                <a href="#book">{buttons[0].title}</a>
              </Button>
            </div>
          </div>
          <div>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="sticky mb-8 bg-background-primary p-8 rounded-2xl"
                style={{ border: '1px solid #00afec', top: `${30 + index * 2}%` }}
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
              <BiSolidStar key={starIndex} className="mr-1 size-6" style={{ color: '#e9b44a' }} />
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
    "Founders and teams trust Ebaq Design to deliver branding that attracts clients and investors.",
  buttons: [
    { title: "Book a Call", variant: "secondary", className: "bg-transparent border-black" },
    {
      title: "View Case Studies",
    },
  ],
  testimonials: [
    {
      numberOfStars: 5,
      quote:
        '"After several failures using Fiverr and 99designs, we finally found Arek who nailed it at first."',
      avatar: {
        src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/6838e470f5929b126ab6b077_1707340907658.jpeg",
        alt: "Pavel Bulkiewicz",
      },
      name: "Pavel Bulkiewicz",
      position: "Founder",
      companyName: "Medihuanna",
    },
    {
      numberOfStars: 5,
      quote:
        '"We had a terrific experience working with Arek on our logos and pitch deck. Highly recommended!"',
      avatar: {
        src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/687535f6cdf82283c57d1a3a_Darla-Powell.jpg",
        alt: "Darla Powell",
      },
      name: "Darla Powell",
      position: "Founder",
      companyName: "Wingnut Social",
    },
    {
      numberOfStars: 5,
      quote:
        '"Arek brings a focused, to-the-point approach with detailed workshops and exceptional clarity."',
      avatar: {
        src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/6838ed3044a4195fadd32a62_unnamed%20(1).png",
        alt: "Dhruv Patel",
      },
      name: "Dhruv Patel",
      position: "Founder",
      companyName: "AMI",
    },
    {
      numberOfStars: 5,
      quote:
        '"Arek is a branding expert with extensive experience. I highly recommend him for rebranding projects."',
      avatar: {
        src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/6838eccac498d440d00a5fd6_1732141495505.jpeg",
        alt: "Chris Nixon",
      },
      name: "Chris Nixon",
      position: "Founder",
      companyName: "Airport Executive",
    },
  ],
};
