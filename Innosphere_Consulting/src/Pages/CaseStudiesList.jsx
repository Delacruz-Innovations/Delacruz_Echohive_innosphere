import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import caseStudiesDataObj from '../Components/caseStudiesData';
import CalendlyPopup from '../Components/CalendlyPopup';

const categories = [
  'All',
  'Business Transformation',
  'Digital Transformation',
  'AI & Automation',
  'Technology',
  'Cybersecurity',
  'Product / Software'
];

const CaseStudiesList = () => {
  const heroRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
  }, []);

  const allCases = Object.entries(caseStudiesDataObj).map(([slug, data]) => ({
    ...data,
    slug: slug,
    excerpt: data.overview.substring(0, 180) + '...'
  }));

  const filteredCases = selectedCategory === 'All'
    ? allCases
    : allCases.filter(c => c.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-[#000000] min-h-screen text-[#ffffff]">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-36 pb-16">
        <div ref={heroRef} className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a2342]/70 text-[#ffffff] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Client Success & Impact
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffffff] mb-6 leading-tight">
            Case Studies: <span className="text-blue-400">Proven Results</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Explore real-world transformations delivered for enterprise and public sector clients across the UAE, UK, and global markets. Every case demonstrates our commitment to measurable outcomes.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#ffffff] text-[#000000] font-semibold shadow-lg scale-105'
                    : 'bg-[#0a2342]/40 text-gray-300 hover:text-[#ffffff] hover:bg-[#0a2342]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((item) => (
            <Link
              key={item.slug}
              to={`/cases/${item.slug}`}
              className="group bg-[#0a2342]/20 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-85"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-sm text-xs font-semibold bg-[#0a2342] text-[#ffffff] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-400 font-medium mb-2">
                    Client: <span className="text-gray-200">{item.client}</span> • {item.duration}
                  </div>
                  <h3 className="text-lg font-bold text-[#ffffff] group-hover:text-blue-300 transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-[#0a2342]/20 rounded-sm p-8 sm:p-12 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff] mb-4">
            Ready to achieve similar transformation outcomes?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Book a complimentary consultation with our lead consultants to evaluate your operational challenges.
          </p>
          <CalendlyPopup
            text="BOOK A FREE CONSULTATION"
            className="px-8 py-3.5 rounded-sm text-xs sm:text-sm font-semibold bg-[#ffffff] hover:bg-gray-200 text-[#000000] shadow-lg hover:scale-105 transition-all cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesList;