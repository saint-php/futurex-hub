import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Flashcard from "../components/vocabulary/Flashcard";
import { getWordById, getWordCategories } from "../data/vocabulary";

export default function WordPage() {
  const { wordId } = useParams<{ wordId: string }>();
  const navigate = useNavigate();

  const entry = wordId ? getWordById(wordId) : undefined;

  if (!entry) {
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
        <p className="text-slate-500">Word not found.</p>
      </div>
    );
  }

  const tags = getWordCategories(entry);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {entry.word}
        </h1>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <Flashcard entry={entry} />
    </div>
  );
}