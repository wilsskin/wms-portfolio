# Portfolio Redesign — Implementation Plan

> **Figma design reference:** https://www.figma.com/design/j3HHoFFm5OmSZaN8ftKmRk/Portfolio?node-id=5071-451
> **Live site:** https://wilsonskinner.com
> **Tech stack:** HTML, CSS, vanilla JS (no framework). Static site hosted on Vercel via GitHub.

---

## Important: Animation Quality

For all animations in this project, consult the `/email` skill (or any relevant motion/animation skill available) to ensure animations feel modern, smooth, and polished. Use CSS transitions and keyframes with appropriate easing curves — avoid linear timing. Animations should feel intentional and refined, not generic.

---

## Sprint 1: New Grid System

**Goal:** Reduce the outer container from 948px to 816px. The outer container includes 24px of padding on each side, so the visible content area shrinks from 900px to 768px. Update the reading column from 515px to 504px. Scale all images and thumbnail containers proportionally.

### Container model (important — do not double-count padding)

The current site uses an outer container of `948px` with `24px` of left/right padding, yielding a `900px` content frame. The new design follows the same pattern:

| Property | Old Value | New Value |
|----------|-----------|-----------|
| Outer container (`max-width`) | 948px | 816px |
| Left/right padding on container | 24px each | 24px each |
| Visible content width | 900px | 768px |
| Reading column | 515px | 504px |
| Columns | 12 | 12 |
| Gutter width | 24px | 24px |

### What to change

- Find all CSS where the outer container `max-width` is set to `948px` and change it to `816px`. The `24px` left/right padding stays the same.
- Find all CSS where the content width or inner max-width is `900px` and change to `768px`.
- Update the reading column width from `515px` to `504px` wherever it's used for paragraph text, case study headings, case study descriptions, and summaries.
- **All pages must be updated:** homepage (`/`), about page (`/about`), and all case study pages (`/cargurus`, `/bodegabay`, `/jumbocode`).

### Images, thumbnails, and media containers

The current site already has responsive images that scale within the 900px container. Since we are just shrinking the container, all images and thumbnail areas should naturally scale down proportionally. **Do not manually resize individual images.** The existing responsive behavior (percentage-based widths, `max-width: 100%`, etc.) should handle this automatically.

Specifically verify:
- Case study hero thumbnail rows (the 3-phone mockup for CarGurus, the 2-image layout for Bodega Bay and JumboCode) still fill the full `768px` content width and maintain their existing aspect ratios.
- All images within the reading column (504px) scale down proportionally.
- The Playground section card grid adapts naturally.
- No images overflow their containers or get clipped.

### What NOT to change

- Font sizes, line heights, and tracking values remain the same.
- The `24px` left/right padding on the container stays the same.
- Image aspect ratios stay the same — everything just scales down proportionally.
- Footer width follows the container naturally.

### Sprint 1 Verification Checklist

After completing Sprint 1, verify all of the following:

- [ ] Outer container `max-width` is `816px` (not `948px`) across all pages
- [ ] Content area renders at exactly `768px` wide (816 - 24 - 24) on desktop
- [ ] Reading column is `504px` wide for all paragraph text, headlines, and summaries
- [ ] Homepage: case study thumbnail rows fill the full `768px` content width with correct ratios
- [ ] Homepage: Playground cards adapt to narrower container without breaking
- [ ] CarGurus case study page: all images, thumbnail rows, and text containers render correctly within `768px`
- [ ] Bodega Bay case study page: same check
- [ ] JumboCode case study page: same check
- [ ] About page: all content fits within the new container
- [ ] No images overflow, get clipped, or change aspect ratio
- [ ] No horizontal scrollbar appears at any viewport width
- [ ] Footer aligns to the new container width
- [ ] Test at viewports: 1440px, 1280px, 1032px, 816px, 768px, 480px, 375px

---

## Sprint 2: Left Side Navigation

**Goal:** Replace the current horizontal top nav with a fixed left-side vertical nav. On case study pages, add section anchor links to the sidebar. Implement responsive fallback to the existing hamburger menu at 1,032px.

### Layout Structure (Desktop — above 1,032px)

The page uses a three-column structure:

