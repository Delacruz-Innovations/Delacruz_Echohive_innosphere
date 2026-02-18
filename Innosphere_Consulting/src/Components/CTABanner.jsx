import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';

gsap.registerPlugin(ScrollTrigger);

const CTABanner = () => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: 'top 80%'
      }
    });

    tl.fromTo(
      contentRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        buttonsRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
        '-=0.4'
      );

    // Floating animation for the banner
    gsap.to(bannerRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={bannerRef}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>

          {/* Main banner */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            <div className="relative px-8 py-16 lg:px-16 lg:py-20">
              <div ref={contentRef} className="text-center mb-10">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto">
                  Let's collaborate to unlock your organization's full potential and drive sustainable growth.
                </p>
              </div>

              <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CalendlyPopup
                  text="BOOK A FREE CONSULTATION"
                  className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto justify-center border-none cursor-pointer"
                />

                <Link
                  to="/work"
                  className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
                >
                  View Case Studies
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;