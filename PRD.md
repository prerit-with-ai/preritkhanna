# PRD — preritkhanna.com

The current phase's product requirements. Rewritten when each phase ships.

For the long-arc *why*, see [VISION.md](./VISION.md). For phase headlines, see [ROADMAP.md](./ROADMAP.md).

---

## Current phase: v1 — *the shape catches up*

v0 shipped 2026-05-06: a single-section site with errand list at `/`. The site was framed entirely as Fool's Errand. After a planning pass, the right shape became clear: **preritkhanna.com is a notebook with many modes; Fool's Errand is one section.** v1 makes the structure match the vision.

---

## What v1 ships

Seven surfaces. The shape of the site at launch is small but *correctly shaped* — the architecture supports the full 15-mode vision; v1 just renders the most-active subset.

### v1 scope checklist

- [ ] **Restructure to multi-section site**
  - [ ] Errand list moves from `/` to `/errands`
  - [ ] Existing errand `/errands/2026-05-ship-v0/` URL preserved exactly (no breaking change)
  - [ ] New home page at `/` (notebook cover)
- [ ] **`/` — home page**
  - [ ] Name (large, serif, alone)
  - [ ] One-paragraph intro (names the polymath thing in voice; can name Naruto + Luffy + Da Vinci openly)
  - [ ] One-line "currently" (manually updated)
  - [ ] Modes listed (8–10 most-active; small, serif, dot-separated)
  - [ ] "If you're new" section (1–2 picks at launch; updates over time)
  - [ ] Optional bottom: a single line, quote, or sketch — voice over decoration
