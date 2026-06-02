export type RedesignConcept = {
  slug: string;
  company: string;
  industry: string;
  industrySlug: string;
  style: string;
  styleSlug: string;
  tags: string[];
  beforeImage: string;
  afterImage: string;
  demoUrl: string;
  sourceUrl?: string;
  rationale: string;
  disclaimer: string;
  status: "draft" | "staged" | "published";
  createdAt: string;
};

export const redesignConcepts: RedesignConcept[] = [
  {
    slug: "prophet-security-glassmorphism-cybersecurity-hero",
    company: "Prophet Security",
    industry: "Cybersecurity / AI SOC",
    industrySlug: "cybersecurity-startup-web-design",
    style: "Glassmorphism",
    styleSlug: "glassmorphism-web-design",
    tags: ["cybersecurity", "ai-soc", "glassmorphism", "interactive-hero", "startup-redesign-lab"],
    beforeImage: "/startup-redesign-lab/prophet-security/before.png",
    afterImage: "/startup-redesign-lab/prophet-security/after.png",
    demoUrl: "https://ebaqcompany.github.io/prophet-security-hero-concept/",
    sourceUrl: "https://github.com/ebaqcompany/prophet-security-hero-concept",
    rationale:
      "Prophet sells speed, signal, and autonomy in the security operations category. The concept turns that promise into a focused AI command-center hero: dark glass surfaces, live threat particles, and motion that feels like a system actively triaging noise into action.",
    disclaimer:
      "Unofficial design concept created by Ebaq Design as part of the Startup Redesign Lab. Prophet Security did not commission, approve, or endorse this work.",
    status: "draft",
    createdAt: "2026-06-02",
  },
];

export const getConceptsByStyle = (styleSlug: string) =>
  redesignConcepts.filter((concept) => concept.styleSlug === styleSlug);

export const getConceptsByIndustry = (industrySlug: string) =>
  redesignConcepts.filter((concept) => concept.industrySlug === industrySlug);
