import { STORAGE_KEYS, save } from '../lib/storage.js';

/**
 * Mood picker. Sets <html data-mood="…">, which swaps the pastel palette
 * defined in css/base/tokens.css, then announces a `moodchange` event.
 */

const root = document.documentElement;

export function initMood(moods) {
  const ids = moods.map((mood) => mood.id);
  if (!ids.includes(root.dataset.mood)) root.dataset.mood = ids[0];

  const options = [...document.querySelectorAll('[data-mood-option]')];

  const sync = () => {
    options.forEach((option) => {
      option.setAttribute('aria-pressed', String(option.dataset.moodOption === root.dataset.mood));
    });
  };

  options.forEach((option) => {
    option.addEventListener('click', () => {
      const mood = option.dataset.moodOption;
      if (mood === root.dataset.mood) return;

      root.dataset.mood = mood;
      save(STORAGE_KEYS.mood, mood);
      sync();
      document.dispatchEvent(new CustomEvent('moodchange', { detail: { mood } }));
    });
  });

  sync();
}
