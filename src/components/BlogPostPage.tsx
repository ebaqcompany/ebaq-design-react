import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { TestimonialCarouselArrow } from "./Testimonial32";
import { getBlogPostUrl, type BlogPost } from "../content/blog";
import { caseStudies } from "../data/caseStudies";
import { normalizeVideoEmbeds } from "../content/richText";
import { BlogPostHeader4 } from "./BlogPostHeader4";
import { Content32 } from "./Content32";
import { Cta17 } from "./Cta17";
import { Footer15 } from "./Footer15";
import { Navbar16 } from "./Navbar16";
import { NotificationBar } from "./NotificationBar";
import { NotFoundPage } from "./NotFoundPage";
import { Portfolio16Project, type Portfolio16ProjectProps } from "./Portfolio16";

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const toSchemaDate = (date: string) => {
  const parsed = new Date(`${date} 00:00:00 UTC`);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toISOString().slice(0, 10);
};
const selectedWorkHighlights: Record<string, string> = { "next-dimension": "healthcare", "fox-berman": "law firm", elevate: "SaaS", aero: "clinical", brevidee: "video-editing", wingnut: "high-end interiors", ventur: "AI travel planner", "airport-executive": "London chauffeur", sweetgrass: "cannabis dispensary", periti: "HubSpot consultancy", medihuanna: "medicinal cannabis" };
const logoScanHighlights: Record<string, string> = { "01": "formal, distinctive tone", "05": "purple uppercase serif wordmark", "20": "compact two-level lockup", "50": "purple uppercase serif wordmark", "60": "small centered strapline", "63": "slim vertical divider", "84": "open, geometric lettering", "99": "strong visual handle" };
const highlightPhrase = (text: string, phrase?: string) => { if (!phrase) return escapeHtml(text); const parts = text.split(phrase); return parts.map((part, index) => `${escapeHtml(part)}${index < parts.length - 1 ? `<strong>${escapeHtml(phrase)}</strong>` : ""}`).join(""); };

const SelectedWork = ({ selectedWorkSlugs = [] }: { selectedWorkSlugs?: string[] }) => {
  const projects = [...selectedWorkSlugs.map((slug) => caseStudies.find((study) => study.slug === slug)).filter(Boolean), ...caseStudies.filter((study) => !selectedWorkSlugs.includes(study.slug))].filter((study, index, all) => study && all.findIndex((item) => item?.slug === study.slug) === index);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(() => document.visibilityState === "hidden");
  const [manualPause, setManualPause] = useState(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = projects[index];
  const activeProject: Portfolio16ProjectProps | undefined = active ? {
    title: active.client,
    description: active.title,
    image: active.preview,
    images: [...active.leadGallery, ...active.content.flatMap((block) => block.type === "gallery" ? block.images : [])].filter((image) => image.kind !== "video" && image.kind !== "lottie"),
    lottie: active.hero.kind === "lottie" ? active.hero : undefined,
    url: `/work/${active.slug}`,
    highlightDescriptionPhrase: selectedWorkHighlights[active.slug],
  } : undefined;
  useEffect(() => { const query = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReducedMotion(query.matches); update(); query.addEventListener("change", update); return () => query.removeEventListener("change", update); }, []);
  useEffect(() => { const update = () => setDocumentHidden(document.visibilityState === "hidden"); document.addEventListener("visibilitychange", update); return () => document.removeEventListener("visibilitychange", update); }, []);
  useEffect(() => { if (!manualPause) return undefined; const timer = window.setTimeout(() => setManualPause(false), 6000); return () => window.clearTimeout(timer); }, [manualPause]);
  useEffect(() => { if (paused || documentHidden || manualPause || reducedMotion || projects.length < 2) return undefined; const timer = window.setInterval(() => setIndex((current) => (current + 1) % projects.length), 6000); return () => window.clearInterval(timer); }, [paused, documentHidden, manualPause, reducedMotion, projects.length]);
  const navigate = (direction: number) => { setIndex((current) => (current + direction + projects.length) % projects.length); setManualPause(true); };
  const finishDrag = (clientX: number) => { if (dragStart.current === null) return; const delta = clientX - dragStart.current; dragStart.current = null; if (Math.abs(delta) >= 48) { dragged.current = true; navigate(delta < 0 ? 1 : -1); } };
  if (!active) return null;
  return <section className="selected-work-carousel border-y border-black/10 px-[5%] py-10 md:py-14" aria-label="Selected work" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}><div className="container"><div className="flex items-end justify-between gap-4"><div><p className="mb-3 font-semibold text-brand-primary md:mb-4">Selected work</p><h2 className="mb-0">Brand identities and websites</h2></div></div><div className="mt-8 overflow-hidden" onPointerDown={(event) => { if (event.pointerType !== "mouse" || event.button === 0) dragStart.current = event.clientX; }} onPointerUp={(event) => finishDrag(event.clientX)} onPointerCancel={() => { dragStart.current = null; }}><div onClickCapture={(event) => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); dragged.current = false; } }}><Portfolio16Project {...activeProject!} reverse={false} /></div></div><div className="mt-8 flex w-full items-center justify-between gap-4"><a href="/work" className="button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full border transition-colors duration-200">See all case studies</a><div className="flex shrink-0 items-center justify-end gap-4"><TestimonialCarouselArrow direction="previous" label="Previous case study" onClick={() => navigate(-1)} /><TestimonialCarouselArrow direction="next" label="Next case study" onClick={() => navigate(1)} /></div></div></div></section>;
};

