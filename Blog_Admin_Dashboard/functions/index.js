const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

/**
 * Scheduled function to publish posts that are scheduled for the current time or earlier.
 * Runs every 5 minutes.
 */
exports.publishScheduledPosts = onSchedule("every 5 minutes", async (event) => {
    const now = new Date();
    console.log(`Checking for scheduled posts at ${now.toISOString()}`);

    try {
        // Query for blogs that are scheduled and whose scheduledTime has passed
        const scheduledQuery = db.collection("blogs")
            .where("status", "==", "scheduled")
            .where("dates.scheduledAt", "<=", now);

        const snapshot = await scheduledQuery.get();

        if (snapshot.empty) {
            console.log("No posts to publish.");
            return;
        }

        const batch = db.batch();

        snapshot.forEach((doc) => {
            console.log(`Publishing post: ${doc.id} - ${doc.data().title}`);
            const docRef = db.collection("blogs").doc(doc.id);
            batch.update(docRef, {
                status: "published",
                "dates.publishedAt": admin.firestore.FieldValue.serverTimestamp(),
                "dates.updatedAt": admin.firestore.FieldValue.serverTimestamp()
            });
        });

        await batch.commit();
        console.log(`Successfully published ${snapshot.size} posts.`);
    } catch (error) {
        console.error("Error publishing scheduled posts:", error);
    }
});
