import React from 'react';
import { Award, Target, Users, TrendingUp, DollarSign, Zap } from 'lucide-react';

export default function InnosphereValues() {
  const values = [
    {
      icon: <Award className="w-20 h-20" strokeWidth={1.5} />,
      title: "12+ Years Experience",
      description: "Over 12+ years combined experience across UK, UAE & Africa"
    },
    {
      icon: <Target className="w-20 h-20" strokeWidth={1.5} />,
      title: "Proven Track Record",
      description: "Proven track record delivering complex digital products"
    },
    {
      icon: <Users className="w-20 h-20" strokeWidth={1.5} />,
      title: "Strong Talent Pipeline",
      description: "Strong talent pipeline through CoreConnectAcademy"
    },
    {
      icon: <TrendingUp className="w-20 h-20" strokeWidth={1.5} />,
      title: "Execution-Driven",
      description: "Practical, execution-driven consulting (not theory-heavy)"
    },
    {
      icon: <DollarSign className="w-20 h-20" strokeWidth={1.5} />,
      title: "Affordable Solutions",
      description: "Affordable solutions for startups + enterprise-grade support for large firms"
    },
    {
      icon: <Zap className="w-20 h-20" strokeWidth={1.5} />,
      title: "Flexible Engagement",
      description: "Flexible engagement models: project-based, retainer or full implementation"
    }
  ];

  return (
    <div className="min-h-screen bg-black py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#6b9dc7] mb-10">
          Why Choose Innosphere Consulting UAE?
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 text-pink-600">
                {value.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-[#6b9dc7] mb-4">
                {value.title}
              </h3>
              
              <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}