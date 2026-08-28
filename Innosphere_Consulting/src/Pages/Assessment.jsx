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
  Check
} from 'lucide-react';
import CalendlyPopup from '../Components/CalendlyPopup';

const questions = [
  // Pillar 1: Business Transformation & Performance
  {
    id: 1,
    pillar: "Business Transformation & Performance",
    icon: Layers,
    question: "How clearly defined and documented are your core operational processes (e.g., AS-IS / TO-BE workflows)?",
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
  }
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (questionId, score) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate results
  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  const maxScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let maturityLevel = "Ad-Hoc / Foundation Stage";
  let maturityColor = "text-amber-400";
  let maturityBadge = "bg-amber-500/10 border-amber-500/30 text-amber-300";
  let maturitySummary = "Your organization has substantial opportunity to streamline operations, eliminate manual bottlenecks, and implement modern digital and AI frameworks to accelerate efficiency.";

  if (percentage >= 75) {
    maturityLevel = "Optimized / Market Leader";
    maturityColor = "text-emerald-400";
    maturityBadge = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
    maturitySummary = "Your organization exhibits strong digital maturity and structured governance. Focus on advanced AI automation, enterprise integrations, and continuous risk mitigation to maintain market leadership.";
  } else if (percentage >= 50) {
    maturityLevel = "Structured / Scaling Stage";
    maturityColor = "text-blue-400";
    maturityBadge = "bg-blue-500/10 border-blue-500/30 text-blue-300";
    maturitySummary = "You have solid foundational processes in place. The next strategic step is unifying cross-functional data, automating repetitive workflows, and hardening security governance.";
  }

  const currentQ = questions[currentStep];
  const Icon = currentQ ? currentQ.icon : Layers;
  const isAnswered = answers[currentQ?.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header / Hero */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Zap className="w-4 h-4 text-blue-400" />
          Proprietary Diagnostic Framework
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Business Transformation Assessment™️
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Evaluate your organisation's operational efficiency, digital strategy, AI readiness, and cybersecurity resilience in under 3 minutes.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!isCompleted ? (
          <div className="bg-gray-900/70 border border-gray-800 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>Pillar {Math.floor(currentStep / 2) + 1} of 4: <strong className="text-gray-200">{currentQ.pillar}</strong></span>
                <span>Question {currentStep + 1} of {questions.length}</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {currentQ.pillar}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const selected = answers[currentQ.id] === option.score;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, option.score)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                        selected
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                          : 'bg-gray-800/40 border-gray-700/60 hover:bg-gray-800/80 hover:border-gray-600 text-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        selected ? 'bg-blue-500 border-blue-400 text-white' : 'border-gray-600 bg-gray-900'
                      }`}>
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-800">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-blue-600/20 hover:scale-105"
              >
                {currentStep === questions.length - 1 ? 'View Transformation Score' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Scorecard */
          <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl text-center animate-fade-in">
            <div className="inline-flex p-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
              <Award className="w-12 h-12" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Your Transformation Diagnostic Score
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Based on the Innosphere Business Transformation Assessment™️ Framework
            </p>

            {/* Score Ring / Pill */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white mb-2">
                {percentage}<span className="text-3xl text-blue-400">%</span>
              </div>
              <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${maturityBadge}`}>
                {maturityLevel}
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 text-left mb-8 space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Strategic Diagnostic Summary
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {maturitySummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Prioritized roadmap tailored for UAE & MENA business expansion</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Targeted architecture to eliminate manual process bottlenecks</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>AI & Automation readiness framework alignment</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Regulatory compliance (UAE PDPL / NESA / ISO standards)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CalendlyPopup
                text="Schedule Free Consultation to Review Your Score"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-lg shadow-blue-600/30 hover:scale-105 border-none cursor-pointer text-sm"
              />
              <button
                onClick={handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition"
              >
                <RefreshCw className="w-4 h-4" /> Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
