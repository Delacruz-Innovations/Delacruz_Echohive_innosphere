import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import insight1 from '../assets/Images/insight1.png';
import insight2 from '../assets/Images/insight2.png';
import insight3 from '../assets/Images/insight3.png';
import insight4 from '../assets/Images/insight4.png';
import insight5 from '../assets/Images/insight5.png';
import insight6 from '../assets/Images/insight6.png';
// Import insights data
import insightsData from '../InsightsData.json';

const InsightsListPage = () => {
  const placeholderImages = [
    insight1,
    insight2,
    insight3,
    insight4,
    insight5,
    insight6
  ];
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allInsights = insightsData.insights;

  return (
    <div className="bg-black py-20 min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1600&auto=format&fit=crop" 
            alt="Insights and perspectives"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-4xl">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-purple-700/20 border border-purple-700/30 rounded-full mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300 text-sm font-semibold tracking-wide uppercase">
                Insights & Perspectives
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Expert analysis on{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                strategic transformation
              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-gray-300 text-lg md:text-xl leading-relaxed mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Explore cutting-edge insights on digital transformation, business growth, and strategic innovation in African markets. Stay informed with expert perspectives that drive real impact.
            </p>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">{allInsights.length}+</div>
                <div className="text-gray-400 text-sm">Articles</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">10+</div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">50K+</div>
                <div className="text-gray-400 text-sm">Readers</div>
              </div>
            </div>

            {/* CTA Button */}
            {/* <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <a 
                href="#insights" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Explore Insights
                <ArrowRight className="w-5 h-5" />
              </a>
            </div> */}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl"></div>
      </div>

      {/* Articles Grid Section */}
      <div id="insights" className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allInsights.map((insight, index) => (
              <Link key={insight.id} to={`/insights/${insight.id}`}>
                <div className={`group cursor-pointer transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="bg-gray-900 rounded-lg overflow-hidden hover:border-purple-500 border border-gray-800 transition-all duration-300 h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={placeholderImages[index % 6]} 
                        alt={insight.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                          {insight.category}
                        </span>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {insight.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                        {insight.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1 line-clamp-3">
                        {insight.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{insight.date}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsListPage;