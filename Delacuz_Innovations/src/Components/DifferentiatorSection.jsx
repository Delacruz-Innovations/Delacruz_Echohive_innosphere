import { Check } from 'lucide-react';
import React, { useRef } from 'react';
import useGsapReveal from '../utils/useGsapReveal';

const differentiators = [
  'Business-first advisory, not technology-first implementation.',
  'Proprietary Business Performance Engineering Framework™ (BPEF™).',
  'Enterprise consulting capabilities tailored to African business realities.',
  'Outcome-focused engagements with measurable success criteria.',
  'Integrated expertise spanning strategy, governance, data, AI, operations and technology.',
];

const DifferentiatorSection = () => {
  const contentRef = useRef(null);
  useGsapReveal(contentRef, { stagger: 0.1 });

  return (
    <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-3xl font-bold leading-tight text-white sm:text-4xl">
          Why Delacruz Innovations
        </h2>

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
