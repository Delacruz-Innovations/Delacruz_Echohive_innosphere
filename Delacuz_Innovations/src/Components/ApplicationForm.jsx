import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
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
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setUploadedFile(file);
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleContinue = () => {
    if (!uploadedFile) {
      alert('Please upload your resume');
      return;
    }
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    // Continue to next step - no submission yet
    alert('Moving to next step...');
  };

  return (
    <div className="bg-black min-h-screen py-24 my-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 bg-purple-950 rounded-lg p-8 shadow-sm">
            {/* Header */}
            <div className="mb-8">
              <p className="text-gray-50 text-sm font-medium mb-3">New Applicant</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                Start your application by providing us with your resume
              </h1>
              <p className="text-gray-200 text-sm leading-relaxed">
                We'll use this data to pre-populate your application, and you'll create an account in the process. If you wish to review how we handle and protect your personal data, please review our Recruitment Privacy Notice. By applying you acknowledge that you have read and agree to the terms of the Recruitment Privacy Notice. The option to upload files using Google Drive will only be available if Functional Cookies are enabled. Cookie settings can be accessed via the footer.
              </p>
            </div>

            {/* File Upload Section */}
            <div className="mb-6">
              <label className="block text-gray-50 font-medium mb-3 text-sm">
                Upload Files <span className="text-red-500">*</span>
              </label>
              
              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
                    isDragging 
                      ? 'border-purple-600 bg-black' 
                      : 'border-gray-300 bg-black hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <label className="flex-shrink-0">
                      <input
                        type="file"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                      <span className="px-5 py-2.5 bg-black border border-gray-300 text-gray-50 rounded-md font-medium hover:bg-gray-50 
                      hover:text-black
                      transition-all duration-200 cursor-pointer inline-flex items-center gap-2 text-sm">
                        <Upload className="w-4 h-4" />
                        Upload Files
                      </span>
                    </label>
                    <button className="px-5 py-2.5 bg-purple-700 text-white rounded-md font-medium hover:bg-purple-800 transition-all duration-200 text-sm">
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium text-sm">{uploadedFile.name}</p>
                      <p className="text-gray-500 text-xs">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="w-8 h-8 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Info Text */}
            <div className="bg-black rounded-lg p-4 mb-6">
              <p className="text-gray-200 text-xs leading-relaxed">
                This application will take approximately 15 minutes to complete if you have all the data required. We do not require a cover letter or recommendations; however, for some roles and for recent graduates and students we may require these. To review FAQs about our online application,{' '}
                <a href="#" className="text-purple-700 hover:text-purple-800 underline font-medium">
                  click here
                </a>
                . If you have any issues with the application, please contact our support team.
              </p>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-black rounded-lg p-6 shadow-sm sticky top-8">
              <h3 className="text-gray-50 font-semibold mb-2 text-lg">Have you subscribed?</h3>
              <p className="text-gray-100 text-sm mb-6 leading-relaxed">
                Discuss how we can support your business transformation objectives.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 font-medium mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-300 text-sm focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-all duration-200"
                    placeholder=""
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-300 text-sm focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-all duration-200"
                    placeholder=""
                  />
                </div>
              </div>

              <button className="w-full py-3 bg-purple-700 text-white rounded-md font-semibold hover:bg-purple-800 transition-all duration-200 text-sm">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;