"use client";

import { useRef } from "react";
import type { MotionStyle, MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
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
  testimonials: Testimonial[];
};

export type Testimonial32Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Testimonial32 = (props: Testimonial32Props) => {
  const { heading, testimonials } = {
    ...Testimonial32Defaults,
    ...props,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  return (
    <section id="relume" ref={containerRef} className="bg-[#f5f5f5]">
      <div className="container">
        <div className="relative h-[300svh] lg:h-[300vh]">
          <div className="sticky top-0 grid h-svh grid-cols-1 content-center items-center justify-center px-[5%] md:flex md:content-normal md:px-0 lg:h-screen">
            <div className="absolute bottom-auto left-0 right-0 top-0 flex w-full justify-center pt-20 md:inset-auto md:pt-0">
              <h1 className="whitespace-nowrap text-[5rem] md:text-[10rem] lg:text-[12rem] text-black tracking-[-0.06em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 200", lineHeight: 1 }}>
                {heading}
              </h1>
            </div>
            <div className="sticky top-0 mx-auto mt-12 flex min-h-[24.5rem] w-full max-w-md flex-col items-center justify-center sm:mt-24 md:relative lg:mt-0">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  totalTestimonials={testimonials.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 mt-[100vh]" />
    </section>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
  totalTestimonials,
  scrollYProgress,
}: {
  testimonial: Testimonial;
  index: number;
  totalTestimonials: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const sectionScrollStart = index / totalTestimonials;
  const sectionScrollEnd = (index + 1) / totalTestimonials;

  const rotate = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    [0 + index * 3, -30],
  );

  const translateY = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    ["0vh", "-120vh"],
  );

  const translateX = useTransform(
    scrollYProgress,
    [sectionScrollStart, sectionScrollEnd],
    ["0vw", "-10vw"],
  );

  return (
    <motion.div
      className="absolute mx-6 flex flex-col justify-between bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] md:mx-0"
      style={
        {
          rotate,
          translateY,
          translateX,
          zIndex: totalTestimonials - index,
        } as MotionStyle
      }
    >
      <div className="mb-5 md:mb-6">
        <div className="mb-4 flex items-center">
          {Array(testimonial.numberOfStars)
            .fill(null)
            .map((_, starIndex) => (
              <BiSolidStar key={starIndex} className="mr-1 size-5" style={{ color: '#e9b44a' }} />
            ))}
        </div>
        <blockquote className="text-base md:text-lg">{testimonial.quote}</blockquote>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar.src}
          alt={testimonial.avatar.alt}
          className="size-12 min-h-12 min-w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-black/60">
            {testimonial.position}, {testimonial.companyName}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonial32Defaults: Props = {
  heading: "What clients say",
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
    {
      numberOfStars: 5,
      quote:
        '"Excellent work! Fast, reliable and look and feel matched beyond our expectations."',
      avatar: {
        src: "/testimonials/lucas.jpeg",
        alt: "L. Berman",
      },
      name: "L. Berman (LL.M)",
      position: "Partner",
      companyName: "FOXBERMAN",
    },
  ],
};
