// src/components/stories/StoryCategoryCard.tsx
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { StoryCategory } from "../../data/storyCategories";

interface Props {
  category: StoryCategory & { numberOfStories: number };
}

export default function StoryCategoryCard({ category }: Props) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/dashboard/stories/${category.id}`)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${category.color}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition group-hover:opacity-10`}
      />

      <div className="relative flex items-start justify-between">
        <span className="text-3xl">{category.icon}</span>
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
          {category.numberOfStories}{" "}
          {category.numberOfStories === 1 ? "story" : "stories"}
        </span>
      </div>

      <h3 className="relative mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-700">
        {category.title}
      </h3>

      <p className="relative mt-1.5 flex-1 text-sm leading-snug text-slate-600">
        {category.description}
      </p>

      <div className="relative mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600">
        Explore
        <ChevronRight
          size={16}
          className="transition group-hover:translate-x-0.5"
        />
      </div>
    </button>
  );
}