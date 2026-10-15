/**
 * Page outline. Sections render in this order; reorder, remove or add here.
 *
 * A section module is `{ id, key, render(data, { content, index }) }` where
 *  - id    → the element id / URL hash (#work)
 *  - key   → which block of content.js it renders
 *  - index → its number on the page (only blocks with a `label` are numbered and linked in the nav)
 */
import hero from './hero.js';
import about from './about.js';
import experience from './experience.js';
import projects from './projects.js';
import skills from './skills.js';
import background from './background.js';
import contact from './contact.js';

export const sections = [hero, about, projects, experience, skills, background, contact];
