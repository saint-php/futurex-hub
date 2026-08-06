import { useState } from "react";
import { vocabulary, type VocabWord } from "./data";

const QUESTION_COUNT = 10;

interface Question {
  word: VocabWord;
  options: string[];
  correct: string;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuiz(): Question[] {
  const chosen = shuffle(vocabulary).slice(0, QUESTION_COUNT);
  return chosen.map((word) => {
    const wrongOptions = shuffle(
      vocabulary.filter((w) => w.id !== word.id)
    )
      .slice(0, 3)
      .map((w) => w.meaning);
    return {
      word,
      options: shuffle([word.meaning, ...wrongOptions]),
      correct: word.meaning,
    };
  });
}

type Props = {
  onComplete: (correct: number, total: number) => void;
};

export default function QuizTab({ onComplete }: Props) {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuiz());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function selectAnswer(option: string) {
    if (selected) return;
    setSelected(option);
    const correct = option === q.correct;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        const finalScore = score + (correct ? 1 : 0);
        onComplete(finalScore, questions.length);
        setFinished(true);
      }
    }, 1200);
  }

  function restart() {
    setQuestions(buildQuiz());
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-5xl font-black text-blue-600">{percentage}%</p>
        <h3 className="mt-4 text-xl font-bold text-slate-900">Quiz Complete!</h3>
        <p className="mt-2 text-slate-500">
          You got {score} out of {questions.length} correct
        </p>
        <button
          onClick={restart}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">
            Question {current + 1} of {questions.length}
          </span>
          <span className="font-bold text-blue-600">Score: {score}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="mb-6 text-3xl font-black text-slate-900">{q.word.word}</h2>
        <div className="space-y-3">
          {q.options.map((opt) => {
            const isCorrect = opt === q.correct;
            const isSelected = opt === selected;
            const showState = selected !== null;
            return (
              <button
                key={opt}
                onClick={() => selectAnswer(opt)}
                disabled={showState}
                className={[
                  "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                  !showState && "border-slate-200 hover:border-blue-400 hover:bg-blue-50",
                  showState && isCorrect && "border-green-500 bg-green-50 text-green-700",
                  showState && isSelected && !isCorrect && "border-red-400 bg-red-50 text-red-600",
                  showState && !isSelected && !isCorrect && "border-slate-200 opacity-50",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
