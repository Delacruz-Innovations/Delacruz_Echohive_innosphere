import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

/**
 * NetworkError Component
 * 
 * Displays a user-friendly error message when data fetching fails due to network issues.
 * Includes a retry button to allow users to attempt to reload the data.
 * 
 * @param {Object} props
 * @param {Function} props.onRetry - Callback function to retry the failed operation
 * @param {string} props.message - Optional custom error message
 * @param {string} props.orgId - Organization ID for theme styling (innosphere, delacruz, echohive)
 */
const NetworkError = ({
    onRetry,
    message = "Unable to load data. Please check your internet connection and try again.",
    orgId = 'innosphere'
}) => {
    const [isRetrying, setIsRetrying] = React.useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            await onRetry();
        } finally {
            // Keep the loading state for at least 500ms for better UX
            setTimeout(() => setIsRetrying(false), 500);
        }
    };

    // Define theme styles based on orgId - using complete class names for Tailwind
    const getThemeClasses = () => {
        switch (orgId) {
            case 'delacruz':
                return {
                    border: 'border-purple-200',
                    iconBg: 'bg-purple-50',
                    iconText: 'text-purple-600',
                    button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-600'
                };
            case 'echohive':
                return {
                    border: 'border-emerald-200',
                    iconBg: 'bg-emerald-50',
                    iconText: 'text-emerald-600',
                    button: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600'
                };
            default: // innosphere
                return {
                    border: 'border-blue-200',
                    iconBg: 'bg-blue-50',
                    iconText: 'text-blue-600',
                    button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600'
                };
        }
    };

    const theme = getThemeClasses();

    return (
        <div className="flex items-center justify-center min-h-[400px] px-4">
            <div className="max-w-md w-full">
                {/* Error Card */}
                <div className={`bg-white border-2 ${theme.border} rounded-sm shadow-lg p-8`}>
                    {/* Icon */}
                    <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-sm ${theme.iconBg} mb-6`}>
                        <WifiOff className={`h-8 w-8 ${theme.iconText}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-center text-lg font-bold text-gray-900 uppercase tracking-tight mb-3">
                        Connection Issue
                    </h3>

                    {/* Message */}
                    <p className="text-center text-sm text-gray-600 mb-8 leading-relaxed">
                        {message}
                    </p>

                    {/* Retry Button */}
                    <button
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className={`
              w-full inline-flex items-center justify-center px-6 py-3 
              border border-transparent rounded-sm text-sm font-bold 
              text-white ${theme.button}
              focus:outline-none focus:ring-2 focus:ring-offset-2
              transition-all duration-200 uppercase tracking-widest
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isRetrying ? 'cursor-wait' : ''}
            `}
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
                        {isRetrying ? 'Retrying...' : 'Retry Connection'}
                    </button>

                    {/* Additional Help Text */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-center text-xs text-gray-400 uppercase tracking-wider font-bold">
                            Troubleshooting Tips
                        </p>
                        <ul className="mt-3 space-y-2 text-xs text-gray-500">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Check your internet connection</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Verify that Firebase services are accessible</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Try refreshing the page if the issue persists</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Technical Details (Optional - can be toggled) */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="text-xs text-gray-400 hover:text-gray-600 uppercase tracking-wider font-bold transition-colors"
                    >
                        Force Page Reload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NetworkError;
