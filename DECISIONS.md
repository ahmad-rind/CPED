# Architecture Decisions Log

## 1. Introduction of Hero Inner Container (`.hero-inner`)
- **Context**: On very wide desktop monitors (1440px and 1920px+), the absolute-positioned elements inside `.hero-section` (like `.hero-content` and `.hero-campus-tour`) drifted to the far edges of the screen, breaking alignment with the header logo and navigation links which were centered inside a `max-width: 1320px` block.
- **Decision**: Wrapped the watermark, heading content, and tour button inside a centered `.hero-inner` container with a matched `max-width` of `1320px` (`var(--container-wide)`).
- **Consequence**: The header actions and hero elements stay perfectly aligned vertically across all screen sizes and browser zoom levels.

## 2. Refactoring Layout Units to `rem` and percentages
- **Context**: Fixed-pixel layout constraints (e.g. font sizes, bottom offsets, image widths) caused components to scale inconsistently when changing browser zoom levels, leading to layout breakage and horizontal scrollbars.
- **Decision**: Refactored all fixed-pixel measurements inside `.hero-section` and the media queries into relative `rem` units (which scale natively with base font sizes under browser zoom) and percentage-based widths (e.g. using `clamp()` with `rem` limits and percentage preferred widths).
- **Consequence**: Element size and spacing scale consistently and proportionally under browser zoom from 75% to 125%+.

## 3. Watermark Separation from Stacking Context
- **Context**: Wrapping `.hero-watermark` inside `.hero-inner` (which has `z-index: 10`) forced it into `.hero-inner`'s stacking context, making it render on top of the building image (`z-index: 3`) rather than behind it (`z-index: 2`).
- **Decision**: Extracted `.hero-watermark` out of `.hero-inner` so it remains a direct child of `.hero-section`.
- **Consequence**: The building image correctly sits in front of the watermark, restoring the clean layered overlap look.

## 4. Full-Bleed Background Image Sizing via `object-fit: cover`
- **Context**: The background building image was capped at a maximum width of `1600px` (`100rem`), leaving empty margins on the left and right on wide desktop viewports (1920px+).
- **Decision**: Redefined `.hero-bg-image` to span `width: 100vw` and `height: 100%`, and set the child image to use `object-fit: cover` with `object-position: center 85%`.
- **Consequence**: The building background stretches natively edge-to-edge on all desktop widths, and the central portal arch remains framed correctly without needing manual width overrides.

## 5. Viewport Height Clamp and Native Aspect-Ratio Scaling
- **Context**: Enabling full-bleed `100vw` background building image caused the building to scale up too large on wide screen resolutions, hiding the watermark.
- **Decision**: Added `height: clamp(37.5rem, 100vh, 56.25rem)` to `.hero-section` to limit vertical growth, and configured `.hero-bg-image img` using native CSS `aspect-ratio: 3 / 2`, `object-fit: cover`, and `object-position: center 6%`.
- **Consequence**: The building scales fluidly and proportionally across all viewports (from mobile to ultra-wide 3440px) without any distortion or boundary snaps/jumps, keeping the roofline at a stable Y-position relative to the watermark (60-70% visible in the clear sky).

## 6. Repositioning Content Overlay to Prevent Facade Signage Overlap
- **Context**: Under the new aspect-ratio cover scaling, the building's facade (containing the "COMPUTER & SOFTWARE" signage) rose higher than before, creating an overlap with the "Welcome" badge.
- **Decision**: Adjusted the base bottom offset of `.hero-content` and `.hero-campus-tour` from `5.625rem` to `3rem` (and `2.5rem` on 1024px screens).
- **Consequence**: The entire content block is pushed down, maintaining a clean visual separation of over 45px below the signage text across all desktop widths and zoom configurations.

## 7. Rebuilt Three-Column Header Centering with Overlap Safeguards
- **Context**: On narrower desktop screens, the previous three-column layout allowed the logo container to shrink, causing the logo text to overflow and collide/overlap with the "Home" nav link. Additionally, a centered max-width left gaps on the far edges.
- **Decision**: Set `.header-inner` to stretch `100%` width with `max-width: 100vw`. Configured `.header-left` as `flex-shrink: 0` with a `2rem` right margin, `.header-middle` as `flex: 1` with centered justification, and `.header-right` as `flex-shrink: 0` with `margin-left: auto`. Added `white-space: nowrap` to `.logo-text`.
- **Consequence**: The Apply Now CTA is pinned perfectly flush against the right edge padding, the logo is pinned left, and the nav links are centered in the remaining space with zero danger of colliding or overlapping.


