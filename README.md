# preritkhanna.com

A public log of attempts. Framed as **Fool's Errand**.

## Stack

[Astro](https://astro.build) with content collections. Static by default; islands when interactivity is needed.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs ./dist
npm run preview  # serve the built site
```

## Add an errand

1. Create `src/content/errands/YYYY-MM-slug.md`
2. Fill in the frontmatter (see schema in `src/content.config.ts`)
3. Write the body in markdown
4. Save. Dev server hot-reloads.

## Deploy

Build outputs to `dist/`. Deploy that folder to any static host (Vercel, Cloudflare Pages, Netlify, GitHub Pages).

## More

- [CLAUDE.md](./CLAUDE.md) — instructions for AI assistants
- [PRD.md](./PRD.md) — what this is and what it isn't
- [ARCHITECTURE.md](./ARCHITECTURE.md) — the spine
