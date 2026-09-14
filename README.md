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

Set `PUBLIC_PREVIEW=1` in `.env.local` to render briefs without a login while you inspect UI.

`AUTH_SECRET` has no fallback. Leave it blank and every `/api/auth/*` route returns 500 with
`MissingSecret` in the server log. Pages still work, so `PUBLIC_PREVIEW=1` remains the way to browse
locally without credentials.

## Access model

`requireBriefAccess()` in `lib/access.ts` gates `/`, `/briefs`, and `/briefs/[weekId]`. It fails
closed:

1. `PUBLIC_PREVIEW=1` — briefs are public. This is the only way to open the gate, and you must set it
   deliberately.
2. Missing `AUTH_GITHUB_ID` or `AUTH_GITHUB_SECRET` — redirect to `/login`. A half-propagated deploy
   denies access instead of publishing the archive.
3. No session — redirect to `/login`.

Before September 2026, `publicPreview` was `PUBLIC_PREVIEW === "1" || !authConfigured`, so dropping
one OAuth variable silently made every brief public. Do not reintroduce that fallback. If you add a
new gated route, call `requireBriefAccess()` rather than checking a session yourself.

The `signIn` callback in `lib/auth.ts` checks `profile.login` against `GITHUB_ALLOWLIST`, defaulting
to `balug87`.

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

Two environment facts that cost time to rediscover:

- Preview sets `PUBLIC_PREVIEW=1` and Production sets `0`. Preview deployments serve every brief
  publicly by design, so you cannot test the signed-in path there.
- `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_URL`, and `GITHUB_ALLOWLIST` are
  stored as Sensitive. `vercel env pull` returns `[SENSITIVE]` for each one, so you cannot run the
  real OAuth flow locally with the deployed credentials. Register a throwaway OAuth app against
  `http://localhost:3000/api/auth/callback/github` instead.

`AUTH_URL` points at the production domain, so sign-in from a preview URL bounces to production.
Verifying the GitHub round trip means either promoting to production or pointing a throwaway OAuth
app at localhost.

## Dependencies

`next-auth` is pinned to `5.0.0-beta.32`, the first release where a configuration error yields no
session instead of a truthy error object (GHSA-8fpg-xm3f-6cx3). Earlier betas let `!!auth` checks
pass for unauthenticated requests. It carries `@auth/core` 0.41.3.

`postcss` sits under an `overrides` entry. `next` pins it to exactly 8.4.31, which carries a path
traversal advisory, and an override is the only way to move it.

## Content

Each week is a JSON file: `content/briefs/YYYY-MM-DD.json`.

Required fields:

- `weekId`, `title` (the thesis), `published` (YYYY-MM-DD)
- `timezone` optional, defaults to `Europe/Prague`
- `topMovers`: 3–5 items with `magnitude`, `label`, `cause`, optional `tone` (`up` | `down` | `watch`) and `domain`
- `domains`: all nine keys (`energy`, `ai`, `war`, `food`, `transport`, `logistics`, `demographics`, `public_policy`, `natural_resources`) with `summary`, `cascadingImpacts`, optional `bullets`
- `outlooks`: `1m`, `6m`, `2y`, `5y` each with `base` and `risks` arrays (3–5 short bullets)

Copy `content/briefs/2026-09-07.json` (or `2026-09-13.json`) to start a new Sunday.

**Do not open a PR for the JSON.** Sunday drops commit straight to `main`. See [Sunday brief publish](#sunday-brief-publish-macro-research) below.

## Sunday brief publish (Macro Research)

Weekly JSON under `content/briefs/` is news/data, not code. Sunday publishes go **straight to `main`** (no PR). Vercel production redeploys from `main`; the live site is [https://macro-briefs.vercel.app](https://macro-briefs.vercel.app).

- Filename: `content/briefs/YYYY-MM-DD.json` where `YYYY-MM-DD` is the Sunday `weekId` (Europe/Prague). It must match the `weekId` field inside the JSON.
- Prefer a direct commit to `main` via the GitHub Contents API (`gh api`). Create the file with PUT; for updates, GET the file first for `sha`, then PUT with `sha`.
- Keep PRs for **app/code** changes only. Auto-merge for those PRs is already handled outside this repo.

Full commands (create + update) live in [`docs/PUBLISH.md`](docs/PUBLISH.md). Short create example:

```bash
PATH=content/briefs/YYYY-MM-DD.json
gh api --method PUT "repos/balug87/macro-briefs/contents/$PATH" \
  -f message="Brief: YYYY-MM-DD" \
  -f content="$(base64 -w0 edition.json)" \
  -f branch=main
```

## UI

Cream NASA Minimalist only. Tokens live in `app/globals.css`: `--bg`, `--ink`, `--grey` / `--grey-aa`, `--link`, `--focus-red`, `--focus-amber`, `--focus-teal`, `--font-display`, `--font-ui`. Accent color is used only on mover magnitudes.
