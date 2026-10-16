import { lazy, Suspense, useEffect } from "react";
import { useNearViewport } from "./Media";
import { useMediaQuery } from "./ui";

// The Cal.com embed is a large third-party app; it is fetched only when the booking section nears the
// screen on a desktop layout. Phones get the plain "Book a call" link instead.
const Cal = lazy(() => import("@calcom/embed-react"));

type BookerSectionProps = {
  pinLogoToViewport?: boolean;
  sticky?: boolean;
};

export const BookerSection = ({ pinLogoToViewport = false, sticky = true }: BookerSectionProps) => {
  // The section is sticky, so it reports as on screen from the start; a marker in the normal flow just
  // above it tracks how close the visitor actually is to the end of the page.
  const { ref, near } = useNearViewport<HTMLDivElement>("800px");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const showEmbed = near && isDesktop;

  useEffect(() => {
    if (!showEmbed) return;
    (async function () {
      const { getCalApi } = await import("@calcom/embed-react");
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
  }, [showEmbed]);

  return (
    <>
    <div ref={ref} aria-hidden="true" />
    <section id="book" className={`relative px-[5%] pt-24 md:pt-32 lg:pt-40 pb-16 bg-black ${sticky ? "sticky bottom-0" : ""} z-0 overflow-hidden min-h-svh md:min-h-0`}>
      {/* Big Logo in Background - stuck to bottom */}
      <div
        className={`${pinLogoToViewport ? "fixed" : "absolute"} bottom-0 left-0 right-0 flex justify-center pointer-events-none`}
      >
        <img loading="eager"
          src="/ebaqdesign-logo-bold-light.svg"
          width={567}
          height={156}
          alt=""
          className="w-full max-w-6xl"
        />
      </div>

      {/* Cal.com form - overlays the logo */}
      <div className="container relative z-10">
        <h2 className="mb-4 text-center md:mb-6">
          <span className="block text-brand-primary">Book a call</span>
          <span className="block text-white">A free 15-minute introduction</span>
        </h2>
        {/* Desktop - inline embed */}
        <div className="relative hidden h-[760px] md:block">
          {showEmbed && (
            <Suspense fallback={null}>
              <Cal
                namespace="15min"
                calLink="ebaqdesign/15min"
                style={{ width: "100%", height: "760px", minHeight: "760px", overflow: "scroll" }}
                config={{ layout: "month_view" }}
              />
            </Suspense>
          )}
        </div>
        {/* Mobile - button that opens Cal.com */}
        <div className="block md:hidden relative text-center">
          <a
            href="https://cal.com/ebaqdesign/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-medium text-black bg-white rounded-[99px] hover:bg-[#00afec] hover:text-white transition-colors"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
    </>
  );
};
