# Project Snapshot: Department of Computer Engineering (CPED) Website

This document provides a single, comprehensive overview of the current state of the CPED website. It is designed to give an AI assistant or developer all the context needed to understand, run, and debug the project without prior knowledge.

---

## 1. Project Overview

### Purpose & Scope
The website serves as the official portal for the **Computer Engineering Department (CPED)**. It showcases academic programs, research groups, department resources, and educational objectives. It is currently styled as a highly responsive, modern multi-page site.

### Tech Stack
*   **Build Tooling / Dev Server**: Vite (with `vite-plugin-ejs` to compile-time inject HTML partial layouts).
*   **Frontend**: Vanilla HTML5, Vanilla JavaScript (ES6+ Modules), and Vanilla CSS3.
*   **Libraries/Assets**: 
    *   Google Fonts (`Bitter`, `DM Sans`)
    *   FontAwesome Icon Toolkit (`cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`)
*   **Local Access**: Must be run via local development server (`npm run dev` at `http://localhost:5173/`). Direct browser viewing (`file://`) is deprecated as EJS templates require compilation.

### Project Directory Structure
```
d:/CPED/
├── academics/                      # Academic Program Pages (Consolidated to template)
│   ├── laboratories.html
│   ├── management.html
│   ├── ms-ai.html
│   ├── phd.html
│   ├── postgraduate.html
│   └── undergraduate.html
├── contact/                        # Contact & Information Pages (Consolidated to template)
│   ├── alumni.html
│   ├── contacts.html
│   ├── faculty.html
│   └── helpdesk.html
├── css/
│   ├── base/
│   │   └── variables.css           # Global resets, color palettes, and z-index scales
│   ├── layout/
│   │   └── header.css              # Navigation and site header responsive styles
│   ├── sections/
│   │   ├── academics.css           # Grid layouts for program cards
│   │   ├── alert-ticker.css        # Infinite scroll carousel styles
│   │   ├── hero.css                # Hero section and video popup overlay
│   │   ├── latest-action.css       # Timetable link bar styles
│   │   ├── mission-peos.css        # Vision and PEO panels
│   │   ├── outcome-mappings.css    # Outcomes matrices and active tabs
│   │   └── resources.css           # Honeycomb hex grid and cards
│   ├── components/
│   │   └── subpage-placeholder.css # Reusable layout stylesheet for subpages
│   └── styles.css                  # Core unified stylesheet importing all modular CSS sheets
├── faculty/                        # Faculty Subpages (Consolidated to template)
│   ├── collaborations.html
│   ├── labs.html
│   ├── members.html
│   ├── news.html
│   └── projects.html
├── images/                         # Active production image assets
│   ├── CPED logo.webp
│   ├── academics-decor.webp
│   └── slider/                     # Event slide images for coverflow slider
│       ├── 001.webp
│       ├── 003.webp
│       ├── 004a.webp
│       ├── 005.webp
│       ├── 008.webp
│       ├── 009.webp
│       ├── 0010.webp
│       └── cped-2026.webp
├── js/
│   ├── components/
│   │   └── video-modal.js          # Keyboard-trapped YouTube player modal overlay logic
│   ├── layout/
│   │   ├── mobile-nav.js           # Responsive mobile accordion and touch chevrons
│   │   ├── search.js               # Header search bar slide-out and state recovery
│   │   └── sticky-nav.js           # Scroll-threshold sticky header animations
│   ├── sections/
│   │   ├── alert-ticker.js         # News ticker interactivity stub
│   │   ├── parallax.js             # requestAnimationFrame throttled hero scroll rendering
│   │   └── plo-tabs.js             # Swaps active states between session PLO grids and matrices
│   ├── utils/
│   │   ├── benchmark.js            # Scroll performance testing and metric logging
│   │   └── scroll-reveal.js        # IntersectionObserver viewport enter animations
│   └── main.js                     # Central entry script booting all modular JS layers
├── partials/                       # Shared HTML layouts (injected at compile time)
│   ├── header.html                 # Centralized header & navigation layout
│   ├── footer.html                 # Centralized scripts & modal popup layout
│   └── subpage-template.html       # DRY subpage layout block for EJS placeholder injection
├── .gitignore                      # Excluded folders (node_modules, dist)
├── AGENTS.md                       # Workspace developer instructions & context
├── ARCHITECTURE.md                 # Brief project architecture design log
├── CHANGELOG.md                    # Project change history tracking
├── DECISIONS.md                    # Detailed architecture decision log
├── downloads.html                  # Downloads hub page (Consolidated to template)
├── GEMINI.md                       # Project coding rules & constraints
├── index.html                      # Website homepage (Inject templates)
├── package.json                    # Project metadata & npm dependencies
├── robots.txt                      # Crawler index configuration
├── search.html                     # Working client-side search indexing results page
├── sitemap.xml                     # Search engine index XML sitemap of all 18 routes
├── task.md                         # Workspace execution task checklist
├── vite.config.js                  # Vite server & build configurations
├── walkthrough.md                  # Detailed optimization implementation log
└── cped-hero-background.webp       # Consolidated main hero background image
```

