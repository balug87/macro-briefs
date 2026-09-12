"use client";

import { useEffect, useState } from "react";
import { DOMAIN_IDS, DOMAIN_LABELS } from "@/lib/types";

// Sticky domain list. Active state is bold ink + hairline — never a colored pill.
export function DomainToc() {
  const [active, setActive] = useState<string>(DOMAIN_IDS[0]);

  useEffect(() => {
    const nodes = DOMAIN_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node)
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.2, 0.45] }
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="toc" aria-label="Domain sweep">
      {DOMAIN_IDS.map((id) => (
        <a href={`#${id}`} data-active={active === id} key={id}>
          {DOMAIN_LABELS[id]}
        </a>
      ))}
    </nav>
  );
}