```
| Side Nav (108px max) | auto gap | Main Content (816px outer / 768px content) | auto gap | Empty (108px max) |
```

- **Left column (side nav):** `max-width: 108px`, `width: 100%`. The nav content inside this column is `position: fixed` and pinned `24px` from the top and `24px` from the left edge of the viewport.
- **Center column (main content):** The same `816px` outer container from Sprint 1 with `24px` padding, producing `768px` of content. Centered on the page.
- **Right column (empty):** `108px` max-width. Always empty — exists purely for visual symmetry so the main content stays centered.
- **Gaps between columns:** Set to `auto` so they stretch to fill the full viewport width.

### Breakpoint math

The responsive breakpoint is `1,032px`. This is the point at which the auto gap between the side nav column and the main container would shrink below a usable margin. Below this width, the side nav hides and the hamburger menu takes over.

**Important:** Do not double-count the `24px` container padding as gap space. The `24px` padding is internal to the `816px` container. The auto gaps between the three columns are separate. At exactly `1,032px` viewport width: `108 + 0 + 816 + 0 + 108 = 1,032px` (the gaps hit zero, which is the trigger to switch layouts).

### Responsive Behavior (at or below 1,032px)

- The left side nav **hides entirely** (`display: none` or equivalent).
- The right empty column also hides.
- The existing hamburger menu pattern takes over exactly as it works today: logo on the left, hamburger icon on the right, expandable mobile menu with close button.
- **Reuse the exact same HTML, CSS, and JS** currently on the site for the hamburger menu. No changes to mobile nav design, animation, or behavior.
- The case study section links (Context, Problem, Goal, etc.) **do NOT appear** in the hamburger menu. They only exist in the desktop side nav.

### Side Nav Specs (Desktop)

#### Position and spacing
- `position: fixed`
- `top: 24px`
- `left: 24px`

#### Logo
- W mountain logo in a `28×28px` frame
- Positioned at top-left of the side nav (24px from top, 24px from left of viewport)
- The logo links to the homepage (`/`)

#### Main nav links
- `44px` gap between the bottom of the logo frame and the first nav link ("Work")
- Links stacked vertically: **Work**, **About**, **Resume**
- Gap between each link: `8px`
- Font: Inter Regular (400 weight), 16px, `-0.32px` letter-spacing, `line-height: 1.4`
- Active link (current page): `color: #000000`
- Inactive links: `color: #6F6F6F`

### What to remove from the current site

1. **The horizontal top nav bar** — the `<nav>` or header element containing logo on the left and Work/About/Resume links on the right. Remove this entirely for desktop viewports above `1,032px`. It is replaced by the fixed left side nav.
2. **The horizontal sticky case study section nav** — on case study pages (`/cargurus`, `/bodegabay`, `/jumbocode`), there is currently a horizontal sticky bar with anchor links (Context | Problem | Goal | Solution | Process) that appears as the user scrolls. This looks like a `<ul>` with horizontal `<li>` items, styled as a sticky bar. **Remove this element entirely from the DOM for desktop viewports.** It is replaced by the sidebar section links described below. On mobile (below 1,032px), this element is also removed — it does not persist in any form.
3. **The `← Back` link** at the top of case study pages — evaluate whether this is still needed with the new side nav (the "Work" link in the sidebar serves the same purpose). If it's redundant, remove it.

### Case Study Sidebar Section Links (Desktop only, above 1,032px)

On case study pages (`/cargurus`, `/bodegabay`, `/jumbocode`), the side nav gets additional section anchor links below the main nav.

#### Structure (top to bottom within the side nav)

1. Logo (28×28px frame)
2. `44px` gap
3. Work / About / Resume (stacked, `8px` gap between each)
4. `~32px` gap (visual separation between main nav and case study nav)
5. **Case study label pill** — e.g., "CARGURUS"
6. `8px` gap
7. Section links: **Context**, **Problem**, **Goal**, **Solution**, **Process** (stacked, `8px` gap between each)

#### Case study label pill styling