---

## 2. Full File Inventory

| File Path | Description | Dependents / Referenced By |
| :--- | :--- | :--- |
| `index.html` | Core landing page of the department website. Imports `partials/header.html` and `partials/footer.html`. | Root entry point. |
| `search.html` | Client-side search page querying site index data. | Referenced by header search forms. |
| `downloads.html` | Consolidated downloads subpage built off DRY subpage template. | Pointers in homepage segments. |
| `academics/*.html` | 6 individual academic portal placeholder files rendered via EJS template. | Nav dropdown links, Academics card links, Resources. |
| `contact/*.html` | 4 individual contact placeholder files rendered via EJS template. | Nav dropdown links, Resources. |
| `faculty/*.html` | 5 individual faculty department placeholder files rendered via EJS template. | Nav dropdown links, Alert Ticker, Resources. |
| `partials/header.html` | Shared header & navigation markup containing EJS placeholders. | Injected into all 18 HTML pages at compilation. |
| `partials/footer.html` | Shared script inclusion tags, closing tags, and conditional video modal wrapper. | Injected into all 18 HTML pages at compilation. |
| `partials/subpage-template.html`| Centrally declared layout block containing heads, font imports, script pointers, and footer hooks. | Injected by all 16 subpages. |
| `css/styles.css` | Entrypoint stylesheet linking modular CSS files. | Referenced in `<head>` by all HTML files. |
| `css/base/variables.css` | CSS Custom Properties, layout resets, and z-index scales. | Imported by `css/styles.css`. |
| `js/main.js` | Boots and imports JS sub-modules. | Loaded at the footer of all HTML files. |
| `js/utils/scroll-reveal.js` | Scroll animations using IntersectionObserver. | Imported by `js/main.js`. |
| `js/utils/benchmark.js` | Performance profiler for scroll FPS and CPU long tasks. | Loaded programmatically via `?benchmark=true` in `js/main.js`. |
| `vite.config.js` | Configures EJS views directory and Rollup entrypoint configs. | Vite engine configuration. |
| `package.json` | Project metadata, scripts, and EJS plugins. | Package manager configuration. |
| `cped-hero-background.webp` | WebP-optimized main hero background image. | Loaded by hero background and mission card. |
| `images/CPED logo.webp` | WebP-optimized department logo icon. | Loaded in `partials/header.html`. |
| `images/academics-decor.webp` | WebP-optimized graduation cap decorative graphic. | Floating cap in Academics section in `index.html`. |
| `images/slider/*.webp` | 8 WebP-optimized image slides (001.webp to cped-2026.webp). | Loaded by the events carousel slider in `index.html`. |

---

## 3. Complete Design Tokens

### CSS Custom Properties (`:root` Variables)

