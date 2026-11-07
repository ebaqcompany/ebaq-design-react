// Compact, title-only adaptation of Relume Layout 611's paired benefit rows.
const benefits = [
  "Work directly with a senior designer",
  "Get to launch sooner",
  "Keep the process straightforward",
  "Know your investment upfront",
  "Give your brand full attention",
  "Put your identity to work",
];

export const BrandDesignBenefits = () => (
  <section id="brand-design-benefits" aria-labelledby="brand-design-benefits-heading" className="bg-white px-[5%] py-12 text-black md:py-16">
    <div className="container">
      <h2 id="brand-design-benefits-heading" className="mb-6 max-w-3xl md:mb-8">A better way to build your brand.</h2>
      <div className="grid grid-cols-1 gap-x-16 border-t border-black/20 pt-3 md:grid-cols-2">
        {benefits.map((heading) => (
          <h3 key={heading} className="heading-h5 py-3 md:py-4">{heading}</h3>
        ))}
      </div>
    </div>
  </section>
);
