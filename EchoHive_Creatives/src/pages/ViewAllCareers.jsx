import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Search, MapPin, Briefcase, ChevronRight, Check } from 'lucide-react';
import jobsData from '../data/jobsData.json';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ViewAllCareers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const heroRef = useRef(null);
  const filterRef = useRef(null);
  const jobCardsRef = useRef([]);
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
const [formStep, setFormStep] = useState(0);
const [cvFileName, setCvFileName] = useState('');
const [selectedJobForApplication, setSelectedJobForApplication] = useState(null);
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

  const departments = ['All', 'Creative', 'Strategy', 'Technology', 'Account Management', 'Production', 'Design'];
  const locations = ['All', 'Lagos', 'London', 'New York', 'Tokyo', 'Singapore', 'Remote'];

  const jobs = jobsData.jobs;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });
  const formQuestions = [
  { field: 'fullName', label: 'What is your full name?', type: 'text', required: true },
  { field: 'email', label: 'What is your email address?', type: 'email', required: true },
  { field: 'phone', label: 'What is your phone number?', type: 'tel', required: true },
  { field: 'cv', label: 'Upload your CV/Resume', type: 'file', required: true },
  { field: 'portfolio', label: 'Portfolio/LinkedIn URL (optional)', type: 'url', required: false },
  { field: 'experience', label: 'Years of relevant experience?', type: 'number', required: true },
  { field: 'coverLetter', label: 'Why are you interested in this role?', type: 'textarea', required: true }
];


const handleInputChange = (value) => {
  if (formQuestions[formStep].field === 'cv') {
    if (value && value.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
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
    submitData.append("subject", `General CV Submission - ${formData.fullName}`);
    submitData.append("from_name", formData.fullName);
    
    const messageContent = `
General CV Submission:
---------------------

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
    
    if (formData.cv) {
      submitData.append("attachment", formData.cv);
    }
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: submitData
    });
    
    const data = await response.json();
    
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
      alert(`Failed to submit: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}. Please check your internet connection and try again.`);
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Filter section animation
    gsap.fromTo(
      filterRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Job cards animation
    ScrollTrigger.create({
      trigger: '.jobs-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(jobCardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

const handleJobClick = (jobId) => {
  navigate(`/allcareers/${jobId}`);
};

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-8 overflow-hidden">
        
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
            const particlesCount = 1500;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i++) {
              posArray[i] = (Math.random() - 0.5) * 15;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const material = new THREE.PointsMaterial({
              size: 0.02,
              color: 0x3b82f6,
              transparent: true,
              opacity: 0.8,
            });

            const particlesMesh = new THREE.Points(particlesGeometry, material);
            scene.add(particlesMesh);

            camera.position.z = 3;

            let animationFrameId;
            const animate = () => {
              animationFrameId = requestAnimationFrame(animate);
              particlesMesh.rotation.y += 0.0005;
              particlesMesh.rotation.x += 0.0002;
              particlesMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
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

        <div ref={heroRef} className="relative z-10 text-center">
          <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tight mb-4">
            OPEN POSITIONS
          </h1>
          <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto">
            Join our team and help shape the future of creative excellence
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section ref={filterRef} className="px-8 py-12 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black text-white pl-12 pr-4 py-3 rounded-lg border border-neutral-800 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="appearance-none bg-black text-white pl-12 pr-10 py-3 rounded-lg border border-neutral-800 focus:border-blue-500 focus:outline-none transition-colors cursor-pointer min-w-[200px]"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none bg-black text-white pl-12 pr-10 py-3 rounded-lg border border-neutral-800 focus:border-blue-500 focus:outline-none transition-colors cursor-pointer min-w-[200px]"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 text-white/60 text-sm">
            Showing {filteredJobs.length} of {jobs.length} positions
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto jobs-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                ref={(el) => (jobCardsRef.current[index] = el)}
                onClick={() => handleJobClick(job.id)}
                className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-all duration-300 cursor-pointer group opacity-0 border border-neutral-800 hover:border-blue-500"
                style={{ transform: 'translateY(30px)' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {job.department}
                      </span>
                      <span className="bg-neutral-800 text-white/80 px-3 py-1 rounded-full text-xs font-semibold">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location}</span>
                  </div>
                  <span>{job.posted}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-xl">No positions found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('All');
                  setSelectedLocation('All');
                }}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            DON'T SEE YOUR ROLE?
          </h2>
          <p className="text-white/80 text-xl mb-8">
            We're always looking for exceptional talent. Send us your portfolio and let's start a conversation.
          </p>
     <button 
  onClick={() => setShowApplicationForm(true)}
  className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-colors"
>
  SUBMIT YOUR CV
</button>
        </div>
      </section>
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
          <h3 className="text-white text-2xl font-bold mb-2">CV Submitted!</h3>
          <p className="text-white/70">We'll review your CV and get back to you soon.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-white text-2xl font-bold mb-2">Submit Your CV</h3>
            <div className="flex gap-2 mt-4">
              {formQuestions.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index <= formStep ? 'bg-blue-500' : 'bg-neutral-800'
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
                  className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
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
                    className="w-full bg-black border-2 border-dashed border-neutral-700 rounded-lg px-4 py-8 text-white hover:border-blue-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
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
                  className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
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
                className={`flex-1 bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 ${
                  formStep === 0 ? 'w-full' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : formStep === formQuestions.length - 1 ? 'Submit CV' : 'Next'}
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
      <p className="text-white">Submitting your CV...</p>
    </div>
  </div>
)}
    </div>
  );
}