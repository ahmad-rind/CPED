# Changelog

## [1.3.0] - 2026-07-17

### Changed
- Replaced the browser-dependent left borders of PEO cards with an elegant `::before` custom pseudo-element forming a perfectly curved left bracket `(`.
- Added high-fidelity micro-interactions: card translations and custom shadows on hover; dial-turning rotating outer dotted rings on number badges; 10-degree rotations, stroke-color transforms (blue to orange), and scale-up pulse effects on icon badges and yellow accent dots; right-sliding arrow chevron translations.
- Refined text sizes, colors, and line heights of PEO headers and descriptions to meet WCAG AA contrast standards.
- Optimized PEO card layouts and custom bracket shapes for tablet and mobile responsive breakpoints.
- Upgraded Feature Highlights blocks to responsive, compact micro-cards that elevate vertically and transition to off-white backgrounds with clean shadow borders.
- Redesigned feature squircle icons with a solid deep navy background that dynamically straightens and shifts to solid gold on hover, matching the color scheme of other app components and removing glowing neon shadow effects.
- Reduced spacings, text sizes, and column margins across the features grid to achieve a clean, space-efficient block.

## [1.2.0] - 2026-07-17

### Added
- Created a premium interactive Events section (`#events`) on the homepage, featuring an image slider/carousel with category badge, title, detailed metadata (date, time, location), and action buttons.
- Designed `css/sections/events.css` containing visual styling for the slider track, absolute arrow controls, pagination dots, zoom transition states, and mobile column stacking media queries.
- Created `js/sections/events.js` to control slider interactive behaviors, supporting autoplay, touch-swipe gestures for mobile devices, and mouse-drag gestures for desktop monitors.
- Generated three realistic high-quality university event images: `images/event-roboquest.png`, `images/event-ai-summit.png`, and `images/event-hackathon.png`.
- Registered `events.css` stylesheet and initialized the slide controller inside `main.js` and `styles.css`.

## [1.1.0] - 2026-07-16

### Added
- Integrated the new Outcome Mappings section (`#cped-outcomes`) on the homepage, containing Strategic Alignment PEO cards, a tabbed PLO cards container, a float-row PEO-to-PLO mapping matrix table, and a feature highlights grid.
- Created `css/sections/outcome-mappings.css` to handle target watermark overlays, custom active states, responsive grid columns, floating table rows, and hover transitions.
- Linked `outcome-mappings.css` in `css/styles.css`.
- Programmed interactive tab toggling in `js/main.js` with defensive element validation to switch between Session 2022/2023 and Session 2024 Onwards PLO lists and matrices.
- Updated Session 2022/2023 list with 12 detailed PLOs and Session 2024 Onwards list with 11 approved PLO descriptors.
- Configured dynamic swapping of mapping matrix tables depending on the selected active session.
- Optimized matrix mapping layout spacings (shrunk vertical paddings, row gaps, check badges, and bottom margins) to make the tables compact and viewport-friendly.
- Subtly compacted the PLO card grid spacing (gap from 24px to 20px, card padding to 20px, icon size to 48px, tab padding, and bottom margin to 50px) to present a sleeker grid layout.
- Optimized PLO card grid compactness further (grid columns to minmax(280px), card padding to 16px, icon size to 38px, font size, and text sizing) to maximize spatial density.

### Fixed
- Fixed table cell horizontal shift/misalignment on matrix row hover by removing scale transforms and shadows on `td` elements.
- Fixed play button top border clipping in the Hero section by changing final keyframe clip-paths from inset masks to none.

## [1.0.0] - 2026-07-11


### Added
- Added `.hero-inner` wrapper container inside `index.html` to align hero content overlay elements with the header grid container (`max-width: 1320px`).
- Created `CHANGELOG.md` and `DECISIONS.md` files to document structural changes.

