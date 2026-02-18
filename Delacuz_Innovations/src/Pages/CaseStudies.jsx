import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from '../Components/CalendlyPopup';

// JSON Data
const caseStudiesData = {
  title: "Case Studies ",
  subtitle: "Real results from real clients. See how we helped organisations transform their operations, modernise digital systems, and improve business performance.",
  cases: [
    {
      id: 1,
      tags: ["Digital Transformation", "Process Optimisation", "Public Sector"],
      title: "Department for Business & Trade – Digital Transformation",
      client: "UK Government / Public Sector",
      challenge: {
        title: "The Challenge",
        description:
          "The department was undergoing a large-scale migration from DataHub to the GOV.UK backend, with multiple legacy systems and cross-border teams handling highly sensitive data. Processes were inconsistent, and stakeholders were frustrated by misaligned operations."
      },
      solution: {
        title: "Our Approach & Solution",
        description:
          "Led process mapping initiatives to understand workflows, identify gaps, and streamline operations. Worked closely with cross-functional, multi-region teams to gather and validate requirements in line with Government Digital Service (GDS) standards. Produced detailed migration artefacts to ensure seamless transitions with minimal disruption."
      },
      results: {
        title: "The Impact",
        metrics: [
          {
            icon: "✅",
            value: "Improved Alignment",
            description: "Reduced process inconsistencies and improved operational efficiency across regions."
          },
          {
            icon: "🔒",
            value: "Data Integrity",
            description: "Ensured secure and accurate data migration while protecting sensitive information."
          },
          {
            icon: "⚙️",
            value: "Future-Ready Framework",
            description: "Delivered a foundation for scalable and efficient digital operations."
          }
        ]
      },
      testimonial: {
        quote:
          "Our ability to translate complex processes into actionable solutions was pivotal for our digital migration.",
        author: "Senior Director, Department for Business & Trade"
      }
    },
    {
      id: 2,
      tags: ["CRM Modernisation", "Healthcare", "Process Re-engineering"],
      title: "NHS England – Replatforming & CRM Modernisation",
      client: "Healthcare / Public Sector",
      challenge: {
        title: "The Challenge",
        description:
          "NHS 111 online was outdated, with duplicated workflows that caused frustration for call handlers and administrators. The CRM system was under-optimised, leading to inefficiencies in managing clinical data."
      },
      solution: {
        title: "Our Approach & Solution",
        description:
          "Acted as Lead Business Consultant to retool the online service and digitise the CRM. Collaborated with clinical authors, IT teams, and administrators to map workflows, identify friction points, and co-create practical, user-focused solutions."
      },
      results: {
        title: "The Impact",
        metrics: [
          {
            icon: "💻",
            value: "Enhanced UX",
            description: "Improved experience for call handlers and administrators."
          },
          {
            icon: "⚡",
            value: "Streamlined Workflows",
            description: "Reduced processing errors and improved data accuracy."
          },
          {
            icon: "💪",
            value: "Empowered Teams",
            description: "Increased confidence among staff using new digital tools."
          }
        ]
      },
      testimonial: {
        quote:
          "we really understands people as well as processes – the transformation wouldn’t have succeeded without his guidance.",
        author: "Programme Manager, NHS England"
      }
    },
    {
      id: 3,
      tags: ["Digital Retail", "Revenue Growth", "Personalisation"],
      title: "Easyjet – Digital Retail & Ancillary Revenue Growth",
      client: "Aviation / Travel",
      challenge: {
        title: "The Challenge",
        description:
          "Easyjet needed to enhance personalization in digital retail to drive ancillary revenue. The challenge was aligning commercial strategy with IT systems and ensuring smooth adoption across teams."
      },
      solution: {
        title: "Our Approach & Solution",
        description:
          "Led the business analysis workstream for Datalex Merchandiser implementation. Bridged the gap between commercial, IT, and vendor teams to align requirements, map customer behaviour, and optimise workflows for personalisation and efficiency."
      },
      results: {
        title: "The Impact",
        metrics: [
          {
            icon: "💰",
            value: "Revenue Growth",
            description: "Increased ancillary revenue through personalised retail experiences."
          },
          {
            icon: "🤝",
            value: "Cross-Team Alignment",
            description: "Improved collaboration between commercial and IT teams."
          },
          {
            icon: "📊",
            value: "Actionable Insights",
            description: "Empowered teams with clearer data and measurable performance improvements."
          }
        ]
      },
      testimonial: {
        quote:
          "Our approach combined strategic insight with practical execution – the results were immediate and tangible.",
        author: "Head of Digital Commerce, easyJet"
      }
    },
    {
      id: 4,
      tags: ["CRM Optimisation", "Operational Efficiency", "Data Insights"],
      title: "Sky Betting & Gaming – CRM & Operational Optimisation",
      client: "Gambling / Technology",
      challenge: {
        title: "The Challenge",
        description:
          "Sky Betting & Gaming’s CRM and operational systems were fragmented, limiting visibility into customer behaviour and slowing decision-making."
      },
      solution: {
        title: "Our Approach & Solution",
        description:
          "Served as Lead Business Consultant, reviewing existing CRM workflows, identifying gaps, and implementing optimisations. Collaborated with senior stakeholders to design scalable, measurable processes aligned with business objectives."
      },
      results: {
        title: "The Impact",
        metrics: [
          {
            icon: "📈",
            value: "Efficiency Boost",
            description: "Streamlined CRM processes for better customer lifecycle management."
          },
          {
            icon: "🔍",
            value: "Data-Driven Decisions",
            description: "Enhanced analytics and insights to support strategic decisions."
          },
          {
            icon: "⚙️",
            value: "Operational Clarity",
            description: "Increased efficiency and collaboration across departments."
          }
        ]
      },
      testimonial: {
        quote:
          "We brought clarity and focus to our complex CRM landscape – his work helped us turn insights into action.",
        author: "Senior Stakeholder, Sky Betting & Gaming"
      }
    },
    {
      id: 5,
      tags: ["Systems Consolidation", "Banking", "Process Improvement"],
      title: "Lloyds Banking Group – Legacy Systems Consolidation",
      client: "Banking / Financial Services",
      challenge: {
        title: "The Challenge",
        description:
          "The bank managed 26 legacy loan systems, resulting in slow processing times, fragmented customer experiences, and high maintenance costs."
      },
      solution: {
        title: "Our Approach & Solution",
        description:
          "As Senior Business Consultant, led the analysis stream for the consolidation initiative. Mapped end-to-end loan processes, removed redundancies, and collaborated across departments to define a unified, efficient system supported by strong change management practices."
      },
      results: {
        title: "The Impact",
        metrics: [
          {
            icon: "⏱️",
            value: "30%",
            description: "Reduction in loan processing times."
          },
          {
            icon: "😊",
            value: "Customer Satisfaction",
            description: "Improved client experience and faster service delivery."
          },
          {
            icon: "💸",
            value: "Cost Efficiency",
            description: "Reduced operational and maintenance costs through system consolidation."
          }
        ]
      },
      testimonial: {
        quote:
          "we practical insight and hands-on approach ensured our transformation was smooth and successful.",
        author: "Director, Lloyds Banking Group"
      }
    }
  ]
};


