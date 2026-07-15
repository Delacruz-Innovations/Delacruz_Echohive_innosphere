import { Check } from 'lucide-react';
import React, { useRef } from 'react';
import useGsapReveal from '../utils/useGsapReveal';

const differentiators = [
  'Start with business outcomes, not technology.',
  'Apply a structured, evidence-based methodology.',
  'Integrate strategy, governance, operations, data, AI and technology.',
  'Focus on measurable business performance.',
  'Build organisational capability, not dependency.',
];

const DifferentiatorSection = () => {
  const contentRef = useRef(null);
  useGsapReveal(contentRef, { stagger: 0.1 });

  return (
    <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-center">
          Why Delacruz Innovations?
        </h2>
        <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-center">
          Every solution is delivered through the Business Performance Engineering Framework™.
          This ensures a consistent approach to understanding business challenges, designing
          practical solutions, executing transformation and measuring long-term business value.
        </p>
        <p className="mb-10 text-base leading-relaxed text-gray-300 sm:text-lg md:text-center">
          Our clients choose Delacruz Innovations because we:
        </p>

        <ul ref={contentRef} className="space-y-4">
          {differentiators.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gray-900/60 p-5 transition-colors duration-300 hover:border-purple-400/60"
            >
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
              <span className="text-base leading-relaxed text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
