import React, { useRef } from 'react';
import { Check, Eye, Lightbulb, Rocket, Shield, TrendingUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import CalendlyPopup from '../Components/CalendlyPopup';
import PageHero from '../Components/PageHero';
import NotFound from './NotFound';
import SEO, { SITE_URL } from '../utils/SEO';
import servicesData from '../ServicesData.json';
import practiceAreaIcons from '../utils/practiceAreaIcons';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const truncate = (text, max = 155) =>
  text && text.length > max ? `${text.substring(0, max).trim()}…` : text;

const stageIconComponents = [Eye, Lightbulb, Rocket, Shield, TrendingUp];

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const service = servicesData.services.find((s) => s.slug === serviceId);

  const introRef = useRef(null);
  const deliverablesRef = useRef(null);
  const serviceLinesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);

  useGsapReveal(introRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(deliverablesRef);
  useGsapReveal(serviceLinesRef, { stagger: 0.1 });
  useGsapReveal(processRef, { stagger: 0.1 });
  useHoverGlow(ctaRef);

  if (!service) {
    return <NotFound />;
  }

  const Icon = practiceAreaIcons[service.icon];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Delacruz Innovations',
      url: SITE_URL,
    },
    areaServed: ['Nigeria', 'Africa'],
  };

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title={service.title}
        description={truncate(service.shortDescription)}
        canonical={`${SITE_URL}/services/${service.slug}`}
        jsonLd={serviceSchema}
      />

      <PageHero
        eyebrow={service.breadcrumb || 'PRACTICE AREAS'}
        headline={service.title}
        copy={service.tagline || service.shortDescription}
        primaryCTALabel="Request an Executive Performance Assessment"
        scrollLabel="Explore This Practice Area"
        ghostWord={service.title.split(' ')[0].toUpperCase()}
        heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1974"
        showCarousel={false}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div ref={introRef}>
            {service.description && (
              <div className="mb-8 flex items-start gap-4">
                {Icon && (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-600/20">
                    <Icon className="h-6 w-6 text-purple-400" aria-hidden="true" />
                  </div>
                )}
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl">
                  {service.description}
                </p>
              </div>
            )}

            {service.executiveChallenge && (
              <p className="mb-12 max-w-3xl border-l-2 border-purple-500/60 pl-4 text-sm italic leading-relaxed text-gray-400">
                “{service.executiveChallenge}”
              </p>
            )}
          </div>

          {/* Business Outcomes */}
          <div ref={deliverablesRef} className="mb-16">
            <div className="rounded-3xl border border-white/10 bg-gray-900/60 p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8">
                Business Outcomes
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3 group/item">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-100 text-sm sm:text-base group-hover/item:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Typical Services */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8 text-center">
              Typical Services
            </h2>

            <div
              ref={serviceLinesRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {service.serviceLines.map((line) => (
                <div
                  key={line.title}
                  className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60"
                >
                  <h4 className="text-lg font-bold text-white mb-3">{line.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{line.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BPEF Process */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8 text-center">
              Our Process
            </h2>

            <div ref={processRef} className="space-y-6">
              {servicesData.bpefProcess.map((step, index) => {
                const StepIcon = stageIconComponents[index] || null;
                return (
                  <div
                    key={step.number}
                    className="rounded-3xl border border-white/10 bg-gray-900/60 p-6 sm:p-8 transition-colors duration-300 hover:border-purple-400/60"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {step.number}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {StepIcon && <StepIcon className="h-5 w-5 text-purple-400" aria-hidden="true" />}
                          <h3 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="rounded-3xl bg-purple-600 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Engineer Better Performance?
              </h2>
              <p className="text-purple-100 text-base sm:text-lg max-w-2xl mx-auto mb-6">
                Let's discuss how our {service.title} practice area can drive your success.
              </p>
              <span ref={ctaRef} className="inline-block rounded-full">
                <CalendlyPopup
                  text="Schedule a Free Consultation"
                  className="inline-flex items-center rounded-full bg-white px-8 py-4 font-semibold text-purple-700 shadow-lg transition-colors duration-300 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
