// Compact transmission lines. Middots stay in the source string; we do not draw a matrix.
export function CascadingImpacts({ lines }: { lines: string[] }) {
  if (!lines.length) return null;

  return (
    <section aria-labelledby="cascade-label">
      <h2 className="section-label" id="cascade-label">
        Cascading impacts
      </h2>
      <ul className="cascades">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}
