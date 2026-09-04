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
      return { title: 'Core Deliverables', items: service.deliverables, type: 'deliverables' };
    }
    if (service.solutions) {
      return { title: 'Key Solutions', items: service.solutions, type: 'solutions' };
    }
    if (service.courses) {
      return { title: 'Featured Courses', items: service.courses, type: 'courses' };
    }
    if (service.access) {
      return { title: 'What You Get Access To', items: service.access, type: 'access' };
    }
    return { title: 'Details', items: [], type: 'deliverables' };
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
      <div className="bg-[#080f1d] min-h-screen flex items-center justify-center text-[#ffffff]">
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
    <div className="bg-[#080f1d] min-h-screen text-[#ffffff] pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.heroImage || service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d] via-[#080f1d]/80 to-[#080f1d]/40" />

        <div ref={heroRef} className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12">
          <div className="max-w-4xl">
         
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#ffffff] mb-4 leading-tight">
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff] mb-4">
                Executive Overview
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>
              {service.outcome && (
                <div className="bg-[#0a2342]/30 rounded-sm p-6">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold text-[#ffffff] mb-1">Expected Business Outcome</h3>
                      <p className="text-gray-300 text-sm">{service.outcome}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative h-[360px] rounded-sm overflow-hidden shadow-2xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d]/60 to-transparent" />
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
                <div key={idx} className="bg-[#0a2342]/20 rounded-sm p-6 transition-all">
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
                    className="bg-[#0a2342]/20 rounded-sm p-6 transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-[#0a2342] flex items-center justify-center text-blue-400 flex-shrink-0">
                        <ItemIcon className="w-5 h-5" />
                      </div>
                      <p className="text-gray-300 text-sm font-medium leading-relaxed">{item}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {service.designedFor && (
              <div className="mt-8 bg-[#0a2342]/20 rounded-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#0a2342] flex items-center justify-center flex-shrink-0 text-blue-400">
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
        <div className="fade-in-section bg-[#0a2342]/30 rounded-sm p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to implement {service.title}?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Book a complimentary consultation with our practice leads to build your strategic implementation roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CalendlyPopup
              text="BOOK A FREE CONSULTATION"
              className="px-8 py-3.5 rounded-sm text-xs sm:text-sm font-semibold bg-[#ffffff] hover:bg-gray-200 text-[#000000] shadow-lg hover:scale-105 transition-all cursor-pointer"
            />
            <Link
              to="/assessment"
              className="px-8 py-3.5 rounded-sm text-xs sm:text-sm font-semibold bg-[#0a2342] hover:bg-[#0a2342]/80 text-gray-200 transition-all inline-flex items-center justify-center"
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