import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Layers, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Logo from '../assets/Logo.png';
import CalendlyPopup from './CalendlyPopup';
import { servicePillars } from '../servicesData';

const Navbar = () => {
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const pillarIcons = {
    "business-transformation-performance": Layers,
    "digital-transformation-technology-strategy": TrendingUp,
    "ai-business-automation": Cpu,
    "cybersecurity-digital-risk": ShieldCheck,
    "digital-solutions-software": Code2
  };

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav ref={navRef} className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl">
      <div className="bg-gray-950/90 backdrop-blur-xl border border-gray-800/80 rounded-full px-6 sm:px-8 py-3.5 shadow-2xl transition-all">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} className="w-40 sm:w-44 h-12 sm:h-14 object-contain" alt="Innosphere Consulting" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              to="/"
              className={`transition-colors text-xs xl:text-sm font-semibold tracking-wider uppercase ${
                isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              HOME
            </Link>

            {/* Services with Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 transition-colors text-xs xl:text-sm font-semibold tracking-wider uppercase ${
                  isActive('/our_services') || isActive('/service') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                OUR SERVICES
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              {/* Mega Dropdown */}
              {servicesDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] bg-gray-950/95 backdrop-blur-2xl border border-gray-800 rounded-3xl p-6 shadow-2xl grid grid-cols-5 gap-4 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {servicePillars.map((pillar) => {
                    const IconComponent = pillarIcons[pillar.slug] || Layers;
                    return (
                      <Link
                        key={pillar.id}
                        to={`/service/${pillar.slug}`}
                        className="group flex flex-col p-3.5 rounded-2xl hover:bg-gray-900/80 border border-transparent hover:border-gray-800 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h4 className="text-white text-xs font-semibold leading-tight group-hover:text-blue-400 transition-colors mb-2">
                          {pillar.title}
                        </h4>
                        <div className="space-y-1 mt-auto">
                          {pillar.subServices.slice(0, 3).map((sub, i) => (
                            <p key={i} className="text-[11px] text-gray-400 line-clamp-1">
                              • {sub.name}
                            </p>
                          ))}
                        </div>
                      </Link>
                    );
                  })}

                  <div className="col-span-5 pt-3 mt-2 border-t border-gray-800/80 flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      Explore all comprehensive strategy, engineering, and digital transformation solutions.
                    </span>
                    <Link
                      to="/our_services"
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 group"
                    >
                      View All Services <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Assessment (Highlighted) */}
            <Link
              to="/assessment"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs xl:text-sm font-semibold tracking-wider uppercase ${
                isActive('/assessment') 
                  ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300' 
                  : 'bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              ASSESSMENT
            </Link>

            <Link
              to="/cases"
              className={`transition-colors text-xs xl:text-sm font-semibold tracking-wider uppercase ${
                isActive('/cases') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              CASE STUDIES
            </Link>

            <Link
              to="/insights"
              className={`transition-colors text-xs xl:text-sm font-semibold tracking-wider uppercase ${
                isActive('/insights') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              INSIGHTS
            </Link>

            <Link
              to="/academy"
              className={`transition-colors text-xs xl:text-sm font-semibold tracking-wider uppercase ${
                isActive('/academy') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              TRAINING
            </Link>

            <Link
              to="/contact"
              className={`transition-colors text-xs xl:text-sm font-semibold tracking-wider uppercase ${
                isActive('/contact') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              CONTACT US
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <CalendlyPopup
              text="BOOK A FREE CONSULTATION"
              className="transition-all text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-5 py-2.5 rounded-full text-white shadow-lg shadow-blue-500/20 hover:scale-105 border-none cursor-pointer"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 bg-gray-950/95 backdrop-blur-2xl border border-gray-800 rounded-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-4">
            <Link
              to="/"
              className={`block text-sm font-semibold tracking-wider uppercase ${
                isActive('/') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              HOME
            </Link>

            {/* Mobile Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full text-sm font-semibold tracking-wider uppercase text-gray-300"
              >
                OUR SERVICES
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="mt-3 ml-3 space-y-2 border-l border-gray-800 pl-4">
                  <Link
                    to="/our_services"
                    className="block text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View All Services Overview →
                  </Link>
                  {servicePillars.map((pillar) => (
                    <Link
                      key={pillar.id}
                      to={`/service/${pillar.slug}`}
                      className="block text-xs text-gray-400 hover:text-white py-1"
                    >
                      {pillar.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/assessment"
              className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-blue-400"
            >
              <Sparkles className="w-4 h-4" />
              ASSESSMENT
            </Link>

            <Link
              to="/cases"
              className={`block text-sm font-semibold tracking-wider uppercase ${
                isActive('/cases') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              CASE STUDIES
            </Link>

            <Link
              to="/insights"
              className={`block text-sm font-semibold tracking-wider uppercase ${
                isActive('/insights') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              INSIGHTS
            </Link>

            <Link
              to="/academy"
              className={`block text-sm font-semibold tracking-wider uppercase ${
                isActive('/academy') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              TRAINING (ACADEMY)
            </Link>

            <Link
              to="/contact"
              className={`block text-sm font-semibold tracking-wider uppercase ${
                isActive('/contact') ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              CONTACT US
            </Link>

            <div className="pt-4 border-t border-gray-800">
              <CalendlyPopup
                text="BOOK A FREE CONSULTATION"
                className="w-full text-center text-xs font-semibold tracking-wider uppercase bg-blue-600 hover:bg-blue-500 py-3 rounded-full text-white border-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;