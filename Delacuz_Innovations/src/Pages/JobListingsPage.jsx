import React, { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobListingsPage = ({ jobsData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    interests: '',
    industries: '',
    capabilities: ''
  });

  // Extract unique values for dropdowns
 const uniqueLocations = ['Africa', 'Asia', 'Central & South America', 'Europe', 'North America', 'Oceania'];
  const uniqueIndustries = ['Aerospace & Defence', 'Agriculture', 'Automotive & Assembly', 'capital Projects & infastucture', 'Chemicals', 'Consumer Packaged Goods', 'Electrical Power and Natural Gas',
    'Financial Services', 'Healthcare System & Services', 'High Tech', 'Infrastructure', 'Life Science',
    'Media & Entertiainment ', 'Metal & Mining ', 'Oil & Gas', 'Paper & Forest Products', 'Private Capital', 'Public Sector', 'Retail', 'Semiconductos', 'Social Sector', 'Telecommunications', 'Travel, Transport & Logisics'
  ];
  const uniqueCapabilities = ['Firm Administration', 'Maketing & Sales', 'Oprations', 'Organizational Structure', 'Risk & Resilience', 'Strategy & coperate finance', 'Sustanability', 'Technology', 'Transformation', ];
  const uniqueTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filters.location || job.locations.some(loc => 
      loc.toLowerCase().includes(filters.location.toLowerCase())
    );
    const matchesInterests = !filters.interests || job.type.toLowerCase().includes(filters.interests.toLowerCase());
    const matchesIndustry = !filters.industries || job.industries.some(ind => 
      ind.toLowerCase().includes(filters.industries.toLowerCase())
    );
    const matchesCapabilities = !filters.capabilities || job.capabilities.some(cap => 
      cap.toLowerCase().includes(filters.capabilities.toLowerCase())
    );
    return matchesSearch && matchesLocation && matchesInterests && matchesIndustry && matchesCapabilities;
  });

  const handleJobSelect = (job) => {
    navigate(`/job/${job.id}`);
  };

  return (
    <div className="pt-24 bg-black text-white">
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
            <input
              type="text"
              placeholder="Search Jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-black pl-12 pr-4 py-3.5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:shadow-lg transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Location Dropdown */}
            <div className="relative group">
              <select
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full bg-white text-gray-700 rounded-lg px-4 py-3 pr-10 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-purple-50 hover:bg-gray-50 transition-all shadow-sm"
              >
                <option value="" className="text-gray-500"> All Locations</option>
                {uniqueLocations.map((location) => (
                  <option key={location} value={location} className="text-gray-700 py-2">
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 pointer-events-none group-hover:text-purple-700 transition-colors" size={18} />
            </div>

            {/* Interests Dropdown */}
            <div className="relative group">
              <select
                value={filters.interests}
                onChange={(e) => setFilters({...filters, interests: e.target.value})}
                className="w-full bg-white text-gray-700 rounded-lg px-4 py-3 pr-10 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-purple-50 hover:bg-gray-50 transition-all shadow-sm"
              >
                <option value="" className="text-gray-500"> All Interests</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type} className="text-gray-700 py-2">
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 pointer-events-none group-hover:text-purple-700 transition-colors" size={18} />
            </div>

            {/* Industries Dropdown */}
            <div className="relative group">
              <select
                value={filters.industries}
                onChange={(e) => setFilters({...filters, industries: e.target.value})}
                className="w-full bg-white text-gray-700 rounded-lg px-4 py-3 pr-10 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-purple-50 hover:bg-gray-50 transition-all shadow-sm"
              >
                <option value="" className="text-gray-500"> All Industries</option>
                {uniqueIndustries.map((industry) => (
                  <option key={industry} value={industry} className="text-gray-700 py-2">
                    {industry}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 pointer-events-none group-hover:text-purple-700 transition-colors" size={18} />
            </div>

            {/* Capabilities Dropdown */}
            <div className="relative group">
              <select
                value={filters.capabilities}
                onChange={(e) => setFilters({...filters, capabilities: e.target.value})}
                className="w-full bg-white text-gray-700 rounded-lg px-4 py-3 pr-10 text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-purple-50 hover:bg-gray-50 transition-all shadow-sm"
              >
                <option value="" className="text-gray-500"> All Capabilities</option>
                {uniqueCapabilities.map((capability) => (
                  <option key={capability} value={capability} className="text-gray-700 py-2">
                    {capability}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 pointer-events-none group-hover:text-purple-700 transition-colors" size={18} />
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.location || filters.interests || filters.industries || filters.capabilities) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.location && (
                <span className="inline-flex items-center bg-purple-500 bg-opacity-20 text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                  📍 {filters.location}
                  <button 
                    onClick={() => setFilters({...filters, location: ''})}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.interests && (
                <span className="inline-flex items-center bg-purple-500 bg-opacity-20 text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                  ✨ {filters.interests}
                  <button 
                    onClick={() => setFilters({...filters, interests: ''})}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.industries && (
                <span className="inline-flex items-center bg-purple-500 bg-opacity-20 text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                  🏢 {filters.industries}
                  <button 
                    onClick={() => setFilters({...filters, industries: ''})}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.capabilities && (
                <span className="inline-flex items-center bg-purple-500 bg-opacity-20 text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                  🎯 {filters.capabilities}
                  <button 
                    onClick={() => setFilters({...filters, capabilities: ''})}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              <button 
                onClick={() => setFilters({ location: '', interests: '', industries: '', capabilities: '' })}
                className="text-purple-200 text-xs font-medium hover:text-white transition-colors underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl bg-black mx-auto py-8 px-6">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-purple-500 mb-2">{filteredJobs.length}+</h1>
          <p className="text-gray-400 text-lg">Jobs Available</p>
        </div>

        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-purple-500 transition-all cursor-pointer"
              onClick={() => handleJobSelect(job)}
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

export default JobListingsPage;