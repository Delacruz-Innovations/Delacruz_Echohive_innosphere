import React, { useEffect, useRef, useState } from 'react';
import { Building2, Heart, Zap, Landmark, ShoppingCart, TrendingUp, ArrowRight, CheckCircle, ArrowLeft, BookOpen, CreditCard, Truck, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendlyPopup from '../Components/CalendlyPopup';

const Industries = () => {
  const heroRef = useRef(null);
  const industriesRef = useRef([]);
  const [flippedCard, setFlippedCard] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        heroRef.current.style.transition = 'all 0.8s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    industriesRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  const industries = [
    {
      id: 1,
      name: "IT Tech Startups",
      slug: "tech-startups",
      icon: TrendingUp,
      tagline: "Building Scalable Digital Products for Emerging Startups",
      description:
        "We support tech-driven startups in developing scalable digital platforms, improving user experience, and accelerating product deployment.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      capabilities: [
        "MVP development and product scaling",
        "Backend and frontend engineering",
        "Cloud infrastructure setup",
        "UI/UX design and improvement",
        "Automation and workflow optimization"
      ],
      outcomes: [
        "Faster product launch cycles",
        "Improved user engagement",
        "Reduced development overhead",
        "Stable and scalable system architecture"
      ]
    },
    {
      id: 2,
      name: "Government & Public Sector",
      slug: "public-sector",
      icon: Landmark,
      tagline: "Digitizing Public Services and Improving Citizen Engagement",
      description:
        "We work with government agencies to modernize public services through secure digital platforms and workflow automation.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      capabilities: [
        "E-government solutions",
        "Citizen service portals",
        "Process automation",
        "Data governance and security",
        "Performance tracking systems"
      ],
      outcomes: [
        "Improved service delivery",
        "Enhanced transparency",
        "Better citizen satisfaction",
        "Efficient governmental operations"
      ]
    },
    {
      id: 3,
      name: "Education & Training",
      slug: "education-training",
      icon: BookOpen,
      tagline: "Driving Digital Transformation in Learning Institutions",
      description:
        "We help educational institutions adopt digital solutions for improved learning, student management, and online training delivery.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      capabilities: [
        "E-learning platform development",
        "Student information systems",
        "Digital content creation",
        "Virtual classrooms and LMS integration",
        "Online assessment systems"
      ],
      outcomes: [
        "Better student engagement",
        "Seamless digital learning experience",
        "Improved administrative efficiency",
        "Scalable education delivery"
      ]
    },
    {
      id: 4,
      name: "FinTech & Payments",
      slug: "fintech-payments",
      icon: CreditCard,
      tagline: "Delivering Secure and Scalable Financial Technology Solutions",
      description:
        "We support fintech companies and payment providers with digital financial platforms, automation, and secure transaction systems.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      capabilities: [
        "Payment system development",
        "Digital banking solutions",
        "Fraud detection tools",
        "API and gateway integrations",
        "Customer analytics"
      ],
      outcomes: [
        "Faster transaction processing",
        "Enhanced security and compliance",
        "Increased user adoption",
        "Optimized financial operations"
      ]
    },
    {
      id: 5,
      name: "Logistics & Mobility",
      slug: "logistics-mobility",
      icon: Truck,
      tagline: "Optimizing Delivery Operations and Fleet Efficiency",
      description:
        "We build digital solutions that help logistics and mobility companies streamline deliveries, enhance tracking, and improve customer experience.",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80",
      capabilities: [
        "Delivery tracking systems",
        "Fleet management tools",
        "Route optimization",
        "Inventory and warehouse automation",
        "Customer communication systems"
      ],
      outcomes: [
        "Reduced delivery delays",
        "Lower operational costs",
        "Improved fleet efficiency",
        "Better tracking accuracy"
      ]
    },
    {
      id: 6,
      name: "Real Estate & Property Tech",
      slug: "real-estate-proptech",
      icon: Home,
      tagline: "Digitizing Property Management and Real Estate Services",
      description:
        "We help property companies and real estate firms build digital tools for listings, tenant management, and automated reporting.",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      capabilities: [
        "Property listing platforms",
        "Tenant and landlord portals",
        "Automated payment systems",
        "Virtual tours and 3D interface",
        "Data analytics for property insights"
      ],
      outcomes: [
        "Improved tenant experience",
        "Faster property sales and rentals",
        "Automated rent collection",
        "Better property visibility"
      ]
    },
    {
      id: 7,
      name: "E-commerce",
      slug: "ecommerce",
      icon: ShoppingCart,
      tagline: "Scaling Digital Stores and Boosting Customer Engagement",
      description:
        "We help online sellers and retail brands build seamless e-commerce platforms that drive sales and customer loyalty.",
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
      capabilities: [
        "E-commerce website development",
        "Inventory and order management",
        "Payment integration",
        "Customer analytics",
        "Marketing automation"
      ],
      outcomes: [
        "Higher online sales conversion",
        "Faster order processing",
        "Better customer retention",
        "Stronger digital presence"
      ]
    }
  ];

  const displayedIndustries = showAll ? industries : industries.slice(0, 3);
  return (
    <div className=" bg-slate-950 pt-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div ref={heroRef} className="container mx-auto px-6 pt-32 pb-2 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Industries"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transforming Industries Across <span className="text-[#6b9dc7]">Nigeria & West Africa</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                We serve clients across multiple sectors in Nigeria and the West African region, each with distinct growth and transformation needs. Our deep industry knowledge combined with technical expertise delivers measurable results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tailored solutions designed for the unique challenges and opportunities in each sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedIndustries.map((industry, index) => (
              <div
                key={industry.id}
                ref={el => industriesRef.current[index] = el}
                className="relative h-[500px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 cursor-pointer`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCard === industry.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                  onClick={() => setFlippedCard(flippedCard === industry.id ? null : industry.id)}
                >
                  {/* Front of Card */}
                  <div
                    className="absolute w-full h-full  overflow-hidden   transition-colors duration-300"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-68 overflow-hidden rounded-xl">
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 "></div>
                      <div className="absolute top-6 left-6">
                        <div className="bg-[#6b9dc7]/80 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center">
                          <industry.icon className="text-[#6b9dc7]" size={28} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 ">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {industry.name}
                      </h3>
                      <p className="text-[#6b9dc7] text-xs font-semibold mb-4 uppercase tracking-wide">
                        {industry.tagline}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {industry.description}
                      </p>

                      <button className="inline-flex items-center text-[#6b9dc7] font-semibold hover:text-[#6b9dc7] transition-colors group">
                        <span>Learn More</span>
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden "
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="p-6 h-full overflow-y-auto">



                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <industry.icon className="text-[#6b9dc7]" size={24} />
                        {industry.name}
                      </h3>

                      {/* Capabilities */}
                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Building2 size={18} className="text-[#6b9dc7]" />
                          Our Capabilities
                        </h4>
                        <ul className="space-y-2">
                          {industry.capabilities.map((capability, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-0.5" size={14} />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp size={18} className="text-[#6b9dc7]" />
                          Typical Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {industry.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={14} />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Show More/Less Button */}
          {industries.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6b9dc7] transition-all duration-300 shadow-lg shadow-[#6b9dc7]/30 hover:shadow-[#6b9dc7]/50"
              >
                <span>{showAll ? 'Show Less' : 'Show More Industries'}</span>
                <ArrowRight
                  size={20}
                  className={`ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}


        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="">
        <div className="container mx-auto px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why Partner With Us?
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Our deep industry expertise combined with proven methodologies ensures that your transformation initiatives deliver tangible business value. We understand the unique challenges facing Nigerian businesses and have the track record to prove it.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Local Expertise, Global Standards</div>
                      <div className="text-gray-400 text-sm">Deep understanding of Nigerian market dynamics with international best practices</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Proven Track Record</div>
                      <div className="text-gray-400 text-sm">100+ successful projects across multiple industries in Lagos, Abuja, and Port Harcourt</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">End-to-End Partnership</div>
                      <div className="text-gray-400 text-sm">From strategy to implementation and beyond, we're with you every step of the way</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Results-Driven Approach</div>
                      <div className="text-gray-400 text-sm">Focus on measurable outcomes that impact your bottom line</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">95%</div>
                  <div className="text-gray-300 text-sm">Client Retention Rate</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">100+</div>
                  <div className="text-gray-300 text-sm">Projects Delivered</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">15+</div>
                  <div className="text-gray-300 text-sm">Years Combined Experience</div>
                </div>
                <div className="bg-[#6b9dc7]/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how our industry expertise can help your organization achieve its digital transformation goals. Schedule a consultation with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyPopup
                text="BOOK A FREE CONSULTATION"
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-[#6b9dc7]/30 border-none cursor-pointer"
              />
              <Link to="/cases">
                <button
                  className="inline-flex items-center justify-center bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <span>View Case Studies</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industries;