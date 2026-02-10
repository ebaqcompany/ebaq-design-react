"use client";

import { IoClose } from "react-icons/io5";

type ComparisonRow = {
  left: string;
  right: string;
};

type Props = {
  heading: string;
  leftTitle: string;
  rightTitle: string;
  rows: ComparisonRow[];
};

export type ComparisonProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Comparison = (props: ComparisonProps) => {
  const { heading, leftTitle, rightTitle, rows } = {
    ...ComparisonDefaults,
    ...props,
  };

  return (
    <section id="comparison" className="px-[5%] py-16 md:py-24 lg:py-28 bg-[#f5f5f5]">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 md:mb-6 whitespace-pre-line">{heading}</h2>
        </div>

        <div className="mx-auto max-w-xl">
          {/* Headers */}
          <div className="grid grid-cols-2 gap-8">
            <div className="border-b border-black/20 pb-4">
              <h3 className="text-lg font-semibold md:text-xl">{leftTitle}</h3>
            </div>
            <div className="border-b border-black/20 pb-4">
              <h3 className="text-lg font-semibold text-black/40 md:text-xl">{rightTitle}</h3>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3 border-b border-black/20 py-5 md:py-6">
                <img src="/ebaq_icon.svg" alt="" className="size-7 md:size-8" />
                <span className="text-base font-medium md:text-lg">{row.left}</span>
              </div>
              <div className="flex items-center gap-3 border-b border-black/20 py-5 md:py-6">
                <span className="flex size-7 items-center justify-center rounded-full bg-black/10 md:size-8">
                  <IoClose className="size-3.5 text-black/40 md:size-4" />
                </span>
                <span className="text-base text-black/40 md:text-lg">{row.right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ComparisonDefaults: Props = {
  heading: "Impressive work,\nsuper fast. For just $3k.",
  leftTitle: "Ebaq Design",
  rightTitle: "Traditional Agency",
  rows: [
    { left: "Flat fee of $3k", right: "$25k - $100k+" },
    { left: "1 week to brand", right: "3 - 9 months or more" },
    { left: "1 project at a time", right: "Many projects at a time" },
    { left: "Senior designer", right: "Junior designers" },
  ],
};

export default Comparison;
