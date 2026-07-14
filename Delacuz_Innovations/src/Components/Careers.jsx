import React, { useRef } from 'react';
import { ArrowRight, Briefcase, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const Careers = () => {
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  useGsapReveal(contentRef, { y: 24, stagger: 0.18 });
  useHoverGlow(ctaRef);

  return (
    <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300 text-sm font-semibold tracking-wide uppercase">
                Careers
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              We are Not Just Building Businesses,{' '}
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                We’re Building People. Join the Movement!
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              We look for people who are energized by{' '}
              <span className="text-white font-semibold">bold thinking</span>,{' '}
              <span className="text-white font-semibold">real impact</span>, and the{' '}
              <span className="text-white font-semibold">courage to move first</span>.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl border border-white/10 bg-gray-900/50 p-4 transition-colors duration-300 hover:border-purple-400/60">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent mb-1">
                  50+
                </div>
                <div className="text-gray-400 text-xs">Countries</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gray-900/50 p-4 transition-colors duration-300 hover:border-purple-400/60">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-1">
                  1000+
                </div>
                <div className="text-gray-400 text-xs">Employees</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gray-900/50 p-4 transition-colors duration-300 hover:border-purple-400/60">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-200 bg-clip-text text-transparent mb-1">
                  100+
                </div>
                <div className="text-gray-400 text-xs">Positions</div>
              </div>
            </div>

            {/* CTA Button */}
            <span ref={ctaRef} className="inline-block rounded-full mb-6">
              <Link
                to="/jobs"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Explore Careers
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </span>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm hover:border-purple-400/60 transition-colors">
                <Users className="w-4 h-4 text-purple-400" />
                Collaborative Culture
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm hover:border-purple-400/60 transition-colors">
                <Rocket className="w-4 h-4 text-purple-400" />
                Fast Growth
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm hover:border-purple-400/60 transition-colors">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Remote & On-site
              </div>
            </div>
          </div>

          {/* Right Image - Desktop Only */}
          <div className="hidden md:block flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
              <img
                src="https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZWVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
                alt="Modern Office Space"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-transparent to-purple-700/40 group-hover:opacity-70 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
