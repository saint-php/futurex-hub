import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, GraduationCap } from "lucide-react";

import {
  fetchCourses,
  type MergedCourse,
} from "../services/mergedCourseService";
import { useUserProfile } from "../hooks/useUserProfile";

export default function StudyOnlinePage() {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const readTopics = new Set(profile?.readTopics ?? []);

  const [courses, setCourses] = useState<MergedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCourses()
      .then((list) => {
        if (!cancelled) setCourses(list);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Dashboard
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-sm">
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Study Courses
            </h1>
            <p className="text-sm text-slate-500">
              Pick a course, work through its topics, and check your
              understanding as you go.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((course) => {
            const totalTopics = course.topics.length;
            const readCount = course.topics.filter((t) =>
              readTopics.has(t.id)
            ).length;

            return (
              <button
                key={course.id}
                type="button"
                onClick={() =>
                  navigate(`/dashboard/study-online/${course.id}`)
                }
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${course.gradient} text-xl text-white shadow-sm`}
                  >
                    <span>{course.icon}</span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {totalTopics} topic{totalTopics === 1 ? "" : "s"}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-blue-700">
                  {course.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-snug text-slate-600">
                  {course.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>
                    {readCount}/{totalTopics} read
                  </span>
                  <span className="inline-flex items-center gap-1 text-blue-600">
                    Open
                    <ChevronRight size={14} className="opacity-60" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}