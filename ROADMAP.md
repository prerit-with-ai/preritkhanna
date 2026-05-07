# ROADMAP.md

Phase headlines for preritkhanna.com. Detail lives in PRD.md (rewritten each phase). Future phases are sketched, not specified — they'll be wrong if we pre-plan them.

The principle: **plan one phase ahead. Sketch the rest.**

---

## v0 — shipped 2026-05-06

The minimum: errand list at `/`, errand pages, deployed to Cloudflare Pages. Recorded as errand #1 (*Ship v0 of preritkhanna.com*).

Status: ✅ shipped at [preritkhanna.pages.dev](https://preritkhanna.pages.dev/).

Surfaces live: `/`, `/errands/[slug]`.

---

## v1 — next

**The shape of the site catches up to the vision.** v0 was shaped like a single-section site; v1 is shaped like the notebook.

Restructure: home becomes the notebook cover, errands moves to `/errands`, plus six new surfaces. Voice is updated. The first essay is written. Three threads launch with their "why this pulls me" pages.

Surfaces shipping:
- `/` (new home, replaces errand list)
- `/about` (rich — origin, beliefs, principles in narrative, influences, reversals, acknowledgments, FAQ, colophon)
- `/errands` (existing entry moved, errand index added)
- `/essays` (with one essay)
- `/now` (initial snapshot)
- `/guild` (skeleton — Crew Calls auto-aggregating, Boons + Conversations as starter pages)
- `/threads` (3 thread pages with bodies; index page lists all)

Detailed scope, success criteria, and out-of-scope live in [PRD.md](./PRD.md). Recorded as its own errand (*Restructure to v1*).

---

## v1.5 — fill out the everyday modes

The modes that fill in over weeks once v1 is live and being used.

- `/radar` (The Radar) — start populating from the influences list and ongoing notice
- `/commonplace` (Commonplace) — quotes from others
- `/principles` (Operating Manual) — internalized rules
- `/library` (The Library) — canonical books
- `/learning` (Studies) — current input
- `/bucketlist` (Quests) — life aspirations

Each is a small content collection + a route. ~30–60 minutes per mode of build work, plus content. Ships when there's content for it (see *empty surfaces don't ship* in [VISION.md](./VISION.md)).

---

## v2 — the differentiated layer

The modes and views that make the site rare, not just functional.

- `/foundations` — first-principles distillations of fields
- `/dispatches` — short notes on the world
- `/garden` — visible-incomplete view (the forcing function activates)
- `/trying` — currently active across modes
- Tags surface across all modes (`/tags/[tag]`)
- `/crossings` and `/post-mortems` views (essays tagged accordingly)
- `last_updated` and `context` fields on essay/errand pages

This is where the site stops looking like every other personal site.

---

## v2.5 — the story layer

- `/months/[YYYY-MM]` — monthly reflection essays
- `/years/[YYYY]` — first annual reflection essay
- Year-1 review of the site itself
- Possibly: `/timeline` aggregate view, if it earns its place

The arc becomes navigable.

---

## v3+ — the ambitious layer

Things that earn their place by being clearly needed:

- **The Librarian** — RAG over the corpus. Returns quoted passages, not impersonation. Cloudflare Worker SSR.
- **Sketches as first-class content** — embedded everywhere, possibly a `/sketches` gallery.
- **Audio** — voice memos on now/errands when they say something type can't.
- **Custom CMS** — only if the markdown-editor + git workflow has *actually* hit pain. Built as an errand, in public, with the abandonment status available.
- **Balloon UI / 3D nav surface** — alternative entry points to the same content. Each is an island. Static deep-linking still works.

These don't have a planned date. Each becomes its own errand when it's ready to be one.

---

## What's deferred indefinitely (and why)

- **`/travels`** — until traveling is a real, sustained part of life
- **`/sketches`** as its own gallery — until enough sketches exist to gallery
- **`/timeline`** — RSS-in-HTML; might never be useful
- **`/responses` index** — entry-page Responses sections cover this for now
- **`/conversations` as separate route** — folded into `/commonplace` with `source: conversation`
- **`/kitchen` / `/sandbox`** — `cooking` status + `/garden` cover the function
- **RSS / email subscriptions** — re-evaluate when the site has enough volume to warrant
- **Search box** — tags + threads + small content set make it unnecessary until ~v2
- **Analytics** — privacy by default; revisit only if a specific question requires it

Things move out of this list when reality earns them in.

---

## The discipline

From [VISION.md](./VISION.md), restated here because it governs the roadmap:

1. The home page lists 8–10 surfaces, not 15. The most-active.
2. Empty surfaces don't exist.
3. Inactive surfaces (12 months untouched) get retired to a footer link.
4. Depth somewhere is the proof — across years, real depth must accumulate in several modes.
5. After v1 ships, no site work until at least three new entries are added across existing modes. Eat the dogfood.

---

## How phases turn into errands

Every phase is an errand. The errand carries the build log; PRD.md captures the *current* phase's scope.

When a phase ships:
1. PRD.md is rewritten as the next phase's PRD.
2. The shipped phase's errand is marked `shipped` with a final reflection.
3. ROADMAP.md may shift — what was v2 might become v1.5, what was v3 might become v2, based on what the work taught.

Plans go stale. Headlines stay useful. That's the bet.
