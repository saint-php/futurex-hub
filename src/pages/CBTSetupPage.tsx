import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Clock, ListChecks } from "lucide-react";

import {
  buildCbtSession,
  getMaxQuestionsForSubject,
  maxQuestionsPerTopic,
  subjectQuestionCount,
  totalQuestionCount,
} from "../services/cbtService";
import {
  getCoursesCached,
  type MergedCourse,
} from "../services/mergedCourseService";
import { MAX_SUBJECTS } from "../types/cbt";

export default function CBTSetupPage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<MergedCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [subjectIds, setSubjectIds] = useState<string[]>(["english"]);
  const [questionsPerTopic, setQuestionsPerTopic] = useState(5);
  const [durationMinutes, setDurationMinutes] = useState(20);

  const [maxPerTopic, setMaxPerTopic] = useState(5);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [perSubjectCounts, setPerSubjectCounts] = useState<
    Record<string, number>
  >({});
  const [starting, setStarting] = useState(false);

  // Load static + Firestore courses
  useEffect(() => {
    let cancelled = false;
    getCoursesCached()
      .then((list) => {
        if (!cancelled) setCourses(list);
      })
      .finally(() => {
        if (!cancelled) setLoadingCourses(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const effectivePerTopic = Math.min(questionsPerTopic, maxPerTopic);

  // Recompute limits whenever subjects or slider change
  useEffect(() => {
    let cancelled = false;

    async function recompute() {
      if (subjectIds.length === 0) {
        if (!cancelled) {
          setMaxPerTopic(5);
          setTotalQuestions(0);
          setPerSubjectCounts({});
        }
        return;
      }

      const max = await maxQuestionsPerTopic(subjectIds);
      const effective = Math.min(questionsPerTopic, max);
      const total = await totalQuestionCount(subjectIds, effective);

      const counts: Record<string, number> = {};
      await Promise.all(
        subjectIds.map(async (id) => {
          counts[id] = await subjectQuestionCount(id, effective);
        })
      );

      if (!cancelled) {
        setMaxPerTopic(max);
        setTotalQuestions(total);
        setPerSubjectCounts(counts);
      }
    }

    recompute();
    return () => {
      cancelled = true;
    };
  }, [subjectIds, questionsPerTopic, courses]);

  const canStart = subjectIds.length > 0 && totalQuestions > 0 && !starting;

  function toggleSubject(subjectId: string) {
    setSubjectIds((prev) => {
      const isSelected = prev.includes(subjectId);
      if (isSelected) {
        return prev.filter((id) => id !== subjectId);
      }
      if (prev.length >= MAX_SUBJECTS) return prev;
      return [...prev, subjectId];
    });
  }

  const subjectOptions = useMemo(
    () =>
      courses.map((c) => ({
        subjectId: c.subjectId,
        title: c.title,
        icon: c.icon,
        gradient: c.gradient,
        topics: c.topics.length,
        cap: getMaxQuestionsForSubject(c.subjectId),
      })),
    [courses]
  );

  const selectedBreakdown = subjectOptions.filter((s) =>
    subjectIds.includes(s.subjectId)
  );

  async function startTest() {
    setStarting(true);
    try {
      const questions = await buildCbtSession(subjectIds, effectivePerTopic);
      if (questions.length === 0) {
        setStarting(false);
        return;
      }

      navigate("/dashboard/cbt/quiz", {
        state: {
          questions,
          durationMinutes,
          subjectIds,
        },
      });
    } catch (err) {
      console.error(err);
      setStarting(false);
    }
  }

  if (loadingCourses) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-sm">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              CBT Practice
            </h1>
            <p className="text-sm text-slate-500">
              Choose your subjects and time, then start your test.
            </p>
          </div>
        </div>
      </div>

      {/* Subject selection */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Subjects
          </h2>
          <span className="text-xs font-semibold text-slate-400">
            {subjectIds.length}/{MAX_SUBJECTS} selected
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {subjectOptions.map((s) => {
            const isSelected = subjectIds.includes(s.subjectId);
            const disabled =
              !isSelected && subjectIds.length >= MAX_SUBJECTS;
            return (
              <button
                key={s.subjectId}
                type="button"
                onClick={() => toggleSubject(s.subjectId)}
                disabled={disabled}
                className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  isSelected
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-base text-white`}
                >
                  <span>{s.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{s.title}</p>
                  <p className="text-xs text-slate-500">
                    {s.topics} topic{s.topics === 1 ? "" : "s"} · max {s.cap}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {subjectOptions.length === 0 && (
          <p className="text-sm text-slate-400">
            No courses found. Add courses in Admin or keep seed data in
            coursesData.
          </p>
        )}
        <p className="text-xs text-slate-400">
          English is selected by default. You can pick up to {MAX_SUBJECTS}{" "}
          subjects. English allows up to 60 questions; every other subject
          allows up to 40.
        </p>
      </section>

      {/* Questions per topic */}
      <section className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <ListChecks size={16} className="text-blue-600" />
          Questions per topic
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={5}
            value={effectivePerTopic}
            onChange={(e) => setQuestionsPerTopic(Number(e.target.value))}
            className="flex-1 accent-blue-600"
          />
          <span className="w-8 text-center text-sm font-bold text-slate-900">
            {effectivePerTopic}
          </span>
        </div>

        {selectedBreakdown.length > 0 && (
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            {selectedBreakdown.map((s) => (
              <div
                key={s.subjectId}
                className="flex items-center justify-between text-xs text-slate-500"
              >
                <span>{s.title}</span>
                <span className="font-semibold text-slate-700">
                  {perSubjectCounts[s.subjectId] ?? 0} question
                  {(perSubjectCounts[s.subjectId] ?? 0) === 1 ? "" : "s"}{" "}
                  <span className="font-normal text-slate-400">
                    (max {s.cap})
                  </span>
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-sm font-bold text-slate-900">
              <span>Total</span>
              <span>{totalQuestions} questions</span>
            </div>
          </div>
        )}
      </section>

      {/* Duration */}
      <section className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Clock size={16} className="text-blue-600" />
          Time allowed
        </div>
        <div className="flex flex-wrap gap-2">
          {[10, 20, 30, 45, 60].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setDurationMinutes(mins)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                durationMinutes === mins
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {mins} min
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={startTest}
        disabled={!canStart}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-green-500 to-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:from-green-500 hover:to-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {starting
          ? "Preparing test…"
          : `Start CBT (${totalQuestions} questions)`}
      </button>
    </div>
  );
}