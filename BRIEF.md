# Planet Brief — product brief

Reconstructed from the Macro Research Grok Bot thread, 11 Sep 2026.

## Job

Understand the macro situation on the planet. Weekly brief grounded in https://www.worldmonitor.app/dashboard.

## Cadence

Sunday 09:00. Routine: Weekly World Monitor macro brief.

## Domains

Energy, AI, war, food, transport, logistics, demographics, public policy, natural resources (stockpiles/ores, extraction, prices, mining tech).

Weight by movers. Touch every domain. Write cascading impacts.

## Horizons

1 month · 6 months · 2 years · 5 years. Base case + key risks.

## Product

- Name: Planet Brief
- Repo: balug87/macro-briefs
- Stack: Next.js + TypeScript
- Auth: Auth.js, GitHub OAuth, allowlist balug87
- Host: Vercel now; Railway later for workers/DB
- UI: NASA Minimalist cream (Designer contract — not dark navy chrome)
- IA v1: `/login` → `/` latest week → `/briefs` archive → `/briefs/[weekId]`
- Content: typed weekly JSON (movers, nine domains, four outlooks) — not a markdown blob
