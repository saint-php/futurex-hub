/**
 * Merged course loader: static coursesData + Firestore admin courses.
 *
 * Your Study Online / CBT code imports `courses` from data/coursesData.
 * After merge you should load courses asynchronously via fetchCourses()
 * (or keep a sync cache updated on app start).
 *
 * Shape matches AdminCourse / your existing course objects:
 *   { id, subjectId, title, description, icon, gradient, topics: [{ id, title, summary, notes, questions }] }
 */

import { courses as staticCourses } from "../data/coursesData";
import { listCourses as fsListCourses, getCourse as fsGetCourse } from "./adminContentService";
import type { AdminCourse, AdminTopic, AdminQuestion } from "../types/content";

/** Minimal local shape so this file type-checks without importing every course type. */
export type MergedCourse = {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  topics: Array<{
    id: string;
    title: string;
    summary: string;
    notes: string;
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      answer: string;
    }>;
  }>;
};

function normalizeCourse(c: AdminCourse | (typeof staticCourses)[number]): MergedCourse {
  const topics = ((c as AdminCourse).topics ?? []).map((t: AdminTopic | MergedCourse["topics"][number]) => ({
    id: t.id,
    title: t.title,
    summary: t.summary ?? "",
    notes: t.notes ?? "",
    questions: ((t as AdminTopic).questions ?? []).map(
      (q: AdminQuestion | MergedCourse["topics"][number]["questions"][number]) => ({
        id: q.id,
        question: q.question,
        options: q.options ?? [],
        answer: q.answer,
      })
    ),
  }));

  return {
    id: c.id,
    subjectId: (c as AdminCourse).subjectId ?? c.id,
    title: c.title,
    description: c.description ?? "",
    icon: (c as AdminCourse).icon ?? "📚",
    gradient: (c as AdminCourse).gradient ?? "from-blue-500 to-indigo-600",
    topics,
  };
}

function mergeById(remote: MergedCourse[], local: MergedCourse[]): MergedCourse[] {
  const map = new Map<string, MergedCourse>();
  // Remote first, then local overwrites same id (static seed stays canonical if ids collide)
  for (const c of remote) map.set(c.id, c);
  for (const c of local) map.set(c.id, c);
  return Array.from(map.values());
}

async function safeRemoteCourses(): Promise<MergedCourse[]> {
  try {
    const list = await fsListCourses();
    return list.map(normalizeCourse);
  } catch (err) {
    console.warn("[mergedCourseService] Firestore courses unavailable", err);
    return [];
  }
}

/** All courses: static + admin. */
export async function fetchCourses(): Promise<MergedCourse[]> {
  const remote = await safeRemoteCourses();
  const local = (staticCourses as unknown as MergedCourse[]).map(normalizeCourse);
  return mergeById(remote, local).sort((a, b) => a.title.localeCompare(b.title));
}

export async function fetchCourseById(id: string): Promise<MergedCourse | null> {
  const local = (staticCourses as unknown as MergedCourse[]).find(
    (c) => c.id === id || c.subjectId === id
  );
  if (local) return normalizeCourse(local);

  try {
    const remote = await fsGetCourse(id);
    return remote ? normalizeCourse(remote) : null;
  } catch {
    return null;
  }
}

export async function fetchCourseBySubjectId(
  subjectId: string
): Promise<MergedCourse | null> {
  const all = await fetchCourses();
  return all.find((c) => c.subjectId === subjectId || c.id === subjectId) ?? null;
}

/** Topic lookup across merged courses (replaces getTopic from coursesData). */
export async function fetchTopic(
  courseId: string,
  topicId: string
): Promise<{ course: MergedCourse; topic: MergedCourse["topics"][number] } | null> {
  const course = await fetchCourseById(courseId);
  if (!course) return null;
  const topic = course.topics.find((t) => t.id === topicId);
  if (!topic) return null;
  return { course, topic };
}

/**
 * Sync-friendly helper for CBT (buildCbtSession etc.).
 * Call once at app/session start and pass the result around, or cache in React state/context.
 */
let _cache: MergedCourse[] | null = null;
let _cacheAt = 0;
const CACHE_MS = 60_000;

export async function getCoursesCached(force = false): Promise<MergedCourse[]> {
  const now = Date.now();
  if (!force && _cache && now - _cacheAt < CACHE_MS) return _cache;
  _cache = await fetchCourses();
  _cacheAt = now;
  return _cache;
}

export function invalidateCourseCache() {
  _cache = null;
  _cacheAt = 0;
}
