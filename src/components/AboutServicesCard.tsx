const serviceRows = [
  ["Brand Strategy", "Logo Design", "Brand Identity", "Brand Guidelines", "Color Palette", "Type System", "Messaging"],
  ["Web Design", "Custom Websites", "Web Development", "Framer Development", "Webflow Development", "Landing Pages", "Pitch Decks"],
  ["Motion Graphics", "Logo Animation", "Social Media Graphics", "Stationery", "Presentation Design", "Custom Icons", "Brand Launch Assets"],
];

export const AboutServicesCard = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl bg-[#f5f5f5] pt-8 md:pt-10">
    <div className="px-6 md:px-8 lg:px-10">
      <p className="mb-3 font-semibold text-brand-primary">My services</p>
      <h2 className="heading-h3 mb-4">Some things I offer.</h2>
      <p>From brand strategy to websites and motion.</p>
    </div>
    <ul className="sr-only">{serviceRows.flat().map(service => <li key={service}>{service}</li>)}</ul>
    <div aria-hidden="true" className="about-tools-visual about-services-visual mt-8 md:mt-10">
      {serviceRows.map((row, index) => (
        <div key={index} className="about-tools-row">
          {[0, 1].map(copy => (
            <div className="about-tools-group" key={copy}>
              {[...row, ...row].map((service, itemIndex) => <span key={`${service}-${itemIndex}`} className="about-services-label">{service}</span>)}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
