export type ClientLogoScale = 50 | 60 | 70 | 80 | 90 | 95 | 105 | 110 | 120;

export const clientLogoClass = (scale?: ClientLogoScale) =>
  `client-logo${scale ? ` client-logo--${scale}` : ""}`;
