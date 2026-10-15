import { html } from '../lib/html.js';
import { section } from '../components/section.js';

export default {
  id: 'background',
  key: 'background',

  render(background, { index }) {
    const body = html`
      <div class="background">
        <div class="background__column" data-reveal>
          <h3 class="background__heading">Education</h3>
          <ul class="entry-list" role="list">
            ${background.education.map(
              (item) => html`
                <li class="entry">
                  <p class="entry__title">${item.title}</p>
                  <p class="entry__meta">${item.place}</p>
                  ${item.detail ? html`<p class="entry__detail">${item.detail}</p>` : ''}
                </li>
              `,
            )}
          </ul>
        </div>

        <div class="background__column" data-reveal>
          <h3 class="background__heading">Achievements</h3>
          <ul class="entry-list" role="list">
            ${background.achievements.map(
              (item) => html`
                <li class="entry">
                  <p class="entry__title">${item.title}</p>
                  <p class="entry__meta">${item.text}</p>
                </li>
              `,
            )}
          </ul>
        </div>

        <div class="background__column" data-reveal>
          <h3 class="background__heading">Languages</h3>
          <ul class="entry-list entry-list--compact" role="list">
            ${background.languages.map(
              (lang) => html`
                <li class="entry entry--row">
                  <p class="entry__title">${lang.name}</p>
                  <p class="entry__meta">${lang.level}</p>
                </li>
              `,
            )}
          </ul>
        </div>
      </div>
    `;

    return section({ id: this.id, index, label: background.label, title: background.title, body });
  },
};
