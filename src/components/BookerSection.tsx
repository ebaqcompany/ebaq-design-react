import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export const BookerSection = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#00afec" },
          dark: { "cal-brand": "#00afed" },
        },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="book" className="relative px-[5%] pt-24 md:pt-32 lg:pt-40 pb-16 bg-black sticky bottom-0 z-0 overflow-hidden">
      {/* Big Logo in Background - stuck to bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none">
        <img
          src="/ebaqdesign-logo-big.svg"
          alt=""
          className="w-full max-w-6xl"
        />
      </div>

      {/* Cal.com form - overlays the logo */}
      <div className="container relative z-10">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 text-center tracking-[-0.03em]">Book a free intro call</h2>
        {/* Desktop - inline embed */}
        <div className="hidden md:block relative">
          <Cal
            namespace="15min"
            calLink="ebaqdesign/15min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view" }}
          />
        </div>
        {/* Mobile - button that opens Cal.com */}
        <div className="block md:hidden relative text-center">
          <a
            href="https://cal.com/ebaqdesign/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-medium text-black bg-white rounded-[99px] hover:bg-[#00afec] hover:text-white transition-colors"
          >
            Schedule a Time
          </a>
        </div>
      </div>
    </section>
  );
};
