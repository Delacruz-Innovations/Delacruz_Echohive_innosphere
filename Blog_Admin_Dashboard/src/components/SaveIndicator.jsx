import React from 'react';
import { Check, RefreshCw, Clock, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

/**
 * SaveIndicator Component
 * 
 * Displays the current save status and last saved timestamp
 * 
 * @param {Object} props
 * @param {Date} props.lastSaved - Last saved timestamp
 * @param {boolean} props.isSaving - Whether currently saving
 * @param {string} props.error - Error message if save failed
 * @param {string} props.orgId - Organization ID for theming
 */
const SaveIndicator = ({ lastSaved, isSaving, error, orgId = 'innosphere' }) => {
    const getThemeColor = () => {
        switch (orgId) {
            case 'delacruz':
                return 'text-purple-600';
            case 'echohive':
                return 'text-emerald-600';
            default:
                return 'text-blue-600';
        }
    };

    const themeColor = getThemeColor();

    // Determine status
    const getStatus = () => {
        if (error) {
            return {
                icon: <AlertCircle className="h-3 w-3" />,
                text: 'Save failed',
                color: 'text-red-500'
            };
        }

        if (isSaving) {
            return {
                icon: <RefreshCw className="h-3 w-3 animate-spin" />,
                text: 'Saving...',
                color: 'text-gray-500'
            };
        }

        if (lastSaved) {
            return {
                icon: <Check className="h-3 w-3" />,
                text: `Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}`,
                color: themeColor
            };
        }

        return {
            icon: <Clock className="h-3 w-3" />,
            text: 'Not saved',
            color: 'text-gray-400'
        };
    };

    const status = getStatus();

    return (
        <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 ${status.color}`}>
                {status.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {status.text}
                </span>
            </div>
        </div>
    );
};

export default SaveIndicator;
