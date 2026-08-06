import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  addCoins,
  addXP,
  completeLesson,
  learnWord,
} from "../services/progressService";

export default function QuizResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();

  const score = state?.score ?? 0;
  const total = state?.total ?? 0;

  const percentage =
    total === 0
      ? 0
      : Math.round((score / total) * 100);

  const [rewarded, setRewarded] = useState(false);

  useEffect(() => {
    async function rewardUser() {
      if (!user || rewarded) return;

      if (percentage >= 60) {
        await addXP(user.uid, 50);
        await addCoins(user.uid, 20);
        await completeLesson(user.uid);

        for (let i = 0; i < total; i++) {
          await learnWord(user.uid);
        }
      }

      setRewarded(true);
    }

    rewardUser();
  }, [user, rewarded, percentage, total]);

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow">

      <h1 className="text-4xl font-black">
        🎉 Quiz Complete
      </h1>

      <p className="mt-8 text-6xl font-black text-blue-600">
        {percentage}%
      </p>

      <p className="mt-3 text-xl">
        {score} / {total} Correct
      </p>

      {percentage >= 60 ? (
        <div className="mt-8 rounded-2xl bg-green-50 p-6">

          <h2 className="text-2xl font-bold text-green-700">
            Rewards Earned
          </h2>

          <div className="mt-5 space-y-2">

            <p>⭐ +50 XP</p>

            <p>🪙 +20 Coins</p>

            <p>📚 Lesson Completed</p>

          </div>

        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-red-50 p-6">

          <h2 className="text-2xl font-bold text-red-700">
            Keep Practicing!
          </h2>

          <p className="mt-3">
            Score at least 60% to earn rewards.
          </p>

        </div>
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-10 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
      >
        Back to Dashboard
      </button>

    </div>
  );
}