import { DomainToc } from "@/components/DomainToc";
import { DOMAIN_IDS, DOMAIN_LABELS, type Brief } from "@/lib/types";

// Every Sunday drop touches all nine domains.
// TOC wraps to two lines below 1024px; sticky left rail from 1024px.
export function DomainSweep({ brief }: { brief: Brief }) {
  return (
    <section aria-labelledby="sweep-label">
      <h2 className="section-label" id="sweep-label">
        Domain sweep
      </h2>
      <div className="sweep">
        <DomainToc />
        <div>
          {DOMAIN_IDS.map((id) => {
            const domain = brief.domains[id];
            return (
              <article className="domain" id={id} key={id}>
                <h2>{DOMAIN_LABELS[id]}</h2>
                <div className="prose">
                  {domain.summary ? <p>{domain.summary}</p> : <p>No print this week.</p>}
                  {domain.bullets && domain.bullets.length ? (
                    <ul>
                      {domain.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
