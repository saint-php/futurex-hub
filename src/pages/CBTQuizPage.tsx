import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

import type { CBTQuestionInstance } from "../types/cbt";

interface LocationState {
  questions: CBTQuestionInstance[];
  durationMinutes: number;
  subjectIds: string[];
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function CBTQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(
    () => (state?.durationMinutes ?? 20) * 60
  );
  const submittedRef = useRef(false);

  const questions = state?.questions ?? [];

  useEffect(() => {
    if (!state) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state]);

  useEffect(() => {
    if (state && secondsLeft === 0 && !submittedRef.current) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  if (!state || questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-slate-500">
          No CBT session found. Please set up a new test.
        </p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/cbt")}
          className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
        >
          Go to CBT setup
        </button>
      </div>
    );
  }

  const question = questions[index];

  function selectOption(option: string) {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  }

  function submit() {
    if (submittedRef.current || !state) return;
    submittedRef.current = true;

    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score += 1;
    });

    navigate("/dashboard/cbt/result", {
      replace: true,
      state: {
        score,
        total: questions.length,
        subjectIds: state.subjectIds,
      },
    });
  }

  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = index === questions.length - 1;
  const isUrgent = secondsLeft <= 60;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">CBT Practice</h1>
          <p className="text-xs text-slate-500">
            {answeredCount}/{questions.length} answered
          </p>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${
            isUrgent
              ? "bg-red-50 text-red-600"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          <Clock size={15} />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {questions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-5 rounded-full transition ${
              i === index
                ? "bg-blue-600"
                : answers[i]
                ? "bg-emerald-400"
                : "bg-slate-200"
            }`}
            aria-label={`Question ${i + 1}`}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span>{question.subjectTitle}</span>
          <span>·</span>
          <span>{question.topicTitle}</span>
        </div>
        <p className="text-base font-semibold text-slate-900">
          {index + 1}. {question.question}
        </p>
        <div className="mt-5 space-y-2.5">
          {question.options.map((option) => {
            const isSelected = answers[index] === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => selectOption(option)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  isSelected
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={submit}
            className="flex-1 rounded-2xl bg-gradient-to-b from-green-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-green-500 hover:to-emerald-700 active:scale-[0.98]"
          >
            Submit test
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            className="flex-1 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-blue-500 hover:to-blue-700 active:scale-[0.98]"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
