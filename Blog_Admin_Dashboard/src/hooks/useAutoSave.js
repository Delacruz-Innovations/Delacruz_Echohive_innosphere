import { useEffect, useRef, useCallback, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * useAutoSave Hook
 * 
 * Automatically saves form data to localStorage and optionally to a remote service
 * 
 * @param {Object} options
 * @param {any} options.data - The data to auto-save
 * @param {string} options.key - Unique key for localStorage
 * @param {Function} options.onSave - Optional async function to save to remote (e.g., Firebase)
 * @param {number} options.localInterval - Interval for localStorage save in ms (default: 30000 = 30s)
 * @param {number} options.remoteInterval - Interval for remote save in ms (default: 120000 = 2min)
 * @param {boolean} options.enabled - Whether auto-save is enabled (default: true)
 * @returns {Object} { lastSaved, isSaving, forceSave, clearDraft }
 */
export const useAutoSave = ({
    data,
    key,
    onSave,
    localInterval = 30000,  // 30 seconds
    remoteInterval = 120000, // 2 minutes
    enabled = true
}) => {
    const [lastSaved, setLastSaved] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [, setLocalData, removeLocalData] = useLocalStorage(key, null);

    const localTimerRef = useRef(null);
    const remoteTimerRef = useRef(null);
    const lastDataRef = useRef(null);

    // Check if data has changed
    const hasDataChanged = useCallback(() => {
        const currentData = JSON.stringify(data);
        const previousData = lastDataRef.current;
        return currentData !== previousData;
    }, [data]);

    // Save to localStorage
    const saveToLocal = useCallback(() => {
        if (!enabled || !hasDataChanged()) return;

        try {
            setLocalData(data);
            lastDataRef.current = JSON.stringify(data);
            setLastSaved(new Date());
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [data, enabled, hasDataChanged, setLocalData]);

    // Save to remote (Firebase)
    const saveToRemote = useCallback(async () => {
        if (!enabled || !onSave || !hasDataChanged()) return;

        try {
            setIsSaving(true);
            await onSave(data);
            lastDataRef.current = JSON.stringify(data);
            setLastSaved(new Date());
        } catch (error) {
            console.error('Error saving to remote:', error);
        } finally {
            setIsSaving(false);
        }
    }, [data, enabled, onSave, hasDataChanged]);

    // Force save (both local and remote)
    const forceSave = useCallback(async () => {
        saveToLocal();
        if (onSave) {
            await saveToRemote();
        }
    }, [saveToLocal, saveToRemote, onSave]);

    // Clear draft from localStorage
    const clearDraft = useCallback(() => {
        removeLocalData();
        lastDataRef.current = null;
        setLastSaved(null);
    }, [removeLocalData]);

    // Set up auto-save intervals
    useEffect(() => {
        if (!enabled) return;

        // Clear existing timers
        if (localTimerRef.current) clearInterval(localTimerRef.current);
        if (remoteTimerRef.current) clearInterval(remoteTimerRef.current);

        // Set up localStorage auto-save
        localTimerRef.current = setInterval(() => {
            saveToLocal();
        }, localInterval);

        // Set up remote auto-save (if onSave is provided)
        if (onSave) {
            remoteTimerRef.current = setInterval(() => {
                saveToRemote();
            }, remoteInterval);
        }

        // Cleanup on unmount
        return () => {
            if (localTimerRef.current) clearInterval(localTimerRef.current);
            if (remoteTimerRef.current) clearInterval(remoteTimerRef.current);
        };
    }, [enabled, localInterval, remoteInterval, saveToLocal, saveToRemote, onSave]);

    // Save before page unload
    useEffect(() => {
        const handleBeforeUnload = () => {
            saveToLocal();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [saveToLocal]);

    return {
        lastSaved,
        isSaving,
        forceSave,
        clearDraft
    };
};

export default useAutoSave;
