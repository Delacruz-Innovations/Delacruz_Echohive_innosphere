import React, { useState, useEffect } from 'react';
import { Target, Eye, Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const MissionVisionValues = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  const missionText = 'To deliver reliable, scalable, and context-relevant digital systems for organisations in transition from traditional operations to modern, automated ecosystems.';

  const visionText = 'A digitally empowered Africa where innovation drives inclusion, efficiency, and sustainable growth.';

const valuePoints = [
  'Impact: Creating digital solutions that drive real business growth and transformation.',
  'Integrity: We believe trust is the foundation of every successful digital partnership.',
  'Innovation: We never replicate; we rethink, reimagine, and rebuild better.',
  'Inclusion: Building technology that serves everyone, everywhere.',
];

  const Ambition = [
    {
      description: 'Delacruz Innovations is not here to compete. We are here to set a new standard. Our goal is clear:',
      points: [
        'To become one of Nigeria\'s top IT consultancy firms in Nigeria.',
        'To be recognised for our innovation, delivery excellence, and social impact.',
      ]
    }
  ];

  const sections = [
    {
      icon: Target,
      title: 'Our Mission',
      gradient: 'from-[#1e3a5f] to-[#2c5282]',
      borderColor: 'border-[#4a7ba7]/30 hover:border-[#6b9dc7]/50',
      content: missionText,
      isList: false,
      checkColor: 'text-[#6b9dc7]'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      gradient: 'from-[#2c5282] to-[#4a7ba7]',
      borderColor: 'border-[#4a7ba7]/30 hover:border-[#6b9dc7]/50',
      content: visionText,
      isList: false,
      checkColor: 'text-[#6b9dc7]'
    },
    {
      icon: Award,
      title: 'Our Core Values',
      gradient: 'from-[#1e3a5f] to-[#2c5282]',
      borderColor: 'border-[#4a7ba7]/30 hover:border-[#6b9dc7]/50',
      content: valuePoints,
      isList: true,
      checkColor: 'text-[#6b9dc7]'
    },
    {
      icon: Award,
      title: 'Our Ambition',
      gradient: 'from-[#2c5282] to-[#1e3a5f]',
      borderColor: 'border-[#4a7ba7]/30 hover:border-[#6b9dc7]/50',
      content: Ambition[0],
      isList: 'ambition',
      checkColor: 'text-[#6b9dc7]'
    }
  ];

  return (
    <div className="bg-black py-4 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Mobile Slider */}
        <div className="lg:hidden">
          <div className="relative">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentSlide
                      ? 'opacity-100 scale-100 relative z-10'
                      : 'opacity-0 scale-95 absolute top-0 left-0 w-full pointer-events-none'
                  }`}
                >
                  <div className={`bg-gradient-to-br from-[#0a1929]/80 to-[#051018]/60 border ${section.borderColor} rounded-2xl p-8 transition-all duration-300`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${section.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white ml-4">{section.title}</h2>
                    </div>
                    <div className={`h-1 w-20 bg-gradient-to-r ${section.gradient} mb-6`}></div>
                    
                    {section.isList === 'ambition' ? (
                      <div className="space-y-4">
                        <p className="text-gray-300 text-lg leading-relaxed mb-4">
                          {section.content.description}
                        </p>
                        <div className="space-y-3">
                          {section.content.points.map((point, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <CheckCircle2 className={`w-5 h-5 ${section.checkColor} flex-shrink-0 mt-1`} />
                              <p className="text-gray-300 leading-relaxed">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : section.isList ? (
                      <div className="space-y-3">
                        {section.content.map((point, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <CheckCircle2 className={`w-5 h-5 ${section.checkColor} flex-shrink-0 mt-1`} />
                            <p className="text-gray-300 leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="p-2 bg-[#4a7ba7] rounded-full text-white hover:bg-[#6b9dc7] transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-[#6b9dc7] w-8' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 bg-[#4a7ba7] rounded-full text-white hover:bg-[#6b9dc7] transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block space-y-6">
          
          {/* Mission and Vision Side by Side */}
          <div className="flex gap-6">
            
            {/* Mission Section */}
            <div 
              className={`flex-1 transition-all duration-1000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <div className="bg-gradient-to-br from-[#0a1929]/80 to-[#051018]/60 border border-[#4a7ba7]/30 rounded-2xl p-8 h-full hover:border-[#6b9dc7]/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white ml-4">Our Mission</h2>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] mb-6"></div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {missionText}
                </p>
              </div>
            </div>

            {/* Vision Section */}
            <div 
              className={`flex-1 transition-all duration-1000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-gradient-to-br from-[#0a1929]/80 to-[#051018]/60 border border-[#4a7ba7]/30 rounded-2xl p-8 h-full hover:border-[#6b9dc7]/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2c5282] to-[#4a7ba7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white ml-4">Our Vision</h2>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-[#2c5282] to-[#4a7ba7] mb-6"></div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {visionText}
                </p>
              </div>
            </div>

          </div>

          {/* Values and Ambition Side by Side */}
          <div className="flex gap-6">

            <div 
              className={`transition-all duration-1000 transform flex-1 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="bg-gradient-to-br from-[#0a1929]/80 to-[#051018]/60 border border-[#4a7ba7]/30 rounded-2xl p-8 hover:border-[#6b9dc7]/50 transition-all duration-300 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white ml-4">Our Core Values</h2>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] mb-6"></div>
                <div className="grid grid-cols-1 gap-4">
                  {valuePoints.map((point, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#6b9dc7] flex-shrink-0 mt-1" />
                      <p className="text-gray-300 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div 
              className={`transition-all duration-1000 flex-1 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="bg-gradient-to-br from-[#0a1929]/80 to-[#051018]/60 border border-[#4a7ba7]/30 rounded-2xl p-8 hover:border-[#6b9dc7]/50 transition-all duration-300 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2c5282] to-[#1e3a5f] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white ml-4">Our Ambition</h2>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-[#2c5282] to-[#1e3a5f] mb-6"></div>
                <div className="grid grid-cols-1 gap-4">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Delacruz Innovations is not here to compete. We are here to set a new standard. Our goal is clear:
                  </p>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#6b9dc7] flex-shrink-0 mt-1" />
                    <p className="text-gray-300 leading-relaxed">
                      To become one of Nigeria's top IT consultancy firms in Nigeria.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#6b9dc7] flex-shrink-0 mt-1" />
                    <p className="text-gray-300 leading-relaxed">
                      To be recognised for our innovation, delivery excellence, and social impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MissionVisionValues;