import { Button, Input } from "@relume_io/relume-ui";
import { useMemo, useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import type { PodcastEpisodeSummary } from "../content/podcast";

export const PodcastArchive = ({ episodes }: { episodes: PodcastEpisodeSummary[] }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleLimit, setVisibleLimit] = useState(24);
  const categories = useMemo(() => Array.from(new Map(episodes.map((episode) => [episode.categorySlug, episode.category])).entries()), [episodes]);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredEpisodes = episodes.filter((episode) =>
    (!activeCategory || episode.categorySlug === activeCategory)
    && (!normalizedQuery || episode.title.toLocaleLowerCase().includes(normalizedQuery)),
  );
  const visibleEpisodes = filteredEpisodes.slice(0, visibleLimit);

  return (
    <section id="podcast-episodes">
      <div className="relative px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
        <header className="mx-auto w-full max-w-lg text-center">
          <p className="mb-3 font-semibold md:mb-4">Learn branding</p>
          <h1 className="mb-5 md:mb-6">On Branding Podcast</h1>
          <p className="mx-auto max-w-md md:text-md">Want to know what it takes to brand a business? Check out our interviews with top branding experts.</p>
          <div id="podcast-controls" className="mt-8 w-full scroll-mt-24 text-left md:mt-10">
            <div className="mx-auto w-full max-w-archive-search-compact">
              <label htmlFor="podcast-search" className="sr-only">Search Podcast episodes by title</label>
              <Input id="podcast-search" type="search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setVisibleLimit(24); }} placeholder="Search episodes" className="rounded-full border-black/20 focus:border-black focus:ring-0 focus-visible:border-black focus-visible:ring-0" />
            </div>
            <div id="podcast-categories" className="mx-auto mt-4 flex max-w-md scroll-mt-24 flex-wrap items-center justify-center gap-2">
              {categories.map(([slug, label]) => (
                <Button key={slug} variant="link" aria-pressed={activeCategory === slug} onClick={() => { setActiveCategory((current) => current === slug ? "" : slug); setVisibleLimit(24); }} className={`archive-filter-button shrink-0 px-4 py-2 ${activeCategory === slug ? "archive-filter-button--active border-border-primary" : "border-black/20"}`}>{label}</Button>
              ))}
            </div>
          </div>
        </header>
        </div>
        <a href="#podcast-results" aria-label="Go to Podcast episodes" className="absolute bottom-4 left-1/2 inline-flex size-12 -translate-x-1/2 items-center justify-center md:bottom-6">
          <RxChevronDown aria-hidden="true" className="size-8" />
        </a>
      </div>
      <div id="podcast-results" className="scroll-mt-20 bg-brand-light px-[5%] py-16 md:scroll-mt-24 md:py-24 lg:py-28">
        <div className="container">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {visibleEpisodes.map((episode) => (
            <article key={episode.slug} className="flex size-full flex-col items-start">
              <a href={episode.url} className="relative mb-6 aspect-video w-full overflow-hidden bg-background-secondary">
                <img src={episode.image.src || "/ebaqdesign-logo-big.svg"} onError={(event) => { event.currentTarget.src = "/ebaqdesign-logo-big.svg"; }} alt={episode.image.alt ?? episode.title} loading="lazy" className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
                <span className="absolute bottom-3 left-3 rounded-full bg-black px-3 py-1 text-sm font-semibold text-white">Episode {episode.episodeNumber}</span>
              </a>
              <p className="mb-3 rounded-full border border-black/20 px-3 py-1 text-sm font-normal">with {episode.guest}</p>
              <a href={episode.url} className="heading-link"><h2 className="heading-h5">{episode.title}</h2></a>
            </article>
          ))}
        </div>
        {visibleEpisodes.length === 0 && <p className="mb-12 text-center md:mb-16">No episodes match your search.</p>}
        {visibleLimit < filteredEpisodes.length && <Button className="mx-auto mt-12 flex md:mt-16" onClick={() => setVisibleLimit((limit) => limit + 24)}>Load more</Button>}
        </div>
      </div>
    </section>
  );
};
