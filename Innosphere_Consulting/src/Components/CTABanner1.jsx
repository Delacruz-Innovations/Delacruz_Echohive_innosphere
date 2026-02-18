import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { trackCTAConversion } from '../utils/analytics';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
const CTABanner1 = () => {

  return (

    <>
      <div className="py-20 px-4 text-center ">
        <div className="max-w-4xl mx-auto text-white border border-gray-800 rounded-3xl p-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to
            <span className="text-[#6b9dc7]"> transform</span> your business?
          </h3>
          <p className="text-gray-400 text-lg mb-8">
            Let’s discuss your project and identify your best next step.
          </p>
          <CalendlyPopup
            text="BOOK A FREE CONSULTATION"
            className="bg-gray-800 hover:bg-[#0a1929]/90  text-white font-bold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 border-none cursor-pointer"
          />
        </div>
      </div>

    </>


  )
};

export default CTABanner1