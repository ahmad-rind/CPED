# Project Snapshot: Department of Computer Engineering (CPED) Website

This document provides a single, comprehensive overview of the current state of the CPED website. It is designed to give an AI assistant or developer all the context needed to understand, run, and debug the project without prior knowledge.

---

## 1. Project Overview

### Purpose & Scope
The website serves as the official portal for the **Computer Engineering Department (CPED)**. It showcases academic programs, research groups, department resources, and educational objectives. It is currently styled as a highly responsive, modern multi-page site.

### Tech Stack
*   **Build Tooling / Dev Server**: Vite (with `vite-plugin-ejs` to compile-time inject HTML partial layouts).
*   **Frontend**: Vanilla HTML5, Vanilla JavaScript (ES6+), and Vanilla CSS3.
*   **Libraries/Assets**: 
    *   Google Fonts (`Bitter`, `DM Sans`, `Inter`, `Roboto Slab`)
    *   FontAwesome Icon Toolkit (`cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`)
*   **Local Access**: Must be run via local development server (`npm run dev` at `http://localhost:5173/`). Direct browser viewing (`file://`) is deprecated as EJS templates require compilation.

### Project Directory Structure
```
d:/CPED/
├── academics/                      # Academic Program Pages (Inject templates)
│   ├── laboratories.html
│   ├── management.html
│   ├── ms-ai.html
│   ├── phd.html
│   ├── postgraduate.html
│   └── undergraduate.html
├── contact/                        # Contact & Information Pages (Inject templates)
│   ├── alumni.html
│   ├── contacts.html
│   ├── faculty.html
│   └── helpdesk.html
├── css/
│   └── styles.css                  # Core unified stylesheet for all styles & layouts
├── faculty/                        # Faculty Subpages (Inject templates)
│   ├── collaborations.html
│   ├── labs.html
│   ├── members.html
│   ├── news.html
│   └── projects.html
├── images/                         # Active production image assets
│   ├── 003.jpg
│   ├── 008.jpg
│   ├── CPED logo.png
│   └── academics-decor.png
├── js/
│   └── main.js                     # Core unified JS script for interaction logic
├── partials/                       # Shared HTML layouts (injected at compile time)
│   ├── header.html                 # Centralized header & navigation layout
│   └── footer.html                 # Centralized scripts & modal popup layout
├── unused_files/                   # Archive directory for non-production assets
│   ├── 2026-07-07_00-09.png
│   ├── CPED hero backround.png
│   ├── bnr-e-main-img1-min.png
│   ├── building.png
│   ├── cped.png
│   ├── design.md
│   └── univet_hero_clone_guide.md
├── .gitignore                      # Excluded folders (node_modules, dist)
├── AGENTS.md                       # Workspace developer instructions & context
├── ARCHITECTURE.md                 # Brief project architecture design log
├── CHANGELOG.md                    # Project change history tracking
├── CPED hero backround.png         # Main hero background image (Active)
├── DECISIONS.md                    # Detailed architecture decision log
├── downloads.html                  # Downloads hub page (Inject templates)
├── GEMINI.md                       # Project coding rules & constraints
├── index.html                      # Website homepage (Inject templates)
├── package.json                    # Project metadata & npm dependencies
├── search.html                     # Search results page (Inject templates)
├── vite.config.js                  # Vite server & build configurations
├── academics_card_1.png            # Unused image asset at root
├── academics_card_2.png            # Unused image asset at root
└── image for academics.png         # Unused image asset at root
```

---

## 2. Full File Inventory

