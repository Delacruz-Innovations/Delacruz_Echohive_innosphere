import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Users, Target, TrendingUp, Award, Clock, ChevronRight,
  Package, Lightbulb, BookOpen, UserCheck, FileText, GitBranch,
  CheckSquare, Search, Map, Rocket, RefreshCw, Zap, User, Crown,
  GraduationCap, Headphones, Settings, Box, CheckCircle2
} from 'lucide-react';

import servicesData from '../servicesData';
import CalendlyPopup from './CalendlyPopup';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const service = servicesData.services.find(s => s.slug === slug);

  // Function to get icon based on item text
  const getItemIcon = (itemText, sectionType) => {
    const text = (itemText || '').toLowerCase();

    // Common keywords mapping to icons
    if (text.includes('documentation') || text.includes('document')) return FileText;
    if (text.includes('process') || text.includes('workflow')) return GitBranch;
    if (text.includes('rules') || text.includes('criteria')) return CheckSquare;
    if (text.includes('evaluation') || text.includes('assessment')) return Search;
    if (text.includes('stakeholder') || text.includes('engagement')) return Users;
    if (text.includes('strategy') || text.includes('roadmap')) return Map;
    if (text.includes('mvp') || text.includes('launch')) return Rocket;
    if (text.includes('agile') || text.includes('scrum') || text.includes('delivery')) return RefreshCw;
    if (text.includes('digital') || text.includes('transformation') || text.includes('automation')) return Zap;
    if (text.includes('user') || text.includes('ux') || text.includes('journey')) return User;
    if (text.includes('training') || text.includes('course')) return BookOpen;
    if (text.includes('mentorship') || text.includes('career')) return Award;
    if (text.includes('product management') || text.includes('product owner')) return Package;
    if (text.includes('business analys')) return FileText;
    if (text.includes('project manager')) return Target;
    if (text.includes('senior') || text.includes('expert')) return Crown;
    if (text.includes('consultant') || text.includes('consulting')) return Lightbulb;
    if (text.includes('optimization') || text.includes('optimisation')) return TrendingUp;
    if (text.includes('dashboard') || text.includes('performance')) return TrendingUp;
    if (text.includes('technology') || text.includes('recommendations')) return Settings;
    if (text.includes('sop')) return FileText;

    // Default icons based on section type
    if (sectionType === 'deliverables') return Box;
    if (sectionType === 'solutions') return Lightbulb;
    if (sectionType === 'courses') return GraduationCap;
    if (sectionType === 'access') return UserCheck;

    return CheckSquare;
  };

  // Get section configuration
  const getSectionConfig = () => {
    if (!service) return { title: 'Details', items: [], type: 'deliverables' };
    if (service.deliverables) {
      return {
        title: 'Key Deliverables & Artefacts',
        Icon: Package,
        iconColor: 'text-[#4a7ba7]',
        iconBg: 'bg-[#4a7ba7]/10',
        borderColor: 'border-[#4a7ba7]/20',
        type: 'deliverables',
        items: service.deliverables
      };
    }
    if (service.solutions) {
      return {
        title: 'Solutions Include',
        Icon: Lightbulb,
        iconColor: 'text-purple-400',
        iconBg: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        type: 'solutions',
        items: service.solutions
      };
    }
    if (service.deliver) {
      return {
        title: 'We Deliver',
        Icon: Lightbulb,
        iconColor: 'text-purple-400',
        iconBg: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        type: 'solutions',
        items: service.deliver
      };
    }

    if (service.courses) {
      return {
        title: 'Courses Offered',
        Icon: BookOpen,
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        type: 'courses',
        items: service.courses
      };
    }
    return {
      title: 'Expert Access',
      Icon: UserCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      type: 'access',
      items: service.access || []
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hero animation
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        heroRef.current.style.transition = 'all 0.8s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // Content animation
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.fade-in-section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [slug]);

  if (!service) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
          <Link to="/our_services" className="text-blue-400 hover:underline">
            ← Return to Services
          </Link>
        </div>
      </div>
    );
  }

  const sectionConfig = getSectionConfig();

  return (
    <div className="bg-gray-950 min-h-screen text-white pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.heroImage || service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40" />

        <div ref={heroRef} className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12">
          <div className="max-w-4xl">
            <Link to="/our_services" className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold mb-4 uppercase tracking-wider">
              <ArrowLeft className="w-3.5 h-3.5" /> All Services
            </Link>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview Section */}
        <div className="fade-in-section mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Executive Overview
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>
              {service.outcome && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">Expected Business Outcome</h3>
                      <p className="text-gray-300 text-sm">{service.outcome}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative h-[360px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Sub Services Breakdown if present */}
        {service.subServices && service.subServices.length > 0 && (
          <div className="fade-in-section mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Core Capabilities & Modules
              </h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                Specialized practices and technical execution domains delivered under this pillar.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {service.subServices.map((sub, idx) => (
                <div key={idx} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    {sub.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{sub.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables Section */}
        {sectionConfig.items && sectionConfig.items.length > 0 && (
          <div className="fade-in-section mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {sectionConfig.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectionConfig.items.map((item, index) => {
                const ItemIcon = getItemIcon(item, sectionConfig.type);
                return (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <ItemIcon className="w-5 h-5" />
                      </div>
                      <p className="text-gray-300 text-sm font-medium leading-relaxed">{item}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {service.designedFor && (
              <div className="mt-8 bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Designed For</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{service.designedFor}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="fade-in-section bg-gradient-to-r from-blue-950/40 via-gray-900 to-indigo-950/40 border border-blue-900/30 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to implement {service.title}?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Book a complimentary consultation with our practice leads to build your strategic implementation roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalendlyPopup
              text="BOOK A FREE CONSULTATION"
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-all border-none cursor-pointer"
            />
            <Link
              to="/assessment"
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-gray-800 hover:bg-gray-700 text-gray-200 transition-all border border-gray-700 inline-flex items-center justify-center"
            >
              Take Free Transformation Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;