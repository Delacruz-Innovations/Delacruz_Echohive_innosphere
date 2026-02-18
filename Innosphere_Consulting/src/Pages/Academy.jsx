import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Users, Award, Calendar, ArrowRight, BookOpen, Target, TrendingUp, ArrowLeft, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendlyPopup from '../Components/CalendlyPopup';

const Academy = () => {
  const heroRef = useRef(null);
  const programsRef = useRef([]);
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

    programsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [showAll]);

  const programs = [
    {
      id: 1,
      title: "Business Analysis Certification",
      subtitle: "Aligned with BABOK",
      description: "Master the art of business analysis with comprehensive training aligned with the Business Analysis Body of Knowledge (BABOK). Learn to bridge the gap between business needs and technical solutions.",
      duration: "12 weeks",
      level: "Intermediate to Advanced",
      icon: Target,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      features: [
        "BABOK-aligned curriculum",
        "Requirements elicitation techniques",
        "Stakeholder analysis and management",
        "Process modeling and documentation",
        "Certification preparation"
      ],
      outcomes: [
        "Industry-recognized certification",
        "Enhanced analytical capabilities",
        "Improved stakeholder communication",
        "Career advancement opportunities"
      ]
    },
    {
      id: 2,
      title: "Product Management Bootcamp",
      subtitle: "From Concept to Launch",
      description: "Develop the skills to lead product strategy, drive innovation, and deliver customer-centric solutions. Learn from real-world case studies and hands-on projects.",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      features: [
        "Product strategy and roadmapping",
        "User research and validation",
        "Agile product development",
        "Stakeholder management",
        "Go-to-market strategies"
      ],
      outcomes: [
        "End-to-end product leadership",
        "Data-driven decision making",
        "Successful product launches",
        "Increased market competitiveness"
      ]
    },
    {
      id: 3,
      title: "Digital Strategy & Transformation",
      subtitle: "Leading Change in the Digital Age",
      description: "Equip yourself with the frameworks and tools to lead digital transformation initiatives. Understand how to align technology with business strategy for competitive advantage.",
      duration: "5 days intensive",
      level: "Senior & Executive Level",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      features: [
        "Digital transformation frameworks",
        "Technology strategy development",
        "Change management in digital context",
        "Innovation and disruption",
        "Case study analysis"
      ],
      outcomes: [
        "Strategic digital vision",
        "Organizational alignment",
        "Accelerated transformation",
        "Competitive advantage"
      ]
    },
    {
      id: 4,
      title: "Data Analysis and Management",
      subtitle: "Turn Data into Insights",
      description: "Learn to collect, analyze, and interpret data to drive business decisions. Master tools and techniques for effective data management and visualization.",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      icon: Award,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      features: [
        "Statistical analysis fundamentals",
        "Data visualization techniques",
        "SQL and database management",
        "Business intelligence tools",
        "Data-driven decision making"
      ],
      outcomes: [
        "Proficiency in analytics tools",
        "Enhanced decision-making skills",
        "Data storytelling capabilities",
        "Business value creation"
      ]
    },
    {
      id: 5,
      title: "Executive Leadership Coaching",
      subtitle: "Elevate Your Leadership Impact",
      description: "One-on-one coaching designed for senior leaders to enhance strategic thinking, emotional intelligence, and organizational influence.",
      duration: "3-6 months",
      level: "Executive Level",
      icon: Users,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      features: [
        "Personalized coaching sessions",
        "360-degree feedback assessment",
        "Leadership style development",
        "Strategic thinking enhancement",
        "Organizational influence strategies"
      ],
      outcomes: [
        "Enhanced leadership presence",
        "Improved team performance",
        "Strategic clarity",
        "Greater organizational impact"
      ]
    },
    {
      id: 6,
      title: "Agile Coaching",
      subtitle: "Master Agile Methodologies",
      description: "Become a certified Agile practitioner and learn to coach teams in Scrum, Kanban, and other Agile frameworks to improve delivery and collaboration.",
      duration: "6 weeks",
      level: "Intermediate",
      icon: CheckCircle,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
      features: [
        "Scrum and Kanban frameworks",
        "Agile ceremonies and artifacts",
        "Team facilitation techniques",
        "Scaling Agile practices",
        "Continuous improvement mindset"
      ],
      outcomes: [
        "Agile certification",
        "Improved team velocity",
        "Enhanced collaboration",
        "Better product delivery"
      ]
    }
  ];

  const displayedPrograms = showAll ? programs : programs.slice(0, 3);

  const benefits = [
    {
      icon: Award,
      title: "Industry-Recognized Certifications",
      description: "Earn credentials that are valued by employers across Nigeria and internationally."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from seasoned professionals with years of practical experience in their fields."
    },
    {
      icon: BookOpen,
      title: "Hands-On Learning",
      description: "Apply concepts immediately through real-world projects and case studies."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Choose from weekday, weekend, or online options to fit your busy schedule."
    }
  ];

  return (
    <div className=" bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div ref={heroRef} className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt="Capability Academy"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-block mb-6">
                <span className="text-sm font-semibold tracking-wider text-[#6b9dc7] uppercase bg-blue-900/30 px-4 py-2 rounded-full border border-[#6b9dc7]/50">
                  Capability Academy
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Empower Your Future with <span className="text-[#6b9dc7]">Professional Training</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                Our Capability Academy empowers professionals and organizations across Nigeria to build the skills needed to thrive in a digital economy. Elevate your career with industry-leading programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Academy?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform your career with expert-led training and industry-recognized certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-[#6b9dc7] transition-all duration-300"
              >
                <div className="bg-blue-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="text-[#6b9dc7]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Training Programs
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive range of programs designed to accelerate your professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPrograms.map((program, index) => (
              <div
                key={program.id}
                ref={el => programsRef.current[index] = el}
                className="relative h-[500px]"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 cursor-pointer`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedCard === program.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                  onClick={() => setFlippedCard(flippedCard === program.id ? null : program.id)}
                >
                  {/* Front of Card */}
                  <div
                    className="absolute w-full h-full overflow-hidden transition-colors duration-300"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden rounded-xl">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <div className="bg-blue-900/80 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center">
                          <program.icon className="text-[#6b9dc7]" size={28} />
                        </div>
                      </div>
                      <div className="absolute top-6 right-6">
                        <div className="bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-white text-sm font-semibold">{program.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {program.title}
                      </h3>
                      <p className="text-[#6b9dc7] text-xs font-semibold mb-4 uppercase tracking-wide">
                        {program.subtitle}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {program.description}
                      </p>
                      <div className="inline-block bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-300 mb-4">
                        {program.level}
                      </div>

                      {/* <button className="inline-flex items-center text-[#6b9dc7] font-semibold hover:text-blue-300 transition-colors group">
                        <span>View Details</span>
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button> */}
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
                        <program.icon className="text-[#6b9dc7]" size={24} />
                        {program.title}
                      </h3>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Building2 size={18} className="text-[#6b9dc7]" />
                          What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-0.5" size={14} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp size={18} className="text-[#6b9dc7]" />
                          Program Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {program.outcomes.map((outcome, idx) => (
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
          {programs.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#6b9dc7] transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50"
              >
                <span>{showAll ? 'Show Less' : 'Show More Programs'}</span>
                <ArrowRight
                  size={20}
                  className={`ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Why Partner With Us Section */}
      <div className="">
        <div className="container mx-auto px-6 py-5">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why Choose Our Academy?
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Our Capability Academy combines expert instruction, practical application, and industry-recognized certifications to deliver transformative learning experiences for professionals across Nigeria.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Expert Instructors</div>
                      <div className="text-gray-400 text-sm">Learn from seasoned professionals with years of practical industry experience</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Hands-On Learning</div>
                      <div className="text-gray-400 text-sm">Apply concepts immediately through real-world projects and case studies</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Flexible Delivery</div>
                      <div className="text-gray-400 text-sm">Choose from on-site, remote, or hybrid learning options to fit your schedule</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-[#6b9dc7] flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-white font-semibold mb-1">Career Advancement</div>
                      <div className="text-gray-400 text-sm">Earn industry-recognized certifications that accelerate your professional growth</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-900/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">500+</div>
                  <div className="text-gray-300 text-sm">Professionals Trained</div>
                </div>
                <div className="bg-blue-900/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Corporate Clients</div>
                </div>
                <div className="bg-blue-900/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">95%</div>
                  <div className="text-gray-300 text-sm">Satisfaction Rate</div>
                </div>
                <div className="bg-blue-900/20 border border-[#6b9dc7]/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#6b9dc7] mb-2">6</div>
                  <div className="text-gray-300 text-sm">Programs Offered</div>
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
              Ready to Transform Your Career?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of professionals who have accelerated their careers through our academy. Get in touch to discuss which program is right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyPopup
                text="Enroll Now"
                className="inline-flex items-center justify-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/30 border-none cursor-pointer"
              />
              <button
                className="inline-flex items-center justify-center bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <span>Download Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;