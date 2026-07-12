# CPED Project Architecture

## Project Stack
- **Core**: Vanilla HTML5, Vanilla JavaScript (ES6+), and custom Vanilla CSS.
- **Fonts**: Google Fonts (`Bitter`, `DM Sans`, `Inter`).

## Directory Structure
```
d:/CPED/
├── index.html                # Main homepage entry point
├── search.html               # Styled search results placeholder page
├── downloads.html            # Downloads page
├── CHANGELOG.md              # Project change log
├── DECISIONS.md              # Architectural decisions registry
├── GEMINI.md                 # Project-specific workflow & coding rules
├── CPED hero backround.png   # Production hero background image
├── css/
│   └── styles.css            # Central styling sheet containing theme tokens & responsive rules
├── js/
│   └── main.js               # Toggle states, touch event listeners, & search input handlers
├── academics/                # Academic program placeholder HTML files
├── faculty/                  # Faculty subpage HTML files
├── contact/                  # Contact subpage HTML files
└── unused_files/             # Archive directory for non-production assets
```

## Key Architectural Patterns

### 1. Multi-Page Local Linking
All pages are designed as standalone HTML files structured across relative directory levels. Paths to CSS, JS, and root pages resolve using relative routes (e.g. `../css/styles.css` on subpages) to guarantee compatibility under local browser navigation (`file://` protocol).

### 2. Centered 3-Column Header Layout
The global page header uses a three-column flex container:
- **Left (`.header-left`, `flex: 1`)**: Pinned logo and department text.
- **Center (`.header-middle`, `flex: 0 0 auto`)**: Navigation links.
- **Right (`.header-right`, `flex: 1`)**: Pinning search wrapper and mobile menu trigger flush-right.

### 3. Expanding Inline Search
The desktop search box expands absolutely to the left of the search button on click. This ensures no sibling nav links are shifted and prevents content collisions on 1366px monitors. On mobile, it overrides the header width to display as a full-width search input bar.

### 4. Responsive Mobile Dropdown Accordion
For screens <= 1024px, the header middlegroup has `display: contents` and navigation switches to a vertical mobile menu. This menu displays via click/touch trigger events handled in `js/main.js`.
