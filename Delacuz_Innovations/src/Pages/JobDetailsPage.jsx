import React, { useState } from 'react';
import { MapPin, ArrowLeft, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetailsPage = ({ jobsData }) => {
  const [showShareNotification, setShowShareNotification] = useState(false);
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = jobsData.find(j => j.id === parseInt(jobId));

  if (!job) {
    return <div className="text-white text-center py-24">Job not found</div>;
  }

  const handleApplyNow = () => {
    navigate(`/job/${job.id}/apply`);
  };

  const handleBackToJobs = () => {
    navigate('/jobs');
  };
const handleShare = async () => {
  const shareData = {
    title: `${job.title} at ${job.company}`,
    text: `Check out this job opportunity: ${job.title}`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 3000);
    }
  } catch (err) {
    console.log('Error sharing:', err);
  }
};
  // ... rest of the JobDetailsPage component JSX (lines 189-274)
  // Replace onBack with handleBackToJobs
  // Replace onApply with handleApplyNow
   return (
      <div className="py-24 bg-black text-white">
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBackToJobs}
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
    onClick={handleApplyNow}
    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
  >
    Apply Now
  </button>
  <button 
    onClick={handleShare}
    className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
  >
    <Share2 size={18} />
    Share
  </button>
  {/* <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
    Save for Later
  </button> */}
  {/* Share Notification */}
{showShareNotification && (
  <div className="fixed bottom-8 right-8 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
    <Share2 size={18} />
    <span>Link copied to clipboard!</span>
  </div>
)}
</div>
  
          <div className="mb-8">
            <p className="text-gray-100 leading-relaxed">{job.description}</p>
          </div>
  
             <div className="mb-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">YOUR IMPACT</h2>
            <p className="text-purple-300 text-lg mb-4">{job.impact}</p>
            {job.impactDetails && (
              <p className="text-gray-100 leading-relaxed mb-4">{job.impactDetails}</p>
            )}
            
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-100 mb-2 font-semibold">Your responsibilities include:</p>
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
  
          {/* <div className="grid md:grid-cols-2 gap-8 mb-8">
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
          </div> */}
  
          <div className="flex gap-4 pt-6 border-t border-gray-800">
            <button 
              onClick={handleApplyNow}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    );
};

export default JobDetailsPage;