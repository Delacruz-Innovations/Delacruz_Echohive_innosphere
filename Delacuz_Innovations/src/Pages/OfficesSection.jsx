import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, Globe } from 'lucide-react';
import SEO, { SITE_URL } from '../utils/SEO';
import PageHero from '../Components/PageHero';

const OfficesSection = () => {
  const [expandedRegions, setExpandedRegions] = useState({
    africa: true,
    europe: false,
    middleEast: false
  });

  const [expandedCountries, setExpandedCountries] = useState({
    nigeria: true,
    uk: false,
    uae: true
  });

  const toggleRegion = (region) => {
    setExpandedRegions(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };

  const toggleCountry = (country) => {
    setExpandedCountries(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  const offices = {
    africa: {
      title: "Africa",
      countries: {
        nigeria: {
          name: "Nigeria",
          cities: [
            {
              name: "Lagos",
              address: "Address - 29A, Salimonu Ayinde Street. Lagos",
              city: "Lagos, Nigeria",
              phone: "+234 9052765358"
            }
          ]
        }
      }
    },

    middleEast: {
      title: "Middle East Affiliates",
      countries: {
        uae: {
          name: "United Arab Emirates",
          cities: [
            {
              name: "Ajman",
              address: "Ajman Media City",
              details: "Address: AMC - BL A - 3M1819",
              email: "info@delacruz.com",
              phone: "Tel: +971 558838304"
            }
          ]
        }
      }
    }
  };

  return (
    <>
      <SEO
        title="Our Offices | Delacruz Innovations — Lagos & Ajman"
        description="Delacruz Innovations operates from Lagos, Nigeria and Ajman, UAE, serving clients across Africa, the Middle East, and Europe."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Delacruz Innovations',
          url: SITE_URL,
          telephone: '+234-905-276-5358',
          address: [
            {
              '@type': 'PostalAddress',
              streetAddress: '29A, Salimonu Ayinde Street',
              addressLocality: 'Lagos',
              addressCountry: 'NG',
            },
            {
              '@type': 'PostalAddress',
              streetAddress: 'Ajman Media City, AMC - BL A - 3M1819',
              addressLocality: 'Ajman',
              addressCountry: 'AE',
            },
          ],
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 6.5244,
            longitude: 3.3792,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
          areaServed: ['Nigeria', 'United Arab Emirates', 'Africa', 'Europe'],
        }}
      />
      <PageHero
        eyebrow="GLOBAL PRESENCE"
        headline="We're Everywhere You Need Us"
        copy="With offices spanning across Lagos, Nigeria and Ajman, UAE, we bring innovation and expertise to your doorstep."
        primaryCTALabel="Speak to an Expert"
        scrollLabel="Explore Our Offices"
        ghostWord="GLOBAL"
        heroImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1974"
      />

      {/* Offices List Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 animate-fade-in">
            <p className="text-purple-400 text-sm font-semibold tracking-wide uppercase mb-3">
              Our offices
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              <span className="text-purple-700">Find us in </span>
              <span className="text-white">major cities worldwide</span>
            </h2>
          </div>

          {/* Offices List */}
          <div className="space-y-4">
            {/* Africa */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-700/60">
              <button
                onClick={() => toggleRegion('africa')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-purple-700/10 transition-colors duration-200"
              >
                <span className="text-white font-bold text-lg">{offices.africa.title}</span>
                {expandedRegions.africa ? (
                  <ChevronUp className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                )}
              </button>

              <div className={`transition-all duration-300 ease-in-out ${
                expandedRegions.africa ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="px-6 pb-4">
                  <div className="border-l-2 border-purple-700/50 pl-4">
                    <button
                      onClick={() => toggleCountry('nigeria')}
                      className="w-full flex items-center justify-between py-3 text-left group"
                    >
                      <span className="text-white font-semibold text-base group-hover:text-purple-400 transition-colors">
                        {offices.africa.countries.nigeria.name}
                      </span>
                      {expandedCountries.nigeria ? (
                        <ChevronUp className="w-4 h-4 text-purple-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-purple-400" />
                      )}
                    </button>

                    <div className={`transition-all duration-300 ${
                      expandedCountries.nigeria ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {offices.africa.countries.nigeria.cities.map((city, idx) => (
                        <div key={idx} className="pl-4 py-3 space-y-1">
                          <div className="flex items-center gap-2 text-purple-400 font-medium">
                            <MapPin className="w-4 h-4" />
                            <span>{city.name}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{city.address}</p>
                          <p className="text-gray-400 text-sm">{city.city}</p>
                          <p className="text-gray-400 text-sm">{city.phone}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Europe Affiliates
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-700/60">
              <button
                onClick={() => toggleRegion('europe')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-purple-700/10 transition-colors duration-200"
              >
                <span className="text-white font-bold text-lg">{offices.europe.title}</span>
                {expandedRegions.europe ? (
                  <ChevronUp className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                )}
              </button>

              <div className={`transition-all duration-300 ease-in-out ${
                expandedRegions.europe ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="px-6 pb-4">
                  <div className="border-l-2 border-purple-700/50 pl-4">
                    <button
                      onClick={() => toggleCountry('uk')}
                      className="w-full flex items-center justify-between py-3 text-left group"
                    >
                      <span className="text-white font-semibold text-base group-hover:text-purple-400 transition-colors">
                        {offices.europe.countries.uk.name}
                      </span>
                      {expandedCountries.uk ? (
                        <ChevronUp className="w-4 h-4 text-purple-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-purple-400" />
                      )}
                    </button>

                    <div className={`transition-all duration-300 ${
                      expandedCountries.uk ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {offices.europe.countries.uk.cities.map((city, idx) => (
                        <div key={idx} className="pl-4 py-3">
                          <div className="flex items-center gap-2 text-purple-400 font-medium">
                            <MapPin className="w-4 h-4" />
                            <span>{city.name}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{city.address}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Middle East Affiliates */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-700/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-700/60">
              <button
                onClick={() => toggleRegion('middleEast')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-purple-700/10 transition-colors duration-200"
              >
                <span className="text-white font-bold text-lg">{offices.middleEast.title}</span>
                {expandedRegions.middleEast ? (
                  <ChevronUp className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                )}
              </button>

              <div className={`transition-all duration-300 ease-in-out ${
                expandedRegions.middleEast ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                <div className="px-6 pb-4">
                  <div className="border-l-2 border-purple-700/50 pl-4">
                    <button
                      onClick={() => toggleCountry('uae')}
                      className="w-full flex items-center justify-between py-3 text-left group"
                    >
                      <span className="text-white font-semibold text-base group-hover:text-purple-400 transition-colors">
                        {offices.middleEast.countries.uae.name}
                      </span>
                      {expandedCountries.uae ? (
                        <ChevronUp className="w-4 h-4 text-purple-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-purple-400" />
                      )}
                    </button>

                    <div className={`transition-all duration-300 ${
                      expandedCountries.uae ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      {offices.middleEast.countries.uae.cities.map((city, idx) => (
                        <div key={idx} className="pl-4 py-3 space-y-2">
                          <div className="flex items-center gap-2 text-purple-400 font-medium">
                            <MapPin className="w-4 h-4" />
                            <span>{city.name}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{city.address}</p>
                          <p className="text-gray-400 text-sm">{city.details}</p>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Mail className="w-3 h-3" />
                            <span>{city.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Phone className="w-3 h-3" />
                            <span>{city.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative gradient blur */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </>
  );
};

export default OfficesSection;