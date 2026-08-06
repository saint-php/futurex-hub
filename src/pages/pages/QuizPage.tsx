import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { quizQuestions } from "../data/quizQuestions";

export default function QuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const questions = useMemo(
    () =>
      quizQuestions.filter(
        (question) => question.lessonId === lessonId
      ),
    [lessonId]
  );

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          No quiz found.
        </h1>
      </div>
    );
  }

  const question = questions[current];

  function answer(option: string) {
    let newScore = score;

    if (option === question.answer) {
      newScore++;
      setScore(newScore);
    }

    if (current === questions.length - 1) {
      navigate("/dashboard/quiz-result", {
        state: {
          score: newScore,
          total: questions.length,
        },
      });

      return;
    }

    setCurrent(current + 1);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <div className="flex justify-between">

        <p>
          Question {current + 1}
        </p>

        <p>
          {questions.length} Questions
        </p>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8">

        <h1 className="text-2xl font-bold">
          {question.question}
        </h1>

        <div className="mt-8 space-y-4">

          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => answer(option)}
              className="w-full rounded-xl border border-slate-300 p-4 text-left transition hover:border-blue-600 hover:bg-blue-50"
            >
              {option}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}