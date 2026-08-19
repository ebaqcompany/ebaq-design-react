import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from "@relume_io/relume-ui";
import { useEffect, useRef, useState } from "react";
import { BiLinkAlt, BiLogoFacebookCircle, BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
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

export const Content32 = ({ articleTitle, articleUrl, children }: Content32Props) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const articleRef = useRef<HTMLDivElement>(null);
  const encodedUrl = encodeURIComponent(articleUrl);
  const shareLinks = [
    { label: "Copy article link", url: articleUrl, icon: <BiLinkAlt className="size-6" /> },
    { label: "Share on LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <BiLogoLinkedinSquare className="size-6" /> },
    { label: "Share on X", url: `https://x.com/intent/tweet?url=${encodedUrl}`, icon: <FaXTwitter className="size-6 p-0.5" /> },
    { label: "Share on Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <BiLogoFacebookCircle className="size-6" /> },
  ];

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
              {tocItems.length > 0 && <nav aria-label={`Table of contents for ${articleTitle}`} className="mt-6"><Accordion type="single" collapsible><AccordionItem value="article-contents" className="border-none"><AccordionTrigger icon={<RxChevronDown className="size-5 shrink-0 transition-transform duration-300" />} className="heading-h6 w-full gap-4 py-3 text-left [&[data-state=open]>svg]:rotate-180">{articleTitle}</AccordionTrigger><AccordionContent className="pb-0"><ul className="space-y-1.5 pt-2">{tocItems.map((item) => <li key={item.id} className="leading-[1.5]"><a href={`#${item.id}`} className="inline text-base leading-[1.5]">{item.label}</a></li>)}</ul></AccordionContent></AccordionItem></Accordion></nav>}
              <div className="mt-8 flex w-full flex-col items-start bg-black p-4 text-white lg:p-6">
                <div className="mb-3 flex items-center">
                  <Link to="/" aria-label="Ebaq Design home">
                    <img src="/ebaq-mark-one-color.svg" alt="Ebaq Design" className="notification-bar-logo mr-4 size-8" />
                  </Link>
                  <h6 className="font-semibold">Need a designer?</h6>
                </div>
                <p className="mb-5">See selected brand and web work, then get in touch if the fit feels right.</p>
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
              <p className="mt-8 font-bold md:text-md">Share</p>
              <div className="mt-5 flex items-start gap-3 md:mt-6">
                {shareLinks.map((link) => <a key={link.label} aria-label={link.label} href={link.url} target="_blank" rel="noreferrer" className="blog-share-link">{link.icon}</a>)}
              </div>
            </div>
          </aside>
          <div ref={articleRef} className="blog-rich-text prose max-w-none md:prose-md lg:prose-lg">{children}</div>
        </div>
      </div>
    </section>
  );
};
