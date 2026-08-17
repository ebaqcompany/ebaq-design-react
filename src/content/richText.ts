export const normalizeVideoEmbeds = (html: string) => html.replace(
  /<figure\b[^>]*\bw-richtext-figure-type-video\b[^>]*>/gi,
  (figure) => figure.replace(/\sstyle=(['"])(.*?)\1/i, (_match, quote: string, styles: string) => {
    const remainingStyles = styles.split(";").map((style) => style.trim()).filter((style) => style && !/^padding-bottom\s*:/i.test(style));
    return remainingStyles.length ? ` style=${quote}${remainingStyles.join("; ")}${quote}` : "";
  }),
);
