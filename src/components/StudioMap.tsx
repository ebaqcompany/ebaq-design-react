import { useState } from "react";
import { HiArrowUpRight, HiOutlineMapPin } from "react-icons/hi2";
import { studio } from "../content/siteFacts";

// Studio location with a click-to-load Google Map. The drawn street plan keeps the
// page fast; Google's embed (about 1 MB of scripts) only loads when a visitor asks for it.
// Both links point at the Google Business Profile, not a bare address search.
export const StudioMap = () => {
  const [showMap, setShowMap] = useState(false);
  const { street, locality, region, postalCode } = studio.address;
  return <section className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28" aria-labelledby="studio-map-heading">
    <div className="container grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
      <div>
        <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary md:mb-4">Studio</p>
        <h2 id="studio-map-heading" className="mb-5 text-white md:mb-6">Visit the studio in Brooklyn</h2>
        <p className="text-white/80 md:text-md">I work from BKLYN Commons on Flatbush Avenue. Book a call first, then we can meet at the studio or online.</p>
        <address className="mt-8 flex items-start gap-4 not-italic text-white/80">
          <HiOutlineMapPin aria-hidden="true" className="size-6 shrink-0 text-brand-primary" />
          <span>{studio.legalName}<br />{street}, BKLYN Commons<br />{locality}, {region} {postalCode}</span>
        </address>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-semibold">
          <a className="inline-flex items-center gap-2 text-white underline-offset-4 hover:underline" href={studio.googleBusinessProfile} target="_blank" rel="noreferrer">View on Google<HiArrowUpRight aria-hidden="true" className="size-4" /></a>
          <a className="inline-flex items-center gap-2 text-white underline-offset-4 hover:underline" href={studio.googleMapsDirections} target="_blank" rel="noreferrer">Get directions<HiArrowUpRight aria-hidden="true" className="size-4" /></a>
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
        {showMap ? <iframe
          src={studio.googleMapsEmbed}
          title={`Google Map of ${studio.legalName}, ${street}, ${locality}`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        /> : <>
          <svg aria-hidden="true" className="absolute inset-0 size-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <g stroke="#fff" strokeOpacity="0.12" strokeWidth="7" strokeLinecap="square">
              {[30, 95, 160, 225, 290].map((y) => <line key={`h${y}`} x1="-20" y1={y} x2="420" y2={y - 18} />)}
              {[40, 120, 280, 360].map((x) => <line key={`v${x}`} x1={x} y1="-20" x2={x + 14} y2="320" />)}
            </g>
            <line x1="170" y1="-20" x2="230" y2="320" stroke="#fff" strokeOpacity="0.28" strokeWidth="16" />
            <text x="0" y="0" transform="translate(203 148) rotate(80)" className="font-mono" fontSize="10" letterSpacing="1.5" fill="#fff" fillOpacity="0.55">FLATBUSH AVE</text>
          </svg>
          <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-full" aria-hidden="true">
            <HiOutlineMapPin className="size-12 fill-black text-brand-primary" />
          </div>
          <button type="button" onClick={() => setShowMap(true)} className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black">Show Google Map</button>
        </>}
      </div>
    </div>
  </section>;
};
