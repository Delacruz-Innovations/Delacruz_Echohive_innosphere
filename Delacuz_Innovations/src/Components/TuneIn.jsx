import { ArrowRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import React from 'react';
import Podcast from '../assets/Images/podcast.png';
const TuneIn = () => {
  return (
    <>
      <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content with Purple Gradient Background */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl">
              <h4 className="text-purple-200 text-sm sm:text-base font-semibold uppercase tracking-wider mb-3">
                Tune In
              </h4>
              
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The "Decoded"
              </h1>
              
              <p className="text-purple-100 text-base sm:text-lg leading-relaxed mb-8">
                We break down the systems, stories, and strategies shaping tomorrow's enterprises. Diving into the ideas, issues, and innovations reshaping business, the economy, and society. Tune in to hear from our experts and thought leaders about the latest in AI breakthroughs, leadership, and more.
              </p>
              
              <button className="bg-black text-gray-50 font-bold px-8 py-3 rounded-lg hover:bg-black/[0.5] transition-all duration-300 hover:scale-105 shadow-lg mb-8 w-full sm:w-auto flex">
                Listen Here <ArrowRight />
              </button>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white hover:text-purple-200 cursor-pointer transition-all duration-300 group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Facebook</span>
                </li>
                
                <li className="flex items-center gap-3 text-white hover:text-purple-200 cursor-pointer transition-all duration-300 group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </li>
                
                <li className="flex items-center gap-3 text-white hover:text-purple-200 cursor-pointer transition-all duration-300 group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <span className="font-medium">YouTube</span>
                </li>
                
                <li className="flex items-center gap-3 text-white hover:text-purple-200 cursor-pointer transition-all duration-300 group">
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Instagram</span>
                </li>
              </ul>
            </div>
            
            {/* Right Image */}
            <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="absolute inset-0 bg-purple-600 rounded-2xl blur-3xl opacity-30"></div>
                <img 
                  src={Podcast} 
                  alt="Podcast" 
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TuneIn;