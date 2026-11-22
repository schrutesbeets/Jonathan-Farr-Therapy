import { useEffect } from 'react';

/**
 * Progressive-enhancement scroll reveal fallback for browsers lacking native CSS
 * Scroll-Driven Animations (`animation-timeline: view()` + `animation-range: entry`).
 */
export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    const supportsNative =
      typeof CSS !== 'undefined' &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
    const prefersNoMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    if (supportsNative || !prefersNoMotion) {
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('js-reveal-pending');
            entry.target.classList.add('js-reveal-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('js-reveal-visible');
      } else {
        el.classList.add('js-reveal-pending');
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [routeKey]);
}
