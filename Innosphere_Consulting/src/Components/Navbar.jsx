import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import CalendlyPopup from './CalendlyPopup';
import { servicePillars } from '../servicesData';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('UAE EN');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activePillarHover, setActivePillarHover] = useState(0);

  const mobileMenuRef = useRef(null);
  const isClosingRef = useRef(false);

  const pillarIcons = {
    "business-transformation-performance": Layers,
    "digital-transformation-technology-strategy": TrendingUp,
    "ai-business-automation": Cpu,
    "cybersecurity-digital-risk": ShieldCheck,
    "digital-solutions-software": Code2
  };

  const openMobileMenu = () => {
    isClosingRef.current = false;
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = (callback) => {
    if (isClosingRef.current || !mobileMenuRef.current) {
      setMobileMenuOpen(false);
      document.body.style.overflow = '';
      if (typeof callback === 'function') callback();
      return;
    }
    isClosingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setMobileMenuOpen(false);
        isClosingRef.current = false;
        document.body.style.overflow = '';
        if (typeof callback === 'function') callback();
      }
    });

    // Stagger items closing animation
    tl.to('.mobile-nav-item', {
      opacity: 0,
      y: -15,
      stagger: 0.03,
      duration: 0.22,
      ease: 'power2.in'
    })
    .to('.mobile-nav-footer', {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in'
    }, '<0.05')
    .to(mobileMenuRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.1');
  };

  const handleMobileNav = (path) => {
    if (location.pathname === path) {
      closeMobileMenu();
    } else {
      closeMobileMenu(() => navigate(path));
    }
  };

  // Animate stagger opening when mobileMenuOpen becomes true
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      document.body.style.overflow = 'hidden';

      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        gsap.set(mobileMenuRef.current, { opacity: 0 });
        gsap.set('.mobile-nav-item', { opacity: 0, y: 25 });
        gsap.set('.mobile-nav-footer', { opacity: 0, y: 15 });

        tl.to(mobileMenuRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out'
        })
        .to('.mobile-nav-item', {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.35,
          ease: 'power3.out'
        }, '-=0.15')
        .to('.mobile-nav-footer', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power3.out'
        }, '-=0.2');
      }, mobileMenuRef);

      return () => {
        ctx.revert();
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Clean up body overflow on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setLangDropdownOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080f1d]/98 backdrop-blur-2xl text-[#ffffff]">
      {/* 1. Top Utility Micro-Bar */}
      <div className="bg-[#080f1d] text-[11px] sm:text-xs text-gray-300 py-1.5 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Left: Location & Email */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <div className="flex items-center gap-1.5 hover:text-[#ffffff] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span>Dubai Internet City, UAE</span>
            </div>

            <span className="text-[#0a2342] hidden sm:inline">|</span>

            <a 
              href="mailto:info@innosphereconsulting.ae" 
              className="flex items-center gap-1.5 hover:text-[#ffffff] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span className="hidden xs:inline">info@innosphereconsulting.ae</span>
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
              <div className="absolute right-0 mt-1.5 w-32 bg-[#080f1d] rounded-sm shadow-2xl py-1 z-50 text-xs border border-white/10">
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-3 sm:py-3.5 bg-[#080f1d]">
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
                <div className="absolute top-full -left-20 xl:left-1/2 xl:-translate-x-1/2 mt-3 w-[940px] xl:w-[1020px] bg-[#020611] rounded-sm p-6 shadow-[0_25px_70px_rgba(0,0,0,0.98)] backdrop-blur-3xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Subtle top ambient glow */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-sm bg-blue-500 shadow-sm shadow-blue-500/50 animate-pulse"></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Innosphere Enterprise Practice Areas
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0a2342] text-blue-300 font-semibold">
                        5 Strategic Pillars
                      </span>
                    </div>

                    <Link 
                      to="/our_services" 
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group transition-colors"
                    >
                      <span>View All Services & Frameworks</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* 5 Columns Grid */}
                  <div className="grid grid-cols-5 gap-3">
                    {servicePillars.map((pillar, index) => {
                      const IconComponent = pillarIcons[pillar.slug] || Layers;
                      const isHovered = activePillarHover === index;
                      return (
                        <Link
                          key={pillar.id}
                          to={`/service/${pillar.slug}`}
                          onMouseEnter={() => setActivePillarHover(index)}
                          className={`group p-4 rounded-sm transition-all duration-200 text-left flex flex-col justify-between cursor-pointer ${
                            isHovered 
                              ? 'bg-gradient-to-b from-[#0a2342]/90 to-[#0a2342]/50 shadow-xl shadow-blue-950/40 scale-[1.02]' 
                              : 'bg-[#0a2342]/30 hover:bg-[#0a2342]/60'
                          }`}
                        >
                          <div>
                            <div className="w-9 h-9 rounded-sm bg-[#0a2342] flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h4 className="text-white text-xs font-bold leading-snug group-hover:text-blue-300 transition-colors mb-2 min-h-[32px]">
                              {pillar.title}
                            </h4>
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3">
                              {pillar.shortDescription}
                            </p>
                          </div>

                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            {pillar.subServices.slice(0, 3).map((sub, i) => (
                              <p key={i} className="text-[10.5px] text-gray-300 group-hover:text-white truncate flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-blue-500/60 flex-shrink-0"></span>
                                <span className="truncate">{sub.name}</span>
                              </p>
                            ))}
                            <div className="pt-2 text-[10.5px] font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                              <span>Explore</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mega Menu Bottom Diagnostic Banner */}
                  <div className="mt-4 pt-3 flex items-center justify-between bg-gradient-to-r from-[#0a2342]/50 via-[#0a2342]/30 to-transparent rounded-sm p-3.5 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Need an objective operational health check?
                        </div>
                        <div className="text-[11px] text-gray-300">
                          Take our proprietary 3-minute Business Transformation Assessment™️ to receive your maturity score.
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/assessment"
                      className="px-4 py-2 rounded-sm text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 flex-shrink-0"
                    >
                      <span>Take Free Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
            onClick={() => {
              if (mobileMenuOpen) {
                closeMobileMenu();
              } else {
                openMobileMenu();
              }
            }}
            className="lg:hidden p-2 text-gray-300 hover:text-[#ffffff] rounded-sm bg-[#0a2342]/40 border border-blue-900/30 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Full-Screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 z-[100] w-full h-[100dvh] bg-[#080f1d]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto no-scrollbar px-6 py-6 sm:px-10 text-white"
        >
          {/* Ambient Lighting */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#0a2342]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar inside Drawer */}
          <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
            <button 
              onClick={() => handleMobileNav('/')} 
              className="inline-flex items-center text-left cursor-pointer"
            >
              <img src={Logo} alt="Innosphere Consulting" className="w-36 h-12 object-contain" />
            </button>

            <button
              onClick={() => closeMobileMenu()}
              className="p-2.5 text-gray-300 hover:text-white rounded-full bg-[#0a2342]/60 hover:bg-[#0a2342] border border-blue-900/40 transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Staggered List */}
          <div className="relative z-10 py-6 space-y-1 flex-1 overflow-y-auto no-scrollbar">
            {/* Home */}
            <div className="mobile-nav-item border-b border-white/5 py-1">
              <button
                onClick={() => handleMobileNav('/')}
                className={`w-full text-left py-2.5 flex items-center justify-between text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                  isActive('/') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>

            {/* About */}
            <div className="mobile-nav-item border-b border-white/5 py-1">
              <button
                onClick={() => handleMobileNav('/about')}
                className={`w-full text-left py-2.5 flex items-center justify-between text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                  isActive('/about') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>About</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>

            {/* Services Accordion */}
            <div className="mobile-nav-item border-b border-white/5 py-1.5">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full py-2.5 text-lg sm:text-xl font-medium text-gray-300 hover:text-white cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-[#0a2342] flex items-center justify-center text-blue-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-white">Services</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                    5 Pillars
                  </span>
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-blue-400 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="mt-2 mb-3 space-y-2 pl-1 sm:pl-2">
                  {/* Featured Practice Overview Button */}
                  <button
                    onClick={() => handleMobileNav('/our_services')}
                    className="w-full text-left p-3 rounded-sm bg-gradient-to-r from-blue-900/40 via-[#0a2342]/60 to-[#0a2342]/30 hover:from-blue-800/50 hover:to-blue-950/50 flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-sm bg-blue-600/30 flex items-center justify-center text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                          All Services & Capabilities
                        </div>
                        <div className="text-[10.5px] text-gray-400">
                          Complete strategic practice breakdown
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </button>

                  {/* 5 Pillar Mini Cards */}
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {servicePillars.map((pillar) => {
                      const IconComponent = pillarIcons[pillar.slug] || Layers;
                      return (
                        <button
                          key={pillar.id}
                          onClick={() => handleMobileNav(`/service/${pillar.slug}`)}
                          className="w-full text-left p-2.5 rounded-sm bg-[#0a2342]/30 hover:bg-[#0a2342]/70 flex items-start gap-3 transition-all cursor-pointer group"
                        >
                          <div className="w-8 h-8 rounded-sm bg-[#0a2342] flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
                              {pillar.title}
                            </div>
                            <div className="text-[10.5px] text-gray-400 line-clamp-1 mt-0.5 leading-relaxed">
                              {pillar.shortDescription}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Assessment */}
            <div className="mobile-nav-item border-b border-white/5 py-1">
              <button
                onClick={() => handleMobileNav('/assessment')}
                className={`w-full text-left py-2.5 flex items-center justify-between text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                  isActive('/assessment') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>Assessment™️</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold uppercase">
                    Diagnostic
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>

            {/* Case Studies */}
            <div className="mobile-nav-item border-b border-white/5 py-1">
              <button
                onClick={() => handleMobileNav('/cases')}
                className={`w-full text-left py-2.5 flex items-center justify-between text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                  isActive('/cases') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Case Studies</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>

            {/* Insights */}
            <div className="mobile-nav-item border-b border-white/5 py-1">
              <button
                onClick={() => handleMobileNav('/insights')}
                className={`w-full text-left py-2.5 flex items-center justify-between text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                  isActive('/insights') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Insights</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>

            {/* Academy */}
            <div className="mobile-nav-item border-b border-white/5 py-1">
              <button
                onClick={() => handleMobileNav('/academy')}
                className={`w-full text-left py-2.5 flex items-center justify-between text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                  isActive('/academy') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Academy</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>

            {/* Contact */}
            <div className="mobile-nav-item border-b border-white/5 py-1">
              <button
                onClick={() => handleMobileNav('/contact')}
                className={`w-full text-left py-2.5 flex items-center justify-between text-lg sm:text-xl font-medium transition-colors cursor-pointer ${
                  isActive('/contact') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>Contact</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>
          </div>

          {/* Bottom Drawer Footer */}
          <div className="mobile-nav-footer relative z-10 pt-4 border-t border-white/10 space-y-4">
            <CalendlyPopup
              text="Book a Consultation →"
              className="w-full text-center py-3.5 rounded-sm text-sm font-semibold bg-[#0a2342] hover:bg-blue-900 text-white transition-all cursor-pointer shadow-lg border border-blue-500/30"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>Dubai Internet City, UAE</span>
              </div>
              <a 
                href="mailto:info@innosphereconsulting.ae" 
                className="hover:text-white transition-colors"
              >
                info@innosphereconsulting.ae
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;