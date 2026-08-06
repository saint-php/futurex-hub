import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
} from "lucide-react";
import {
  amazingFacts,
  getFactOfTheDay,
  type AmazingFact,
} from "../data/amazingFacts";

const categories = [
  "All",
  ...Array.from(new Set(amazingFacts.map((f) => f.category))),
];

export default function AmazingFactsPage() {
  const navigate = useNavigate();
  const factOfDay = useMemo(() => getFactOfTheDay(), []);
  const [filter, setFilter] = useState("All");
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const list = useMemo(() => {
    if (filter === "All") return amazingFacts;
    return amazingFacts.filter((f) => f.category === filter);
  }, [filter]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrent(0);
    setFlipped(false);
  }, [filter]);

  // Prefer fact of the day when viewing All and it's in the list
  useEffect(() => {
    if (filter !== "All") return;
    const idx = amazingFacts.findIndex((f) => f.id === factOfDay.id);
    if (idx >= 0) setCurrent(idx);
  }, [filter, factOfDay.id]);

  const total = list.length;
  const safeIndex = total === 0 ? 0 : Math.min(current, total - 1);
  const fact: AmazingFact | undefined = total > 0 ? list[safeIndex] : undefined;

  function goPrev() {
    if (total === 0) return;
    setFlipped(false);
    setCurrent((c) => (c <= 0 ? total - 1 : c - 1));
  }

  function goNext() {
    if (total === 0) return;
    setFlipped(false);
    setCurrent((c) => (c >= total - 1 ? 0 : c + 1));
  }

  function randomFact() {
    if (total === 0) return;
    setFlipped(false);
    if (total === 1) return;
    let next = Math.floor(Math.random() * total);
    while (next === safeIndex) {
      next = Math.floor(Math.random() * total);
    }
    setCurrent(next);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Dashboard
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Amazing Facts
            </h1>
            <p className="text-sm text-slate-500">
              Flip cards · filter by category · surprise yourself
            </p>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === c
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {fact ? (
        <>
          {/* Flashcard */}
          <div className="perspective-1000">
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="relative block w-full cursor-pointer text-left [perspective:1200px]"
              style={{ minHeight: "280px" }}
            >
              <div
                className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
                style={{
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  minHeight: "280px",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 shadow-md [backface-visibility:hidden]"
                  style={{ minHeight: "280px" }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700/70">
                    {fact.id === factOfDay.id && filter === "All"
                      ? "Fact of the Day"
                      : fact.category}
                  </p>
                  <span className="mt-4 text-6xl sm:text-7xl">{fact.icon}</span>
                  <h2 className="mt-5 text-center text-xl font-bold text-slate-900 sm:text-2xl">
                    {fact.title}
                  </h2>
                  <p className="mt-4 text-xs font-semibold text-slate-400">
                    Tap to reveal
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{ minHeight: "280px" }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    {fact.category}
                  </p>
                  <p className="mt-4 text-center text-base leading-relaxed text-slate-700 sm:text-lg">
                    {fact.fact}
                  </p>
                  <p className="mt-6 text-xs font-semibold text-slate-400">
                    Tap to flip back
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-semibold tabular-nums text-slate-500">
                {safeIndex + 1} / {total}
              </p>
              <button
                type="button"
                onClick={randomFact}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:underline"
              >
                <Shuffle size={12} />
                Random
              </button>
            </div>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      ) : (
        <p className="py-16 text-center text-sm text-slate-500">
          No facts in this category yet.
        </p>
      )}
    </div>
  );
}