import { html, pad } from '../lib/html.js';
import { section } from '../components/section.js';
import { coverArt } from '../components/cover-art.js';
import { tagList } from '../components/tag-list.js';
import { icon } from '../components/icons.js';

function cover(project) {
  if (project.image) {
    return html`<img src="${project.image}" alt="" loading="lazy" decoding="async" />`;
  }
  return coverArt(project.id);
}

function links(project) {
  if (!project.links?.length) return '';

  return html`
    <p class="project__links">
      ${project.links.map(
        (link) => html`
          <a class="text-link" href="${link.href}" target="_blank" rel="noopener noreferrer">
            ${link.label} ${icon('arrowUpRight')}
          </a>
        `,
      )}
    </p>
  `;
}

export default {
  id: 'work',
  key: 'projects',

  render(projects, { index }) {
    const body = html`
      <ul class="projects" role="list">
        ${projects.items.map(
          (project, i) => html`
            <li class="project" data-reveal>
              <article class="project__card" aria-labelledby="project-${project.id}">
                <div class="project__cover">${cover(project)}</div>
                <div class="project__body">
                  <span class="project__index">${pad(i + 1)}</span>
                  <h3 class="project__title" id="project-${project.id}">${project.title}</h3>
                  <p class="project__summary">${project.summary}</p>
                  ${tagList(project.tags)} ${links(project)}
                </div>
              </article>
            </li>
          `,
        )}
      </ul>
    `;

    return section({ id: this.id, index, label: projects.label, title: projects.title, body });
  },
};
