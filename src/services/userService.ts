import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import {
  type UserPreferences,
  defaultPreferences,
} from "../types/user";

export async function updateUserFullName(
  uid: string,
  fullName: string
) {
  const trimmed = fullName.trim();

  if (!trimmed) {
    throw new Error("Name cannot be empty");
  }

  await updateDoc(doc(db, "users", uid), {
    fullName: trimmed,
  });

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: trimmed,
    });
  }
}

export async function updateUserPreferences(
  uid: string,
  preferences: Partial<UserPreferences>
) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  const current =
    (snap.data()?.preferences as UserPreferences | undefined) ??
    defaultPreferences;

  await updateDoc(ref, {
    preferences: {
      ...current,
      ...preferences,
    },
  });
}

export async function ensureUserDefaults(uid: string) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  if (!snap.data()?.preferences) {
    await updateDoc(ref, {
      preferences: defaultPreferences,
    });
  }
}

export async function touchLastLogin(uid: string) {
  await updateDoc(doc(db, "users", uid), {
    lastLogin: serverTimestamp(),
  });
}