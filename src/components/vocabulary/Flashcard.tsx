import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { VocabularyEntry } from "../../data/vocabulary";

type Props = {
  entry: VocabularyEntry;
};

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Hard: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function Flashcard({ entry }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="mx-auto w-full max-w-lg">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-label={flipped ? "Show word" : "Show meaning"}
      >
        <div
          className={[
            "relative min-h-[280px] rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300",
            "hover:shadow-md",
            flipped ? "bg-slate-50" : "",
          ].join(" ")}
        >
          {/* Difficulty badge */}
          <span
            className={[
              "absolute right-5 top-5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1",
              difficultyColor[entry.difficulty] ?? difficultyColor.Medium,
            ].join(" ")}
          >
            {entry.difficulty}
          </span>

          {!flipped ? (
            /* ── FRONT: the word ── */
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Tap to reveal
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                {entry.word}
              </h2>
              <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-slate-400">
                <RotateCcw size={12} />
                Flip card
              </p>
            </div>
          ) : (
            /* ── BACK: full detail ── */
            <div className="space-y-5 pt-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Meaning
                </p>
                <p className="mt-1.5 text-lg font-medium leading-relaxed text-slate-800">
                  {entry.meaning}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Example
                </p>
                <p className="mt-1.5 border-l-2 border-blue-200 pl-3 text-[15px] italic leading-relaxed text-slate-600">
                  “{entry.example}”
                </p>
              </div>

              {(entry.synonym || entry.antonym) && (
                <div className="grid grid-cols-2 gap-3">
                  {entry.synonym && (
                    <div className="rounded-xl bg-emerald-50/80 px-3.5 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Synonym
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-emerald-900">
                        {entry.synonym}
                      </p>
                    </div>
                  )}
                  {entry.antonym && (
                    <div className="rounded-xl bg-rose-50/80 px-3.5 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                        Antonym
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-rose-900">
                        {entry.antonym}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="pt-1 text-center text-xs text-slate-400">
                Tap to flip back
              </p>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}