import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, RotateCcw, LayoutDashboard } from "lucide-react";

interface LocationState {
  score: number;
  total: number;
  subjectIds: string[];
}

export default function CBTResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-slate-500">No result to show.</p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/cbt")}
          className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
        >
          Take a CBT test
        </button>
      </div>
    );
  }

  const { score, total } = state;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="mx-auto max-w-xl">
      <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
          <Trophy size={26} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {score}/{total} ({percent}%)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {percent >= 70
              ? "Excellent work — keep it up!"
              : percent >= 50
              ? "Good effort — a bit more practice will help."
              : "Keep practicing, you'll improve with each attempt."}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate("/dashboard/cbt")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-green-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-green-500 hover:to-emerald-700 active:scale-[0.98]"
          >
            <RotateCcw size={15} />
            Take another test
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <LayoutDashboard size={15} />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
