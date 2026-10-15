import { html } from '../lib/html.js';
import { icon } from './icons.js';

export function footer({ person }) {
  const year = new Date().getFullYear();

  return html`
    <div class="container site-footer__inner">
      <p>© ${year} ${person.name}</p>
      <p class="site-footer__note">Designed with feeling in ${person.location}</p>
      <a class="site-footer__top" href="#top">Back to top ${icon('arrowUp')}</a>
    </div>
  `;
}
