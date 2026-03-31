# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start local dev server at http://localhost:3000
```

No build step. Edit files and refresh the browser.

## Architecture

Static site — no frameworks, no preprocessor, no bundler. One HTML file per page in `pages/`, one CSS file per case study in `assets/`. Routing: `/:slug` → `/pages/:slug.html` (mirrored in `server.js` locally and `vercel.json` in production). First-paint gate: `html` starts `opacity: 0`; JS adds `.ready` after load.

## Design

Wilson is a product designer. The aesthetic is modern and minimal — clean hierarchy, generous whitespace, grayscale palette. The full design system (tokens, spacing, typography, color) lives in `DESIGN_SYSTEM.md` — read it before making any visual changes.

## How to work with Wilson

- **Prefer simple solutions.** Vanilla HTML/CSS/JS over any abstraction. The site intentionally has no build step or framework.
- **Offer options with tradeoffs** when there's more than one reasonable approach. Don't just pick one silently.
- **Ask rather than guess** on any implementation detail that isn't obvious — Wilson prefers a quick question over an assumption that needs to be undone.
- Wilson is not an experienced engineer, so explain the reasoning behind technical decisions clearly.
