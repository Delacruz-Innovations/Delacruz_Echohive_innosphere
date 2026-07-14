import React from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../utils/SEO'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <SEO
        title="Page Not Found | Delacruz Innovations"
        description="The page you are looking for could not be found."
        noindex
      />
      <div className="text-center">
        {/* 404 Text */}
        <div className="relative">
          <h1 className="text-[96px] sm:text-[160px] md:text-[300px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 leading-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-400 to-purple-600"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 -mt-8">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
        >
          Go Home Now
        </button>

        {/* Animated Dots */}
        <div className="mt-16 flex justify-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
