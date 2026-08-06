import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { vocabulary } from "../../data/vocabulary";

export default function DailyWordCard() {
  const navigate = useNavigate();

  const dayIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
    Math.max(vocabulary.length, 1);
  const word = vocabulary[dayIndex] ?? vocabulary[0];

  if (!word) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-amber-200/80 bg-white shadow-sm">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500"
      />

      <div className="relative px-6 py-6 sm:px-7 sm:py-7">
        <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
            <Sparkles size={18} strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-600">
              Word of the Day
            </p>
            <p className="truncate text-sm text-slate-500">
              Build a daily learning habit
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 px-5 py-5 sm:px-6">
          <h3 className="truncate text-2xl font-bold tracking-tight text-slate-900">
            {word.word}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            {word.meaning}
          </p>
          <p className="mt-3 border-l-2 border-amber-300 pl-3 text-sm italic leading-relaxed text-slate-500">
            “{word.example}”
          </p>
          <button
            type="button"
            onClick={() =>
              navigate(`/dashboard/vocabulary/word/${word.id}`)
            }
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 transition hover:gap-2.5"
          >
            Open flashcard
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}