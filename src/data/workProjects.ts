import { caseStudies } from "./caseStudies";

// Shared portfolio roster and preview assets used by /work and service-page embeds.
export const workProjects = caseStudies.map((study) => ({
  title: study.client,
  description: study.title,
  image: study.preview,
  images: [
    ...study.leadGallery,
    ...study.content.flatMap((block) => (block.type === "gallery" ? block.images : [])),
  ].filter(
    (image) => image.kind !== "video" && image.kind !== "lottie",
  ),
  lottie: study.hero.kind === "lottie" ? study.hero : undefined,
  url: `/work/${study.slug}`,
}));
