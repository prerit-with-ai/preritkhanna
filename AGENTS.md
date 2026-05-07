# AGENTS.md

The working agreement for AI coding agents (Claude Code, Codex, Cursor, Aider, anything else) operating in this repo.

**Read first:** [VISION.md](./VISION.md) — the why. This doc is the how.

**Then read:** [ARCHITECTURE.md](./ARCHITECTURE.md) for the technical spine, [DESIGN.md](./DESIGN.md) for the visual system, [WORKFLOW.md](./WORKFLOW.md) for the operating loop, [PRD.md](./PRD.md) for the current phase's scope, [ROADMAP.md](./ROADMAP.md) for what's coming.

---

## What this is

`preritkhanna.com` — Prerit Khanna's personal site. A notebook with many modes (the *site* is the brand; sub-sections like *Fool's Errand* and *The Guild* have their own names). Astro + markdown content collections + Cloudflare Pages.

The site has 15 modes total, of which only some ship in v1. Empty modes are not shipped — see PRD.md for what's in scope right now.

---

## The non-negotiables

These are load-bearing. Don't break them.

1. **The spine is markdown + Zod.** Content lives in `src/content/<mode>/*.md`, validated by schemas in `src/content.config.ts`. Never store content elsewhere — no databases, no Notion, no JSON blobs, no admin panels.

2. **URLs are forever.** Once a piece is published, its URL never changes. If a piece is renamed, the old URL still works (redirect). Slugs are picked with permanence in mind.

3. **Schemas are gates.** Zod validation runs at build time. A malformed entry fails the build. This is a feature, not a bug. Schema migrations are deliberate events — update the schema and *every existing entry that uses it* in the same commit.

4. **Cross-cutting views are derived, never stored.** `/garden`, `/trying`, `/threads/[name]`, `/tags/[name]`, `/crossings`, `/post-mortems`, `/months/[YYYY-MM]`, `/years/[YYYY]` — all aggregated from existing data at build time. There is one source of truth per piece of data.

5. **Empty surfaces don't ship.** A path is created the day it gets its first real entry. Don't add routes for modes that have no content yet.

6. **Updates are append-only.** Errand `updates` arrays grow. Never edit a past update to revise history. If something was wrong, add a new update saying so.

7. **No CMS, ever.** Content authoring happens in a markdown editor + git. The repo is the database.

8. **Static by default.** Zero JS in the bundle for v1. When interactivity is added, it ships as a scoped Astro island — only the affected route gets JS.

---

## Architecture principles

Eight principles. Full versions in [ARCHITECTURE.md](./ARCHITECTURE.md). Summarized:

1. The data is the spine; the code is replaceable.
2. Static by default; JS as a scoped island.
3. Schemas are gates, not suggestions.
4. URLs are forever.
5. Dependency minimalism.
6. Composition, not abstraction.
7. Author ergonomics > developer cleverness.
8. Honest history.

The meta-principle that governs all eight: **simple wherever possible — without trading off.**

---

## Voice (for any user-facing copy)

The voice is **earnest, unembarrassed, allergic to performance.** The tonal palette is Naruto + Luffy + Da Vinci: relentless, ambitious, in motion, willing to look uncool because committed.

**Be funny about everything except the ambition. State the ambition straight.**

### Specifically:

- **Self-deprecating humor stays.** Comedy that's actually funny isn't performance — it's craft. Naruto is goofy. Luffy is a comic character. Lines that find the absurdity in your own situation are welcome.
- **Defensive self-deprecation goes.** No "lol I probably won't but…" before stating an ambition. No pre-lowering expectations. Naruto says he'll be Hokage *flatly*. Same energy here.
- **No LinkedIn voice.** No "thrilled to announce," no "humbled by," no "journey" framing, no growth-hacked headlines.
- **No "Day 47 of building in public."** Performance disguised as transparency.
- **No curated vulnerability.** If something honest is on the page, it's because there's signal — not because the silence felt empty.
- **Voice modulates by mode.** Dispatches punchier. Foundations denser. Quotes quieter (the line is the thing, not me). Errands closest to how Prerit actually talks. Essays most polished. Now fragmentary and intimate.

### Phrasing checks:

- ❌ "Just a humble guy trying to figure it out"
- ✅ "Trying to be many things at once — here's what those things are."

- ❌ "I'm super excited to share that I'm thinking about maybe possibly trying X"
- ✅ "I'm trying X."

- ❌ "I built [thing] in 7 days 🚀 here's what I learned 🧵 1/22"
- ✅ A page on `/errands` describing what was attempted, what worked, what didn't.

---

## Working with the human

These are durable preferences. Follow them across sessions.

