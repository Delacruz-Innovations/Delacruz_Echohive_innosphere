import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
    apiKey:"AIzaSyCHLnAO-ug2e-6h15qVP6PVM34iYmaox9I",
  authDomain: "delacruz-innovation.firebaseapp.com",
  projectId: "delacruz-innovation",
  storageBucket: "delacruz-innovation.firebasestorage.app",
  messagingSenderId: "350926550465",
  appId: "1:350926550465:web:b043f422440e1d4793eb40",
  measurementId: "G-VJJ3Z0N9V5"
};

const ITConsultantForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    contact: '',
    businessGoal: '',
    businessSize: '',
    startTimeline: '',
    consultationType: ''
  });

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.contact.trim()) newErrors.contact = 'Contact information is required';
    }
    
    if (step === 2) {
      if (!formData.businessGoal) newErrors.businessGoal = 'Please select a business goal';
      if (!formData.businessSize) newErrors.businessSize = 'Please select your business size';
    }
    
    if (step === 3) {
      if (!formData.startTimeline) newErrors.startTimeline = 'Please select a timeline';
      if (!formData.consultationType) newErrors.consultationType = 'Please select a consultation type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const initializeFirebase = async () => {
    if (typeof window.firebase !== 'undefined') {
      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }
      return window.firebase.firestore();
    }
    return null;
  };

// const handleSubmit = async () => {
//     if (!validateStep(3)) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Send to Formspree
//       const formspreeResponse = await fetch(
//         'https://formspree.io/f/xnnokwan', // Replace YOUR_FORM_ID with your Formspree form ID
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             fullName: formData.fullName,
//             businessName: formData.businessName,
//             contact: formData.contact,
//             businessGoal: formData.businessGoal,
//             businessSize: formData.businessSize,
//             startTimeline: formData.startTimeline,
//             consultationType: formData.consultationType,
//             submittedAt: new Date().toLocaleString(),
//             _subject: `New Consultation Request from ${formData.fullName}`
//           })
//         }
//       );

//       if (!formspreeResponse.ok) {
//         throw new Error('Failed to send email');
//       }

//       console.log('✅ Email sent successfully!');
      
//       // Also save to Firestore
//       const submissionData = {
//         fields: {
//           fullName: { stringValue: formData.fullName },
//           businessName: { stringValue: formData.businessName },
//           contact: { stringValue: formData.contact },
//           businessGoal: { stringValue: formData.businessGoal },
//           businessSize: { stringValue: formData.businessSize },
//           startTimeline: { stringValue: formData.startTimeline },
//           consultationType: { stringValue: formData.consultationType },
//           submittedAt: { timestampValue: new Date().toISOString() },
//           status: { stringValue: 'pending' }
//         }
//       };
      
//       const projectId = 'delacruz-innovation';
//       const apiKey = 'AIzaSyCHLnAO-ug2e-6h15qVP6PVM34iYmaox9I';
      
//       await fetch(
//         `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/consultations?key=${apiKey}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(submissionData)
//         }
//       );
      
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('There was an error submitting the form. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      // Send to Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', 'f4f01d2c-e549-4956-88e8-772bc13b962e'); // Replace this
      formDataToSend.append('subject', `New Consultation Request from ${formData.fullName}`);
      formDataToSend.append('from_name', formData.fullName);
      formDataToSend.append('Full Name', formData.fullName);
      formDataToSend.append('Business Name', formData.businessName);
      formDataToSend.append('Email', formData.contact);
      formDataToSend.append('Business Goal', formData.businessGoal);
      formDataToSend.append('Business Size', formData.businessSize);
      formDataToSend.append('Start Timeline', formData.startTimeline);
      formDataToSend.append('Consultation Type', formData.consultationType);
      formDataToSend.append('Submitted At', new Date().toLocaleString());

      const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await web3FormsResponse.json();

      if (!result.success) {
        throw new Error('Failed to send email');
      }

      console.log('✅ Email sent successfully!');
      
      // Also save to Firestore
      const submissionData = {
        fields: {
          fullName: { stringValue: formData.fullName },
          businessName: { stringValue: formData.businessName },
          contact: { stringValue: formData.contact },
          businessGoal: { stringValue: formData.businessGoal },
          businessSize: { stringValue: formData.businessSize },
          startTimeline: { stringValue: formData.startTimeline },
          consultationType: { stringValue: formData.consultationType },
          submittedAt: { timestampValue: new Date().toISOString() },
          status: { stringValue: 'pending' }
        }
      };
      
      const projectId = 'delacruz-innovation';
      const apiKey = 'AIzaSyCHLnAO-ug2e-6h15qVP6PVM34iYmaox9I';
      
      await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/consultations?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        }
      );
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thank You, {formData.fullName}! 🎉
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Your consultation request has been received. One of our expert consultants will reach out to you within a working day to discuss your business goals.
          </p>
          <div className="bg-purple-700/20 border border-purple-700 rounded-lg p-6 mb-8">
            <p className="text-purple-300 text-sm">
              An email will be sent for confirmation and next steps.
            </p>
          </div>
          <Link
            to="/"
            className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Keep Exploring
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Transform Your Business
          </h1>
          <p className="text-gray-400 text-lg">
            Tell us about your needs in just 3 simple steps
          </p>
        </div>

        {/* Progress Bar */}
