/**
 * localStorage wrapper that never throws (private mode, blocked cookies, etc.).
 * Keys are shared with the inline boot script in index.html — keep them in sync.
 */

export const STORAGE_KEYS = {
  theme: 'st-theme',
  mood: 'st-mood',
};

export function load(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function save(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — preference just won't persist */
  }
}
