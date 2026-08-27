import { Button, Input } from "@relume_io/relume-ui";
import { useMemo, useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import type { BlogPostSummary } from "../content/blog";

type Props = {
  tagline: string;
  heading: string;
  description: string;
  blogPosts: BlogPostSummary[];
};

export type Blog2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Blog2 = (props: Blog2Props) => {
  const { tagline, heading, description, blogPosts } = { ...Blog2Defaults, ...props };
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleLimit, setVisibleLimit] = useState(24);
  const categories = useMemo(
    () => Array.from(new Map(blogPosts.map((post) => [post.categorySlug, post.category])).entries())
      .sort(([firstSlug], [secondSlug]) => {
        const categoryOrder: Record<string, number> = {
          "logo-design": -1,
          freelancing: 1,
          "buying-guides": 2,
        };
        return (categoryOrder[firstSlug] ?? 0) - (categoryOrder[secondSlug] ?? 0);
      }),
    [blogPosts],
  );
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredPosts = blogPosts.filter((post) =>
    (!activeCategory || post.categorySlug === activeCategory)
    && (!normalizedQuery || post.title.toLocaleLowerCase().includes(normalizedQuery)),
  );
  const visiblePosts = filteredPosts.slice(0, visibleLimit);

  return (
    <section id="blog">
      <div className="relative px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold text-brand-primary md:mb-4">{tagline}</p>
            <h1 className="mb-5 md:mb-6">{heading}</h1>
            <p className="mx-auto max-w-md md:text-md">{description}</p>
          </div>
          <div id="blog-controls" className="mx-auto mt-8 w-full max-w-lg scroll-mt-24 md:mt-10">
            <div className="mx-auto w-full max-w-archive-search-compact">
              <label htmlFor="blog-search" className="sr-only">Search Blog posts by title</label>
              <Input id="blog-search" type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setVisibleLimit(24); }} placeholder="Search articles" className="rounded-full border-black/20 focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0" />
            </div>
            <div id="blog-categories" className="mx-auto mt-4 flex max-w-md scroll-mt-24 flex-wrap items-center justify-center gap-2">
              {categories.map(([slug, label]) => (
                <Button key={slug} variant="link" aria-pressed={activeCategory === slug} onClick={() => { setActiveCategory((current) => current === slug ? "" : slug); setVisibleLimit(24); }} className={`archive-filter-button shrink-0 px-4 py-2 ${activeCategory === slug ? "archive-filter-button--active border-border-primary" : "border-black/20"}`}>{label}</Button>
              ))}
            </div>
          </div>
        </div>
        <a href="#blog-results" aria-label="Go to Blog posts" className="blog-scroll-arrow absolute bottom-4 left-1/2 inline-flex size-12 -translate-x-1/2 items-center justify-center md:bottom-6">
          <RxChevronDown aria-hidden="true" className="size-8" />
        </a>
      </div>
      <div id="blog-results" className="scroll-mt-20 bg-brand-light px-[5%] py-16 md:scroll-mt-24 md:py-24 lg:py-28">
        <div className="container flex flex-col justify-start">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="flex size-full flex-col items-start justify-start">
                <a href={post.url} className="mb-6 aspect-video w-full overflow-hidden bg-background-secondary">
                  <img
                    src={post.image.src}
                    alt={post.image.alt ?? post.title}
                    loading="lazy"
                    onError={(event) => { event.currentTarget.src = "/ebaqdesign-logo-big.svg"; }}
                    className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </a>
                <div className="mb-4 flex w-full flex-wrap items-center justify-start gap-x-4 gap-y-2">
                  <p className="rounded-full border border-black/20 px-3 py-1 text-sm font-normal">{post.category}</p>
                  <p className="text-sm">Published on {post.date}</p>
                </div>
                <div className="flex w-full grow flex-col items-start justify-start">
                  <a className="heading-link mb-2" href={post.url}><h2 className="heading-h5">{post.title}</h2></a>
                </div>
              </article>
            ))}
          </div>
          {visiblePosts.length === 0 && <p className="mb-12 text-center md:mb-16">No articles match your search.</p>}
          {visibleLimit < filteredPosts.length && (
            <Button className="mx-auto mt-12 md:mt-16" onClick={() => setVisibleLimit((limit) => limit + 24)}>
              Load more
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export const Blog2Defaults: Props = {
  tagline: "Learn branding",
  heading: "On Branding Blog",
  description: "All the written content, course material, and resources you need to understand all things branding.",
  blogPosts: [],
};
