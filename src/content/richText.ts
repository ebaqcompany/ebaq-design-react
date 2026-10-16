// A YouTube iframe loads about a megabyte of player code whether or not anyone presses play, so embeds
// start as their thumbnail (saved locally by scripts/localize-youtube-thumbnails.mjs) and a play button;
// main.tsx swaps in the real player on click.
export const youtubeFacade = (id: string, title = "") =>
  `<button type="button" class="youtube-facade" data-youtube-id="${id}" data-title="${title}" aria-label="${title ? `Play video: ${title}` : "Play video"}"><img src="/images/youtube/${id}.webp" alt="" width="960" height="540" loading="lazy" decoding="async"><span class="youtube-facade-play" aria-hidden="true"></span></button>`;

const youtubeIframe = /<iframe\b([^>]*)\bsrc=(["'])(?:https?:)?\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})[^"']*\2([^>]*)>\s*<\/iframe>/gi;

export const normalizeVideoEmbeds = (html: string) => html.replace(
  /<figure\b[^>]*\bw-richtext-figure-type-video\b[^>]*>/gi,
  (figure) => figure.replace(/\sstyle=(['"])(.*?)\1/i, (_match, quote: string, styles: string) => {
    const remainingStyles = styles.split(";").map((style) => style.trim()).filter((style) => style && !/^padding-bottom\s*:/i.test(style));
    return remainingStyles.length ? ` style=${quote}${remainingStyles.join("; ")}${quote}` : "";
  }),
).replace(youtubeIframe, (_iframe, before: string, _quote: string, id: string, after: string) => {
  // The title attribute is already HTML-escaped, so it is reused as is.
  const title = `${before} ${after}`.match(/\stitle=(["'])(.*?)\1/i)?.[2] ?? "";
  return youtubeFacade(id, title);
});
