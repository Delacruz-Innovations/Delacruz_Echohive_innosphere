import { ChevronDown, Menu, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/Images/logo.png'
import { Link, useLocation } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import useHoverGlow from '../utils/useHoverGlow';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const transparentPaths = ['/', '/about', '/services', '/case-studies', '/jobs', '/Offices', '/insights'];
  const isTransparentPage = transparentPaths.includes(location.pathname);
  const transparent = isTransparentPage && !isScrolled;
  const ghostCtaRef = useRef(null);
  const primaryCtaRef = useRef(null);
  useHoverGlow(ghostCtaRef, { scale: 1.03 });
  useHoverGlow(primaryCtaRef);
const closeMobileMenu = () => {
  setIsMobileMenuOpen(false);
  setIsDropdownOpen(false);
};
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll while the full-screen mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

const services = [
  { name: 'Digital Transformation', slug: 'digital-transformation' },
  { name: 'SaaS/PaaS Development', slug: 'SaaS-PaaS-Development' },
  { name: 'IT Consulting', slug: 'it-consulting' },
  { name: 'Training & Support', slug: 'training-support' },
  { name: 'Brand Management', slug: 'brand_management' },
  { name: 'Digital Marketing', slug: 'digital_marketing' },
]

  return (
    <>
      <header
        id="navbar"
       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
  isScrolled
    ? 'bg-black backdrop-blur-md shadow-lg py-2'
    : transparent
    ? 'bg-transparent py-4 md:py-6'
    : 'bg-black py-2 md:py-4'
}`}
      >
        {/* Bottom hairline border, visible once scrolled */}
        <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-white/10 transition-opacity duration-500 ${
  isScrolled ? 'opacity-100' : 'opacity-0'
}`}
        />

        <div className=" mx-auto px-4">
          <div className="flex justify-between items-center">
              {/* Logo */}
          <Link to="/">   <span
              className={`font-bold uppercase text-white transition-all duration-500 ${
                isScrolled ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'
              }`}
            >
              <img src={Logo} alt="Delacruz Innovations" className='w-24' />

            </span> </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex gap-8 font-medium items-center text-gray-400">
              <li>
                <Link to='/about' className="hover:text-purple-300 cursor-pointer transition-colors duration-300 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg">
                  About Us
                </Link>
              </li>

                {/* Dropdown Menu */}
                <li
                  className="relative group list-none"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                 <div className="flex items-center gap-1 hover:text-purple-300 cursor-pointer transition-colors duration-300">
                    Our Services
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Dropdown Content */}
                  <div
                   className={`absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-all duration-300  ${
                       isDropdownOpen
                         ? 'opacity-100 translate-y-0 visible'
                         : 'opacity-0 -translate-y-2 invisible'
                     }`}
                  >
                    <ul className="py-2">
                     {services.map((service, index) => (
  <li key={index}>
  <Link
    to={`/services/${service.slug}`}
    className="block px-4 py-3 hover:bg-white/5 hover:text-purple-300 cursor-pointer transition-colors duration-200 text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
    style={{
      animationDelay: `${index * 50}ms`,
      animation: isDropdownOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none',
    }}
  >
      {service.name}
  </Link>
  </li>
))}
                    </ul>
                  </div>
                </li>

                <li>
                  <Link to='/case-studies' className="hover:text-purple-300 cursor-pointer transition-colors duration-300 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link to='/jobs' className="hover:text-purple-300 cursor-pointer transition-colors duration-300 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to='/Offices' className="hover:text-purple-300 cursor-pointer transition-colors duration-300 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg">
                    Location
                  </Link>
                </li>
                <li>
                  <Link to='/insights' className="hover:text-purple-300 cursor-pointer transition-colors duration-300 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg">
                    Insights
                  </Link>
                </li>
              </ul>

              <div className="flex items-center gap-3">
                <span ref={ghostCtaRef} className="inline-block rounded-full">
                  <Link
                    to="/about"
                    className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    Learn More
                  </Link>
                </span>
                <span ref={primaryCtaRef} className="inline-block rounded-full">
                  <CalendlyPopup
                    text="Book a Consultation"
                    className="inline-flex items-center rounded-full bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  />
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
             className="lg:hidden text-gray-400 hover:text-gray-200 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation — full-screen blurred overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto bg-black/95 py-20 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-center">
          <Link
            to='/about'
            onClick={closeMobileMenu}
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            About Us
          </Link>

          {/* Mobile Services */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
            >
              Our Services
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isDropdownOpen ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="flex flex-col items-center gap-4">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services/${service.slug}`}
                      onClick={closeMobileMenu}
                      className="text-base text-gray-400 transition-colors duration-200 hover:text-purple-300"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            to='/case-studies'
            onClick={closeMobileMenu}
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            Case Studies
          </Link>
          <Link
            to='/jobs'
            onClick={closeMobileMenu}
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            Careers
          </Link>
          <Link
            to='/Offices'
            onClick={closeMobileMenu}
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            Location
          </Link>
          <Link
            to='/insights'
            onClick={closeMobileMenu}
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            Insights
          </Link>

          <div className="mt-4 flex flex-col items-center gap-4">
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-purple-400"
            >
              Learn More
            </Link>
            <CalendlyPopup
              text="Book a Consultation"
              className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-purple-700"
            />
          </div>
        </nav>
      </div>

   

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;