import { useEffect } from 'react';

/**
 * Progressive-enhancement scroll reveal fallback for browsers lacking native CSS
 * Scroll-Driven Animations (`animation-timeline: view()` + `animation-range: entry`),
 * plus optional manual replay trigger from the Design System Panel.
 */
export function useScrollReveal(
  routeKey: string,
  animStyle: string = 'slide',
  replayNonce: number = 0,
) {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll'),
    );
    if (targets.length === 0) return;

    const prefersNoMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    if (!prefersNoMotion || animStyle === 'none') {
      for (const el of targets) {
        el.classList.remove('js-reveal-pending', 'ds-replay-active');
        el.classList.add('js-reveal-visible');
      }
      return;
    }

    const supportsNative =
      typeof CSS !== 'undefined' &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (supportsNative) {
      if (replayNonce > 0) {
        for (const el of targets) {
          el.classList.remove('ds-replay-active');
        }
        const raf = requestAnimationFrame(() => {
          for (const el of targets) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              el.classList.add('ds-replay-active');
            }
          }
        });
        const timer = window.setTimeout(() => {
          for (const el of targets) {
            el.classList.remove('ds-replay-active');
          }
        }, 1200);
        return () => {
          cancelAnimationFrame(raf);
          window.clearTimeout(timer);
        };
      }
      return;
    }

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
      el.classList.remove('js-reveal-visible', 'js-reveal-pending');
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && replayNonce === 0) {
        el.classList.add('js-reveal-visible');
      } else {
        el.classList.add('js-reveal-pending');
        observer.observe(el);
      }
    }

    let rafReplay = 0;
    if (replayNonce > 0) {
      rafReplay = requestAnimationFrame(() => {
        for (const el of targets) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
            el.classList.remove('js-reveal-pending');
            el.classList.add('js-reveal-visible');
          }
        }
      });
    }

    return () => {
      observer.disconnect();
      if (rafReplay) cancelAnimationFrame(rafReplay);
    };
  }, [routeKey, animStyle, replayNonce]);
}
