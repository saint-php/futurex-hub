// src/pages/ClubIdeasPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, ArrowLeft } from "lucide-react";
import ClubCategoryCard from "../components/clubs/ClubCategoryCard";
import { fetchClubCategories } from "../services/clubService";
import type { ClubCategory } from "../data/clubCategories";

export default function ClubIdeasPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<
    (ClubCategory & { numberOfIdeas: number })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubCategories().then((data) => {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-sm">
            <Lightbulb size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Club Ideas
            </h1>
            <p className="text-sm text-slate-500">
              Practical ideas to start and run amazing school clubs
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
            <ClubCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-900">
        <strong>Tip:</strong> Every idea includes clear steps and important
        safety precautions. Always involve a teacher when needed.
      </div>
    </div>
  );
}