# ARCHITECTURE.md

## The spine

Errand content lives as markdown files in `src/content/errands/`, validated against a Zod schema in `src/content.config.ts`. Every UI — current and future — reads from this collection.

This is the load-bearing decision. The data outlives every interface choice.

```
src/content/
  config.ts                    # Zod schema (the gate)
  errands/
    2026-05-ship-v0.md
    2026-06-...
```

## Schema (the contract)

```ts
import { defineCollection, z } from 'astro:content';

const errands = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    started: z.date(),
    status: z.enum(['cooking', 'live', 'shipped', 'abandoned', 'paused']),
    tagline: z.string(),
    tags: z.array(z.string()).optional(),
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

export const collections = { errands };
```

A file that violates this schema fails the build. That's the point.

## Project layout

```
preritkhanna/
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── errands/
│   ├── layouts/
│   │   └── Base.astro             # <head>, fonts, theme, nav
│   ├── components/
│   │   └── ErrandCard.astro
│   ├── pages/
│   │   ├── index.astro            # the list
│   │   └── errands/
│   │       └── [slug].astro       # one page per errand
│   └── styles/
│       └── global.css
├── public/                        # favicon, og image, raw assets
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
├── CLAUDE.md
├── AGENTS.md
├── PRD.md
└── ARCHITECTURE.md
```

## Why Astro

- Content-first. Static HTML by default, zero JS unless asked for.
- Content collections give us a typed schema gate "for free."
- File-based routing matches the unit (`/errands/[slug]`).
- Framework-agnostic islands: when v2 wants a balloon UI, or v3 wants three.js, we drop in a React/Svelte component with a `client:` directive. Only that component ships JS. The list page stays static.
- Deploys as a static folder. No server until we want one (e.g., for a future RAG chatbot endpoint, which would flip a single route to SSR).

## How future interfaces plug in

Each new interface is a new `src/pages/*.astro` file (or a new component on the homepage) that calls `getCollection('errands')` and renders differently.

| Interface | How it slots in |
|---|---|
| Balloon-pop view | New page `/balloons.astro` (or replace homepage). React island via `@astrojs/react`. Renders the same `errands` collection as floating clickables. |
| 3D / Bruno-style world | Same idea: a React + three.js component, `client:only="react"`, full-screen. Static `/errands/[slug]` pages remain for deep-linking. |
| RAG chatbot ("Ask Prerit") | Flip one route to SSR (or hit an external function). Embeddings built from the same markdown files. |
| RSS / email | Generate `/rss.xml` from the collection at build time. Per-errand subscriptions need a backend; deferred. |

Every one of these reads the same `src/content/errands/` folder. The spine is the unifier.

## Build & deploy

- `npm run build` → static `dist/`
- Host: **Cloudflare Pages**. Free tier, global CDN, generous limits, and Cloudflare Workers is a clean upgrade path when we add a server-side route (e.g., the future RAG chatbot endpoint).
- CI: GitHub push → Cloudflare Pages build → live.

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-05-05 | Astro over Next.js / raw Vite | Content-first, islands model, framework-agnostic, doesn't punish future 3D ambition. |
| 2026-05-05 | Markdown + Zod over CMS / DB | Spine must outlive every UI. Git is history. AI-editable. Zero lock-in. |
| 2026-05-05 | List UI for v0, balloons/3D deferred | Ship today. Future interfaces read the same spine. |
| 2026-05-05 | Domain: `preritkhanna.com` (deferred), brand: *Fool's Errand* | Identity outlives any single brand experiment. |
| 2026-05-06 | Host: Cloudflare Pages | Free, fast global CDN, clean upgrade path to Workers when SSR/RAG chatbot needed. |
