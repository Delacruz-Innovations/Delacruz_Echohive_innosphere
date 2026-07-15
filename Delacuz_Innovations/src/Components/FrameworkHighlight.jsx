import { Eye, Lightbulb, Rocket, Shield, TrendingUp } from 'lucide-react';
import React, { useRef } from 'react';
import servicesData from '../ServicesData.json';
import useGsapReveal from '../utils/useGsapReveal';

const stageIcons = {
  '01': Eye,
  '02': Lightbulb,
  '03': Rocket,
  '04': Shield,
  '05': TrendingUp,
};

const FrameworkHighlight = () => {
  const headerRef = useRef(null);
  const stagesRef = useRef(null);

  useGsapReveal(headerRef);
  useGsapReveal(stagesRef, { stagger: 0.1 });

  return (
    <section id="framework" className="scroll-mt-24 bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto max-w-3xl md:text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
            Business Performance Engineering™
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
            One Framework. Multiple Capabilities. One Business Outcome.
          </h2>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            Technology projects rarely fail because of technology alone. Performance improves when
            strategy, governance, people, processes, data and technology work together. Every
            Delacruz engagement follows the Business Performance Engineering Framework™ (BPEF™),
            a structured approach to discovering context, diagnosing root causes, designing
            solutions, delivering transformation and driving continuous performance improvement.
          </p>
        </div>

        <div
          ref={stagesRef}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {servicesData.bpefProcess.map((stage) => {
            const Icon = stageIcons[stage.number];
            return (
              <div
                key={stage.number}
                className="rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/20 text-sm font-bold text-purple-300">
                    {stage.number}
                  </span>
                  {Icon && <Icon className="h-5 w-5 text-purple-400" aria-hidden="true" />}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{stage.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{stage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FrameworkHighlight;
