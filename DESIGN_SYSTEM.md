# Portfolio Design System

**Version:** 2.0  
**Last Updated:** March 30, 2026  
**Site:** [wilsonskinner.com](https://wilsonskinner.com)

This document defines the complete design system for Wilson Skinner's portfolio. It ensures visual consistency, readable typography, and predictable alignment across all pages and components.

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Layout System](#layout-system)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing System](#spacing-system)
6. [Interactive States](#interactive-states)
7. [Accessibility](#accessibility)

---

## Design Principles

**Clarity over decoration.** Every element serves the content. No decorative elements without purpose.

**Strong hierarchy.** Large text blocks anchor narratives. Information architecture should be instantly clear.

**Intentional whitespace.** Generous spacing guides the eye and creates breathing room.

**Readable storytelling.** The 504px reading column maintains 45-75 characters per line for optimal readability.

**Minimal aesthetic.** Grayscale palette, clean geometric forms, no gradients.

---

## Layout System

### Container Structure

All pages use a **768px centered content frame** (updated from 900px).

```css
.container {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 var(--side-padding);
}
```

### Grid System

**12-column grid** with 24px gutters inside the 768px container.

| Property | Value |
|----------|-------|
| Container width | 768px |
| Columns | 12 |
| Column width | 42px |
| Gutter width | 24px |
| Total gutters | 11 |

**Grid math:** `(12 × 42) + (11 × 24) = 768px`

### Key Layout Values

| Purpose | Width | Columns |
|---------|-------|---------|
| **Reading column** | **504px** | **7 columns + 6 gutters** |
| Full width | 768px | 12 columns + 11 gutters |
| Half width | 372px | 6 columns + 5 gutters |

**Reading column calculation:** `(7 × 42) + (6 × 24) = 504px`

**Alignment principle:** All body text aligns to the 504px reading column for comfortable line length and visual rhythm.

### Responsive Behavior

**Side padding:** Always `24px` (`var(--side-padding)`) on all screen sizes

**Container elements:** Shrink responsively with viewport width

**Reading column:**
- `max-width: 504px`
- Shrinks responsively when viewport < 504px
- Never exceeds 504px regardless of screen size

### Hero Section Padding

Each page type has its own hero padding class. All share the same `padding-top`; only `padding-bottom` differs.

| Class | Used on | `padding-top` (>1032px) | `padding-top` (≤1032px) | `padding-bottom` |
|-------|---------|------------------------|------------------------|-----------------|
| `.page-hero` | index | 96px | 48px | 120px |
| `.page-hero-about` | about | 96px | 48px | 96px |
| `.page-hero-case-study` | case studies | 96px | 48px | 48px |

```css
.page-hero, .page-hero-about, .page-hero-case-study { padding-top: 96px; }
.page-hero { padding-bottom: 120px; }
.page-hero-about { padding-bottom: 96px; }
.page-hero-case-study { padding-bottom: 48px; }
@media (max-width: 1032px) {
  .page-hero, .page-hero-about, .page-hero-case-study { padding-top: 48px; }
}
```

**Rule:** Never set `padding-top` directly on `.hero`, `.about-hero`, `.hero-image-section`, or any other top-section class. Let the hero padding class own it.

### Navigation Breakpoints

| Breakpoint | Navigation shown |
|------------|-----------------|
| > 1032px   | Fixed left sidebar (`.side-nav`) |
| 481–1032px | Inline top nav (`.header-nav`) — Work / About / Resume, right-aligned |
| ≤ 480px    | Hamburger menu only |

---

## Color System

### Base Colors

```css
:root {
  --color-bg: #F8F8F8;              /* Page background */
  --color-text-primary: #000000;    /* Headlines, body text */
  --color-text-secondary: #6F6F6F;  /* Metadata, supporting text */
  --color-border-light: #CCCCCC;    /* Dividers, borders */
}
```

**Note on secondary color:** Updated from `#727272` to `#6F6F6F` for WCAG AA compliance (4.52:1 contrast on `#F8F8F8` background).

### Color Usage

- **Primary text** (`var(--color-text-primary)`): Headlines, body paragraphs, navigation, buttons
- **Secondary text** (`var(--color-text-secondary)`): Role titles, dates, captions, metadata, footer
- **Border** (`var(--color-border-light)`): Dividers, card borders, section separators
- **Background** (`var(--color-bg)`): Page background

### Contrast Requirements

All text colors meet **WCAG AA** standards (4.5:1 minimum contrast ratio):

- `#000000` on `#F8F8F8`: 18.54:1 ✓
- `#6F6F6F` on `#F8F8F8`: 4.52:1 ✓

**Note:** `#6F6F6F` was chosen over `#727272` because `#727272` falls just below WCAG AA at 4.47:1 contrast.

### Accent Color

Deep navy used sparingly for interactive states and emphasis (exact value TBD based on brand assets).

---

## Typography

### Font Family

```css
:root {
  --font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
```

**Inter** is the primary typeface for all text. It provides excellent readability at all sizes and weights.

**VCR OSD Mono** is used exclusively for the hero caption ("worth the 3am"). This monospace font adds personality without disrupting the overall minimal aesthetic.

### Type Scale

```css
:root {
  --type-size-title: 26px;      /* H1, page titles */
  --type-size-heading: 20px;    /* H2, section headers */
  --type-size-body: 16px;       /* Paragraphs, default text */
  --type-size-meta: 14px;       /* Captions, labels, metadata */
}
```

### Responsive Breakpoints

**Mobile:** ≤480px
Font sizes scale down. All other design tokens (spacing, colors, line heights, letter spacing) remain unchanged.


### Typography Hierarchy

**H1 - Page Title**
- Size: `var(--type-size-title)` (26px)
- Weight: 500
- Line height: 1.15
- Letter spacing: -5% (`letter-spacing: -0.02em`)
- Color: `var(--color-text-primary)`
- Max width: 504px

**H2/H3 - Section Headers** (equivalent)
- Size: `var(--type-size-heading)` (20px)
- Weight: 500
- Line height: 1.33
- Letter spacing: -1% (`letter-spacing: -0.01em`)
- Color: `var(--color-text-primary)`

**Body Text**
- Size: `var(--type-size-body)` (16px)
- Weight: 400
- Line height: 1.4
- Letter spacing: 0 (default)
- Color: `var(--color-text-primary)`
- Max width: 504px

**Meta Text**
- Size: `var(--type-size-meta)` (14px)
- Weight: 400
- Line height: 1.33
- Letter spacing: 0 (default)
- Color: `var(--color-text-secondary)`

### Font Weights

Only two weights are used:
- **400** (Regular) - Body text, meta text
- **500** (Medium) - All headings, emphasis

### Line Height Rules

- **Title (26px):** 1.15 
- **Headings (20px) & Meta (14px):** 1.33 
- **Body (16px):** 1.4 

---

## Spacing System

All spacing uses an **8px base unit** for consistent vertical rhythm.

```css
:root {
  --spacing-unit: 8px;
  --side-padding: 16px;
  
  /* Spacing scale */
  --spacing-xsmall: 16px;      /* 2 × 8px */
  --spacing-small: 24px;       /* 3 × 8px */
  --spacing-medium: 32px;      /* 4 × 8px */
  --spacing-large: 64px;       /* 8 × 8px */
  --spacing-xlarge: 80px;      /* 10 × 8px */
  --spacing-xxlarge: 96px;     /* 12 × 8px */
  --spacing-section: 128px;    /* 16 × 8px - Between page sections */
  --spacing-casestudy: 160px;  /* 20 × 8px - Top padding for case study sections */
}
```

### Spacing Usage Guide

**Between page sections:** `var(--spacing-section)` (128px)  
Used between Hero → Intro, Intro → Experience, Experience → Case Studies

**Case study section padding:** `var(--spacing-casestudy)` (160px)  
Applied to top of CONTEXT, PROBLEM, GOAL, SOLUTION, PROCESS sections

**Extra large spacing:** `var(--spacing-xxlarge)` (96px)  
For generous section breaks or special layout needs

**Between cards/items:** `var(--spacing-large)` (64px)  
Vertical spacing between case study cards, playground items

**Between content blocks:** `var(--spacing-medium)` (32px)  
Paragraph spacing, image-to-caption spacing

**Between related elements:** `var(--spacing-small)` (24px)  
Heading-to-paragraph, list item spacing

**Tight spacing:** `var(--spacing-xsmall)` (16px)  
Label-to-value, icon-to-text

---

## Interactive States

Primary interaction patterns use **opacity changes** and **text underlining**.

**Hover states:**
- Links and interactive text: Reduce opacity to `0.7`
- Maintain underline decoration on links

---

### Focus States

All interactive elements must have visible focus states for keyboard navigation:

```css
a:focus,
button:focus {
  outline: 2px solid var(--color-text-primary);
  outline-offset: 2px;
}
```

### Alt Text

All images must have descriptive alt text:
- Decorative images: `alt=""`
- Content images: Describe what's shown
- Functional images: Describe purpose/action

### Semantic HTML

- Use proper heading hierarchy (H1 → H2 → H3)
- Use `<nav>` for navigation
- Use `<main>` for primary content
- Use `<footer>` for footer content
- Use `<article>` for case studies

---

## Version History

**v2.0** (March 30, 2026)
- Container: 768px with 12 columns (42px columns, 24px gutters)
- Reading column: 504px (7 columns + 6 gutters)
- Secondary text: `#6F6F6F` (WCAG AA compliant)
- Mobile breakpoint: 480px
- Added: `--spacing-xxlarge: 96px`

---

