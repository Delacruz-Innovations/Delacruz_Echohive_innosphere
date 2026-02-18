import React, { useState } from 'react';
import { Search, MapPin, ArrowLeft, Upload, FileText, X, Trash2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';
// Job Data
const jobsData = [
  {
    id: 15178,
    title: "Associate",
    company: "McKinsey",
    type: "Consulting",
    locations: ["Abu Dhabi", "Addis Ababa", "Almaty", "Amsterdam", "Astana", "Athens", "Atlanta"],
    description: "Do you want to work on complex and pressing challenges—the kind that bring together curious, ambitious, and determined leaders who strive to become better every day?",
    impact: "As an associate, you will join a client service team and take ownership of a workstream to solve some of the toughest challenges our clients face.",
    impactDetails: "And these aren't just any clients—they're some of the most influential organizations around, from Fortune 500 giants to innovative startups.",
    responsibilities: [
      "Working with clients and other McKinsey colleagues",
      "Conducting research, analyzing data, interviews, and brainstorming",
      "Collaborating directly with clients",
      "Solving complex problems and refining strategies",
      "Implementing transformations"
    ],
    growth: "Driving lasting impact and building long-term capabilities with our clients is not easy work. We seek people who thrive in a high performance/high-reward culture.",
    qualifications: [
      "Typically an advanced graduate degree (e.g., MBA, PhD, etc.) or equivalent work experience",
      "Requirements may vary by country or practice"
    ],
    industries: ["Agriculture & Farming"],
    capabilities: ["Operations Organizational Structure"],
    hrEmail: "info@delacuzinnovation@gmail.com"
  },
  {
    id: 10234,
    title: "Business Operations Manager, Dubai",
    company: "Defence Innovations",
    type: "Internal",
    locations: ["Abu Dhabi", "Addis Ababa", "Almaty", "Amsterdam", "Astana", "Athens"],
    description: "As a Business Operations Manager at Defence Innovations, we are a private dynamic operations team and take ownership of critical business processes.",
    impact: "Lead operational excellence initiatives across multiple departments.",
    impactDetails: "You will work with senior leadership to streamline processes, implement new systems, and drive organizational efficiency.",
    responsibilities: [
      "Managing business operations",
      "Process optimization",
      "Strategic planning",
      "Cross-functional collaboration"
    ],
    growth: "Opportunity to shape the operational framework of a growing organization.",
    qualifications: [
      "Bachelor's degree in Business Administration or related field",
      "5+ years of operations management experience",
      "Strong analytical and problem-solving skills"
    ],
    industries: ["Defense & Security"],
    capabilities: ["Operations Management", "Strategic Planning"],
    hrEmail: "careers@defenceinnovations.com"
  },
  {
    id: 10567,
    title: "Project Manager",
    company: "Global Consulting",
    type: "Consulting",
    locations: ["Abu Dhabi", "Addis Ababa", "Almaty"],
    description: "As a Project Manager, you will have ownership of end-to-end project delivery – leading cross-functional teams to plan, execute, and deliver transformative solutions.",
    impact: "Drive successful project delivery for Fortune 500 clients.",
    impactDetails: "Lead teams of 10-15 professionals across multiple workstreams.",
    responsibilities: [
      "Project planning and execution",
      "Stakeholder management",
      "Risk management",
      "Team leadership"
    ],
    growth: "Fast-track career progression to senior leadership roles.",
    qualifications: [
      "PMP or equivalent certification preferred",
      "7+ years of project management experience",
      "Experience with Agile and Waterfall methodologies"
    ],
    industries: ["Technology", "Finance"],
    capabilities: ["Project Management", "Agile Delivery"],
    hrEmail: "jobs@globalconsulting.com"
  }
];

// Main App Component
const JobPortalApp = () => {
  const [currentView, setCurrentView] = useState('listings'); // 'listings', 'details', 'application'
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setCurrentView('details');
  };

  const handleApplyNow = () => {
    setCurrentView('application');
  };

  const handleBackToJobs = () => {
    setCurrentView('listings');
    setSelectedJob(null);
  };

  const handleBackToDetails = () => {
    setCurrentView('details');
  };

  return (
    <div className="min-h-screen bg-black">
      {currentView === 'listings' && (
        <JobListingsPage 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onJobSelect={handleJobSelect}
          jobsData={jobsData}
        />
      )}
      {currentView === 'details' && selectedJob && (
        <JobDetailsPage 
          job={selectedJob}
          onBack={handleBackToJobs}
          onApply={handleApplyNow}
        />
      )}
      {currentView === 'application' && selectedJob && (
        <ApplicationPage 
          job={selectedJob}
          onBack={handleBackToDetails}
          onSuccess={handleBackToJobs}
        />
      )}
    </div>
  );
};

