import imageCompression from 'browser-image-compression';

/**
 * Image Compression Utility
 * 
 * Compresses and optimizes images before upload
 * Generates multiple sizes for responsive images
 */

/**
 * Compress a single image to a specific size
 * 
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options
 * @returns {Promise<File>} Compressed image file
 */
export const compressImage = async (file, options = {}) => {
    const defaultOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.8,
    };

    const compressionOptions = { ...defaultOptions, ...options };

    try {
        const compressedFile = await imageCompression(file, compressionOptions);
        return compressedFile;
    } catch (error) {
        console.error('Error compressing image:', error);
        throw error;
    }
};

/**
 * Generate multiple image sizes (thumbnail, medium, full)
 * 
 * @param {File} file - The original image file
 * @returns {Promise<Object>} Object with thumbnail, medium, and full size images
 */
export const generateImageSizes = async (file) => {
    try {
        // Thumbnail (300x200)
        const thumbnail = await compressImage(file, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 300,
            initialQuality: 0.7,
        });

        // Medium (800x600)
        const medium = await compressImage(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            initialQuality: 0.8,
        });

        // Full (1920x1080)
        const full = await compressImage(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            initialQuality: 0.85,
        });

        return {
            thumbnail,
            medium,
            full,
        };
    } catch (error) {
        console.error('Error generating image sizes:', error);
        throw error;
    }
};

/**
 * Convert File to Base64 string
 * 
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Validate image file
 * 
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateImage = (file, options = {}) => {
    const {
        maxSizeMB = 10,
        allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        minWidth = 100,
        minHeight = 100,
    } = options;

    // Check file type
    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
        };
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
        return {
            valid: false,
            error: `File size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size (${maxSizeMB}MB)`,
        };
    }

    return { valid: true, error: null };
};

/**
 * Get image dimensions
 * 
 * @param {File} file - The image file
 * @returns {Promise<Object>} { width, height }
 */
export const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve({
                width: img.width,
                height: img.height,
            });
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image'));
        };

        img.src = url;
    });
};

/**
 * Compress and convert image to Base64
 * 
 * @param {File} file - The image file
 * @param {Object} options - Compression options
 * @returns {Promise<string>} Base64 string of compressed image
 */
export const compressImageToBase64 = async (file, options = {}) => {
    try {
        const compressedFile = await compressImage(file, options);
        const base64 = await fileToBase64(compressedFile);
        return base64;
    } catch (error) {
        console.error('Error compressing image to base64:', error);
        throw error;
    }
};

/**
 * Generate all image sizes as Base64 strings
 * 
 * @param {File} file - The original image file
 * @returns {Promise<Object>} Object with thumbnail, medium, and full as Base64 strings
 */
export const generateImageSizesBase64 = async (file) => {
    try {
        const sizes = await generateImageSizes(file);

        const [thumbnailBase64, mediumBase64, fullBase64] = await Promise.all([
            fileToBase64(sizes.thumbnail),
            fileToBase64(sizes.medium),
            fileToBase64(sizes.full),
        ]);

        return {
            thumbnail: thumbnailBase64,
            medium: mediumBase64,
            full: fullBase64,
        };
    } catch (error) {
        console.error('Error generating image sizes as base64:', error);
        throw error;
    }
};

export default {
    compressImage,
    generateImageSizes,
    fileToBase64,
    validateImage,
    getImageDimensions,
    compressImageToBase64,
    generateImageSizesBase64,
};
