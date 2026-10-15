import { html } from '../lib/html.js';

/** A row of small pill tags. Renders nothing for an empty/missing list. */
export function tagList(tags = [], { className = '' } = {}) {
  if (!tags.length) return '';

  return html`
    <ul class="tag-list ${className}" role="list">
      ${tags.map((tag) => html`<li class="tag">${tag}</li>`)}
    </ul>
  `;
}
