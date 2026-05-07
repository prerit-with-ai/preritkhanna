# WORKFLOW.md

How Prerit operates the site day-to-day. The operating manual for living with this thing.

For the *why*, see [VISION.md](./VISION.md). For the *what*, see [PRD.md](./PRD.md). For the *how it's built*, see [ARCHITECTURE.md](./ARCHITECTURE.md). For the *agent working agreement*, see [AGENTS.md](./AGENTS.md).

This doc is for Prerit, not for AI agents.

---

## The two workflows

Two kinds of work, two different tools:

| Work | Tool | Frequency |
|---|---|---|
| **Adding/editing content** (errands, essays, quotes, learning, threads, etc.) | A markdown editor + git | Daily-ish to weekly |
| **Evolving the site** (new modes, layout changes, schema additions, design polish) | Claude Code (or any coding agent) | Monthly-ish |

**Most of the time, you don't open Claude Code.** Most of the time, the site is just markdown files in your editor of choice. Claude Code shows up when you want to *change the site itself*.

---

## The editing setup

### Recommended: Obsidian + Obsidian Git

1. Install [Obsidian](https://obsidian.md). Open the repo folder as a vault.
2. Install the **Obsidian Git** community plugin. Configure it with your GitHub credentials.
3. Set up templates for the common content types (errand, essay, quote, etc.) — see *Templates* below.
4. That's it. Write in Obsidian. Hit the Obsidian Git "commit + push" button. Cloudflare deploys in ~60 seconds.

### Alternatives

- **iA Writer** — distraction-free; matches the freewrite vibe.
- **VS Code** — if you like the structure of an IDE.
- **Typora** — clean WYSIWYG markdown.
- **Plain text editor + terminal** — fine if you're already comfortable with git.

The site doesn't care which editor. It cares that the markdown ends up in `src/content/` and that `git push` happens.

### Mobile

Defer this question until you've actually tried writing from a phone three times and felt the pain. Options when you do:

- **GitHub mobile app** — edit markdown directly in the browser
- **Working Copy (iOS)** — real git client
- **Obsidian mobile + Obsidian Git** — fiddly but works

Most writing happens at a desk. Don't optimize for mobile speculatively.

---

## State transitions

Content moves between modes over time. These transitions are *moves you make*, not automatic.

```
Radar → Learning → Library
  (noticed)  (engaging)  (canon)

Bucketlist → Errand → Shipped/Abandoned
  (wanting)   (doing)   (done)

Commonplace → Principle
  (received)   (adopted)

Domain noticed → Tag → Thread
  (interest)    (used)  (named)

Errand → Post-mortem essay
  (abandoned)   (reflected)

Errand → Foundations writeup
  (built)        (distilled into a domain page)
```

Promoting an entry across modes is a real act. It says: *this thing earned its move.* Don't auto-promote; let things sit until you're sure.

---

## Cadences

The discipline that keeps the site alive.

| Cadence | Action |
|---|---|
| **Whenever something changes** | Update `/now`. Append to errand `updates`. Add to `/radar` if you noticed something. Add to `/commonplace` if a line hit. |
| **Weekly-ish (informal)** | Glance at `/garden` — anything stale? Anything to abandon honestly? Anything to push? |
| **Monthly (real ritual)** | Write the monthly reflection essay (just an essay tagged `monthly`). Review `/radar` — anything to graduate to `/learning` or cut? Review `/threads` — has any evolved meaningfully? |
| **Quarterly** | Update "If you're new" picks on the home page. Review `/bucketlist` — anything to let go? Maybe add a `/about` reversal entry if your thinking shifted. |
| **Annually (December)** | Write the annual reflection essay (tagged `annual`). Major review of `/threads` — which are still alive? Major review of `/about` — does it still describe me? Update `/library` with the year's canon additions. |

The discipline: **monthly is the smallest non-negotiable rhythm.** Everything else is on-change or on-occasion. Weekly cadences aren't enforced because they become treadmills. Annual ones are non-negotiable because they're the story anchors.

---

## Templates (Obsidian snippets)

Set these up once. Use forever.

### New errand

```markdown
---
title:
started: <% tp.date.now("YYYY-MM-DD") %>
status: cooking
tagline:
threads: []
tags: []
looking_for:
links: []
updates:
  - date: <% tp.date.now("YYYY-MM-DD") %>
    note: Started today.
---

[Pitch — what this is, why I'm doing it, what done looks like, broad approach.]
```

### New essay

```markdown
---
title:
date: <% tp.date.now("YYYY-MM-DD") %>
status: draft
dek:
threads: []
tags: []
---

[Body.]
```

### New thread

```markdown
---
title:
slug:
started: <% tp.date.now("YYYY-MM-DD") %>
status: active
related: []
---

[Why this thread pulls me. 2–5 paragraphs in voice.]
```

### New quote (commonplace)

```markdown
---
quote:
attribution:
source: book
source_context:
date_encountered: <% tp.date.now("YYYY-MM-DD") %>
threads: []
tags: []
---

[Optional one-line "why this lives here."]
```

### New principle

```markdown
---
text:
adopted: <% tp.date.now("YYYY-MM-DD") %>
source_origin:
threads: []
tags: []
---

[1–3 paragraphs explaining what this principle means in practice.]
```

### New radar entry

```markdown
---
name:
category:
noticed: <% tp.date.now("YYYY-MM-DD") %>
why:
source:
link:
threads: []
tags: []
---
```

### New learning entry

```markdown
---
title:
author:
format: book
started: <% tp.date.now("YYYY-MM-DD") %>
status: reading
take:
threads: []
tags: []
---

[Optional long-form marginalia.]
```

### New bucketlist (Quest)

```markdown
---
title:
started_wanting: <% tp.date.now("YYYY-MM-DD") %>
status: eyeing
threads: []
tags: []
note:
---
```

### New library entry

```markdown
---
title:
author:
added_to_canon: <% tp.date.now("YYYY-MM-DD") %>
threads: []
tags: []
why:
---
```

---

## Recipes

Concrete answers to "how do I do X?"

### How to use an errand

An errand is the **home base for a project.** One errand = one URL = one page that follows the project from start to its end-state.

**What goes in:**
- **Pitch** at the top (body): what this is, why, what done looks like, broad approach. ~200 words.
- **Build log** in `updates` array: dated, short paragraphs. *"Today tried X. Worked. Now blocked on Y."* Append-only.
- **Decisions, gotchas, findings** inline in updates. *"Chose Cloudflare over Vercel because of the future RAG endpoint."*
- **Links** in frontmatter: repo, demo, related artifacts.
- **Threads** in frontmatter: which domains this errand touches.
- **Looking-for** in frontmatter (optional): what help you'd want. Surfaces in The Guild's Crew Calls.
- **End-state reflection** appended to body when shipped/abandoned: what shipped, what surprised, or one paragraph "why I let it go."

**What does NOT go in:**
- Actual code → lives in a repo, linked via `links`
- Long-form synthesized thinking → becomes an essay tagged with the errand
- Field-defining insights → become a `/foundations` page (referenced from the errand)
- Quotes that hit during the project → `/commonplace`, tagged with the errand's threads
- Principles that crystallized → `/principles`
- Books read for it → `/learning`, with `for_errand` field

**Mental model:** the errand is the trunk. Other modes are branches that cross-link back via threads/tags.

### How to start a new errand

1. Decide the slug. Format: `YYYY-MM-slug`. Example: `2026-05-restructure-to-v1`.
2. Use the errand template (above) to scaffold the file in `src/content/errands/`.
3. Fill in title, tagline, threads. Optional: `looking_for` if you want collaborators.
4. Write the pitch in the body.
5. Commit + push.

### How to update an existing errand

1. Open the errand file.
2. Append to `updates`. **Don't delete or edit past updates** — history is append-only.
3. Optionally update `status` (e.g., `cooking` → `live`).
4. Commit + push. Use a commit message like "errand: progress on [slug]" so the git log reads cleanly.

### How to abandon an errand

1. Open the errand file.
2. Append a final update with the `abandoned` decision and a one-paragraph **why I let it go.** Be specific — what was the actual reason. *"Lost the energy" is not enough; "the dependency I was relying on got abandoned and the rewrite cost more than the project was worth" is.*
3. Set `status: abandoned`.
4. (Optional but encouraged) Write a separate post-mortem essay tagged `post-mortem` if there are real lessons. The essay can reference the errand.
5. Commit + push.

### How to add a quote to /commonplace

1. Use the quote template.
2. Fill in `quote`, `attribution`, `source` (book/talk/film/lyric/paper/conversation/overheard/other), optional `source_context` and `source_link`.
3. Add `threads` (which of your active threads does this touch?).
4. Optionally write a one-line "why this lives here" in the body.
5. Commit + push.

### How to promote a quote to a principle

When a quote has actually shaped how you act:
1. Create a new entry in `src/content/principles/`.
2. Use the principle template.
3. The `text` field is the principle in your words (you can tweak the original).
4. The `source_origin` field acknowledges the quote's origin (e.g., *"after Feynman"*).
5. Write 1–3 paragraphs in the body explaining what the principle means in practice.
6. Leave the original quote in `/commonplace` — it's still received material; the principle is the adopted version.

### How to add a thread

When a tag has appeared often enough that it's earned thread-status:
1. Create the thread file in `src/content/threads/<slug>.md`.
2. Use the thread template.
3. Write the "why this thread pulls me" body — 2–5 paragraphs in voice. *This is essential. A thread without a body is just a tag.*
4. Add `related` slugs of nearby threads.
5. Existing entries with that thread in their frontmatter automatically appear in the thread's aggregate.
6. Commit + push.

### How to add a thread to existing entries

Editing entries to add threads is fine — *threads are not history-claims*, they're domain-classifications. You can update them freely as your understanding shifts.

### How to write the monthly reflection

Once a month (last day of the month works, or first day of the next):
1. Look at `/garden` — what's still incomplete?
2. Look at the past month's commits — what shipped?
3. Look at `/radar` — what graduated, what stayed?
4. Read the previous month's reflection.
5. Write an essay. Tag it `monthly`. Date it the last day of the month.
6. Be honest. The reflection is not for performance — it's for synthesis.

### How to write the annual reflection

Same as monthly, but bigger. December. Real essay, not a checklist. Reads like an essay, not a year-in-review.

Tag it `annual`. Date it 2026-12-31 (or whenever in December you write it).

### How to update /now

Edit `src/content/now.md`. Update `last_updated` in frontmatter. Rewrite or edit the body. Commit + push.

`/now` doesn't preserve history — it's a snapshot. Old states live in git history but aren't surfaced.

### How to add an entry to /radar

Use the radar template. Fill the bare minimum — name, category, why, source. Don't agonize. Radar entries are *cheap*.

### How to graduate /radar → /learning

When you actually start engaging with a radar item:
1. Create the corresponding `/learning` entry.
2. Optionally delete the radar entry, or leave it in (the radar is the queue, not just the queue-to-do).

A reasonable rule: if you've started reading the book, the entry has graduated. The radar is for *not-yet-started*.

---

## When to open Claude Code

Most weeks: don't.

Open Claude Code (or any coding agent) when:
- You want to add a new mode that doesn't exist yet
- You want to change the home page layout
- You want to update the design (typography, color, spacing)
- You want to add a feature (RSS, librarian, sketches gallery)
- You want to migrate a schema
- You want to fix a bug in the build

Don't open Claude Code when:
- You're writing content (use the editor)
- You're updating an errand (use the editor)
- You're publishing an essay (use the editor)
- You're updating frontmatter (use the editor)

The site is not a code project most of the time. It's a notebook with a thin layer of code underneath.

---

## When something feels broken

1. Check the build log on Cloudflare Pages. Most errors are schema validation failures (you missed a required field).
2. If the build is fine but something looks wrong on the live site, hard-refresh (cache).
3. If the build is fine and the live site is fine but the *content* is wrong — fix the markdown file and push.
4. If the build is broken and the error message is unclear — open Claude Code, paste the error, ask.

---

## When something is stale

The retirement principle from VISION.md: *if a surface goes 12 months untouched, it's archived to a footer link with a note.*

This is part of using the site honestly. Don't pretend a dead section is alive. Move it to a footer link or, in extreme cases, remove it entirely (with a note in the colophon explaining what was there and why it was removed).

---

## The ritual of starting

When you sit down to write, the order is roughly:

1. Pull latest (in case anything was edited from another machine or device).
2. Open the editor.
3. Write.
4. Commit + push when done.

That's the whole thing. There is no "deploy step." There is no "build step." Cloudflare handles all of that. **Markdown editor + git for content. Claude Code (rarely) for the site.**

---

## When to read this doc again

- When you've been away for weeks and forgotten the loop
- When something doesn't feel right about the workflow and you want to remember why it's structured this way
- When you're considering a workflow change (and want to remember what the current one is before changing it)
- When you're handing the site off to someone else (or to a future you who's forgotten)
