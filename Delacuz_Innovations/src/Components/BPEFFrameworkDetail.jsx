import { Check, Compass, Search, PenTool, Rocket, TrendingUp } from 'lucide-react';
import React, { useRef } from 'react';
import servicesData from '../ServicesData.json';
import useGsapReveal from '../utils/useGsapReveal';
import HorizontalScrollRow from './HorizontalScrollRow';

const stageIcons = {
  '01': Compass,
  '02': Search,
  '03': PenTool,
  '04': Rocket,
  '05': TrendingUp,
};

const BPEFFrameworkDetail = () => {
  const headerRef = useRef(null);
  const stagesRef = useRef(null);

  useGsapReveal(headerRef);
  useGsapReveal(stagesRef, { selector: '.bpef-stage-card', stagger: 0.1 });

  return (
    <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div ref={stagesRef} className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto max-w-3xl md:text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
            Methodology
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
            The Business Performance Engineering Framework™ (BPEF™)
          </h2>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            Every engagement follows five connected stages.
          </p>
        </div>

        <HorizontalScrollRow>
          <div className="contents">
            {servicesData.bpefProcess.map((stage) => {
              const Icon = stageIcons[stage.number];
              return (
                <div
                  key={stage.number}
                  className="bpef-stage-card w-[85vw] shrink-0 snap-start rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60 sm:w-[440px] sm:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-lg font-bold text-white shadow-lg">
                      {stage.number}
                    </div>
                    {Icon && <Icon className="h-5 w-5 text-purple-400" aria-hidden="true" />}
                    <h3 className="text-xl font-bold text-white sm:text-2xl">{stage.title}</h3>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-100">{stage.description}</p>

                  {stage.activities && stage.activities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                        Typical Activities
                      </h4>
                      <ul className="space-y-2">
                        {stage.activities.map((activity) => (
                          <li key={activity} className="flex items-start gap-2 text-sm text-gray-300">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" aria-hidden="true" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stage.items && stage.items.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                        Key Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {stage.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </HorizontalScrollRow>
      </div>
    </section>
  );
};

export default BPEFFrameworkDetail;
