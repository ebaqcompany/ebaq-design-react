import type { ComponentPropsWithoutRef } from "react";

/** Archived Figma selection motif. Retained for future exploration, not active UI. */
export const LegacyVectorCard = ({ children, className = "", ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={`vector-card bg-white p-6 ${className}`.trim()}>
    <div className="vector-card-handles" aria-hidden="true">
      <span className="vector-card-handle vector-card-handle-top-left" />
      <span className="vector-card-handle vector-card-handle-top-right" />
      <span className="vector-card-handle vector-card-handle-bottom-right" />
      <span className="vector-card-handle vector-card-handle-bottom-left" />
    </div>
    {children}
  </div>
);
