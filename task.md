# CPED Optimization and Cleanup Checklist

- `[x]` Item 1: Rename `CPED hero backround.png` to `cped-hero-background.png` and update all references
- `[x]` Item 2: Delete root level `image for academics.png`
- `[x]` Item 3: Reduce font families from 4 to 2 (standardize on Bitter and DM Sans)
- `[x]` Item 5: Restructure and split Javascript functions modularly
- `[x]` Item 6 & 7: Throttle scroll event handler and integrate media queries for `prefers-reduced-motion`
- `[x]` Item 8: Consolidate CSS variable names and converge gold values to `#FFB800`
- `[x]` Item 9 & 10: Cleanup unused assets directory and unify mobile breakpoints to `768px`
- `[x]` Item 11: Add inline layout math comments to the hero CSS rules
- `[x]` Item 12: Implement mock client-side search indexing system in JavaScript
- `[x]` Item 14: Consolidate 16 static HTML placeholder pages into a single DRY EJS subpage template
- `[x]` Item 15 & 18: Move raw z-index layers to variables (reverted hero positioning and mobile heights to verified values per instruction)
- `[x]` Verify critical safeguards: (a) Watermark behind building facade, (b) Badge & signage spacing
- `[x]` low severity checks: HTML accessibility, JSON-LD metadata, static sitemap/robots generation, and Vite optimization settings
- `[x]` Final production compilation check
- `[x]` Consolidate background colors: Academics & Outcomes sections use canonical `--off-white`; Resources section uses brand-tinted `rgba(15, 82, 136, 0.04)` Option A.
- `[x]` Confirm `--footer-bg` is unused in rendered output, and document the high-contrast button role of `--dark-section` in the variables file.
- `[x]` Map hardcoded subpage background gradient values (#021a30 and #003a65) to variables (`--brand-navy-midnight` and `--brand-navy-deep`).
