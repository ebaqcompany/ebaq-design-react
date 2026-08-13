type Props = { availability?: string; className?: string; nav?: boolean; pricing?: boolean };

export const AvailableButton = ({ availability = "2 spots available", className = "", nav = false, pricing = false }: Props) => (
  <a href="/start" className={`available-button${nav ? " available-button--nav" : ""}${pricing ? " available-button--pricing" : ""} ${className}`.trim()}>
    <span className="available-button-mark">{!nav && !pricing && <img src="/ebaqdesign-logo-bold.svg" alt="" />}</span>
    <span className="available-button-label">
      <span className="block">Reserve your spot</span>
      {pricing && <span className="block text-xs font-normal">{availability}</span>}
    </span>
  </a>
);
