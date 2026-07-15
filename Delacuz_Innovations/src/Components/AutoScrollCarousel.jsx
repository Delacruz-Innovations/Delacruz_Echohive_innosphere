import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- motion used as JSX tag <motion.div>/<motion.p>, false-positive in this eslint version
import { AnimatePresence, motion } from 'framer-motion';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';

const Slide = ({ item, reduced }) => {
  const Icon = item.icon;

  const content = (
    <div className="group relative h-[26rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900 sm:h-[28rem]">
      <img
        src={item.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-7 text-left sm:p-9">
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-purple-300" aria-hidden="true" />
          </div>
        )}
        <h3 className="max-w-sm text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
          {item.title}
        </h3>

        {/* Mobile: description always visible */}
        <p className="max-w-sm text-sm leading-relaxed text-gray-200 sm:text-base lg:hidden">
          {item.description}
        </p>

        {/* Desktop: reveal on hover/focus */}
        <div className="hidden max-w-sm overflow-hidden lg:block">
          <motion.p
            initial={false}
            animate={reduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            whileHover={reduced ? {} : { height: 'auto', opacity: 1 }}
            className="text-base leading-relaxed text-gray-200 group-focus-within:h-auto group-focus-within:opacity-100"
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </div>
  );

  if (item.to) {
    return (
      <Link to={item.to} className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
        {content}
      </Link>
    );
  }
  return content;
};

const AutoScrollCarousel = ({ items, intervalMs = 4500 }) => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reduced || paused || items.length <= 1) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [reduced, paused, items.length, intervalMs]);

  const active = items[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Slide item={active} reduced={reduced} />
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${item.title}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-purple-500' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoScrollCarousel;
