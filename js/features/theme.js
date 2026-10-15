import { STORAGE_KEYS, load, save } from '../lib/storage.js';

/**
 * Light/dark theme.
 * The inline boot script in index.html sets data-theme before first paint (no flash).
 * A stored value means the visitor chose explicitly; otherwise we follow the OS setting.
 */

const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

export const getTheme = () => root.dataset.theme;

function applyTheme(theme) {
  root.dataset.theme = theme;
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function initTheme() {
  const button = document.querySelector('[data-theme-toggle]');
  const meta = document.querySelector('meta[name="theme-color"]');

  const sync = () => {
    const isDark = getTheme() === 'dark';
    button?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    meta?.setAttribute('content', getComputedStyle(root).getPropertyValue('--bg').trim());
  };

  button?.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    save(STORAGE_KEYS.theme, next);
    applyTheme(next);
    sync();
  });

  // Follow OS changes only while the visitor hasn't picked a theme themselves.
  systemDark.addEventListener('change', (event) => {
    if (load(STORAGE_KEYS.theme)) return;
    applyTheme(event.matches ? 'dark' : 'light');
    sync();
  });

  sync();
}

