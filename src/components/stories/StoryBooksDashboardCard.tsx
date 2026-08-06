
// src/components/stories/StoryBooksDashboardCard.tsx
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";

export default function StoryBooksDashboardCard() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard/stories")}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
          <BookOpen size={20} />
        </div>
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">
          New
        </span>
      </div>

      <h3 className="relative mt-4 text-base font-bold text-slate-900 group-hover:text-violet-700">
        Story Books
      </h3>
      <p className="relative mt-1 text-sm leading-snug text-slate-600">
        Read inspiring stories and earn XP
      </p>

      <div className="relative mt-4 flex items-center gap-1 text-sm font-semibold text-violet-600">
        Open library
        <ChevronRight
          size={16}
          className="transition group-hover:translate-x-0.5"
        />
      </div>
    </button>
  );
}