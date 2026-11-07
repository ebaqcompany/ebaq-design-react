import { AboutServicesCard } from "./AboutServicesCard";
import { arekToolIcons } from "./ArekProfileBadge";
import "./AboutTools.css";

const rows = [arekToolIcons.slice(0, 6), arekToolIcons.slice(6)];

// Relume Layout 422's paired cards, with a custom tool-logo visual.
export const AboutTools = () => {
  return (
    <section id="about-tools" aria-labelledby="about-tools-heading" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col overflow-hidden rounded-2xl bg-[#f5f5f5] pt-8 md:pt-10">
          <div className="px-6 md:px-8 lg:px-10">
            <p className="mb-3 font-semibold text-brand-primary">My toolkit</p>
            <h2 id="about-tools-heading" className="heading-h3 mb-4">Tools I use</h2>
            <p>For brand identities, websites, and everything in motion.</p>
          </div>
          <ul className="sr-only">{arekToolIcons.map(([, name]) => <li key={name}>{name}</li>)}</ul>
          <div aria-hidden="true" className="about-tools-visual mt-8 md:mt-10">
            {rows.map((row, index) => (
              <div key={index} className="about-tools-row">
                {[0, 1].map((copy) => (
                  <div className="about-tools-group" key={copy}>
                    {[...row, ...row].map(([src, name, iconClassName], i) => (
                      <div className="about-tools-circle" key={`${name}-${i}`}>
                        <img src={src} alt="" decoding="async" className={`size-8 rounded-[20%] object-contain md:size-9 ${iconClassName ?? ""}`} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
        <AboutServicesCard />
      </div>
    </section>
  );
};
