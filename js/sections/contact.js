import { html } from '../lib/html.js';
import { section } from '../components/section.js';
import { icon } from '../components/icons.js';

export default {
  id: 'contact',
  key: 'contact',

  render(contact, { index, content }) {
    const { person } = content;

    const body = html`
      <p class="contact__text" data-reveal>${contact.text}</p>

      <ul class="contact-list" role="list" data-reveal>
        <li class="contact-item">
          <span class="contact-item__label">${icon('mail')} Email</span>
          <a class="contact-item__value" href="mailto:${person.email}">${person.email}</a>
          <button class="copy-button" type="button" data-copy="${person.email}" aria-label="Copy email address">
            ${icon('copy', { className: 'icon icon--copy' })} ${icon('check', { className: 'icon icon--check' })}
            <span class="copy-button__text" data-copy-text>Copy</span>
          </button>
        </li>
        <li class="contact-item">
          <span class="contact-item__label">${icon('phone')} Phone</span>
          <a class="contact-item__value" href="${person.phone.href}">${person.phone.display}</a>
        </li>
        <li class="contact-item">
          <span class="contact-item__label">${icon('download')} Résumé</span>
          <a class="contact-item__value" href="${person.cv.href}" download>${person.cv.label} <small>(PDF)</small></a>
        </li>
      </ul>

      <p class="visually-hidden" role="status" data-copy-status></p>
    `;

    return section({ id: this.id, index, label: contact.label, title: contact.title, body, className: 'section--contact' });
  },
};
