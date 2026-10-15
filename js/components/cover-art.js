import { unsafeRaw } from '../lib/html.js';
import { createRandom, between } from '../lib/random.js';

const W = 400;
const H = 260;

/**
 * Generates a soft, abstract cover for a project, seeded by its id —
 * every project gets its own unique (but stable) composition.
 * Colours come from CSS (.cover-art__blob--1…3), so the art follows the current mood.
 */
export function coverArt(seed) {
  const rand = createRandom(seed);
  const filterId = `blur-${seed}`;

  const blobs = [1, 2, 3]
    .map((tone) => {
      const cx = between(rand, W * 0.15, W * 0.85);
      const cy = between(rand, H * 0.2, H * 0.8);
      const r = between(rand, H * 0.28, H * 0.45);
      return `<circle class="cover-art__blob cover-art__blob--${tone}" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}"/>`;
    })
    .join('');

  // One fine line element per piece: either a ring or a gentle arc.
  const lx = between(rand, W * 0.3, W * 0.7);
  const ly = between(rand, H * 0.3, H * 0.7);
  const lr = between(rand, 34, 62);
  const line =
    rand() > 0.5
      ? `<circle class="cover-art__line" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${lr.toFixed(1)}"/>`
      : `<path class="cover-art__line" d="M ${(lx - lr * 2).toFixed(1)} ${(ly + lr).toFixed(1)} Q ${lx.toFixed(1)} ${(ly - lr * 1.6).toFixed(1)} ${(lx + lr * 2).toFixed(1)} ${(ly + lr).toFixed(1)}"/>`;

  return unsafeRaw(`
    <svg class="cover-art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28"/>
        </filter>
      </defs>
      <g filter="url(#${filterId})">${blobs}</g>
      ${line}
    </svg>
  `);
}
