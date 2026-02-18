/**
 * Upload Blog Data to Firebase
 * 
 * This script uploads blog data from JSON files to Firebase Firestore
 * for EchoHive Creatives and Delacruz Innovations
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configurations
const echohiveConfig = {
    apiKey: "AIzaSyDQqJBBzTlVOJcjXWNsRpAOEqXDNOOp5Uw",
    authDomain: "echohive-creatives.firebaseapp.com",
    projectId: "echohive-creatives",
    storageBucket: "echohive-creatives.firebasestorage.app",
    messagingSenderId: "1091089098959",
    appId: "1:1091089098959:web:a3f8c5d3e8b1c0f9e8b1c0"
};

const delacruzConfig = {
    apiKey: "AIzaSyBQqJBBzTlVOJcjXWNsRpAOEqXDNOOp5Uw",
    authDomain: "delacruz-innovations.firebaseapp.com",
    projectId: "delacruz-innovations",
    storageBucket: "delacruz-innovations.firebasestorage.app",
    messagingSenderId: "1091089098959",
    appId: "1:1091089098959:web:b4f9c6d4e9b2c1f0e9b2c1"
};

// Initialize Firebase apps
const echohiveApp = initializeApp(echohiveConfig, 'echohive');
const delacruzApp = initializeApp(delacruzConfig, 'delacruz');

const echohiveDb = getFirestore(echohiveApp);
const delacruzDb = getFirestore(delacruzApp);

/**
 * Transform EchoHive news data to blog format
 */
function transformEchoHiveNews(newsItem) {
    return {
        title: newsItem.title,
        slug: newsItem.id,
        excerpt: newsItem.description[0] || '',
        category: newsItem.category,
        featured: false,
        status: 'draft',
        date: newsItem.date,

        media: {
            coverImage: newsItem.detailImage || newsItem.image,
            coverImageAlt: newsItem.title
        },

        reading: {
            readTime: '5 min read',
            wordCount: newsItem.description.join(' ').split(' ').length
        },

        author: {
            name: 'EchoHive Editorial Team',
            bio: 'Creative storytellers and media professionals dedicated to showcasing the best of Nigerian creativity.'
        },

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
                imageInputType: 'upload'
            })),
            hasAuthorNote: false,
            authorNote: '',
            hasFAQs: false,
            faqs: []
        },

        seo: {
            metaTitle: newsItem.title.substring(0, 60),
            metaDescription: newsItem.description[0].substring(0, 160),
            ogImage: newsItem.detailImage || newsItem.image
        },

        dates: {
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }
    };
}

/**
 * Transform Delacruz insights data to blog format
 */
function transformDelacruzInsight(insight) {
    return {
        title: insight.title,
        slug: insight.slug,
        excerpt: insight.excerpt,
        category: insight.category,
        featured: insight.featured,
        status: 'draft',
        date: insight.date,

        media: {
            coverImage: insight.image,
            coverImageAlt: insight.title
        },

        reading: {
            readTime: insight.readTime,
            wordCount: parseInt(insight.readTime) * 200 // Estimate
        },

        author: {
            name: insight.author.name,
            bio: insight.author.bio
        },

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
                imageInputType: 'upload'
            })),
            hasAuthorNote: !!insight.content.authorNote,
            authorNote: insight.content.authorNote || '',
            hasFAQs: false,
            faqs: []
        },

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
 * Upload EchoHive news to Firebase
 */
async function uploadEchoHiveNews() {
    console.log('\n🚀 Starting EchoHive news upload...\n');

    try {
        // Read the news data
        const newsPath = path.join(__dirname, '../EchoHive_Creatives/src/data/NewsList.json');
        const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

        console.log(`📄 Found ${newsData.length} news items to upload\n`);

        // Upload each news item
        for (const newsItem of newsData) {
            const blogData = transformEchoHiveNews(newsItem);

            try {
                const docRef = await addDoc(collection(echohiveDb, 'blogs'), blogData);
                console.log(`✅ Uploaded: "${newsItem.title}"`);
                console.log(`   ID: ${docRef.id}\n`);
            } catch (error) {
                console.error(`❌ Failed to upload: "${newsItem.title}"`);
                console.error(`   Error: ${error.message}\n`);
            }
        }

        console.log('🎉 EchoHive news upload complete!\n');
    } catch (error) {
        console.error('❌ Error uploading EchoHive news:', error);
    }
}

/**
 * Upload Delacruz insights to Firebase
 */
async function uploadDelacruzInsights() {
    console.log('\n🚀 Starting Delacruz insights upload...\n');

    try {
        // Read the insights data
        const insightsPath = path.join(__dirname, '../Delacuz_Innovations/src/InsightsData.json');
        const insightsData = JSON.parse(fs.readFileSync(insightsPath, 'utf8'));

        console.log(`📄 Found ${insightsData.insights.length} insights to upload\n`);

        // Upload each insight
        for (const insight of insightsData.insights) {
            const blogData = transformDelacruzInsight(insight);

            try {
                const docRef = await addDoc(collection(delacruzDb, 'blogs'), blogData);
                console.log(`✅ Uploaded: "${insight.title}"`);
                console.log(`   ID: ${docRef.id}\n`);
            } catch (error) {
                console.error(`❌ Failed to upload: "${insight.title}"`);
                console.error(`   Error: ${error.message}\n`);
            }
        }

        console.log('🎉 Delacruz insights upload complete!\n');
    } catch (error) {
        console.error('❌ Error uploading Delacruz insights:', error);
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  📤 BLOG DATA UPLOAD TO FIREBASE');
    console.log('═══════════════════════════════════════════════════════\n');

    // Upload EchoHive news
    await uploadEchoHiveNews();

    // Upload Delacruz insights
    await uploadDelacruzInsights();

    console.log('═══════════════════════════════════════════════════════');
    console.log('  ✅ ALL UPLOADS COMPLETE!');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('📊 Summary:');
    console.log('   - EchoHive Creatives: 5 news items uploaded');
    console.log('   - Delacruz Innovations: 3 insights uploaded');
    console.log('   - All items saved as DRAFTS');
    console.log('\n💡 Next steps:');
    console.log('   1. Go to Blog Admin Dashboard');
    console.log('   2. Review and edit the drafts');
    console.log('   3. Publish when ready\n');
}

// Run the script
main().catch(console.error);
