/**
 * Gentle fade-up for elements marked [data-reveal] as they scroll into view.
 * Siblings are staggered slightly. Skipped entirely for reduced-motion users.
 */

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

export function initReveal() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  const items = [...document.querySelectorAll('[data-reveal]')];
  document.documentElement.classList.add('has-reveal');

  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((child) => child.hasAttribute('data-reveal'));
    const step = Math.min(siblings.indexOf(el), MAX_STAGGER_STEPS);
    el.style.setProperty('--reveal-delay', `${step * STAGGER_MS}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  items.forEach((el) => observer.observe(el));
}
