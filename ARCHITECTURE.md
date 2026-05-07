# ARCHITECTURE.md

The technical spine of preritkhanna.com. For the *why*, see [VISION.md](./VISION.md). For the working agreement, see [AGENTS.md](./AGENTS.md).

---

## Meta-principle

> **Simple wherever possible — without trading off.**

No CMS, no over-engineering, no premature abstractions, no dependencies for convenience. But no shortcuts on what actually matters: the spine, URL stability, schema honesty, typography, performance, accessibility.

---

## The eight principles

### 1. The data is the spine; the code is replaceable

Markdown files in `src/content/` validated by Zod schemas. That's the contract. Astro components, layouts, styles are presentation and can be swapped without losing content. If we leave Astro in 2030, the markdown migrates to whatever's next without rewriting.

**Implication:** Cross-cutting views (`/garden`, `/trying`, `/threads/[name]`, `/tags/[tag]`) are *derived* at build time, never stored. One source of truth per piece of data.

### 2. Static by default; JS as a scoped island

Zero JS in the bundle for v1. Interactivity arrives later as Astro islands — only the affected route ships JS. The librarian (RAG), balloon UI, 3D mode each become one island.

**Implication:** Performance is a *floor*: sub-second first paint, system fonts (no web font loading), lazy images, `prefers-color-scheme` and `prefers-reduced-motion` respected.

### 3. Schemas are gates, not suggestions

Zod validation runs at build time. A malformed entry fails the build. Silent content drift is impossible.

**Implication:** Schema migrations are deliberate events — update the schema *and* every existing entry that uses it in the same commit, or the build breaks.

### 4. URLs are forever

Once published, never changes. Slugs are picked with permanence in mind. Renames preserve old URLs via redirects.

**Implication:** No date-prefix URLs that lock in chronology. No category-prefix URLs that break if categorization shifts. Just `/errands/[slug]`, `/essays/[slug]`, etc.

### 5. Dependency minimalism

Astro + plain CSS + nothing else for v1. Each dependency is a future maintenance tax.

**Implication:** No Tailwind, no CSS-in-JS, no UI libraries, no `date-fns`, no `lodash`. The lock file should fit in a screenshot. Add a dep only when the alternative (writing it ourselves) is *significantly* worse.

### 6. Composition, not abstraction

Small Astro components doing one thing each, named for what they render. **No "modes framework."** No `<GenericContentList renderer={...} />`.

**Implication:** Adding a new mode is ~2 files (a content schema entry + a route directory), not a refactor. Three similar components is fine; we DRY only when duplication has actually become painful.

### 7. Author ergonomics > developer cleverness

The author's path (markdown editor → git push) is the optimized one. Writing into the site never requires touching code. Frontmatter shape is consistent across modes.

**Implication:** Schemas resist getting baroque. New required fields are a serious decision. Optional fields are preferred for additions.

### 8. Honest history

Git is the audit log. Errand `updates` are append-only. Substantively edited essays show a "last updated" date. The site doesn't lie about its past.

**Implication:** Renames keep old URLs (principle 4). Schema migrations leave audit trails in commits. Abandoned errands keep their abandonment notes — failure is part of the record.

---

## The spine

