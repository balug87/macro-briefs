import fs from "node:fs";
import path from "node:path";
import {
  DOMAIN_IDS,
  HORIZON_IDS,
  type Brief,
  type DomainId,
  type DomainSection,
  type HorizonId,
  type Outlook,
  type TopMover
} from "@/lib/types";

// All Sunday drops live here as one JSON file per week.
const DIR = path.join(process.cwd(), "content", "briefs");

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

// Turn loose JSON into a typed Brief so a bad week file fails loudly.
function parseBrief(raw: unknown, fallbackWeekId: string): Brief {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const weekId = asString(data.weekId, fallbackWeekId);

  const topMovers: TopMover[] = Array.isArray(data.topMovers)
    ? data.topMovers.slice(0, 5).map((item) => {
        const mover = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
        const tone = mover.tone;
        return {
          magnitude: asString(mover.magnitude) || undefined,
          label: asString(mover.label, "Untitled mover"),
          cause: asString(mover.cause),
          tone: tone === "up" || tone === "down" || tone === "watch" ? tone : undefined,
          domain: DOMAIN_IDS.includes(mover.domain as DomainId)
            ? (mover.domain as DomainId)
            : undefined
        };
      })
    : [];

  const rawDomains =
    data.domains && typeof data.domains === "object"
      ? (data.domains as Record<string, unknown>)
      : {};

  const domains = {} as Record<DomainId, DomainSection>;
  for (const id of DOMAIN_IDS) {
    const block =
      rawDomains[id] && typeof rawDomains[id] === "object"
        ? (rawDomains[id] as Record<string, unknown>)
        : {};
    domains[id] = {
      summary: asString(block.summary),
      cascadingImpacts: asStringArray(block.cascadingImpacts),
      bullets: asStringArray(block.bullets)
    };
  }

  const rawOutlooks =
    data.outlooks && typeof data.outlooks === "object"
      ? (data.outlooks as Record<string, unknown>)
      : {};

  const outlooks = {} as Record<HorizonId, Outlook>;
  for (const id of HORIZON_IDS) {
    const block =
      rawOutlooks[id] && typeof rawOutlooks[id] === "object"
        ? (rawOutlooks[id] as Record<string, unknown>)
        : {};
    outlooks[id] = {
      base: asStringArray(block.base),
      risks: asStringArray(block.risks)
    };
  }

  return {
    weekId,
    title: asString(data.title, weekId),
    published: asString(data.published, weekId),
    timezone: asString(data.timezone) || undefined,
    weekLabel: asString(data.weekLabel) || undefined,
    topMovers,
    domains,
    outlooks,
    cascadingImpacts: asStringArray(data.cascadingImpacts)
  };
}

export function listBriefs(): Brief[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const weekId = file.replace(/\.json$/, "");
      const raw = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"));
      return parseBrief(raw, weekId);
    })
    .sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getBrief(weekId: string): Brief | null {
  const file = path.join(DIR, `${weekId}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return parseBrief(raw, weekId);
}

export function latestBrief(): Brief | null {
  return listBriefs()[0] ?? null;
}

// Format a YYYY-MM-DD (or ISO) date the way archive rows and mastheads show it.
export function formatBriefDate(iso: string, timezone = "Europe/Prague"): string {
  const hasTime = iso.includes("T");
  const date = new Date(hasTime ? iso : `${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timezone
  }).formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value;
  // Some ICU builds emit "Sept"; keep the 3-letter NASA-style month.
  const month = parts.find((part) => part.type === "month")?.value?.slice(0, 3);
  const year = parts.find((part) => part.type === "year")?.value;
  return `${day} ${month} ${year}`;
}

export function briefYear(brief: Brief): string {
  return brief.published.slice(0, 4);
}

// Archive tags: unique domains called out on the top movers, as ALL-CAPS labels.
export function briefDomainTags(brief: Brief): DomainId[] {
  const seen = new Set<DomainId>();
  for (const mover of brief.topMovers) {
    if (mover.domain) seen.add(mover.domain);
  }
  return [...seen];
}

// Flatten week-level + per-domain cascade lines for the compact A → B → C block.
export function allCascadingImpacts(brief: Brief): string[] {
  const lines = [...(brief.cascadingImpacts ?? [])];
  for (const id of DOMAIN_IDS) {
    for (const line of brief.domains[id].cascadingImpacts) {
      if (!lines.includes(line)) lines.push(line);
    }
  }
  return lines;
}
