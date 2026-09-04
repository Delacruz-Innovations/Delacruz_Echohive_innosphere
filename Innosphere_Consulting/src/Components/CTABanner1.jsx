import React from 'react';
import CalendlyPopup from './CalendlyPopup';

const CTABanner1 = () => {
  return (
    <div className="py-20 px-4 text-center bg-[#080f1d]">
      <div className="max-w-4xl mx-auto text-[#ffffff] bg-[#0a2342]/25 rounded-sm p-12 shadow-2xl">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#ffffff]">
          Ready to <span className="text-blue-400">transform</span> your business?
        </h3>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          Let’s discuss your operational challenges and identify your best next step toward execution.
        </p>
        <CalendlyPopup
          text="BOOK A FREE CONSULTATION"
          className="bg-[#ffffff] hover:bg-gray-200 text-[#000000] font-bold px-10 py-4 rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/20 transform hover:scale-105 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CTABanner1;