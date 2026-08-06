import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { vocabulary } from "./data";
import WordCard from "./WordCard";

const CATEGORIES = ["UTME", "WAEC", "NECO", "IELTS", "TOEFL", "SAT", "GRE"];
const WORDS_PER_PAGE = 12;

type Props = {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
};

export default function BrowseTab({ favorites, onToggleFavorite }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return vocabulary.filter((w) => {
      const matchesSearch =
        !q ||
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.example.toLowerCase().includes(q) ||
        w.synonym.toLowerCase().includes(q);
      const matchesCategory = !category || w.category === category;
      const matchesDifficulty = !difficulty || w.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, category, difficulty]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / WORDS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageWords = filtered.slice(
    (currentPage - 1) * WORDS_PER_PAGE,
    currentPage * WORDS_PER_PAGE
  );

  function updateFilter(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => updateFilter(setSearch, e.target.value)}
            placeholder="Search words, meanings, or examples..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => updateFilter(setCategory, e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(e) => updateFilter(setDifficulty, e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {pageWords.length === 0 ? (
        <p className="py-12 text-center text-slate-400">
          No words match your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              isFavorite={favorites.includes(word.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
