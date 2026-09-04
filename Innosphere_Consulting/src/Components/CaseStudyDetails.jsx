import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ChevronRight, Menu, X,
  TrendingUp, Users, Target, Zap, CheckCircle,
  BarChart3, Clock, DollarSign, Shield, Database,
  LineChart, Package, RefreshCw
} from 'lucide-react';

import caseStudiesData from '../Components/caseStudiesData';
import CalendlyPopup from './CalendlyPopup';

const CaseStudyDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const relatedRef = useRef([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentCase = caseStudiesData[slug];

  // Get related cases from same category
  const relatedCases = Object.entries(caseStudiesData)
    .filter(([key, value]) => key !== slug && value.category === currentCase?.category)
    .slice(0, 3)
    .map(([key, value]) => ({ slug: key, ...value }));

  // Fill with other cases if needed
  if (relatedCases.length < 2) {
    const additionalCases = Object.entries(caseStudiesData)
      .filter(([key]) => key !== slug && !relatedCases.find(c => c.slug === key))
      .slice(0, 2 - relatedCases.length)
      .map(([key, value]) => ({ slug: key, ...value }));
    relatedCases.push(...additionalCases);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        heroRef.current.style.transition = 'all 0.8s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        contentRef.current.style.transition = 'all 0.8s ease-out 0.2s';
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'translateY(0)';
      }, 200);
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    relatedRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [slug]);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  if (!currentCase) {
    return (
      <div className="bg-[#080f1d] min-h-screen flex items-center justify-center text-white pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/cases')}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Case Studies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#080f1d] min-h-screen text-[#ffffff]">
      {/* Hero Section with Case Image Background */}
      <section className="relative overflow-hidden pt-36 pb-20 border-b border-white/5">
        {/* Background Image using currentCase.image with Midnight Navy Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform filter blur-[1px]"
            style={{
              backgroundImage: `url('${currentCase.image}')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/95 via-[#080f1d]/85 to-[#080f1d]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0a2342]/40 rounded-full blur-[140px]" />
        </div>

        <div ref={heroRef} className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Back link */}
          <button
            onClick={() => navigate('/cases')}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Case Studies
          </button>

          <div className="grid md:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="md:col-span-7">
              <span className="inline-block bg-[#0a2342] border border-blue-500/20 text-blue-400 text-xs font-semibold px-3.5 py-1.5 rounded-sm uppercase tracking-wider mb-6">
                {currentCase.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {currentCase.title}
              </h1>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
                {currentCase.overview}
              </p>

              <div className="grid grid-cols-2 gap-4 bg-[#0a2342]/40 backdrop-blur-md border border-white/5 p-4 rounded-sm">
                <div>
                  <p className="text-blue-400 font-semibold text-xs mb-1 uppercase tracking-wider">Client</p>
                  <p className="text-white font-medium text-sm md:text-base">{currentCase.client}</p>
                </div>
                <div>
                  <p className="text-blue-400 font-semibold text-xs mb-1 uppercase tracking-wider">Duration</p>
                  <p className="text-white font-medium text-sm md:text-base">{currentCase.duration}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl shadow-blue-950/50 group">
                <img
                  src={currentCase.image}
                  alt={currentCase.title}
                  className="w-full h-[360px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div ref={contentRef} className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">

            {/* Challenge */}
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-[#0a2342] rounded-sm flex items-center justify-center border border-blue-500/30 mr-4 flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">The Challenge</h2>
                  <div className="w-16 h-0.5 bg-blue-400"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-14">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {currentCase.details.challenge}
                </p>
              </div>
            </div>

            {/* Approach */}
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-[#0a2342] rounded-sm flex items-center justify-center border border-blue-500/30 mr-4 flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Approach</h2>
                  <div className="w-16 h-0.5 bg-blue-400"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-14">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {currentCase.details.approach}
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-[#0a2342] rounded-sm flex items-center justify-center border border-blue-500/30 mr-4 flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">The Result</h2>
                  <div className="w-16 h-0.5 bg-blue-400"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-14">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {currentCase.details.result}
                </p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-[#0a2342] rounded-sm flex items-center justify-center border border-blue-500/30 mr-4 flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Impact Metrics</h2>
                  <div className="w-16 h-0.5 bg-blue-400"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-14">
                <div className="grid md:grid-cols-2 gap-6">
                  {currentCase.details.impactMetrics && currentCase.details.impactMetrics.map((metric, index) => {
                    const getIcon = (value, label) => {
                      const text = `${value} ${label}`.toLowerCase();
                      if (text.includes('revenue') || text.includes('ancillary')) return DollarSign;
                      if (text.includes('process') || text.includes('faster') || text.includes('speed')) return Clock;
                      if (text.includes('align') || text.includes('collaboration') || text.includes('cross')) return Users;
                      if (text.includes('accuracy') || text.includes('integrity') || text.includes('data')) return Database;
                      if (text.includes('efficiency') || text.includes('operational')) return BarChart3;
                      if (text.includes('improved') || text.includes('enhanced') || text.includes('increased')) return TrendingUp;
                      if (text.includes('satisfaction') || text.includes('experience')) return CheckCircle;
                      if (text.includes('security') || text.includes('protected')) return Shield;
                      if (text.includes('reduced') || text.includes('cost')) return Target;
                      if (text.includes('scalable') || text.includes('framework')) return RefreshCw;
                      if (text.includes('personalization') || text.includes('insights')) return LineChart;
                      if (text.includes('systems') || text.includes('consolidated')) return Package;
                      return Zap;
                    };

                    const Icon = getIcon(metric.value, metric.label);

                    return (
                      <div key={index} className="bg-[#0a2342]/30 border border-white/5 rounded-sm p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-sm bg-[#0a2342] flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                            <Icon className="text-blue-400" size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                              {metric.value}
                            </div>
                            <p className="text-gray-300 text-sm md:text-base">
                              {metric.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Case Studies */}
      <div className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Related Case Studies</h2>
          <p className="text-gray-400 mb-10 text-sm md:text-base">Explore more success stories from our portfolio</p>

          <div className="grid md:grid-cols-2 gap-8">
            {relatedCases.map((study, index) => (
              <div
                key={study.slug}
                ref={el => relatedRef.current[index] = el}
                onClick={() => navigate(`/cases/${study.slug}`)}
                className="group bg-[#0a2342]/20 rounded-sm overflow-hidden border border-white/5 hover:border-blue-500/40 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d] via-[#080f1d]/40 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-[#0a2342] text-white px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border border-white/10">
                    {study.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                    {study.overview}
                  </p>
                  <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors text-sm">
                    <span className="mr-2">Read Case Study</span>
                    <ChevronRight className="transform group-hover:translate-x-1 transition-transform" size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-white/5 bg-[#0a2342]/15">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help transform your organization and deliver measurable outcomes.
            </p>
            <CalendlyPopup
              text="BOOK A FREE CONSULTATION"
              className="inline-flex items-center bg-[#ffffff] text-[#000000] px-8 py-4 rounded-sm font-semibold hover:bg-gray-200 transition-all shadow-lg hover:scale-105 cursor-pointer text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetails;