// src/components/clubs/ClubIdeaCard.tsx
import { useNavigate } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import type { ClubIdea } from "../../data/clubs";

interface Props {
  idea: ClubIdea;
}

export default function ClubIdeaCard({ idea }: Props) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/dashboard/clubs/idea/${idea.id}`)}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl">{idea.icon}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          {idea.difficulty}
        </span>
      </div>

      <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-blue-700">
        {idea.title}
      </h3>

      <p className="mt-1.5 flex-1 text-sm leading-snug text-slate-600 line-clamp-2">
        {idea.summary}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {idea.timeNeeded}
        </span>
        <span className="inline-flex items-center gap-1">
          <Users size={12} />
          {idea.ageGroup}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold text-slate-400">
        <span>⭐ {idea.xpReward} XP</span>
        <span>🪙 {idea.coinReward}</span>
      </div>
    </button>
  );
}