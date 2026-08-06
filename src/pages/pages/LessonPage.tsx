import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Flashcard from "../components/vocabulary/Flashcard";
import { vocabularyWords } from "../data/vocabularyWords";

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const words = vocabularyWords.filter(
    (word) => word.lessonId === lessonId
  );

  const [current, setCurrent] = useState(0);

  const word = words[current];

  if (!word) {
    return <div>No words found.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <Flashcard
        word={word.word}
        meaning={word.meaning}
        sentence={word.sentence}
      />

      <div className="flex items-center justify-between">

        <button
          disabled={current === 0}
          onClick={() => setCurrent((prev) => prev - 1)}
          className="rounded-xl border border-slate-300 px-6 py-3 disabled:opacity-40"
        >
          Previous
        </button>

        <p className="font-semibold">
          {current + 1} / {words.length}
        </p>

        {current < words.length - 1 ? (
          <button
            onClick={() => setCurrent((prev) => prev + 1)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() =>
              navigate(`/dashboard/quiz/${lessonId}`)
            }
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Take Quiz
          </button>
        )}

      </div>

    </div>
  );
}