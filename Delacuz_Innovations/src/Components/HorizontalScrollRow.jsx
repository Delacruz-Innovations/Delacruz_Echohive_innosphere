import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';

// Horizontal scroll-snap row: shows as many cards as the viewport fits,
// scrolled sideways instead of stacked vertically. Each child controls its
// own width (e.g. `w-[85vw] sm:w-[440px]`) and should include `snap-start shrink-0`.
const HorizontalScrollRow = ({ children }) => {
  const trackRef = useRef(null);

  const scrollByAmount = (direction) => {
    const node = trackRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.85 * direction;
    node.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white backdrop-blur-sm transition-colors hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white backdrop-blur-sm transition-colors hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HorizontalScrollRow;
