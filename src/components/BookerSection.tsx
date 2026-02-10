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
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: {
          branding: { brandColor: "transparent" },
        },
      });

      // Aggressively hide Cal.com branding with MutationObserver
      const observer = new MutationObserver(() => {
        const badges = document.querySelectorAll('[data-cal-namespace="15min"] a[href*="cal.com"], [data-cal-namespace="15min"] [class*="powered"], [data-cal-namespace="15min"] [class*="Powered"]');
        badges.forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    })();

    // Hide Cal.com branding
    const style = document.createElement('style');
    style.textContent = `
      [data-cal-namespace="15min"] a[href*="cal.com"],
      [data-cal-namespace="15min"] [class*="powered"],
      [data-cal-namespace="15min"] [class*="Powered"],
      [data-cal-namespace="15min"] img[alt*="Cal"],
      [data-cal-namespace="15min"] svg[class*="logo"],
      [data-cal-namespace="15min"] [class*="branding"],
      [data-cal-namespace="15min"] [class*="Branding"],
      [data-cal-namespace="15min"] [data-testid*="powered"],
      [data-cal-namespace="15min"] footer,
      [data-cal-namespace="15min"] [class*="footer"],
      a[href*="cal.com/powered"],
      a[href*="go.cal.com"],
      .cal-powered-by,
      [class*="poweredBy"],
      [class*="PoweredBy"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section id="book" className="relative px-[5%] pt-24 md:pt-32 lg:pt-40 pb-16 bg-black sticky bottom-0 z-0 overflow-hidden">
      {/* Big Logo in Background - stuck to bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none">
        <img
          src="/ebaqdesign-logo-big.svg"
          alt=""
          className="w-full max-w-6xl opacity-20"
        />
      </div>

      {/* Cal.com form - overlays the logo */}
      <div className="container relative z-10">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 text-center">Book a free intro call</h2>
        <div className="relative">
          <Cal
            namespace="15min"
            calLink="ebaqdesign/15min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view" }}
          />
        </div>
      </div>
    </section>
  );
};
