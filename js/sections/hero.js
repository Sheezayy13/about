import { html, rich } from '../lib/html.js';
import { icon } from '../components/icons.js';

export default {
  id: 'top',
  key: 'hero',

  render(hero, { content }) {
    const { person, moods } = content;

    return html`
      <section class="hero" id="${this.id}" aria-labelledby="hero-title">
        <div class="hero__art" aria-hidden="true">
          <canvas class="hero__canvas" data-aura></canvas>
        </div>

        <div class="container hero__inner">
          <p class="hero__greeting">${hero.greeting}</p>
          <h1 class="hero__name" id="hero-title">${person.name}</h1>
          <p class="hero__roles">
            ${person.roles.map(
              (role, i) => html`${i > 0 ? html`<span class="hero__dot" aria-hidden="true">·</span>` : ''}<span>${role}</span>`,
            )}
          </p>
          <p class="hero__tagline">${rich(hero.tagline)}</p>

          <div class="hero__actions">
            <a class="button button--solid" href="${hero.primaryAction.href}">
              ${hero.primaryAction.label} ${icon('arrowDown')}
            </a>
            <a class="button button--ghost" href="${person.cv.href}" download>
              ${person.cv.label} ${icon('download')}
            </a>
          </div>
        </div>

        <div class="container hero__footer">
          <div class="mood-picker" role="group" aria-label="${hero.moodPrompt}" data-mood-picker>
            <span class="mood-picker__label" aria-hidden="true">${hero.moodPrompt}</span>
            ${moods.map(
              (mood) => html`
                <button class="mood-picker__option" type="button" data-mood-option="${mood.id}" aria-pressed="false">
                  <span class="mood-picker__swatch" data-mood="${mood.id}" aria-hidden="true"></span>
                  ${mood.label}
                </button>
              `,
            )}
          </div>
          <p class="hero__caption">${hero.caption}</p>
        </div>
      </section>
    `;
  },
};
