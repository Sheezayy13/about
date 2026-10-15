import { html } from '../lib/html.js';
import { section } from '../components/section.js';
import { tagList } from '../components/tag-list.js';

export default {
  id: 'experience',
  key: 'experience',

  render(experience, { index }) {
    const body = html`
      <ol class="timeline" role="list">
        ${experience.items.map(
          (job) => html`
            <li class="timeline__item" data-reveal>
              <div class="timeline__meta">
                <span class="timeline__org">${job.org}</span>
                <span class="timeline__period">${job.period}</span>
              </div>
              <div class="timeline__content">
                <h3 class="timeline__role">${job.role}</h3>
                <ul class="timeline__highlights">
                  ${job.highlights.map((point) => html`<li>${point}</li>`)}
                </ul>
                ${tagList(job.tags)}
              </div>
            </li>
          `,
        )}
      </ol>
    `;

    return section({ id: this.id, index, label: experience.label, title: experience.title, body });
  },
};
