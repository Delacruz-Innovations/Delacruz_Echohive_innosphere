export const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')    // Remove all non-word chars
        .replace(/--+/g, '-');      // Replace multiple - with single -
};

export const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
};

export const calculateWordCount = (text) => {
    return text.trim().split(/\s+/).length;
};

/**
 * Safely formats any Firestore Timestamp, JS Date, ISO string, or object into a date string
 */
export const formatFirebaseDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
        let date;
        if (typeof timestamp?.toDate === 'function') {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else if (timestamp?.seconds !== undefined) {
            date = new Date(timestamp.seconds * 1000);
        } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
            date = new Date(timestamp);
        } else {
            return 'N/A';
        }

        if (isNaN(date.getTime())) {
            return typeof timestamp === 'string' ? timestamp : 'N/A';
        }

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return typeof timestamp === 'string' ? timestamp : 'N/A';
    }
};

/**
 * Safely formats any Firestore Timestamp, JS Date, ISO string, or object into a time string
 */
export const formatFirebaseTime = (timestamp) => {
    if (!timestamp) return '';
    try {
        let date;
        if (typeof timestamp?.toDate === 'function') {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else if (timestamp?.seconds !== undefined) {
            date = new Date(timestamp.seconds * 1000);
        } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
            date = new Date(timestamp);
        } else {
            return '';
        }

        if (isNaN(date.getTime())) return '';

        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return '';
    }
};
