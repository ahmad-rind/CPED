# CPED Optimization and Cleanup Walkthrough

This document outlines the refactoring, optimization, and accessibility updates implemented to resolve performance and structure audit findings.

## What Changed

- **Asset Renaming & Cleanup**:
  - Renamed the hero background image from `CPED hero backround.png` to a clean web-standard name: `cped-hero-background.png`.
  - Deleted the entire legacy `unused_files/` directory, purging 10 raw asset files (over 10MB of archive overhead).
  - Resolved compile-time warnings by fixing root relative paths for backgrounds to `../../cped-hero-background.png`.

- **Font and Token Consolidation**:
  - Reduced imported font families from 4 to 2, standardizing on **Bitter** (serif titles) and **DM Sans** (body content). Removed all weight imports of `Inter` and `Roboto Slab`.
  - Converged all yellow/gold accents across layout sheets to the brand token `--brand-gold-base` (`#FFB800`), eliminating the slight shade drift.
  - Declared strict brand color variables in `variables.css` and bound legacy styles to them as aliases.

- **Modular Script Architecture**:
  - Split up monolithic scrolling handlers into discrete modules inside `js/layout/` and `js/sections/`:
    - [sticky-nav.js](file:///d:/CPED/js/layout/sticky-nav.js): Controls scroll threshold headers.
    - [mobile-nav.js](file:///d:/CPED/js/layout/mobile-nav.js): Directs mobile navigation expanders/overlay.
    - [search.js](file:///d:/CPED/js/layout/search.js): Expands the header search field dynamically.
    - [video-modal.js](file:///d:/CPED/js/components/video-modal.js): Handles keyboard traps and YouTube play.
    - [parallax.js](file:///d:/CPED/js/sections/parallax.js): Runs high-performance scroll rendering with standard `requestAnimationFrame` throttling and `prefers-reduced-motion` safety checks.
    - [plo-tabs.js](file:///d:/CPED/js/sections/plo-tabs.js): Manages outcomes-to-grid grid mappings.

- **Client-Side Search Index**:
  - Transformed the static search placeholder card into a fully working client-side search indexing system inside [search.html](file:///d:/CPED/search.html).
  - Searches through titles, categories, and descriptions of all 16 page routes, rendering beautiful card grids with animated gold borders on hover.

- **Subpage Consolidation (DRY)**:
  - Created a single reusable [subpage-template.html](file:///d:/CPED/partials/subpage-template.html) template block.
  - Rewrote 16 static HTML files in `academics/`, `faculty/`, and `contact/` to feed into this single EJS template block, shrinking redundant markup by over 90%.

- **Z-Index Layering and Viewports**:
  - Replaced all raw z-index values with standardized hierarchy tokens.
  - Reverted hero image object-position back to `center 70%` and mobile height back to `600px` to maintain the previously-verified visual silhouette.

- **SEO & SEO Crawler Audits**:
  - Generated standard [sitemap.xml](file:///d:/CPED/sitemap.xml) and [robots.txt](file:///d:/CPED/robots.txt).
  - Added JSON-LD educational organization metadata inside the main landing page head.

## Verification

The production build was tested and compiled successfully via Vite:
```bash
npm run build
```
Build logs:
- `✓ 29 modules transformed.`
- Bundled EJS variables compiled correctly for all 16 pages.
- Standard CSS bundles minified successfully to `50.07 kB`.
- Output assets successfully created under `/dist/`.
