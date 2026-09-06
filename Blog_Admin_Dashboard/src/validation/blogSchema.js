import { z } from 'zod';

/**
 * Blog Form Validation Schema
 * 
 * Comprehensive validation for blog posts using Zod
 * Supports Innocent / Innosphere Consulting standard schema
 */

// Reference link schema
export const referenceSchema = z.object({
    label: z.string().min(1, 'Reference label is required'),
    url: z.string().url('Must be a valid URL')
});

// Section image schema
export const sectionImageSchema = z.object({
    url: z.string().url('Must be a valid image URL'),
    alt: z.string().min(1, 'Alt text is required for accessibility'),
    caption: z.string().optional()
});

// Section schema
export const sectionSchema = z.object({
    order: z.number().min(0).optional(),
    id: z.string().optional(),
    heading: z.string().min(1, 'Section heading is required').max(200, 'Heading is too long'),
    hasSubtitle: z.boolean().optional(),
    subtitle: z.string().max(300, 'Subtitle is too long').optional(),
    hasSubSubtitle: z.boolean().optional(),
    subSubtitle: z.string().max(300, 'Sub-subtitle is too long').optional(),
    body: z.string().min(1, 'Section body is required'),
    hasInsight: z.boolean().optional(),
    insight: z.string().optional(), // Legacy alias
    takeaway: z.string().optional(), // Standardized target field
    sources: z.array(z.string()).optional(),
    references: z.array(referenceSchema).optional().default([]),
    hasImage: z.boolean().optional(),
    image: z.string().optional(),
    images: z.array(sectionImageSchema).optional().default([]),
    imageInputType: z.enum(['upload', 'url']).optional(),
    hasPoints: z.boolean().optional(),
    points: z.array(z.object({
        title: z.string().optional(),
        description: z.string().optional()
    })).optional()
});

// FAQ schema
export const faqSchema = z.object({
    question: z.string().min(1, 'Question is required').max(500, 'Question is too long'),
    answer: z.string().min(1, 'Answer is required'),
});

// Author schema
export const authorItemSchema = z.object({
    name: z.string().min(1, 'Author name is required').max(100),
    role: z.string().max(100).optional().default('Consultant'),
    bio: z.string().max(600).optional(),
    photoUrl: z.string().url().optional().or(z.literal('')),
    image: z.string().optional(),
    linkedinUrl: z.string().url().optional().or(z.literal(''))
});

// Cover image schema
export const coverImageObjectSchema = z.object({
    url: z.string().url('Must be a valid image URL'),
    alt: z.string().min(1, 'Alt text is required').max(200),
    caption: z.string().optional()
});

// SEO schema
export const seoObjectSchema = z.object({
    metaTitle: z.string().max(60, 'Meta title should be 50-60 characters').optional(),
    metaDescription: z.string().max(160, 'Meta description should be 150-160 characters').optional(),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().url().optional().or(z.literal(''))
});

// Draft validation (minimal requirements)
export const draftSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
    subtitle: z.string().max(300).optional(),
    slug: z.string().min(1, 'Slug is required').max(200, 'Slug is too long'),
    excerpt: z.string().max(500, 'Excerpt is too long').optional(),
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    status: z.enum(['draft', 'scheduled', 'published', 'archived']).default('draft'),
    date: z.string().optional(),
    publishedAt: z.string().optional().nullable(),
    scheduledPublishAt: z.string().optional().nullable(),
    scheduledUnpublishAt: z.string().optional().nullable(),
    orgId: z.string().optional(),
    editorNotes: z.string().optional(),

    // Support both canonical coverImage and legacy media
    coverImage: coverImageObjectSchema.optional(),
    media: z.object({
        coverImage: z.string().optional(),
        coverImageAlt: z.string().max(200, 'Alt text is too long').optional(),
    }).optional(),

    readTimeMinutes: z.number().optional(),
    wordCount: z.number().optional(),
    reading: z.object({
        readTime: z.string().optional(),
        wordCount: z.number().optional(),
    }).optional(),

    // Support both authors array and legacy single author
    authors: z.array(authorItemSchema).optional(),
    author: z.object({
        name: z.string().max(100, 'Author name is too long').optional(),
        role: z.string().optional(),
        bio: z.string().max(500, 'Author bio is too long').optional(),
        image: z.string().optional()
    }).optional(),

    content: z.object({
        intro: z.string().optional(),
        sections: z.array(sectionSchema).min(1, 'At least one section is required'),
        hasAuthorNote: z.boolean().optional(),
        authorNote: z.string().optional(),
        hasFAQs: z.boolean().optional(),
        faqs: z.array(faqSchema).optional(),
    }),

    sections: z.array(sectionSchema).optional(),
    faq: z.array(faqSchema).optional(),

    seo: seoObjectSchema.optional(),
});

// Published validation (strict requirements)
export const publishedSchema = draftSchema.extend({
    excerpt: z.string().min(1, 'Excerpt is required for publishing').max(500, 'Excerpt is too long'),
    content: z.object({
        intro: z.string().min(1, 'Introduction is required for publishing'),
        sections: z.array(sectionSchema).min(1, 'At least one section is required'),
        hasAuthorNote: z.boolean().optional(),
        authorNote: z.string().optional(),
        hasFAQs: z.boolean().optional(),
        faqs: z.array(faqSchema).optional(),
    }),
    seo: z.object({
        metaTitle: z.string().min(1, 'Meta title is required for SEO').max(60, 'Meta title should be 50-60 characters'),
        metaDescription: z.string().min(1, 'Meta description is required for SEO').max(160, 'Meta description should be 150-160 characters'),
        ogImage: z.string().optional(),
        canonicalUrl: z.string().url().optional().or(z.literal(''))
    }),
}).refine((data) => {
    const hasCover = (data.coverImage && data.coverImage.url) || (data.media && data.media.coverImage);
    return !!hasCover;
}, {
    message: 'Cover image is required for publishing',
    path: ['media.coverImage']
}).refine((data) => {
    const sections = data.sections || data.content?.sections || [];
    return sections.some(s => (s.takeaway && s.takeaway.trim().length > 0) || (s.insight && s.insight.trim().length > 0));
}, {
    message: 'Articles must contain at least one Strategic Takeaway before publishing',
    path: ['content.sections']
});

// Scheduled validation (strict + requires valid future scheduledPublishAt)
export const scheduledSchema = publishedSchema.extend({
    status: z.literal('scheduled'),
}).refine((data) => {
    const scheduledTime = data.scheduledPublishAt || data.scheduledAt;
    if (!scheduledTime) return false;
    return new Date(scheduledTime).getTime() > Date.now();
}, {
    message: 'Scheduled time must be set in the future',
    path: ['scheduledPublishAt']
});

/**
 * Validate blog data
 * 
 * @param {Object} data - Blog data to validate
 * @param {string|boolean} validationType - 'published' | 'scheduled' | 'draft' (or boolean isPublishing)
 * @returns {Object} { success: boolean, errors: Object, data: Object }
 */
export const validateBlog = (data, validationType = false) => {
    let schema = draftSchema;
    if (validationType === 'scheduled' || data.status === 'scheduled') {
        schema = scheduledSchema;
    } else if (validationType === true || validationType === 'published' || data.status === 'published') {
        schema = publishedSchema;
    }

    try {
        const validatedData = schema.parse(data);
        return {
            success: true,
            errors: {},
            data: validatedData,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
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
 */
export const validateField = (fieldPath, value, isPublishing = false) => {
    const schema = isPublishing ? publishedSchema : draftSchema;

    try {
        const pathParts = fieldPath.split('.');
        let testObj = {};
        let current = testObj;

        for (let i = 0; i < pathParts.length - 1; i++) {
            current[pathParts[i]] = {};
            current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = value;

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
 */
export const getValidationErrors = (errors) => {
    return Object.entries(errors).map(([field, message]) => ({
        field,
        message,
    }));
};

/**
 * Check if required fields are filled
 */
export const checkRequiredFields = (data, isPublishing = false) => {
    const requiredForDraft = ['title', 'slug', 'category'];
    const requiredForPublish = [
        'title',
        'slug',
        'category',
        'excerpt',
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

    const hasCover = (data.coverImage && data.coverImage.url) || (data.media && data.media.coverImage);
    if (isPublishing && !hasCover) {
        missing.push('media.coverImage');
    }

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
    scheduledSchema
};
