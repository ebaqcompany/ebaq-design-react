// keepLabel: the navbar style outside the navbar, so the label stays visible on phones.
type Props = { className?: string; inverse?: boolean; nav?: boolean; pricing?: boolean; keepLabel?: boolean; href?: string };

export const AvailableButton = ({ className = "", inverse = false, nav = false, pricing = false, keepLabel = false, href = "/start" }: Props) => (
  <a href={href} aria-label={nav && !keepLabel ? "Book a call" : undefined} className={`available-button${nav ? " available-button--nav" : ""}${keepLabel ? " available-button--keep-label" : ""}${pricing ? " available-button--pricing" : ""}${inverse ? " available-button--inverse" : ""} ${className}`.trim()}>
    <span className="available-button-mark">{!nav && !pricing && <img loading="eager" src="/ebaqdesign-logo-bold.svg" alt="" />}</span>
    <span className="available-button-label">
      <span className="block">Book a call</span>
    </span>
  </a>
);
