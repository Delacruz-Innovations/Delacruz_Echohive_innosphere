import React from 'react';
import { AlertCircle, Check, X } from 'lucide-react';

/**
 * DraftRecoveryPrompt Component
 * 
 * Displays a prompt to recover unsaved draft from localStorage
 * 
 * @param {Object} props
 * @param {Function} props.onRecover - Callback when user chooses to recover
 * @param {Function} props.onDiscard - Callback when user chooses to discard
 * @param {Date} props.draftDate - Date when draft was saved
 * @param {string} props.orgId - Organization ID for theming
 */
const DraftRecoveryPrompt = ({ onRecover, onDiscard, draftDate, orgId = 'innosphere' }) => {
    const getThemeColor = () => {
        switch (orgId) {
            case 'delacruz':
                return {
                    bg: 'bg-purple-50',
                    border: 'border-purple-200',
                    text: 'text-purple-600',
                    button: 'bg-purple-600 hover:bg-purple-700'
                };
            case 'echohive':
                return {
                    bg: 'bg-emerald-50',
                    border: 'border-emerald-200',
                    text: 'text-emerald-600',
                    button: 'bg-emerald-600 hover:bg-emerald-700'
                };
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-600',
                    button: 'bg-blue-600 hover:bg-blue-700'
                };
        }
    };

    const theme = getThemeColor();

    return (
        <div className={`${theme.bg} border ${theme.border} rounded-sm p-4 mb-6`}>
            <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${theme.text}`}>
                    <AlertCircle className="h-5 w-5" />
                </div>

                <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-1">
                        Unsaved Draft Found
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                        We found an unsaved draft from {draftDate ? new Date(draftDate).toLocaleString() : 'earlier'}.
                        Would you like to recover it?
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={onRecover}
                            className={`inline-flex items-center px-3 py-1.5 ${theme.button} text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors`}
                        >
                            <Check className="h-3 w-3 mr-1" />
                            Recover Draft
                        </button>

                        <button
                            onClick={onDiscard}
                            className="inline-flex items-center px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraftRecoveryPrompt;
