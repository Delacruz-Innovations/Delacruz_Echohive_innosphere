const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Scheduled Cloud Function: publishScheduledInsights
 * 
 * Runs every 2 minutes. Queries blogs in Firestore where:
 *   - status == "scheduled"
 *   - scheduledPublishAt <= current UTC ISO timestamp
 * 
 * Atomically updates matching documents to:
 *   - status = "published"
 *   - publishedAt = scheduledPublishAt (or now)
 *   - dates.publishedAt = serverTimestamp()
 */
exports.publishScheduledInsights = functions.scheduler.onSchedule({
  schedule: 'every 2 minutes',
  timeZone: 'UTC',
  retryCount: 3,
  memory: '256MiB',
  timeoutSeconds: 60
}, async (event) => {
  const nowIso = new Date().toISOString();
  console.log(`[AutoPublisher] Execution started at ${nowIso}`);

  try {
    const querySnapshot = await db.collection('blogs')
      .where('status', '==', 'scheduled')
      .where('scheduledPublishAt', '<=', nowIso)
      .get();

    if (querySnapshot.empty) {
      console.log('[AutoPublisher] No pending scheduled insights found.');
      return;
    }

    const batch = db.batch();
    let promotedCount = 0;

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const publishTimestamp = data.scheduledPublishAt || nowIso;

      batch.update(docSnap.ref, {
        status: 'published',
        publishedAt: publishTimestamp,
        date: new Date(publishTimestamp).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        'dates.publishedAt': admin.firestore.FieldValue.serverTimestamp(),
        'dates.updatedAt': admin.firestore.FieldValue.serverTimestamp(),
        autoPublishedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      promotedCount++;
      console.log(`[AutoPublisher] Queued doc ${docSnap.id} (slug: ${data.slug || 'n/a'}) for publication.`);
    });

    await batch.commit();
    console.log(`[AutoPublisher] Successfully auto-published ${promotedCount} scheduled insight(s).`);
  } catch (error) {
    console.error('[AutoPublisher] Error executing scheduled auto-publish:', error);
    throw error;
  }
});