- [ ] **`/about`**
  - [ ] Origin essay (the bio/narrative — who, where from, what I'm trying to be)
  - [ ] Beliefs / principles in narrative form (a handful of crisp things I think)
  - [ ] Influences section (Naruto, Luffy, Da Vinci named explicitly + ~5 others with one paragraph each)
  - [ ] Reversals section (running list of "I changed my mind about X")
  - [ ] Acknowledgments section (real humans who saw something in me — short, with permission)
  - [ ] FAQ section (small; can be empty at launch)
  - [ ] Colophon (what the site is, why this form, what it's built with)
- [ ] **`/errands`**
  - [ ] Index page listing all errands, newest first, with status visible
  - [ ] Existing errand `/errands/2026-05-ship-v0/` migrated to new layout
  - [ ] Errand schema updated to support `threads`, `looking_for`, `tags` (additive — doesn't break existing entry)
- [ ] **`/essays`**
  - [ ] Index page
  - [ ] Schema defined per [ARCHITECTURE.md](./ARCHITECTURE.md)
  - [ ] **One real essay written and published.** No placeholder. The first essay forces voice calibration in real content, not just docs.
- [ ] **`/now`**
  - [ ] Single page reading from `src/content/now.md`
  - [ ] First snapshot written (current state, last-updated date)
- [ ] **`/guild`**
  - [ ] `/guild` landing — explains what The Guild is, links to sub-pages
  - [ ] `/guild/crew-calls` — auto-aggregated from `errands.looking_for` (empty at launch is fine)
  - [ ] `/guild/boons` — hand-written page listing what I offer (initial draft, can grow)
  - [ ] `/guild/conversations` — hand-written page listing open invitations to talk
  - [ ] How to find me (email, ideally something else low-friction)
- [ ] **`/threads`**
  - [ ] Index page listing all threads
  - [ ] Threads schema defined per [ARCHITECTURE.md](./ARCHITECTURE.md)
  - [ ] **Three thread pages written**, each with a real "why this pulls me" body (2–5 paragraphs). Threads are picked from domains with current activity.
  - [ ] Each thread page aggregates errands/essays tagged with that thread (will be sparse at launch — that's fine)
- [ ] **Voice updates applied across all new copy** per [VISION.md](./VISION.md) and [AGENTS.md](./AGENTS.md)
- [ ] **Build is clean** (`npm run build` passes with no errors or warnings)
- [ ] **Cloudflare deploys successfully** on push to `main`
- [ ] **All v0 URLs still resolve** (the existing errand URL specifically)

### Schema changes shipping in v1

- Errand schema: add `threads: string[] | undefined`, `looking_for: string | undefined`, `tags: string[] | undefined`
- New collections: `essays`, `threads`
- New single file: `src/content/now.md`

All schema changes are additive — no breaking changes to existing content. Existing errand entry is updated to include `threads` and `tags` fields.

### Content authored in v1

- 1 essay (real content, not lorem)
- 3 threads with real "why this pulls me" bodies
- 1 `/now` snapshot
- The full `/about` page across all sections
- `/guild/boons` initial draft
- `/guild/conversations` initial draft

This is several hours of *writing* on top of the build work. The writing is the bottleneck. Plan accordingly.

---

## Out of scope for v1

These are explicitly deferred to v1.5 and beyond. Don't smuggle them in.

- `/foundations`
- `/dispatches`
- `/library`
- `/learning`
- `/bucketlist`
- `/commonplace`
- `/principles`
- `/radar`
- Cross-cutting views: `/garden`, `/trying`, `/crossings`, `/post-mortems`, `/months`, `/years`, `/tags/[tag]`
- Tag surfaces (tags can be in frontmatter; tag pages don't render until v2)
- RSS feed
- Analytics
- Search
- The librarian (RAG)
- Sketches integration
- Custom CMS
- Audio
- Balloon UI / 3D nav

---

## Non-goals (for v1 and beyond)

These don't belong in any phase unless explicitly reconsidered:

- A traditional portfolio with Skills/Experience/Education sections
- A blog optimized for chronological reading
- A CMS-backed product (markdown-in-git is permanent)
- Newsletter funnels, growth metrics, follower-count UI
- Performance below the floor (sub-second first paint, system fonts, lazy images)
- Anything that breaks URL stability or schema honesty

---

## Success criteria for v1

The launch is successful if:

1. **Shape is right.** A stranger lands on the home page and immediately understands this is a *notebook*, not a portfolio or blog. The 7 surfaces are visible (or at least 5 of them, with 2 reachable via /about and /threads index).
2. **No URL regressions.** `/errands/2026-05-ship-v0/` still resolves.
3. **The first essay is real.** Not a placeholder. Voice is calibrated in actual content.
4. **Three threads have voice.** Reading the "why this pulls me" sections, the polymath orientation is clearly legible.
5. **The build is clean.** Zero errors. Zod validation passes for all entries. Astro type checking passes.
6. **The site builds to <50KB of JS.** (For v1: should still be 0KB. We have no JS yet.)
7. **The Guild has at least *Boons* and *Conversations* drafted**, even if Crew Calls auto-aggregates to an empty list at launch.
8. **`/about` is rich enough that someone reading it gets a real picture of Prerit.** Not a stub.

The launch is *unsuccessful* if:

- The site looks like a CMS-driven blog
- The voice still hedges ambition
- Any v0 URL breaks
- A single Zod validation fails
- Empty modes ship (e.g., `/essays` with no real essay, or `/threads` with placeholder threads)

---

## Decisions deferred during v1

- Custom domain `preritkhanna.com` activation — domain is registered; pointing it at Cloudflare Pages is its own step (and its own errand if needed).
- Whether the home page's "If you're new" picks are written at v1 launch or added when there's more to choose from. (Probably picked at launch, even if just one entry.)
- Final picks for the three v1 thread pages — depends on what Prerit is currently most active in.
- Whether `/guild` ships with a public email or a contact-form approach — probably just an email; resist over-engineering.

---

## Workflow during v1 build

This phase has two kinds of work:

1. **Code work** (restructure, new schemas, new pages, layouts, components) — done by an AI coding agent in a fresh session, reading the docs first.
2. **Writing work** (the essay, the three threads, the about page, the now snapshot, the guild copy) — done by Prerit, in the markdown editor of choice, pushed via git.

Code can be done first; writing follows. Or interleaved. Either works. The build only succeeds when *both* are complete.

---

## When v1 is done

- Update this PRD: replace this content with the v1.5 PRD (or whatever phase comes next).
- The v1 errand gets a `shipped` status and a final reflection.
- The "v1 — next" entry in [ROADMAP.md](./ROADMAP.md) moves to "v1 — shipped [date]."
- A new errand is created for the next phase if it's substantial (likely v1.5 is ongoing, not a single shipped event — so v1.5 might just be a series of small additions over weeks).
