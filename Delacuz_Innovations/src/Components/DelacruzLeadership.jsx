import React from 'react';
import { Users, Lightbulb, Target, TrendingUp } from 'lucide-react';

export default function DelacruzLeadership() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-6 text-center">
          Leadership & Expertise
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Our team brings together decades of combined experience across IT strategy, software engineering, 
          digital transformation, and change management. From enterprise SaaS (Software As A Service) development to government digital 
          adoption programmes. Delacruz Innovations has earned a reputation for turning complex challenges into 
          streamlined solutions.
        </p>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4">
          We're proud to work with experts who've led transformation initiatives across Europe and Africa blending technical skill with cultural intelligence to deliver outcomes that work in the real world.
        </p>
      </section>

      {/* Our Approach */}
      <section className="px-6 py-16  bg-opacity-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-purple-700 mb-4 text-center">
            Our Approach
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            We don't start with technology  we start with people. Every Delacruz Innovations engagement begins with a 
            deep understanding of your business model, operational challenges, and your end-user needs.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg border border-purple-700 border-opacity-30">
              <div className="text-purple-700 mb-4">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-3">Discovery</h3>
              <p className="text-gray-300">
                Understand the business, its pain points, and its goals.
              </p>
            </div>

            <div className="bg-black bg-opacity-50 p-8 rounded-lg border border-purple-700 border-opacity-30">
              <div className="text-purple-700 mb-4">
                <Lightbulb size={40} />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-3">Design</h3>
              <p className="text-gray-300">
                Digital solutions tailored to your context, not templates.
              </p>
            </div>

            <div className="bg-black bg-opacity-50 p-8 rounded-lg border border-purple-700 border-opacity-30">
              <div className="text-purple-700 mb-4">
                <Target size={40} />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-3">Delivery</h3>
              <p className="text-gray-300">
                With agility, ensuring measurable value at every phase.
              </p>
            </div>

            <div className="bg-black bg-opacity-50 p-8 rounded-lg border border-purple-700 border-opacity-30">
              <div className="text-purple-700 mb-4">
                <TrendingUp size={40} />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-3">Develop</h3>
              <p className="text-gray-300">
                Capacity through training, support, and change management.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-300 mt-12 text-center">
            It's an approach that ensures lasting transformation, not just new tools.
          </p>
        </div>
      </section>



 
    </div>
  );
}