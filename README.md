# Planet Brief

Weekly World Monitor macro brief. Git is memory.

Locked from the Macro Research thread of 11 Sep 2026:

- Sunday 09:00 drop (Europe/Prague)
- Domains: energy, AI, war, food, transport, logistics, demographics, public policy, natural resources
- Weight by movers, still touch every domain
- Horizons: 1 month · 6 months · 2 years · 5 years
- Voice: base case + key risks
- App: Next.js + TypeScript, Auth.js GitHub allowlist, NASA Minimalist cream, v1 = Latest + Archive
- Host: Vercel (Railway later if workers/DB)

## Screens

- `/login` — GitHub allowlist sign-in
- `/` — latest week
- `/briefs` — archive, grouped by year
- `/briefs/[weekId]` — one Sunday drop

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

With `PUBLIC_PREVIEW=1` (default when GitHub OAuth env is missing) the briefs render without login so you can inspect UI.

## GitHub OAuth (lock the gate)

1. GitHub → Settings → Developer settings → OAuth Apps
2. Callback: `https://YOUR-DEPLOY.vercel.app/api/auth/callback/github`
3. Vercel project env:

```
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_URL=https://YOUR-DEPLOY.vercel.app
GITHUB_ALLOWLIST=balug87
PUBLIC_PREVIEW=0
```

## Vercel

Import `balug87/macro-briefs`. Framework: Next.js. Set `PUBLIC_PREVIEW=1` for the first inspect pass.

## Content

Each week is a JSON file: `content/briefs/YYYY-MM-DD.json`.

Required fields:

- `weekId`, `title` (the thesis), `published` (YYYY-MM-DD)
- `timezone` optional, defaults to `Europe/Prague`
- `topMovers`: 3–5 items with `magnitude`, `label`, `cause`, optional `tone` (`up` | `down` | `watch`) and `domain`
- `domains`: all nine keys (`energy`, `ai`, `war`, `food`, `transport`, `logistics`, `demographics`, `public_policy`, `natural_resources`) with `summary`, `cascadingImpacts`, optional `bullets`
- `outlooks`: `1m`, `6m`, `2y`, `5y` each with `base` and `risks` arrays (3–5 short bullets)

Copy `content/briefs/2026-09-07.json` to start a new Sunday.

## UI

Cream NASA Minimalist only. Tokens live in `app/globals.css`: `--bg`, `--ink`, `--grey` / `--grey-aa`, `--link`, `--focus-red`, `--focus-amber`, `--focus-teal`, `--font-display`, `--font-ui`. Accent color is used only on mover magnitudes.
