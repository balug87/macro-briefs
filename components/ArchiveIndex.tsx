import Link from "next/link";
import { briefDomainTags, briefYear, formatBriefDate } from "@/lib/briefs";
import { DOMAIN_LABELS, type Brief } from "@/lib/types";

// Year groups in Helvetica + hairline. Row = date · thesis · grey ALL-CAPS domain tags.
export function ArchiveIndex({ briefs }: { briefs: Brief[] }) {
  if (!briefs.length) {
    return <p className="empty">No briefs on file yet.</p>;
  }

  const byYear = new Map<string, Brief[]>();
  for (const brief of briefs) {
    const year = briefYear(brief);
    const list = byYear.get(year) ?? [];
    list.push(brief);
    byYear.set(year, list);
  }

  return (
    <>
      {[...byYear.entries()].map(([year, weeks]) => (
        <section className="year-block" key={year}>
          <h2 className="year-label">{year}</h2>
          <ul className="archive">
            {weeks.map((brief) => {
              const tags = briefDomainTags(brief).map((id) => DOMAIN_LABELS[id]);
              const timezone = brief.timezone || "Europe/Prague";
              return (
                <li key={brief.weekId}>
                  <Link href={`/briefs/${brief.weekId}`}>
                    <div className="archive-row">
                      <span className="archive-date">
                        {formatBriefDate(brief.published, timezone)}
                      </span>
                      <span className="archive-dot" aria-hidden="true">
                        ·
                      </span>
                      <span className="archive-thesis">{brief.title}</span>
                      {tags.length ? (
                        <>
                          <span className="archive-dot" aria-hidden="true">
                            ·
                          </span>
                          <span className="archive-tags">{tags.join("  ")}</span>
                        </>
                      ) : null}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
