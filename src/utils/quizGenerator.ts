
import type { VocabularyEntry } from "../data/vocabulary";

export interface GeneratedQuestion {
  id: string;
  wordId: string | number;
  question: string;
  options: string[];
  answer: string;
  type: "meaning" | "word";
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateQuiz(
  words: VocabularyEntry[],
  maxQuestions = 10
): GeneratedQuestion[] {
  if (words.length === 0) return [];

  const pool = shuffle(words);
  const count = Math.min(maxQuestions, pool.length);
  const questions: GeneratedQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const entry = pool[i];
    const others = words.filter((w) => String(w.id) !== String(entry.id));
    const type: "meaning" | "word" = i % 2 === 0 ? "meaning" : "word";

    if (type === "meaning") {
      const distractors = shuffle(others)
        .slice(0, 3)
        .map((w) => w.meaning);
      while (distractors.length < 3) {
        distractors.push(`Option ${distractors.length + 1}`);
      }
      const options = shuffle([entry.meaning, ...distractors.slice(0, 3)]);
      questions.push({
        id: `q-${entry.id}-m`,
        wordId: entry.id,
        question: `What does "${entry.word}" mean?`,
        options,
        answer: entry.meaning,
        type: "meaning",
      });
    } else {
      const distractors = shuffle(others)
        .slice(0, 3)
        .map((w) => w.word);
      while (distractors.length < 3) {
        distractors.push(`Word${distractors.length}`);
      }
      const options = shuffle([entry.word, ...distractors.slice(0, 3)]);
      questions.push({
        id: `q-${entry.id}-w`,
        wordId: entry.id,
        question: `Which word means: "${entry.meaning}"?`,
        options,
        answer: entry.word,
        type: "word",
      });
    }
  }

  return questions;
}