Use the **exact same pill styling** that currently exists on the case study pages for section labels (the rounded rectangle with a subtle border and all-caps text that appears above sections like "CONTEXT", "PROBLEM", etc.). Match the existing `border`, `border-radius`, `padding`, `font-size`, `letter-spacing`, `text-transform: uppercase`, and `color` values from the current CSS. The pill is a passive label — not clickable, no hover state, no cursor change.

#### Section link specs

- Font: Inter Regular (400 weight), 16px, same specs as main nav links
- Active section (current scroll position): `color: #000000`
- Inactive sections: `color: #6F6F6F`
- Each link scrolls to its corresponding section anchor — use the **same anchor IDs** currently on the site (`#hero` or `#context`, `#problem`, `#goal`, `#solution`, `#process`)
- Clicking a link should trigger smooth scrolling to the target section

#### Scroll-based active state (reuse existing logic)

The current site already has JavaScript that detects which section is in view and highlights the corresponding nav link (used for the horizontal sticky nav). **Reuse this exact logic.** The Intersection Observer setup, threshold values, and scroll detection should remain unchanged. The only change is the target: instead of adding/removing an active class on the horizontal `<li>` elements, apply it to the new vertical sidebar `<a>` elements. The active class should set `color: #000000` and inactive should be `color: #6F6F6F`.

#### Staggered animation on entry

The case study section links (the pill label + Context/Problem/Goal/Solution/Process) should **not be visible on initial page load**. They animate in after the **user makes their first scroll movement** on the case study page.

- **Initial state:** All case study nav items (pill + 5 section links) are hidden with `opacity: 0` and `transform: translateX(-12px)`.
- **Trigger:** First `scroll` event on the page. Use a one-time scroll listener that removes itself after firing (`{ once: true }` option or manual removal).
- **Animation:** Each item fades in and slides right to its final position. Staggered: the pill animates first, then each section link follows in order (Context → Problem → Goal → Solution → Process).
- **Stagger delay:** `50-75ms` between each item (so the full sequence takes ~300-450ms to complete).
- **Duration per item:** `300-400ms`.
- **Easing:** Modern ease-out or custom cubic-bezier. Consult the `/email` skill for recommended values.
- After animation completes, remove the inline styles or animation classes so the elements are in their natural state.

### Sprint 2 Verification Checklist

After completing Sprint 2, verify all of the following:

**Desktop layout (above 1,032px):**
- [ ] Side nav is visible with logo at 24px/24px from viewport top-left
- [ ] Work/About/Resume links appear below logo with 44px gap, stacked vertically with 8px gaps
- [ ] Active page link is `#000000`, inactive links are `#6F6F6F`
- [ ] The old horizontal top nav bar is completely gone — no remnant elements, no extra spacing at the top of the page
- [ ] Main content container is centered at `816px` outer / `768px` content
- [ ] Layout is visually symmetrical (empty right column balances the left nav)

**Case study pages (desktop, above 1,032px):**
- [ ] Case study pill label appears below the main nav with correct pill styling (matches existing section label style)
- [ ] Section links (Context, Problem, Goal, Solution, Process) appear below the pill
- [ ] On initial page load, case study section links are hidden
- [ ] On first scroll, section links animate in with staggered fade+slide — pill first, then each link in order
- [ ] Animation feels smooth, subtle, and modern (no jarring movements, no linear timing)
- [ ] After animation, links remain visible for the rest of the page session
- [ ] Active section highlights correctly based on scroll position
- [ ] Clicking a section link smooth-scrolls to the correct section
- [ ] The old horizontal sticky section nav is completely removed from the DOM
- [ ] The `← Back` link is removed if redundant with the sidebar "Work" link

**Responsive (at or below 1,032px):**
- [ ] Side nav is hidden (`display: none`)
- [ ] Hamburger menu appears with logo left / hamburger icon right — identical to current behavior
- [ ] Hamburger menu opens and closes with the same animation as current site
- [ ] Case study section links do NOT appear in the hamburger menu
- [ ] The old horizontal sticky section nav is also removed on mobile — not just hidden
- [ ] No layout shifts or flashes when crossing the 1,032px breakpoint

**Cross-viewport testing:**
- [ ] Test at: 1440px, 1280px, 1032px, 1031px, 768px, 480px, 375px
- [ ] No horizontal scrollbar at any viewport width

---

