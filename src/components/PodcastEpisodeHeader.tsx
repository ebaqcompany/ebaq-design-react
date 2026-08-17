import type { PodcastEpisode } from "../content/podcast";

export const PodcastEpisodeHeader = ({ episode }: { episode: PodcastEpisode }) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid gap-x-20 gap-y-12 xl:grid-cols-2">
        <div className="mx-auto flex size-full max-w-lg flex-col items-start justify-start">
          <div className="mb-5 flex items-center md:mb-6"><p className="rounded-full border border-black/20 px-3 py-1 text-sm font-normal">Episode {episode.episodeNumber}</p></div>
          <h1>{episode.title}</h1>
          <p className="mt-5 rounded-full border border-black/20 px-3 py-1 text-sm font-normal md:mt-6">with {episode.guest}</p>
        </div>
        <div className="mx-auto aspect-video w-full overflow-hidden bg-background-secondary xl:self-center"><img src={episode.heroImage.src || episode.image.src || "/ebaqdesign-logo-big.svg"} onError={(event) => { event.currentTarget.src = "/ebaqdesign-logo-big.svg"; }} alt={episode.heroImage.alt ?? episode.title} className="size-full object-cover" /></div>
      </div>
    </section>
  );
};