| Variable Name | Value | Purpose / Usage |
| :--- | :--- | :--- |
| **Primary Theme Colors** | | |
| `--brand-navy-light` | `#0F5288` | Main light navy accent. |
| `--brand-navy-dark` | `#003F7D` | Secondary hover borders and highlights. |
| `--brand-navy-deep` | `#003A65` | Main deep background backing accent. |
| `--brand-navy-midnight`| `#021A30` | Midnight navy used for subpage background gradients. |
| `--brand-orange-base` | `#E8651A` | Main call-to-action color. |
| `--brand-orange-hover`| `#DD6B20` | Hover orange highlighting. |
| `--brand-gold-base` | `#FFB800` | Golden accents, welcome banners, and active indicators. |
| **Neutrals** | | |
| `--text-dark` | `#333333` | Global default body text color. |
| `--text-medium` | `#555555` | Secondary descriptive text. |
| `--text-light` | `#666666` | Muted descriptions (e.g. program card body text). |
| `--white` | `#FFFFFF` | Background cards, container frames, headers. |
| `--off-white` | `#F5F5F5` | Canonical light background backing. |
| `--border` | `#E0E0E0` | Standard divider borders. |
| `--footer-bg` | `#0A0A0A` | Unused background (reserved for future footer widgets). |
| `--dark-section` | `#1A1A2E` | Branded high-contrast text color for gold buttons (inline commented). |
| `--cream-bg` | `#f4f1ea` | *DEPRECATED* (Unused, consolidated to `--off-white`). |
| `--res-bg-light` | `#f4f7fc` | *DEPRECATED* (Unused, consolidated to `--off-white` / brand tints). |
| **Gradients & Spacing** | | |
| `--hero-gradient` | `linear-gradient(180deg, rgba(0, 58, 101, 1) 0%, rgba(0, 146, 255, 1) 100%)` | Main top-to-bottom background gradient. |
| `--container-width`| `1200px` | Center alignment max-width width for standard sections. |
| `--container-wide` | `1320px` | Wide desktop width container limits for Header and Hero. |
| **Z-Index Hierarchy Layering Scale** | | |
| `--z-modal` | `1000` | Video popup modals. |
| `--z-header` | `100` | Pinned sticky site header. |
| `--z-overlay` | `99` | Mobile menu backdrop shadow wrapper. |
| `--z-hero-content` | `10` | Hero inner text layout block. |
| `--z-latest-action` | `9` | Action link bars. |
| `--z-alert-ticker` | `8` | Scrolling news tickers. |
| `--z-hero-overlay` | `4` | Dark bottom-dimming gradient overlays. |
| `--z-hero-bg` | `3` | Cover background image frame. |
| `--z-hero-watermark`| `2` | Giant watermark sitting behind the building facade. |

### Font Families

*   **`'Bitter', serif`**: Primary header font. Used for prominent headings, section headings, and program titles.
*   **`'DM Sans', sans-serif`**: Primary body font. Used globally on the `body` tag, card details, paragraphs, and nav menu links.
*   *(Note: Inter and Roboto Slab are fully consolidated and removed from active dependencies).*

### Breakpoint Values (Media Queries)
The CSS uses the following responsive media queries to support desktop, tablet, and mobile layouts:
*   `1440px`: Header spacing adjustments.
*   `1200px`: Resources layout wraps; Mission & PEO blocks align vertically.
*   `1024px`: Desktop header navigation collapses into mobile hamburger triggers. Academics switches to column view.
*   `768px`: Standard mobile layout wrap; action bar stacks vertically; alert tickers shrink.
*   `600px`: Honeycomb hexagonal grid collapses to rectangular cards.
*   `480px`: Mobile menu sizes and hero height limit triggers.
*   `400px`: Resources grids scale down to single column.

---

## 4. Page & Section Inventory

### I. Site Header (`#site-header`)
*   **Controllers**: `css/layout/header.css`, `js/layout/` sub-modules.
*   **Layout & Behavior**: Sticky bar that slides out on scroll-down and transitions in on scroll-up. Mobile collapses menu under chevron accordion accordions.

