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
