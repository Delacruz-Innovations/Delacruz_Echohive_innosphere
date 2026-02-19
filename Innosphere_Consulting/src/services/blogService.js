import { db } from "../firebase/config";
import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";

const BLOGS_COLLECTION = "blogs";

export const blogService = {
    // Get all published blogs for Innosphere
    async getPublishedBlogs() {
        try {
            const q = query(
                collection(db, BLOGS_COLLECTION),
                where("orgId", "==", "innosphere"),
                where("status", "==", "published")
            );
            const snapshot = await getDocs(q);
            const blogs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort by date descending in memory to avoid index requirement
            return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error("Error fetching published blogs:", error);
            throw error;
        }
    },

    // Get blog by slug
    async getBlogBySlug(slug) {
        try {
            const q = query(
                collection(db, BLOGS_COLLECTION),
                where("orgId", "==", "innosphere"),
                where("slug", "==", slug)
            );
            const snapshot = await getDocs(q);
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            console.error("Error fetching blog by slug:", error);
            throw error;
        }
    }
};
