import content from './content.js';
import { sections } from './sections/index.js';
import { header } from './components/header.js';
import { footer } from './components/footer.js';
import { initTheme } from './features/theme.js';
import { initMood } from './features/mood.js';
import { initAura } from './features/aura.js';
import { initNav } from './features/nav.js';
import { initReveal } from './features/reveal.js';
import { initCopy } from './features/copy.js';

function renderPage() {
  const navLinks = [];
  let index = 0;

  const markup = sections.map((section) => {
    const data = content[section.key];
    if (data.label) {
      index += 1;
      navLinks.push({ id: section.id, label: data.label });
    }
    return section.render(data, { content, index });
  });

  document.querySelector('[data-slot="header"]').innerHTML = header({ person: content.person, links: navLinks });
  document.querySelector('[data-slot="main"]').innerHTML = markup.join('');
  document.querySelector('[data-slot="footer"]').innerHTML = footer(content);
}

renderPage();
initTheme();
initMood(content.moods);
initNav();
initReveal();
initCopy();
initAura(document.querySelector('[data-aura]'));

// Content is rendered by JS, so jump to a #hash in the URL once it exists.
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
