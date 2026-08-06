// src/pages/StoryCategoryPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StoryHeader from "../components/stories/StoryHeader";
import StoryCard from "../components/stories/StoryCard";
import {
  fetchStoriesByCategory,
  fetchCategories,
} from "../services/storyService";
import type { Story } from "../data/stories";
import type { StoryCategory } from "../data/storyCategories";

export default function StoryCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [stories, setStories] = useState<Story[]>([]);
  const [category, setCategory] = useState<
    (StoryCategory & { numberOfStories: number }) | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    Promise.all([
      fetchStoriesByCategory(categoryId),
      fetchCategories(),
    ]).then(([storyList, cats]) => {
      setStories(storyList);
      setCategory(cats.find((c) => c.id === categoryId) ?? null);
      setLoading(false);
    });
  }, [categoryId]);

  if (!categoryId) {
    return <p className="text-center text-slate-500">Category not found.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <StoryHeader
        title={category?.title ?? categoryId}
        subtitle={category?.description}
        onBack={() => navigate("/dashboard/stories")}
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : stories.length === 0 ? (
        <p className="py-16 text-center text-slate-500">
          No stories in this category yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}