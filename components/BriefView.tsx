import type { Brief } from "@/lib/briefs";
import { renderMarkdown } from "@/lib/briefs";

export function BriefView({ brief }: { brief: Brief }) {
  return (
    <article>
      <p className="kicker">Weekly world monitor · {brief.weekOf}</p>
      <h1 className="headline">{brief.title}</h1>
      {brief.lede ? <p className="lede">{brief.lede}</p> : null}
      <dl className="meta">
        <div>
          <dt>Published</dt>
          <dd>{brief.published}</dd>
        </div>
        <div>
          <dt>Horizons</dt>
          <dd>{brief.horizon}</dd>
        </div>
        <div>
          <dt>Frame</dt>
          <dd>Base case + key risks</dd>
        </div>
      </dl>
      {brief.movers.length ? (
        <div className="movers">
          {brief.movers.map((m) => (
            <span className="chip" key={m}>
              {m}
            </span>
          ))}
        </div>
      ) : null}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(brief.body) }}
      />
    </article>
  );
}
