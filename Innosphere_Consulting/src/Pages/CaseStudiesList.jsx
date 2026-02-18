import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import caseStudiesDataObj from '../Components/caseStudiesData';
import CalendlyPopup from '../Components/CalendlyPopup';

const CaseStudiesList = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        heroRef.current.style.transition = 'all 0.8s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [showAll]);

  const handleCaseClick = (slug) => {
    window.location.href = `/cases/${slug}`;
  };

  const caseStudies = Object.entries(caseStudiesDataObj).map(([slug, data]) => ({
    ...data,
    slug: slug,
    excerpt: data.overview.substring(0, 180) + '...'
  }));

  const displayedCases = showAll ? caseStudies : caseStudies.slice(0, 3);

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div ref={heroRef} className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Case Studies"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Case Studies: <span className="text-[#6b9dc7]">Proven Results</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                Explore real-world transformations delivered for clients across Nigeria and West Africa. Each case study demonstrates our commitment to delivering measurable business outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Case Studies
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Strategic consulting solutions that drive transformation and sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCases.map((study, index) => (
              <div
                key={study.id}
                ref={el => cardsRef.current[index] = el}
                className=" rounded-2xl overflow-hidden  hover:shadow-xl hover:shadow-[#6b9dc7]/20 transition-all duration-300 cursor-pointer group"
                onClick={() => handleCaseClick(study.slug)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                  <div className="absolute bottom-6 left-6">
                    <span className="inline-block bg-gray-900/90 backdrop-blur-sm text-[#6b9dc7] px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {study.excerpt}
                  </p>

                  <button className="inline-flex items-center text-[#6b9dc7] font-semibold hover:text-[#6b9dc7] transition-colors group/btn">
                    <span>Read Full Story</span>
                    <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {caseStudies.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-[#6b9dc7]/30 hover:shadow-[#6b9dc7]/50"
              >
                <span>{showAll ? 'Show Less' : 'Show More Case Studies'}</span>
                <ArrowRight
                  size={20}
                  className={`ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}
        </div>
      </div>



      {/* CTA Section */}
      <div className="">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-gray-300 text-md mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how tested and trusted approach can help your business achieve transformational results. Schedule a consultation with our experts consultants today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyPopup
                text="BOOK A FREE CONSULTATION"
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-[#6b9dc7]/30 border-none cursor-pointer"
              />
              <button
                className="inline-flex items-center justify-center bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <span>Download Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesList;