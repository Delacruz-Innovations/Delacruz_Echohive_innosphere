import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    orderBy,
    serverTimestamp,
    where
} from "firebase/firestore";

/**
 * Creates a base blog service for a specific organization.
 * @param {object} db - Firestore database instance
 * @param {string} orgId - Organization ID (e.g., 'innosphere', 'delacruz', 'echohive')
 * @returns {object} Service object with CRUD operations
 */
export const createBaseBlogService = (db, orgId) => {
    const BLOGS_COLLECTION = "blogs";

    return {
        // Create
        async createBlog(blogData, userId) {
            const docData = {
                ...blogData,
                orgId,
                dates: {
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    publishedAt: blogData.status === 'published' ? serverTimestamp() : null,
                    scheduledAt: blogData.status === 'scheduled' ? blogData.scheduledAt : null
                },
                admin: {
                    createdBy: userId,
                    lastEditedBy: userId
                }
            };
            return await addDoc(collection(db, BLOGS_COLLECTION), docData);
        },

        // Read All with timeout handling
        async getAllBlogs() {
            const TIMEOUT_MS = 15000;

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timed out. Please check your internet connection.')), TIMEOUT_MS);
            });

            const fetchPromise = (async () => {
                try {
                    const q = query(
                        collection(db, BLOGS_COLLECTION),
                        where("orgId", "==", orgId)
                    );
                    const querySnapshot = await getDocs(q);
                    const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    // Sort in memory to avoid requiring a composite index
                    return blogs.sort((a, b) => {
                        const dateA = a.dates?.updatedAt?.toMillis?.() || (a.dates?.updatedAt instanceof Date ? a.dates.updatedAt.getTime() : 0);
                        const dateB = b.dates?.updatedAt?.toMillis?.() || (b.dates?.updatedAt instanceof Date ? b.dates.updatedAt.getTime() : 0);
                        return dateB - dateA;
                    });
                } catch (error) {
                    if (error.code === 'unavailable') {
                        throw new Error(`Unable to connect to the server (${error.code}). Please check your internet connection.`);
                    }
                    if (error.code === 'failed-precondition') {
                        throw new Error('Database request failed. This may be due to a missing index or multiple tabs being open. Check the console for a link to create the index.');
                    }
                    if (error.code === 'permission-denied') {
                        throw new Error('Access denied. Please check your permissions.');
                    }
                    throw new Error(`Technical Error: ${error.code} - ${error.message}`);
                    throw error;
                }
            })();

            return Promise.race([fetchPromise, timeoutPromise]);
        },

        // Read One
        async getBlogById(id) {
            const docRef = doc(db, BLOGS_COLLECTION, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        },

        // Update
        async updateBlog(id, blogData, userId) {
            const docRef = doc(db, BLOGS_COLLECTION, id);
            const updateData = {
                ...blogData,
                "dates.updatedAt": serverTimestamp(),
                "admin.lastEditedBy": userId
            };

            if (blogData.status === 'published' && !blogData.dates?.publishedAt) {
                updateData["dates.publishedAt"] = serverTimestamp();
                updateData["dates.scheduledAt"] = null;
            }

            if (blogData.status === 'scheduled') {
                updateData["dates.scheduledAt"] = blogData.scheduledAt;
                updateData["dates.publishedAt"] = null;
            }

            if (blogData.status === 'draft') {
                updateData["dates.scheduledAt"] = null;
                updateData["dates.publishedAt"] = null;
            }

            return await updateDoc(docRef, updateData);
        },

        // Delete (Removed Storage dependency)
        async deleteBlog(id) {
            return await deleteDoc(doc(db, BLOGS_COLLECTION, id));
        }
    };
};
