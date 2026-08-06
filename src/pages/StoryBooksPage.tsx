// src/pages/StoryBooksPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import StoryCategoryCard from "../components/stories/StoryCategoryCard";
import { fetchCategories } from "../services/storyService";
import type { StoryCategory } from "../data/storyCategories";

export default function StoryBooksPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<
    (StoryCategory & { numberOfStories: number })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Story Books
            </h1>
            <p className="text-sm text-slate-500">
              Read. Learn. Grow — one story at a time
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <StoryCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-800">
        <strong>Tip:</strong> Finish a story to earn XP and coins. Keep a
        reading streak going for bonus rewards!
      </div>
    </div>
  );
}