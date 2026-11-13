import { Helmet } from "react-helmet-async";
import { IdeaGenerator } from "./IdeaGenerator";
import { IdeaToolPage } from "./IdeaToolPage";
import type { FactFaq } from "../content/siteFacts";
import { generateNames, nameTypes, type NameType } from "../tools/ideaEngine";

// A free tool at /tools/brand-name-generator, rebuilt from the old Brand Namer app: the same six
// name types, now on this site. See IdeaGenerator for how results are produced.
const title = "Brand Name Generator: Free Business Name Ideas | Ebaq Design";
const description = "Pick one of six brand name types, describe your business, and get nine name ideas with the reasoning behind each. Free, no sign-up.";

const faqs: FactFaq[] = [
  { question: "What makes a good brand name?", answer: "It is easy to say, easy to spell, and different from the names around it in your category. It should also leave room to grow, so it still fits when you add products or markets." },
  { question: "Which type of name should I choose?", answer: "Descriptive names are clear and hard to protect. Abstract and invented names are easy to protect and need more marketing to explain. Suggestive and associative names sit in between, which is why many brands choose them." },
  { question: "How does the generator work?", answer: "It takes the key words from your description and applies one of six naming methods to them. Each name comes with a note on where it came from." },
  { question: "Are these names available?", answer: "The generator does not check. Before you commit to a name, search for it online, check trademarks in your country and category, and see whether a matching domain is free." },
  { question: "What do I do once I have a name?", answer: "Test it out loud with a few people, check it is free to use, and then build the identity around it: logo, colors, typography, and a website." },
  { question: "Do you name brands for clients?", answer: "Yes, as part of brand strategy. We set the positioning first, then build a shortlist of names and check each one before you choose." },
];

export const BrandNameGeneratorPage = () => (
  <IdeaToolPage
    path="/tools/brand-name-generator"
    name="Brand Name Generator"
    title={title}
    description={description}
    head={
      <Helmet>
        <title>Brand Name Generator: Free Business Name Ideas | Ebaq Design</title>
        <meta name="description" content="Pick one of six brand name types, describe your business, and get nine name ideas with the reasoning behind each. Free, no sign-up." />
      </Helmet>
    }
    heading="Brand name generator"
    intro="Pick a name type and describe your business in a few words. You get nine name ideas, each with a note on where it comes from."
    introLink={{ label: "How to name a brand", href: "/blog/brand-naming" }}
    tool={
      <IdeaGenerator
        kind="name"
        noun="names"
        styleLabel="name style"
        types={nameTypes}
        unit="characters"
        lengths={[{ id: "short", label: "Short", min: 3, max: 6 }, { id: "medium", label: "Medium", min: 5, max: 10 }, { id: "long", label: "Long", min: 9, max: 15 }]}
        fields={[{ id: "description", label: "What does your business do?", placeholder: "Invoicing software for freelance designers", multiline: true, max: 300 }]}
        describe={(values) => ({ description: values.description })}
        fallback={(type, values, seed) => generateNames({ type: type as NameType, description: values.description ?? "" }, seed)}
        note="Free to use. Check trademarks and domains before you commit to a name."
        nextStep={{ heading: "A name is the start of a brand", body: "Once you have a shortlist, the next step is the identity around it: a logo, colors, and typography that make the name recognizable.", link: { label: "Logo design", href: "/services/logo-design" } }}
      />
    }
    typesEyebrow="The methods"
    typesHeading="Six types of brand names"
    typesIntro="Every brand name falls into one of these six groups. Each one trades clarity against how easy the name is to own."
    types={nameTypes}
    faqHeading="Brand name questions"
    faqs={faqs}
    cta={{ heading: "Have a name and need the brand?", description: "Book a 15-minute call. Tell me the name and I’ll tell you how I would build the identity around it." }}
  />
);
