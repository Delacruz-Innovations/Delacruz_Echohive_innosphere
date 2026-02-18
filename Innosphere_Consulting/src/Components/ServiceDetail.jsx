import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Users, Target, TrendingUp, Award, Clock, ChevronRight,
  Package, Lightbulb, BookOpen, UserCheck, FileText, GitBranch,
  CheckSquare, Search, Map, Rocket, RefreshCw, Zap, User, Crown,
  GraduationCap, Headphones, Settings, Box
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
    const text = itemText.toLowerCase();

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
    if (service.deliverables) {
      return {
        title: 'What You Get',
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
        title: 'Solutions include',
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
        title: 'We deliver',
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
        title: 'Courses Offereds',
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
      items: service.access
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
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Service Not Found</h2>
        </div>
      </div>
    );
  }

  const sectionConfig = getSectionConfig();

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40" />

        <div ref={heroRef} className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12 md:pb-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {service.title}
            </h1>
            <div className="w-16 h-0.5 bg-[#4a7ba7] mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-16">
        {/* Overview Section */}
        <div className="fade-in-section mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Overview
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>
              {service.outcome && (
                <div className="bg-gradient-to-br from-[#4a7ba7]/20 to-blue-900/20 border border-cyan-800/30 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-[#4a7ba7] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Expected Outcome</h3>
                      <p className="text-gray-300">{service.outcome}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Deliverables/Solutions/Access Section */}
        <div className="fade-in-section mb-20">
          {/* Title Section with Icon */}
          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {sectionConfig.title}
            </h2>
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionConfig.items.map((item, index) => {
              const ItemIcon = getItemIcon(item, sectionConfig.type);
              return (
                <div
                  key={index}
                  className=" rounded-xl p-6  transition-all duration-300 hover:shadow-lg  group"
                >
                  <div className="flex flex-col  items-center gap-3">
                    <ItemIcon className="w-15 h-15 text-[#4a7ba7] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-300 leading-relaxed text-xl font-semibold text-center">{item}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {service.note && (
            <div className="mt-8 text-center">
              <p className="text-[#4a7ba7] text-lg font-medium">{service.note}</p>
            </div>
          )}

          {service.designedFor && (
            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-[#4a7ba7]/20 border border-blue-800/30 rounded-xl p-6 hover:border-blue-700/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Designed For</h3>
                  <p className="text-gray-300 leading-relaxed">{service.designedFor}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="fade-in-section">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help transform your business with our {service.title.toLowerCase()} services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyPopup
                text="BOOK A FREE CONSULTATION"
                className="inline-flex items-center bg-[#4a7ba7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-700 transition-all shadow-lg shadow-[#4a7ba7]/30 border-none cursor-pointer"
              />
              <Link to="/our_services">
                <button className="inline-flex items-center bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700">
                  <span>View All Services</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;