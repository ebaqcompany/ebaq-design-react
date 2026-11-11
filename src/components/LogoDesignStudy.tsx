const studies = [
  {
    id: "web-development-study",
    title: "Web Development",
    options: [
      { label: "Original", file: "web-development-animated", description: "Code and a responsive device, with cursor interactions." },
      { label: "Code to responsive layout", file: "web-development-code-resize-candidate", description: "The cursor moves from code to the browser edge, dragging the desktop layout into a mobile stack and back." },
    ],
  },
];

// Relume Layout 235 comparison using the same artwork/card conventions as ServicesGrid.
export const LogoDesignStudy = () => <section id="service-illustration-studies" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
  <div className="container">
    <header className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
      <p className="mb-3 font-mono text-sm uppercase tracking-wide text-brand-primary md:mb-4">Web Development · Illustration study</p>
      <h2 className="mb-5 heading-h2 md:mb-6">Web Development alternatives</h2>
      <p className="md:text-md">Original code-and-device animation beside a responsive browser study.</p>
    </header>
    <div className="grid gap-12 md:gap-16">
      {studies.map(study => <div key={study.id} id={study.id}>
        <h3 className="mb-6 heading-h4 md:mb-8">{study.title}</h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {study.options.map(option => <article key={option.file} className="overflow-hidden rounded-xl border border-black/20 bg-white">
            <div data-tone="light" className="bg-brand-grid relative aspect-[3/2] w-full overflow-hidden">
              <img src={`/images/services/geometric-candidates/${option.file}.svg`} alt={`${option.label}: ${option.description}`} width={1080} height={1080} loading="lazy" className="absolute inset-0 block size-full object-contain" />
            </div>
            <div className="p-6 md:p-8"><h4 className="mb-3 heading-h5">{option.label}</h4><p>{option.description}</p></div>
          </article>)}
        </div>
      </div>)}
    </div>
  </div>
</section>;
