/**
 * Tiny, dependency-free templating.
 *
 *   html`<p>${userText}</p>`   → interpolations are HTML-escaped automatically
 *   html`<ul>${items.map(i => html`<li>${i}</li>`)}</ul>`   → arrays and nested templates just work
 *   rich('I *love* this')      → escapes, then turns *word* into <em>word</em>
 */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ESCAPES[char]);

/** Marks a string as already-safe HTML so `html` won't escape it again. */
class SafeHTML {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

export const unsafeRaw = (value) => new SafeHTML(String(value));

function toHTML(value) {
  if (value === null || value === undefined || value === false) return '';
  if (Array.isArray(value)) return value.map(toHTML).join('');
  if (value instanceof SafeHTML) return value.value;
  return escapeHTML(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => {
    out += toHTML(value) + strings[i + 1];
  });
  return new SafeHTML(out);
}

export const rich = (text) => unsafeRaw(escapeHTML(text).replace(/\*(.+?)\*/g, '<em>$1</em>'));

/** Zero-pads a section/list index: 1 → "01". */
export const pad = (n) => String(n).padStart(2, '0');
