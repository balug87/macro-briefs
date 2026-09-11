import fs from "node:fs";
import path from "node:path";

export type BriefMeta = {
  slug: string;
  title: string;
  weekOf: string;
  published: string;
  horizon: string;
  lede: string;
  movers: string[];
};

export type Brief = BriefMeta & {
  body: string;
};

const DIR = path.join(process.cwd(), "content", "briefs");

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; body: string } {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).replace(/^\s+/, "");
  const data: Record<string, string | string[]> = {};
  for (const line of fm.split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = val.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body };
}

export function listBriefs(): BriefMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data } = parseFrontmatter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: String(data.title || slug),
        weekOf: String(data.weekOf || slug),
        published: String(data.published || slug),
        horizon: String(data.horizon || "1m · 6m · 2y · 5y"),
        lede: String(data.lede || ""),
        movers: Array.isArray(data.movers) ? data.movers : []
      };
    })
    .sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getBrief(slug: string): Brief | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontmatter(raw);
  return {
    slug,
    title: String(data.title || slug),
    weekOf: String(data.weekOf || slug),
    published: String(data.published || slug),
    horizon: String(data.horizon || "1m · 6m · 2y · 5y"),
    lede: String(data.lede || ""),
    movers: Array.isArray(data.movers) ? data.movers : [],
    body
  };
}

export function latestBrief(): Brief | null {
  const first = listBriefs()[0];
  return first ? getBrief(first.slug) : null;
}

export function renderMarkdown(md: string): string {
  const escaped = md
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");

  const lines = escaped.split("\n");
  const out: string[] = [];
  let inList = false;
  let inTable = false;

  const flushList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  const flushTable = () => {
    if (inTable) {
      out.push("</tbody></table>");
      inTable = false;
    }
  };

  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(
        /\[([^\]]+)\]\((https?:[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
      );

  for (const line of lines) {
    if (line.startsWith("|")) {
      flushList();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) continue;
      if (!inTable) {
        out.push("<table><thead><tr>" + cells.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead><tbody>");
        inTable = true;
      } else {
        out.push("<tr>" + cells.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>");
      }
      continue;
    }
    flushTable();

    if (line.startsWith("### ")) {
      flushList();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      flushList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      flushList();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  flushList();
  flushTable();
  return out.join("\n");
}
