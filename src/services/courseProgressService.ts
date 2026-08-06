import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Marks a topic as "read" for the given user. Intentionally does NOT
 * store any score — only that the topic has been completed once.
 */
export async function markTopicRead(uid: string, topicId: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { readTopics: [topicId] }, { merge: true });
    return;
  }

  await updateDoc(ref, { readTopics: arrayUnion(topicId) });
}