type LogoResearch = { number: string; name: string; officialUrl: string; verifiedFact: string; observations: [string, string] };

const factAfterLinkedName = (fact: string, name: string) => {
  const trimmedFact = fact.trim();
  const startsWithName = trimmedFact.slice(0, name.length).toLocaleLowerCase() === name.toLocaleLowerCase();
  const fragment = startsWithName ? trimmedFact.slice(name.length).trimStart() : trimmedFact;
  return `${/^[,.;:!?]/.test(fragment) ? "" : " "}${fragment}`;
};

const buildLogoRosterBody = (roster: string[], pageImages: Array<Array<{ src: string; alt: string }>> = [], tileImages: Array<{ src: string; alt: string }> = [], research: LogoResearch[] = [], config?: BlogPost["logoRosterConfig"]) => {
  const sectionNames = ["Quiet Authority", "Distinctive Wordmarks", "Specialist Character", "Modern Restraint", "Confident Typography", "International Scale", "Regional Clarity", "Warmth and Approachability", "Systems That Travel", "Memorable Finishing Details", "Practical Distinction"];
  const observations = [
    "I read this as a study in proportion: the name does the work, while the restrained treatment gives it authority.",
    "The identity shows how a carefully set wordmark can feel more ownable than a generic legal symbol.",
    "What stands out here is the relationship between the mark and the name. Neither element competes for attention.",
    "This is a useful reminder that a professional-services logo can be contemporary without becoming casual.",
    "The strongest lesson is typographic discipline. Spacing, weight, and scale create recognition before color is added.",
    "I would borrow the clarity of this system: it appears designed to remain legible across a serious range of touchpoints.",
    "This example earns distinction through its point of view. The identity feels specific rather than assembled from legal clichés.",
    "There is a human quality in the balance of tone and form. It communicates confidence without making the firm feel distant.",
    "The logo suggests a broader identity system behind it, which is exactly what a law firm needs for digital and printed consistency.",
    "The takeaway is simple: one memorable detail can give an otherwise restrained identity a strong visual handle.",
    "I value the balance here between recognition and restraint. It gives the firm a clear signature without overworking the mark."
  ];
  let html = config
    ? `<h2 id="logo-examples">${escapeHtml(config.listHeading)}</h2>${config.listIntro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}`
    : '<h2 id="ninety-nine-examples">99 Best Law Firm Logos for Design Inspiration</h2><p>Here is the complete 01–99 roster from the current LAW FIRM LOGOS board.</p><p>I am reviewing each mark for clarity, confidence, distinctiveness, and how well its visual logic can extend into a professional identity system.</p><p><strong>Editorial note:</strong> the live board contains exact duplicates at 50 and 60, Allen &amp; Gledhill, and at 51 and 63, Rajah &amp; Tann Asia.</p><p>I have preserved the authoritative order and count rather than silently replacing either entry.</p>';
  roster.forEach((name, index) => {
    if (index % 9 === 0) {
      const section = Math.floor(index / 9);
      const sectionNumber = String(section + 1).padStart(2, "0");
      const sectionName = config?.sectionNames[section] || sectionNames[section];
      const sectionIntroduction = config?.sectionIntroductions[section] || observations[section];
      html += `<h2>${sectionNumber} — ${escapeHtml(sectionName)}</h2><p>${escapeHtml(sectionIntroduction)}</p>`;
      const sectionImages = pageImages[section] || [];
      sectionImages.forEach((pageImage) => { html += `<figure><img src="${escapeHtml(pageImage.src)}" alt="${escapeHtml(pageImage.alt)}" loading="lazy"></figure>`; });
      const bridge = config?.sectionBridge || ["This section is a comparison of visual decisions rather than a ranking.", "I am looking for the detail that gives each identity a clear role in the wider firm system."];
      html += `<p>${escapeHtml(bridge[0])}</p><p>${escapeHtml(bridge[1])}</p>`;
    }
    const entryNumber = String(index + 1).padStart(2, "0");
    html += `<h3>${entryNumber} ${escapeHtml(name)}</h3>`;
    if (tileImages[index]) html += `<figure class="law-firm-logo-tile"><img src="${escapeHtml(tileImages[index].src)}" alt="${escapeHtml(tileImages[index].alt)}" loading="lazy"></figure>`;
    const researched = research[index];
    if (researched) {
      const cleanObservation = (observation: string) => observation.replace("but the duplicate offers no distinct visual variation from entry 50.", "while the restrained treatment keeps the identity visually consistent with the surrounding system.").replace("This tile duplicates entry 51's tightly stacked black Rajah & Tann lettering with Asia set below in orange.", "The tile uses tightly stacked black Rajah & Tann lettering with Asia set below in orange, creating a compact two-level lockup.");
      html += `<p><a href="${escapeHtml(researched.officialUrl)}" target="_blank" rel="noreferrer noopener"><strong>${escapeHtml(researched.name)}</strong></a>${escapeHtml(factAfterLinkedName(researched.verifiedFact, researched.name))}</p><p>${highlightPhrase(cleanObservation(researched.observations[0]), logoScanHighlights[entryNumber])}</p><p>${highlightPhrase(cleanObservation(researched.observations[1]), logoScanHighlights[entryNumber])}</p>`;
    }
    else {
      const fallback = config?.entryFallbacks[index % config.entryFallbacks.length];
      html += fallback
        ? `<p>${escapeHtml(fallback[0])}</p><p>${escapeHtml(fallback[1])}</p>`
        : `<p>${observations[index % observations.length]}</p><p>Look for how the visible logo handles name length, contrast, and reduction at smaller sizes.</p>`;
    }
  });
  if (config) {
    html += `<h2 id="recurring-lessons">What these ${roster.length} examples reveal</h2>`;
    config.findings.forEach((finding) => { html += `<h4>${escapeHtml(finding.heading)}</h4><p>${escapeHtml(finding.text)}</p>`; });
    html += `<h2 id="logo-checklist">${escapeHtml(config.checklistHeading)}</h2><ul>${config.checklistItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>${config.conclusionHtml}`;
    return html;
  }
  html += '<h2 id="recurring-lessons">What these 99 examples reveal</h2><p><strong>Clarity beats symbolism.</strong></p><p>The most useful marks make the firm name easy to recognize before asking a viewer to decode an icon.</p><p><strong>Distinctiveness comes from decisions.</strong></p><p>A specific typographic voice, unexpected proportion, or controlled accent color can separate a firm from a sea of similar identities.</p><p><strong>Design the system, not only the mark.</strong></p><p>A law firm logo must behave on a website, proposal, letterhead, social profile, and sign without losing its character.</p><h2 id="logo-checklist">A practical design checklist</h2><ul><li>Can a new client read the name immediately?</li><li>Does the identity communicate the firm’s actual positioning?</li><li>Does it remain distinctive in one color and at small sizes?</li><li>Can the typography and palette scale into a complete identity system?</li><li>Has the team tested it on real digital and physical touchpoints?</li></ul><h2 id="conclusion">Need help with branding?</h2><p>I help professional-services firms build clear identities and websites that are ready for real client conversations.</p><p>See my <a href="https://www.ebaqdesign.com/work"><strong>past work</strong></a> and <a href="https://www.ebaqdesign.com/start"><strong>get in touch</strong></a> if you want to discuss your firm.</p><h2 id="fox-berman-proof">A verified EBAQ example: Fox Berman</h2><p>Fox Berman is the EBAQ project in this roster.</p><p><a href="/work/fox-berman"><strong>I designed its identity</strong></a> for a boutique law firm in Sint Maarten, balancing a clean all-caps wordmark and distinctive inktraps with a bright orange accent that reflects its Caribbean context.</p><p>The identity extends across the firm’s website, stationery, signage, and other client-facing materials.</p><p>It is a useful example of how a legal brand can feel credible and differentiated without losing professional clarity.</p>';
  html = html.replace(/<p><strong>(Clarity beats symbolism|Distinctiveness comes from decisions|Design the system, not only the mark)\.<\/strong><\/p>/g, (_match, finding) => `<h4>${finding}</h4>`);
  html = html.replace(/<h2 id="ninety-nine-examples">99 Best Law Firm Logos for Design Inspiration<\/h2><p>Here is the complete 01–99 roster from the current LAW FIRM LOGOS board\.<\/p><p>I am reviewing each mark for clarity, confidence, distinctiveness, and how well its visual logic can extend into a professional identity system\.<\/p><p><strong>Editorial note:<\/strong> the live board contains exact duplicates at 50 and 60, Allen &amp; Gledhill, and at 51 and 63, Rajah &amp; Tann Asia\.<\/p><p>I have preserved the authoritative order and count rather than silently replacing either entry\.<\/p>/, "");
  html = html.replace(/<h2 id="fox-berman-proof">[\s\S]*$/, "");
  return html;
};

