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
      <div className=" bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/cases')}
            className="inline-flex items-center text-[#6b9dc7] hover:text-[#6b9dc7] font-semibold transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Case Studies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-slate-950">
      {/* Hero Section - Mobile with background image */}
      <div className="relative pt-20 pb-2">
        {/* Mobile Background Image */}
        <div className="md:hidden absolute inset-0 h-[500px]">
          <img
            src={currentCase.image}
            alt={currentCase.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-950"></div>
        </div>

        <div ref={heroRef} className="container mx-auto px-6 pb-4 pt-12 md:pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <span className="inline-block bg-[#6b9dc7] text-white px-4 py-2 rounded text-sm font-semibold mb-6">
                {currentCase.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {currentCase.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                {currentCase.overview}
              </p>

              <div className="grid grid-cols-2 gap-6 bg-gray-900/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-lg">
                <div>
                  <p className="text-[#6b9dc7] font-semibold text-sm mb-2 uppercase tracking-wider">Client</p>
                  <p className="text-white font-medium">{currentCase.client}</p>
                </div>
                <div>
                  <p className="text-[#6b9dc7] font-semibold text-sm mb-2 uppercase tracking-wider">Duration</p>
                  <p className="text-white font-medium">{currentCase.duration}</p>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src={currentCase.image}
                alt={currentCase.title}
                className="w-full h-[450px] object-cover rounded-lg shadow-2xl border border-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections - New Format */}
      <div ref={contentRef} className=" py-4 ">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">

            {/* Challenge */}
            <div className="mb-2">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-[#6b9dc7]/10 rounded-lg flex items-center justify-center border border-[#6b9dc7]/30 mr-4 flex-shrink-0">
                  <div className="w-6 h-6 bg-[#6b9dc7] rounded"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">The Challenge</h2>
                  <div className="w-16 h-0.5 bg-[#6b9dc7]"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-16">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {currentCase.details.challenge}
                </p>
              </div>
            </div>

            {/* Approach */}
            <div className="mb-2">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-[#6b9dc7]/10 rounded-lg flex items-center justify-center border border-[#6b9dc7]/30 mr-4 flex-shrink-0">
                  <div className="w-6 h-6 bg-[#6b9dc7] rounded"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Approach</h2>
                  <div className="w-16 h-0.5 bg-[#6b9dc7]"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-16">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {currentCase.details.approach}
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="mb-2">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-[#6b9dc7]/10 rounded-lg flex items-center justify-center border border-[#6b9dc7]/30 mr-4 flex-shrink-0">
                  <div className="w-6 h-6 bg-[#6b9dc7] rounded"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">The Result</h2>
                  <div className="w-16 h-0.5 bg-[#6b9dc7]"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-16">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {currentCase.details.result}
                </p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mb-2">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-[#6b9dc7]/10 rounded-lg flex items-center justify-center border border-[#6b9dc7]/30 mr-4 flex-shrink-0">
                  <div className="w-6 h-6 bg-[#6b9dc7] rounded"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Impact Metrics</h2>
                  <div className="w-16 h-0.5 bg-[#6b9dc7]"></div>
                </div>
              </div>
              <div className="ml-0 md:ml-16">
                <div className="grid md:grid-cols-2 gap-6">
                  {currentCase.details.impactMetrics && currentCase.details.impactMetrics.map((metric, index) => {
                    // Assign icons based on metric value/label keywords
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

                      return Zap; // Default icon
                    };

                    const Icon = getIcon(metric.value, metric.label);

                    return (
                      <div key={index} className="rounded-lg p-6 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10  rounded-lg flex items-center justify-center  flex-shrink-0">
                            <Icon className="text-[#6b9dc7]" size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="text-3xl md:text-4xl font-bold text-[#6b9dc7] mb-2">
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
      <div className=" py-4 ">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Related Case Studies</h2>
          <p className="text-gray-400 mb-12">Explore more success stories from our portfolio</p>

          <div className="grid md:grid-cols-2  gap-8">
            {relatedCases.map((study, index) => (
              <div
                key={study.slug}
                ref={el => relatedRef.current[index] = el}
                onClick={() => navigate(`/cases/${study.slug}`)}
                className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#6b9dc7] cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#6b9dc7]/20"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-[#6b9dc7] text-white px-3 py-1 rounded text-xs font-semibold">
                    {study.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#6b9dc7] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {study.overview}
                  </p>
                  <div className="flex items-center text-[#6b9dc7] font-semibold hover:text-[#6b9dc7] transition-colors group/btn text-sm">
                    <span className="mr-2">Read Case Study</span>
                    <ChevronRight className="transform group-hover/btn:translate-x-1 transition-transform" size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help transform your organization and deliver measurable outcomes.
            </p>
            <CalendlyPopup
              text="BOOK A FREE CONSULTATION"
              className="inline-flex items-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-[#6b9dc7]/30 border-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetails;