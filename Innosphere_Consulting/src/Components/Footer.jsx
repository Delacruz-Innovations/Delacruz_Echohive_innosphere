import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { trackSocialEngagement, trackNewsletterSignup } from '../utils/analytics';
import { newsletterService } from '../services/newsletterService';

const Footer = () => {
const [email, setEmail] = useState('');
const [subscribed, setSubscribed] = useState(false);
const [successMsg, setSuccessMsg] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState('');

const handleSubscribe = async (e) => {
  e.preventDefault();
  
  if (!email || !email.trim()) {
    setError('Please enter your email address');
    setTimeout(() => setError(''), 4000);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    setError('Please enter a valid email address');
    setTimeout(() => setError(''), 4000);
    return;
  }

  setIsSubmitting(true);
  setError('');

  try {
    const result = await newsletterService.subscribe(email.trim(), 'footer');
    
    trackNewsletterSignup(email.trim());
    
    if (result.alreadySubscribed) {
      setSuccessMsg('You are already subscribed to our executive briefings.');
    } else {
      setSuccessMsg('Thank you for subscribing to Innosphere intelligence.');
    }
    
    setSubscribed(true);
    setEmail('');
    
    setTimeout(() => {
      setSubscribed(false);
      setSuccessMsg('');
    }, 6000);
  } catch (err) {
    console.error('Error subscribing to newsletter via Firebase: ', err);
    setError('Subscription failed. Please try again.');
    setTimeout(() => setError(''), 4000);
  } finally {
    setIsSubmitting(false);
  }
};

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1PpyynWHqF/', name: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/innosphere__?s=21', name: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/innosphereconsult/', name: 'Instagram' },

  ];

  const contactInfo = [
    { 
      icon: Mail, 
      text: 'info@innosphereconsulting.ae',
      href: 'mailto:info@innosphereconsulting.ae'
    },
    { 
      icon: Phone, 
      text: '+971 58 803 9578',
      href: 'tel:+971588039578'
    },
    { 
      icon: MapPin, 
      text: 'AMC-BLA-SM0812, AMC - Boulevard-A Building, Ajman Media City, UAE',
      href: 'https://maps.google.com/?q=Ajman+Media+City+UAE'
    },
    { 
      icon: Linkedin, 
      text: 'Innosphere Consulting UAE',
      href: 'https://www.linkedin.com/in/innosphere-consulting-226459396/'
    }

  ];

  return (
    <footer className="bg-[#080f1d] relative overflow-hidden border-t border-white/5">
      {/* Subtle secondary ambient glow */}
      <div className="absolute inset-0 from-[#0a2342]/15 via-transparent to-[#0a2342]/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-12">
          <div className="flex max-md:flex-col  gap-8 justify-between ">
            
            {/* Left Side - Company Info & Newsletter */}
            <div className="lg:col-span-7 space-y-6">
              {/* Company Logo */}
              <a href="/" className="inline-flex items-center gap-2.5">
                <img src={Logo} className='w-44 h-14 object-cover' alt="" />
              </a>
              
              {/* Description */}
              <p className="text-gray-300 text-sm max-w-md ">
               Strategy. Innovation. Digital Transformation - Built in the UAE.
              </p>

              {/* Newsletter */}
            <div className="max-w-md">
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your executive email"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 pr-12 bg-[#0a2342]/40 border border-gray-700/60 rounded-lg text-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-[#0a2342]/70 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center shadow-md shadow-blue-900/30"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs mt-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg || 'Successfully subscribed!'}</span>
                </div>
              )}
              {error && (
                <p className="text-red-400 text-xs mt-2.5 font-medium">
                  {error}
                </p>
              )}
            </div>
  <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                       onClick={() => trackSocialEngagement(social.name)}
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-gray-300 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
           
            </div>

            <div>
              <ul className='flex flex-col text-gray-300 uppercase font-medium gap-3 text-xs sm:text-sm'>
                <li><Link to='/' className='hover:text-blue-400 transition-colors'>Home</Link></li>
                <li><Link to='/our_services' className='hover:text-blue-400 transition-colors'>Our Services</Link></li>
                <li><Link to='/assessment' className='text-blue-400 hover:text-blue-300 transition-colors font-semibold'>Assessment™️</Link></li>
                <li><Link to='/cases' className='hover:text-blue-400 transition-colors'>Case Studies</Link></li>
                <li><Link to='/insights' className='hover:text-blue-400 transition-colors'>Insights</Link></li>
                <li><Link to='/academy' className='hover:text-blue-400 transition-colors'>Training (Academy)</Link></li>
                <li><Link to='/contact' className='hover:text-blue-400 transition-colors'>Contact Us</Link></li>
              </ul>
            </div>

            {/* Right Side - Social Links */}
            <div className="lg:col-span-5 lg:text-right">
             
            
                 {/* Contact Info - Compact */}
              <div className="flex flex-col gap-4 sm:gap-6 pt-2">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      target='_blank'
                      href={item.href}
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors group"
                    >
                      <Icon className="w-4 h-4 " />
                      <span className="text-xs sm:text-sm">{item.text}</span>
                    </a>
                  );
                })}
              </div>  
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-5 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Innosphere Consulting FZE LLC. Registration No. 44357. Licence No. 44357. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <Link to="/Privacy_Policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/Term_&_Condition" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms And Condition
              </Link>
              {/* <span className="text-gray-700">•</span> */}
              {/* <a href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;