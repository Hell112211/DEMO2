import { useEffect, useRef } from 'react';

export function useRevealContainer<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll<HTMLElement>('.reveal'));
    if (nodes.length === 0) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      nodes.forEach((n) => n.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    nodes.forEach((n) => observer.observe(n));

    const fallback = window.setTimeout(() => {
      nodes.forEach((n) => n.classList.add('reveal-visible'));
    }, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return ref;
}
