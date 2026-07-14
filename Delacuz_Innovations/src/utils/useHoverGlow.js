import { useEffect } from 'react';
import gsap from 'gsap';
import usePrefersReducedMotion from './usePrefersReducedMotion';

// Attach to a wrapper element around a CTA to get a scale + purple glow
// on hover/focus. No-ops under prefers-reduced-motion (plain CSS :hover
// classes on the CTA itself still apply).
export default function useHoverGlow(ref, { scale = 1.04 } = {}) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return undefined;

    const grow = () =>
      gsap.to(node, {
        scale,
        boxShadow: '0 0 40px 6px rgba(59, 7, 100, 0.55)',
        duration: 0.3,
        ease: 'power2.out',
      });
    const shrink = () =>
      gsap.to(node, {
        scale: 1,
        boxShadow: '0 0 0 0 rgba(59, 7, 100, 0)',
        duration: 0.4,
        ease: 'back.out(1.7)',
      });

    node.addEventListener('mouseenter', grow);
    node.addEventListener('mouseleave', shrink);
    node.addEventListener('focusin', grow);
    node.addEventListener('focusout', shrink);

    return () => {
      node.removeEventListener('mouseenter', grow);
      node.removeEventListener('mouseleave', shrink);
      node.removeEventListener('focusin', grow);
      node.removeEventListener('focusout', shrink);
      gsap.set(node, { clearProps: 'transform,boxShadow' });
    };
  }, [ref, reduced, scale]);
}
