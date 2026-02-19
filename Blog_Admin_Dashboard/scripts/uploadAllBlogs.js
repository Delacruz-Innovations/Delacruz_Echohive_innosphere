/**
 * Unified Blog Data Upload Script
 * 
 * This script uploads blog data from three different organizations to a single Firebase Firestore.
 * Organizations: Innosphere Consulting, EchoHive Creatives, Delacruz Innovations.
 * All items are uploaded as 'draft' by default.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Unified Firebase Configuration (from .env)
const firebaseConfig = {
    apiKey: "AIzaSyCX1BkFYOkcugd1CL00usfLnwaVejpn4GM",
    authDomain: "delacruzxinnospherxechohive.firebaseapp.com",
    projectId: "delacruzxinnospherxechohive",
    storageBucket: "delacruzxinnospherxechohive.firebasestorage.app",
    messagingSenderId: "337003804857",
    appId: "1:337003804857:web:09e010137be55095a94368"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Helper: Calculate reading time and word count
 */
function getReadingMetrics(text) {
    const wordCount = text.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return { wordCount, readTime: `${readTime} min read` };
}

/**
 * Transformer for Innosphere Consulting
 */
function transformInnosphereArticle(article) {
    const fullText = [
        article.introduction || '',
        ...article.sections.map(s => (s.content || []).join(' ')),
        (article.conclusion?.content || []).join(' ')
    ].join(' ');

    const { wordCount, readTime } = getReadingMetrics(fullText);

    return {
        orgId: 'innosphere',
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || article.introduction?.substring(0, 160) || '',
        category: article.category,
        featured: !!article.featured,
        status: 'draft',
        date: article.date,
        media: {
            coverImage: article.heroImage || article.media?.coverImage || '',
            coverImageAlt: article.title,
            detailImage: article.media?.detailImage || ''
        },
        reading: {
            readTime: article.readTime || readTime,
            wordCount: wordCount
        },
        authors: article.authors ? article.authors.map(a => ({
            name: a.name,
            bio: a.title || a.bio || '',
            image: a.image || ''
        })) : [],
        content: {
            intro: article.introduction || '',
            sections: article.sections.map((s, i) => ({
                order: i,
                heading: s.heading,
                hasSubtitle: !!s.subtitle,
                subtitle: s.subtitle || '',
                hasSubSubtitle: !!s.subSubtitle,
                subSubtitle: s.subSubtitle || '',
                body: (s.content || []).join('\n\n'),
                hasInsight: !!s.insight,
                insight: s.insight || '',
                sources: s.sources || [],
                hasImage: !!s.image,
                image: s.image || '',
                imageInputType: 'url',
                hasPoints: !!(s.points && s.points.length > 0),
                points: s.points || []
            })),
            conclusion: {
                heading: article.conclusion?.heading || '',
                body: (article.conclusion?.content || []).join('\n\n')
            },
            hasAuthorNote: !!article.authorNote,
            authorNote: article.authorNote || '',
            hasFAQs: !!(article.faqs && article.faqs.length > 0),
            faqs: article.faqs || []
        },
        tags: article.tags || [],
        seo: {
            metaTitle: article.seo?.metaTitle || article.title,
            metaDescription: article.seo?.metaDescription || article.excerpt || '',
            ogImage: article.seo?.ogImage || article.heroImage || ''
        },
        dates: {
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }
    };
}

/**
 * Transformer for EchoHive Creatives
 */
function transformEchoHiveNews(newsItem) {
    const fullText = newsItem.description.join(' ');
    const { wordCount, readTime } = getReadingMetrics(fullText);

    return {
        orgId: 'echohive',
        title: newsItem.title,
        subtitle: newsItem.subtitle || '', // Support EchoHive subtitles
        slug: newsItem.id, // Using 'id' as slug
        type: newsItem.type || 'Article', // Support EchoHive post types
        hasRegister: !!newsItem.hasRegister, // Support EchoHive registration links
        excerpt: newsItem.description[0] || '',
        category: newsItem.category,
        featured: false,
        status: 'draft',
        date: newsItem.date,
        media: {
            coverImage: newsItem.image,
            coverImageAlt: newsItem.title,
            detailImage: newsItem.detailImage || ''
        },
        reading: {
            readTime: readTime,
            wordCount: wordCount
        },
        authors: [{
            name: 'EchoHive Editorial Team',
            bio: 'Creative storytellers and media professionals dedicated to showcasing the best of Nigerian creativity.',
            image: ''
        }],
        content: {
            intro: newsItem.description[0] || '',
            sections: newsItem.description.slice(1).map((desc, index) => ({
                order: index,
                heading: `Section ${index + 1}`,
                hasSubtitle: false,
                subtitle: '',
                hasSubSubtitle: false,
                subSubtitle: '',
                body: desc,
                hasInsight: false,
                insight: '',
                sources: [],
                hasImage: false,
                image: '',
                imageInputType: 'url',
                hasPoints: false,
                points: []
            })),
            conclusion: { heading: '', body: '' },
            hasAuthorNote: false,
            authorNote: '',
            hasFAQs: false,
            faqs: []
        },
        tags: newsItem.category ? [newsItem.category] : [],
        seo: {
            metaTitle: newsItem.title.substring(0, 60),
            metaDescription: (newsItem.description[0] || '').substring(0, 160),
            ogImage: newsItem.image
        },
        dates: {
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }
    };
}

