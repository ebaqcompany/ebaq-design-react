import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from "@relume_io/relume-ui";
import { useEffect, useRef, useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { Link } from "react-router-dom";
import { ArekProfileBadge } from "./ArekProfileBadge";
import { Banner12 } from "./Banner12";

type Props = {
  articleTitle: string;
  articleUrl: string;
  children: React.ReactNode;
};

export type Content32Props = React.ComponentPropsWithoutRef<"section"> & Props;

type TocItem = { id: string; label: string };

export const Content32 = ({ articleTitle, children }: Content32Props) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    const usedIds = new Set<string>();
    const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2"));
    const items = headings.map((heading, index) => {
      const baseId = heading.id || heading.textContent?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${index + 1}`;
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
      usedIds.add(id);
      heading.id = id;
      heading.classList.add("scroll-mt-24");
      return { id, label: heading.textContent?.trim() || `Section ${index + 1}` };
    });
    setTocItems(items);
  }, [children]);

  return (
    <section className="bg-brand-light px-[5%] pb-16 pt-12 md:pb-24 md:pt-18 lg:pb-28 lg:pt-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.5fr_1fr] lg:gap-x-20">
          <aside className="order-last lg:order-none">
            <div className="lg:sticky lg:top-20 lg:max-w-xxs">
              <ArekProfileBadge variant="author" portraitHref="/about" />
              {tocItems.length > 0 && <nav aria-label={`Table of contents for ${articleTitle}`} className="blog-toc mt-6"><Accordion type="single" collapsible><AccordionItem value="article-contents" className="border-none"><AccordionTrigger icon={<RxChevronDown className="size-5 shrink-0 transition-transform duration-300" />} className="heading-h5 w-full gap-4 py-3 text-left [&[data-state=open]>svg]:rotate-180">{articleTitle}</AccordionTrigger><AccordionContent className="pb-0"><ul className="space-y-1.5 pt-2">{tocItems.map((item) => <li key={item.id} className="leading-[1.5]"><a href={`#${item.id}`} className="inline text-base leading-[1.5]">{item.label}</a></li>)}</ul></AccordionContent></AccordionItem></Accordion></nav>}
              <div className="mt-8 flex w-full flex-col items-start bg-black p-4 text-white lg:p-6">
                <div className="mb-3 flex items-center">
                  <Link to="/" aria-label="Ebaq Design home">
                    <img src="/ebaq-mark-one-color.svg" alt="Ebaq Design" className="notification-bar-logo mr-4 size-8" />
                  </Link>
                  <p className="text-xl font-semibold leading-tight md:text-[1.5625rem] md:leading-none">Need a designer?</p>
                </div>
                <p className="mb-5">See how I can shape your <strong>brand</strong> and <strong>website</strong> - reach out to get a quote.</p>
                <Button asChild size="sm" className="button-inverted--dark-surface">
                  <Link
                    to="/work"
                    onClick={() => {
                      document.documentElement.scrollTop = 0;
                      document.body.scrollTop = 0;
                    }}
                  >
                    See my work
                  </Link>
                </Button>
              </div>
              <Banner12 className="w-full" scrollDriven />
            </div>
          </aside>
          <div ref={articleRef} className="blog-rich-text prose max-w-none md:prose-md lg:prose-lg">{children}</div>
        </div>
      </div>
    </section>
  );
};
