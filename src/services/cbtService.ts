import type { CBTQuestionInstance } from "../types/cbt";
import {
  MAX_QUESTIONS_ENGLISH,
  MAX_QUESTIONS_OTHER_SUBJECT,
} from "../types/cbt";
import {
  getCoursesCached,
  type MergedCourse,
} from "./mergedCourseService";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getMaxQuestionsForSubject(subjectId: string): number {
  return subjectId === "english"
    ? MAX_QUESTIONS_ENGLISH
    : MAX_QUESTIONS_OTHER_SUBJECT;
}

export async function countTopicsInSubject(
  subjectId: string
): Promise<number> {
  const courses = await getCoursesCached();
  const course = courses.find((c) => c.subjectId === subjectId);
  return course?.topics.length ?? 0;
}

export async function countTopics(subjectIds: string[]): Promise<number> {
  const courses = await getCoursesCached();
  return courses
    .filter((c) => subjectIds.includes(c.subjectId))
    .reduce((sum, c) => sum + c.topics.length, 0);
}

export async function maxQuestionsPerTopicForSubject(
  subjectId: string
): Promise<number> {
  const topics = await countTopicsInSubject(subjectId);
  if (topics === 0) return 5;
  const cap = getMaxQuestionsForSubject(subjectId);
  return Math.max(1, Math.min(5, Math.floor(cap / topics)));
}

export async function maxQuestionsPerTopic(
  subjectIds: string[]
): Promise<number> {
  if (subjectIds.length === 0) return 5;
  const values = await Promise.all(
    subjectIds.map((id) => maxQuestionsPerTopicForSubject(id))
  );
  return Math.min(...values);
}

export async function subjectQuestionCount(
  subjectId: string,
  questionsPerTopic: number
): Promise<number> {
  const topics = await countTopicsInSubject(subjectId);
  const cap = getMaxQuestionsForSubject(subjectId);
  return Math.min(topics * questionsPerTopic, cap);
}

export async function totalQuestionCount(
  subjectIds: string[],
  questionsPerTopic: number
): Promise<number> {
  const counts = await Promise.all(
    subjectIds.map((id) => subjectQuestionCount(id, questionsPerTopic))
  );
  return counts.reduce((sum, n) => sum + n, 0);
}

export async function buildCbtSession(
  subjectIds: string[],
  questionsPerTopic: number
): Promise<CBTQuestionInstance[]> {
  const courses: MergedCourse[] = await getCoursesCached();
  const selectedCourses = courses.filter((c) =>
    subjectIds.includes(c.subjectId)
  );

  const allQuestions: CBTQuestionInstance[] = [];

  for (const course of selectedCourses) {
    const subjectCap = getMaxQuestionsForSubject(course.subjectId);
    const subjectPool: CBTQuestionInstance[] = [];

    for (const topic of course.topics) {
      const picked = shuffle(topic.questions).slice(
        0,
        Math.min(questionsPerTopic, topic.questions.length)
      );
      for (const q of picked) {
        subjectPool.push({
          id: q.id,
          subjectId: course.subjectId,
          subjectTitle: course.title,
          topicTitle: topic.title,
          question: q.question,
          options: shuffle(q.options),
          answer: q.answer,
        });
      }
    }

    allQuestions.push(...shuffle(subjectPool).slice(0, subjectCap));
  }

  return shuffle(allQuestions);
}