/**
 * Transformer for Delacruz Innovations
 */
function transformDelacruzInsight(insight) {
    const fullText = [
        insight.content.intro,
        ...insight.content.sections.map(s => s.body),
        insight.content.authorNote || ''
    ].join(' ');
    const { wordCount, readTime } = getReadingMetrics(fullText);

    return {
        orgId: 'delacruz',
        title: insight.title,
        slug: insight.slug,
        excerpt: insight.excerpt,
        category: insight.category,
        featured: !!insight.featured,
        status: 'draft',
        date: insight.date,
        media: {
            coverImage: insight.image,
            coverImageAlt: insight.title,
            detailImage: ''
        },
        reading: {
            readTime: insight.readTime || readTime,
            wordCount: wordCount
        },
        authors: [{
            name: insight.author.name,
            bio: insight.author.bio,
            image: ''
        }],
        content: {
            intro: insight.content.intro,
            sections: insight.content.sections.map((section, index) => ({
                order: index,
                heading: section.heading,
                hasSubtitle: false,
                subtitle: '',
                hasSubSubtitle: false,
                subSubtitle: '',
                body: section.body,
                hasInsight: false,
                insight: '',
                sources: [],
                hasImage: false,
                image: '',
                imageInputType: 'url',
                hasPoints: false,
                points: []
            })),
            conclusion: { heading: '', body: '' },
            hasAuthorNote: !!insight.content.authorNote,
            authorNote: insight.content.authorNote || '',
            hasFAQs: false,
            faqs: []
        },
        tags: [insight.category],
        seo: {
            metaTitle: insight.title.substring(0, 60),
            metaDescription: insight.excerpt.substring(0, 160),
            ogImage: insight.image
        },
        dates: {
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }
    };
}

/**
 * Core Upload Orchestrator
 */
async function uploadAll() {
    const sources = [
        {
            name: 'Innosphere Consulting',
            path: '../../Innosphere_Consulting/src/articleData.json',
            orgId: 'innosphere',
            getData: (json) => Array.isArray(json) ? json : [json],
            transformer: transformInnosphereArticle
        },
        {
            name: 'EchoHive Creatives',
            path: '../../EchoHive_Creatives/src/data/NewsList.json',
            orgId: 'echohive',
            getData: (json) => json,
            transformer: transformEchoHiveNews
        },
        {
            name: 'Delacruz Innovations',
            path: '../../Delacuz_Innovations/src/InsightsData.json',
            orgId: 'delacruz',
            getData: (json) => json.insights,
            transformer: transformDelacruzInsight
        }
    ];

    console.log('\n🚀 Starting Unified Blog Upload Sequence...\n');

    for (const source of sources) {
        console.log(`📂 Processing: ${source.name}`);

        try {
            const absolutePath = path.resolve(__dirname, source.path);
            if (!fs.existsSync(absolutePath)) {
                console.warn(`⚠️  Source file not found: ${absolutePath}`);
                continue;
            }

            const rawData = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
            const items = source.getData(rawData);

            console.log(`📄 Found ${items.length} items. Initiating transfer...`);

            for (const item of items) {
                const blogData = source.transformer(item);
                try {
                    const docRef = await addDoc(collection(db, 'blogs'), blogData);
                    console.log(`   ✅ [${source.orgId.toUpperCase()}] Uploaded: "${blogData.title}" -> ${docRef.id}`);
                } catch (err) {
                    console.error(`   ❌ [${source.orgId.toUpperCase()}] Failed: "${blogData.title}" - ${err.message}`);
                }
            }
            console.log(`✨ ${source.name} processing complete.\n`);

        } catch (err) {
            console.error(`💥 Critical failure in ${source.name} sequence: ${err.message}\n`);
        }
    }

    console.log('🎉 ALL UPLOADS CONCLUDED. CHECK DASHBOARD DRAFTS.\n');
}

// Global Rejection Handler
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

uploadAll().catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
});
