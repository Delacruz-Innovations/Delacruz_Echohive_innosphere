


import React from 'react'

const EchoHiveLogo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        {/* Blue Circle with Text */}
        <div className="relative z-10 w-32 h-32 bg-blue-600 rounded-full flex flex-col items-center justify-center">
          <div className="text-white font-bold text-2xl leading-tight text-center">
            <div className="text-xl">èchó</div>
            <div className="text-yellow-300 text-3xl">hive</div>
          </div>
        </div>

        {/* Yellow Semi-Circles */}
        <div className="absolute top-0 left-24 z-0 flex flex-row">
          {/* First Semi-Circle */}
          <div className="w-16 h-32 bg-yellow-300 rounded-r-full"></div>
          {/* Second Semi-Circle */}
          <div className="w-16 h-32 bg-yellow-300 rounded-r-full"></div>
        </div>

        {/* Creative Text */}
        <div className="mt-2 text-center">
          <span className="text-blue-600 font-bold text-5xl tracking-tight">
            Creative
          </span>
        </div>
      </div>
    </div>
  )
}

export default EchoHiveLogo