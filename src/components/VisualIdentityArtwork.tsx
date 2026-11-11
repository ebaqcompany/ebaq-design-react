// A simple social-profile study using the Savory identity and existing project assets.
export const VisualIdentityArtwork = () => (
  <div data-tone="light" role="img" aria-label="Savory visual identity applied to a social profile and posts" className="bg-brand-grid relative aspect-[3/2] overflow-hidden">
    <div className="absolute left-[13%] top-[10%] w-[74%] overflow-hidden rounded-lg border border-black/15 bg-white">
      <div className="flex items-center gap-2 border-b border-black/10 px-[5%] py-[3%]">
        <img src="/images/services/logo-design/savory-favicon.png" alt="" className="w-[14%] rounded-full" />
        <div className="min-w-0 flex-1"><img src="/images/services/logo-design/savory-wordmark.svg" alt="" className="w-[42%]" /><div className="mt-1 h-1 w-[34%] rounded-full bg-black/15" /></div>
        <span aria-hidden="true" className="h-2 w-[14%] rounded-full bg-[#d64c32]" />
      </div>
      <div className="grid grid-cols-2 gap-1 p-1">
        <img src="/case-study/savory/14-tile-instagram.webp" alt="" className="aspect-square w-full object-cover" />
        <img src="/case-study/savory/15-tile-signature.webp" alt="" className="aspect-square w-full object-cover" />
      </div>
    </div>
  </div>
);
