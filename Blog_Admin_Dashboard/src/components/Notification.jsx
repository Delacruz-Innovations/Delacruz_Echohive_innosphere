import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Notification = ({ message, type = 'info', onClose, duration }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration !== Infinity) {
            const timer = setTimeout(() => {
                setIsExiting(true);
            }, duration - 300); // Start exit animation slightly before duration ends
            return () => clearTimeout(timer);
        }
    }, [duration]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    const styles = {
        success: 'border-emerald-500/20 bg-emerald-50/90 text-emerald-900',
        error: 'border-red-500/20 bg-red-50/90 text-red-900',
        warning: 'border-amber-500/20 bg-amber-50/90 text-amber-900',
        info: 'border-blue-500/20 bg-blue-50/90 text-blue-900'
    };

    return (
        <div
            className={`
                flex items-start gap-4 p-4 min-w-[320px] max-w-md rounded-lg border shadow-xl backdrop-blur-md pointer-events-auto
                transition-all duration-300 transform
                ${isExiting ? 'opacity-0 translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'}
                ${styles[type]}
                animate-in slide-in-from-right-10
            `}
            role="alert"
        >
            <div className="flex-shrink-0 mt-0.5">
                {icons[type]}
            </div>

            <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-tight leading-relaxed">
                    {message}
                </p>
            </div>

            <button
                onClick={() => {
                    setIsExiting(true);
                    setTimeout(onClose, 300);
                }}
                className="flex-shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close notification"
            >
                <X className="w-4 h-4 opacity-50" />
            </button>

            {/* Progress Bar (optional visually) */}
            {duration !== Infinity && (
                <div className="absolute bottom-0 left-0 h-1 bg-black/10 transition-all duration-[duration] scale-x-0 origin-left"
                    style={{ animation: `progress ${duration}ms linear forwards` }} />
            )}
        </div>
    );
};

export default Notification;
