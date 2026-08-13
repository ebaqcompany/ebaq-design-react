import React, { useEffect, useState } from "react";
import type { CarouselApi } from "@relume_io/relume-ui";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@relume_io/relume-ui";
import clsx from "clsx";
import { clientLogoClass, type ClientLogoScale } from "../clientLogo";

type Testimonial = { quote: string; logo?: { src: string; alt?: string; scale?: ClientLogoScale; className?: string }; logoText?: string; avatar: { src: string; alt?: string }; name: string; position: string };
type Props = React.ComponentPropsWithoutRef<"section"> & { heading?: string; description?: string; testimonials?: Testimonial[] };
export type Testimonial9Props = Props;

export const Testimonial32 = (props: Props) => {
  const { heading, description, testimonials } = { ...Testimonial32Defaults, ...props };
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => { if (!api) return; const update = () => setCurrent(api.selectedScrollSnap()); update(); api.on("select", update); return () => { api.off("select", update); }; }, [api]);
  return (
    <section {...props} id="testimonials" className="testimonial-section overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20"><h2 className="mb-5 md:mb-6">{heading}</h2>{description && <p className="md:text-md">{description}</p>}</div>
        <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="overflow-hidden">
          <div className="relative pb-12 md:pb-16">
            <CarouselContent className="ml-0 items-stretch">{testimonials.map((testimonial, index) => <CarouselItem key={index} className="self-stretch pl-0 md:basis-full lg:basis-1/3 lg:pr-16"><TestimonialCard testimonial={testimonial} /></CarouselItem>)}</CarouselContent>
            <div className="mt-8 flex items-center justify-between md:mt-12">
              <div className="mt-5 flex w-full items-start justify-start">{testimonials.map((_, index) => <button key={index} type="button" onClick={() => api?.scrollTo(index)} aria-label={`Go to testimonial ${index + 1}`} className={clsx("mx-[3px] inline-block size-2 rounded-full", current === index ? "bg-black" : "bg-neutral-light")} />)}</div>
              <div className="flex items-end justify-end gap-2 md:gap-4"><CarouselPrevious className="testimonial-carousel-button static right-0 top-0 size-12 -translate-y-0" /><CarouselNext className="testimonial-carousel-button static right-0 top-0 size-12 -translate-y-0" /></div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="mx-auto flex h-full max-w-lg flex-col justify-start">
    <blockquote title={testimonial.quote} className="line-clamp-5 font-heading text-md font-medium leading-[1.4] tracking-[-0.02em] md:text-xl">{testimonial.quote}</blockquote>
    <div className="mt-6 flex w-full flex-col md:mt-8 md:gap-4">
      <div className="mb-4 md:mb-0"><img src={testimonial.avatar.src} alt={testimonial.avatar.alt ?? ""} className="size-14 min-h-14 min-w-14 rounded-full object-cover" /></div>
      <div className="mb-3 md:mb-0"><p className="font-semibold">{testimonial.name}</p><p>{testimonial.position}</p></div>
      {testimonial.logo && <div><img src={testimonial.logo.src} alt={testimonial.logo.alt ?? ""} className={`${clientLogoClass(testimonial.logo.scale)} ${testimonial.logo.className ?? ""}`.trim()} /></div>}
      {!testimonial.logo && testimonial.logoText && <p className="font-heading text-2xl font-semibold uppercase leading-none">{testimonial.logoText}</p>}
    </div>
  </div>
);

