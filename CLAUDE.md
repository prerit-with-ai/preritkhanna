# CLAUDE.md

Instructions for Claude (and Claude Code) working in this repo.

## What this is

`preritkhanna.com` — Prerit Khanna's personal site. Framed as **Fool's Errand**: a public log of attempts (some serious, some absurd, some abandoned). Each attempt is an "errand."

This is **not** a traditional portfolio or blog. It is a digital record + public lab. Voice is slightly self-deprecating, slightly ambitious, willing to be wrong out loud.

## The Spine (load-bearing — do not break)

The site's content lives in `src/content/errands/` as markdown files with YAML frontmatter, validated by a Zod schema in `src/content.config.ts`. Every interface (current list view, future balloon UI, future 3D world, future RAG chatbot) reads from this same content collection.

**Rule:** Never store errand content anywhere else. No databases, no Notion, no JSON blobs. One markdown file per errand. Git is the history.

If a feature requires changing the schema, update `src/content.config.ts`, update existing errand files to match, and update this doc. Schema migrations are a deliberate event, not a casual one.

## Stack

- **Astro** (content collections, file-based routing, static by default)
- **TypeScript** (strict)
- Plain CSS, no Tailwind unless we explicitly add it later
- No client-side framework yet. When we want interactivity (balloons, 3D, etc.), we'll add `@astrojs/react` and ship it as an island. Until then, zero JS in the bundle.

## Conventions

- Errand filenames: `YYYY-MM-slug.md` (e.g., `2026-05-ship-v0.md`)
- Status enum: `cooking` | `live` | `shipped` | `abandoned` | `paused`
- Tagline: one sentence, written in Fool's Errand voice
- Updates are append-only; never edit past entries to change history

## What NOT to do

- Don't add libraries without asking. The dependency list should stay small.
- Don't add features beyond what the current task asks for. No "while I'm here" cleanup, no premature abstractions, no preemptive helper files.
- Don't write comments that explain *what* the code does. Identifiers should do that. Only comment when the *why* is non-obvious (a hidden constraint, a workaround for a specific bug).
- Don't add backwards-compatibility shims, fallback values, or validation for things that can't happen.
- Don't create planning/decision docs as artifacts mid-task. Work from the conversation. The docs that exist (this one, PRD, ARCHITECTURE) are the only persistent docs unless explicitly asked.
- Don't break the spine. See above.

## Shipping discipline

The point of v0 is to exist on the internet. Resist scope creep. If a feature isn't in the v0 PRD, it's a future errand — write it down as a future errand and move on.

## Aesthetic targets

Closer to **darioamodei.com** (clean serif, generous whitespace, centered) with a hint of **farza.com** warmth. Not Bruno Simon. Not Notion. Not Bootstrap.

## Working with the human

- Be terse. End-of-turn summaries are 1-2 sentences max.
- Confirm before destructive actions. Don't push, deploy, or rename branches without explicit say-so.
- If a request feels like it would balloon scope, name the trade-off and ask.
