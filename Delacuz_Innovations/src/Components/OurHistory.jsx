import React, { useEffect, useState } from 'react';

const OurHistory = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="bg-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold  text-white mb-4">
            The Delacruz <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"> Story</span> 
          </h2>
        </div>

        {/* Image */}
        <div className={`mb-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1491841651911-c44c30c34548?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhpc3Rvcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500" 
              alt="Team collaboration"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '400ms' }}>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Founded in 2017 in the United Kingdom, Delacruz Innovations was built on one belief  that Africa deserves technology solutions engineered with the same precision and ambition as global leaders.

            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              From our early beginnings delivering IT consultancy and transformation projects in the UK public and private sectors, we saw an opportunity to bring that value home - to Lagos, Nigeria and redefine what excellence in digital innovation means locally.

            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
             Today, Delacruz Innovations stands as a bridge between international best practice and Nigerian business realities. We partner with organisations across government, education, finance, and enterprise, helping them modernise their systems, automate workflows, and empower their teams with tools built for the future of work.

          <br /> <br />

We’re not just building software  we’re building capacity, competitiveness, and confidence in Africa’s digital economy.

            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The year 2019 marked significant team growth as we expanded to over 500 dedicated consultants and technologists. We built centers of excellence around the world, bringing together diverse talent to solve complex business challenges.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              In 2022, our efforts were recognized with multiple industry awards for innovation and client success. These accolades affirmed our position as a leader in IT consulting and motivated us to push boundaries even further.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Today in 2025, we're leading the charge in AI driven solutions and sustainable technology, shaping the future of enterprise transformation. Our journey continues as we help organizations navigate the complexities of digital innovation and achieve lasting success.
            </p>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurHistory;