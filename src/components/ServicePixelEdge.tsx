// Whole-cell steps share the homepage grid token and stay centered with it.
const steps = [1, 2, 1, 0, 1, 1, 2, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 2, 1, 0, 1, 2, 1, 0, 2, 1];
const pixelSteps = [...steps, ...steps, ...steps];
// One continuous silhouette avoids antialiased seams between adjacent blocks.
const edgePath = pixelSteps.reduce((path, height, column) => {
  const top = 2 - height;
  return `${path}${column === 0 ? `M0 ${top}` : ` V${top}`} H${column + 1}`;
}, "") + ` V3 H0 Z`;

export const ServicePixelEdge = () => (
  <svg aria-hidden="true" viewBox="0 0 81 2" preserveAspectRatio="none" className="service-pixel-edge pointer-events-none absolute bottom-0">
    <path d={edgePath} />
  </svg>
);
