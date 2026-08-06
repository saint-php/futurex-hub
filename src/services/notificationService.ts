import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  writeBatch,
  addDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { AppNotification } from "../types/user";

function mapDoc(id: string, data: Record<string, unknown>): AppNotification {
  const createdAt =
    typeof data.createdAt === "string"
      ? data.createdAt
      : data.createdAt &&
          typeof (data.createdAt as { toDate?: () => Date }).toDate ===
            "function"
        ? (data.createdAt as { toDate: () => Date }).toDate().toISOString()
        : new Date().toISOString();

  return {
    id,
    title: String(data.title ?? "Notification"),
    body: String(data.body ?? ""),
    type: (data.type as AppNotification["type"]) ?? "system",
    read: Boolean(data.read),
    createdAt,
    href: data.href ? String(data.href) : undefined,
  };
}

export async function fetchNotifications(
  uid: string,
  max = 40
): Promise<AppNotification[]> {
  const ref = collection(db, "users", uid, "notifications");
  const q = query(ref, orderBy("createdAt", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapDoc(d.id, d.data() as Record<string, unknown>));
}

export async function markNotificationRead(uid: string, notificationId: string) {
  await updateDoc(doc(db, "users", uid, "notifications", notificationId), {
    read: true,
  });
}

export async function markAllNotificationsRead(uid: string) {
  const ref = collection(db, "users", uid, "notifications");
  const q = query(ref, where("read", "==", false), limit(50));
  const snap = await getDocs(q);
  if (snap.empty) return;

  const batch = writeBatch(db);
  snap.docs.forEach((d) => {
    batch.update(d.ref, { read: true });
  });
  await batch.commit();
}

/** Helper to create a notification (e.g. after quiz rewards) */
export async function createNotification(
  uid: string,
  payload: {
    title: string;
    body: string;
    type?: AppNotification["type"];
    href?: string;
  }
) {
  await addDoc(collection(db, "users", uid, "notifications"), {
    title: payload.title,
    body: payload.body,
    type: payload.type ?? "system",
    href: payload.href ?? null,
    read: false,
    createdAt: serverTimestamp(),
  });
}
