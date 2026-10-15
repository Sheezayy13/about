/**
 * Copy-to-clipboard for any button with data-copy="text".
 * Shows "Copied" briefly and announces it to screen readers.
 */

const RESET_AFTER_MS = 2000;

async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Clipboard API missing or refused (older browser, http://, permissions) — fall through
  }
  const field = Object.assign(document.createElement('textarea'), { value: text });
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.append(field);
  field.select();
  const ok = document.execCommand('copy');
  field.remove();
  if (!ok) throw new Error('Copy failed');
}

export function initCopy() {
  const status = document.querySelector('[data-copy-status]');
  const timers = new WeakMap();

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;

    const label = button.querySelector('[data-copy-text]');
    let message;
    try {
      await writeClipboard(button.dataset.copy);
      button.classList.add('is-copied');
      message = 'Copied';
    } catch {
      message = 'Press Ctrl+C';
    }

    if (label) label.textContent = message;
    if (status) status.textContent = message === 'Copied' ? 'Email address copied to clipboard' : '';

    clearTimeout(timers.get(button));
    timers.set(
      button,
      setTimeout(() => {
        button.classList.remove('is-copied');
        if (label) label.textContent = 'Copy';
        if (status) status.textContent = '';
      }, RESET_AFTER_MS),
    );
  });
}
