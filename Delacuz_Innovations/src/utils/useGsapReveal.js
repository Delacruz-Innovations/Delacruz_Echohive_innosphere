import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Staggers the direct children of `ref` in as the element scrolls into view.
// Falls back to an instant, non-staggered reveal under prefers-reduced-motion.
export default function useGsapReveal(
  ref,
  { selector = ':scope > *', y = 40, stagger = 0.12, duration = 0.8, start = 'top 80%' } = {}
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOk: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { motionOk } = context.conditions;
        const targets = selector ? node.querySelectorAll(selector) : [];
        const els = targets.length ? targets : [node];

        if (motionOk) {
          gsap.set(els, { opacity: 0, y });
          const tween = gsap.to(els, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: 'power3.out',
            paused: true,
          });
          const trigger = ScrollTrigger.create({
            trigger: node,
            start,
            toggleActions: 'play none none reverse',
            animation: tween,
          });
          return () => trigger.kill();
        }

        gsap.set(els, { opacity: 1, y: 0 });
        return undefined;
      }
    );

    return () => mm.revert();
  }, [ref, selector, y, stagger, duration, start]);
}
