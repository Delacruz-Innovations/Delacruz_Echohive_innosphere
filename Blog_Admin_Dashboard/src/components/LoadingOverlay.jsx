import React from 'react';

const LoadingOverlay = ({ message = 'PROCESSING REQUEST...' }) => {
    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#050b1a]/40 backdrop-blur-[2px] animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-sm shadow-2xl flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] font-outfit animate-pulse">
                        {message}
                    </p>
                    <p className="mt-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                        System Access in Progress
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
