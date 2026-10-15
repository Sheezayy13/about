/**
 * The hero "aura": a slow, watercolour-like piece of generative art.
 *
 * Soft pastel blobs drift on long, overlapping loops and lean gently toward the cursor.
 * Colours, blend mode, strength and lightness are read from CSS (--m1…--m3, --aura-*),
 * so moods and themes are styled in one place: css/base/tokens.css.
 */

const RESOLUTION = 0.5; // the art is blurry by nature — render at half size, upscale for free
const COLOR_EASE = 2.4; // higher = faster colour transitions between moods
const POINTER_EASE = 1.6;

// Positions are fractions of the canvas; sizes and drift are fractions of `scale` (see resize()).
const BLOBS = [
  { x: 0.42, y: 0.4, size: 0.66, drift: 0.2, period: 34, phase: 0.0, depth: 1.0, color: 0 },
  { x: 0.62, y: 0.52, size: 0.6, drift: 0.22, period: 41, phase: 1.7, depth: 0.7, color: 1 },
  { x: 0.52, y: 0.32, size: 0.5, drift: 0.24, period: 27, phase: 3.1, depth: 1.3, color: 2 },
  { x: 0.32, y: 0.6, size: 0.46, drift: 0.18, period: 48, phase: 4.4, depth: 0.5, color: 1 },
  { x: 0.7, y: 0.3, size: 0.4, drift: 0.2, period: 37, phase: 5.6, depth: 1.1, color: 2 },
];

const TAU = Math.PI * 2;

function parseColor(value) {
  const str = value.trim();
  if (str.startsWith('#')) {
    const hex = str.length === 4 ? [...str.slice(1)].map((c) => c + c).join('') : str.slice(1, 7);
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  }
  const nums = str.match(/[\d.]+/g);
  return nums ? nums.slice(0, 3).map(Number) : [200, 200, 220];
}

/** Scales a colour's HSL lightness — lets dark mode reuse the pastel palette in deeper tones. */
function scaleLightness([r, g, b], factor) {
  if (factor === 1) return [r, g, b];
  [r, g, b] = [r / 255, g / 255, b / 255];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h + 6) % 6; // hue sector in [0, 6)
  }
  const L = Math.min(1, l * factor);
  const C = (1 - Math.abs(2 * L - 1)) * s;
  const X = C * (1 - Math.abs((h % 2) - 1));
  const m = L - C / 2;
  const [r1, g1, b1] = [[C, X, 0], [X, C, 0], [0, C, X], [0, X, C], [X, 0, C], [C, 0, X]][Math.floor(h)];
  return [r1, g1, b1].map((v) => Math.round((v + m) * 255));
}

function readStyle() {
  const css = getComputedStyle(document.documentElement);
  const lightness = parseFloat(css.getPropertyValue('--aura-lightness')) || 1;
  return {
    colors: ['--m1', '--m2', '--m3'].map((name) => scaleLightness(parseColor(css.getPropertyValue(name)), lightness)),
    blend: css.getPropertyValue('--aura-blend').trim() || 'source-over',
    alpha: parseFloat(css.getPropertyValue('--aura-alpha')) || 0.8,
  };
}

export function initAura(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let style = readStyle();
  let colors = style.colors.map((c) => [...c]); // current (eased) colours
  let width = 0;
  let height = 0;
  let scale = 0;
  let visible = true;
  let frame = 0;
  let last = performance.now();
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }; // eased + target, in -1…1

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width * RESOLUTION));
    height = Math.max(1, Math.round(rect.height * RESOLUTION));
    canvas.width = width;
    canvas.height = height;
    // Geometric mean keeps the art balanced on both wide and tall screens.
    scale = Math.sqrt(width * height) * 0.5;
    if (!isAnimating()) draw(performance.now() / 1000);
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = style.blend;

    for (const blob of BLOBS) {
      const t = (time / blob.period) * TAU + blob.phase;
      const x = blob.x * width + Math.sin(t) * blob.drift * scale + pointer.x * blob.depth * scale * 0.12;
      const y = blob.y * height + Math.cos(t * 0.8) * blob.drift * scale * 0.7 + pointer.y * blob.depth * scale * 0.08;
      const r = blob.size * scale * (1 + Math.sin(t * 1.3) * 0.06);
      const [red, green, blue] = colors[blob.color];
      const rgba = (a) => `rgba(${red | 0}, ${green | 0}, ${blue | 0}, ${a})`;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
      gradient.addColorStop(0, rgba(style.alpha));
      gradient.addColorStop(0.4, rgba(style.alpha * 0.7));
      gradient.addColorStop(0.75, rgba(style.alpha * 0.22));
      gradient.addColorStop(1, rgba(0));
      ctx.fillStyle = gradient;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function step(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;

    const colorK = 1 - Math.exp(-dt * COLOR_EASE);
    colors.forEach((color, i) => {
      for (let c = 0; c < 3; c++) color[c] += (style.colors[i][c] - color[c]) * colorK;
    });

    const pointerK = 1 - Math.exp(-dt * POINTER_EASE);
    pointer.x += (pointer.tx - pointer.x) * pointerK;
    pointer.y += (pointer.ty - pointer.y) * pointerK;

    draw(now / 1000);
    frame = requestAnimationFrame(step);
  }

  const isAnimating = () => frame !== 0;

  function start() {
    if (isAnimating() || reducedMotion.matches || !visible || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(step);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function restyle() {
    style = readStyle();
    // Without animation, snap straight to the new palette.
    if (!isAnimating()) {
      colors = style.colors.map((c) => [...c]);
      draw(performance.now() / 1000);
    }
  }

  new ResizeObserver(resize).observe(canvas);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(canvas);

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  document.addEventListener('moodchange', restyle);
  document.addEventListener('themechange', restyle);
  reducedMotion.addEventListener('change', () => (reducedMotion.matches ? stop() : start()));

  window.addEventListener(
    'pointermove',
    (event) => {
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );

  resize();
  start();
}