| File Path | Description | Dependents / Referenced By |
| :--- | :--- | :--- |
| `index.html` | Core landing page of the department website. Imports `partials/header.html` and `partials/footer.html`. | Root entry point. |
| `search.html` | Placeholder results page displaying searched query context using JavaScript extraction. | Referenced by header search forms. |
| `downloads.html` | Placeholder page for the official documents and downloads center. | Pointers in homepage segments (Latest Action, Alert Ticker, Resources). |
| `academics/*.html` | 6 individual academic portal placeholder files. | Nav dropdown links, Academics card links, Resources grid buttons. |
| `contact/*.html` | 4 individual contact placeholder files. | Nav dropdown links, Resources sidebar pills. |
| `faculty/*.html` | 5 individual faculty department placeholder files. | Nav dropdown links, Alert Ticker badge, Resources grid cells. |
| `partials/header.html` | Shared header & navigation markup containing EJS placeholders for prefixes & active states. | Injected into all 18 HTML pages at compilation. |
| `partials/footer.html` | Shared script inclusion tags, closing tags, and conditional video popup modal code. | Injected into all 18 HTML pages at compilation. |
| `css/styles.css` | Comprehensive stylesheet housing global resets, design variables, utility classes, and layout rules. | Referenced in `<head>` by all HTML files. |
| `js/main.js` | Main interactive script (handles sticky header transitions, mobile accordions, search expand, parallax, modals). | Loaded at the footer of all HTML files. |
| `vite.config.js` | Configures EJS views directory pointing to root, and Rollup inputs mapping all 18 pages. | Vite engine configuration. |
| `package.json` | Contains project metadata, dependencies (`vite`, `ejs`, `vite-plugin-ejs`), and npm dev/build scripts. | Package manager configuration. |
| `CPED hero backround.png` | Large cover background image of the main university building. | Used as background image in `index.html` hero and `css/styles.css` mission panel. |
| `images/CPED logo.png` | Official department logo icon. | Loaded in `partials/header.html`. |
| `images/003.jpg` | Photo of a student with a laptop on a lawn. | Displayed in left column of Academics section in `index.html`. |
| `images/008.jpg` | Photo of graduating students celebrating at a ceremony. | Displayed in left column of Academics section in `index.html`. |
| `images/academics-decor.png` | Isolated graduation cap graphic. | Floats animation element on bottom-right of Academics in `index.html`. |

---

## 3. Complete Design Tokens

### CSS Custom Properties (`:root` Variables)

| Variable Name | Value | Purpose / Usage |
| :--- | :--- | :--- |
| **Primary Theme Colors** | | |
| `--primary-blue` | `#0F5288` | Main brand color (links, eyebrows, active icons, chevrons). |
| `--primary-dark` | `#003F7D` | Secondary brand color (active borders, hover highlights). |
| `--primary-deep` | `#003A65` | Main dark background accent (sticky header, action bar, alert badge, headings). |
| `--secondary-orange` | `#E8651A` | Main call-to-action hover colors (e.g. program card hover circles). |
| `--orange-hover` | `#DD6B20` | Secondary orange state highlight. |
| `--accent-gold` | `#FFB800` | Golden accent (welcome tag icons, active indicators, borders, custom arrows). |
| **Resources Section Tokens** | | |
| `--res-navy` | `#0a2e5c` | Theme color for headings, hex shapes, and icons inside resources section. |
| `--res-navy-hover` | `#123f77` | Hover fill state for navy resource cells. |
| `--res-gold` | `#ffb703` | Yellow resources outline border, card highlights, and hover badges. |
| `--res-bg-light` | `#f4f7fc` | Outer background wrapper for resources. |
| `--res-card-bg` | `#ffffff` | Background color for info grids. |
| `--res-text-dark` | `#1e293b` | Dark titles and content text in resources section. |
| `--res-text-muted` | `#64748b` | Subdued descriptions text. |
| `--res-border-light` | `#e2e8f0` | Resource pill list item borders. |
| `--res-shadow-soft` | `0 15px 35px rgba(10, 46, 92, 0.08)`| Soft drop shadow for info cards. |
| `--res-shadow-hover`| `0 20px 45px rgba(10, 46, 92, 0.15)`| Elevated hover drop shadow for info cards. |
| **Neutrals** | | |
| `--text-dark` | `#333333` | Global default body text color. |
| `--text-medium` | `#555555` | Secondary descriptive text and PEO paragraphs. |
| `--text-light` | `#666666` | Muted descriptions (e.g. program card body text). |
| `--white` | `#FFFFFF` | Background cards, container frames, headers. |
| `--off-white` | `#F5F5F5` | Main viewport backing body canvas. |
| `--cream-bg` | `#f4f1ea` | Background fill for Academics section and Alert Ticker. |
| `--footer-bg` | `#0A0A0A` | Pinned footer or dark section frames. |
| `--dark-section` | `#1A1A2E` | Translucent background overlay for placeholder subpages. |
| `--border` | `#E0E0E0` | Standard divider borders. |
| **Gradients & Spacing** | | |
| `--hero-gradient` | `linear-gradient(...)` | Top-to-bottom dark gradient dim overlay inside hero section. |
| `--container-width`| `1200px` | Center alignment max-width width for standard sections. |
| `--container-wide` | `1320px` | Wide desktop width container limits for Header and Hero. |

