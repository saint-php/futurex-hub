import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Repeat } from "lucide-react";

export default function GeneralVocabularyHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-orange-200/60 shadow-lg shadow-orange-500/15">
      <div className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 px-6 py-7 sm:px-8 sm:py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 max-w-lg space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="text-base leading-none">⭐</span>
              Featured Collection
            </div>

            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              General Vocabulary
            </h2>

            <p className="text-sm leading-relaxed text-orange-50/95">
              Master every vocabulary word in Future X through beautiful
              flashcards, smart revision, and interactive quizzes.
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-xs font-medium text-orange-50/90">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={14} className="shrink-0" />
                Flashcards
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Brain size={14} className="shrink-0" />
                Smart Revision
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Repeat size={14} className="shrink-0" />
                Unlimited Practice
              </span>
            </div>

            <Link
              to="/dashboard/vocabulary/category/general"
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-orange-600 shadow-sm transition hover:bg-orange-50 hover:shadow"
            >
              Continue Learning
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex shrink-0 flex-col items-start text-left text-white sm:items-end sm:text-right">
            <p className="text-5xl font-black tracking-tighter sm:text-6xl">
              750+
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-100">
              Vocabulary Words
            </p>
            <p className="mt-3 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              Goal · Master Every Word
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}