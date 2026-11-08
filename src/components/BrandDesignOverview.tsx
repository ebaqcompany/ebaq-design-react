import { BrandDesignBenefits } from "./BrandDesignBenefits";
import { BrandDesignEngagement } from "./BrandDesignEngagement";
import { Layout350Preview, portfolio22Services } from "./Layout350Preview";

// Reuse the exact homepage media/interaction component, scoped to identity work.
const brandItems = portfolio22Services.filter(({ label }) => ["Logo Design", "Colors & Fonts", "Stationery", "Social", "More"].includes(label));

export const BrandDesignOverview = () => (
  <>
    <Layout350Preview id="brand-design-applications" idPrefix="brand-design-applications" items={brandItems} />
    <BrandDesignEngagement />
    <BrandDesignBenefits />
  </>
);
