// Fixed source viewport for EVERY website comparison, regardless of page length.
// Normalize each Figma page frame to this width, remove the shared top-edge inset, then clip at
// this height. Responsive display scales the whole viewport uniformly.
export const websiteComparisonViewport = { width: 1600, height: 1000, sourceTopInset: 3 } as const;
export const elevateWebsiteComparison = {
  client: "Elevate",
  before: "/images/services/web-comparisons/elevate/before-hero.svg",
  after: "/images/services/web-comparisons/elevate/after-hero.svg",
  figma: { fileKey: "fHgSBh8hMrNdljacW2ecBO", beforeNode: "387:2997", afterNode: "387:2489" },
};
