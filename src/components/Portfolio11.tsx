import { RxChevronRight } from "react-icons/rx";

// Adapted from Relume Portfolio 11, retrieved through Relume-library MCP.
// Uses this site's type/button tokens and preserves each image's native ratio.
type Project = {
  title: string;
  description: string;
  image: { src: string; alt?: string };
  url: string;
};

type Props = {
  id?: string;
  heading: string;
  projects: Project[];
};

export const Portfolio11 = ({ id, heading, projects }: Props) => (
  <section id={id} className="bg-black px-[5%] py-16 text-white md:py-24 lg:py-28">
    <div className="container">
      <header className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
        <h2>{heading}</h2>
      </header>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.url}>
            <div className="mb-5 md:mb-6">
              <a href={project.url}>
                <img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" className="h-auto w-full" />
              </a>
            </div>
            <h3 className="heading-h5 mb-2"><a href={project.url}>{project.title}</a></h3>
            <p>{project.description}</p>
            <a href={project.url} className="text-link mt-5 inline-flex items-center gap-2 md:mt-6">
              View project<RxChevronRight aria-hidden="true" className="size-5" />
            </a>
          </article>
        ))}
      </div>
      <footer className="mt-12 flex justify-center md:mt-18 lg:mt-20">
        <a href="/work" className="button-inverted button-inverted--dark-surface inline-flex items-center justify-center px-6 py-3">View all work</a>
      </footer>
    </div>
  </section>
);
