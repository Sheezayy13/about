# Sheeza Tariq — Portfolio

A soft, minimal portfolio built with plain HTML, CSS and JavaScript. No frameworks, no build step.

The hero holds a live generative piece: pastel watercolour shapes that drift slowly behind the name.
Visitors can **set the mood** (calm, joy, dreamy, bold), which re-tints the artwork and the whole site.
Light and dark themes follow the visitor's system setting, with a toggle in the header.

## Run it locally

The site uses ES modules, so it has to be served over http (opening `index.html` directly shows a blank page):

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173. Any static server works (`npx serve`, VS Code Live Server, …).

## Editing content

**All text lives in [`js/content.js`](js/content.js).** You shouldn't need to touch HTML to update the site.

| To…                     | Do this in `js/content.js`                                         |
| ----------------------- | ------------------------------------------------------------------ |
| Add a project           | Add an object to `projects.items` (optional `links`, `image`)      |
| Add a job               | Add an object to `experience.items`                                |
| Add a skill             | Add a string to the right `skills.groups[].items`                  |
| Emphasise words         | Wrap them in `*asterisks*` in fields marked "rich" → italic accent |
| Replace the CV          | Drop the new PDF in `assets/` and update `person.cv.href`          |

Projects get a unique generated cover automatically. To use a screenshot instead, add `image: 'assets/my-shot.jpg'`.

## Project structure

```
index.html              Page shell + meta tags + theme/mood boot script
assets/                 CV, favicon, images
css/
  main.css              Entry point — imports everything into cascade layers
  base/tokens.css       ★ Colours, moods, fonts, spacing — restyle the site from here
  base/reset.css
  base/global.css       Typography, layout primitives, section frame, a11y helpers
  components/           Header, buttons, tags, mood picker
  sections/             One file per page section
js/
  main.js               Renders the page, then starts the features
  content.js            ★ All copy and data
  sections/index.js     ★ Page outline — reorder/add/remove sections here
  sections/*.js         One module per section: content in, HTML out
  components/*.js       Reusable pieces (section frame, header, footer, tags, icons, cover art)
  features/*.js         Behaviour: theme, mood, aura canvas, nav, scroll reveal, copy email
  lib/*.js              Tiny helpers (safe HTML templating, seeded random, storage)
```

### Adding a new section

1. Add its data to `js/content.js` with a `label` and `title` (the label puts it in the nav and numbers it).
2. Create `js/sections/my-section.js` (copy `skills.js` as a starting point).
3. Register it in `js/sections/index.js` where it should appear.
4. Add `css/sections/my-section.css` and import it in `css/main.css`.

### Adding a mood

1. Add a palette under `[data-mood='…']` in `css/base/tokens.css` (`--m1`–`--m3` as hex, plus a readable `--accent-deep`).
2. Add `{ id, label }` to `moods` in `js/content.js`.

## Deploy (GitHub Pages)

Push the folder to a repository, then go to **Settings → Pages → Deploy from a branch** and pick `main` / root.
It also works as-is on Netlify, Vercel or any static host.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus, `aria-current` on the active nav link, `aria-pressed` on moods.
- Honours `prefers-reduced-motion`: the artwork renders as a still image and scroll animations are off.
- The canvas renders at half resolution and pauses when it's off-screen or the tab is hidden.
- Theme and mood are remembered per visitor (localStorage, safely wrapped).