const CaseStudies = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.case-card');
    cards.forEach((card) => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-fadeIn" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
          <h1 className="text-4xl sm:text-5xl font-bold text-purple-700 mb-4">
            {caseStudiesData.title}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {caseStudiesData.subtitle}
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudiesData.cases.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              data-id={caseStudy.id}
              className={`case-card transition-all duration-700 ${visibleCards.has(String(caseStudy.id))
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-black border border-purple-700 rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-700 text-white text-xs sm:text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-50 mb-2">
                  {caseStudy.title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-6">{caseStudy.client}</p>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Challenge */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3">
                        {caseStudy.challenge.title}
                      </h3>
                      <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                        {caseStudy.challenge.description}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3">
                        {caseStudy.solution.title}
                      </h3>
                      <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                        {caseStudy.solution.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Results */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-4">
                      {caseStudy.results.title}
                    </h3>
                    <div className="space-y-4">
                      {caseStudy.results.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-dark border border-purple-700 rounded-lg p-4 hover:bg-gray-900 transition-colors duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{metric.icon}</span>
                            <div>
                              <p className="text-xl sm:text-2xl font-bold text-purple-700 mb-1">
                                {metric.value}
                              </p>
                              <p className="text-gray-50 text-sm">
                                {metric.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col items-center justify-center text-white py-16 my-10 border border-purple-700 rounded-lg text-center'>
          <h1 className='text-4xl font-bold mb-4'>Want Results Like These?</h1>
          <p className='text-gray-300'>Let's discuss how we can help your business achieve similar transformational outcomes.</p>
          <CalendlyPopup
            text="Book A Free Consultation"
            className='text-semi-bold px-8 py-3 hover:scale-120 rounded-md border border-purple-600 my-6 hover:shadow-md hover:shadow-purple-500 hover:bg-purple-700 hover:text-white transition-all duration-500 cursor-pointer'
          />
        </div>
      </div>

      <style jsx>{` 
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CaseStudies;