### Font Families

*   **`'DM Sans', sans-serif`**: Primary body font. Used globally on the `body` tag, card details, action bar text, and navigation links.
*   **`'Bitter', serif`**: Primary header font. Used for prominent headings, section headings, department name logos, and program card titles.
*   **`'Inter', sans-serif`**: Secondary sans-serif font. Used in UI lists, alert scrolling news, hex cell titles, resource pills, and subpage text blocks.
*   **`'Roboto Slab', serif`**: Heavy serif styling. Used for headers inside the resources section (`.section-title`, `.card-heading`).

### Breakpoint Values (Media Queries)
The CSS uses the following `max-width` media query breakpoints:
*   `1440px`: Header margins and text alignments adapt.
*   `1200px`: Resources content grid collapses to a single-column layout; Mission/PEOs panels adjust gaps.
*   `1024px`: Desktop header navigation changes to mobile trigger menu. Middle container gets `display: contents`. Academics layout transitions from row to column.
*   `778px`: Academics images change stack order, program card column count drops to 1. Info card badge alignment offsets are set back.
*   `768px`: Latest action bar wraps and aligns center; alert scrolling ticker elements resize and hide text labels. Hero title fonts shrink.
*   `600px`: Pointy-top hex grid in resources collapses into standard rounded rectangular cards (2 columns). Academics details shrink. PEO cards align vertically.
*   `480px`: Mobile menu width and overlay settings.
*   `400px`: Resources cell columns drop to a single column stack.

---

## 4. Page & Section Inventory

### I. Site Header (`#site-header`)
*   **HTML selectors**: `#site-header`, `.site-header`, `.header-inner`, `.header-left`, `.header-middle`, `.header-right`
*   **Controllers**: `css/styles.css` (lines 107–495, 929–1060), `js/main.js` (lines 10–121) via compilation of `partials/header.html`
*   **Layout & Behavior**: Sticky bar that transitions colors. Desktop uses a 3-column flex container: Logo left (`.header-left`), navigation menu links center (`.header-middle`), expanding search form and mobile trigger right (`.header-right`). As scroll exceeds 100px, it slides out on scroll-down and transitions in on scroll-up.

### II. Hero Section (`#hero`)
*   **HTML selectors**: `#hero`, `.hero-section`, `.hero-bg-image`, `.hero-watermark`, `.hero-inner`
*   **Controllers**: `css/styles.css` (lines 496–774, 1061–1380) and `js/main.js` (lines 122–180)
*   **Layout & Behavior**: Full-bleed section with building photo background. Parallax offset is calculated on scroll (`scrollY * 0.12`). Houses a large text watermark `"CPED"` at the back. Contains welcome eyebrow tag (with SVG cap icon) and heading. Right side hosts the campus tour play button.

### III. Latest Action Bar
*   **HTML selectors**: `.latest-action-bar`, `.latest-action-inner`
*   **Controllers**: `css/styles.css` (lines 1381–1455)
*   **Layout & Behavior**: Thin navy banner under the hero section. Houses a bold yellow label and two svg-bulleted hyperlinks leading to external timetables.

### IV. Alert Ticker Section
*   **HTML selectors**: `.alert-ticker-section`, `.alert-ticker-wrapper`, `.alert-ticker-track`
*   **Controllers**: `css/styles.css` (lines 1456–1695)
*   **Layout & Behavior**: Infinite looping scrolling text carousel. Moving news entries pause when hovered over. Right side contains a "View All" badge leading to the news archive subpage.

### V. Academics & Programs Section (`#academics-programs`)
*   **HTML selectors**: `.academics-section`, `.academics-layout-container`, `.academics-images-side`, `.academics-programs-side`
*   **Controllers**: `css/styles.css` (lines 1696–2008)
*   **Layout & Behavior**: Two-column flex section on warm cream. Left has two picture cards overlaying campus life. Right features a 2x2 grid of four program cards (BSc, MS, MS-AI, PhD) with custom hover translateY offsets and color-changing action arrows. Bottom-right displays a floating graduation cap asset.

