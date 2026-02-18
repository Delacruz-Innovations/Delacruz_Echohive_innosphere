import React, { useEffect, useRef, useState } from 'react';
import { Play, X, ChevronDown, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Logo from '../assets/Logo.png'
import CalendlyPopup from './CalendlyPopup';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const servicesLinks = [
    { name: 'Technology & IT Services', href: '/services/technology-it-services' },
    { name: 'Cyber Security Consulting', href: '/services/cyber-security-consulting' },
    { name: 'Business Management Consulting', href: '/services/business-management-consulting' },
    { name: 'Marketing Branding & Advertising', href: '/services/marketing-branding-advertising' },
    { name: 'Software Innovation Labs', href: '/services/software-innovation-labs' }
  ];

  const industriesLinks = [
    { name: 'Financial Services & Fintech', href: '/industries/financial-services' },
    { name: 'Healthcare & MedTech', href: '/industries/healthcare' },
    { name: 'Energy & Infrastructure', href: '/industries/energy-infrastructure' },
    { name: 'Public Sector', href: '/industries/public-sector' },
    { name: 'Retail & E-commerce', href: '/industries/retail-ecommerce' }
  ];

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (servicesDropdownOpen) {
      gsap.fromTo(
        '.services-dropdown',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [servicesDropdownOpen]);

  useEffect(() => {
    if (industriesDropdownOpen) {
      gsap.fromTo(
        '.industries-dropdown',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [industriesDropdownOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(
        '.mobile-menu',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-slate-950 backdrop-blur-xl border border-gray-700/50 rounded-full px-8 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to='/' className="flex items-center gap-3">
            <img src={Logo} className='w-44 h-14 object-cover' alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/about"
              className={`transition-colors text-sm font-medium tracking-wide ${isActive('/about') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
            >
              ABOUT US
            </Link>

            <Link
              to="/our_services"
              className={`transition-colors text-sm font-medium tracking-wide ${isActive('/our_services') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
            >
              OUR SERVICES
            </Link>

            <Link
              to="/industries"
              className={`transition-colors text-sm font-medium tracking-wide ${isActive('/industries') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
            >
              INDUSTRIES
            </Link>
            <Link
              to="/cases"
              className={`transition-colors text-sm font-medium tracking-wide ${isActive('/cases') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
            >
              CASE STUDIES
            </Link>

            <Link
              to="/insights"
              className={`transition-colors text-sm font-medium tracking-wide ${isActive('/insights') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
            >
              INSIGHTS
            </Link>

            <Link
              to="/academy"
              className={`transition-colors text-sm font-medium tracking-wide ${isActive('/academy') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
            >
              ACADEMY
            </Link>

          </div>
          <div>

            <CalendlyPopup
              text="BOOK A FREE CONSULTATION"
              className="transition-colors text-sm font-medium tracking-wide bg-[#6b9dc7] px-6 py-3 hover:bg-blue-700 rounded-full text-white hidden lg:block border-none cursor-pointer"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu lg:hidden absolute top-full left-0 right-0 mt-4 bg-slate-950 backdrop-blur-xl border border-[#1e3a5f]/50 rounded-3xl shadow-2xl overflow-hidden">
          <div className="py-4">
            <Link
              to="/about"
              className={`block px-6 py-3 transition-colors text-sm font-medium tracking-wide ${isActive('/about') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              to="/our_services"
              className={`block px-6 py-3 transition-colors text-sm font-medium tracking-wide ${isActive('/our_services') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              OUR SERVICES
            </Link>
            <Link
              to="/industries"
              className={`block px-6 py-3 transition-colors text-sm font-medium tracking-wide ${isActive('/industries') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              INDUSTRIES
            </Link>





            <Link
              to="/cases"
              className={`block px-6 py-3 transition-colors text-sm font-medium tracking-wide ${isActive('/cases') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              CASE STUDIES
            </Link>

            <Link
              to="/insights"
              className={`block px-6 py-3 transition-colors text-sm font-medium tracking-wide ${isActive('/insights') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              INSIGHTS
            </Link>

            <Link
              to="/academy"
              className={`block px-6 py-3 transition-colors text-sm font-medium tracking-wide ${isActive('/academy') ? 'text-[#6b9dc7]' : 'text-gray-300 hover:text-[#a8c5e0]'
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              ACADEMY
            </Link>

            <CalendlyPopup
              text="BOOK A FREE CONSULTATION"
              className="block w-[calc(100%-3rem)] px-6 py-3 mx-6 mt-2 text-center transition-colors text-sm font-medium tracking-wide bg-blue-500 hover:bg-blue-700 rounded-full text-white border-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;