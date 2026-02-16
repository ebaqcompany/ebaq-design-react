"use client";

import { BiCheck } from "react-icons/bi";

/* ---- Slide wrapper: responsive web, 1920×1080 for print ---- */
const Slide = ({ children, bg = "bg-white" }: { children: React.ReactNode; bg?: string }) => (
  <section
    className={`w-full print:w-[1920px] print:min-h-[1080px] relative overflow-hidden ${bg}`}
    style={{ pageBreakAfter: "always", breakAfter: "page" }}
  >
    {children}
  </section>
);

/* ---- All 9 website projects ---- */
const websites = [
  { src: "/portfolio/websites/aero-web.jpg", alt: "Aero" },
  { src: "/portfolio/websites/airport-executive-web-thumb.jpg", alt: "Airport Executive" },
  { src: "/portfolio/websites/brevidee-web-thumb.jpg", alt: "Brevidee" },
  { src: "/portfolio/websites/fox-berman-web-thumb.jpg", alt: "FoxBerman" },
  { src: "/portfolio/websites/laura-ceara-web.jpg", alt: "Laura Ceara" },
  { src: "/portfolio/websites/periti-web-thumb.jpg", alt: "Periti" },
  { src: "/portfolio/websites/sweetgras-web.jpg", alt: "Sweetgrass" },
  { src: "/portfolio/websites/ventur-web.jpg", alt: "Ventur" },
  { src: "/portfolio/websites/wingnut-web-thumb.jpg", alt: "Wingnut" },
];

const phases = [
  {
    num: "01",
    title: "Moodboard & Concept",
    duration: "3–4 days",
    items: [
      "2–3 visual directions (style tiles) — color, typography, brand vibe",
      "One \"Hero\" section concept per direction",
      "Competitive analysis: Raptor Maps, Zeitview, Aurora Solar",
      "AI-generated hero visual concepts for SenseHawk",
    ],
  },
  {
    num: "02",
    title: "Full Homepage Design",
    duration: "5–7 days",
    items: [
      "Complete desktop wireframe & high-fidelity homepage",
      "Visual storytelling for Taskmapper & Therm",
      "Scroll-triggered animations & motion design specs",
      "Stylized product UI snippets",
    ],
  },
  {
    num: "03",
    title: "The Toolkit & Responsive",
    duration: "5–7 days",
    items: [
      "Mobile + tablet responsive designs",
      "Framer UI Kit: Nav, Footer, Buttons, Cards, Inputs, Tooltips",
      "5–7 reusable content sections",
      "Typography & color library · CMS templates",
    ],
  },
  {
    num: "04",
    title: "Handover & Assets",
    duration: "2–3 days",
    items: [
      "Final Figma file with Auto-Layout & component logic",
      "Raw assets: videos (H.264/WebM), images (WebP/SVG)",
      "Style guide: text styles, color variables, component states",
      "Documentation for your Framer developer",
    ],
  },
];

