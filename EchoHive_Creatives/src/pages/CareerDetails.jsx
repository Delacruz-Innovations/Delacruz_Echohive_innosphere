import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { MapPin, Briefcase, Clock, Share2, Heart, ChevronLeft, Check } from 'lucide-react';
import jobsData from '../data/jobsData.json';
import { useParams, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function CareerDetails() {
  const [isSaved, setIsSaved] = useState(false);
// In real app: get from URL params or props
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const requirementsRef = useRef([]);
  const benefitsRef = useRef([]);
  const { id } = useParams();
const navigate = useNavigate();
const jobId = parseInt(id);

const [showApplicationForm, setShowApplicationForm] = useState(false);
const [formStep, setFormStep] = useState(0);
const [cvFileName, setCvFileName] = useState('');
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  portfolio: '',
  experience: '',
  coverLetter: '',
  cv: null
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
const [submitStatus, setSubmitStatus] = useState(null);
const formQuestions = [
  { field: 'fullName', label: 'What is your full name?', type: 'text', required: true },
  { field: 'email', label: 'What is your email address?', type: 'email', required: true },
  { field: 'phone', label: 'What is your phone number?', type: 'tel', required: true },
  { field: 'cv', label: 'Upload your CV/Resume', type: 'file', required: true }, // Add CV step
  { field: 'portfolio', label: 'Portfolio/LinkedIn URL (optional)', type: 'url', required: false },
  { field: 'experience', label: 'Years of relevant experience?', type: 'number', required: true },
  { field: 'coverLetter', label: 'Why are you interested in this role?', type: 'textarea', required: true }
];

const handleInputChange = (value) => {
  if (formQuestions[formStep].field === 'cv') {
    // Validate file size (10MB limit)
    if (value && value.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (value && !allowedTypes.includes(value.type)) {
      alert('Only PDF, DOC, and DOCX files are allowed');
      return;
    }
    setFormData({ ...formData, cv: value });
    setCvFileName(value ? value.name : '');
  } else {
    setFormData({ ...formData, [formQuestions[formStep].field]: value });
  }
};

const handleNext = () => {
  if (formStep < formQuestions.length - 1) {
    setFormStep(formStep + 1);
  }
};

const handleBack = () => {
  if (formStep > 0) {
    setFormStep(formStep - 1);
  }
};

const handleSubmitApplication = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const submitData = new FormData();
    submitData.append("access_key", "83c62d8c-14c4-4ff9-a088-9a4d3a92adc3");
    submitData.append("name", formData.fullName);
    submitData.append("email", formData.email);
    submitData.append("subject", `Job Application: ${jobDetails.title} - ${formData.fullName}`);
    submitData.append("from_name", formData.fullName);
    
    // Build message content
    const messageContent = `
Job Application Details:
------------------------
Position: ${jobDetails.title}
Department: ${jobDetails.department}
Location: ${jobDetails.location}

Applicant Information:
----------------------
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Portfolio: ${formData.portfolio || 'N/A'}
Experience: ${formData.experience} years

Cover Letter:
${formData.coverLetter}
`;
    
    submitData.append("message", messageContent);
    
    // Add file attachment
    if (formData.cv) {
      submitData.append("attachment", formData.cv);
    }
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: submitData
    });
    
    const data = await response.json();
    console.log('API Response:', data);
    
    if (data.success) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowApplicationForm(false);
        setFormStep(0);
        setFormData({
          fullName: '', 
          email: '', 
          phone: '', 
          portfolio: '', 
          experience: '', 
          coverLetter: '',
          cv: null
        });
        setCvFileName('');
        setSubmitSuccess(false);
      }, 3000);
    } else {
      console.error('Submission failed:', data);
      alert(`Failed to submit: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert(`Error: ${error.message}. Please check your internet connection and try again.`);
  } finally {
    setIsSubmitting(false);
  }
};

const handleShare = async () => {
  const shareData = {
    title: jobDetails.title,
    text: `Check out this ${jobDetails.title} position at ${jobDetails.department}`,
    url: window.location.href
  };
  
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Error sharing:', err);
    }
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
};

  // Get job details from JSON
  const jobDetails = jobsData.jobs.find(job => job.id === jobId);

  // Get similar jobs (same department, different id)
  const similarJobs = jobsData.jobs
    .filter(job => job.department === jobDetails?.department && job.id !== jobId)
    .slice(0, 3);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Requirements animation
    ScrollTrigger.create({
      trigger: '.requirements-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(requirementsRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    // Benefits animation
    ScrollTrigger.create({
      trigger: '.benefits-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(benefitsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (!jobDetails) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Job not found</p>
      </div>
    );
  }

return (
    <div className="bg-black min-h-screen pt-10">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-8 overflow-hidden">
        {/* Three.js Background */}
        <div 
          ref={(mountDiv) => {
            if (!mountDiv || mountDiv.dataset.initialized) return;
            mountDiv.dataset.initialized = 'true';
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            mountDiv.appendChild(renderer.domElement);

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1000;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i++) {
              posArray[i] = (Math.random() - 0.5) * 15;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const material = new THREE.PointsMaterial({
              size: 0.02,
              color: 0x3b82f6,
              transparent: true,
              opacity: 0.6,
            });

            const particlesMesh = new THREE.Points(particlesGeometry, material);
            scene.add(particlesMesh);

            camera.position.z = 3;

            let animationFrameId;
            const animate = () => {
              animationFrameId = requestAnimationFrame(animate);
              particlesMesh.rotation.y += 0.0005;
              particlesMesh.rotation.x += 0.0002;
              renderer.render(scene, camera);
            };
            animate();

            const handleResize = () => {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);
          }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl">
          <button 
            onClick={() => navigate('/allcareers')}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-6 mx-auto transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to all positions
          </button>
          
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {jobDetails.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2 bg-neutral-900/50 px-4 py-2 rounded-full">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>{jobDetails.department}</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900/50 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{jobDetails.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-900/50 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{jobDetails.type}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section className="sticky top-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white/60 text-sm hidden md:block">
            Posted {jobDetails.posted}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 text-white/80 hover:bg-neutral-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-600 transition-colors"
            >
              APPLY NOW
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <div className="mb-16">
            <h2 className="text-white text-3xl font-bold mb-6">About the Role</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              {jobDetails.fullDescription}
            </p>
            {jobDetails.salary && (
              <div className="bg-blue-700/10 border border-blue-700/30 rounded-lg p-6">
                <div className="text-blue-400 font-bold mb-2">Salary Range</div>
                <div className="text-white text-2xl font-bold">{jobDetails.salary}</div>
              </div>
            )}
          </div>

          {/* Responsibilities */}
          {jobDetails.responsibilities && (
            <div className="mb-16">
              <h2 className="text-white text-3xl font-bold mb-6">Key Responsibilities</h2>
              <div className="space-y-4">
                {jobDetails.responsibilities.map((item, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 text-white/80 leading-relaxed"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {jobDetails.requirements && (
            <div className="mb-16 requirements-section">
              <h2 className="text-white text-3xl font-bold mb-6">Requirements</h2>
              <div className="grid gap-4">
                {jobDetails.requirements.map((item, index) => (
                  <div 
                    key={index}
                    ref={(el) => (requirementsRef.current[index] = el)}
                    className="flex gap-4 bg-neutral-900 p-4 rounded-lg border border-neutral-800 opacity-0"
                    style={{ transform: 'translateX(-30px)' }}
                  >
                    <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {jobDetails.benefits && (
            <div className="mb-16 benefits-section">
              <h2 className="text-white text-3xl font-bold mb-6">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {jobDetails.benefits.map((item, index) => (
                  <div 
                    key={index}
                    ref={(el) => (benefitsRef.current[index] = el)}
                    className="bg-gradient-to-br from-blue-700/10 to-purple-500/10 p-6 rounded-lg border border-blue-700/20 opacity-0"
                    style={{ transform: 'scale(0.8)' }}
                  >
                    <p className="text-white/90 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apply CTA */}
          <div className="rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-white text-3xl font-bold mb-4">
              Ready to Join Us?
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Take the next step in your career and become part of our creative team.
            </p>
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-600 transition-colors hover:scale-105 transform"
            >
              APPLY FOR THIS POSITION
            </button>
          </div>
        </div>
      </section>

      {/* Similar Positions */}
      {similarJobs.length > 0 && (
        <section className="px-8 py-16 bg-neutral-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-3xl font-bold mb-8">Similar Positions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => navigate(`/allcareers/${job.id}`)} 
                  className="bg-black p-6 rounded-lg border border-neutral-800 hover:border-blue-700 transition-all cursor-pointer group"
                >
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-blue-700/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {job.department}
                    </span>
                    <span className="bg-neutral-800 text-white/80 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                  <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-2xl max-w-2xl w-full p-8 relative border border-neutral-800 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setShowApplicationForm(false);
                setFormStep(0);
                setSubmitSuccess(false);
                setFormData({
                  fullName: '', 
                  email: '', 
                  phone: '', 
                  portfolio: '', 
                  experience: '', 
                  coverLetter: '',
                  cv: null
                });
                setCvFileName('');
              }}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
            
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Application Submitted!</h3>
                <p className="text-white/70">We'll review your application and get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Apply for {jobDetails.title}</h3>
                  <div className="flex gap-2 mt-4">
                    {formQuestions.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          index <= formStep ? 'bg-blue-700' : 'bg-neutral-800'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    Step {formStep + 1} of {formQuestions.length}
                  </p>
                </div>

                <form onSubmit={formStep === formQuestions.length - 1 ? handleSubmitApplication : (e) => { e.preventDefault(); handleNext(); }}>
                  <div className="mb-6">
                    <label className="text-white text-lg font-medium mb-4 block">
                      {formQuestions[formStep].label}
                    </label>
                    {formQuestions[formStep].type === 'textarea' ? (
                      <textarea
                        value={formData[formQuestions[formStep].field]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        required={formQuestions[formStep].required}
                        rows={6}
                        className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-700 transition-colors"
                        placeholder="Type your answer here..."
                      />
                    ) : formQuestions[formStep].type === 'file' ? (
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleInputChange(e.target.files[0])}
                          required={formQuestions[formStep].required}
                          className="hidden"
                          id="cv-upload"
                        />
                        <label
                          htmlFor="cv-upload"
                          className="w-full bg-black border-2 border-dashed border-neutral-700 rounded-lg px-4 py-8 text-white hover:border-blue-700 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3"
                        >
                          <div className="w-12 h-12 bg-blue-700/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          {cvFileName ? (
                            <div className="text-center">
                              <p className="text-blue-400 font-medium">{cvFileName}</p>
                              <p className="text-white/60 text-sm mt-1">Click to change file</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-white/80">Click to upload or drag and drop</p>
                              <p className="text-white/60 text-sm mt-1">PDF, DOC, or DOCX (Max 10MB)</p>
                            </div>
                          )}
                        </label>
                      </div>
                    ) : (
                      <input
                        type={formQuestions[formStep].type}
                        value={formData[formQuestions[formStep].field]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        required={formQuestions[formStep].required}
                        className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-700 transition-colors"
                        placeholder="Type your answer here..."
                      />
                    )}
                  </div>

                  <div className="flex gap-4">
                    {formStep > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-neutral-800 text-white px-6 py-3 rounded-full font-bold hover:bg-neutral-700 transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 bg-blue-700 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 ${
                        formStep === 0 ? 'w-full' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : formStep === formQuestions.length - 1 ? 'Submit Application' : 'Next'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 z-[101] flex items-center justify-center">
          <div className="bg-neutral-900 rounded-lg p-6 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="text-white">Submitting your application...</p>
          </div>
        </div>
      )}
    </div>
  );
}