import type { TopMover } from "@/lib/types";

// 3–5 item grid. Number gets the only accent color on the page.
export function TopMovers({ movers }: { movers: TopMover[] }) {
  if (!movers.length) return null;

  return (
    <section aria-labelledby="movers-label">
      <h2 className="section-label" id="movers-label">
        Top movers
      </h2>
      <div className="movers">
        {movers.map((mover) => (
          <article
            className="mover"
            data-tone={mover.tone || "watch"}
            key={`${mover.label}-${mover.magnitude || "x"}`}
          >
            {mover.magnitude ? (
              <span className="mover-magnitude">{mover.magnitude}</span>
            ) : null}
            <span className="mover-label">{mover.label}</span>
            <p className="mover-cause">{mover.cause}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