export const Testimonial32Defaults: { heading: string; description: string; testimonials: Testimonial[] } = { heading: "What my clients say", description: "", testimonials: [
  { quote: '"Arek worked with us on the complete redesign of the NextDimension AI visual identity and website. He was thoughtful, responsive, and patient throughout the process, from exploring the logo direction to refining the website’s content, design, and functionality. What stood out most was his ability to clearly explain and defend his creative vision while still listening to our feedback. We are both convinced by the final direction and very happy with the result."', logo: { src: "/client-logos/nextdim-wordmark.svg", alt: "NextDimension AI", scale: 90 }, avatar: { src: "/testimonials/lakshita-chhikara.jpg", alt: "Lakshita Chhikara" }, name: "Lakshita Chhikara", position: "Co-Founder, NextDimension AI" },
  { quote: '"Arek did an outstanding job on our full brand redesign. From understanding our vision, to crafting the direction, to executing with speed, he nailed it from the beginning. We absolutely love all of it. What stood out most was how quickly he understood exactly what we were looking for. He was creative, came back with ideas that felt modern and genuinely good, and landed on something that fit our brand perfectly. He made himself available throughout the process and kept things moving fast without cutting corners on quality. Working with him was easy from start to finish. I’d recommend him to anyone looking for a designer who gets it and delivers. Thanks, Arek."', logo: { src: "/client-logos/elevate-wordmark.svg", alt: "Elevate", scale: 80 }, avatar: { src: "/testimonials/karim-zitouni.jpg", alt: "Karim Zitouni" }, name: "Karim Zitouni", position: "Co-Founder, Elevate" },
  { quote: '"Working with Arek was an awesome experience. He is so creative and fast and talented in so many tech areas. He has great ideas and gave honest feedback to my ideas. Final website was incredible. Very impressive. I will be using him for everything going forward."', logo: { src: "/client-logos/brand-makers-logo-black.svg", alt: "Brand Makers", className: "testimonial-logo--brand-makers" }, avatar: { src: "/testimonials/james-greaves.jpg", alt: "James Greaves" }, name: "James Greaves", position: "CEO, Brand Makers" },
  { quote: '"Arek is a branding expert with extensive experience in graphic design, logos, and web design. We have collaborated with him on several rebranding projects. I highly recommend him."', logoText: "Jaumo", avatar: { src: "/testimonials/jens-kammerer.jpg", alt: "Jens Kammerer" }, name: "Jens Kammerer", position: "CEO & Founder, Jaumo" },
  { quote: '"Arek successfully translated a myriad of different ideas into a cohesive brand image. He was professional, patient and went above and beyond to ensure the project was completed successfully. His work reflects a real passion and dedication for design. Arek worked collaboratively with me and provided just the right guidance and direction I was looking for. After doing a great job on the first project, I quickly hired him for a second, and third! I would happily recommend his services to anyone looking for top quality design work. Feel free to reach out to me with any questions regarding my client experience."', avatar: { src: "/testimonials/akshay-ramanathan.jpg", alt: "Akshay Ramanathan" }, name: "Akshay Ramanathan", position: "Revenue Operations & GTM Systems" },
  { quote: '"After several failures of using Fiverr and 99designs to handle our rebranding project, we finally found Arek and Ebaq Design who nailed it at first. There was no time wasted, Arek was very organized and methodical about his approach from the start."', logo: { src: "/client-logos/medihuanna-wordmark-black.svg", alt: "Medihuanna", scale: 90 }, avatar: { src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/6838e470f5929b126ab6b077_1707340907658.jpeg", alt: "Pavel Bulkiewicz" }, name: "Pavel Bulkiewicz", position: "Founder, Medihuanna" },
  { quote: '"We had a terrific experience working with Arek on our logos and pitch deck. Highly recommended!"', logo: { src: "/client-logos/wingnut-logo-black.svg", alt: "Wingnut Social", scale: 105 }, avatar: { src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/687535f6cdf82283c57d1a3a_Darla-Powell.jpg", alt: "Darla Powell" }, name: "Darla Powell", position: "Founder, Wingnut Social" },
  { quote: '"I liked the overall approach Arek brings on the table. To the point. Focused on the end result. Detailed workshop, to bring out the desired outcome. And most importantly, he has so much clarity on the subject, and he guided me so well, to reach a conclusion on how the brand should be perceived and portrayed as."', logo: { src: "/client-logos/ami-logo-black.svg", alt: "AMI", scale: 110 }, avatar: { src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/6838ed3044a4195fadd32a62_unnamed%20(1).png", alt: "Dhruv Patel" }, name: "Dhruv Patel", position: "Founder, AMI" },
  { quote: '"After struggling to build our website on Squarespace and wasting valuable time with underwhelming designers on Upwork, we finally discovered Arek at Ebaqdesign—and what a game-changer that was. From the very start, he understood our vision, took control of the process, and delivered a brand transformation that exceeded all our expectations. The results were beyond anything we could have imagined!"', logo: { src: "/client-logos/brevidee-logo.svg", alt: "Brevidee", scale: 80 }, avatar: { src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/6838e84f4b0268144b94d36e_unnamed.png", alt: "Alan Rudt" }, name: "Alan Rudt", position: "Brevidee" },
  { quote: '"Arek is a branding expert with extensive experience in graphic design, logos, and web design. We have collaborated with him on several rebranding projects. I highly recommend him."', logo: { src: "/client-logos/airport-executive-logo.svg", alt: "Airport Executive" }, avatar: { src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/6838eccac498d440d00a5fd6_1732141495505.jpeg", alt: "Chris Nixon" }, name: "Chris Nixon", position: "Founder, Airport Executive" },
  { quote: '"Excellent work! Fast, reliable and look and feel matched beyond our expectations."', logo: { src: "/client-logos/foxberman-wordmark.svg", alt: "FOX BERMAN", scale: 50 }, avatar: { src: "/testimonials/lucas.jpeg", alt: "Lucas Berman" }, name: "Lucas Berman", position: "Partner, FOX BERMAN" },
  { quote: '"Arek is a magic visionary with sharp attention to detail."', logo: { src: "/client-logos/sweetgrass-logo-black.svg", alt: "SweetGrass", className: "testimonial-logo--sweetgrass" }, avatar: { src: "https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/687539c90e897ff36bdc1a9d_jane.jpg", alt: "Jane de Abreu" }, name: "Jane de Abreu", position: "Founder, SweetGrass" },
] };
