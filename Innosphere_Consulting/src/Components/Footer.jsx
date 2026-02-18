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
} from 'lucide-react';
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom';
import { trackSocialEngagement } from '../utils/analytics';
const Footer = () => {
const [email, setEmail] = useState('');
const [subscribed, setSubscribed] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState('');

const handleSubscribe = async (e) => {
  e.preventDefault();
  
  if (!email) {
    setError('Please enter your email');
    setTimeout(() => setError(''), 3000);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Please enter a valid email');
    setTimeout(() => setError(''), 3000);
    return;
  }

  setIsSubmitting(true);
  setError('');

  try {
    // Your Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxnE1s_tnRV4lNJOcqtHqBNpsxvxnqd2tyNF-7bUkjB/dev';

    // Send to Google Sheets
    const response = await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        subscribedAt: new Date().toLocaleString(),
        status: 'active'
      })
    });

    // Since mode is 'no-cors', we assume success if no error is thrown
    console.log('Newsletter subscription successful');
    setSubscribed(true);
    setEmail('');
    
    // Hide success message after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
    
  } catch (error) {
    console.error('Error subscribing to newsletter: ', error);
    setError('Failed to subscribe. Please try again.');
    setTimeout(() => setError(''), 3000);
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
      text: 'connect@innosphereconsulting.ae',
      href: 'mailto:connect@innosphereconsulting.ae'
    },
    { 
      icon: Phone, 
      text: '+971 4 123 4567',
      href: 'tel:+97141234567'
    },
    { 
      icon: MapPin, 
      text: 'Dubai Internet City, UAE',
      href: 'https://maps.app.goo.gl/Hk6C2E1Eeu7dSKUg8'
    },
    { 
      icon: Linkedin, 
      text: 'Innosphere Consulting UAE',
      href: 'https://www.linkedin.com/in/innosphere-consulting-226459396/'
    }

  ];

  return (
    <footer className="bg-gray-950 relative overflow-hidden border-t border-gray-800">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 from-blue-950/20 via-transparent to-purple-950/20"></div>

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
      type="email"a
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      required
      disabled={isSubmitting}
      className="w-full px-4 py-2.5 pr-12 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-900 transition-all disabled:opacity-50"
    />
    <button
      type="submit"
      disabled={isSubmitting}
      className="absolute right-1.5 top-1/2 -translate-y-1/2 from-blue-600 to-blue-500 text-gray-300 p-2 rounded-md hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <Send className="w-4 h-4" />
    </button>
  </form>
  {subscribed && (
    <p className="text-green-400 text-xs mt-2 animate-pulse">
      ✓ Successfully subscribed!
    </p>
  )}
  {error && (
    <p className="text-red-400 text-xs mt-2">
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

            <div className='' >
              <ul className='flex flex-col text-gray-300 uppercase font-medium gap-4'>
            
              <li className='cursor-pointer hover:text-[#4a7ba7] animation-all duration-300'>About US</li>
              <li className='cursor-pointer hover:text-[#4a7ba7] animation-all duration-300'>our services</li>
              <li className='cursor-pointer hover:text-[#4a7ba7] animation-all duration-300'>Industries</li>
              <li className='cursor-pointer hover:text-[#4a7ba7] animation-all duration-300'>Case Studies</li>
              <li className='cursor-pointer hover:text-[#4a7ba7] animation-all duration-300'>Academy</li>

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
              © {new Date().getFullYear()} Innosphare Consulting FZE LLC. RC-4435 All rights reserved.
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