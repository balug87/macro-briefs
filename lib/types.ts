// Shared shapes for a weekly Planet Brief.
// Weeks live as JSON under content/briefs/ — not one freeform markdown blob.

// The nine domains every Sunday drop must touch.
export const DOMAIN_IDS = [
  "energy",
  "ai",
  "war",
  "food",
  "transport",
  "logistics",
  "demographics",
  "public_policy",
  "natural_resources"
] as const;

export type DomainId = (typeof DOMAIN_IDS)[number];

// How a top-mover number is colored (accent lives ONLY on magnitudes).
export type MoverTone = "up" | "down" | "watch";

export type TopMover = {
  // Big figure shown in the mover grid, e.g. "$110" or "7/13".
  magnitude?: string;
  // ALL-CAPS label under the number.
  label: string;
  // One cause line — keep it to a single sentence.
  cause: string;
  // up = teal, down = hero red, watch = amber.
  tone?: MoverTone;
  // Optional domain so the archive row can list grey ALL-CAPS tags.
  domain?: DomainId;
};

export type DomainSection = {
  // Short prose for this domain this week.
  summary: string;
  // Compact "A → B → C" lines that feed the cascading-impacts block.
  cascadingImpacts: string[];
  // Optional extra bullets under the summary.
  bullets?: string[];
};

// Four outlook horizons from the product brief.
export const HORIZON_IDS = ["1m", "6m", "2y", "5y"] as const;
export type HorizonId = (typeof HORIZON_IDS)[number];

export type Outlook = {
  // Base-case bullets (aim for 3–5 short lines).
  base: string[];
  // Key-risk bullets (aim for 3–5 short lines).
  risks: string[];
};

export type Brief = {
  // File stem and URL segment, e.g. "2026-09-07".
  weekId: string;
  // Thesis line — this is the page title and the archive row title.
  title: string;
  // ISO calendar date (YYYY-MM-DD). Displayed in Europe/Prague unless overridden.
  published: string;
  // IANA timezone. Defaults to Europe/Prague when omitted.
  timezone?: string;
  // Human week window, e.g. "7–13 Sep 2026".
  weekLabel?: string;
  // 3–5 items for the top-movers grid.
  topMovers: TopMover[];
  // One block per required domain.
  domains: Record<DomainId, DomainSection>;
  // Four equal outlook columns.
  outlooks: Record<HorizonId, Outlook>;
  // Optional week-level cascade lines (shown above per-domain lines).
  cascadingImpacts?: string[];
};

export const DOMAIN_LABELS: Record<DomainId, string> = {
  energy: "Energy",
  ai: "AI",
  war: "War",
  food: "Food",
  transport: "Transport",
  logistics: "Logistics",
  demographics: "Demographics",
  public_policy: "Public Policy",
  natural_resources: "Natural Resources"
};

export const HORIZON_LABELS: Record<HorizonId, string> = {
  "1m": "1 month",
  "6m": "6 months",
  "2y": "2 years",
  "5y": "5 years"
};
