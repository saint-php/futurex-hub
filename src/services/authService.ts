import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export async function signup(
  fullName: string,
  email: string,
  password: string
) {
  // Create Authentication Account
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Update Firebase Auth Profile
  await updateProfile(credential.user, {
    displayName: fullName,
  });

  // Create Firestore User Document
  await setDoc(doc(db, "users", credential.user.uid), {
    uid: credential.user.uid,

    fullName,

    email,

    photoURL: "",

    role: "student",

    level: 1,

    xp: 0,

    coins: 100,

    streak: 0,

    totalWords: 0,

    completedLessons: 0,

    createdAt: serverTimestamp(),

    lastLogin: serverTimestamp(),
    isPaid: false,
  });

  return credential.user;
}

export async function login(
  email: string,
  password: string
) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Update Last Login
  await updateDoc(
    doc(db, "users", credential.user.uid),
    {
      lastLogin: serverTimestamp(),
    }
  );

  return credential.user;
}

export async function logout() {
  await signOut(auth);
}