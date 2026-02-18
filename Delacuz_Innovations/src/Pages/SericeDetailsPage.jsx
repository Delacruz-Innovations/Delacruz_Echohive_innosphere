import React, { useState, useEffect } from 'react';
import { Check, Eye, Lightbulb, Palette, Rocket, TrendingUp, Users, Shield, Server } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CalendlyPopup from '../Components/CalendlyPopup';

// Import your services data
import servicesData from '../ServicesData.json';

const ServiceDetailsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { serviceId } = useParams();

  // Find the service based on URL parameter or default to first service
  const service = servicesData.services.find(s => s.slug === serviceId) || servicesData.services[0];

  useEffect(() => {
    setIsVisible(true);
  }, [serviceId]);

  const processIcons = {
    '01': <Eye className="w-6 h-6" />,
    '02': <Lightbulb className="w-6 h-6" />,
    '03': <Palette className="w-6 h-6" />,
    '04': <Rocket className="w-6 h-6" />
  };

  const serviceLineIcons = [
    <Server className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
    <Shield className="w-8 h-8" />,
    <TrendingUp className="w-8 h-8" />,
    <Eye className="w-8 h-8" />,
    <Rocket className="w-8 h-8" />
  ];

  return (
    <div className="min-h-screen bg-black py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg"></div>
            <span className="text-purple-400 text-sm font-semibold tracking-wide uppercase">
              {service.breadcrumb}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {service.title}
          </h1>

          <p className="text-gray-200 text-base sm:text-sm leading-relaxed max-w-4xl mb-6">
            {service.tagline}
          </p>

          <p className="text-gray-100 text-base leading-relaxed max-w-4xl">
            {service.description}
          </p>
        </div>

        {/* Licenses Section
        {service.licenses && (
          <div className={`mb-12 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '100ms' }}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-6 sm:p-8">
              <div className="flex  gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.subtitle}</h3>
                  <p className="text-gray-100 text-sm">
                    <span className="text-purple-400 font-semibold">Licenses:</span> {service.licenses}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* Key Deliverables Section */}
        <div className={`mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8">
              Key Deliverables
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {service.deliverables.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group/item"
                >
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-100 text-sm sm:text-base group-hover/item:text-white transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Lines Section */}
        <div className={`mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '300ms' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8 text-center">
            Our Service Lines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.serviceLines.map((line, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-700/30 hover:bg-gray-900/70 hover:border-purple-700/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-700/50 transition-all duration-300 text-white">
                  {serviceLineIcons[index % serviceLineIcons.length]}
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {line.title}
                </h4>
                <p className="text-gray-100 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                  {line.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Process Section */}
        <div className={`mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '400ms' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-8 text-center">
            Our Process
          </h2>

          <div className="space-y-6">
            {service.process.map((step, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-6 sm:p-8 hover:bg-gray-900/70 hover:border-purple-700/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        {processIcons[step.number]}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* CTA Banner */}
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-purple-100 text-base sm:text-lg max-w-2xl mx-auto mb-6">
                Let's discuss how our {service.title.toLowerCase()} can drive your success
              </p>
              <CalendlyPopup
                text="Schedule A Free Consultation"
                className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              />
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

export default ServiceDetailsPage;