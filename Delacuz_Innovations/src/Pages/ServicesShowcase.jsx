import React, { useState, useEffect } from 'react';
import { Check, Eye, Lightbulb, Palette, Rocket } from 'lucide-react';

const BusinessConsultancyPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const deliverables = [
    'Brand positioning strategy',
    'Brand architecture framework',
    'Competitive analysis report',
    'Visual identity system',
    'Messaging and voice guidelines',
    'Implementation roadmap'
  ];

  const processes = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Our team of expert consultants will carry out a detailed literature audit assessment of the product, Conduct Market research, competitive analysis, and stakeholder interviews to understand positioning opportunities.',
      icon: <Eye className="w-6 h-6" />
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Development of brand positioning, architecture, and communication frameworks aligned with business objectives.',
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      number: '03',
      title: 'Identity',
      description: 'Visual identity system design (Brand Assets) including logo, typography, color palette, and brand guidelines.',
      icon: <Palette className="w-6 h-6" />
    },
    {
      number: '04',
      title: 'Implementation',
      description: 'Rollout planning, asset creation, and team coaching to ensure consistent brand execution across all touchpoints.',
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`mb-12 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg"></div>
            <span className="text-purple-400 text-sm font-semibold tracking-wide uppercase">
              Services | Business Consultancy
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            IT Business Consultancy
          </h1>
          
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-4xl mb-6">
            Build differentiated positioning that drives market share and customer loyalty.
          </p>
          
          <p className="text-gray-300 text-base leading-relaxed max-w-4xl">
            Effective brand strategy goes beyond visual identity. It requires deep understanding of market dynamics, competitive positioning, and customer needs to create meaningful differentiation.
          </p>
          
          <p className="text-gray-300 text-base leading-relaxed max-w-4xl mt-4">
            Our approach combines rigorous research with strategic frameworks to develop brand positions that resonate with target audiences while supporting long-term business objectives.
          </p>
        </div>

        {/* Key Deliverables Section */}
        <div className={`mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8">
              Key Deliverables
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {deliverables.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 group/item"
                >
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base group-hover/item:text-white transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Process Section */}
        <div className={`mb-12 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '400ms' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8 text-center">
            Our Process
          </h2>
          
          <div className="space-y-6">
            {processes.map((process, index) => (
              <div 
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-6 sm:p-8 hover:bg-gray-900/70 hover:border-purple-700/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                      {process.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        {process.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {process.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {process.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Build with Creation Tools Banner */}
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Build with Creation Tools
              </h2>
              <p className="text-purple-100 text-base sm:text-lg max-w-2xl mx-auto">
                Transform your brand vision into reality with our comprehensive suite of strategic tools and frameworks
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessConsultancyPage;