import { z } from 'zod';

/**
 * Blog Form Validation Schema
 * 
 * Comprehensive validation for blog posts using Zod
 */

// Section schema
const sectionSchema = z.object({
    order: z.number().min(0),
    heading: z.string().min(1, 'Section heading is required').max(200, 'Heading is too long'),
    hasSubtitle: z.boolean(),
    subtitle: z.string().max(300, 'Subtitle is too long').optional(),
    hasSubSubtitle: z.boolean(),
    subSubtitle: z.string().max(300, 'Sub-subtitle is too long').optional(),
    body: z.string().min(1, 'Section body is required'),
    hasInsight: z.boolean(),
    insight: z.string().optional(),
    sources: z.array(z.string()).optional(),
    hasImage: z.boolean(),
    image: z.string().optional(),
    imageInputType: z.enum(['upload', 'url']).optional(),
});

// FAQ schema
const faqSchema = z.object({
    question: z.string().min(1, 'Question is required').max(500, 'Question is too long'),
    answer: z.string().min(1, 'Answer is required'),
});

// Draft validation (minimal requirements)
export const draftSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
    slug: z.string().min(1, 'Slug is required').max(200, 'Slug is too long'),
    excerpt: z.string().max(500, 'Excerpt is too long').optional(),
    category: z.string().min(1, 'Category is required'),
    featured: z.boolean(),
    status: z.enum(['draft', 'published']),
    date: z.string().optional(),

    media: z.object({
        coverImage: z.string().optional(),
        coverImageAlt: z.string().max(200, 'Alt text is too long').optional(),
    }),

    reading: z.object({
        readTime: z.string(),
        wordCount: z.number(),
    }),

    author: z.object({
        name: z.string().max(100, 'Author name is too long').optional(),
        bio: z.string().max(500, 'Author bio is too long').optional(),
    }),

    content: z.object({
        intro: z.string().optional(),
        sections: z.array(sectionSchema).min(1, 'At least one section is required'),
        hasAuthorNote: z.boolean(),
        authorNote: z.string().optional(),
        hasFAQs: z.boolean(),
        faqs: z.array(faqSchema).optional(),
    }),

    seo: z.object({
        metaTitle: z.string().max(60, 'Meta title should be 50-60 characters').optional(),
        metaDescription: z.string().max(160, 'Meta description should be 150-160 characters').optional(),
        ogImage: z.string().optional(),
    }),
});

// Published validation (strict requirements)
export const publishedSchema = draftSchema.extend({
    excerpt: z.string().min(1, 'Excerpt is required for publishing').max(500, 'Excerpt is too long'),
    media: z.object({
        coverImage: z.string().min(1, 'Cover image is required for publishing'),
        coverImageAlt: z.string().min(1, 'Image alt text is required for accessibility').max(200, 'Alt text is too long'),
    }),
    content: z.object({
        intro: z.string().min(1, 'Introduction is required for publishing'),
        sections: z.array(sectionSchema).min(1, 'At least one section is required'),
        hasAuthorNote: z.boolean(),
        authorNote: z.string().optional(),
        hasFAQs: z.boolean(),
        faqs: z.array(faqSchema).optional(),
    }),
    seo: z.object({
        metaTitle: z.string().min(1, 'Meta title is required for SEO').max(60, 'Meta title should be 50-60 characters'),
        metaDescription: z.string().min(1, 'Meta description is required for SEO').max(160, 'Meta description should be 150-160 characters'),
        ogImage: z.string().optional(),
    }),
});

/**
 * Validate blog data
 * 
 * @param {Object} data - Blog data to validate
 * @param {boolean} isPublishing - Whether validating for publish (strict) or draft (lenient)
 * @returns {Object} { success: boolean, errors: Object, data: Object }
 */
export const validateBlog = (data, isPublishing = false) => {
    const schema = isPublishing ? publishedSchema : draftSchema;

    try {
        const validatedData = schema.parse(data);
        return {
            success: true,
            errors: {},
            data: validatedData,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Convert Zod errors to a more friendly format
            const errors = {};
            error.errors.forEach((err) => {
                const path = err.path.join('.');
                errors[path] = err.message;
            });

            return {
                success: false,
                errors,
                data: null,
            };
        }

        throw error;
    }
};

/**
 * Validate a single field
 * 
 * @param {string} fieldPath - Dot-notation path to field (e.g., 'title', 'media.coverImage')
 * @param {any} value - Value to validate
 * @param {boolean} isPublishing - Whether validating for publish
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateField = (fieldPath, value, isPublishing = false) => {
    const schema = isPublishing ? publishedSchema : draftSchema;

    try {
        // Create a partial object with just this field
        const pathParts = fieldPath.split('.');
        let testObj = {};
        let current = testObj;

        for (let i = 0; i < pathParts.length - 1; i++) {
            current[pathParts[i]] = {};
            current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = value;

        // Validate just this field
        schema.pick({ [pathParts[0]]: true }).parse(testObj);

        return {
            valid: true,
            error: null,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                valid: false,
                error: error.errors[0]?.message || 'Validation error',
            };
        }

        return {
            valid: true,
            error: null,
        };
    }
};

/**
 * Get validation errors for display
 * 
 * @param {Object} errors - Errors object from validateBlog
 * @returns {Array} Array of { field, message } objects
 */
export const getValidationErrors = (errors) => {
    return Object.entries(errors).map(([field, message]) => ({
        field,
        message,
    }));
};

/**
 * Check if required fields are filled
 * 
 * @param {Object} data - Blog data
 * @param {boolean} isPublishing - Whether checking for publish
 * @returns {Object} { complete: boolean, missing: Array }
 */
export const checkRequiredFields = (data, isPublishing = false) => {
    const requiredForDraft = ['title', 'slug', 'category'];
    const requiredForPublish = [
        'title',
        'slug',
        'category',
        'excerpt',
        'media.coverImage',
        'media.coverImageAlt',
        'content.intro',
        'seo.metaTitle',
        'seo.metaDescription',
    ];

    const required = isPublishing ? requiredForPublish : requiredForDraft;
    const missing = [];

    required.forEach((field) => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], data);
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            missing.push(field);
        }
    });

    return {
        complete: missing.length === 0,
        missing,
    };
};

export default {
    validateBlog,
    validateField,
    getValidationErrors,
    checkRequiredFields,
    draftSchema,
    publishedSchema,
};
