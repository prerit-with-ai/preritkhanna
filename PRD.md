# PRD — preritkhanna.com (Fool's Errand)

## Vision

A public log + personal lab. The unit is the **errand**: a thing Prerit is trying, has tried, or has abandoned. Some serious, some absurd, some impossible. The site is a reflection of someone who is curious, ambitious, and willing to look stupid in pursuit of meaning.

The brand: **Fool's Errand** (also the working title of Prerit's autobiography: *Fool's Errand: Experiments on Life, People and Self*). Born April 1 — the Fool's Day tie-in is intentional.

## Audience

Not optimized for one. Built first as a record for self; public to enable serendipity (founders, collaborators, friends-of-friends). The right audience finds honest work over time.

Specifically **not** optimized for traditional recruiter scan. If that audience matters, they get a separate one-page resume; this site is not it.

## The unit: an errand

| Field | Required | Description |
|---|---|---|
| `title` | yes | The errand. Short. |
| `started` | yes | Date kicked off. |
| `status` | yes | `cooking` \| `live` \| `shipped` \| `abandoned` \| `paused` |
| `tagline` | yes | One sentence in Fool's Errand voice. |
| `tags` | no | For filtering / future visual variation. |
| `links` | no | `[{label, url}]` — repos, demos, write-ups. |
| `updates` | no | Append-only `[{date, note}]` — devlog. |
| body | no | Markdown; can be empty for early-stage errands. |

`updates` is load-bearing for the longer-term "people follow specific errands they care about" goal.

## v0 scope (ship today)

- [ ] Astro project scaffolded
- [ ] Content collection + schema (`src/content.config.ts`)
- [ ] Errand #1 written and rendering: *Ship v0 of preritkhanna.com*
- [ ] Homepage: list of errands, newest first, grouped subtly by status
- [ ] Individual errand page at `/errands/[slug]`
- [ ] Tasteful typography (serif + sans pairing), generous whitespace
- [ ] Light/dark mode (respects system preference)
- [ ] Mobile-friendly
- [ ] Deployed to Cloudflare Pages (`*.pages.dev` URL)
- [ ] Custom domain: deferred (preritkhanna.com to be registered separately and pointed at Pages)

## Out of scope for v0

- Balloon-pop interface
- 3D / Bruno Simon-style world
- RAG chatbot ("Ask Prerit")
- RSS / email subscription
- Comments / reactions
- Search
- Analytics
- OG image generator
- Per-errand subscribe ("notify me of updates to this errand")

These are **future errands**. Each becomes its own entry in the log when its time comes.

## Non-goals

- Not a traditional portfolio (no "Skills" / "Experience" / "Education" sections)
- Not a blog (essays exist as errand bodies if at all; the site isn't optimized for chronological reading)
- Not a CMS-backed product (content stays in markdown, in git, forever)

## Decisions deferred

- Domain: `preritkhanna.com` strongly preferred; not blocking ship
- Whether to add a `currently` shelf above the log (PRD assumes pure log for v0; can add later without migration)
- Color palette and exact typeface pairing — to be picked during build, can iterate post-launch
- Whether "Fool's Errand" is the on-page brand or just the working name

## Success for v0

The site exists at a public URL. Errand #1 is visible. Adding errand #2 takes <5 minutes. Nothing about the foundation makes future interfaces (balloons, 3D, chatbot) harder to add.
