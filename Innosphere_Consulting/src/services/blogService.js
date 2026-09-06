import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const BLOGS_COLLECTION = "blogs";
const SUPPORTED_ORGS = ["innosphere", "innocent-consulting"];

/**
 * Normalizes any blog / insight object (Firestore doc or local static data)
 * into a single canonical target shape.
 */
export const normalizeInsight = (data) => {
    if (!data) return null;

    // Authors normalizer
    let authors = [];
    if (Array.isArray(data.authors) && data.authors.length > 0) {
        authors = data.authors.map(a => ({
            name: a.name || 'Innosphere Editorial',
            role: a.role || 'Strategic Advisory',
            bio: a.bio || '',
            photoUrl: a.photoUrl || a.image || '',
            linkedinUrl: a.linkedinUrl || ''
        }));
    } else if (data.author) {
        authors = [{
            name: data.author.name || 'Innosphere Editorial',
            role: data.author.role || 'Lead Consultant',
            bio: data.author.bio || '',
            photoUrl: data.author.image || data.author.photoUrl || '',
            linkedinUrl: data.author.linkedinUrl || ''
        }];
    } else {
        authors = [{
            name: 'Innosphere Editorial',
            role: 'Strategic Practice Lead',
            bio: 'Strategic analysis team at Innosphere Consulting, tracking regional trends and digital operating models.',
            photoUrl: '',
            linkedinUrl: ''
        }];
    }

    // Cover Image normalizer
    const coverImageUrl = data.coverImage?.url || data.media?.coverImage || data.image || data.heroImage || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80";
    const coverImageAlt = data.coverImage?.alt || data.media?.coverImageAlt || data.title || "Strategic Perspective";
    const coverImageCaption = data.coverImage?.caption || "";

    // Read Time & Word Count
    const readTimeMinutes = data.readTimeMinutes || (data.reading?.readTime ? parseInt(data.reading.readTime) : (data.readTime ? parseInt(data.readTime) : 5));
    const readTime = data.readTime || `${readTimeMinutes} min`;

    // Sections normalizer
    const rawSections = data.sections || data.content?.sections || [];
    const sections = rawSections.map((s, idx) => ({
        id: s.id || `section-${idx}`,
        heading: s.heading || `Key Perspective ${idx + 1}`,
        subtitle: s.subtitle || '',
        body: s.body || s.content || '',
        takeaway: s.takeaway || s.insight || '',
        images: Array.isArray(s.images) ? s.images : (s.image ? [{ url: s.image, alt: s.heading, caption: '' }] : []),
        references: Array.isArray(s.references) ? s.references : (s.sources ? s.sources.map(src => ({ label: src, url: src })) : []),
        hasPoints: !!(s.hasPoints || s.points),
        points: s.points || []
    }));

    // FAQs normalizer
    const faq = Array.isArray(data.faq) ? data.faq : (data.content?.faqs || []);

    // Date / PublishedAt normalizer
    let formattedDate = data.publishedAt || data.date || "2026";
    if (data.dates?.publishedAt?.toDate) {
        formattedDate = data.dates.publishedAt.toDate().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return {
        id: data.id,
        slug: data.slug || data.id,
        title: data.title || "Strategic Perspective",
        subtitle: data.subtitle || data.excerpt || data.content?.intro || "",
        category: data.category || "Strategic Insight",
        tags: data.tags || [],
        status: data.status || "published",
        featured: !!data.featured,
        publishedAt: formattedDate,
        date: formattedDate,
        rawTimestamp: data.publishedAt || data.dates?.publishedAt || data.dates?.createdAt || data.date,
        readTimeMinutes,
        readTime,
        coverImage: {
            url: coverImageUrl,
            alt: coverImageAlt,
            caption: coverImageCaption
        },
        image: coverImageUrl, // Legacy fallback
        authors,
        author: authors[0], // Legacy single author fallback
        content: {
            intro: data.content?.intro || data.subtitle || data.excerpt || "",
            sections,
            authorNote: data.content?.authorNote || data.conclusion?.body || ""
        },
        sections,
        faq,
        seo: {
            metaTitle: data.seo?.metaTitle || data.title,
            metaDescription: data.seo?.metaDescription || data.excerpt || data.subtitle || "",
            ogImage: data.seo?.ogImage || coverImageUrl,
            canonicalUrl: data.seo?.canonicalUrl || ""
        }
    };
};

export const blogService = {
    // Get all published blogs for Innosphere/Innocent Consulting
    async getPublishedBlogs(filters = {}) {
        try {
            const q = query(
                collection(db, BLOGS_COLLECTION),
                where("orgId", "in", SUPPORTED_ORGS),
                where("status", "==", "published")
            );
            const snapshot = await getDocs(q);
            const blogs = snapshot.docs.map(doc => normalizeInsight({
                id: doc.id,
                ...doc.data()
            }));

            // Filter in-memory if category or tag requested
            let filtered = blogs;
            if (filters.category && filters.category !== 'All') {
                filtered = filtered.filter(b => b.category.toLowerCase() === filters.category.toLowerCase());
            }
            if (filters.tag) {
                filtered = filtered.filter(b => b.tags && b.tags.map(t => t.toLowerCase()).includes(filters.tag.toLowerCase()));
            }

            // Sort by date descending
            return filtered.sort((a, b) => {
                const timeA = new Date(a.rawTimestamp || a.publishedAt || 0).getTime();
                const timeB = new Date(b.rawTimestamp || b.publishedAt || 0).getTime();
                return timeB - timeA;
            });
        } catch (error) {
            console.error("Error fetching published blogs:", error);
            throw error;
        }
    },

    // Get blog by slug (with optional draft/scheduled preview support)
    async getBlogBySlug(slug, allowPreview = false) {
        try {
            const q = query(
                collection(db, BLOGS_COLLECTION),
                where("orgId", "in", SUPPORTED_ORGS),
                where("slug", "==", slug)
            );
            const snapshot = await getDocs(q);
            if (snapshot.empty) return null;

            const docSnap = snapshot.docs[0];
            const data = docSnap.data();

            // If not published and preview not authorized, return null
            if (!allowPreview && data.status && data.status !== 'published') {
                return null;
            }

            return normalizeInsight({
                id: docSnap.id,
                ...data
            });
        } catch (error) {
            console.error("Error fetching blog by slug:", error);
            throw error;
        }
    }
};
