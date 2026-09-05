import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Layers, 
  Award, 
  RefreshCw, 
  FileText, 
  Zap,
  BarChart3,
  Check,
  Code2,
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Printer,
  AlertTriangle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import CalendlyPopup from '../Components/CalendlyPopup';

const PILLARS_CONFIG = [
  {
    name: "Business Transformation & Performance",
    icon: Layers,
    recommendations: {
      high: "Maintain agile operational governance and explore process mining intelligence to preserve competitive advantage.",
      medium: "Standardize process mapping across cross-functional teams with formal BPMN standards and structured requirements engineering.",
      low: "Prioritize establishing formal Standard Operating Procedures (SOPs) and eliminate tribal knowledge silos across critical operations."
    }
  },
  {
    name: "Digital Transformation & Technology Strategy",
    icon: TrendingUp,
    recommendations: {
      high: "Leverage API-led enterprise architecture and optimize multi-cloud infrastructure economics for scale.",
      medium: "Formulate a unified 2-3 year digital roadmap aligning departmental IT spending with executive growth metrics.",
      low: "Break down departmental software silos and transition from reactive point-to-point IT fixes to a strategic technology roadmap."
    }
  },
  {
    name: "AI & Business Automation",
    icon: Cpu,
    recommendations: {
      high: "Scale custom domain-specific LLMs and autonomous multi-agent pipelines across executive decision-making.",
      medium: "Centralize corporate data into clean, governed data pipelines to unlock enterprise-grade machine learning.",
      low: "Conduct an AI Opportunity Discovery Sprint to identify high-ROI repetitive workflows suitable for immediate RPA and LLM automation."
    }
  },
  {
    name: "Cybersecurity & Digital Risk",
    icon: ShieldCheck,
    recommendations: {
      high: "Adopt continuous zero-trust security postures, automated threat hunting, and red-team resilience testing.",
      medium: "Formalize an executive incident response playbook and roll out bi-weekly simulated phishing drills.",
      low: "Urgently conduct a UAE PDPL & NESA compliance audit, establish vCISO governance, and implement automated vulnerability scanning."
    }
  },
  {
    name: "Digital Solutions & Software Engineering",
    icon: Code2,
    recommendations: {
      high: "Implement advanced DevSecOps observability, automated chaos engineering, and continuous microservices governance.",
      medium: "Expand automated regression test suites and decouple legacy monolithic dependencies with clean REST/GraphQL APIs.",
      low: "Modernize legacy application technical debt and implement automated CI/CD deployment pipelines to eliminate production outages."
    }
  }
];

