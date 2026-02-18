import React, { useState } from 'react';
import { CheckCircle, Rocket, TrendingUp, Cpu, Layers, Users, Phone, Clock, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function ConsultantForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    businessGoal: [],
    businessSize: '',
    startTime: '',
    consultationType: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (field, value) => {
    if (field === 'businessGoal') {
      const notSureOption = 'Not sure — I need expert advice';
      
      // If clicking "Not sure" option
      if (value === notSureOption) {
        setFormData({ ...formData, [field]: [notSureOption] });
      } 
      // If "Not sure" is already selected, replace it with new selection
      else if (formData.businessGoal.includes(notSureOption)) {
        setFormData({ ...formData, [field]: [value] });
      }
      // Toggle selection for other options
      else {
        const currentGoals = formData.businessGoal;
        if (currentGoals.includes(value)) {
          setFormData({ ...formData, [field]: currentGoals.filter(g => g !== value) });
        } else {
          setFormData({ ...formData, [field]: [...currentGoals, value] });
        }
      }
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // Validation functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // Phone validation is handled by react-phone-input-2
    return phone && phone.replace(/\D/g, '').length >= 10;
  };

  const isStep1Valid = () => {
    return formData.fullName && 
           formData.businessName && 
           isValidEmail(formData.email) && 
           isValidPhone(formData.phone);
  };

  const isStep2Valid = () => {
    return formData.businessGoal.length > 0 && formData.businessSize;
  };

  const isStep3Valid = () => {
    return formData.startTime && formData.consultationType;
  };

  const handleNext = () => {
    if (step === 1 && isStep1Valid()) setStep(2);
    else if (step === 2 && isStep2Valid()) setStep(3);
  };

  const handleSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('https://formspree.io/f/xyzbrnzl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          businessGoal: formData.businessGoal.join(', '),
          businessSize: formData.businessSize,
          startTime: formData.startTime,
          consultationType: formData.consultationType
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError('Failed to submit. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goalOptions = [
    { label: 'Grow revenue & attract more customers', icon: <TrendingUp size={20} /> },
    { label: 'Automate and digitize our operations', icon: <Cpu size={20} /> },
    { label: 'Develop a digital product or SaaS platform', icon: <Layers size={20} /> },
    { label: 'Improve team efficiency & performance', icon: <Users size={20} /> },
    { label: 'Not sure — I need expert advice', icon: <Phone size={20} /> }
  ];

  const businessSizeOptions = [
    'Startup (1–10 employees)',
    'Small Business (11–50 employees)',
    'Mid-size (51–200 employees)',
    'Large Organization (200+)'
  ];

  const startTimeOptions = [
    'Immediately',
    'Within the next 30 days',
    'Within 3 months',
    'Just exploring for now'
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-[#6b9dc7] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Request Submitted!</h2>
          <p className="text-gray-300 mb-6">You'll hear from one of our consultants within a working day to discuss your business goals.</p>
         <Link to='/'> <button
          
            className="px-6 py-3 bg-[#6b9dc7] text-white rounded-lg font-medium hover:bg-[#5a8bb5] transition"
          >
            Keep Exploring
          </button>
          </Link>
        </div>
      </div>
    );
  }

  // Confirmation Modal
  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pb-8 pt-35">
        <div className="max-w-2xl w-full bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Review Your Information</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Full Name</p>
              <p className="text-white font-medium">{formData.fullName}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Business Name</p>
              <p className="text-white font-medium">{formData.businessName}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white font-medium">{formData.email}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Phone</p>
              <p className="text-white font-medium">{formData.phone}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Business Goals</p>
              <div className="space-y-1">
                {formData.businessGoal.map((goal, index) => (
                  <p key={index} className="text-white font-medium">• {goal}</p>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Business Size</p>
              <p className="text-white font-medium">{formData.businessSize}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Start Time</p>
              <p className="text-white font-medium">{formData.startTime}</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Consultation Type</p>
              <p className="text-white font-medium">{formData.consultationType}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Go Back to Edit
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-[#6b9dc7] text-white hover:bg-[#2f5d83]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm & Submit'} <CheckCircle size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 pt-35 px-4 min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Business Consultation Request</h1>
          <p className="text-gray-400 text-lg">Let's discuss your business goals and create a strategy</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-[#6b9dc7] text-white' : 'bg-gray-700 text-gray-400'}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <span className={`text-xs sm:text-sm font-medium ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Your Details</span>
          </div>
          <div className={`flex-1 h-1 mx-3 ${step >= 2 ? 'bg-[#6b9dc7]' : 'bg-gray-700'}`}></div>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-[#6b9dc7] text-white' : 'bg-gray-700 text-gray-400'}`}>
              {step > 2 ? '✓' : '2'}
            </div>
            <span className={`text-xs sm:text-sm font-medium ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Your Needs</span>
          </div>
          <div className={`flex-1 h-1 mx-3 ${step >= 3 ? 'bg-[#6b9dc7]' : 'bg-gray-700'}`}></div>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-[#6b9dc7] text-white' : 'bg-gray-700 text-gray-400'}`}>
              3
            </div>
            <span className={`text-xs sm:text-sm font-medium ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>Your Expectations</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
          {/* Step 1: Quick Contact */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Quick Contact</h2>
              <p className="text-gray-400 mb-6">Trust & Ease First</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  {formData.email && !isValidEmail(formData.email) && (
                    <p className="text-red-400 text-xs mt-1">Please enter a valid email address</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number *</label>
                  <div className="react-phone-input-container">
                
<PhoneInput
  country={'ae'}
  value={formData.phone}
  onChange={(phone, country) => {
    setFormData({
      ...formData,
      phone: phone,
      countryCode: '+' + country.dialCode
    });
  }}
  containerClass="w-full"
  inputClass="w-full"
  buttonClass="!bg-gray-700/50 !border-gray-600 hover:!bg-gray-600/50"
  dropdownClass="!bg-gray-700 !border-gray-600"
  searchClass="!bg-gray-600 !text-white !border-gray-500"
  inputStyle={{
    width: '100%',
    height: '48px',
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    border: '1px solid rgb(75, 85, 99)',
    borderRadius: '0.5rem',
    color: 'white',
    fontSize: '1rem',
    paddingLeft: '48px'
  }}
  buttonStyle={{
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    border: '1px solid rgb(75, 85, 99)',
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem'
  }}
  dropdownStyle={{
    backgroundColor: 'rgb(55, 65, 81)',
    border: '1px solid rgb(75, 85, 99)',
    color: 'white'
  }}
/>
                  </div>
                  {formData.phone && !isValidPhone(formData.phone) && (
                    <p className="text-red-400 text-xs mt-1">Please enter a valid phone number</p>
                  )}
                  <p className="text-gray-500 text-xs mt-2">👉We require this informations to contact you</p>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!isStep1Valid()}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                    isStep1Valid()
                      ? 'bg-[#6b9dc7] text-white hover:bg-[#5a8bb5]'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Identify the Need */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Identify the Need</h2>
              <p className="text-gray-400 mb-6">Qualification Without Overload</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">What's your biggest business goal right now? *</label>
                  <p className="text-gray-400 text-xs mb-3">Select one or more options</p>
                  <div className="space-y-2">
                    {goalOptions.map((goal) => (
                      <button
                        key={goal.label}
                        onClick={() => handleChange('businessGoal', goal.label)}
                        className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition ${
                          formData.businessGoal.includes(goal.label)
                            ? 'bg-[#6b9dc7] text-white border-2 border-blue-500'
                            : 'bg-gray-700 text-gray-300 border-2 border-transparent hover:border-gray-600'
                        }`}
                      >
                        {goal.icon}
                        <span className="text-sm font-medium">{goal.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">What's your business size? *</label>
                  <div className="space-y-2">
                    {businessSizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleChange('businessSize', size)}
                        className={`w-full p-3 rounded-lg text-left transition ${
                          formData.businessSize === size
                            ? 'bg-[#6b9dc7] text-white border-2 border-blue-500'
                            : 'bg-gray-700 text-gray-300 border-2 border-transparent hover:border-gray-600'
                        }`}
                      >
                        <span className="text-sm font-medium">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition flex items-center gap-2"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!isStep2Valid()}
                    className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                      isStep2Valid()
                        ? 'bg-[#6b9dc7] text-white hover:bg-[#5a8bb5]'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Set Expectation */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Set Expectation</h2>
              <p className="text-gray-400 mb-6">Permission to Engage</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">When would you like to start? *</label>
                  <div className="space-y-2">
                    {startTimeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleChange('startTime', time)}
                        className={`w-full p-3 rounded-lg text-left transition ${
                          formData.startTime === time
                            ? 'bg-[#6b9dc7] text-white border-2 border-blue-500'
                            : 'bg-gray-700 text-gray-300 border-2 border-transparent hover:border-gray-600'
                        }`}
                      >
                        <span className="text-sm font-medium">{time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">Preferred Consultation Type: *</label>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleChange('consultationType', 'Free Discovery Call (15 mins)')}
                      className={`w-full p-4 rounded-lg text-left transition ${
                        formData.consultationType === 'Free Discovery Call (15 mins)'
                          ? 'bg-[#6b9dc7] text-white border-2 border-blue-500'
                          : 'bg-gray-700 text-gray-300 border-2 border-transparent hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">Free Discovery Call</span>
                        <Clock size={20} />
                      </div>
                      <p className={`text-sm ${formData.consultationType === 'Free Discovery Call (15 mins)' ? 'text-blue-100' : 'text-gray-400'}`}>
                        15 minutes · Quick consultation to understand your needs
                      </p>
                    </button>

                    <button
                      onClick={() => handleChange('consultationType', 'Full Strategy Session (60 mins, paid)')}
                      className={`w-full p-4 rounded-lg text-left transition ${
                        formData.consultationType === 'Full Strategy Session (60 mins, paid)'
                          ? 'bg-[#6b9dc7] text-white border-2 border-blue-500'
                          : 'bg-gray-700 text-gray-300 border-2 border-transparent hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">Full Strategy Session</span>
                        <Rocket size={20} />
                      </div>
                      <p className={`text-sm ${formData.consultationType === 'Full Strategy Session (60 mins, paid)' ? 'text-blue-100' : 'text-gray-400'}`}>
                        60 minutes · Deep dive strategy session (paid)
                      </p>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">
                    ✅ You'll hear from one of our consultants within 24 hours to discuss your business goals.
                  </p>
                </div>

                {submitError && (
                  <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition flex items-center gap-2"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button
                    onClick={() => {
                      if (isStep3Valid()) {
                        setShowConfirmation(true);
                      }
                    }}
                    disabled={!isStep3Valid() || isSubmitting}
                    className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                      isStep3Valid() && !isSubmitting
                        ? 'bg-[#6b9dc7] text-white hover:bg-[#5a8bb5]'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : "Let's Get Started"} <Rocket size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6 mb-10">
          <p className="text-gray-500 text-sm">🔒 Your information is secure and confidential</p>
        </div>
      </div>
    </div>
  );
}