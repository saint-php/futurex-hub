import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { vocabularyLessons } from "../data/vocabularyLessons";

export default function VocabularyLessonsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const lessons = vocabularyLessons.filter(
    (lesson) => lesson.category === categoryId
  );

  return (
    <div className="space-y-8">

      <div>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold capitalize">
          {categoryId}
        </h1>

        <p className="mt-2 text-slate-500">
          Select a lesson to begin learning.
        </p>
      </div>

      <div className="space-y-4">

        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div>

              <h2 className="text-xl font-bold">
                {lesson.title}
              </h2>

              <div className="mt-2 flex gap-6 text-sm text-slate-500">

                <span>{lesson.words} Words</span>

                <span>{lesson.xp} XP</span>

                <span>{lesson.difficulty}</span>

              </div>

            </div>

            <button
  onClick={() =>
    navigate(`/dashboard/vocabulary/lesson/${lesson.id}`)
  }
  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
>
  Start

  <ChevronRight size={18} />
</button>

          </div>
        ))}

      </div>

    </div>
  );
}