const questions = [
  // Pillar 1: Business Transformation & Performance
  {
    id: 1,
    pillar: "Business Transformation & Performance",
    icon: Layers,
    question: "How clearly defined and documented are your core operational processes?",
    multiSelect: false,
    options: [
      { text: "Mostly ad-hoc or tribal knowledge; limited written documentation.", score: 1 },
      { text: "Partially documented in silos; rarely updated or reviewed.", score: 2 },
      { text: "Standard Operating Procedures (SOPs) exist for critical workflows.", score: 3 },
      { text: "Fully mapped, digitized, and continuously optimized with clear BPMN standards.", score: 4 }
    ]
  },
  {
    id: 2,
    pillar: "Business Transformation & Performance",
    icon: Layers,
    question: "How do you capture, engineer, and validate requirements before launching new initiatives or software projects?",
    options: [
      { text: "Informal requests via email/chat with frequent scope creep.", score: 1 },
      { text: "Basic specification sheets; limited stakeholder alignment.", score: 2 },
      { text: "Structured Business Requirements Documents (BRD) & User Stories.", score: 3 },
      { text: "Formal Requirements Engineering with rigorous validation, acceptance criteria, and traceability.", score: 4 }
    ]
  },

  // Pillar 2: Digital Transformation & Tech Strategy
  {
    id: 3,
    pillar: "Digital Transformation & Technology Strategy",
    icon: TrendingUp,
    question: "How integrated is your current technology stack (CRM, ERP, Finance, Operations)?",
    options: [
      { text: "Siloed legacy systems requiring extensive manual copy-pasting.", score: 1 },
      { text: "Some point-to-point connections with frequent data mismatches.", score: 2 },
      { text: "Modern cloud CRM/ERP platforms with basic automated integrations.", score: 3 },
      { text: "Fully unified enterprise architecture with automated APIs and real-time data sync.", score: 4 }
    ]
  },
  {
    id: 4,
    pillar: "Digital Transformation & Technology Strategy",
    icon: TrendingUp,
    question: "Do you have a clear, multi-year digital transformation and cloud technology roadmap?",
    options: [
      { text: "No formal roadmap; technology purchases are strictly reactive.", score: 1 },
      { text: "Short-term IT plans without strong alignment to business strategy.", score: 2 },
      { text: "Structured 1-2 year plan aligned with key departmental goals.", score: 3 },
      { text: "Comprehensive multi-year digital roadmap tied directly to executive business growth metrics.", score: 4 }
    ]
  },

  // Pillar 3: AI & Business Automation
  {
    id: 5,
    pillar: "AI & Business Automation",
    icon: Cpu,
    question: "To what extent has your organisation adopted Robotic Process Automation (RPA) or AI tools?",
    options: [
      { text: "Zero adoption; all repetitive tasks are handled manually.", score: 1 },
      { text: "Ad-hoc personal use of consumer AI tools (e.g. ChatGPT) without policy.", score: 2 },
      { text: "Piloting automated workflows in specific departments (e.g. customer support or finance).", score: 3 },
      { text: "Enterprise-grade AI workflows, custom LLM integrations, and automated pipelines deployed in production.", score: 4 }
    ]
  },
  {
    id: 6,
    pillar: "AI & Business Automation",
    icon: Cpu,
    question: "How prepared is your enterprise data for AI ingestion and predictive analytics?",
    options: [
      { text: "Scattered in spreadsheets, unstandardized, and untrusted.", score: 1 },
      { text: "Centralized in disparate databases but requires heavy cleaning.", score: 2 },
      { text: "Structured data warehouse with active business intelligence dashboards.", score: 3 },
      { text: "Clean, governed data lake with real-time pipelines ready for AI modeling.", score: 4 }
    ]
  },

  // Pillar 4: Cybersecurity & Digital Risk
  {
    id: 7,
    pillar: "Cybersecurity & Digital Risk",
    icon: ShieldCheck,
    question: "How compliant is your organisation with UAE PDPL, NESA, and international data protection standards?",
    options: [
      { text: "Unaware or have not performed a compliance audit.", score: 1 },
      { text: "Basic privacy policy on website, but no formal data governance.", score: 2 },
      { text: "Periodic internal security reviews and data protection protocols in place.", score: 3 },
      { text: "Full compliance with regular third-party audits, vCISO governance, and incident response playbooks.", score: 4 }
    ]
  },
  {
    id: 8,
    pillar: "Cybersecurity & Digital Risk",
    icon: ShieldCheck,
    question: "How frequently do you perform vulnerability assessments and employee security training?",
    options: [
      { text: "Never or only when an incident occurs.", score: 1 },
      { text: "Infrequent ad-hoc scans; no regular staff security training.", score: 2 },
      { text: "Annual vulnerability testing and annual security awareness.", score: 3 },
      { text: "Continuous vulnerability management, simulated phishing drills, and proactive threat monitoring.", score: 4 }
    ]
  },

  // Pillar 5: Digital Solutions & Software Engineering
  {
    id: 9,
    pillar: "Digital Solutions & Software Engineering",
    icon: Code2,
    question: "How modern, decoupled, and scalable is your custom application architecture?",
    options: [
      { text: "Monolithic legacy systems with heavy technical debt and frequent outages.", score: 1 },
      { text: "Tightly coupled services; adjustments in one module often break other features.", score: 2 },
      { text: "Partially containerized cloud applications connected via standard REST APIs.", score: 3 },
      { text: "Fully modular cloud-native microservices architecture with automated elasticity and high availability.", score: 4 }
    ]
  },
  {
    id: 10,
    pillar: "Digital Solutions & Software Engineering",
    icon: Code2,
    question: "How automated and robust are your software testing, DevSecOps, and release pipelines?",
    options: [
      { text: "Entirely manual testing; deployments are stressful and done outside business hours.", score: 1 },
      { text: "Basic developer unit tests; frequent regressions slip into production.", score: 2 },
      { text: "Automated test suites with structured staging and pre-production release gates.", score: 3 },
      { text: "End-to-end automated testing, integrated DevSecOps scanning, and automated zero-downtime CI/CD.", score: 4 }
    ]
  }
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showLeadGate, setShowLeadGate] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Lead capture state
  const [leadInfo, setLeadInfo] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    industry: 'Banking & Financial Services'
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleSelectOption = (questionId, score, isMulti = false) => {
    if (isMulti) {
      setAnswers(prev => {
        const current = Array.isArray(prev[questionId])
          ? prev[questionId]
          : (prev[questionId] !== undefined ? [prev[questionId]] : []);
        const exists = current.includes(score);
        const updated = exists
          ? current.filter(s => s !== score)
          : [...current, score];
        return { ...prev, [questionId]: updated };
      });
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: score }));
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finished all 10 questions -> Prompt Lead Capture Gate
      setShowLeadGate(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();
    setLeadSubmitted(true);
    setShowLeadGate(false);
    setIsCompleted(true);
  };

  const handleSkipLead = () => {
    setShowLeadGate(false);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowLeadGate(false);
    setIsCompleted(false);
  };

  // Overall Score Calculation
  const totalScore = questions.reduce((acc, q) => {
    const ans = answers[q.id];
    if (Array.isArray(ans)) {
      if (ans.length === 0) return acc;
      return acc + (ans.reduce((sum, val) => sum + val, 0) / ans.length);
    }
    return acc + (ans || 0);
  }, 0);

  const maxScore = questions.length * 4; // 10 * 4 = 40
  const percentage = Math.round((totalScore / maxScore) * 100);

  let maturityLevel = "Ad-Hoc / Foundation Stage";
  let maturityBadge = "bg-amber-500/10 border-amber-500/30 text-amber-300";
  let maturitySummary = "Your organization exhibits notable operational bottlenecks and manual processes. Focused interventions in standard operating procedures, data integration, and cloud architecture will unlock immediate efficiency gains.";

  if (percentage >= 75) {
    maturityLevel = "Optimized / Market Leader";
    maturityBadge = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
    maturitySummary = "Your organization demonstrates strong digital governance and scalable operational architecture. Focus on continuous AI automation, advanced DevSecOps resilience, and proactive compliance to sustain your competitive edge.";
  } else if (percentage >= 50) {
    maturityLevel = "Structured / Scaling Stage";
    maturityBadge = "bg-blue-500/10 border-blue-500/30 text-blue-300";
    maturitySummary = "Your foundational workflows are in place. The next strategic phase requires unifying cross-functional software silos, automating repetitive tasks with AI, and institutionalizing continuous security governance.";
  }

  // Calculate Pillar-by-Pillar Breakdown
  const pillarResults = PILLARS_CONFIG.map(pConfig => {
    const pillarQuestions = questions.filter(q => q.pillar === pConfig.name);
    const pillarMax = pillarQuestions.length * 4;
    const pillarTotal = pillarQuestions.reduce((acc, q) => {
      const ans = answers[q.id];
      if (Array.isArray(ans)) {
        if (ans.length === 0) return acc;
        return acc + (ans.reduce((sum, val) => sum + val, 0) / ans.length);
      }
      return acc + (ans || 0);
    }, 0);

    const pillarPct = Math.round((pillarTotal / pillarMax) * 100) || 0;

    let status = "Needs Immediate Focus";
    let statusColor = "text-amber-400";
    let badgeColor = "bg-amber-500/10 border-amber-500/30 text-amber-300";
    let rec = pConfig.recommendations.low;

    if (pillarPct >= 75) {
      status = "Mature / Optimized";
      statusColor = "text-emerald-400";
      badgeColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
      rec = pConfig.recommendations.high;
    } else if (pillarPct >= 50) {
      status = "Structured / Scaling";
      statusColor = "text-blue-400";
      badgeColor = "bg-blue-500/10 border-blue-500/30 text-blue-300";
      rec = pConfig.recommendations.medium;
    }

    return {
      ...pConfig,
      score: pillarTotal,
      max: pillarMax,
      percentage: pillarPct,
      status,
      statusColor,
      badgeColor,
      recommendation: rec
    };
  });

  const currentQ = questions[currentStep];
  const Icon = currentQ ? currentQ.icon : Layers;
  const currentAnswer = answers[currentQ?.id];
  const isAnswered = currentQ?.multiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : currentAnswer !== undefined;

  // Determine current pillar number (1 to 5)
  const currentPillarIndex = PILLARS_CONFIG.findIndex(p => p.name === currentQ?.pillar);

  return (
    <div className="min-h-screen bg-[#080f1d] text-white pb-24">
      {/* Hero Section with Image Background */}
      <section data-hero="true" className="relative overflow-hidden pt-36 pb-20 border-b border-white/5 mb-14">
        {/* Background Image with Midnight Navy Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://i.pinimg.com/1200x/29/64/d1/2964d1cb19c95bae8fa41d607070092c.jpg')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/90 via-[#080f1d]/75 to-[#080f1d]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#0a2342]/40 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a2342]/70 text-[#ffffff] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Executive Transformation Diagnostic
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-[#ffffff]">
            Business Transformation Assessment™️
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Evaluate your enterprise across 5 core pillars: Operations, Cloud Strategy, AI Automation, Cybersecurity, and Software Engineering.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* STEP 1: 10-Question Diagnostic Wizard */}
        {!showLeadGate && !isCompleted && (
          <div className="bg-[#0a2342]/20 backdrop-blur-xl rounded-sm p-6 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Top Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>
                  Pillar {currentPillarIndex + 1} of {PILLARS_CONFIG.length}: <strong className="text-blue-300">{currentQ.pillar}</strong>
                </span>
                <span>Question {currentStep + 1} of {questions.length}</span>
              </div>
              <div className="w-full bg-[#0a2342]/40 h-2 rounded-sm overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-300 rounded-sm shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Header Card */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#0a2342] border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    {currentQ.pillar}
                  </span>
                </div>
                {currentQ.multiSelect && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium">
                    Select all that apply
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 leading-snug">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const selected = currentQ.multiSelect
                    ? Array.isArray(answers[currentQ.id]) && answers[currentQ.id].includes(option.score)
                    : answers[currentQ.id] === option.score;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, option.score, currentQ.multiSelect)}
                      className={`w-full text-left p-4 rounded-sm transition-all duration-200 flex items-start gap-4 cursor-pointer border ${
                        selected
                          ? 'bg-[#0a2342] border-blue-500/80 text-white shadow-lg shadow-blue-950/50'
                          : 'bg-[#0a2342]/20 border-white/5 hover:bg-[#0a2342]/40 hover:border-blue-500/30 text-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 ${currentQ.multiSelect ? 'rounded-sm' : 'rounded-full'} border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        selected 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'bg-[#0a2342]/40 border-gray-600'
                      }`}>
                        {selected && (
                          currentQ.multiSelect 
                            ? <Check className="w-3.5 h-3.5 stroke-[3]" />
                            : <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] cursor-pointer"
              >
                {currentStep === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Lead Capture Gate (Executive Identification) */}
        {showLeadGate && !isCompleted && (
          <div className="bg-[#0a2342]/20 backdrop-blur-xl rounded-sm p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
            <div className="max-w-xl mx-auto text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Your Assessment is Complete!
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Where should we send your official **Executive Diagnostic Scorecard** & strategic breakdown?
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="max-w-xl mx-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Full Name <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={leadInfo.fullName}
                    onChange={(e) => setLeadInfo({ ...leadInfo, fullName: e.target.value })}
                    placeholder="e.g. Tariq Al Mansoori"
                    className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#080f1d]/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Corporate Email <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={leadInfo.workEmail}
                      onChange={(e) => setLeadInfo({ ...leadInfo, workEmail: e.target.value })}
                      placeholder="tariq@enterprise.ae"
                      className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#080f1d]/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Company Name <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={leadInfo.companyName}
                      onChange={(e) => setLeadInfo({ ...leadInfo, companyName: e.target.value })}
                      placeholder="e.g. Emirates Logistics Group"
                      className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#080f1d]/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={leadInfo.phone}
                      onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#080f1d]/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Industry Sector
                  </label>
                  <select
                    value={leadInfo.industry}
                    onChange={(e) => setLeadInfo({ ...leadInfo, industry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm bg-[#080f1d] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Banking & Financial Services">Banking & Financial Services</option>
                    <option value="Government & Public Sector">Government & Public Sector</option>
                    <option value="Real Estate & Construction">Real Estate & Construction</option>
                    <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                    <option value="Retail & E-commerce">Retail & E-commerce</option>
                    <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
                    <option value="Technology & Telecommunications">Technology & Telecommunications</option>
                    <option value="Other Corporate Enterprise">Other Corporate Enterprise</option>
                  </select>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>UAE PDPL &amp; GDPR Compliant • Strictly Confidential Diagnostic</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSkipLead}
                  className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer underline order-2 sm:order-1"
                >
                  Skip for now &amp; preview score
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] cursor-pointer order-1 sm:order-2 flex items-center justify-center gap-2"
                >
                  <span>Reveal Full Diagnostic Scorecard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: Full Diagnostic Results Scorecard */}
        {isCompleted && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Score Banner */}
            <div className="bg-[#0a2342]/20 border border-white/10 backdrop-blur-xl rounded-sm p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
              <div className="inline-flex p-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
                <Award className="w-12 h-12" />
              </div>

              {leadInfo.fullName && (
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                  Diagnostic Prepared for {leadInfo.fullName} {leadInfo.companyName ? `• ${leadInfo.companyName}` : ''}
                </div>
              )}

              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                Your Transformation Maturity Rating
              </h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
                Evaluated against the Innosphere Enterprise Transformation Framework (UAE / GCC Benchmark)
              </p>

              {/* Overall Score Circle / Indicator */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white mb-2">
                  {percentage}<span className="text-3xl text-blue-400">%</span>
                </div>
                <div className={`px-4 py-1.5 rounded-sm border text-xs font-semibold uppercase tracking-wider ${maturityBadge}`}>
                  {maturityLevel}
                </div>
              </div>

              {/* Strategic Diagnostic Summary */}
              <div className="bg-[#080f1d]/80 border border-white/10 rounded-sm p-6 text-left max-w-2xl mx-auto space-y-3">
                <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  Executive Summary
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {maturitySummary}
                </p>
              </div>
            </div>

            {/* Pillar-by-Pillar Breakdown Section */}
            <div className="bg-[#0a2342]/20 border border-white/10 backdrop-blur-xl rounded-sm p-6 sm:p-10 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    5 Strategic Practice Area Diagnostic Breakdown
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Granular maturity scores across each of Innosphere's core consulting pillars
                  </p>
                </div>
                <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-sm">
                  Benchmark Analysis
                </div>
              </div>

              <div className="space-y-6">
                {pillarResults.map((pillar, idx) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-[#080f1d]/80 border border-white/5 hover:border-blue-500/30 rounded-sm p-5 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-sm bg-[#0a2342] border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                            <PillarIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-sm sm:text-base">
                              {pillar.name}
                            </h4>
                            <span className="text-[11px] text-gray-400">
                              Score: {pillar.score} / {pillar.max} Points
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className={`text-xs px-2.5 py-0.5 rounded-sm border uppercase font-medium tracking-wider ${pillar.badgeColor}`}>
                            {pillar.status}
                          </span>
                          <span className="text-base font-bold text-white min-w-[45px] text-right">
                            {pillar.percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Score Bar */}
                      <div className="w-full bg-[#0a2342]/40 h-2 rounded-sm overflow-hidden mb-3">
                        <div 
                          className="bg-blue-500 h-full transition-all duration-700 rounded-sm"
                          style={{ width: `${pillar.percentage}%` }}
                        />
                      </div>

                      {/* Recommended Intervention */}
                      <div className="flex items-start gap-2 text-xs text-gray-300 bg-[#0a2342]/30 p-2.5 rounded-sm border border-white/5">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-blue-300">Strategic Recommendation: </strong>
                          {pillar.recommendation}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conversion CTA & Actions Card */}
            <div className="bg-[#0a2342]/20 border border-white/10 backdrop-blur-xl rounded-sm p-8 sm:p-10 shadow-2xl text-center space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Ready to Close Your Operational &amp; Technology Gaps?
              </h3>
              <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
                Innosphere Consulting provides executive-led PMO advisory, enterprise architecture, AI automation frameworks, and compliance engineering across the UAE and global markets.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <CalendlyPopup
                  text="Book Executive Consultation to Review Scorecard →"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] border-none cursor-pointer text-sm"
                />

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-medium bg-[#080f1d] hover:bg-[#080f1d]/80 text-gray-200 border border-white/10 text-sm transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-blue-400" />
                  Print / Save Diagnostic Summary
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-medium bg-[#0a2342]/40 hover:bg-[#0a2342]/80 text-gray-300 text-sm transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Retake Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
