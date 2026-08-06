import { useEffect, useState } from "react";
import { vocabulary } from "./data";

interface QuizStats {
  correct: number;
  total: number;
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Tracks favorites / learned words / quiz accuracy for the Vocabulary Builder.
// Persisted to localStorage for now — a natural future step is moving this
// to Firestore per-user once the rest of the ecosystem needs synced progress.
export function useVocabularyProgress() {
  const [favorites, setFavorites] = useState<number[]>(() =>
    readJSON("vocabFavorites", [])
  );
  const [learned, setLearned] = useState<number[]>(() =>
    readJSON("vocabLearned", [])
  );
  const [quizStats, setQuizStats] = useState<QuizStats>(() =>
    readJSON("vocabQuizStats", { correct: 0, total: 0 })
  );

  useEffect(() => {
    localStorage.setItem("vocabFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("vocabLearned", JSON.stringify(learned));
  }, [learned]);

  useEffect(() => {
    localStorage.setItem("vocabQuizStats", JSON.stringify(quizStats));
  }, [quizStats]);

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function markLearned(id: number) {
    setLearned((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function recordQuizResult(correct: number, total: number) {
    setQuizStats((prev) => ({
      correct: prev.correct + correct,
      total: prev.total + total,
    }));
  }

  const accuracy =
    quizStats.total > 0
      ? Math.round((quizStats.correct / quizStats.total) * 100)
      : 0;

  return {
    totalWords: vocabulary.length,
    favorites,
    learned,
    quizStats,
    accuracy,
    toggleFavorite,
    markLearned,
    recordQuizResult,
  };
}
