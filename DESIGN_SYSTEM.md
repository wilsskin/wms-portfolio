# Portfolio Design System

**Version:** 3.0  
**Last Updated:** April 14, 2026  
**Site:** [wilsonskinner.com](https://wilsonskinner.com)

Read this before making any visual change. If you're in a hurry, jump straight to [Global Text Classes](#global-text-classes) and [Do's and Don'ts](#dos-and-donts).

---

## Quick Reference

The values you'll reach for 90% of the time:

| What                   | Value                                     |
|------------------------|-------------------------------------------|
| Page background        | `#F8F8F8` · `var(--color-bg)`             |
| Primary text           | `#000000` · `var(--color-text-primary)`   |
| Secondary text         | `#6F6F6F` · `var(--color-text-secondary)` |
| Border                 | `#CCCCCC` · `var(--color-border-light)`   |
| Page title             | `.headline-global` · 26px · 500           |
| Section heading        | `.subtitle-global` · 20px · 500           |
| Body text              | `.paragraph-global` · 16px · 400          |
| Caption / label        | `.caption-global` · 14px · 400            |
| Between sections       | `var(--spacing-section)` · 128px          |
| Case study section top | `.section-large` · `var(--spacing-section)` · 128px |
| Reading column         | `max-width: 504px`                        |

---

## Visual Theme & Atmosphere

Wilson Skinner's portfolio is editorial restraint. The canvas is near-white (`#F8F8F8`), not pure white — soft enough to feel considered. Headlines are pure black; body text steps back to `#6F6F6F`. There are no accent colors, no gradients, no decorative illustrations. Depth comes from spacing alone.

The type system uses two weights (400 and 500) and four sizes. Letter-spacing pulls headlines tight — compressed, confident. Body text runs at default tracking. The reading column caps at 504px. Every element earns its pixel.

The overall effect is a site that says: *the work speaks for itself*.

---

## Global Text Classes

Four classes cover all text on the site. Use them directly in HTML. Do not write custom `font-size` or `font-weight` rules unless a component genuinely requires it.

### Typography Hierarchy

All four classes enforce `max-width: 504px`. This is the reading column — never override it wider. `.caption-global` is the only exception (no max-width, used for short labels).

| Role           | Class               | Size (mobile) | Weight | lh   | ls      | Color     |
|----------------|---------------------|---------------|--------|------|---------|-----------|
| Page Title     | `.headline-global`  | 26px (22px)   | 500    | 1.15 | -0.05em | primary   |
| Section Header | `.subtitle-global`  | 20px (18px)   | 500    | 1.33 | -0.02em | primary   |
| Body Text      | `.paragraph-global` | 16px (14px)   | 400    | 1.4  | 0       | secondary |
| Caption / Meta | `.caption-global`   | 14px          | 400    | 1.33 | +0.01em | secondary |

**Mobile** = ≤480px viewport. Sizes are driven by the `--type-size-*` token scaling, not per-class overrides.

**Font:** Inter. Loaded from Google Fonts. Fallbacks: `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.

**Weights used:** 400 (Regular) and 500 (Medium) only. Never use 600, 700, or bold.

### Class Usage Details

| Class               | Element          | Notes                                                                         |
|---------------------|------------------|-------------------------------------------------------------------------------|
| `.headline-global`  | `<h1>`           | One per page. This class is the single source of truth for h1 styling — there is no separate base `h1` rule. Always add this class to every `<h1>`. For grey inline subtext, use `<span style="color: var(--color-text-secondary)">` inside the h1. |
| `.subtitle-global`  | `<h2>` · `<h3>`  | Muted variant: add `.color-grey` utility class                        |
| `.paragraph-global` | `<p>`            | No built-in margin. Use `.text-container` / `.p-container` to own spacing     |
| `.caption-global`   | any inline/block | Labels, captions, meta. Add `.caption-primary` to force color to `#000`       |

### What's Outside These Classes

A handful of text styles are handled by component CSS and don't use the global classes:

| Text                           | Where                                                      | Why                                                   |
|--------------------------------|------------------------------------------------------------|-------------------------------------------------------|
| Hero caption ("worth the 3am") | `.hero-caption`                                            | Monospace, uppercase — intentional style break        |
| Nav links                      | `.header-nav-link`, `.side-nav-link`, `.mobile-menu-nav a` | Component-specific weight, color, and hover behavior  |
| Footer text                    | `.footer-left`                                             | Uses `--type-size-body` directly                      |

---

## Utility Classes

Single-purpose classes that modify color or text style. Apply these on top of a global text class — never use them alone.

| Class              | Effect                                          | Use                                                         |
|--------------------|-------------------------------------------------|-------------------------------------------------------------|
| `.color-grey`      | `color: var(--color-text-secondary)` (#6F6F6F)  | Muted headings — HMW statements, quotes, section intros     |
| `.color-black`     | `color: var(--color-text-primary)` (#000000)    | Emphasize inline text within a grey or secondary-color block |
| `.caption-primary` | `color: var(--color-text-primary)` (#000000)    | Value text next to a secondary-colored label in meta rows   |
| `.text-bold`       | `font-weight: 500`                              | Bump any global text class to medium weight                 |

---

## Container Classes

Two small flex wrappers own the spacing between text elements. Containers own gaps — text classes stay margin-free.

| Class             | Layout                             | Use                                                                |
|-------------------|------------------------------------|--------------------------------------------------------------------|
| `.text-container` | flex column · gap 2px · max 504px  | One `.subtitle-global` + one or more `.paragraph-global` below it  |
| `.p-container`    | flex column · gap 16px             | Multiple `.paragraph-global` siblings. Nest inside `.text-container` when it follows a heading |

**Single paragraph under a heading:**

```html
<div class="text-container">
  <h3 class="subtitle-global">Heading</h3>
  <p class="paragraph-global">Body.</p>
</div>
```

**Multiple paragraphs under a heading:**

```html
<div class="text-container">
  <h3 class="subtitle-global">Heading</h3>
  <div class="p-container">
    <p class="paragraph-global">First paragraph.</p>
    <p class="paragraph-global">Second paragraph.</p>
  </div>
</div>
```

Gaps: 2px between heading and body (tight hierarchy), 16px between sibling paragraphs (breathing room).

---

## Design Tokens

### Colors

| Token                    | Value     | Use                                             | Notes                         |
|--------------------------|-----------|-------------------------------------------------|-------------------------------|
| `--color-bg`             | `#F8F8F8` | Page background, card backgrounds, mobile menu  |                               |
| `--color-text-primary`   | `#000000` | Headlines, active nav links, emphasis text      |                               |
| `--color-text-secondary` | `#6F6F6F` | Body paragraphs, captions, inactive nav, footer | WCAG AA: 4.52:1 on `#F8F8F8`  |
| `--color-border-light`   | `#CCCCCC` | Work card borders, dividers, status pill border |                               |

Never hardcode hex values for these. Always use the token. Never introduce new colors outside this palette.

### Typography Tokens

```css
:root {
  --font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --type-size-title: 26px;    /* .headline-global — scales to 22px at ≤480px */
  --type-size-heading: 20px;  /* .subtitle-global — scales to 18px at ≤480px */
  --type-size-body: 16px;     /* .paragraph-global — scales to 14px at ≤480px */
  --type-size-meta: 14px;     /* .caption-global — no scaling */
}
```

### Radii

```css
:root {
  --radius-sm: 4px;   /* Subtle — tag pills */
  --radius-md: 8px;   /* Standard — logo, avatar, small cards */
  --radius-lg: 16px;  /* Large — work preview cards */
}
```

### Shadows

```css
:root {
  --shadow-light: 0 1px 3px rgba(0,0,0,0.1);   /* Status pill, icon link hover */
  --shadow-medium: 0 4px 8px rgba(0,0,0,0.15); /* Work card hover */
}
```

---

## Layout System

### Container

```css
.container {
  max-width: 816px;
  margin: 0 auto;
  padding: 0 var(--side-padding); /* 24px, 16px at ≤480px */
}
```

### Reading Column

All global text classes have `max-width: 504px`. This is the reading column. It keeps line length in the 45-75 character optimal range. Don't override it to make text wider.

**Reference grid:** 768px content frame = 12 × 42px columns + 11 × 24px gutters. Reading column = 7 columns + 6 gutters = 504px.

### Hero Section Padding

Each page type uses a dedicated class to control hero vertical spacing. Never set `padding-top` directly on the hero section element — the class owns it.

| Class                   | Page         | `padding-top` | `padding-top` (≤1032px) | `padding-bottom` |
|-------------------------|--------------|---------------|-------------------------|------------------|
| `.page-hero`            | index        | 96px          | 48px                    | 128px            |
| `.page-hero-about`      | about        | 96px          | 48px                    | 32px             |
| `.hero-case-section`    | case studies | 96px          | 48px                    | — (summary-section top padding provides gap) |

> `.hero-case-section` is defined in `assets/case.css`, not `style.css`.

### Navigation Breakpoints & Collapsing Strategy

| Breakpoint  | Navigation                                             | What changes                                                    |
|-------------|--------------------------------------------------------|-----------------------------------------------------------------|
| > 1032px    | Fixed left sidebar (`.side-nav`)                       | Full nav visible                                                |
| 481–1032px  | Inline top nav (`.header-nav`)                         | Work / About / Resume links, right-aligned                      |
| ≤ 480px     | Hamburger menu (`.hamburger` + `.mobile-menu-overlay`) | Inline nav hides; hamburger appears; full-screen overlay on tap |

**At ≤768px:** "View →" link hides from work cards; full card becomes the tap target via a pseudo-element overlay.

**At ≤480px:** Type sizes scale down (title 26→22px, heading 20→18px, body 16→14px). Side padding reduces to 16px. About page experience year hides. Hero animation duration reduces.

---

## Spacing System

8px base unit. Always use tokens — never hardcode arbitrary pixel values.

```css
:root {
  --side-padding: 24px;        /* 16px at ≤480px */
  --spacing-xsmall: 16px;      /* Label-to-value, icon-to-text, tight gaps */
  --spacing-small: 24px;       /* Heading-to-paragraph, list items */
  --spacing-medium: 32px;      /* Content blocks, image-to-caption */
  --spacing-large: 64px;       /* Between cards or playground items */
  --spacing-xlarge: 80px;
  --spacing-xxlarge: 96px;     /* Hero section top padding reference */
  --spacing-section: 128px;    /* Between page sections (Hero → cards → Playground) */
}
```

**At ≤768px**, these scale down automatically


## Component Specs

### Work Cards (Index Page)

```
.work-card                            — section wrapper, no styling
  .container
    .thumbnail-description            — row: title/desc left, "View →" right
      .text-container                 — flex column, gap 2px, max-width 504px
        .subtitle-global              — case study name
        .paragraph-global             — one-line description
      .thumbnail-view-link            — 14px secondary, hides at ≤768px
    .work-preview                     — the card frame
      .thumbnail-wrapper              — absolute, grid layout of screenshots
```

**`.work-preview` base styles:**
- Border: `1px solid var(--color-border-light)` (#CCCCCC)
- Border-radius: `16px`
- Aspect ratio: `900 / 475`
- Max-width: `768px`
- Background: `var(--color-bg)` (overridden per case study)

**Case study card colors:**

| Case Study | Background | Hover Background | Hover Border |
|------------|------------|------------------|--------------|
| CarGurus   | `#B8D5E6`  | `#7CB6D7`        | `#0578BB`    |
| Bodega Bay | `#CFC9DF`  | `#AA9ECB`        | `#6149A2`    |
| JumboCode  | `#C1DFD6`  | `#8ECAB9`        | `#28A07E`    |

**Hover:** `box-shadow: var(--shadow-medium)` + enhanced border color. Transition: `all 0.4s cubic-bezier(0.33, 1, 0.68, 1)`.

**Between cards:** `margin-top: var(--spacing-xxlarge)` (96px).

---

### Case Study Section Layout

Each narrative section (Context, Problem, Goal, Solution, Process) follows the same structure:

```html
<section class="case-section section-large" id="sectionname">
  <div class="container">
    <h2 class="caption-global section-title">SECTION LABEL</h2>
    <div class="text-container">
      <h3 class="subtitle-global">The section headline goes here</h3>
      <p class="paragraph-global">Body text description.</p>
    </div>
    <!-- images, additional paragraphs, etc. -->
  </div>
</section>
```

- Section top padding: `var(--spacing-section)` (128px) via `.section-large`
- All text: max-width 504px (enforced by global classes)
- Images: `.media-frame` (max-width 768px, aspect-ratio 900/475, border-radius 16px)

> **Spacing rule:** All inter-section spacing on case study pages is applied as `padding-top` on the incoming section — never as `padding-bottom` on the outgoing one. Do not add bottom padding to section classes.

---

### Navigation

**Side nav (>1032px):**
- Fixed left, always visible
- Case study pages: shows "Back" link + in-page section links
- Links: 16px body size, 400 weight, secondary color; active = primary color

**Header nav (481–1032px):**
- Inline top bar, 56px height
- Links: 16px, 400 weight, letter-spacing -0.32px, secondary; active/hover = primary
- Logo left, nav right

**Mobile menu (≤480px):**
- Full-screen overlay, background `--color-bg`
- Links: 20px heading size, 400 weight, secondary; active = primary + 500 weight

---

## Depth & Elevation

| Level      | Treatment                                                       | Use                                              |
|------------|-----------------------------------------------------------------|--------------------------------------------------|
| Flat       | No shadow, no border                                            | Page background, text blocks, section containers |
| Bordered   | `1px solid var(--color-border-light)`                           | Work card base state, status pill, icon links    |
| Elevated   | `border` + `var(--shadow-medium)` (0 4px 8px rgba(0,0,0,0.15))  | Work card hover state                            |
| Light lift | `var(--shadow-light)` (0 1px 3px rgba(0,0,0,0.1))               | Status pill hover, icon link hover               |

This site has no layered multi-shadow system. One border, one hover shadow. Keep it that way.

---

## Interactive States

**Hover:** color shifts from secondary → primary (text elements), or `opacity: 0.7` (generic links). Maintain underline on links.

**Transition timing:** `cubic-bezier(0.33, 1, 0.68, 1)` (ease-out spring) at 0.3–0.4s for most interactions. `cubic-bezier(0.22, 1, 0.36, 1)` for fast exits. Be consistent — don't introduce new easing curves.

**Focus:**
```css
a:focus, button:focus {
  outline: 2px solid var(--color-text-primary);
  outline-offset: 2px;
}
```

---

## Do's and Don'ts

### Do

- **Use the 4 global classes for all body text.** `.headline-global`, `.subtitle-global`, `.paragraph-global`, `.caption-global` — that's the whole system.
- **Wrap heading + paragraph pairs in `.text-container`** (gap 2px). For multiple paragraphs, nest them in a `.p-container` (gap 16px) inside the `.text-container`.
- **Add `.color-grey` to `.subtitle-global`** for muted headings (HMW statements, section intro labels, quotes). Never use inline `style="color: ..."` for this.
- **Use `caption-global caption-primary` together** for value text that sits next to a secondary-colored label.
- **Let `.page-hero`, `.page-hero-about`, `.page-hero-case-study` own `padding-top`** on every page's top section.
- **Use `var(--spacing-section)` between page sections** (Hero → cards → Playground → Footer).
- **Use `.section-large` (`var(--spacing-section)`, 128px) as `padding-top` on main case study sections.**
- **Keep all reading text at max-width 504px.** The global classes enforce this — don't override it wider.
- **Use color tokens everywhere.** `var(--color-text-secondary)` not `#6F6F6F` inline.

### Don't

- **Don't write custom `font-size` or `font-weight` rules for new text.** Reach for a global class first.
- **Don't set `padding-top` directly on `.hero`, `.about-hero`, or any hero-area element.** The hero padding class owns it. Overriding it will break responsive scaling.
- **Don't hardcode hex values** for the main palette. `#6F6F6F`, `#CCCCCC`, `#F8F8F8`, `#000` should always come from tokens.
- **Don't use weights 600 or 700.** The system uses 400 and 500 only. Using bolder weights breaks the typographic hierarchy.
- **Don't add `margin-top` to `.paragraph-global` manually.** The class is margin-free; gaps live on the containing `.text-container` or `.p-container`.
- **Don't use arbitrary spacing values.** 20px, 40px, 48px (except at breakpoints) — anything outside the token scale adds inconsistency. Use the nearest token.
- **Don't create new color values** for text or borders. If a new color feels necessary, it's a design decision — resolve it in Figma first, update the token, then implement.
- **Don't introduce new easing curves.** Use the two existing cubic-beziers.

---

## Accessibility

| Text                   | Contrast | Passes   |
|------------------------|----------|----------|
| `#000000` on `#F8F8F8` | 18.54:1  | WCAG AAA |
| `#6F6F6F` on `#F8F8F8` | 4.52:1   | WCAG AA  |

- All images: descriptive `alt` text. Decorative images: `alt=""`.
- Heading hierarchy: H1 → H2 → H3. Don't skip levels.
- Semantic HTML: `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`.
- All interactive elements: visible focus state (2px solid black outline).
- Respect `prefers-reduced-motion` — the hero animation already handles this.

---

## Case Study CSS Architecture

All three case study pages share a single `assets/case.css` file. It has three sections: **Global** (shared layout and component classes), then one scoped section per page — **JumboCode**, **CarGurus**, and **Bodega Bay**.

**Key shared classes in the Global section:**

| Class | Role |
|---|---|
| `.hero-case-section` | Hero section top padding (96px, 48px ≤1032px) |
| `.split-grid` | Two-column flex layout (merged from showcase-grid + research-grid) |
| `.split-col` | Column inside a split-grid (merged from showcase-item + research-item) |
| `.col-image` | Flex-column image wrapper inside a split-col |
| `.metric-row` | Row of metric/info cards (merged from impact-container + problems-grid) |
| `.metric-card` | Individual card in a metric-row (merged from impact-card + problem-card) |
| `.section-content` | Vertical content stack with 16px gap (process, prototypes, design subsections) |
| `.section-large` | `padding-top: var(--spacing-section)` (128px) |
| `.section-medium` | `padding-top: var(--spacing-section)` (96px) |

Theme colors (hero background, impact numbers, goal numbers, hover states) are scoped by a body class (`page-jumbocode`, `page-cargurus`, `page-bodegabay`). To add a new case study: (1) add a new section at the bottom of `case.css` with a `.page-newname` scope, (2) add `<body class="page-newname">` and `<link rel="stylesheet" href="../assets/case.css">` to the HTML. Structural/layout classes that the new page shares with existing pages go in the Global section; anything unique to that page goes in its own scoped section.

---

## Agent Prompt Guide

### Quick Color Reference

```
Page background:   #F8F8F8  (var(--color-bg))
Primary text:      #000000  (var(--color-text-primary))
Secondary text:    #6F6F6F  (var(--color-text-secondary))
Border:            #CCCCCC  (var(--color-border-light))
```

### Example Component Prompts

**Page title (H1):**
> Use `.headline-global` on an `<h1>` — Inter 26px weight 500, line-height 1.15, letter-spacing -0.05em (-1.3px), color #000000, max-width 504px. One per page.

**Section heading:**
> Use `.subtitle-global` on `<h2>` (top-level section) or `<h3>` (sub-section within a section) — never `<p>` or `<h4>`. Inter 20px weight 500, line-height 1.33, letter-spacing -0.02em (-0.4px), color #000000, max-width 504px. For muted style, add `.color-grey`.

**Body paragraph:**
> Use `.paragraph-global` on `<p>` — Inter 16px weight 400, line-height 1.4, letter-spacing 0, color #6F6F6F, max-width 504px. No built-in margin; wrap with `.text-container` (under a heading) or `.p-container` (between sibling paragraphs) to control spacing.

**Caption / label:**
> Use `.caption-global` — Inter 14px weight 400, line-height 1.33, letter-spacing +0.01em (+0.14px), color #6F6F6F. Add `.caption-primary` to make it #000000.

**Work card frame:**
> `.work-preview`: border 1px solid #CCCCCC, border-radius 16px, aspect-ratio 900/475, max-width 768px, background matches the case study variant. Hover: box-shadow 0 4px 8px rgba(0,0,0,0.15) + enhanced border color.

**Case study section:**
> Section: `padding-top: 128px` (var(--spacing-section)) via `.section-large`. Label: `.caption-global` (secondary). Heading: `.subtitle-global`. Body: `.paragraph-global`. All max-width 504px. Images: `.media-frame` with 16px border-radius, 900/475 aspect ratio, max-width 768px.

**Navigation link (inline header):**
> Inter 16px weight 400, letter-spacing -0.32px, color #6F6F6F. Active/hover: color #000000. No underline. Transition: color 0.2s ease.

### Iteration Guide

- Reach for a global and utility class before writing any custom font rule 
- Letter-spacing compresses with size: -0.05em at 26px, -0.02em at 20px, 0 at 16px, +0.01em at 14px
- Two weights only: 400 reads, 500 announces
- Secondary color (#6F6F6F) is the default for body text — primary (#000) is reserved for headings and active/hover states
- 504px is the maximum line width for any reading text — never wider
- Spacing is always a token — if it's not in the scale, round to the nearest one
