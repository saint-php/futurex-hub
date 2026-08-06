import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, ChevronRight } from "lucide-react";

import { getCourse } from "../data/coursesData";
import { useUserProfile } from "../hooks/useUserProfile";

export default function CourseTopicsPage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { profile } = useUserProfile();
  const readTopics = new Set(profile?.readTopics ?? []);

  const course = courseId ? getCourse(courseId) : undefined;

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-slate-500">Course not found.</p>
        <Link
          to="/dashboard/study-online"
          className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
        >
          Back to Study Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/study-online")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Study Courses
        </button>
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${course.gradient} text-xl text-white shadow-sm`}
          >
            <span>{course.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {course.title}
            </h1>
            <p className="text-sm text-slate-500">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {course.topics.map((topic, index) => {
          const isRead = readTopics.has(topic.id);
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() =>
                navigate(`/dashboard/study-online/${course.id}/${topic.id}`)
              }
              className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-blue-700">
                  {topic.title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {topic.summary}
                </p>
              </div>
              {isRead ? (
                <CheckCircle2
                  size={20}
                  className="flex-none text-emerald-500"
                />
              ) : (
                <Circle size={20} className="flex-none text-slate-300" />
              )}
              <ChevronRight
                size={16}
                className="flex-none text-slate-300 group-hover:text-blue-500"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
