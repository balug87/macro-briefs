import { HORIZON_IDS, HORIZON_LABELS, type Brief } from "@/lib/types";

// Four equal columns on desktop (1m / 6m / 2y / 5y). Stack on small screens.
export function Outlooks({ brief }: { brief: Brief }) {
  return (
    <section aria-labelledby="outlook-label">
      <h2 className="section-label" id="outlook-label">
        Outlook — base case + key risks
      </h2>
      <div className="outlooks">
        {HORIZON_IDS.map((id) => {
          const outlook = brief.outlooks[id];
          return (
            <article className="outlook" key={id}>
              <h3>{HORIZON_LABELS[id]}</h3>
              {outlook.base.length ? (
                <>
                  <h4>Base</h4>
                  <ul>
                    {outlook.base.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {outlook.risks.length ? (
                <>
                  <h4>Risks</h4>
                  <ul>
                    {outlook.risks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