### Changed
- Converted all pixel-based sizing (`px`) inside the hero watermark, headings, background image, and breakpoints to `rem` and percent units to support consistent layout scaling under browser zoom.
- Refactored `index.html` logo text to "Computer Engineering" and removed the `.hero-progress-bar`.
- Modified `.hero-subtitle` to use a glassmorphism capsule with backdrop-filter.
- Shifted `.hero-watermark` outside `.hero-inner` to avoid z-index stacking context limitations and allow the building silhouette image to sit on top of the CPED letters.
- Shifted building image bottom offset to `-9.5rem` and watermark top offset to `37%` with increased sizes to restore the layered overlap effect.
- Changed `.hero-bg-image` width to `100vw` and height to `100%`, and the child image to use `object-fit: cover` and `object-position: center 85%` to enable full-bleed display on wide monitors and eliminate manual pixel overrides inside media queries.
- Added `height: clamp(37.5rem, 100vh, 56.25rem)` to `.hero-section` to limit height growth on wide screen monitors.
- Replaced the dynamic viewport bottom offset calculation on `.hero-bg-image` with a native fluid CSS solution using `aspect-ratio: 3 / 2`, `object-fit: cover`, and `object-position: center 6%` derived from the image aspect ratio, consistently exposing 60-70% of the watermark above the roofline.
- Removed all manual `.hero-bg-image` breakpoint offsets across all media queries (laptop, tablet landscape, tablet portrait, mobile) to ensure zero snaps/jumps at breakpoint boundaries.
- Lowered `.hero-content` and `.hero-campus-tour` base bottom offsets to `3rem` (and `2.5rem` inside the 1024px query) to push the content block lower, fully clearing the building's facade signage area and preventing any text overlaps.
- Restructured `index.html` header using `header-left`, `header-middle`, and `header-right` wrappers to achieve absolute layout centering of nav menus and controls, keeping the logo pinned left and the Apply Now button pinned right on all screens.
- Rebuilt `.header-inner` to stretch `100vw` without container limitations, keeping the logo pinned left and the Apply Now button pinned right on all screens.
- Refactored `.header-left` (`flex-shrink: 0; margin-right: 2rem`), `.header-middle` (`flex: 1; justify-content: center;`), and `.header-right` (`flex-shrink: 0; margin-left: auto;`) to prevent collisions and overlap bugs.
- Added `white-space: nowrap` to `.logo-text` to safeguard logo titles from wrapping and pushing into nav links.
- Modified `.hero-bg-image img` vertical alignment to `center 25%` to raise the building silhouette and tuck the bottom portion of the CPED watermark text behind the roofline.
- Reconfigured `.hero-inner` to use `max-width: 100vw; margin: 0;` so the hero content block sits flush against the left edge of the viewport, matching the logo's alignment.
- Enforced consistent left-alignment of the hero content overlay (badge + heading) and right-alignment of the Campus Tour play button across all viewport widths, including tablet portrait and mobile queries.
- Rebuilt navigation menu inside `index.html` to include updated dropdown structures (Faculty, Academics, Contact Us) and direct links (Home, Downloads), removing "About Us", "Pages", and "Blog".
- Removed the Apply Now CTA button and hamburger menu toggle from the header completely.
- Refactored `.header-inner` grid layout inside `css/styles.css` to group navigation and search on the right side using a flex-nav group, keeping the logo pinned on the left.
- Implemented a responsive mobile dropdown menu triggered by a text button ("MENU ▾") that collapses links into a vertical accordion on tablet and mobile viewports.
- Integrated tap-to-open logic inside `js/main.js` and `css/styles.css` to support dropdown interaction on tablets and touch-screen devices.
- Created 14 individual styled placeholder HTML files in the `faculty/`, `academics/`, and `contact/` folders, plus the root directory.
- Centered the main navigation menu using a three-column flexbox layout (`.header-left`, `.header-middle`, and `.header-right`) while pinning the search button flush to the far right edge of the header.
- Replaced text-based down arrows (`▾`) in dropdown items with custom border-based CSS chevrons that rotate on hover.
- Implemented an interactive expanding search bar that expands into a white rounded pill text input field (`transition: width 0.3s ease`) to the left of the button when clicked.
- Configured a full-width search overlay for mobile viewports to prevent layout crowding.
- Programmed auto-focus, click-outside, and Escape key listeners to control expand/collapse animations.
- Created `search.html` to display query parameters dynamically in a placeholder format.
- Added a new "Academics & Programs" section below the hero with 4 responsive program cards (BSc, MS, MS AI, PhD) on a cream background, decorative SVG squiggly line and graduation cap/diploma illustration, and hover-lift card animations.
- Created `academics/ms-ai.html` and `academics/phd.html` placeholder pages.
- Organized the workspace directory by creating an `unused_files` folder and archiving unused/unreferenced image and markdown documentation files (temporary screenshots, unused banners, reference guidelines, etc.).












