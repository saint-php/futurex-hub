import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getWordsByCategory } from "../data/vocabulary";
import { vocabularyCategories } from "../data/vocabularyCategories";
import { generateQuiz } from "../utils/quizGenerator";

export default function CategoryQuizPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const meta = useMemo(
    () =>
      vocabularyCategories.find(
        (c) =>
          c.id === categoryId ||
          c.title.toLowerCase() === categoryId?.toLowerCase()
      ),
    [categoryId]
  );

  const words = useMemo(() => {
    if (!categoryId) return [];
    let list = getWordsByCategory(categoryId);
    if (list.length === 0 && meta) list = getWordsByCategory(meta.title);
    return list;
  }, [categoryId, meta]);

  const questions = useMemo(
    () => generateQuiz(words, Math.min(10, words.length)),
    [words]
  );

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const title = meta?.title ?? categoryId ?? "Quiz";

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900">{title} Quiz</h1>
        <p className="text-slate-500">
          Not enough words to build a quiz. Add at least 4 words to this
          category.
        </p>
      </div>
    );
  }

  const question = questions[current];

  function choose(option: string) {
    if (locked) return;
    setSelected(option);
    setLocked(true);

    const correct = option === question.answer;
    const nextScore = correct ? score + 1 : score;
    if (correct) setScore(nextScore);

    window.setTimeout(() => {
      if (current >= questions.length - 1) {
        navigate("/dashboard/vocabulary/quiz-result", {
          state: {
            score: nextScore,
            total: questions.length,
            categoryId,
            categoryTitle: title,
            source: "category",
          },
        });
        return;
      }
      setCurrent((c) => c + 1);
      setSelected(null);
      setLocked(false);
    }, 650);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {title} Quiz
          </h1>
          <p className="text-sm font-semibold tabular-nums text-slate-500">
            {current + 1} / {questions.length}
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
          {question.question}
        </h2>

        <div className="mt-6 space-y-3">
          {question.options.map((option) => {
            let style =
              "w-full rounded-xl border border-slate-200 p-4 text-left text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50";

            if (locked && selected !== null) {
              if (option === question.answer) {
                style =
                  "w-full rounded-xl border border-emerald-500 bg-emerald-50 p-4 text-left text-sm font-medium text-emerald-900";
              } else if (option === selected) {
                style =
                  "w-full rounded-xl border border-rose-400 bg-rose-50 p-4 text-left text-sm font-medium text-rose-900";
              } else {
                style =
                  "w-full rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-sm font-medium text-slate-400";
              }
            }

            return (
              <button
                key={option}
                type="button"
                disabled={locked}
                onClick={() => choose(option)}
                className={style}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
