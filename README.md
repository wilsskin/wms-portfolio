# wilson-skinner.com

Personal portfolio website for Wilson Skinner — product designer and builder. Features a homepage with project thumbnails and case studies for selected work.

## Purpose

A hand-coded static site intentionally built without frameworks or a build step. The goal is a fast, readable, easy-to-maintain portfolio with full control over markup and styling.

## Tech Stack

- **HTML5** — semantic markup, one file per page
- **CSS3** — custom properties (design tokens), no preprocessor
- **Vanilla JavaScript** — no dependencies
- **Node.js** — minimal local dev server (`server.js`)
- **Vercel** — production deployment with clean URL routing

## Structure

```
wilson-skinner/
├── index.html              # Homepage (hero + project thumbnails)
├── pages/
│   ├── about.html          # About page (bio, experience, interests)
│   ├── cargurus.html       # Case study: CarGurus
│   ├── bodegabay.html      # Case study: Bodega Bay Lavender
│   └── jumbocode.html      # Case study: JumboCode
├── assets/
│   ├── style.css           # Global styles and design tokens
│   ├── index.js            # Global JavaScript (nav, interactions)
│   ├── case-nav.js         # Case study sidebar scroll/active tracking
│   ├── cargurus.css        # CarGurus case study styles
│   ├── bodegabay.css       # Bodega Bay case study styles
│   ├── jumbo.css           # JumboCode case study styles
│   ├── VCROSDMono.woff2    # Custom monospace font
│   └── media/              # Images, videos, icons (~27MB)
│       ├── cargurus/
│       ├── bodegabay/
│       ├── jumbocode/
│       ├── playground/
│       ├── about/
│       ├── index/
│       └── icons/
├── server.js               # Local dev server (mirrors Vercel routing)
├── vercel.json             # Vercel deployment + URL rewrite config
└── package.json            # npm scripts only, no dependencies
```

## Routing

Clean URLs are handled in two places that mirror each other:

- **Locally:** `server.js` rewrites `/:slug` → `/pages/:slug.html`
- **Production:** `vercel.json` rewrites `/:slug` → `/pages/:slug.html`

So `/about` serves `pages/about.html`, `/cargurus` serves `pages/cargurus.html`, etc.

## Design Tokens

Global CSS variables are defined at the top of `assets/style.css`:

```css
--color-bg: #F8F8F8
--color-text-primary: #000000
--color-text-secondary: #727272
--spacing-unit: 8px
--type-size-title: 26px
--type-size-heading: 20px
--type-size-body: 16px
```

## Key Interactions

- **First-paint gate** — page is hidden until resources load to prevent image flashing
- **Mobile menu** — overlay nav toggled via `toggleMobileMenu()` / `closeMobileMenu()`
- **Case study sidebar** — `case-nav.js` tracks scroll position and highlights active section
- **Interest photo captions** — hover on desktop, tap-to-reveal on mobile
- **Hero image tap-to-reveal** — mobile-specific homepage interaction

## Local Development

```bash
npm run dev
```

Starts a local server at `http://localhost:3000`. No build step required — edit files and refresh.

## Deployment

Deployed on Vercel. Push to `main` triggers an automatic deployment.
