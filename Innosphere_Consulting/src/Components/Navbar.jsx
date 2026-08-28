import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  MapPin, 
  Mail, 
  Globe, 
  Layers, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import CalendlyPopup from './CalendlyPopup';
import { servicePillars } from '../servicesData';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('UAE EN');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activePillarHover, setActivePillarHover] = useState(0);

  const pillarIcons = {
    "business-transformation-performance": Layers,
    "digital-transformation-technology-strategy": TrendingUp,
    "ai-business-automation": Cpu,
    "cybersecurity-digital-risk": ShieldCheck,
    "digital-solutions-software": Code2
  };

  // Close menus on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/98 backdrop-blur-2xl text-[#ffffff]">
      {/* 1. Top Utility Micro-Bar */}
      <div className="bg-[#000000] text-[11px] sm:text-xs text-gray-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Left: Location & Email */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <div className="flex items-center gap-1.5 hover:text-[#ffffff] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span>Dubai, UAE</span>
            </div>

            <span className="text-[#0a2342] hidden sm:inline">|</span>

            <a 
              href="mailto:connect@innosphereconsulting.ae"
              className="flex items-center gap-1.5 hover:text-[#ffffff] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span className="hidden xs:inline">connect@innosphereconsulting.ae</span>
              <span className="xs:hidden">Email Us</span>
            </a>
          </div>

          {/* Right: Language / Region Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#0a2342]/40 hover:bg-[#0a2342]/80 transition-all text-gray-200 text-[11px] font-medium"
            >
              <Globe className="w-3 h-3 text-[#3b82f6]" />
              <span>{selectedLang}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-[#000000] rounded-sm shadow-2xl py-1 z-50 text-xs">
                <button
                  onClick={() => { setSelectedLang('UAE EN'); setLangDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#0a2342]/70 text-gray-200 hover:text-[#ffffff] flex items-center justify-between rounded-sm"
                >
                  <span>UAE (EN)</span>
                  {selectedLang === 'UAE EN' && <span className="text-[#3b82f6]">✓</span>}
                </button>
                <button
                  onClick={() => { setSelectedLang('UK EN'); setLangDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#0a2342]/70 text-gray-200 hover:text-[#ffffff] flex items-center justify-between rounded-sm"
                >
                  <span>UK (EN)</span>
                  {selectedLang === 'UK EN' && <span className="text-[#3b82f6]">✓</span>}
                </button>
                <button
                  onClick={() => { setSelectedLang('GLOBAL'); setLangDropdownOpen(false); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#0a2342]/70 text-gray-200 hover:text-[#ffffff] flex items-center justify-between rounded-sm"
                >
                  <span>Global (EN)</span>
                  {selectedLang === 'GLOBAL' && <span className="text-[#3b82f6]">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-3 sm:py-3.5 bg-[#000000]">
        <div className="flex items-center justify-between">
          {/* Company Brand Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img 
              src={Logo} 
              className="w-36 sm:w-44 h-10 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
              alt="Innosphere Consulting" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Home */}
            <Link
              to="/"
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                  : 'text-gray-300 hover:text-[#ffffff]'
              }`}
            >
              Home
            </Link>

            {/* About */}
            <Link
              to="/about"
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                  : 'text-gray-300 hover:text-[#ffffff]'
              }`}
            >
              About
            </Link>

            {/* Services with Mega Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`relative py-1 flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive('/our_services') || isActive('/service') 
                    ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                    : 'text-gray-300 hover:text-[#ffffff]'
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#3b82f6]' : 'text-gray-400'}`} />
              </button>

              {/* 5-Pillar Mega Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 xl:left-1/2 xl:-translate-x-1/2 mt-4 w-[900px] xl:w-[960px] bg-[#000000] rounded-sm p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-3xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                      <span className="w-2 h-2 rounded-sm bg-[#3b82f6]"></span>
                      <span className="text-[#ffffff]">Innosphere Strategic Practice Areas</span>
                    </div>
                    <Link 
                      to="/our_services" 
                      className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
                    >
                      View All Services Overview 
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    {servicePillars.map((pillar, index) => {
                      const IconComponent = pillarIcons[pillar.slug] || Layers;
                      const isHovered = activePillarHover === index;
                      return (
                        <Link
                          key={pillar.id}
                          to={`/service/${pillar.slug}`}
                          onMouseEnter={() => setActivePillarHover(index)}
                          className={`group p-3.5 rounded-sm transition-all text-left flex flex-col justify-between ${
                            isHovered 
                              ? 'bg-[#0a2342]/70 shadow-lg' 
                              : 'bg-[#0a2342]/25 hover:bg-[#0a2342]/50'
                          }`}
                        >
                          <div>
                            <div className="w-8 h-8 rounded-sm bg-[#0a2342] flex items-center justify-center text-[#ffffff] mb-2.5 group-hover:bg-[#ffffff] group-hover:text-[#0a2342] transition-all">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h4 className="text-[#ffffff] text-xs font-bold leading-tight group-hover:text-blue-300 transition-colors mb-2">
                              {pillar.title}
                            </h4>
                            <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed mb-3">
                              {pillar.shortDescription}
                            </p>
                          </div>

                          <div className="space-y-1 pt-2">
                            {pillar.subServices.slice(0, 3).map((sub, i) => (
                              <p key={i} className="text-[10.5px] text-gray-300 group-hover:text-[#ffffff] truncate">
                                • {sub.name}
                              </p>
                            ))}
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mega Menu Bottom Diagnostic Banner */}
                  <div className="mt-4 pt-3 flex items-center justify-between bg-[#0a2342]/30 rounded-sm p-3">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-200">
                        Need an objective operational health check? Take the <strong className="text-[#ffffff] font-medium">Transformation Assessment™️</strong>
                      </span>
                    </div>
                    <Link
                      to="/assessment"
                      className="px-3.5 py-1.5 rounded-sm text-xs font-semibold bg-[#0a2342] hover:bg-[#0a2342]/80 text-[#ffffff] transition-all shadow"
                    >
                      Start Assessment
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Assessment Link */}
            <Link
              to="/assessment"
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive('/assessment') 
                  ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                  : 'text-gray-300 hover:text-[#ffffff]'
              }`}
            >
              Assessment
            </Link>

            {/* Case Studies */}
            <Link
              to="/cases"
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive('/cases') 
                  ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                  : 'text-gray-300 hover:text-[#ffffff]'
              }`}
            >
              Case Studies
            </Link>

            {/* Insights */}
            <Link
              to="/insights"
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive('/insights') 
                  ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                  : 'text-gray-300 hover:text-[#ffffff]'
              }`}
            >
              Insights
            </Link>

            {/* Training / Academy */}
            <Link
              to="/academy"
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive('/academy') 
                  ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                  : 'text-gray-300 hover:text-[#ffffff]'
              }`}
            >
              Academy
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-[#ffffff] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#ffffff] after:rounded-sm' 
                  : 'text-gray-300 hover:text-[#ffffff]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: "Book a Consultation →" Button */}
          <div className="hidden lg:flex items-center gap-3">
            <CalendlyPopup
              text="Book a Consultation →"
              className="bg-[#0a2342] hover:bg-[#0a2342]/80 text-[#ffffff] px-5 py-2 rounded-sm text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm"
            />
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-[#ffffff] rounded-sm bg-[#0a2342]/40"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#000000] px-6 py-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            className={`block text-sm font-medium py-1.5 ${isActive('/') ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`block text-sm font-medium py-1.5 ${isActive('/about') ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
          >
            About
          </Link>

          {/* Mobile Services Accordion */}
          <div className="py-2.5">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-300"
            >
              <span>Services (5 Pillars)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#ffffff]' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className="mt-3 space-y-2 pl-3">
                <Link
                  to="/our_services"
                  className="block text-xs font-semibold text-blue-400 py-1"
                >
                  View All Services Overview →
                </Link>
                {servicePillars.map((pillar) => (
                  <Link
                    key={pillar.id}
                    to={`/service/${pillar.slug}`}
                    className="block text-xs text-gray-400 hover:text-[#ffffff] py-1"
                  >
                    {pillar.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/assessment"
            className={`block text-sm font-medium py-1.5 ${isActive('/assessment') ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
          >
            Assessment™️
          </Link>

          <Link
            to="/cases"
            className={`block text-sm font-medium py-1.5 ${isActive('/cases') ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
          >
            Case Studies
          </Link>

          <Link
            to="/insights"
            className={`block text-sm font-medium py-1.5 ${isActive('/insights') ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
          >
            Insights
          </Link>

          <Link
            to="/academy"
            className={`block text-sm font-medium py-1.5 ${isActive('/academy') ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
          >
            Academy
          </Link>

          <Link
            to="/contact"
            className={`block text-sm font-medium py-1.5 ${isActive('/contact') ? 'text-blue-400 font-semibold' : 'text-gray-300'}`}
          >
            Contact
          </Link>

          <div className="pt-3">
            <CalendlyPopup
              text="Book a Consultation →"
              className="w-full text-center py-2.5 rounded-sm text-xs font-semibold bg-[#0a2342] text-[#ffffff] hover:bg-[#0a2342]/80 transition-all cursor-pointer"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;