## Sprint 3: Hero Image Resize and Animation

**Goal:** Replace the current full-width hero image (which sits below the headline) with a smaller, centered, black-and-white panoramic image that sits above the headline. Add a hover/tap interaction that expands the image to full color with a "worth the 3am" caption.

### Current state (what to change from)

On the current live site, the hero section is structured as:
1. Headline text (full-width, large)
2. Full-width hero mountain image below the headline
3. "worth the 3am." caption below the image (visible by default or on tap)

### New state (what to change to)

The hero section is restructured as:
1. Small panoramic B&W mountain image (centered, above the headline)
2. Headline text (centered, below the image)
3. Large gap before the first case study

The "worth the 3am." caption is hidden by default and appears on hover (desktop) or tap (mobile).

### Default State (Desktop, above 1,032px)

- **Image dimensions:** `288px` wide × `104px` tall (2.76:1 aspect ratio)
- **Position:** Centered horizontally within the `768px` content area
- **Treatment:** Black-and-white via CSS `filter: grayscale(100%)`, with a subtle noise texture overlay
- **Border radius:** `8px`
- **Opacity:** `1.0` (full opacity — do NOT reduce)
- **Box shadow:** Subtle, e.g., `0px 0px 8px rgba(0,0,0,0.1)` — match the Figma design
- **"worth the 3am."** caption: hidden (`opacity: 0`, not `display: none` — so it can transition in)
- **"Tap to reveal"** text: hidden on desktop
- **Cursor:** `pointer` on the image container to indicate interactivity

### Hover State (Desktop)

On hover of the image container:

- **Image expands** from `288×104px` to `504×183px` (maintaining the exact 2.76:1 ratio)
- **Expansion animates from center** — the image grows outward equally in all directions. Use `transform: scale()` originating from center, or animate width/height with the container centered.
- **Filter transitions** from `grayscale(100%)` to `grayscale(0%)` (full color)
- **Noise overlay fades out** (`opacity: 1` → `opacity: 0`)
- **"worth the 3am."** caption fades in below the image (`opacity: 0` → `opacity: 1`, with a slight upward translate of ~8px)
- **Transition duration:** `400-500ms`
- **Easing:** Smooth ease-out or custom cubic-bezier. Consult the `/email` skill for modern easing curves. The transition should feel organic, not mechanical.
- On mouse leave, all properties transition back to the default state with the same duration and easing.

### Noise Texture Implementation

- Use a CSS pseudo-element (`::after`) on the image container
- Apply a noise texture via an SVG filter (`<feTurbulence>`) or a repeating semi-transparent noise PNG
- The noise layer sits on top of the image with `pointer-events: none` so it doesn't interfere with hover/click events
- Noise opacity in default state: ~`0.15-0.25` (subtle, adds film grain texture without obscuring the image)
- Noise opacity on hover: `0` (fades out with the grayscale transition)

### Mobile Behavior (below 480px)

On screens below `480px`:

- **Image width:** `100%` of the container (full-width, edge-to-edge within the container padding)
- **Image height:** Maintains the `2.76:1` aspect ratio (use `aspect-ratio: 2.76 / 1` or percentage-based padding)
- **Default treatment:** Black-and-white with noise filter (same as desktop default)
- **Border radius:** `8px` (same as desktop)
- **Interaction:** On **tap** (click event), the image transitions to full color, noise fades out, and the "worth the 3am." caption animates in below the image
- The image does **NOT** change size on mobile — it stays full-width. Only the color and caption change.
- **Caption animation:** Fade in with a subtle upward slide (~8px translateY), same easing as desktop hover, ~300-400ms duration
- On **second tap** or **tap outside the image area**, it transitions back to B&W, noise fades back in, caption animates out (reverse of the entry animation)
- This is toggle behavior — implement with a JS click handler that toggles a class (e.g., `.hero-image--active`)

### Tablet Behavior (480px to 1,032px)

- Image displays at `288×104px` centered (same as desktop default size)
- Default treatment: B&W with noise (same as desktop)
- Tap interaction: Same toggle as mobile (B&W ↔ color + caption). Image does **NOT** expand — stays at `288×104px`.

### Headline Specs (repositioned — now below the image)

