// src/pages/ClubCategoryPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClubHeader from "../components/clubs/ClubHeader";
import ClubIdeaCard from "../components/clubs/ClubIdeaCard";
import {
  fetchIdeasByCategory,
  fetchClubCategories,
} from "../services/clubService";
import type { ClubIdea } from "../data/clubs";
import type { ClubCategory } from "../data/clubCategories";

export default function ClubCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [ideas, setIdeas] = useState<ClubIdea[]>([]);
  const [category, setCategory] = useState<
    (ClubCategory & { numberOfIdeas: number }) | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    Promise.all([
      fetchIdeasByCategory(categoryId),
      fetchClubCategories(),
    ]).then(([ideaList, cats]) => {
      setIdeas(ideaList);
      setCategory(cats.find((c) => c.id === categoryId) ?? null);
      setLoading(false);
    });
  }, [categoryId]);

  if (!categoryId) {
    return <p className="text-center text-slate-500">Category not found.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <ClubHeader
        title={category?.title ?? categoryId}
        subtitle={category?.description}
        onBack={() => navigate("/dashboard/clubs")}
      />

      {/* ===== VOICE STUDIO BUTTON (only shows in Music category) ===== */}
      {categoryId === "music" && (
        <div className="mb-2">
          <button
            onClick={() => navigate("/dashboard/clubs/music/studio")}
            className="flex w-full items-center justify-between rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-5 text-left shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-2xl text-white">
                🎤
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Voice Studio</h3>
                <p className="text-sm text-slate-600">
                  Record your voice, listen, and download
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-violet-600">
              Open →
            </span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : ideas.length === 0 ? (
        <p className="py-16 text-center text-slate-500">
          No ideas in this category yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {ideas.map((idea) => (
            <ClubIdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}