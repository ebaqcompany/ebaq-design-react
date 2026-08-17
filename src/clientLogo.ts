export type ClientLogoScale = 50 | 56 | 60 | 70 | 72 | 80 | 81 | 85.5 | 90 | 95 | 99.75 | 105 | 110 | 120;

export const clientLogoClass = (scale?: ClientLogoScale) =>
  `client-logo${scale ? ` client-logo--${scale}` : ""}`;
