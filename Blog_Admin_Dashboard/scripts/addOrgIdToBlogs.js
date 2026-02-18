/**
 * Add orgId to Existing Delacruz Blogs
 * 
 * This script updates all existing Delacruz blogs in Firebase to add the orgId field
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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
 * Add orgId to all blogs in the collection
 */
async function addOrgIdToBlogs() {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  🔧 ADDING ORGID TO DELACRUZ BLOGS');
    console.log('═══════════════════════════════════════════════════════\n');

    try {
        // Get all blogs
        const querySnapshot = await getDocs(collection(db, 'blogs'));

        console.log(`📄 Found ${querySnapshot.size} blogs in the database\n`);

        let updatedCount = 0;
        let skippedCount = 0;

        // Update each blog
        for (const blogDoc of querySnapshot.docs) {
            const blogData = blogDoc.data();

            // Check if orgId already exists
            if (blogData.orgId) {
                console.log(`⏭️  Skipped: "${blogData.title}" (already has orgId: ${blogData.orgId})`);
                skippedCount++;
                continue;
            }

            // Add orgId field
            try {
                await updateDoc(doc(db, 'blogs', blogDoc.id), {
                    orgId: 'delacruz'
                });
                console.log(`✅ Updated: "${blogData.title}"`);
                console.log(`   ID: ${blogDoc.id}`);
                console.log(`   Added: orgId = 'delacruz'\n`);
                updatedCount++;
            } catch (error) {
                console.error(`❌ Failed to update: "${blogData.title}"`);
                console.error(`   Error: ${error.message}\n`);
            }
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log('  ✅ UPDATE COMPLETE!');
        console.log('═══════════════════════════════════════════════════════\n');

        console.log('📊 Summary:');
        console.log(`   ✅ Updated: ${updatedCount} blogs`);
        console.log(`   ⏭️  Skipped: ${skippedCount} blogs (already had orgId)`);
        console.log(`   📝 Total: ${querySnapshot.size} blogs\n`);

        console.log('💡 Next step:');
        console.log('   Refresh the dashboard to see only Delacruz blogs!\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error updating blogs:', error);
        console.error('   Details:', error.message);
        process.exit(1);
    }
}

// Run the script
addOrgIdToBlogs();
