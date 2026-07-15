# Project Structure

- css/styles.css — single unified stylesheet containing all global styles, design variables, layouts, and sections. Never hardcode hex values elsewhere; reference variables defined in :root.
- js/main.js — single unified JavaScript file containing interactive logic, defensive existence guards, scroll animations, and event listeners.
- Subpages under /academics, /faculty, and /contact share references to these primary css/styles.css and js/main.js files.


## Hero section — critical notes
Source image: CPED_hero_backround.png, 1536x1024px.
Measured content bounds: building content spans native y=376 to y=1023 
(36.7% to 99.9% of image height), full width used (0px left/right margin).
Do NOT tune `object-position` or `.hero-section` height by guessing — 
recalculate from these bounds using: scale factor = container_width / 1536, 
scaled image height = 1024 * scale, native visible window = container_height / scale.


## Vite & HTML Partials System

- **Local Server Required**: The project uses Vite with EJS-based template injection. You can **no longer run the site by double-clicking index.html** (via the `file://` protocol). You must run `npm run dev` to start the local development server at `http://localhost:5173/`.
- **Production Build**: Run `npm run build` to compile the optimized production static files into the `dist/` folder. Run `npm run preview` to start a local preview server hosting the compiled production build at `http://localhost:4173/`.
- **Editing Shared Layouts**: The header/navigation markup and footer elements are extracted as template files under the `partials/` directory:
  - `partials/header.html`
  - `partials/footer.html`
  Any shared structural header, dropdown navigation link additions, or modal changes **must** be made inside these partial files rather than individual HTML files.

