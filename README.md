# Planet Brief

Weekly World Monitor macro brief. Git is memory.

Locked from the Macro Research thread of 11 Sep 2026:

- Sunday 09:00 drop
- Domains: energy, AI, war, food, transport, logistics, demographics, public policy, natural resources
- Weight by movers, still touch every domain
- Horizons: 1 month · 6 months · 2 years · 5 years
- Voice: base case + key risks
- App: Next.js + TypeScript, Auth.js GitHub allowlist, NASA Minimalist, v1 = Latest + Archive
- Host: Vercel (Railway later if workers/DB)

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

Add a week: `content/briefs/YYYY-MM-DD.md` with the frontmatter in the existing file.
