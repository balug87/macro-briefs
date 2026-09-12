import { CascadingImpacts } from "@/components/CascadingImpacts";
import { DomainSweep } from "@/components/DomainSweep";
import { Outlooks } from "@/components/Outlooks";
import { TopMovers } from "@/components/TopMovers";
import { allCascadingImpacts, formatBriefDate } from "@/lib/briefs";
import type { Brief } from "@/lib/types";

// Full Sunday drop: thesis, movers, nine-domain sweep, cascades, four-horizon outlook.
export function BriefView({ brief }: { brief: Brief }) {
  const timezone = brief.timezone || "Europe/Prague";
  const published = formatBriefDate(brief.published, timezone);

  return (
    <article>
      <p className="kicker">
        Weekly world monitor
        {brief.weekLabel ? ` · ${brief.weekLabel}` : ""}
        {` · ${timezone.replace("_", " ")}`}
      </p>
      <h1 className="headline">{brief.title}</h1>
      <p className="meta-line">
        Published {published} · Sunday 09:00 · Base case + key risks
      </p>
      <TopMovers movers={brief.topMovers} />
      <DomainSweep brief={brief} />
      <CascadingImpacts lines={allCascadingImpacts(brief)} />
      <Outlooks brief={brief} />
    </article>
  );
}
