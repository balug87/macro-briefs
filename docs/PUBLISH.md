# Sunday brief publish (Macro Research)

Weekly brief JSON under `content/briefs/*.json` is **news/data, not code**.

Sunday publishes go **straight to `main`**. Do **not** open a pull request for a brief file. Vercel production redeploys from `main`, so a direct commit is what puts the week live on [https://macro-briefs.vercel.app](https://macro-briefs.vercel.app).

Keep pull requests for **app/code changes** only. Auto-merge for those PRs is handled outside this repo (Coder’s routine). This repo does not need a GitHub Action for auto-merge.

There is no publish workflow here on purpose. Pasting a whole brief into a `workflow_dispatch` input hits size limits. Use the GitHub Contents API (`gh api`) instead.

## Filename and weekId

| Piece | Rule |
| --- | --- |
| Path | `content/briefs/YYYY-MM-DD.json` |
| `YYYY-MM-DD` | The **Sunday** `weekId` in `Europe/Prague` |
| JSON `weekId` | Must match the filename date |

Example: week of Sunday 13 Sep 2026 → `content/briefs/2026-09-13.json` with `"weekId": "2026-09-13"`.

Copy an existing file (`content/briefs/2026-09-07.json` or `content/briefs/2026-09-13.json`) when starting a new week. Required fields: `weekId`, `title`, `published`, `timezone`, `weekLabel`, `topMovers`, `domains`, `outlooks`, `cascadingImpacts`.

Do not delete existing briefs.

## Create a new brief on `main`

You need `gh` logged in with permission to write files to `balug87/macro-briefs`. Put the finished JSON in a local file first (here: `edition.json`).

```bash
# PATH is the file on GitHub. YYYY-MM-DD is that Sunday’s weekId.
PATH=content/briefs/YYYY-MM-DD.json

# PUT creates the file on main. content must be base64 (GitHub’s rule).
# -w0 = one line, no wrapping (GNU/Linux). See macOS note below.
gh api --method PUT "repos/balug87/macro-briefs/contents/$PATH" \
  -f message="Brief: YYYY-MM-DD" \
  -f content="$(base64 -w0 edition.json)" \
  -f branch=main
```

Replace `YYYY-MM-DD` in both `PATH` and the commit message with the real Sunday date.

On macOS, `base64 -w0` is not available. Use:

```bash
-f content="$(base64 < edition.json | tr -d '\n')"
```

## Update an existing brief on `main`

GitHub will reject a PUT over an existing file unless you send the current `sha`.

```bash
PATH=content/briefs/YYYY-MM-DD.json

# GET the file metadata from main and keep only the blob sha.
SHA=$(gh api "repos/balug87/macro-briefs/contents/$PATH?ref=main" --jq .sha)

# PUT again, this time with sha, so GitHub knows which version you are replacing.
gh api --method PUT "repos/balug87/macro-briefs/contents/$PATH" \
  -f message="Brief: YYYY-MM-DD" \
  -f content="$(base64 -w0 edition.json)" \
  -f branch=main \
  -f sha="$SHA"
```

## After the commit

1. Confirm the file exists on `main`: `https://github.com/balug87/macro-briefs/blob/main/content/briefs/YYYY-MM-DD.json`
2. Wait for the Vercel production deploy from `main`.
3. Open [https://macro-briefs.vercel.app](https://macro-briefs.vercel.app) — latest week is `/`, archive is `/briefs`.

## Do not

- Do not open a PR for `content/briefs/*.json`.
- Do not put the brief on a feature branch and wait for review. The drop is Sunday 09:00 Europe/Prague; `main` is the publish path.
- Do not add a workflow that takes the whole JSON as a string input.

App, auth, and UI changes still use a normal PR against `main`.
