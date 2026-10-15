import { html } from '../lib/html.js';
import { icon } from './icons.js';

/** @param {{ person: object, links: { id: string, label: string }[] }} props */
export function header({ person, links }) {
  return html`
    <div class="container site-header__inner">
      <a class="wordmark" href="#top" aria-label="${person.name}, back to top">
        ${person.firstName}<span class="wordmark__dot" aria-hidden="true">.</span>
      </a>

      <nav class="site-nav" id="site-nav" aria-label="Primary" data-nav>
        <ul class="site-nav__list">
          ${links.map(
            (link) => html`<li><a class="site-nav__link" href="#${link.id}" data-nav-link>${link.label}</a></li>`,
          )}
        </ul>
      </nav>

      <div class="site-header__actions">
        <button class="icon-button" type="button" data-theme-toggle aria-label="Toggle dark mode">
          ${icon('moon', { className: 'icon icon--moon' })} ${icon('sun', { className: 'icon icon--sun' })}
        </button>
        <button
          class="menu-button"
          type="button"
          data-menu-toggle
          aria-expanded="false"
          aria-controls="site-nav"
        >
          <span class="menu-button__label">Menu</span>
          <span class="menu-button__lines" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  `;
}
