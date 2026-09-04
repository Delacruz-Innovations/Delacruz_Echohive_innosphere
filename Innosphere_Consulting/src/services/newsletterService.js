import { db } from "../firebase/config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const NEWSLETTER_COLLECTION = "newsletter_subscribers";

export const newsletterService = {
  /**
   * Subscribe an email address to the newsletter
   * @param {string} email
   * @param {string} [source='footer']
   * @returns {Promise<{ success: boolean, alreadySubscribed?: boolean }>}
   */
  async subscribe(email, source = "footer") {
    if (!email || typeof email !== "string") {
      throw new Error("A valid email address is required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const docRef = doc(db, NEWSLETTER_COLLECTION, normalizedEmail);

    try {
      const existingDoc = await getDoc(docRef);

      if (existingDoc.exists() && existingDoc.data()?.status === "active") {
        return { success: true, alreadySubscribed: true };
      }

      await setDoc(
        docRef,
        {
          email: normalizedEmail,
          orgId: "innosphere",
          status: "active",
          source,
          subscribedAt: existingDoc.exists() ? existingDoc.data().subscribedAt || serverTimestamp() : serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      return { success: true, alreadySubscribed: false };
    } catch (error) {
      console.error("Error saving newsletter subscription to Firebase:", error);
      throw error;
    }
  }
};
