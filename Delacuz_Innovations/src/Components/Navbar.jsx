import { ChevronDown, Menu, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/Images/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import useHoverGlow from '../utils/useHoverGlow';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import servicesData from '../ServicesData.json';

// Wraps react-router's Link with the cinematic curtain-wipe transition:
// the curtain fully covers the screen, the route swaps underneath while
// hidden, then the curtain sweeps off revealing the new page.
const CURTAIN_COVER_MS = 480;
const CURTAIN_TOTAL_MS = 880;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();

  const goTo = (path) => {
    if (path === location.pathname || isTransitioning) return;

    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);

    if (reduced) {
      navigate(path);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => navigate(path), CURTAIN_COVER_MS);
    setTimeout(() => setIsTransitioning(false), CURTAIN_TOTAL_MS);
  };

  const NavLink = ({ to, className, children, ...rest }) => (
    <Link
      to={to}
      onClick={(e) => {
        e.preventDefault();
        goTo(to);
      }}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
  // Prefix match so dynamic hero routes (e.g. /services/:slug) also blend with the navbar at the top.
  const transparentPathPrefixes = ['/about', '/services', '/business-performance-engineering', '/industries', '/business-performance-platform', '/case-studies', '/jobs', '/offices', '/insights'];
  const isTransparentPage =
    location.pathname === '/' ||
    transparentPathPrefixes.some((prefix) => location.pathname.toLowerCase().startsWith(prefix));
  const transparent = isTransparentPage && !isScrolled;
  const ghostCtaRef = useRef(null);
  const primaryCtaRef = useRef(null);
  useHoverGlow(ghostCtaRef, { scale: 1.03 });
  useHoverGlow(primaryCtaRef);
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      // Keep the navbar visible near the top, while a menu is open, and while
      // scrolling up. Only hide it once scrolling down past that point.
      if (currentScrollY < 150 || isMobileMenuOpen || isDropdownOpen) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, isDropdownOpen]);

  // Lock page scroll while the full-screen mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

const services = servicesData.services.map((area) => ({ name: area.title, slug: area.slug }));

  const isActive = (path) => location.pathname === path;

  const topLinkClass = (path) =>
    `relative pb-1 hover:text-purple-300 cursor-pointer transition-colors duration-300 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg ${
      isActive(path) ? 'text-white' : ''
    }`;

  const underline = (path) => (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-purple-400 transition-transform duration-300 ${
        isActive(path) ? 'scale-x-100' : 'scale-x-0'
      }`}
    />
  );

  return (
    <>
      {/* Cinematic curtain-wipe transition overlay */}
      <div className="nav-curtain">
        <div className={`nav-curtain-layer layer-1 ${isTransitioning ? 'animate' : ''}`} />
        <div className={`nav-curtain-layer layer-2 ${isTransitioning ? 'animate' : ''}`} />
        <div className={`nav-curtain-layer layer-3 ${isTransitioning ? 'animate' : ''}`} />
      </div>

      <header
        id="navbar"
       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
  isHidden ? '-translate-y-full' : 'translate-y-0'
} ${
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
                <NavLink to='/business-performance-engineering' className={topLinkClass('/business-performance-engineering')}>
                  BPE™
                  {underline('/business-performance-engineering')}
                </NavLink>
              </li>

                {/* Dropdown Menu */}
                <li
                  className="relative group list-none"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                 <div className="flex items-center gap-1 hover:text-purple-300 cursor-pointer transition-colors duration-300">
                    Solutions
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
  <NavLink
    to={`/services/${service.slug}`}
    className="block px-4 py-3 hover:bg-white/5 hover:text-purple-300 cursor-pointer transition-colors duration-200 text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
    style={{
      animationDelay: `${index * 50}ms`,
      animation: isDropdownOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none',
    }}
  >
      {service.name}
  </NavLink>
  </li>
))}
                    </ul>
                  </div>
                </li>

                <li>
                  <NavLink to='/about' className={topLinkClass('/about')}>
                    About Us
                    {underline('/about')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/industries' className={topLinkClass('/industries')}>
                    Industries
                    {underline('/industries')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/business-performance-platform' className={topLinkClass('/business-performance-platform')}>
                    BPP
                    {underline('/business-performance-platform')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/insights' className={topLinkClass('/insights')}>
                    Insights
                    {underline('/insights')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/contact' className={topLinkClass('/contact')}>
                    Contact
                    {underline('/contact')}
                  </NavLink>
                </li>
              </ul>

              <div className="flex items-center gap-3">
                <span ref={ghostCtaRef} className="inline-block rounded-full">
                  <NavLink
                    to="/about"
                    className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    Learn More
                  </NavLink>
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
          <NavLink
            to='/business-performance-engineering'
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            BPE™
          </NavLink>

          {/* Mobile Services */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
            >
              Solutions
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
                    <NavLink
                      to={`/services/${service.slug}`}
                      className="text-base text-gray-400 transition-colors duration-200 hover:text-purple-300"
                    >
                      {service.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <NavLink
            to='/about'
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            About Us
          </NavLink>
          <NavLink
            to='/industries'
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            Industries
          </NavLink>
          <NavLink
            to='/business-performance-platform'
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            BPP
          </NavLink>
          <NavLink
            to='/insights'
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            Insights
          </NavLink>
          <NavLink
            to='/contact'
            className="text-2xl font-semibold text-gray-200 transition-colors duration-300 hover:text-purple-300"
          >
            Contact
          </NavLink>

          <div className="mt-4 flex flex-col items-center gap-4">
            <NavLink
              to="/about"
              className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-purple-400"
            >
              Learn More
            </NavLink>
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