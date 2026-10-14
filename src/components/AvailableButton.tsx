// keepLabel: the navbar style outside the navbar, so the label stays visible on phones.
type Props = { availability?: string; className?: string; inverse?: boolean; nav?: boolean; pricing?: boolean; keepLabel?: boolean };

export const AvailableButton = ({ availability = "2 spots available", className = "", inverse = false, nav = false, pricing = false, keepLabel = false }: Props) => (
  <a href="/start" aria-label={nav && !keepLabel ? "Book a call" : undefined} className={`available-button${nav ? " available-button--nav" : ""}${keepLabel ? " available-button--keep-label" : ""}${pricing ? " available-button--pricing" : ""}${inverse ? " available-button--inverse" : ""} ${className}`.trim()}>
    <span className="available-button-mark">{!nav && !pricing && <img src="/ebaqdesign-logo-bold.svg" alt="" />}</span>
    <span className="available-button-label">
      <span className="block">Book a call</span>
      {pricing && <span className="block text-xs font-normal">{availability}</span>}
    </span>
  </a>
);
