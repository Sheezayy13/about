import { html, pad } from '../lib/html.js';
import { section } from '../components/section.js';

export default {
  id: 'about',
  key: 'about',

  render(about, { index }) {
    const body = html`
      <div class="about__text" data-reveal>
        ${about.paragraphs.map((text) => html`<p>${text}</p>`)}
      </div>

      <ul class="sides" role="list">
        ${about.sides.map(
          (side, i) => html`
            <li class="side" data-reveal>
              <span class="side__index">${pad(i + 1)}</span>
              <h3 class="side__title">${side.title}</h3>
              <p class="side__text">${side.text}</p>
            </li>
          `,
        )}
      </ul>

      <dl class="facts">
        ${about.facts.map(
          (fact) => html`
            <div class="fact" data-reveal>
              <dt class="fact__label">${fact.label}</dt>
              <dd class="fact__value">${fact.value}</dd>
            </div>
          `,
        )}
      </dl>
    `;

    return section({ id: this.id, index, label: about.label, title: about.title, body });
  },
};