### VI. Explore Resources Section (`#resources`)
*   **HTML selectors**: `.resources-section`, `.content-grid`, `.info-card`, `.honeycomb-wrapper`, `.resources-honeycomb`
*   **Controllers**: `css/styles.css` (lines 2087–2556)
*   **Layout & Behavior**: 3-column layout on light blue. Left and right are info cards hosting pill menus that slide rightward on hover. The center features an absolute-positioned interlocking pointy-top honeycomb hexagon cluster of six buttons.

### VII. Mission & PEOs Section (`#mission-peos`)
*   **HTML selectors**: `.mission-peos-section`, `.mission-peos-container`, `.mission-panel`, `.peos-panel`
*   **Controllers**: `css/styles.css` (lines 2557–2935)
*   **Layout & Behavior**: 2-column grid layout. Left displays a navy blue card with building graphic backdrop detailing the department's program mission and four bottom icons. Right lists four structured Program Educational Objectives (PEO) cards with custom SVGs and hover transition details.

### VIII. Video Popup Modal (`#video-modal`)
*   **HTML selectors**: `#video-modal`, `.video-modal`, `.modal-overlay`, `.modal-content`
*   **Controllers**: HTML file end, `css/styles.css`, and `js/main.js` (lines 122–163) via EJS conditional include of `partials/footer.html`
*   **Layout & Behavior**: Dark overlay modal which handles dynamic creation and destruction of YouTube iframe embeds (`autoplay=1`) to prevent resources loading lag on page open. Triggers open/close key checks (e.g. Escape).

### IX. Subpage Placeholder Layout
*   **HTML selectors**: `.subpage-section`, `.placeholder-card`
*   **Controllers**: `css/styles.css` (lines 2010–2086)
*   **Layout & Behavior**: Used in all secondary portal files. Consists of a dark blue overlay background centering a translucent frosted glass card that displays status details, a topic icon, and navigation options.

---

## 5. Known Constraints and History

### Hero Image Bounds Context
```
Hero background image: CPED hero backround.png (1536x1024px)
Measured content bounds: building content spans native y=376 to y=1023 
(36.7% to 99.9% of image height), full width used (0px left/right margin, 
i.e. content spans x=0 to x=1535).
Any object-position/crop changes must be calculated from these bounds, 
not guessed.
```

### Stacking Order (z-index hierarchy)
*   `z-index: 1000` — Video Modal overlay (always covers viewport).
*   `z-index: 100` — Pinned Site Header (`.site-header`).
*   `z-index: 99` — Mobile menu background shadow wrapper (`.nav-overlay`).
*   `z-index: 10` — Hero inner text content (`.hero-inner`).
*   `z-index: 9` — Latest action bar (standard flow layer).
*   `z-index: 8` — Alert ticker and resources wrapper segments.
*   `z-index: 4` — Hero dim lighting overlay (`.hero-overlay`).
*   `z-index: 3` — Hero background building image wrapper (`.hero-bg-image`).
*   `z-index: 2` — Watermark acronym (`.hero-watermark`). Sitting behind the building facade to frame visual depth.

### Logic Tuning & Tuning Variables
1.  **Watermark Placement**: Sits as a direct child of `.hero-section` to prevent it from inheriting `.hero-inner`'s `z-index: 10` stacking context.
2.  **Hero Image Alignment**: `.hero-bg-image img` uses `aspect-ratio: 3 / 2`, `object-fit: cover`, and `object-position: center 25%` to tuck the bottom edge of the CPED letters behind the building roofline across wide monitor frames.
3.  **Hero Heights**: Limited to `height: clamp(37.5rem, 100vh, 56.25rem)` to control maximum vertical growth.
4.  **Parallax Factor**: JavaScript sets background scroll offset with a translation ratio of `scrollY * 0.12`.
5.  **Search Bar Expansion**: Expands leftward absolutely to a width of `250px`. This prevents reflows or parent container expansions that would shift navigation items.
6.  **Hero Left Alignment**: Hero content is set to `2.5rem` (`40px`) left offset inside `.hero-inner` (which is configured with width `100vw` and no side margins) to align flush-left with the header logo.

---

## 6. Assets Inventory

### Image Assets

