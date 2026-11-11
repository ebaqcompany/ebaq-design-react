type LogoApplicationsArtworkProps = {
  brand: string;
  symbol: string;
  wordmark: string;
  headerLockup?: string;
  alternateBoard?: string;
  lightSymbol?: boolean;
};

export const LogoApplicationsArtwork = ({ brand, symbol, wordmark, headerLockup, alternateBoard, lightSymbol = false }: LogoApplicationsArtworkProps) => (
  <div data-tone="light" role="img" aria-label={`${brand} logo applications: browser favicon, website header, and email signature`} className="bg-brand-grid relative aspect-square overflow-hidden">
    {/* Cropped browser corner: one empty tab and its favicon, without controls. */}
    <div data-application="favicon" className="absolute -left-[8%] top-[7%] h-[26%] w-[73%] -rotate-3 overflow-hidden rounded-xl border border-black/20 bg-surface-muted shadow-sm transition-transform duration-300 ease-out motion-safe:group-hover:rotate-0 motion-reduce:transition-none">
      <div className="absolute bottom-0 left-[17%] flex h-[80%] w-[75%] items-center rounded-t-xl border-x border-t border-black/20 bg-white pl-[18%]">
        <div className={`flex aspect-square w-[35%] items-center justify-center rounded p-[5%] ${lightSymbol ? "bg-black" : "bg-white"}`}>
          <img src={symbol} alt="" loading="lazy" decoding="async" draggable={false} className="h-auto w-full" />
        </div>
      </div>
    </div>
    {/* The website continues outside the artwork's right edge. */}
    <div data-application="header" className="absolute left-[22%] top-[33%] h-[33%] w-[91%] rotate-3 overflow-hidden rounded-xl border border-black/20 bg-white shadow-sm transition-transform duration-300 ease-out motion-safe:group-hover:rotate-0 motion-reduce:transition-none">
      {headerLockup ? <img src={headerLockup} alt="" width={1732} height={368} loading="lazy" decoding="async" draggable={false} className="absolute left-[8%] top-[28%] h-auto w-[75%]" /> : <div className="absolute left-[8%] top-[15%] aspect-video w-[52%] overflow-hidden rounded">
        <img src={alternateBoard} alt="" width={2500} height={1406} loading="lazy" decoding="async" draggable={false} className="absolute left-[-100%] top-0 h-auto w-[200%] min-w-[200%]" />
      </div>}
      <div aria-hidden="true" className="absolute bottom-[13%] left-[8%] h-px w-[86%] bg-black/20" />
    </div>
    {/* Minimal signature: text-line cues and an untagged wordmark. */}
    <div data-application="signature" className="absolute bottom-[7%] left-[7%] h-[25%] w-[76%] -rotate-3 overflow-hidden rounded-xl border border-black/20 bg-white shadow-sm transition-transform duration-300 ease-out motion-safe:group-hover:rotate-0 motion-reduce:transition-none">
      <div aria-hidden="true" className="absolute left-[8%] top-[20%] h-1 w-[28%] rounded bg-black/20" />
      <div aria-hidden="true" className="absolute left-[8%] top-[32%] h-1 w-[43%] rounded bg-black/10" />
      <img src={wordmark} alt="" loading="lazy" decoding="async" draggable={false} className="absolute bottom-[19%] left-[8%] h-auto w-[66%]" />
    </div>
  </div>
);
