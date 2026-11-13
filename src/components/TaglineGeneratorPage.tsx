import { Helmet } from "react-helmet-async";
import { IdeaGenerator } from "./IdeaGenerator";
import { IdeaToolPage } from "./IdeaToolPage";
import type { FactFaq } from "../content/siteFacts";
import { generateTaglines, taglineTypes, type TaglineType } from "../tools/ideaEngine";

// A free tool at /tools/tagline-generator, rebuilt from the old Tagliner app: the same five
// tagline types, now on this site. See IdeaGenerator for how results are produced.
const title = "Tagline Generator: Free Brand Tagline Ideas | Ebaq Design";
const description = "Pick one of five tagline types, describe your business, and get nine tagline ideas with the reasoning behind each. Free, no sign-up.";

const faqs: FactFaq[] = [
  { question: "What makes a good tagline?", answer: "It is short, it says one thing, and it could only belong to your brand. A good tagline comes out of your positioning: who you are for and what you do better than anyone else." },
  { question: "What is the difference between a tagline and a slogan?", answer: "A tagline stays with the brand for years and sits next to the logo. A slogan belongs to a campaign and changes when the campaign does. The generator writes lines you can use as either." },
  { question: "How does the generator work?", answer: "It combines what you tell it about your offer, your audience, and the main benefit with one of five tagline types. Each line comes with a note on why that pattern works." },
  { question: "Why do some lines read awkwardly?", answer: "The lines are built from your words. Write the offer as a thing (accounting software), the audience as people (freelancers), and the benefit starting with a verb (get paid faster)." },
  { question: "Can I use these taglines?", answer: "Yes, they are yours to use. Before you commit to one, search for it online and check trademarks in your country, because the generator does not check whether a line is already taken." },
  { question: "Do you write taglines for clients?", answer: "Yes, as part of brand strategy. We work out your positioning and messaging first, and the tagline comes from that." },
];

export const TaglineGeneratorPage = () => (
  <IdeaToolPage
    path="/tools/tagline-generator"
    name="Tagline Generator"
    title={title}
    description={description}
    head={
      <Helmet>
        <title>Tagline Generator: Free Brand Tagline Ideas | Ebaq Design</title>
        <meta name="description" content="Pick one of five tagline types, describe your business, and get nine tagline ideas with the reasoning behind each. Free, no sign-up." />
      </Helmet>
    }
    heading="Tagline generator"
    intro="Pick a tagline type, tell me what you sell, who it is for, and the main benefit. You get nine tagline ideas, each with a note on why it works."
    introLink={{ label: "How to write a slogan", href: "/blog/brand-slogans" }}
    tool={
      <IdeaGenerator
        kind="tagline"
        noun="taglines"
        styleLabel="tagline type"
        types={taglineTypes}
        unit="words"
        lengths={[{ id: "short", label: "Short", min: 1, max: 3 }, { id: "medium", label: "Medium", min: 3, max: 6 }, { id: "long", label: "Long", min: 6, max: 10 }]}
        fields={[
          { id: "offer", label: "What do you sell?", placeholder: "invoicing software", max: 80 },
          { id: "audience", label: "Who is it for?", placeholder: "freelancers", max: 80 },
          { id: "benefit", label: "What is the main benefit? Start with a verb.", placeholder: "get paid faster", max: 80 },
          { id: "brand", label: "Brand name", placeholder: "Acme", optional: true, max: 40 },
        ]}
        describe={(values) => ({ brand: values.brand, description: `Offer: ${values.offer}. Audience: ${values.audience}. Main benefit: ${values.benefit}.` })}
        fallback={(type, values, seed) => generateTaglines({ type: type as TaglineType, brand: values.brand ?? "", offer: values.offer ?? "", audience: values.audience ?? "", benefit: values.benefit ?? "" }, seed)}
        note="Free to use. Check a line is not already taken before you commit to it."
        nextStep={{ heading: "A tagline is the last step, not the first", body: "The lines that last come from a clear position: who you are for and why you are different. That is what I work out with clients in brand strategy.", link: { label: "Brand strategy", href: "/services/brand-strategy" } }}
      />
    }
    typesEyebrow="The patterns"
    typesHeading="Five types of taglines"
    typesIntro="Almost every well-known tagline follows one of these five patterns. Pick the one that matches what your brand needs to say."
    types={taglineTypes}
    faqHeading="Tagline questions"
    faqs={faqs}
    cta={{ heading: "Need the strategy behind the line?", description: "Book a 15-minute call. Tell me about your brand and I’ll tell you how I would position it." }}
  />
);
