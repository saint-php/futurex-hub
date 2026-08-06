import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getGeneralWords } from "../../data/vocabulary";

export default function GeneralWords() {
  const navigate = useNavigate();
  const words = getGeneralWords(6);

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            General Words
          </h2>
          <p className="mt-1 truncate text-sm text-slate-500">
            Expand your vocabulary every day.
          </p>
        </div>
        <Link
          to="/dashboard/vocabulary/category/general"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:gap-2.5 hover:text-blue-700"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {words.map((w) => (
          <article
            key={w.id}
            className="group flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-lg font-bold tracking-tight text-slate-900">
                {w.word}
              </h3>
              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                {w.difficulty}
              </span>
            </div>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
              {w.meaning}
            </p>
            <button
              type="button"
              onClick={() =>
                navigate(`/dashboard/vocabulary/word/${w.id}`)
              }
              className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-blue-600 transition group-hover:gap-2.5"
            >
              Learn Word
              <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}