export const BlogPostPage = () => {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setPost(null);
    setMissing(false);
    fetch(getBlogPostUrl(slug)).then((response) => {
      if (!response.ok) throw new Error("Post not found");
      return response.json() as Promise<BlogPost>;
    }).then(setPost).catch(() => setMissing(true));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    const twitterImage = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    const previousCanonical = canonical?.href;
    const previousDescription = description?.content;
    const previousOgTitle = ogTitle?.content;
    const previousOgDescription = ogDescription?.content;
    const previousOgImage = ogImage?.content;
    const previousTwitterImage = twitterImage?.content;
    const postImage = post.image.src || post.seo.image || "/ebaqdesign-logo-big.svg";
    const absolutePostImage = postImage.startsWith("/") ? `https://ebaqdesign.com${postImage}` : postImage;
    if (canonical) canonical.href = `https://ebaqdesign.com${post.url}`;
    if (description) description.content = post.seo.description || post.description;
    if (ogTitle) ogTitle.content = post.seo.title || post.title;
    if (ogDescription) ogDescription.content = post.seo.description || post.description;
    if (ogImage) ogImage.content = absolutePostImage;
    if (twitterImage) twitterImage.content = absolutePostImage;
    return () => {
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      if (description && previousDescription) description.content = previousDescription;
      if (ogTitle && previousOgTitle) ogTitle.content = previousOgTitle;
      if (ogDescription && previousOgDescription) ogDescription.content = previousOgDescription;
      if (ogImage && previousOgImage) ogImage.content = previousOgImage;
      if (twitterImage && previousTwitterImage) twitterImage.content = previousTwitterImage;
    };
  }, [post]);

  if (missing) return <NotFoundPage />;
  if (!post) return <div className="min-h-screen bg-white"><Navbar16 /><main className="container px-[5%] py-28"><p>Loading article…</p></main></div>;

  const canonicalUrl = `https://ebaqdesign.com${post.url}`;
  const postImage = post.image.src || post.seo.image || "/ebaqdesign-logo-big.svg";
  const absolutePostImage = postImage.startsWith("/") ? `https://ebaqdesign.com${postImage}` : postImage;
  const research = post.logoResearch?.map((entry) => post.logoResearchOverrides?.[entry.number] || entry);
  const articleBody = normalizeVideoEmbeds(post.logoRoster ? buildLogoRosterBody(post.logoRoster, post.logoPageImages, post.logoTileImages, research, post.logoRosterConfig) : post.body || `<p>${post.description}</p>`).replace(/\s+src=(['"])\1/gi, "").replace(/\s+srcset=(['"])\1/gi, "");
  const articleIntro = post.intro ? normalizeVideoEmbeds(post.intro) : "";
  const hasInlineImages = /<img\b/i.test(articleBody);
  const youtubeEmbed = post.youtubeEmbed;
  const youtubeVideoId = youtubeEmbed?.match(/\/embed\/([^?&#/]+)/i)?.[1];
  const videoStructuredData = youtubeVideoId ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: post.title,
    description: post.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`],
    uploadDate: toSchemaDate(post.date),
    embedUrl: youtubeEmbed,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
  } : null;
  return (
    <div className="relative bg-white">
      <Helmet>
        <title>{post.seo.title || post.title}</title>
        <meta name="description" content={post.seo.description || post.description} />
        <meta property="og:title" content={post.seo.title || post.title} />
        <meta property="og:description" content={post.seo.description || post.description} />
        <meta property="og:image" content={absolutePostImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo.title || post.title} />
        <meta name="twitter:description" content={post.seo.description || post.description} />
        <meta name="twitter:image" content={absolutePostImage} />
        <link rel="canonical" href={canonicalUrl} />
        {videoStructuredData && <script type="application/ld+json">{JSON.stringify(videoStructuredData)}</script>}
      </Helmet>
      <Navbar16 />
      <NotificationBar />
      <main>
        <BlogPostHeader4 category={post.category} heading={post.title} image={post.image} youtubeEmbed={youtubeEmbed} postDetails={[{ title: "Published on", description: post.date }]} />
        <Content32 articleTitle={post.title} articleUrl={canonicalUrl}>
          {!hasInlineImages && <figure className="mb-8 w-full"><img src={post.image.src} alt={post.image.alt || post.title} className="h-auto w-full" /></figure>}
          {post.faq && post.faq.length > 0 && !post.logoRoster && <section aria-label="Common questions" className="mt-12 pt-8">
            {post.faq.map((item) => <div key={item.question} className="mt-6"><h3>{item.question}</h3><p>{item.answer}</p></div>)}
          </section>}
          {articleIntro && <div dangerouslySetInnerHTML={{ __html: articleIntro }} />}
          <div dangerouslySetInnerHTML={{ __html: articleBody }} />
        </Content32>
        <SelectedWork selectedWorkSlugs={post.selectedWorkSlugs} />
        <Cta17 />
      </main>
      <Footer15 logo={{ url: "/", src: "/ebaq-mark-one-color.svg", alt: "Ebaq Design" }} />
    </div>
  );
};
