import {
  doc,
  getDoc,
  increment,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/** XP thresholds: every 100 XP = 1 level (matches ProgressCard) */
export function levelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export async function addXP(uid: string, amount: number) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const currentXP = (snap.data()?.xp as number) ?? 0;
  const newXP = currentXP + amount;
  const newLevel = levelFromXP(newXP);

  await updateDoc(ref, {
    xp: increment(amount),
    level: newLevel,
  });
}

export async function addCoins(uid: string, amount: number) {
  await updateDoc(doc(db, "users", uid), {
    coins: increment(amount),
  });
}

export async function learnWord(uid: string, count = 1) {
  await updateDoc(doc(db, "users", uid), {
    totalWords: increment(count),
  });
}

export async function completeLesson(uid: string) {
  await updateDoc(doc(db, "users", uid), {
    completedLessons: increment(1),
  });
}

/**
 * Update daily streak.
 * - Same calendar day → no change
 * - Consecutive day → streak + 1
 * - Gap → reset to 1
 */
export async function updateStreak(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();
  const currentStreak = (data.streak as number) ?? 0;
  const lastActive = data.lastActiveDate as string | undefined;

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  if (lastActive === todayStr) {
    return;
  }

  let newStreak = 1;

  if (lastActive) {
    const last = new Date(lastActive + "T12:00:00");
    const diffMs = today.getTime() - last.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak = currentStreak + 1;
    }
  }

  await updateDoc(ref, {
    streak: newStreak,
    lastActiveDate: todayStr,
    lastLogin: serverTimestamp(),
  });
}

/**
 * Full reward after a successful quiz (≥60%).
 */
export async function rewardQuizSuccess(
  uid: string,
  opts: {
    xp?: number;
    coins?: number;
    wordsLearned?: number;
    markLessonComplete?: boolean;
  } = {}
) {
  const {
    xp = 50,
    coins = 20,
    wordsLearned = 0,
    markLessonComplete = true,
  } = opts;

  await updateStreak(uid);
  if (xp > 0) await addXP(uid, xp);
  if (coins > 0) await addCoins(uid, coins);
  if (wordsLearned > 0) await learnWord(uid, wordsLearned);
  if (markLessonComplete) await completeLesson(uid);
}
