# DESIGN.md

The visual design system for preritkhanna.com.

For the *why* the site exists, see [VISION.md](./VISION.md). For the technical architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md). This doc is for the *look and feel* — concrete tokens, type, color, spacing, and the rules that translate voice into visual choices.

---

## The aesthetic targets

Four references. We take something specific from each.

| Reference | What we take |
|---|---|
| [maggieappleton.com](https://maggieappleton.com) | Warmth — off-white background, hand-drawn touches when content warrants, polymath density done with care |
| [darioamodei.com](https://darioamodei.com) | Restraint — centered serif, generous whitespace, no decoration |
| [gwern.net](https://gwern.net) | Seriousness — content density allowed, footnotes as first-class content, reader-first, no chrome |
| [stripe.press](https://press.stripe.com) book pages | Typography — type scale that feels book-like, attention to measure and rhythm |

**What we don't take:** Maggie's illustrated branding (she's an illustrator; we're not). Dario's extreme austerity. Gwern's intimidating first-impression density. Stripe Press's editorial magazine styling.

**The calibration line:**
> Warmer than Dario. Less austere than Gwern. Denser than Sam Altman. Less illustrated than Maggie.

---

## Voice → visual rules

The visual design carries voice as much as the writing does. Each principle from [VISION.md](./VISION.md) maps to a concrete rule:

| Voice principle | Visual rule |
|---|---|
| Earnest, unembarrassed | Confident type sizes. h1 is big. The intro paragraph is real, not a stub. |
| Allergic to performance | No social icons, no follower counts, no subscribe buttons, no share buttons, no "Building in public" badges. |
| Self-deprecating humor stays | Typography plays straight. Layout is dignified. Humor lives in the writing, never in design. |
| Honest about incomplete | `cooking` / `draft` / `paused` statuses are **visible**, not hidden. Status badges have real visual weight. |
| Always recruiting | The Guild is reachable from the home page. Crew Calls don't hide. |
| Multi, not single | No mode gets visual privilege. Errands and Essays and Foundations look like siblings, not a hero + supporting cast. |
| Simple wherever possible | No drop shadows, no gradients, no rounded corners (or only minimal — 4px max), no decorative borders. |
| URLs are forever | URL text is part of the design — clean, readable when shared, never breaks. |

---

## Color palette

The full token set. Light mode is the default; dark mode triggers on `prefers-color-scheme: dark`.

### Light mode

```css
--bg:     #fbfaf7;  /* off-white, warm — not stark white */
--fg:     #1a1a1a;  /* ink — slightly off-black for warmth */
--muted:  #6b6b6b;  /* meta text, secondary */
--rule:   #e6e2da;  /* dividers, light backgrounds */
--accent: #8a4b1f;  /* burnt sienna — warm, alive */
```

### Dark mode

```css
--bg:     #141312;  /* deep brown-black — warmer than pure black */
--fg:     #ececec;  /* off-white — not pure white */
--muted:  #9a9a9a;
--rule:   #2a2826;  /* warm dark gray */
--accent: #d99a6a;  /* warm tan — accent shifts lighter for dark mode */
```

### Usage rules

- **`fg` and `bg`** are the dominant pair. 95%+ of any page is these two.
- **`muted`** is for meta information (dates, status, tags, timestamps, secondary text). Never for primary content.
- **`rule`** is for dividers, code block backgrounds, light surfaces. Subtle.
- **`accent`** is used **rarely** — 1–3 times per page maximum. Reserved for:
  - Active/hover states on links
  - Status badges that indicate "alive" (`live`, `doing`, `cooking` when emphasized)
  - The favicon
  - A single deliberate moment per page where emphasis matters
- The accent is *not* used for body links by default. Body links use `fg` with a `rule`-colored underline that becomes `accent` on hover.

### What's banned

- No additional colors beyond these five tokens. If a new color seems needed, the answer is *use one of the existing five differently*.
- No transparency-based layering (no `rgba(0,0,0,0.1)` overlays). Use defined tokens.
- No gradients.
- No color-coding by mode (errands vs essays don't get different colors). They look like siblings.

---

## Typography

### Font stack

```css
--serif: 'Iowan Old Style', 'Palatino Linotype', Palatino, 'Source Serif Pro', Charter, Georgia, serif;
--sans:  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
--mono:  ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
```

**System stack only.** No web fonts. No `@font-face`. No Google Fonts. Performance is a floor — the site loads instantly.

### When to use which

- **Serif (`--serif`)** — body text, headings, long-form reading. The default for anything substantive.
- **Sans (`--sans`)** — meta information (dates, status badges, tags, timestamps), small UI labels, navigation. Anything that's *about* the content rather than *being* the content.
- **Mono (`--mono`)** — code, technical identifiers, filenames in body text.

### Base size

```css
font-size: 17px;
line-height: 1.6;
```

17px (not 16px) — serifs read better slightly larger. This is the body default.

### Type scale

A modular scale at ratio ≈ 1.25 (major third):

| Token | Size | Used for |
|---|---|---|
| `--type-xs` | 0.875rem (14.875px) | Meta, status badges, dates, tags |
| `--type-sm` | 1rem (17px) | Sans UI elements, captions |
| `--type-base` | 1rem (17px) | Body text (serif) |
| `--type-lg` | 1.125rem (19px) | Lede paragraphs, dek/subtitle |
| `--type-xl` | 1.25rem (21px) | h3 |
| `--type-2xl` | 1.5rem (25.5px) | h2, lede on errand/essay pages |
| `--type-3xl` | 2.25rem (38px) | h1 |
| `--type-hero` | 3rem (51px) | Home page name only |

### Line heights

- Body: `1.6`
- Headings: `1.2`
- Meta / sans UI: `1.4`
- Foundations (denser long-form): `1.55`
- Quotes / Commonplace (quieter): `1.5`

### Heading weights

All headings: **500** (medium), not bold. Bold serif is too heavy; medium reads as confident without aggression.

```css
h1, h2, h3, h4 {
  font-family: var(--serif);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
```

The slight negative letter-spacing on headings is for optical correction at large sizes. Don't apply it to body text.

### Italics

Real italics, not slanted. The serif stack handles this natively. Use italics for:
- Emphasis (sparingly)
- Book and film titles
- Foreign words/phrases
- Dek/subtitle on entry pages

Bold is rarely needed in body text. If something needs emphasis, italics first; bold only when truly load-bearing.

---

## Spacing scale

Rem-based ladder. Derived from the 17px base.

```css
--space-1:  0.25rem;  /* 4px  — tight, label-to-icon */
--space-2:  0.5rem;   /* 8px  — small gap */
--space-3:  0.75rem;  /* 12px — meta gap */
--space-4:  1rem;     /* 17px — paragraph gap */
--space-5:  1.5rem;   /* 25px — section gap (between sub-sections) */
--space-6:  2rem;     /* 34px — block gap (between major blocks) */
--space-7:  3rem;     /* 51px — major section gap (e.g., before <hr>) */
--space-8:  4rem;     /* 68px — page rhythm (top of page) */
--space-9:  6rem;     /* 102px — generous, used rarely */
```

**Don't use values outside this scale.** If something needs `1.2rem`, the answer is `1rem` or `1.5rem` — pick the closer one.

---

## Layout

### Measure (max content width)

```css
--measure: 40rem;  /* 640px — body content max width */
```

40rem is roughly 65–75 characters per line in the serif stack. That's the band where reading is most comfortable.

Some surfaces may use a wider measure:
- Index pages (errand list, essay list): `--measure-wide: 48rem` if grid layout warrants
- Threads aggregation lists: same as body content (40rem)
- Code blocks within body: full measure (40rem)

### Page rhythm

```
[main]
  margin: 0 auto;
  max-width: var(--measure);
  padding: 4rem 1.5rem 6rem;  /* top, sides, bottom */
```

- 4rem top padding gives the page room to breathe before the title.
- 6rem bottom padding ensures the last paragraph doesn't crowd the viewport edge.
- 1.5rem side padding on desktop; 1rem on mobile.

### Mobile (< 768px)

Adjustments:

```css
@media (max-width: 768px) {
  main {
    padding: 2.5rem 1rem 4rem;
  }
  h1 { font-size: 1.875rem; }   /* 32px — slightly smaller */
  --type-hero: 2.25rem;          /* 38px — home name shrinks */
}
```

The base font size stays at 17px — don't shrink body text on mobile.

### No header nav

The site has no top navigation bar. The home page **is** the navigation. Other pages have a small "← back" link (small, sans, muted) at the top.

```html
<p class="small"><a href="/">← all errands</a></p>
```

This keeps every page focused on its content, not on the site's structure.

### Footer

Minimal. One line, sans, muted, at the bottom of every page:

```
preritkhanna.com · last updated [date] · colophon
```

No social icons. No "follow" links. No copyright notices (default copyright is fine; we don't need to declare it).

---

## Visual treatment by mode

The site looks consistent across modes. But each mode has small calibrations that match its voice:

### Errands

- Status badge visible at top (sans, xs, with accent color when `live`)
- Tagline rendered as italic lede in serif
- Threads listed at top: `Threads: Robotics · AI`
- Updates rendered as a timeline — date in muted sans, note in serif
- `looking_for` rendered as a callout box if present

### Essays

- Most traditional reading layout
- Optional dek (subtitle) in italic serif at lede size
- `last_updated` shown if present (small, sans, muted)
- Drafts get a `[draft]` badge in the title or top metadata — never hidden

### Foundations

- Denser allowed: line-height 1.55, slightly tighter paragraph spacing
- Footnotes/asides as first-class content
- `last_updated` always shown (foundations evolve)
- Threads always shown (foundations always belong to threads)

### Dispatches

- Shorter form. Often just 1–3 paragraphs.
- Slightly tighter overall — less whitespace between dispatches in the index
- Date prominent, headline second

### Commonplace (quotes)

- The quote is the hero. Larger serif type (`--type-lg` minimum, sometimes `--type-xl` for short quotes).
- Attribution small, sans, muted, after the quote.
- Source context (book, conversation, etc.) on a separate line, smaller still.
- Lots of whitespace around each entry. Quiet.

### Principles (Operating Manual)

- The principle text in large serif, italic, centered if possible.
- Adoption date in small sans below.
- Body explanation in standard body type.
- Each principle gets generous whitespace — they should feel weighty, not listy.

### Library

- Each entry: book title (serif, h3 size), author below in muted sans, the "why this" paragraph in body type.
- Visually quiet. The collection is the point, not any single entry.

### Learning (Studies)

- Status badge ("reading", "finished", etc.) in xs sans with subtle color treatment
- The one-line take prominent in serif italic
- Optional marginalia in body type below

### Bucketlist (Quests)

- Each item: title in serif, status badge in xs sans
- "Why this" note in muted body type if present
- `let-go` items kept in the list (not hidden) but rendered with reduced visual weight (slightly muted)

### Threads

- The "why this pulls me" body reads like an essay (long-form layout)
- Aggregated content below in a list, grouped by mode
- Related threads at the bottom in a small sans line

### Radar

- Compact list view, grouped by category (people, books, topics, etc.)
- Each entry: name in serif, "why noticed" in muted body type
- Date in xs sans
- The least dressy mode — it's a queue

### Now

- Single page. No navigation, no header. Just the snapshot.
- `last_updated` at the top in small sans muted
- Body in serif, fragmentary or paragraph form

### About

- Origin section reads as an essay
- Beliefs/principles section as a list of short, weighty paragraphs
- Influences as a list with a one-paragraph each
- Reversals as a striking visual: each as a `Used to think → Now think` block

### Guild

- The Guild landing page explains in 2–3 paragraphs what this is
- Crew Calls listed as cards (errand title + looking_for line + link)
- Boons listed plainly
- Conversations listed plainly
- Contact info at the bottom — clear and unadorned

### Home

- Name in `--type-hero` (3rem) — confident
- Intro paragraph in body serif
- "Currently:" line in italic serif at lede size
- Modes listed plainly, dot-separated, in body sans size
- "If you're new" section at bottom — small heading, 1–5 picks

---

## Status badges

A consistent treatment across modes for status indicators.

```css
.status {
  display: inline-block;
  font-family: var(--sans);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.15em 0.4em;
}

/* Active states use accent color */
.status-cooking,
.status-live,
.status-doing,
.status-reading,
.status-active { color: var(--accent); }

/* Quiet states use muted */
.status-paused,
.status-eyeing,
.status-draft,
.status-dormant { color: var(--muted); }

/* Done states use fg */
.status-shipped,
.status-done,
.status-finished,
.status-published { color: var(--fg); }

/* End states use muted, often italic */
.status-abandoned,
.status-let-go,
.status-dnf,
.status-closed {
  color: var(--muted);
  font-style: italic;
}
```

The semantic levels: **active (warm), neutral (default), quiet (muted), ended (muted italic).** Badges signal honestly without shouting.

---

## Links

```css
a {
  color: var(--fg);
  text-decoration: underline;
  text-decoration-color: var(--rule);
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: text-decoration-color 0.15s ease;
}

a:hover {
  text-decoration-color: var(--accent);
}
```

Links don't change color on hover; only the underline changes. This keeps the page calm and lets the type stay consistent.

External links don't get a special icon. If we want to indicate external destinations, we use a sans annotation in muted text — not an icon.

---

## Code

```css
code {
  font-family: var(--mono);
  font-size: 0.9em;        /* slightly smaller than body */
  background: var(--rule);
  padding: 0.1em 0.35em;
  border-radius: 3px;
}

pre {
  background: var(--rule);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
pre code {
  background: none;
  padding: 0;
  font-size: 1em;
}
```

Border-radius of 3–4px is the *only* place rounded corners appear. Everywhere else, things have square corners.

---

## Blockquotes

```css
blockquote {
  border-left: 2px solid var(--rule);
  margin: 1.5rem 0;
  padding: 0 0 0 1.25rem;
  color: var(--muted);
  font-style: italic;
}
```

Blockquotes are quiet — italic, muted color. The quote should feel like a step back, not a shout.

For *hero* quotes (Commonplace entries), see the Commonplace mode treatment above.

---

## What's banned

These have no place in the design unless explicitly reconsidered:

- **Icons** (except favicon — and even that is text-based or a single warm sketch)
- **Animations** beyond simple ≤200ms color/underline transitions on hover
- **Web fonts** of any kind
- **Drop shadows** of any kind
- **Gradients** of any kind
- **Rounded corners larger than 4px**
- **Borders thicker than 1px** (except `<hr>` which is 1px)
- **Social media buttons** (share, follow, like, etc.)
- **"Subscribe to my newsletter" boxes / popups / interstitials**
- **Loading spinners** (the site is static — nothing should appear to load)
- **Modal dialogs** for non-critical interactions
- **Carousels / sliders** (just use a list)
- **Cookie banners** (no analytics, nothing to consent to)
- **Lighthouse "Sign up" widgets** of any kind
- **Hero images / stock photos**
- **Auto-playing media**

---

## Earned exceptions

These are *allowed*, but each instance should feel deliberate, not decorative:

- **Hand-drawn sketches** embedded in errand updates, essays, or foundations — when text alone doesn't carry the idea
- **Diagrams** in foundations or essays when reasoning needs visual structure
- **A single hero element on the home page** — could be a small drawing, a signature, or a deliberately-chosen quote (rotated occasionally)
- **Photos** on `/travels` (when that mode ships) — if a photo *is* the content, it earns its place
- **A subtle visual flourish on year-end essays** — once a year, you can break a small rule

The test: if removing the element would make the page worse, it earned its place. If removing it makes the page identical or better, cut it.

---

## Responsive

Mobile-first thinking, but in practice the breakpoints are minimal:

- **< 768px** — mobile adjustments (smaller h1, reduced padding, base type stays at 17px)
- **>= 768px** — desktop default
- **>= 1200px** — no further changes (content is centered at 40rem regardless)

The site doesn't use a complex grid system. There's the centered content column, and that's it. No sidebar layouts, no multi-column reading.

---

## Accessibility

Floor, not ceiling.

- **Semantic HTML** — real headings (h1 → h2 → h3, never skip levels), real lists, real `<article>` tags for entries.
- **Color contrast** — at least WCAG AA for body text. The current palette passes (fg on bg is ~14:1 in light mode).
- **Keyboard navigation** — all links keyboard-reachable. Focus states visible (use `:focus-visible` with a 2px accent outline).
- **`prefers-reduced-motion`** — disable transitions when set.
- **`prefers-color-scheme`** — automatic dark mode.
- **Alt text** — every embedded image (sketches, diagrams, photos) has descriptive alt text. No decorative-image-alt-empty hacks.
- **Skip link** — at the top of every page, a "skip to content" link for screen reader users (visible on focus).

---

## File structure

For v1, all design tokens and base styles live in:

```
src/styles/
  global.css       # tokens (CSS custom properties) + base element styles
```

When this gets large enough to be unwieldy, split:

```
src/styles/
  tokens.css       # custom properties only
  base.css         # element defaults
  utilities.css    # tiny utility classes
  print.css        # print styles (low priority)
```

Component-specific styles stay in Astro `<style>` blocks (component-scoped). Utility classes are minimal — `.muted`, `.small`, status classes. **No utility-CSS frameworks** (no Tailwind).

---

## When to update this doc

- When a new visual decision is made that wasn't covered here (add it)
- When a token changes (update it)
- When a banned thing earns an exception across the whole site (move it from banned → earned)
- When a mode-specific treatment is invented (add it to the mode treatments section)

This doc is a living artifact. But it's *small*. If it grows past ~600 lines, something is over-specified.

---

## What this doc is not

- Not a CSS framework. There's no `.btn-primary` or `.card-elevated`. The design is *Astro components + global tokens*.
- Not a brand book. There's no logo, no logomark, no brand voice guidelines (those live in [VISION.md](./VISION.md) and [AGENTS.md](./AGENTS.md)).
- Not a pixel-perfect spec. It's a token system + rules. Build agents fill in the implementation details following the rules.
