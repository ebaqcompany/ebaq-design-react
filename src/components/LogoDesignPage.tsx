import { Helmet } from "react-helmet-async";
import { ServiceDetailLayout } from "./ServiceDetailLayout";
import { brandSprint } from "../content/siteFacts";

const pageUrl = "https://www.ebaqdesign.com/services/logo-design";

const refinementExamples = [
  { name: "Focal Project Managers", image: "/images/blog/brand-refresh/focal-brand-refresh.webp", alt: "Focal Project Managers logo before and after refinement", detail: "Retained the blue structural letter concept; refined proportions and made the descriptor clearer." },
  { name: "AMI", image: "/content/blog/logo-redesign/ami-before-after.webp", alt: "AMI logo before and after refinement", detail: "Kept the striped symbol and burgundy color; improved the wordmark, spacing and hierarchy." },
  { name: "Lyntics", image: "/content/blog/logo-redesign/lyntics-before-after.webp", alt: "Lyntics logo before and after refinement", detail: "Preserved the four-part symbol; refined symmetry, letter spacing and the color relationship." },
];

const LogoRefinement = () => (
  <section id="logo-refinement" aria-labelledby="logo-refinement-heading" className="scroll-mt-24 bg-brand-light px-[5%] py-16 md:py-24">
    <div className="container">
      <div className="mb-10 max-w-lg md:mb-16">
        <p className="mb-3 font-mono text-sm font-normal uppercase tracking-wide text-brand-primary">Already have a logo?</p>
        <h2 id="logo-refinement-heading" className="mb-6">Keep the idea. Refine the logo.</h2>
        <p className="md:text-md">A strong idea can survive a refresh. These real examples show how I improve an existing identity through specific changes to the mark, typography and visual balance.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {refinementExamples.map((example) => (
          <figure key={example.name}>
            <img src={example.image} alt={example.alt} width="960" height="540" loading="lazy" decoding="async" className="mb-5 aspect-video w-full bg-white object-contain" />
            <figcaption><h3 className="heading-h5 mb-3">{example.name}</h3><p>{example.detail}</p></figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-sm">These examples demonstrate design decisions; they do not imply that each historic project had the same fee or timeline.</p>
      <div className="mt-12 grid gap-10 border-t border-black/20 pt-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="heading-h4 mb-5">One week. $3,000.</h3>
          <p className="mb-5 md:text-md">One week, guaranteed, with the scope agreed at kickoff. Work directly with one senior designer on the logo and the system around it.</p>
          <ul className="list-disc space-y-2 pl-5">
            {brandSprint.deliverables.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="mt-5">For an existing identity, we agree which elements need refinement and which should stay.</p>
        </div>
        <div>
          <h3 className="heading-h4 mb-5">Start with your logo.</h3>
          <p className="mb-4">Bring your logo files, website, must-keep elements and the applications you need ready first.</p>
          <p className="mb-4">We confirm fit, availability, who approves the work and the feedback schedule before starting.</p>
          <p className="mb-4">Website design, development and larger rollout work add separately agreed weeks. Third-party font and asset licensing requirements are identified before selection.</p>
          <p className="mb-6"><a className="underline underline-offset-4" href="/pricing">See the full pricing and scope</a></p>
          <a href="/start" className="button-primary inline-flex rounded-full px-6 py-3 font-semibold">Discuss your logo or refresh</a>
          <p className="mt-6"><a className="underline underline-offset-4" href="/blog/logo-redesign">Explore more before-and-after logo work</a> · <a className="underline underline-offset-4" href="/blog/brand-refresh">Read the brand refresh guide</a></p>
        </div>
      </div>
    </div>
  </section>
);

export const LogoDesignPage = () => (
  <>
    <Helmet>
      <title>Logo Design &amp; Refinement NYC | Ebaq Design</title>
      <meta name="description" content="Refine an existing logo, colors and typography, or create a new identity. Work directly with a senior Brooklyn designer. $3,000 total, one week guaranteed." />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Logo Design & Refinement NYC | Ebaq Design" />
      <meta property="og:description" content="Refine an existing logo, colors and typography, or create a new identity. Work directly with a senior Brooklyn designer. $3,000 total, one week guaranteed." />
    </Helmet>
    <ServiceDetailLayout
      slug="logo-design"
      heading="Logo design & refinement"
      description="Improve your existing logo, colors and typography, or build a new identity. Work directly with Arek Dvornechuck, a senior designer in Brooklyn, NYC."
      afterOverview={<LogoRefinement />}
      heroImage={{ src: "/images/services/arek_sketching2.jpg", alt: "Arek Dvornechuck sketching logo concepts at his studio desk", width: 1920, height: 1080 }}
    />
  </>
);
