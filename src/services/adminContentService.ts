import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import type {
  AdminStory,
  AdminStoryCategory,
  AdminCourse,
  AdminTopic,
  AdminQuestion,
} from "../types/content";

// ─── Stories ────────────────────────────────────────────────────────────────

export async function listStoryCategories(): Promise<AdminStoryCategory[]> {
  const snap = await getDocs(
    query(collection(db, "storyCategories"), orderBy("title"))
  );
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<AdminStoryCategory, "id">),
  }));
}

export async function upsertStoryCategory(cat: AdminStoryCategory) {
  const { id, ...rest } = cat;
  await setDoc(doc(db, "storyCategories", id), rest, { merge: true });
}

export async function deleteStoryCategory(id: string) {
  await deleteDoc(doc(db, "storyCategories", id));
}

export async function listStories(categoryId?: string): Promise<AdminStory[]> {
  const ref = collection(db, "stories");
  const q = categoryId
    ? query(ref, where("category", "==", categoryId), orderBy("title"))
    : query(ref, orderBy("title"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<AdminStory, "id">),
  }));
}

export async function getStory(id: string): Promise<AdminStory | null> {
  const snap = await getDoc(doc(db, "stories", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<AdminStory, "id">) };
}

export async function upsertStory(story: AdminStory) {
  const { id, ...rest } = story;
  await setDoc(
    doc(db, "stories", id),
    { ...rest, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function createStory(
  data: Omit<AdminStory, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const id = `story_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  await setDoc(doc(db, "stories", id), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return id;
}

export async function deleteStory(id: string) {
  await deleteDoc(doc(db, "stories", id));
}

// ─── Courses / Topics / Questions ───────────────────────────────────────────

export async function listCourses(): Promise<AdminCourse[]> {
  const snap = await getDocs(query(collection(db, "courses"), orderBy("title")));
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<AdminCourse, "id">),
  }));
}

export async function getCourse(id: string): Promise<AdminCourse | null> {
  const snap = await getDoc(doc(db, "courses", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<AdminCourse, "id">) };
}

export async function createCourse(
  data: Omit<AdminCourse, "id" | "createdAt" | "updatedAt" | "topics"> & {
    topics?: AdminTopic[];
  }
): Promise<string> {
  const id = data.subjectId || `course_${Date.now().toString(36)}`;
  await setDoc(doc(db, "courses", id), {
    subjectId: data.subjectId || id,
    title: data.title,
    description: data.description,
    icon: data.icon || "📚",
    gradient: data.gradient || "from-blue-500 to-indigo-600",
    topics: data.topics ?? [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return id;
}

export async function updateCourse(
  id: string,
  patch: Partial<Omit<AdminCourse, "id">>
) {
  await updateDoc(doc(db, "courses", id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCourse(id: string) {
  await deleteDoc(doc(db, "courses", id));
}

export async function setCourseTopics(courseId: string, topics: AdminTopic[]) {
  await updateDoc(doc(db, "courses", courseId), {
    topics,
    updatedAt: serverTimestamp(),
  });
}

export async function addTopicToCourse(
  courseId: string,
  topic: Omit<AdminTopic, "id"> & { id?: string }
): Promise<AdminTopic> {
  const course = await getCourse(courseId);
  if (!course) throw new Error("Course not found");

  const newTopic: AdminTopic = {
    id: topic.id || `topic_${Date.now().toString(36)}`,
    title: topic.title,
    summary: topic.summary,
    notes: topic.notes,
    questions: topic.questions ?? [],
  };

  await setCourseTopics(courseId, [...(course.topics ?? []), newTopic]);
  return newTopic;
}

export async function updateTopicInCourse(
  courseId: string,
  topicId: string,
  patch: Partial<Omit<AdminTopic, "id">>
) {
  const course = await getCourse(courseId);
  if (!course) throw new Error("Course not found");

  const topics = (course.topics ?? []).map((t) =>
    t.id === topicId ? { ...t, ...patch } : t
  );
  await setCourseTopics(courseId, topics);
}

export async function removeTopicFromCourse(courseId: string, topicId: string) {
  const course = await getCourse(courseId);
  if (!course) throw new Error("Course not found");
  await setCourseTopics(
    courseId,
    (course.topics ?? []).filter((t) => t.id !== topicId)
  );
}

export async function setTopicQuestions(
  courseId: string,
  topicId: string,
  questions: AdminQuestion[]
) {
  await updateTopicInCourse(courseId, topicId, { questions });
}

export function makeQuestion(
  partial: Omit<AdminQuestion, "id"> & { id?: string }
): AdminQuestion {
  return {
    id:
      partial.id ||
      `q_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    question: partial.question,
    options: partial.options,
    answer: partial.answer,
  };
}