import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, Globe } from 'lucide-react';

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
    <div className="min-h-screen bg-black pt-36">
      {/* Hero Section with Map Background */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Map Background - Using a world map pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239333ea' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Animated Globe Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
          <Globe className="w-96 h-96 text-purple-500 animate-spin-slow" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-purple-700/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold tracking-wider uppercase">
                Global Presence
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">We're </span>
              <span className="text-purple-400">Everywhere</span>
              <br />
              <span className="text-white">You Need Us</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              With offices spanning across continents, we bring innovation and expertise to your doorstep, wherever you are in the world.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-purple-700/10 backdrop-blur-sm border border-purple-500/30 rounded-lg px-8 py-4">
                <div className="text-4xl font-bold text-purple-400 mb-1">3+</div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Countries</div>
              </div>
              <div className="bg-purple-700/10 backdrop-blur-sm border border-purple-500/30 rounded-lg px-8 py-4">
                <div className="text-4xl font-bold text-purple-400 mb-1">3</div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Continents</div>
              </div>
              <div className="bg-purple-700/10 backdrop-blur-sm border border-purple-500/30 rounded-lg px-8 py-4">
                <div className="text-4xl font-bold text-purple-400 mb-1">24/7</div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Offices List Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default OfficesSection;