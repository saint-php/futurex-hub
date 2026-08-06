import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import Flashcard from "../components/vocabulary/Flashcard";
import { getWordsByCategory } from "../data/vocabulary";
import { vocabularyCategories } from "../data/vocabularyCategories";

export default function CategoryWordsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

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
    if (list.length === 0 && meta) {
      list = getWordsByCategory(meta.title);
    }
    return list;
  }, [categoryId, meta]);

  const title = meta?.title ?? categoryId ?? "Category";
  const canQuiz = words.length >= 4;

  if (words.length === 0) {
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className="text-2xl font-bold capitalize text-slate-900">{title}</h1>
        <p className="text-slate-500">
          No words in this category yet. Add entries in{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
            src/data/vocabulary.ts
          </code>
          .
        </p>
      </div>
    );
  }

  const entry = words[current];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="text-2xl font-bold capitalize text-slate-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {words.length} word{words.length === 1 ? "" : "s"} · Flashcards
          </p>
        </div>

        <button
          type="button"
          disabled={!canQuiz}
          title={
            canQuiz
              ? "Start a quiz for this category"
              : "Need at least 4 words to take a quiz"
          }
          onClick={() =>
            navigate(`/dashboard/vocabulary/quiz/${categoryId}`)
          }
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ClipboardList size={18} />
          Take Quiz
        </button>
      </div>

      <Flashcard entry={entry} key={String(entry.id)} />

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <p className="text-sm font-semibold tabular-nums text-slate-500">
          {current + 1} / {words.length}
        </p>

        {current < words.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrent((c) => c + 1)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Next
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            disabled={!canQuiz}
            onClick={() =>
              navigate(`/dashboard/vocabulary/quiz/${categoryId}`)
            }
            className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Take Quiz
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