- The headline moves **below** the image (currently it's above the image on the live site)
- **Container width:** `420px`, centered within the `768px` content area
- **Font:** Inter Medium (500 weight), `26px`, `-1.3px` letter-spacing, `line-height: 1.15`, `text-align: center`
- First sentence ("Wilson is a product designer who builds software from 0→1."): `color: #000000`
- Second sentence ("Previously at startups and CarGurus."): `color: #6F6F6F`

### Hero Section Spacing

| Element | Value |
|---------|-------|
| Top of content container to top of image | `96px` (padding-top) |
| Bottom of image to top of headline | `12px` |
| Headline text container width | `420px` centered |
| Bottom of headline to first case study section | `120px` (padding-bottom / margin-bottom) |

### Sprint 3 Verification Checklist

After completing Sprint 3, verify all of the following:

**Desktop default state (above 1,032px):**
- [ ] Image renders at exactly `288×104px`, centered in the content area
- [ ] Image is black-and-white (`grayscale(100%)`)
- [ ] Noise texture is visible over the image (subtle film grain, not heavy)
- [ ] Border radius is `8px`
- [ ] Box shadow is present and subtle
- [ ] "worth the 3am." caption is invisible
- [ ] Headline appears below the image (NOT above, as on the current site)
- [ ] Headline is centered at `420px` width
- [ ] "Previously at startups and CarGurus." text is `#6F6F6F`
- [ ] Cursor shows `pointer` when hovering over image area
- [ ] Spacing: 96px top padding → image → 12px gap → headline → 120px bottom gap → first case study

**Desktop hover state:**
- [ ] Image smoothly expands to `504×183px` from center (no corner-anchored scaling)
- [ ] Image transitions from B&W to full color
- [ ] Noise texture fades out completely
- [ ] "worth the 3am." caption fades in below the image with subtle upward slide
- [ ] All transitions complete in ~400-500ms with smooth easing (no linear, no jank)
- [ ] On mouse leave, all properties smoothly return to default state
- [ ] No layout shift in surrounding content during expansion (the headline and case studies should accommodate the size change smoothly)

**Tablet (480px to 1,032px):**
- [ ] Image at `288×104px` centered, B&W with noise
- [ ] Tap toggles B&W ↔ color + caption
- [ ] Image does NOT change size on tap
- [ ] Caption animation is smooth

**Mobile (below 480px):**
- [ ] Image is full container width, maintains 2.76:1 aspect ratio
- [ ] Image is B&W with noise filter
- [ ] Tap toggles B&W ↔ full color
- [ ] "worth the 3am." caption animates in cleanly on tap (fade + upward slide)
- [ ] Second tap or tap outside returns to B&W, caption animates out
- [ ] Image does NOT change size — only color and caption toggle
- [ ] Border radius remains `8px`

**Cleanup:**
- [ ] The old full-width hero image layout is completely removed
- [ ] No remnant CSS or HTML from the old hero section remains
- [ ] The old "Tap to reveal" interaction is removed or replaced by the new toggle behavior

---

## Color Reference (applies to all sprints)

| Usage | Color | Notes |
|-------|-------|-------|
| Primary text | `#000000` | Headlines, active nav links, body text |
| Secondary text | `#6F6F6F` | Inactive nav links, "Previously" text, case study summaries, company names |
| Background | `#F8F8F8` | Page background |
| DO NOT USE | `#727272` | Old secondary color — fails WCAG AA on white. Find and replace ALL instances with `#6F6F6F`. |

---

## Implementation Order

1. **Sprint 1 (Grid System)** — Do this first. Foundation for everything else. Smallest scope, lowest risk. Complete the Sprint 1 verification checklist before moving on.
2. **Sprint 2 (Side Nav)** — Biggest structural change. Depends on Sprint 1 being complete so the three-column layout math works with the `816px` outer container. Complete the Sprint 2 verification checklist before moving on.
3. **Sprint 3 (Hero Image)** — Depends on Sprint 2 being complete so the hero section spacing is finalized and the side nav doesn't interfere with the hero layout. Complete the Sprint 3 verification checklist to confirm everything works.

Complete each sprint's verification checklist before moving to the next sprint.