1. **Just-in-time handoffs.** When the human needs to do something (create an account, paste an API key, register a domain, approve a destructive action, pick between options where you genuinely don't know their preference, anything outside your sandbox) — *stop at the moment that step becomes the next thing to do.* Ask clearly. Wait. Don't batch asks at the start. Don't surprise them after doing something on their behalf. Don't proceed with a placeholder hoping it'll be replaced.

2. **One ask at a time.** Each handoff is one specific question with the context they need to act on it.

3. **Be terse.** End-of-turn summaries are 1–2 sentences max. Skip the "I will now…" preambles. Just do the work, report what happened.

4. **Confirm before destructive actions.** Don't push, deploy, force-push, rename branches, drop tables, or run irreversible operations without explicit say-so. Approval once doesn't mean approval forever — re-confirm for each instance.

5. **Don't wave away friction with destructive shortcuts.** No `--no-verify`, no `git reset --hard` to escape an obstacle, no deleting unfamiliar files to "clean up." Investigate root causes.

6. **Match the voice in [VISION.md](./VISION.md) for any site copy.** Read the *Earnest, unembarrassed, allergic to performance* section before writing user-facing text.

7. **Block on user actions when they're needed.** Don't pretend you can complete a step that requires the human. Stop and ask.

---

## What NOT to do

- **Don't add libraries without asking.** Each dependency is a future maintenance tax. The dependency list should fit in a screenshot.
- **Don't add features beyond what the current task asks for.** No "while I'm here" cleanup. No premature abstractions. No preemptive helper files. No hypothetical-future-requirement designs.
- **Don't add error handling, fallbacks, or validation for scenarios that can't happen.** Trust internal code and framework guarantees. Validate at system boundaries (user input, external APIs) only.
- **Don't write comments that explain *what* the code does.** Identifiers should do that. Only comment when the *why* is non-obvious — a hidden constraint, a workaround for a specific bug, a subtle invariant.
- **Don't reference the current task in code comments.** No "added for the X flow," no "// removed Y," no "used by Z." Those belong in commit messages and PR descriptions.
- **Don't add backwards-compatibility shims for things that haven't shipped yet.** If we're changing something pre-launch, just change it.
- **Don't create planning/decision documents as artifacts mid-task.** Work from the conversation. The persistent docs (VISION, ARCHITECTURE, AGENTS, WORKFLOW, ROADMAP, PRD, README, CLAUDE) are the only ones unless explicitly asked.
- **Don't break the spine.** See non-negotiables above.
- **Don't ship empty modes.** A new section earns its launch by having real content.
- **Don't smuggle in a CMS as "infrastructure."** If a CMS is built, it's built as an errand, publicly, with the abandonment status available.
- **Don't optimize for traditional recruiter scan.** This site isn't for that audience.
- **Don't add comments that would rot.** Comments referencing line numbers, callers, or current PRs age badly.

---

## Conventions

### Filenames

- Errands: `src/content/errands/YYYY-MM-slug.md`
- Essays: `src/content/essays/YYYY-MM-slug.md`
- Foundations: `src/content/foundations/slug.md` (no date prefix — they're evergreen)
- Threads: `src/content/threads/slug.md` (one file per thread)
- Most other modes: see [ARCHITECTURE.md](./ARCHITECTURE.md).

### Frontmatter

- Dates as YAML dates (`2026-05-08`), not strings.
- Status fields use lowercase enums (e.g., `cooking`, not `Cooking`).
- Tags and threads as lowercase arrays (`tags: [web, polymath]`, `threads: [robotics, ai]`).
- Optional fields are omitted, not set to `null` or empty strings.

### Status enums

- Errands: `cooking | live | shipped | abandoned | paused`
- Essays: `draft | published`
- Bucketlist: `eyeing | doing | done | let-go`
- Learning: `reading | finished | paused | dnf`

### Component naming

Astro components are named for what they render. `ErrandCard.astro`, `ThreadHeader.astro`, `EntryMeta.astro`. No `Generic*`, no `Base*` (except the layout), no abstract names.

### CSS

- Plain CSS. No Tailwind, no CSS-in-JS, no framework.
- Custom properties on `:root` for theme tokens. Dark mode via `prefers-color-scheme`.
- Component-scoped styles in Astro `<style>` blocks. Global styles in `src/styles/global.css`.

---

## The forcing function commitments

These are designed in. Don't soften them without the human's say-so.

- `/garden` lists everything currently incomplete. Linked from the home page.
- `abandoned` is a public status with a one-paragraph "why I let it go" required.
- `let-go` is a public status on bucketlist items, equivalent.
- Annual reflection essays are non-negotiable rhythms (December every year).

---

## Recursive self-documentation

Every meaningful evolution of the site is itself an errand.

- v0 ship → already an errand
- v1 restructure → will be an errand when started
- v1.5, v2, etc. → each their own errand

The medium documents the medium. Don't break this pattern.

---

## When in doubt

Ask. The conversation is the planning surface; this doc is the working agreement; VISION.md is the why. If a question isn't answered by reading those three, it's a real question and worth raising explicitly.
