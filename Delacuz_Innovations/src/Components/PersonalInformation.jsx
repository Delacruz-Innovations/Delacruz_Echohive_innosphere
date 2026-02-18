import React, { useState } from 'react';
import { Upload, FileText, X, Trash2 } from 'lucide-react';

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    portfolioUrl: '',
    coverLetter: ''
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
      alert('Please upload a PDF or Word document (max file size: 10MB, pdf, .doc, .docx)');
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

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Application submitted successfully!');
  };

  return (
    <div className="bg-black min-h-screen py-24 my-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-purple-950 rounded-lg p-8 shadow-sm">
          
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-50 mb-2">Personal Information</h2>
            <p className="text-gray-200 text-sm mb-6">
              Include your information to help create your profile and account.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="fullName" className="block text-gray-50 font-medium mb-2 text-sm">
                  Full name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-100 text-sm focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-50 font-medium mb-2 text-sm">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-gray-50 font-medium mb-2 text-sm">
                  Email address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="portfolioUrl" className="block text-gray-50 font-medium mb-2 text-sm">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-all duration-200"
                  placeholder="Enter your portfolio URL"
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-50 mb-2">Additional Information</h2>
            <p className="text-gray-600 text-sm mb-6">
              In order to match you with the right opportunities, we need some additional information first.
            </p>

            <div>
              <label htmlFor="coverLetter" className="block text-gray-50 font-medium mb-2 text-sm">
                Cover Letter<span className="text-red-500">*</span>
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 bg-black border border-gray-300 rounded-md text-gray-50 text-sm focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-all duration-200 resize-none"
                placeholder="Sell yourself here..."
              />
            </div>
          </div>

          {/* Resume Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-50 mb-6">Resume</h2>

            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300 text-center ${
                  isDragging 
                    ? 'border-purple-700 bg-purple-50' 
                    : 'border-gray-300 bg-black hover:border-purple-400'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-50 font-medium mb-1">Add a file</p>
                    <p className="text-gray-500 text-xs">
                      Max file size: 10MB (.pdf, .doc, .docx)
                    </p>
                  </div>
                  <label>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <span className="px-6 py-2.5 bg-purple-700 text-white rounded-md font-medium hover:bg-purple-800 transition-all duration-200 cursor-pointer inline-block text-sm">
                      Browse Files
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-200 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-gray-50 font-medium text-sm">Portfolio CV</p>
                    <p className="text-gray-500 text-xs">.AMI</p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="w-8 h-8 hover:bg-purple-100 rounded flex items-center justify-center text-red-500 hover:text-red-600 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            className="w-full py-3.5 bg-purple-700 text-white rounded-md font-semibold hover:bg-purple-800 transition-all duration-200 text-sm"
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;