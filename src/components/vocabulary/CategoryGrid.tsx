import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { vocabularyCategories } from "../../data/vocabularyCategories";
import { liveWordCount } from "../../data/countHelpers";

export default function CategoryGrid() {
  const navigate = useNavigate();

  const categories = vocabularyCategories.filter(
    (c) => c.type !== "exam" && !c.featured
  );

  if (categories.length === 0) return null;

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Browse by Category
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Pick a topic and start learning with focused lessons.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((cat) => {
          const count = liveWordCount(cat.id, cat.title);

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                navigate(`/dashboard/vocabulary/category/${cat.id}`)
              }
              className="group flex min-w-0 items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-5"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${cat.color}`}
              >
                {cat.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate font-bold text-slate-900 group-hover:text-blue-600">
                    {cat.title}
                  </h3>
                  <ChevronRight
                    size={16}
                    className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
                  />
                </div>
                <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-slate-500">
                  {cat.description}
                </p>
                <p className="mt-2 truncate text-xs font-semibold tabular-nums text-slate-400">
                  {count.toLocaleString()} word{count === 1 ? "" : "s"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}