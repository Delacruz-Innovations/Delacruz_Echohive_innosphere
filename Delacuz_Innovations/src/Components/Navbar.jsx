import { ChevronDown, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Logo from '../assets/Images/logo.jpg'
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      <div
        id="navbar"
       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
  isScrolled
    ? 'bg-black backdrop-blur-md shadow-lg py-2'
    : 'bg-black py-2 md:py-4'
}`}s
      >
        {/* Animated bottom border */}
        <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-600 via-gray-400 to-gray-500 transition-opacity duration-500 ${
  isScrolled ? 'opacity-100' : 'opacity-0'
}`}
        />

        <div className=" mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
         <Link to="/">   <h1
              className={`font-bold uppercase text-white transition-all duration-500 ${
                isScrolled ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'
              }`}
            >
              <img src={Logo} alt="" className='w-24' />
           
            </h1> </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex gap-8 font-medium items-center text-gray-400">
              <Link to='/about'>  <li className="hover:text-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 list-none">
                  About Us
                </li></Link>

                {/* Dropdown Menu */}
                <li
                  className="relative group list-none"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                 <div className="flex items-center gap-1 hover:text-gray-200 cursor-pointer transition-all duration-300">
                    Our Services
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Dropdown Content */}
                  <div
                   className={`absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-md rounded-lg shadow-xl overflow-hidden transition-all duration-300  ${
                      isDropdownOpen
                        ? 'opacity-100 translate-y-0 visible'
                        : 'opacity-0 -translate-y-2 invisible'
                    }`}
                  >
                    <div className="py-2">
                     {services.map((service, index) => (
  <Link 
    to={`/services/${service.slug}`} 
    key={index}
  >
    <div
      className="px-4 py-3 hover:bg-gray-800/50 hover:text-gray-200 cursor-pointer transition-all duration-200 text-gray-400"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: isDropdownOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none',
      }}
    >
      {service.name}
    </div>
  </Link>
))}
                    </div>
                  </div>
                </li>

<Link to='/case-studies'>
  <li className="hover:text-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 list-none">
    Case Studies
  </li>
</Link>
                <Link to='/jobs'>
  <li className="hover:text-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 list-none">
    Careers
  </li>
</Link>

<Link to='/Offices'>
  <li className="hover:text-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 list-none">
    Location
  </li>
</Link>

<Link to='/insights'>
  <li className="hover:text-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 list-none">
    Insights
  </li>
</Link>
              </nav>

              <div className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2.5 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-700/50 hidden">
                Subscribe
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

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="flex flex-col gap-4 pb-6">
            <Link to='/about' onClick={closeMobileMenu}>
  <div className="text-gray-400 hover:text-gray-200 cursor-pointer transition-all duration-300 py-2 border-b border-gray-700">
    About Us
  </div>
</Link>

              {/* Mobile Dropdown */}
              <div>
                <div
                  className="flex items-center justify-between text-gray-300 hover:text-[#6bb3d8] cursor-pointer transition-all duration-300 py-2 border-b border-gray-700"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Our Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                 {services.map((service, index) => (
  <Link 
    to={`/services/${service.slug}`} 
    key={index} 
    onClick={closeMobileMenu}
  >
    <div className="pl-4 py-2 text-gray-500 hover:text-gray-200 cursor-pointer transition-all duration-200">
      {service.name}
    </div>
  </Link>
))}
                </div>
              </div>

    

<Link to='/case-studies' onClick={closeMobileMenu}>
  <div className="text-gray-400 hover:text-gray-200 cursor-pointer transition-all duration-300 py-2 border-b border-gray-700">
    Case Studies
  </div>
</Link>

<Link to='/jobs' onClick={closeMobileMenu}>
  <div className="text-gray-400 hover:text-gray-200 cursor-pointer transition-all duration-300 py-2 border-b border-gray-700">
    Careers
  </div>
</Link>


<Link to='/Offices' onClick={closeMobileMenu}>
  <div className="text-gray-400 hover:text-gray-200 cursor-pointer transition-all duration-300 py-2 border-b border-gray-700">
    Location
  </div>
</Link>


<Link to='/insights' onClick={closeMobileMenu}>
  <div className="text-gray-400 hover:text-gray-200 cursor-pointer transition-all duration-300 py-2 border-b border-gray-700">
    Insights
  </div>
</Link>

             <div className="bg-purple-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 text-center mt-2 hidden">
                Subscribe
              </div>
            </nav>
          </div>
        </div>
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