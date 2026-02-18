import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Trash2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const ApplicationPage = ({ jobsData }) => {
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

  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = jobsData.find(j => j.id === parseInt(jobId));

  if (!job) {
    return <div className="text-white text-center py-24">Job not found</div>;
  }

  const handleBackToDetails = () => {
    navigate(`/job/${job.id}`);
  };
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
// const handleSubmit = async () => {
//     if (!formData.fullName || !formData.email || !formData.phone) {
//       setStatus('error');
//       return;
//     }
  
//     if (!uploadedFile) {
//       setStatus('error-file');
//       return;
//     }
  
//     setIsSubmitting(true);
  
//     try {
//       // Send email via Formspree
//       const formspreeResponse = await fetch(
//         'https://formspree.io/f/mzzklopj', // Replace YOUR_FORM_ID
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             jobTitle: job.title,
//             jobCompany: job.company,
//             hrEmail: job.hrEmail,
//             fullName: formData.fullName,
//             email: formData.email,
//             phone: formData.phone,
//             portfolioUrl: formData.portfolioUrl || 'Not provided',
//             coverLetter: formData.coverLetter,
//             resumeName: uploadedFile.name,
//             _subject: `New Job Application: ${job.title} - ${formData.fullName}`
//           })
//         }
//       );

//       if (!formspreeResponse.ok) {
//         throw new Error('Failed to send application');
//       }

//       console.log('✅ Application email sent!');

//       // Save to Firebase
//       const reader = new FileReader();
//       reader.readAsDataURL(uploadedFile);
      
//       reader.onload = async () => {
//         try {
//           const docRef = await addDoc(collection(db, 'jobApplications'), {
//             jobTitle: job.title,
//             jobCompany: job.company,
//             jobId: job.id,
//             jobType: job.type,
//             hrEmail: job.hrEmail,
//             fullName: formData.fullName,
//             email: formData.email,
//             phone: formData.phone,
//             portfolioUrl: formData.portfolioUrl || 'Not provided',
//             coverLetter: formData.coverLetter,
//             resumeName: uploadedFile.name,
//             resumeSize: uploadedFile.size,
//             resumeType: uploadedFile.type,
//             resumeData: reader.result,
//             submittedAt: serverTimestamp(),
//             status: 'pending'
//           });
  
//           console.log('Application submitted with ID: ', docRef.id);
//           setStatus('success');
          
//           setFormData({
//             fullName: '',
//             phone: '',
//             email: '',
//             portfolioUrl: '',
//             coverLetter: ''
//           });
//           setUploadedFile(null);
          
//         } catch (error) {
//           console.error('Error adding document: ', error);
//           setStatus('error-send');
//         } finally {
//           setIsSubmitting(false);
//         }
//       };
  
//       reader.onerror = () => {
//         console.error('Error reading file');
//         setStatus('error-send');
//         setIsSubmitting(false);
//       };
  
//     } catch (error) {
//       console.error('Error: ', error);
//       setStatus('error-send');
//       setIsSubmitting(false);
//     }
//   };

  // ... rest of the ApplicationPage component (lines 279-558)
  // Replace onBack with handleBackToDetails
   const handleSubmit = async () => {
  if (!formData.fullName || !formData.email || !formData.phone) {
    setStatus('error');
    return;
  }

  if (!uploadedFile) {
    setStatus('error-file');
    return;
  }

  setIsSubmitting(true);

  try {
    // Web3Forms Configuration
    const accessKey = 'fec3b572-a8c2-46af-80cc-a1529c9f8741'; // Get this from https://web3forms.com

    const formDataToSend = new FormData();
    formDataToSend.append('access_key', accessKey);
    formDataToSend.append('subject', `New Job Application: ${job.title} - ${formData.fullName}`);
    formDataToSend.append('jobTitle', job.title);
    formDataToSend.append('jobCompany', job.company);
    formDataToSend.append('hrEmail', job.hrEmail);
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('portfolioUrl', formData.portfolioUrl || 'Not provided');
    formDataToSend.append('coverLetter', formData.coverLetter);
    formDataToSend.append('resumeName', uploadedFile.name);

    // Send email via Web3Forms
    const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataToSend
    });

    const web3formsData = await web3formsResponse.json();

    if (!web3formsData.success) {
      throw new Error('Failed to send application');
    }

    console.log('✅ Application email sent!');

    // Save to Firebase (only resume name, not the file)
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

  } catch (error) {
    console.error('Error: ', error);
    setStatus('error-send');
    setIsSubmitting(false);
  }
};
  
  return (
      <div className="py-30 px-4">
        <div className="max-w-7xl bg-black mx-auto">
          <button
            onClick={handleBackToDetails}
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
  <PhoneInput
    international
    countryCallingCodeEditable={false}
    defaultCountry="US"
    value={formData.phone}
    onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
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
                Cover Letter
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
            {/* <button
              onClick={() => setStatus('')}
              className="flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Close
            </button> */}
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

export default ApplicationPage;