import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle, 
  Users, 
  Award, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Building2,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import CalendlyPopup from '../Components/CalendlyPopup';

const Academy = () => {
  const heroRef = useRef(null);
  const programsRef = useRef([]);
  const [flippedCard, setFlippedCard] = useState(null);
  const [showAll, setShowAll] = useState(true);

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
  }, []);

  const programs = [
    {
      id: 1,
      title: "Business Analysis",
      subtitle: "Aligned with BABOK® & Global Standards",
      description: "Master structured business analysis, requirements engineering, stakeholder discovery, and domain modeling to bridge commercial vision with technical execution.",
      duration: "10 weeks",
      level: "Intermediate to Advanced",
      icon: Target,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      features: [
        "BABOK® framework mastery & structured requirements",
        "AS-IS vs TO-BE workflow modeling & BPMN 2.0",
        "BRD, SRS, User Stories, and Acceptance Criteria",
        "Stakeholder elicitation & conflict resolution",
        "Real-world enterprise case studies"
      ],
      outcomes: [
        "Globally recognized certification readiness",
        "End-to-end analytical leadership capability",
        "Accelerated stakeholder alignment",
        "Direct career & consulting advancement"
      ]
    },
    {
      id: 2,
      title: "Product Management",
      subtitle: "From Concept to Scalable Product Launch",
      description: "Develop the strategic acumen to discover customer needs, architect product roadmaps, prioritize backlogs, and lead agile cross-functional delivery teams.",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      features: [
        "Product vision, strategy & North Star metric definition",
        "Customer journey mapping & UX research",
        "MVP scoping, feature scoring & backlog grooming",
        "Agile / Scrum delivery frameworks",
        "Go-to-market (GTM) execution & product analytics"
      ],
      outcomes: [
        "Data-driven product leadership mindset",
        "Fast-track delivery of high-converting products",
        "Proven portfolio piece from live capstone project",
        "Stronger stakeholder & executive communication"
      ]
    },
    {
      id: 3,
      title: "Digital Transformation",
      subtitle: "Leading Enterprise Change & Modernization",
      description: "Equip yourself with the strategic frameworks to lead digital transformation programs, cloud migrations, and digital operating model modernization.",
      duration: "6 weeks",
      level: "Executive & Senior Level",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      features: [
        "Digital maturity assessment models",
        "Enterprise technology architecture blueprints",
        "Change management & organizational culture shift",
        "Aligning with UAE D33 & Digital Government 2025",
        "ROI modeling & executive transformation business cases"
      ],
      outcomes: [
        "Strategic digital advisory vision",
        "Mitigated transformation resistance across teams",
        "Accelerated technology adoption rates",
        "High-impact organizational resilience"
      ]
    },
    {
      id: 4,
      title: "AI & Intelligent Automation",
      subtitle: "Applied Enterprise AI & Prompt Architecture",
      description: "Understand applied artificial intelligence, generative AI tooling, automated workflows, and data governance for enterprise scalability.",
      duration: "6 weeks",
      level: "All Professional Levels",
      icon: Cpu,
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&q=80",
      features: [
        "Enterprise Generative AI & custom LLM capabilities",
        "Robotic Process Automation (RPA) workflow design",
        "Data preparation & predictive intelligence fundamentals",
        "AI ethics, risk mitigation & regulatory compliance",
        "UAE AI Strategy 2031 alignment"
      ],
      outcomes: [
        "Practical prompt engineering & AI workflow deployment",
        "Elimination of 50%+ repetitive operational overhead",
        "Data-driven decision making capabilities",
        "Future-proof professional competitive edge"
      ]
    },
    {
      id: 5,
      title: "Process Improvement",
      subtitle: "Lean Six Sigma & Business Process Re-engineering",
      description: "Eliminate operational waste, optimize cross-departmental handoffs, and design high-velocity operating models with measurable KPI improvements.",
      duration: "6 weeks",
      level: "Intermediate",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      features: [
        "Lean Six Sigma DMAIC methodologies",
        "Root cause analysis & bottleneck identification",
        "Standard Operating Procedure (SOP) design",
        "Operational dashboards & real-time KPI tracking",
        "Continuous improvement culture implementation"
      ],
      outcomes: [
        "Measurable cycle-time and cost reduction",
        "Standardized and error-resilient workflows",
        "Enhanced customer and employee experience",
        "Process optimization certification readiness"
      ]
    },
    {
      id: 6,
      title: "Cybersecurity Awareness",
      subtitle: "Digital Risk, PDPL & Security Culture",
      description: "Build an unbreakable first line of defense. Learn cyber threat landscapes, social engineering countermeasures, data privacy laws, and incident triage.",
      duration: "4 weeks",
      level: "Foundational to Management",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      features: [
        "Threat landscapes (Phishing, Ransomware, Social Engineering)",
        "UAE Personal Data Protection Law (PDPL) & NESA essentials",
        "Password governance & Multi-Factor Authentication (MFA)",
        "Incident response basics & breach reporting protocols",
        "Security-first digital culture building"
      ],
      outcomes: [
        "Organizational vulnerability reduction",
        "Full regulatory compliance readiness",
        "Certified cybersecurity awareness badge",
        "Proactive digital risk mindset"
      ]
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Global Industry Standards",
      description: "Curriculums aligned with international frameworks (BABOK®, Agile, Lean, PDPL) and recognized across the UAE and globally."
    },
    {
      icon: Users,
      title: "Practitioner-Led Instruction",
      description: "Learn directly from senior consultants who actively deliver multi-million dollar transformation projects."
    },
    {
      icon: BookOpen,
      title: "Live Case Studies & Projects",
      description: "Work on real-world enterprise scenarios rather than abstract theory, building a proven portfolio."
    },
    {
      icon: Calendar,
      title: "Flexible Executive Schedules",
      description: "Tailored cohort timings with live interactive sessions, recorded archives, and 1-on-1 mentorship."
    }
  ];

  return (
    <div className="bg-gray-950 min-h-screen text-white pt-28 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-800/60 pb-16">
        <div ref={heroRef} className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Innosphere Academy
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Empower Your Future with <span className="text-[#6b9dc7]">Executive Training</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
            Innosphere Academy empowers professionals and organizations across the UAE and internationally with the critical skills required to lead in the digital economy.
          </p>

          <CalendlyPopup
            text="ENQUIRE FOR CORPORATE OR INDIVIDUAL TRAINING"
            className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-all border-none cursor-pointer"
          />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Why Train With Innosphere Academy?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Practical, transformation-grounded learning designed for immediate workplace impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="bg-blue-500/10 border border-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Core Curriculum & Specialized Tracks
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our 6 structured training tracks built to develop world-class capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-gray-900/60 border border-gray-800 hover:border-blue-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-600 text-white p-2 rounded-xl">
                      <program.icon size={20} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-900/90 text-white text-xs font-semibold px-3 py-1 rounded-full border border-gray-700">
                      {program.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                    {program.level}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                  <p className="text-gray-300 text-xs font-medium mb-4">{program.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Key Modules:</h4>
                    {program.features.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <CalendlyPopup
                  text="Register Interest"
                  className="w-full text-center py-2.5 rounded-full text-xs font-semibold bg-gray-800 hover:bg-blue-600 text-white transition-colors border border-gray-700 hover:border-blue-500 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academy;