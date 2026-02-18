import React, { useState, useEffect } from 'react';
import { ArrowRight, Briefcase, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
const Careers = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className={`flex-1 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700/20 border border-purple-700/30 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300 text-sm font-semibold tracking-wide uppercase">
                Careers
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              We are Not Just Building Businesses,{' '}
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                We’re Building People. Join the Movement!
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              We look for people who are energized by{' '}
              <span className="text-white font-semibold">bold thinking</span>,{' '}
              <span className="text-white font-semibold">real impact</span>, and the{' '}
              <span className="text-white font-semibold">courage to move first</span>.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-purple-700/50 transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent mb-1">
                  50+
                </div>
                <div className="text-gray-400 text-xs">Countries</div>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-purple-700/50 transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-1">
                  1000+
                </div>
                <div className="text-gray-400 text-xs">Employees</div>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-purple-700/50 transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-200 bg-clip-text text-transparent mb-1">
                  100+
                </div>
                <div className="text-gray-400 text-xs">Positions</div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/jobs" 
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-purple-700 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-700/50 transition-all duration-300 transform hover:scale-105 mb-6"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Careers
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-gray-300 text-sm hover:border-purple-700/50 transition-all">
                <Users className="w-4 h-4 text-purple-400" />
                Collaborative Culture
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-gray-300 text-sm hover:border-purple-700/50 transition-all">
                <Rocket className="w-4 h-4 text-purple-400" />
                Fast Growth
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-gray-300 text-sm hover:border-purple-700/50 transition-all">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Remote & On-site
              </div>
            </div>
          </div>

          {/* Right Image - Desktop Only */}
          <div className={`hidden md:block flex-1 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZWVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500" 
                alt="Modern Office Space"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-transparent to-purple-700/40 group-hover:opacity-70 transition-opacity duration-500"></div>

              {/* Decorative Gradient Blur */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-purple-700 to-purple-600 opacity-20 blur-3xl rounded-full"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-700 opacity-20 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600 opacity-20 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;