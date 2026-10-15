import { html, rich, pad } from '../lib/html.js';

/**
 * Shared frame for every content section: a small numbered label on the left,
 * title + body on the right. Keeps all sections visually consistent.
 */
export function section({ id, index, label, title, body, className = '' }) {
  const titleId = `${id}-title`;

  return html`
    <section class="section ${className}" id="${id}" aria-labelledby="${titleId}">
      <div class="container section__grid">
        <p class="section__label" data-reveal>
          <span class="section__index">${pad(index)}</span>
          <span>${label}</span>
        </p>
        <div class="section__body">
          <h2 class="section__title" id="${titleId}" data-reveal>${rich(title)}</h2>
          ${body}
        </div>
      </div>
    </section>
  `;
}
