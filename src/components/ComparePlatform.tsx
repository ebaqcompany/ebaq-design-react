import type { IconType } from "react-icons";
import { SiAstro, SiFramer, SiHubspot, SiNextdotjs, SiShopify, SiSquarespace, SiWebflow, SiWix, SiWordpress } from "react-icons/si";
import { platformFacts, type PlatformId } from "../data/comparisons";

// Platform marks for the comparison pages, drawn in the current text color.
export const platformIcons: Record<PlatformId, IconType> = {
  framer: SiFramer,
  webflow: SiWebflow,
  nextjs: SiNextdotjs,
  wordpress: SiWordpress,
  wix: SiWix,
  astro: SiAstro,
  hubspot: SiHubspot,
  shopify: SiShopify,
  squarespace: SiSquarespace,
};

// A platform's name always travels with its mark, mark on the left.
export const PlatformName = ({ platform }: { platform: PlatformId }) => {
  const Icon = platformIcons[platform];
  return <span className="inline-flex items-center gap-2"><Icon aria-hidden="true" className="size-[1em] flex-none" />{platformFacts[platform].name}</span>;
};

export const PlatformPair = ({ platforms: [first, second], className = "size-10" }: { platforms: readonly PlatformId[]; className?: string }) => {
  const First = platformIcons[first];
  const Second = platformIcons[second];
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <First className={className} />
      <span className="font-mono text-sm uppercase tracking-wide">vs</span>
      <Second className={className} />
    </div>
  );
};
