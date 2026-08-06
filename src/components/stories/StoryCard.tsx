// src/components/stories/StoryCard.tsx
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen } from "lucide-react";
import type { Story } from "../../data/stories";

interface Props {
  story: Story;
}

export default function StoryCard({ story }: Props) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/dashboard/stories/read/${story.id}`)}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl">{story.cover}</span>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            {story.difficulty}
          </span>
          {story.isPremium && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
              Premium
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-blue-700">
        {story.title}
      </h3>

      <p className="mt-1.5 flex-1 text-sm leading-snug text-slate-600 line-clamp-2">
        {story.summary}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {story.readTime}
        </span>
        <span className="inline-flex items-center gap-1">
          <BookOpen size={12} />
          {story.age}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold text-slate-400">
        <span>⭐ {story.xpReward} XP</span>
        <span>🪙 {story.coinReward}</span>
      </div>
    </button>
  );
}