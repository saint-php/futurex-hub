import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, PartyPopper } from "lucide-react";

import { getTopic } from "../data/coursesData";
import { useAuth } from "../context/AuthContext";
import { markTopicRead } from "../services/courseProgressService";

type Stage = "notes" | "quiz" | "done";

export default function TopicPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courseId, topicId } = useParams<{
    courseId: string;
    topicId: string;
  }>();

  const found = courseId && topicId ? getTopic(courseId, topicId) : undefined;

  const [stage, setStage] = useState<Stage>("notes");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [saving, setSaving] = useState(false);

  const paragraphs = useMemo(
    () => found?.topic.notes.split("\n\n") ?? [],
    [found]
  );

  if (!found) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-slate-500">Topic not found.</p>
        <Link
          to="/dashboard/study-online"
          className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
        >
          Back to Study Courses
        </Link>
      </div>
    );
  }

  const { course, topic } = found;
  const question = topic.questions[qIndex];

  async function finishTopic(finalCorrect: number) {
    setSaving(true);
    if (user) {
      try {
        await markTopicRead(user.uid, topic.id);
      } catch {
        // Non-fatal: the user can still see their notes/questions.
      }
    }
    setCorrectCount(finalCorrect);
    setSaving(false);
    setStage("done");
  }

  function selectOption(option: string) {
    if (selected) return; // lock after first pick
    setSelected(option);
  }

  function nextQuestion() {
    const wasCorrect = selected === question.answer;
    const newCorrect = correctCount + (wasCorrect ? 1 : 0);

    if (qIndex + 1 < topic.questions.length) {
      setCorrectCount(newCorrect);
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      finishTopic(newCorrect);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate(`/dashboard/study-online/${course.id}`)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          {course.title}
        </button>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {topic.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{topic.summary}</p>
      </div>

      {stage === "notes" && (
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStage("quiz")}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:from-blue-500 hover:to-blue-700 active:scale-[0.98]"
          >
            I've read this — start the 5 questions
          </button>
        </div>
      )}

      {stage === "quiz" && question && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>
              Question {qIndex + 1} of {topic.questions.length}
            </span>
            <div className="flex gap-1">
              {topic.questions.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full ${
                    i <= qIndex ? "bg-blue-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-base font-semibold text-slate-900">
              {question.question}
            </p>
            <div className="mt-5 space-y-2.5">
              {question.options.map((option) => {
                const isSelected = selected === option;
                const isAnswer = option === question.answer;
                const showState = selected !== null;

                let stateClasses =
                  "border-slate-200 bg-white hover:border-slate-300";
                if (showState && isAnswer) {
                  stateClasses = "border-emerald-400 bg-emerald-50";
                } else if (showState && isSelected && !isAnswer) {
                  stateClasses = "border-red-300 bg-red-50";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectOption(option)}
                    disabled={selected !== null}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium text-slate-700 transition disabled:cursor-default ${stateClasses}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={nextQuestion}
            disabled={selected === null || saving}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:from-blue-500 hover:to-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {qIndex + 1 < topic.questions.length
              ? "Next question"
              : "Finish topic"}
          </button>
        </div>
      )}

      {stage === "done" && (
        <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <PartyPopper size={26} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              You got {correctCount}/{topic.questions.length} right
            </h2>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-500">
              <CheckCircle2 size={14} className="text-emerald-500" />
              This topic is now marked as read
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/study-online/${course.id}`)}
              className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to {course.title}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/study-online")}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              All courses
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