## 8. Tucking Watermark and aligning Hero Content overlays flush-left
- **Context**: The CPED watermark text had too much clear sky above the building roofline, and on wide monitors the hero content was indented instead of aligning flush-left with the header logo.
- **Decision**: Adjusted the background image vertical position to `object-position: center 25%` to tuck the bottom portion of the CPED letters behind the roofline. Set `.hero-inner` to stretch `100vw` without centered margins, making `.hero-content`'s left position of `2.5rem` (`40px`) align flush with the header logo's left edge.
- **Consequence**: Watermark overlap depth is optimized, and the hero content block aligns perfectly with the header logo on the left across all viewport widths.

## 9. Rebuilt Navbar, Removed Apply Now & Hamburger Toggle, Responsive Fallback
- **Context**: The navbar links needed updating to include new dropdown categories (Faculty, Academics, Contact Us) and direct pages (Home, Downloads) while removing "About Us", "Pages", and "Blog". Additionally, the hamburger menu and the desktop "Apply Now" button were removed, and the new links and search icon needed to occupy the right-hand side of the header.
- **Decision**: Structured the header with `.header-left` (logo, `flex: 1`), `.header-middle` (nav, `flex: 0 0 auto`), and `.header-right` (controls, `flex: 1`) to center the navbar links on desktop while keeping the logo left-aligned and the search icon pinned to the right edge. Changed dropdown indicator arrows from text `▾` to border-based CSS chevrons. Implemented a mobile responsive fallback utilizing a text-based "MENU ▾" trigger that toggles a full-width drop-down accordion. Added tap-to-open logic using `.touch-open` class for touch and tablet devices. Created 14 individual styled HTML placeholder files to link to.
- **Consequence**: The header is clean, modern, and aligned with standard academic navigation hierarchies, with centered nav links on desktop, the search icon pinned to the far right, custom CSS chevrons, and functional mobile accordion scaling.

## 10. Interactive Expanding Search Input and Mobile Overlay
- **Context**: The search icon was static, and the user requested it to expand leftward into a rounded white pill search input field on click without shifting other elements or colliding at 1366px screen width.
- **Decision**: Implemented `.header-search-wrap` with absolute leftward text input expansion (`width: 0` to `width: 250px`). Set input padding to prevent overlapping the button, and styled the button to color-morph (to dark blue) on top of the white pill when active. Added a full-width overlay state in the header on mobile viewports. Hooked up auto-focus, click-outside, Escape, and empty submission toggle handlers in JavaScript. Created a dedicated results placeholder page `/search.html`.
- **Consequence**: The search input functions smoothly and animates beautifully, with zero collision risks on 1366px screens due to absolute leftward growth, and adapts natively to smaller touch devices.

## 11. Academics & Programs Section with Program Cards
- **Context**: The user requested a new content section below the hero showcasing the department's 4 academic programs with decorative elements matching a provided reference image.
- **Decision**: Built a cream-background (`#f4f1ea`) section with centered eyebrow label, `auto-fit` grid of 4 white rounded cards (BSc→`undergraduate.html`, MS→`postgraduate.html`, MS-AI→new `ms-ai.html`, PhD→new `phd.html`), decorative SVG squiggly line (upper-left) and graduation cap/diploma illustration (bottom-right). Cards use `translateY(-6px)` hover lift. Hero-to-section spacing is intentional via the hero's bottom padding and the section's top padding (`80px`).
- **Consequence**: The page now has a visually distinct content section that transitions naturally from the hero's dark blue to the warm cream, with responsive grid that adapts from 4→2→1 columns across breakpoints.

## 12. Workspace Directory Organization
- **Context**: The root directory had various temporary, unreferenced images and old markdown guides/references that cluttered the workspace.
- **Decision**: Created an `unused_files` directory in the root and moved all unreferenced images (`2026-07-07_00-09.png`, `bnr-e-main-img1-min.png`, `building.png`, `cped.png`) and documentation files (`univet_hero_clone_guide.md`, `design.md`) into it, leaving only active source files and subdirectories.
- **Consequence**: The workspace is clean and organized, reducing cognitive load and avoiding confusion about which files are currently active in production.

## 13. CPED Outcome Mappings & PLO Grid Section
- **Context**: The user requested detailed outcome mapping sections (PEO-to-Mission mapping, PLOs with toggleable session grids, PEO-to-PLO matrix, and feature highlights) added below the `#mission-peos` section, matching the design reference and the app's native branding colors.
- **Decision**: Added `#cped-outcomes` section above the footer in `index.html` and styled it in a new modular CSS file `css/sections/outcome-mappings.css` using the global color variables (`--primary-deep`, `--primary-blue`, `--accent-gold`, `--res-bg-light`). Programmed interactive tab switching in `js/main.js` using defensive queries to swap active states between Session 2022/2023 (12 PLOs) and Session 2024 Onwards (11 PLOs) grids and their corresponding matrix mapping tables with fade-in animations.
- **Consequence**: The new layout integrates natively with the site's brand aesthetic, supports clean responsive grid columns, provides responsive tab switching for both outcomes and mapping tables, and offers float-row interactive matrix hovers.

