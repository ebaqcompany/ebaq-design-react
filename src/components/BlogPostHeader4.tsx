type ImageProps = { src: string; alt?: string };
type PostDetails = { title: string; description: string };
type Props = {
  category: string;
  heading: string;
  image: ImageProps;
  postDetails: PostDetails[];
};

export type BlogPostHeader4Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const BlogPostHeader4 = (props: BlogPostHeader4Props) => {
  const { category, heading, image, postDetails } = { ...BlogPostHeader4Defaults, ...props };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid gap-x-20 gap-y-12 xl:grid-cols-2">
          <div className="mx-auto flex size-full max-w-lg flex-col items-start justify-start">
            <div className="mb-5 flex w-full items-center justify-start md:mb-6">
              <p className="rounded-full border border-black/20 px-3 py-1 text-sm font-normal">{category}</p>
            </div>
            <h1>{heading}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 md:mt-8">
              {postDetails.map((detail) => <p key={detail.title} className="text-sm">{detail.title} {detail.description}</p>)}
            </div>
          </div>
          <div className="mx-auto aspect-video w-full overflow-hidden bg-background-secondary xl:self-center">
            <img src={image.src || "/ebaqdesign-logo-big.svg"} onError={(event) => { event.currentTarget.src = "/ebaqdesign-logo-big.svg"; }} className="size-full object-cover" alt={image.alt ?? heading} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const BlogPostHeader4Defaults: Props = {
  category: "Category",
  heading: "Blog title heading will go here",
  image: { src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg", alt: "" },
  postDetails: [],
};
