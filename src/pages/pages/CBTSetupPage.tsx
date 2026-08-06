import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Clock, ListChecks } from "lucide-react";

import { courses } from "../data/coursesData";
import {
  buildCbtSession,
  countTopics,
  getMaxQuestions,
  maxQuestionsPerTopic,
} from "../services/cbtService";
import { MAX_SUBJECTS } from "../types/cbt";

export default function CBTSetupPage() {
  const navigate = useNavigate();

  const [subjectIds, setSubjectIds] = useState<string[]>(["english"]);
  const [questionsPerTopic, setQuestionsPerTopic] = useState(5);
  const [durationMinutes, setDurationMinutes] = useState(20);

  const topicCount = countTopics(subjectIds);
  const maxCap = getMaxQuestions(subjectIds);
  const maxPerTopic = maxQuestionsPerTopic(subjectIds);
  const effectivePerTopic = Math.min(questionsPerTopic, maxPerTopic);
  const totalQuestions = Math.min(
    topicCount * effectivePerTopic,
    maxCap
  );

  const canStart = subjectIds.length > 0 && totalQuestions > 0;

  function toggleSubject(subjectId: string) {
    setSubjectIds((prev) => {
      const isSelected = prev.includes(subjectId);

      // English stays selected by default but can be turned off deliberately.
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
      })),
    []
  );

  function startTest() {
    const questions = buildCbtSession(subjectIds, effectivePerTopic);
    if (questions.length === 0) return;

    navigate("/dashboard/cbt/quiz", {
      state: {
        questions,
        durationMinutes,
        subjectIds,
      },
    });
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
              Choose your subjects and settings, then sit a timed,
              exam-style test.
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
                  <p className="text-sm font-bold text-slate-900">
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {s.topics} topic{s.topics === 1 ? "" : "s"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400">
          English is selected by default. You can pick up to{" "}
          {MAX_SUBJECTS} subjects.
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
        <p className="text-xs text-slate-500">
          {topicCount} topic{topicCount === 1 ? "" : "s"} selected ×{" "}
          {effectivePerTopic} question{effectivePerTopic === 1 ? "" : "s"} ={" "}
          <span className="font-semibold text-slate-700">
            {totalQuestions} questions
          </span>{" "}
          (max {maxCap}
          {maxCap === 60 ? " — English only" : ""})
        </p>
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
        Start test ({totalQuestions} questions)
      </button>
    </div>
  );
}