export const SenseHawkProposal = () => {
  return (
    <div className="bg-white w-full print:w-[1920px] print:mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>

      {/* ============ SLIDE 1: HERO ============ */}
      <Slide>
        {/* Navbar */}
        <div className="flex items-center justify-between px-[5%] lg:px-20 py-6 lg:py-8">
          <img src="/ebaqdesign-logo-thinner.svg" alt="Ebaq Design" className="h-8 lg:h-10" />
          <span className="text-xs lg:text-sm text-black/30 tracking-wide">Proposal · February 2026</span>
        </div>

        {/* Hero heading */}
        <div className="px-[5%] lg:px-20 pt-8 lg:pt-12 pb-10 lg:pb-16">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] leading-[0.95] tracking-[-0.05em] whitespace-pre-line"
            style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
          >
            {"Website redesign\nfor SenseHawk."}
          </h1>
        </div>

        {/* Portfolio ticker */}
        <div className="flex gap-3 lg:gap-4 pl-[5%] lg:pl-20 overflow-x-auto pb-8 lg:pb-0 scrollbar-hide">
          {websites.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[360px] lg:w-[440px] aspect-[16/10] rounded-lg overflow-hidden border border-gray-200">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </Slide>

      {/* ============ SLIDE 2: THE OPPORTUNITY ============ */}
      <Slide>
        <div className="px-[5%] lg:px-20 py-16 md:py-20 lg:py-24 flex flex-col justify-center min-h-[60vh] lg:min-h-[80vh] print:min-h-[1080px]">
          <p className="mb-3 lg:mb-4 font-semibold text-sm lg:text-base">The Opportunity</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] leading-[1.05] tracking-[-0.05em] max-w-[1400px] mb-8 lg:mb-16"
            style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
          >
            Your current site doesn't do justice to a platform backed by Elevation Capital and Alpha Wave Global.
          </h2>
          <p className="text-base lg:text-xl xl:text-2xl text-black/50 leading-relaxed max-w-[900px]">
            SenseHawk is the operating system for solar — trusted by the world's largest energy companies. We'll create a world-class design that makes Taskmapper and Therm look intuitive, premium, and unforgettable. Apple-standard aesthetics, Framer-native execution.
          </p>
        </div>
      </Slide>

      {/* ============ SLIDE 3: ABOUT ============ */}
      <Slide>
        <div className="px-[5%] lg:px-20 py-16 md:py-20 lg:py-24 flex flex-col justify-between min-h-[60vh] lg:min-h-[80vh] print:min-h-[1080px]">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
            <div className="flex-1">
              <p
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] tracking-[-0.05em] mb-4 leading-[1]"
                style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 250" }}
              >
                Hello 👋
              </p>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] tracking-[-0.05em] leading-[1] max-w-[1200px]"
                style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 250" }}
              >
                I'm Arek, a senior designer based in NY, working with clients worldwide.
              </h2>
            </div>
            <img
              src="/arek-pic.jpg"
              alt="Arek"
              className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover flex-shrink-0"
            />
          </div>

          <div className="mt-16 lg:mt-auto pt-8 lg:pt-20">
            <p className="text-sm lg:text-base mb-6 lg:mb-8 font-semibold">Services I offer</p>
            <div className="grid grid-cols-2 gap-x-8 lg:gap-x-24">
              <div className="flex flex-col gap-1">
                {["Brand Strategy", "Custom Logo Design", "Logo Animation", "Color Palette", "Type System", "Brand Guidelines"].map((s) => (
                  <p key={s} className="text-base lg:text-xl xl:text-2xl tracking-[0.01em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 400" }}>{s}</p>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {["Figma Web Design", "Framer/Webflow Dev.", "Messaging", "Pitch Decks", "Social Media Graphics", "Motion Graphics"].map((s) => (
                  <p key={s} className="text-base lg:text-xl xl:text-2xl tracking-[0.01em]" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 400" }}>{s}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 4: COMPARISON ============ */}
      <Slide bg="bg-[#f5f5f5]">
        <div className="px-[5%] lg:px-20 py-16 md:py-20 lg:py-24 flex flex-col justify-center min-h-[60vh] lg:min-h-[80vh] print:min-h-[1080px]">
          <div className="text-center mb-12 lg:mb-20">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] tracking-[-0.05em] leading-[1] whitespace-pre-line"
              style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
            >
              {"Why this is different\nfrom every other bid."}
            </h2>
          </div>

          <div className="mx-auto max-w-[1000px] w-full">
            <div className="grid grid-cols-2 gap-4 lg:gap-16">
              <div className="border-b-2 border-black/20 pb-3 lg:pb-6">
                <h3 className="text-base lg:text-2xl xl:text-3xl tracking-normal" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>Ebaq Design</h3>
              </div>
              <div className="border-b-2 border-black/20 pb-3 lg:pb-6">
                <h3 className="text-base lg:text-2xl xl:text-3xl text-black/40 tracking-normal" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>Other Designers</h3>
              </div>
            </div>
            {[
              { left: "Framer-native deliverables", right: "Pretty mockups to rebuild" },
              { left: "Auto-Layout & component logic", right: "Flat designs, no structure" },
              { left: "AI-generated hero visuals", right: "Stock photos or placeholders" },
              { left: "Senior designer, 1:1", right: "Junior designer, 5 projects" },
              { left: "$3k/week, clear timeline", right: "Vague scope, hidden costs" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 lg:gap-16">
                <div className="flex items-center gap-2 lg:gap-4 border-b border-black/20 py-4 lg:py-7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 lg:size-6 flex-shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-sm lg:text-xl font-medium tracking-[-0.02em]">{row.left}</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-4 border-b border-black/20 py-4 lg:py-7">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 lg:size-6 flex-shrink-0 text-black/40"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  <span className="text-sm lg:text-xl text-black/40 tracking-[-0.02em]">{row.right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 5: APPROACH ============ */}
      <Slide bg="bg-[#f5f5f5]">
        <div className="px-[5%] lg:px-20 py-16 md:py-20 lg:py-24 flex flex-col justify-center print:min-h-[1080px]">
          <div className="text-center mb-10 lg:mb-16">
            <p className="mb-3 lg:mb-4 font-semibold text-sm lg:text-base">Process</p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] tracking-[-0.05em] leading-[1]"
              style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
            >
              Four phases. Clear deliverables.
            </h2>
          </div>

          <div className="mx-auto max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-20">
            {phases.map((p) => (
              <div key={p.num} className="py-6 lg:py-10 border-b border-black/10 first:border-t first:border-black/10">
                <div className="flex items-start gap-4 lg:gap-8 mb-4 lg:mb-6">
                  <span
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-none text-black/[0.06]"
                    style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 100 }}
                  >
                    {p.num}
                  </span>
                  <div className="pt-2 lg:pt-6">
                    <h3 className="text-xl lg:text-2xl xl:text-3xl tracking-[-0.02em] mb-1 lg:mb-2" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>{p.title}</h3>
                    <span className="text-sm lg:text-base text-[#00afec] font-semibold">{p.duration}</span>
                  </div>
                </div>
                <ul className="pl-16 md:pl-20 lg:pl-[160px] space-y-2 lg:space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="text-sm lg:text-base text-black/50 pl-4 lg:pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[8px] lg:before:top-[10px] before:w-1 lg:before:w-1.5 before:h-1 lg:before:h-1.5 before:rounded-full before:bg-black/15">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 6: PRICING ============ */}
      <Slide>
        <div className="px-[5%] lg:px-20 py-16 md:py-20 lg:py-24 flex flex-col justify-center print:min-h-[1080px]">
          <div className="text-center mb-10 lg:mb-16">
            <p className="mb-3 lg:mb-4 font-semibold text-sm lg:text-base">Investment</p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] tracking-[-0.05em] leading-[1] mb-4"
              style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
            >
              Two scopes. One rate: $3k/week.
            </h2>
            <p className="text-base lg:text-xl text-black/40 max-w-[700px] mx-auto">Both include Framer-ready deliverables with Auto-Layout, component logic, and optimized assets.</p>
          </div>

          <div className="mx-auto max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* Option A */}
            <div className="bg-[#f5f5f5] rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12">
              <p className="text-xs lg:text-sm font-bold text-black/30 tracking-wider uppercase mb-2">Option A</p>
              <h3 className="text-lg lg:text-2xl mb-4 lg:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>Landing Page + Component System</h3>
              <div className="my-4 lg:my-6">
                <span className="text-4xl md:text-5xl lg:text-6xl xl:text-[80px] tracking-[-0.04em] leading-none" style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 400" }}>$9,000</span>
                <span className="text-lg lg:text-2xl text-black/30 ml-2">/3 weeks</span>
              </div>
              <div className="h-px bg-black/10 my-6 lg:my-8" />
              <div className="space-y-3 lg:space-y-4">
                {[
                  "Homepage redesign — Desktop, Tablet, Mobile",
                  "2–3 visual direction concepts",
                  "Framer UI Kit with reusable components",
                  "5–7 content section templates",
                  "AI-generated hero visuals & product snippets",
                  "Typography, color & component style guide",
                  "CMS card + detail page template",
                  "Figma file with Auto-Layout (Framer-ready)",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 lg:gap-4">
                    <BiCheck className="size-5 lg:size-6 flex-shrink-0 mt-0.5 text-black/20" />
                    <span className="text-sm lg:text-lg">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Option B */}
            <div className="bg-black text-white rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12">
              <p className="text-xs lg:text-sm font-bold text-[#00afec] tracking-wider uppercase mb-2">Option B</p>
              <h3 className="text-lg lg:text-2xl mb-4 lg:mb-6" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>Full Website Redesign</h3>
              <div className="my-4 lg:my-6">
                <span className="text-4xl md:text-5xl lg:text-6xl xl:text-[80px] tracking-[-0.04em] leading-none" style={{ fontFamily: "'Roboto Flex', sans-serif" }}>$21,000</span>
                <span className="text-lg lg:text-2xl text-white/30 ml-2">/7 weeks</span>
              </div>
              <div className="h-px bg-white/20 my-6 lg:my-8" />
              <div className="space-y-3 lg:space-y-4">
                {[
                  "Everything in Option A",
                  "15+ unique page designs",
                  "7 CMS master templates (Blog, Events, Jobs…)",
                  "Full UX flow & navigation strategy",
                  "Dedicated Taskmapper & Therm pages",
                  "Advanced motion & interaction specs",
                  "Content migration field mapping",
                  "30-day post-handoff design support",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 lg:gap-4">
                    <BiCheck className="size-5 lg:size-6 flex-shrink-0 mt-0.5 text-[#00afec]" />
                    <span className="text-sm lg:text-lg">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 7: CTA ============ */}
      <Slide bg="bg-black">
        <div className="px-[5%] lg:px-20 py-20 lg:py-24 flex flex-col items-center justify-center min-h-[60vh] lg:min-h-[80vh] print:min-h-[1080px] text-center text-white relative">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none opacity-10">
            <img src="/ebaqdesign-logo-big.svg" alt="" className="w-full max-w-5xl invert" />
          </div>

          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[6rem] tracking-[-0.04em] leading-[1] mb-6 lg:mb-8"
              style={{ fontFamily: "'Roboto Flex', sans-serif", fontVariationSettings: "'wght' 300" }}
            >
              Let's build something<br />exceptional.
            </h2>
            <p className="text-base lg:text-xl xl:text-2xl text-white/40 mb-8 lg:mb-12">
              Reply to this email or book a quick intro call.
            </p>
            <div className="flex gap-4 lg:gap-6 justify-center flex-wrap">
              <a
                href="mailto:ebaqcompany@gmail.com"
                className="inline-block px-6 lg:px-10 py-3 lg:py-5 bg-white text-black rounded-[99px] text-sm lg:text-lg font-semibold hover:bg-[#00afec] hover:text-white transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="https://cal.com/ebaqdesign/15min"
                target="_blank"
                rel="noopener"
                className="inline-block px-6 lg:px-10 py-3 lg:py-5 border border-white/20 text-white rounded-[99px] text-sm lg:text-lg font-semibold hover:border-white/50 transition-colors"
              >
                Book a Call
              </a>
            </div>

            <div className="mt-12 lg:mt-20 text-white/20 text-xs lg:text-sm">
              <p>© 2026 Ebaq Design · ebaq.design</p>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};
