// Figma 1061:525: preserve the 434×225 crop at (103,104) on the 1080px canvas.
// Native browser geometry adds the requested tab and red/yellow/green controls.
export const LogoDesignArtwork = () => (
  <div data-tone="light" role="img" aria-label="Savory favicon in a simplified cropped browser tab" className="bg-brand-grid relative aspect-[3/2] overflow-hidden">
    <div data-figma-browser="1061:645" className="absolute left-[9.537037%] top-[9.62963%] w-[40.185185%] overflow-hidden">
      <svg viewBox="0 0 434 225" width="434" height="225" aria-hidden="true" className="block h-auto w-full overflow-hidden">
        <defs>
          <clipPath id="savory-browser-corner"><rect width="579.2959" height="427.45166" rx="33" /></clipPath>
        </defs>
        <g clipPath="url(#savory-browser-corner)">
          <rect width="579.2959" height="427.45166" fill="#e5e5e5" />
          <rect x="219" y="15" width="300" height="210" rx="33" fill="#fff" />
          <rect y="168.72656" width="579.2959" height="258.7251" fill="#fff" />
          <circle cx="55.2622" cy="51.2723" r="20.4624" fill="#ff5f57" />
          <circle cx="111.1822" cy="51.2723" r="20.4624" fill="#febc2e" />
          <circle cx="167.1122" cy="51.2723" r="20.4624" fill="#28c840" />
          <image href="/images/services/logo-design/savory-favicon.png" x="258.5" y="51.27" width="135" height="135" />
        </g>
      </svg>
    </div>
  </div>
);