// Job Listings Component
const JobListingsPage = ({ searchTerm, setSearchTerm, onJobSelect, jobsData }) => {
  const [filters, setFilters] = useState({
    location: '',
    interests: '',
    industries: '',
    capabilities: ''
  });

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filters.location || job.locations.some(loc => 
      loc.toLowerCase().includes(filters.location.toLowerCase())
    );
    const matchesIndustry = !filters.industries || job.industries.some(ind => 
      ind.toLowerCase().includes(filters.industries.toLowerCase())
    );
    return matchesSearch && matchesLocation && matchesIndustry;
  });

  return (
    <div className="py-24 text-white">
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-black pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="bg-white text-black rounded px-4 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Interests"
              value={filters.interests}
              onChange={(e) => setFilters({...filters, interests: e.target.value})}
              className="bg-white text-black rounded px-4 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Industries"
              value={filters.industries}
              onChange={(e) => setFilters({...filters, industries: e.target.value})}
              className="bg-white text-black rounded px-4 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Capabilities"
              value={filters.capabilities}
              onChange={(e) => setFilters({...filters, capabilities: e.target.value})}
              className="bg-white text-black rounded px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-purple-500 mb-2">{filteredJobs.length}+</h1>
          <p className="text-gray-400 text-lg">Jobs Available</p>
        </div>

        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-purple-500 transition-all cursor-pointer"
              onClick={() => onJobSelect(job)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-purple-400 font-semibold uppercase">{job.type}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-purple-400 mb-3 hover:text-purple-300">
                {job.title}
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {job.description}
              </p>
              
              <div className="flex items-center text-sm text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span>{job.locations.slice(0, 3).join(' | ')}{job.locations.length > 3 ? '...' : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Job Details Component
const JobDetailsPage = ({ job, onBack, onApply }) => {
  return (
    <div className="py-24 text-white">
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-purple-200 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Jobs
          </button>
          <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
          <p className="text-purple-200">{job.company} • Job ID: {job.id}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center text-gray-400 mb-6">
          <MapPin size={18} className="mr-2" />
          <span>{job.locations.join(' | ')}</span>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={onApply}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Apply Now
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Save for Later
          </button>
        </div>

        <div className="mb-8">
          <p className="text-gray-100 leading-relaxed">{job.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">YOUR IMPACT</h2>
          <p className="text-purple-300 text-lg mb-4">{job.impact}</p>
          <p className="text-gray-100 leading-relaxed mb-4">{job.impactDetails}</p>
          
          {job.responsibilities && (
            <div className="mt-4">
              <p className="text-gray-100 mb-2">Your responsibilities include:</p>
              <ul className="text-gray-100 space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>• {resp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">YOUR GROWTH</h2>
          <p className="text-gray-100 leading-relaxed">{job.growth}</p>
        </div>

        <div className="mb-8 bg-purple-900 bg-opacity-30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">QUALIFICATIONS</h2>
          <div className="space-y-3">
            {job.qualifications.map((qual, idx) => (
              <p key={idx} className="text-gray-100">• {qual}</p>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Industries</h3>
            {job.industries.map((industry, idx) => (
              <p key={idx} className="text-gray-100">• {industry}</p>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Capabilities</h3>
            {job.capabilities.map((capability, idx) => (
              <p key={idx} className="text-gray-100">• {capability}</p>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-800">
          <button 
            onClick={onApply}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Application Component
const ApplicationPage = ({ job, onBack, onSuccess }) => {
    const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    portfolioUrl: '',
    coverLetter: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setUploadedFile(file);
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect({ target: { files: [file] } });
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

const handleSubmit = async () => {
  if (!formData.fullName || !formData.email || !formData.phone || !formData.coverLetter) {
    setStatus('error');
    return;
  }

  if (!uploadedFile) {
    setStatus('error-file');
    return;
  }

  setIsSubmitting(true);

  try {
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    
    reader.onload = async () => {
      try {
        const docRef = await addDoc(collection(db, 'jobApplications'), {
          jobTitle: job.title,
          jobCompany: job.company,
          jobId: job.id,
          jobType: job.type,
          hrEmail: job.hrEmail,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          portfolioUrl: formData.portfolioUrl || 'Not provided',
          coverLetter: formData.coverLetter,
          resumeName: uploadedFile.name,
          resumeSize: uploadedFile.size,
          resumeType: uploadedFile.type,
          resumeData: reader.result,
          submittedAt: serverTimestamp(),
          status: 'pending'
        });

        console.log('Application submitted with ID: ', docRef.id);
        setStatus('success');
        
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          portfolioUrl: '',
          coverLetter: ''
        });
        setUploadedFile(null);
        
      } catch (error) {
        console.error('Error adding document: ', error);
        setStatus('error-send');
      } finally {
        setIsSubmitting(false);
      }
    };

    reader.onerror = () => {
      console.error('Error reading file');
      setStatus('error-send');
      setIsSubmitting(false);
    };

  } catch (error) {
    console.error('Error: ', error);
    setStatus('error-send');
    setIsSubmitting(false);
  }
};

  return (
    <div className="py-30 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-white hover:text-purple-400 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Job Details
        </button>

        <div className="bg-purple-700/[0.8] rounded-lg p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              Apply for {job.title}
            </h1>
            <p className="text-gray-300">{job.company}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-50 mb-4">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-50 font-medium mb-2 text-sm">
                  Full name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-100 text-sm focus:outline-none focus:border-purple-700"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-50 font-medium mb-2 text-sm">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-50 font-medium mb-2 text-sm">
                  Email address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-gray-50 font-medium mb-2 text-sm">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700"
                  placeholder="Enter your portfolio URL"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-50 font-medium mb-2 text-sm">
              Cover Letter<span className="text-red-500">*</span>
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700 resize-none"
              placeholder="Tell us why you're a great fit for this role..."
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-50 font-medium mb-3 text-sm">
              Resume<span className="text-red-500">*</span>
            </label>

            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300 text-center ${
                  isDragging ? 'border-purple-700 bg-purple-900' : 'border-gray-300 bg-black'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-50 font-medium">Drag & drop or browse</p>
                  <p className="text-gray-500 text-xs">PDF, DOC, DOCX (Max 10MB)</p>
                  <label>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <span className="px-6 py-2.5 bg-purple-700 text-white rounded-md font-medium hover:bg-purple-800 transition-all cursor-pointer inline-block text-sm">
                      Browse Files
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="border border-purple-300 rounded-lg p-4 flex items-center justify-between bg-purple-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-700 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-50 font-medium text-sm">{uploadedFile.name}</p>
                    <p className="text-gray-400 text-xs">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="w-8 h-8 hover:bg-purple-800 rounded flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-md font-semibold transition-all text-sm ${
              isSubmitting 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-purple-700 hover:bg-purple-800 text-white'
            }`}
          >
            {isSubmitting ? 'Preparing Application...' : 'Submit Application'}
          </button>

          <p className="text-gray-400 text-xs mt-4 text-center">
            Your application will be sent to: {job.hrEmail}
          </p>
          {/* Status Modal */}
{status && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="max-w-sm w-full bg-black text-gray-50 rounded-2xl p-8 shadow-2xl transform transition-all duration-300 scale-100">
      <div className="text-center">
        {/* Success Icon */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Sparkle decoration */}
          <div className="absolute -top-1 -right-1 text-purple-700">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-50 mb-2">
          {status === 'success' ? 'Application Received !' : 'Error'}
        </h3>

        {/* Message */}
        <p className="text-gray-50 text-sm mb-6 leading-relaxed">
          {status === 'success' 
            ? "Thank you for applying for this role, we will review your application and a member will reach out to you." 
            : 'Please fill in all required fields.'}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
         <Link to="/jobs"
            onClick={() => setStatus('')}
            className="flex-1 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            View more jobs
          </Link>
          <button
            onClick={() => setStatus('')}
            className="flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default JobPortalApp;