### II. Hero Section (`#hero`)
*   **Controllers**: `css/sections/hero.css`, [parallax.js](file:///d:/CPED/js/sections/parallax.js).
*   **Layout & Behavior**: Parallax background wrapper calculating scroll offset via `requestAnimationFrame` and checking for `prefers-reduced-motion`. Houses the watermark behind building facade.

### III. Latest Action Bar
*   **Controllers**: `css/sections/latest-action.css`.
*   **Layout & Behavior**: Thin navy banner displaying action links and bullet points.

### IV. Alert Ticker Section
*   **Controllers**: `css/sections/alert-ticker.css`, [alert-ticker.js](file:///d:/CPED/js/sections/alert-ticker.js).
*   **Layout & Behavior**: Infinite scrolling marquee displaying dynamic news. Sits on `--off-white`.

### V. Academics & Programs Section (`#academics-programs`)
*   **Controllers**: `css/sections/academics.css`.
*   **Layout & Behavior**: 2-column flex layout sitting on `--off-white`. Grid of four program cards (BSc, MS, MS-AI, PhD) displaying hover translateY offsets.

### VI. Events Section (`#events`)
*   **Controllers**: `css/sections/events.css`, [events.js](file:///d:/CPED/js/sections/events.js).
*   **Layout & Behavior**: Interactive 3D Coverflow image gallery showing department highlights. Supports automatic progress autoplay loop, mouse dragging, keyboard controls, and touch swipe gestures.

### VII. Explore Resources Section (`#resources`)
*   **Controllers**: `css/sections/resources.css`.
*   **Layout & Behavior**: Honeycomb visual hub. Background uses Option A brand-tinted `rgba(15, 82, 136, 0.04)` to stand apart. Interlocking hex grid of six buttons.

### VIII. Mission & PEOs Section (`#mission-peos`)
*   **Controllers**: `css/sections/mission-peos.css`.
*   **Layout & Behavior**: 2-column Vision mission statement card and Program Educational Objectives panels.

### IX. Video Popup Modal (`#video-modal`)
*   **Controllers**: [video-modal.js](file:///d:/CPED/js/components/video-modal.js).
*   **Layout & Behavior**: Keyboard focus trapping overlay launching YouTube stream overlays.

### X. Outcome Mappings & PLO Grid Section (`#cped-outcomes`)
*   **Controllers**: `css/sections/outcome-mappings.css`, [plo-tabs.js](file:///d:/CPED/js/sections/plo-tabs.js).
*   **Layout & Behavior**: Alignment mapping grids and tables sitting on `--off-white`. Tabs toggle between session matrices.

### XI. Subpage Template Layout
*   **Controllers**: `css/components/subpage-placeholder.css`, [subpage-template.html](file:///d:/CPED/partials/subpage-template.html).
*   **Layout & Behavior**: Centralized layout displaying localized page contents, icons, and navigation buttons.

---

## 5. Known Constraints and History

### Hero Image Bounds Context & Tuning Variables
*   **Hero Image crop/position**: `cped-hero-background.png` is `1536x1024px`. Building silhouette spans vertical y=376 to y=1023.
*   **Hero height limits**: Default `.hero-section` uses `height: clamp(37.5rem, 100vh, 56.25rem);` to restrict vertical growth.
*   **Hero image alignment**: `.hero-bg-image img` uses `object-position: center 70%;` to shift building silhouette up slightly.
*   **Mobile hero height**: Reverted back to a static `600px` height at `@media (max-width: 480px)` to maintain verified aspect layout.
*   **Watermark alignment**: `.hero-watermark` (z-index: `var(--z-hero-watermark) = 2`) sits behind `.hero-bg-image` (z-index: `var(--z-hero-bg) = 3`) to frame visual depth behind building facade.

### Stacking Order (z-index hierarchy)
*   `z-index: var(--z-modal)` (`1000`) — Video Modals.
*   `z-index: var(--z-header)` (`100`) — Sticky Site Header.
*   `z-index: var(--z-overlay)` (`99`) — Mobile nav backdrop shadow.
*   `z-index: var(--z-hero-content)` (`10`) — Hero text blocks.
*   `z-index: var(--z-latest-action)` (`9`) — Action bar.
*   `z-index: var(--z-alert-ticker)` (`8`) — Alert ticker news line.
*   `z-index: var(--z-hero-overlay)` (`4`) — Hero dark overlay.
*   `z-index: var(--z-hero-bg)` (`3`) — Cover image frame.
*   `z-index: var(--z-hero-watermark)` (`2`) — Watermark sitting behind facade.

---

## 6. Assets Inventory

### Image Assets

| File Path | Dimensions | Purpose |
| :--- | :--- | :--- |
| `images/CPED logo.webp` | 282x282px | Branding logo in header. |
| `cped-hero-background.webp`| 1536x1024px | Cover backdrop on hero. |
| `images/academics-decor.webp`| 172x132px | Decorative floating cap in Academics section. |
| `images/slider/001.webp` | 700x325px | Event slide image 1. |
| `images/slider/003.webp` | 700x325px | Event slide image 2. |
| `images/slider/004a.webp`| 700x325px | Event slide image 3. |
| `images/slider/005.webp` | 700x325px | Event slide image 4. |
| `images/slider/008.webp` | 700x325px | Event slide image 5. |
| `images/slider/009.webp` | 700x325px | Event slide image 6. |
| `images/slider/0010.webp`| 700x325px | Event slide image 7. |
| `images/slider/cped-2026.webp`| 700x325px| Event slide image 8. |

### Unused Assets
*   `images/003.jpg`, `images/008.jpg` (legacy photos left in root images folder; not referenced by pages).
*   Original PNG/JPG files corresponding to WebP outputs are kept in source directories for developer reference.

---

## 7. Current Known Issues or TODOs

*   **Subpage Status**: All secondary pages (e.g. program summaries, directories, contacts, and downloads) contain placeholder message boards indicating that they are currently under development.
*   **Search System**: Client-side Javascript search indexing is fully functional and searches across site routes.
*   **Youtube Playback Modal**: Overridden inside main script module to launch video popup.
