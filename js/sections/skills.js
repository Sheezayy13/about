import { html } from '../lib/html.js';
import { section } from '../components/section.js';
import { tagList } from '../components/tag-list.js';

export default {
  id: 'skills',
  key: 'skills',

  render(skills, { index }) {
    const body = html`
      <div class="skills">
        ${skills.groups.map(
          (group) => html`
            <div class="skill-group" data-reveal>
              <h3 class="skill-group__title">${group.title}</h3>
              ${group.featured ? html`<p class="skill-group__featured">${group.featured}</p>` : ''}
              ${tagList(group.items)}
            </div>
          `,
        )}
      </div>
    `;

    return section({ id: this.id, index, label: skills.label, title: skills.title, body });
  },
};
