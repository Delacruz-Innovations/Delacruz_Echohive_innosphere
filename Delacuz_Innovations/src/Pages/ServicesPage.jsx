import React, { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from "react-router-dom";

// Import services data
import servicesData from '../ServicesData.json';
import SEO from '../utils/SEO';
import { SITE_URL } from '../utils/SEO';
import PageHero from '../Components/PageHero';

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: servicesData.services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title.replace(/\.$/, ''),
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <SEO
        title="Our Services | Digital Transformation, SaaS, IT Consulting & More"
        description="Explore Delacruz Innovations' service portfolio: digital transformation, SaaS/PaaS development, IT consulting, training & support, brand management, and digital marketing."
        jsonLd={servicesSchema}
      />
      <PageHero
        eyebrow="OUR SERVICES"
        headline="Strategic Services for Sustainable Growth"
        copy="Build differentiated positioning that drives market share and customer loyalty through digital transformation, consultancy, and training."
        primaryCTALabel="Book a Consultation"
        scrollLabel="Explore Our Services"
        ghostWord="SERVICES"
        heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1974"
      />
      <div className="bg-black py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Services Grid */}
        <div className="space-y-12">
          {servicesData.services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 sm:p-10 hover:border-purple-700/50 transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? service.delay : '0ms' }}
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Title with Gradient */}
                <h2 className={`text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                  {service.title}
                </h2>
                
                {/* Description */}
                <p className="text-gray-400 text-lg mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.shortDescription}
                </p>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <Link to={`/services/${service.slug}`}>
                  <button className={`group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-purple-700/30 transition-all duration-300 transform hover:scale-105`}>
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>

              {/* Decorative Corner Blur */}
              <div className={`absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ServicesPage;