Errand content (and every other mode's content) lives as markdown files in `src/content/<mode>/`, validated against Zod schemas in `src/content.config.ts`. Every UI — current and future — reads from these collections.

```
src/content/
  config.ts                          # Zod schemas (the gate)
  errands/
    2026-05-ship-v0.md
    ...
  essays/
  foundations/
  dispatches/
  library/
  learning/
  bucketlist/
  commonplace/
  principles/
  radar/
  threads/
  now.md                             # single file (one current state)
```

A file that violates its schema fails the build. That's the point.

---

## Project layout

```
preritkhanna/
├── src/
│   ├── content/                     ← the spine
│   │   ├── config.ts                ← Zod schemas
│   │   └── <mode>/                  ← one folder per content collection
│   ├── layouts/
│   │   └── Base.astro
│   ├── components/                  ← small, single-purpose
│   │   ├── ErrandCard.astro
│   │   ├── EssayCard.astro
│   │   ├── ThreadHeader.astro
│   │   ├── EntryMeta.astro
│   │   └── ...
│   ├── pages/                       ← file-based routes
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── now.astro
│   │   ├── errands/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── essays/
│   │   ├── threads/
│   │   ├── guild/
│   │   │   ├── index.astro
│   │   │   ├── crew-calls.astro     ← auto-aggregated
│   │   │   ├── boons.astro
│   │   │   └── conversations.astro
│   │   ├── garden.astro             ← auto-aggregated view
│   │   ├── trying.astro             ← auto-aggregated view
│   │   └── tags/[tag].astro
│   ├── styles/
│   │   └── global.css               ← CSS variables, base typography, dark mode
│   └── lib/                         ← tiny shared utilities, only when warranted
├── public/                          ← favicon, og image, raw assets
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── AGENTS.md
├── ARCHITECTURE.md
├── CLAUDE.md
├── PRD.md
├── README.md
├── ROADMAP.md
├── VISION.md
└── WORKFLOW.md
```

---

## Schemas

The full set of content collection schemas. Subject to expansion as modes ship.

### Errands

```ts
const errands = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/errands' }),
  schema: z.object({
    title: z.string(),
    started: z.date(),
    status: z.enum(['cooking', 'live', 'shipped', 'abandoned', 'paused']),
    tagline: z.string(),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    looking_for: z.string().optional(),       // surfaces in The Guild's Crew Calls
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).optional(),
    updates: z.array(z.object({
      date: z.date(),
      note: z.string(),
    })).optional(),
  }),
});
```

### Essays

```ts
const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),                            // first publish date
    last_updated: z.date().optional(),
    status: z.enum(['draft', 'published']),
    dek: z.string().optional(),                // one-line summary for indexes
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),      // includes 'crossings', 'post-mortem', 'monthly', 'annual' as cross-cutting tags
  }),
});
```

### Foundations

```ts
const foundations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/foundations' }),
  schema: z.object({
    title: z.string(),
    started: z.date(),
    last_updated: z.date().optional(),
    status: z.enum(['cooking', 'living']),     // foundations are evergreen, not 'shipped'
    dek: z.string(),
    threads: z.array(z.string()),              // foundations always belong to threads
    tags: z.array(z.string()).optional(),
  }),
});
```

### Threads

```ts
const threads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/threads' }),
  schema: z.object({
    title: z.string(),                         // e.g., "Robotics", "Quantum"
    slug: z.string(),                          // URL slug, e.g., "robotics"
    started: z.date(),
    status: z.enum(['active', 'dormant', 'closed']),
    related: z.array(z.string()).optional(),  // slugs of related threads
  }),
});
```

The body is the "why this thread pulls me" essay. Aggregations (errands, essays, etc., tagged with this thread) are computed at build time on the thread's page.

### Bucketlist (Quests)

```ts
const bucketlist = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bucketlist' }),
  schema: z.object({
    title: z.string(),
    started_wanting: z.date(),
    status: z.enum(['eyeing', 'doing', 'done', 'let-go']),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    note: z.string().optional(),               // one-paragraph "why I want this"
  }),
});
```

### Commonplace (Quotes)

```ts
const commonplace = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/commonplace' }),
  schema: z.object({
    quote: z.string(),
    attribution: z.string(),
    source: z.enum(['book', 'talk', 'film', 'lyric', 'paper', 'conversation', 'overheard', 'other']),
    source_context: z.string().optional(),     // e.g., "Surely You're Joking, Mr. Feynman"
    source_link: z.string().url().optional(),
    date_encountered: z.date(),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    note: z.string().optional(),               // one-line "why this lives here"
  }),
});
```

### Principles (Operating Manual)

```ts
const principles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/principles' }),
  schema: z.object({
    text: z.string(),                          // the principle itself, one phrase
    adopted: z.date(),                         // when this became real for me
    source_origin: z.string().optional(),      // "after Feynman" or "tweaked from a quote"
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});
```

The body explains the principle in 1–3 paragraphs.

### Radar

```ts
const radar = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/radar' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['person', 'book', 'topic', 'company', 'tool', 'place', 'paper', 'film', 'other']),
    noticed: z.date(),
    why: z.string().optional(),                // one line
    source: z.string().optional(),             // who told me / where I saw it
    link: z.string().url().optional(),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});
```

### Library

```ts
const library = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/library' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    added_to_canon: z.date(),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    why: z.string(),                           // one paragraph — required for canon
  }),
});
```

### Learning (Studies)

```ts
const learning = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learning' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    format: z.enum(['book', 'paper', 'course', 'podcast', 'video', 'article', 'other']),
    started: z.date(),
    finished: z.date().optional(),
    status: z.enum(['reading', 'finished', 'paused', 'dnf']),
    take: z.string(),                          // one-line take, required
    for_errand: z.string().optional(),         // if this reading was for a specific errand
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});
```

The body is optional long-form marginalia.

### Dispatches

```ts
const dispatches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dispatches' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});
```

Dispatches are short — 1–3 paragraphs typically.

### Now

`src/content/now.md` is a single file (not a collection — there's only one current state).

```yaml
---
last_updated: 2026-05-08
---

[Markdown body — short. What I'm building, reading, thinking about, where I am.]
```

---

## Cross-cutting views

These are routes that aggregate from existing data. No new schemas.

| Route | Source | Filter |
|---|---|---|
| `/garden` | All collections | Anything in a "not yet shipped" state: `cooking`/`paused` errands, `draft` essays, `eyeing` bucketlist, etc. |
| `/trying` | All collections | Anything actively in motion: `cooking`/`live` errands, `reading` learning, `doing` bucketlist. |
| `/crossings` | Essays | Tagged `crossings`. |
| `/post-mortems` | Essays | Tagged `post-mortem`. |
| `/months/[YYYY-MM]` | Essays | Tagged `monthly`, dated in that month. |
| `/years/[YYYY]` | Essays | Tagged `annual`, dated in that year. |
| `/tags/[tag]` | All collections | Anything with that tag in `tags`. |
| `/threads/[slug]` | Threads collection + all collections | The thread's hand-written body + everything across collections with that slug in `threads`. |
| `/guild/crew-calls` | Errands | Anything with `looking_for` populated and status `cooking` or `live`. |

---

## How future interfaces plug in

| Interface | How it slots in |
|---|---|
| Balloon-pop view | New page (e.g., `/balloons.astro` or replace home for an opt-in). React island via `@astrojs/react`. Renders the same `errands` collection. |
| 3D / Bruno-style world | React + three.js component, `client:only="react"`, full-screen. Static `/errands/[slug]` pages remain for deep-linking. |
| RAG librarian ("Ask Prerit") | One route flips to SSR (Cloudflare Worker). Embeddings built from the same markdown files. Returns *quoted passages*, not impersonation. |
| RSS / email | `/rss.xml` generated at build time from selected collections. Per-errand subscriptions need a backend; deferred. |

Every one of these reads the same `src/content/` folder. The spine is the unifier.

---

## Build & deploy

- `npm run build` → static `dist/`
- Host: **Cloudflare Pages**. Free tier, global CDN, generous limits, clean upgrade path to Workers when SSR is needed.
- CI: GitHub push → Cloudflare Pages build → live in ~60 seconds.
- Node version: pinned to 22.12 via `NODE_VERSION` environment variable in Cloudflare Pages settings.

---

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-05-05 | Astro over Next.js / raw Vite | Content-first, islands model, framework-agnostic, doesn't punish future 3D ambition. |
| 2026-05-05 | Markdown + Zod over CMS / DB | Spine must outlive every UI. Git is history. AI-editable. Zero lock-in. |
| 2026-05-05 | List UI for v0, balloons/3D deferred | Ship today. Future interfaces read the same spine. |
| 2026-05-05 | Domain: `preritkhanna.com` (deferred), brand: site = name only | Identity outlives any single brand experiment. |
| 2026-05-06 | Host: Cloudflare Pages | Free, fast global CDN, clean upgrade path to Workers when SSR/RAG chatbot needed. |
| 2026-05-08 | Site reframed as "notebook with 15 modes," Fool's Errand demoted to one section | Original framing let the sub-brand eat the whole site. The polymath frame is correct. |
| 2026-05-08 | Threads added as a curated, narrated cross-cutting layer | Tags alone don't capture *narrated* domains. Threads make breadth navigable. The differentiator. |
| 2026-05-08 | The Guild's Crew Calls is auto-aggregated from `errands.looking_for` | One source of truth. Recruiting asks live with the project they belong to. |
| 2026-05-08 | Voice change: drop defensive self-deprecation, keep self-deprecating humor | The two are different. Defense hedges ambition; humor is craft. State the ambition straight. |
| 2026-05-08 | AGENTS.md is canonical agent doc; CLAUDE.md is a thin pointer | One source of truth, every agent reaches the same instructions. |
| 2026-05-08 | Empty surfaces don't ship; modes earn launch by having content | Modal sprawl is the failure mode. Discipline up front prevents dead sections. |
| 2026-05-08 | Cross-cutting views are derived at build time, never stored | One source of truth per piece of data. |

---

## What's *not* an architectural concern

So we're explicit about non-goals:

- **No CSS framework.** Plain CSS with custom properties handles theming, dark mode, typography.
- **No client-side router.** Astro's file-based routing is the router. Full page loads are fine.
- **No state management library.** There's almost no client state. Theme is `prefers-color-scheme`.
- **No build pipeline beyond Astro.** `npm run build` produces `dist/`. Cloudflare Pages takes it from there.
- **No tests for v1.** The build itself (Zod + TS strict + Astro type checking) is the test for content. Real tests come when there's logic worth testing.
- **No analytics.** Privacy by default. If understanding traffic ever matters, a privacy-respecting tool is added as an explicit decision.
