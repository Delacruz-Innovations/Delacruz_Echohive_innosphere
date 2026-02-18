/**
 * Upload Delacruz Insights to Firebase
 * 
 * This script uploads the insights from InsightsData.json to Firebase Firestore
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Delacruz Firebase configuration
const delacruzConfig = {
    apiKey: "AIzaSyCX1BkFYOkcugd1CL00usfLnwaVejpn4GM",
    authDomain: "delacruzxinnospherxechohive.firebaseapp.com",
    projectId: "delacruzxinnospherxechohive",
    storageBucket: "delacruzxinnospherxechohive.firebasestorage.app",
    messagingSenderId: "337003804857",
    appId: "1:337003804857:web:09e010137be55095a94368"
};

// Initialize Firebase
const app = initializeApp(delacruzConfig, 'delacruz');
const db = getFirestore(app);

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
            wordCount: parseInt(insight.readTime) * 200 // Estimate: 200 words per minute
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
 * Upload Delacruz insights to Firebase
 */
async function uploadDelacruzInsights() {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  📤 DELACRUZ INSIGHTS UPLOAD TO FIREBASE');
    console.log('═══════════════════════════════════════════════════════\n');

    try {
        // Read the insights data
        const insightsPath = path.join(__dirname, '../../Delacuz_Innovations/src/InsightsData.json');
        console.log(`📁 Reading file: ${insightsPath}\n`);

        const fileContent = fs.readFileSync(insightsPath, 'utf8');
        const insightsData = JSON.parse(fileContent);

        console.log(`📄 Found ${insightsData.insights.length} insights to upload\n`);

        let successCount = 0;
        let failCount = 0;

        // Upload each insight
        for (const insight of insightsData.insights) {
            const blogData = transformDelacruzInsight(insight);

            try {
                const docRef = await addDoc(collection(db, 'blogs'), blogData);
                console.log(`✅ Uploaded: "${insight.title}"`);
                console.log(`   ID: ${docRef.id}`);
                console.log(`   Status: DRAFT\n`);
                successCount++;
            } catch (error) {
                console.error(`❌ Failed to upload: "${insight.title}"`);
                console.error(`   Error: ${error.message}\n`);
                failCount++;
            }
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log('  ✅ UPLOAD COMPLETE!');
        console.log('═══════════════════════════════════════════════════════\n');

        console.log('📊 Summary:');
        console.log(`   ✅ Successfully uploaded: ${successCount} insights`);
        if (failCount > 0) {
            console.log(`   ❌ Failed: ${failCount} insights`);
        }
        console.log('   📝 All items saved as DRAFTS\n');

        console.log('💡 Next steps:');
        console.log('   1. Go to Blog Admin Dashboard');
        console.log('   2. Navigate to: http://localhost:5173/delacruz/dashboard');
        console.log('   3. Review and edit the drafts');
        console.log('   4. Publish when ready\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error uploading Delacruz insights:', error);
        console.error('   Details:', error.message);
        process.exit(1);
    }
}

// Run the script
uploadDelacruzInsights();