| File Path | Dimensions | Production Usage | Purpose |
| :--- | :--- | :--- | :--- |
| `images/CPED logo.png` | ~512x512px | Pinned left in every page header. | Official Branding Logo. |
| `CPED hero backround.png`| 1536x1024px | Backdrop on landing hero & mission cards. | High-res image of the main building. |
| `images/003.jpg` | 800x533px | Left column of Academics section. | Context photo (Student with laptop). |
| `images/008.jpg` | 800x533px | Left column of Academics section. | Context photo (Graduates celebrating). |
| `images/academics-decor.png`| 512x512px | Bottom-right corner of Academics section.| Decorative floating graduation cap. |

### Unused Assets
*   `academics_card_1.png` (At project root)
*   `academics_card_2.png` (At project root)
*   `image for academics.png` (At project root)
*   All images/archives inside the `/unused_files/` directory.

### Broken References
*   None. (All stylesheet paths, script routes, logo links, and image directories resolve correctly).

---

## 7. Navigation Structure

```
├── Home (Real, index.html)
│
├── Faculty (Dropdown menu, all items are Placeholders)
│   ├── Faculty Members (faculty/members.html)
│   ├── News (faculty/news.html)
│   ├── Collaborations (faculty/collaborations.html)
│   ├── Research Labs and Groups (faculty/labs.html)
│   └── Faculty Projects (faculty/projects.html)
│
├── Academics (Dropdown menu, all items are Placeholders)
│   ├── Undergraduate Program (academics/undergraduate.html)
│   ├── Postgraduate Program (academics/postgraduate.html)
│   ├── MS in Artificial Intelligence (academics/ms-ai.html)
│   ├── PhD Computer Engineering (academics/phd.html)
│   ├── Laboratories (academics/laboratories.html)
│   └── Academics Management System (academics/management.html)
│
├── Contact Us (Dropdown menu, all items are Placeholders)
│   ├── Contacts (contact/contacts.html)
│   ├── Help Desk (contact/helpdesk.html)
│   ├── Alumni Relations (contact/alumni.html)
│   └── Faculty (contact/faculty.html)
│
└── Downloads (Real link to Placeholder Page, downloads.html)
```

---

## 8. Current Known Issues or TODOs

*   **Subpage Status**: All secondary pages (e.g. program summaries, directories, contacts, and downloads) contain placeholder message boards indicating that they are currently under development.
*   **Search System**: The search engine is simulated. The form passes input query variables onto `/search.html`, which decodes, sanitizes, and renders the term in a "Search results — coming soon" template.
*   **Youtube Playback Modal**: The Department Tour button links directly to YouTube (`https://www.youtube.com/watch?v=PUzuTGjvdU0`), but the script overrides default anchor behavior to display it inside the custom overlay modal.

---

## 9. Responsive Breakpoint Summary

| Section Name | Desktop (Width > 1024px) | Tablet (768px < Width <= 1024px) | Mobile (Width <= 768px) |
| :--- | :--- | :--- | :--- |
| **Site Header** | logo left, nav items centered, search/trigger right. | logo left, search right, navigation collapses into vertical accordion via menu button trigger. | Full width search override bar; accordion dropdown menu spans full viewport. |
| **Hero Section**| Background image cover with watermark; overlay offsets at `3rem`. | Overlay bottom offset shrinks to `2.5rem`. | Watermark and font scales shrink. Height clamp bounds limit overlay margins. |
| **Action Bar** | Horizontal centered bar showing action labels & links. | Horizontal centered bar. | Flex wraps center vertically; text sizes shrink, layout dividers hide. |
| **Alert Ticker**| Smooth scroll banner showing badge, news track, and button. | Spacing paddings decrease. | Arrow and alerts badge text hides. Loop text and view icons resize. |
| **Academics** | Split column side layout: 2 image cards left, 4 program cards right (2x2 grid). | Flex order reverses: 2 images top side-by-side, 4 program cards bottom (2x2 grid). | Images stack vertically (1 column), program cards grid collapses to single column stack. |
| **Resources** | 3-column grid: side cards (with outline accent offsets) framing honeycomb cluster. | Single-column stack: side cards stretch full width; honeycomb centers. | Honeycomb cells lose hexagonal shape and clip-path, becoming regular rectangular cards in 2 columns (1 column below 400px). |
| **Mission & PEOs**| 2-column grid: mission block left, 4 objective cards right. | Grid collapses to 1-column stack. | PEO objective cards flex wrap vertically; number layout sizes adjust. |