<div className="mb-12 w-full max-w-2xl mx-auto">
  {/* Step Indicator */}
  <div className="flex items-center mb-6 relative">
    {[1, 2, 3].map((step, index) => (
      <React.Fragment key={step}>
        {/* Circle */}
        <div className="flex flex-col items-center relative z-10">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg shadow-md transition-all duration-300 ${
              currentStep >= step
                ? 'bg-purple-700 text-white shadow-purple-500/40 scale-105'
                : 'bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-300'
            }`}
          >
            {currentStep > step ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              step
            )}
          </div>
          
          {/* Step Label */}
          <span
            className={`mt-3 text-sm font-medium transition-colors whitespace-nowrap ${
              currentStep >= step ? 'text-purple-400' : 'text-gray-500'
            }`}
          >
            {step === 1 ? 'Contact' : step === 2 ? 'Needs' : 'Expectations'}
          </span>
        </div>

        {/* Connector line */}
        {step < 3 && (
          <div
            className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 -mt-8 ${
              currentStep > step ? 'bg-purple-700' : 'bg-gray-800'
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
</div>


        {/* Form Card */}
        <div className="bg-gray-900 rounded-2xl py-4 px-2 md:p-12 shadow-2xl">
          {/* Step 1: Quick Contact */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                 Quick Contact
                </h2>
                <p className="text-gray-400">Let's start with the basics</p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Full Name <span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700/50"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Business Name <span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700/50"
                  placeholder="Acme Corporation"
                />
                {errors.businessName && <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Email  <span className="text-purple-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700/50"
                  placeholder="john@example.com"
                />
                {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Continue to Step 2 →
              </button>
            </div>
          )}

          {/* Step 2: Identify the Need */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                 Identify the Need
                </h2>
                <p className="text-gray-400">Help us understand your goals</p>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  What's your biggest business goal right now? <span className="text-purple-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    'Grow revenue & attract more customers',
                    'Automate and digitize our operations',
                    'Develop a digital product or SaaS platform',
                    'Improve team efficiency & performance',
                    'Not sure — I need expert advice'
                  ].map((goal) => (
                    <label key={goal} className="flex items-start p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 border-2 transition-all" style={{
                      borderColor: formData.businessGoal === goal ? '#7c3aed' : 'transparent'
                    }}>
                      <input
                        type="radio"
                        name="businessGoal"
                        value={goal}
                        checked={formData.businessGoal === goal}
                        onChange={(e) => handleInputChange('businessGoal', e.target.value)}
                        className="mt-1 text-purple-700 focus:ring-purple-700"
                      />
                      <span className="ml-3 text-white">{goal}</span>
                    </label>
                  ))}
                </div>
                {errors.businessGoal && <p className="text-red-400 text-sm mt-1">{errors.businessGoal}</p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  What's your business size? <span className="text-purple-500">*</span>
                </label>
                <select
                  value={formData.businessSize}
                  onChange={(e) => handleInputChange('businessSize', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700/50"
                >
                  <option value="">Select business size</option>
                  <option value="startup">Startup (1–10 employees)</option>
                  <option value="small">Small Business (11–50 employees)</option>
                  <option value="midsize">Mid-size (51–200 employees)</option>
                  <option value="large">Large Organization (200+)</option>
                </select>
                {errors.businessSize && <p className="text-red-400 text-sm mt-1">{errors.businessSize}</p>}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Continue to Step 3 →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Set Expectation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Set Expectations
                </h2>
                <p className="text-gray-400">When would you like to get started?</p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  When would you like to start? <span className="text-purple-500">*</span>
                </label>
                <select
                  value={formData.startTimeline}
                  onChange={(e) => handleInputChange('startTimeline', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700/50"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Immediately</option>
                  <option value="30days">Within the next 30 days</option>
                  <option value="3months">Within 3 months</option>
                  <option value="exploring">Just exploring for now</option>
                </select>
                {errors.startTimeline && <p className="text-red-400 text-sm mt-1">{errors.startTimeline}</p>}
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  Preferred Consultation Type: <span className="text-purple-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'discovery', label: 'Free Discovery Call (15 mins)', desc: 'Quick overview of your needs' },
                    { value: 'strategy', label: 'Full Strategy Session (60 mins, paid)', desc: 'Deep dive into your business goals' }
                  ].map((type) => (
                    <label key={type.value} className="flex items-start p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 border-2 transition-all" style={{
                      borderColor: formData.consultationType === type.value ? '#7c3aed' : 'transparent'
                    }}>
                      <input
                        type="radio"
                        name="consultationType"
                        value={type.value}
                        checked={formData.consultationType === type.value}
                        onChange={(e) => handleInputChange('consultationType', e.target.value)}
                        className="mt-1 text-purple-700 focus:ring-purple-700"
                      />
                      <div className="ml-3">
                        <div className="text-white font-medium">{type.label}</div>
                        <div className="text-gray-400 text-sm">{type.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.consultationType && <p className="text-red-400 text-sm mt-1">{errors.consultationType}</p>}
              </div>

              <div className="bg-purple-700/20 border border-purple-700 rounded-lg p-4">
                <p className="text-purple-300 text-sm">
                  🚀 You'll hear from one of our consultants within a working day to discuss your business goals.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : "Let's Get Started 🚀"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🔒 Your information is secure and confidential</p>
        </div>
      </div>
    </div>
  );
};

export default ITConsultantForm;