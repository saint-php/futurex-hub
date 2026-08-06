import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { rewardQuizSuccess } from "../services/progressService";

type ResultState = {
  score?: number;
  total?: number;
  categoryId?: string;
  categoryTitle?: string;
  source?: string;
};

export default function VocabularyQuizResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: ResultState };
  const { user } = useAuth();

  const score = state?.score ?? 0;
  const total = state?.total ?? 0;
  const categoryTitle = state?.categoryTitle ?? "Quiz";

  const percentage =
    total === 0 ? 0 : Math.round((score / total) * 100);

  const passed = percentage >= 60;
  const [rewarded, setRewarded] = useState(false);
  const [rewarding, setRewarding] = useState(false);

  useEffect(() => {
    async function run() {
      if (!user || rewarded || rewarding) return;
      if (!passed) {
        setRewarded(true);
        return;
      }

      setRewarding(true);
      try {
        await rewardQuizSuccess(user.uid, {
          xp: 50,
          coins: 20,
          wordsLearned: score,
          markLessonComplete: true,
        });
      } catch (err) {
        console.error("Failed to apply rewards", err);
      } finally {
        setRewarded(true);
        setRewarding(false);
      }
    }

    run();
  }, [user, rewarded, rewarding, passed, score]);

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
        {categoryTitle}
      </p>
      <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
        {passed ? "🎉 Quiz Complete" : "Keep Going"}
      </h1>

      <p className="mt-8 text-6xl font-black text-blue-600">{percentage}%</p>
      <p className="mt-2 text-lg text-slate-600">
        {score} / {total} correct
      </p>

      {passed ? (
        <div className="mt-8 rounded-2xl bg-green-50 p-6 text-left">
          <h2 className="text-lg font-bold text-green-800">Rewards earned</h2>
          {rewarding ? (
            <p className="mt-3 text-sm text-green-700">Applying rewards…</p>
          ) : (
            <ul className="mt-3 space-y-1.5 text-sm font-medium text-green-800">
              <li>⭐ +50 XP</li>
              <li>🪙 +20 Coins</li>
              <li>📚 Lesson completed</li>
              <li>📖 +{score} words reinforced</li>
              <li>🔥 Streak updated</li>
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-800">Almost there</h2>
          <p className="mt-2 text-sm text-amber-900/80">
            Score at least 60% to earn XP, coins, and streak credit. Review the
            flashcards and try again.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {state?.categoryId && (
          <button
            type="button"
            onClick={() =>
              navigate(`/dashboard/vocabulary/quiz/${state.categoryId}`)
            }
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Retake Quiz
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate("/dashboard/vocabulary")}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          Back to Vocabulary
        </button>
      </div>
    </div>
  );
}
