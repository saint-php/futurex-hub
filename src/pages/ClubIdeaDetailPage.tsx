// src/pages/ClubIdeaDetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  ShieldAlert,
  CheckCircle2,
  Star,
  Coins,
  ListOrdered,
  Package,
  BookOpen,
  MessageSquare,
  Scale,
} from "lucide-react";
import { fetchIdeaById } from "../services/clubService";
import type { ClubIdea } from "../data/clubs";
import { useAuth } from "../context/AuthContext";
import { addXP, addCoins, updateStreak } from "../services/progressService";

export default function ClubIdeaDetailPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [idea, setIdea] = useState<ClubIdea | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [rewarding, setRewarding] = useState(false);
  const [rewarded, setRewarded] = useState(false);

  useEffect(() => {
    if (!ideaId) return;
    fetchIdeaById(ideaId).then((data) => {
      setIdea(data);
      setLoading(false);
    });
  }, [ideaId]);

  async function handleMarkComplete() {
    if (!user || !idea || rewarded) return;

    setRewarding(true);
    try {
      await updateStreak(user.uid);
      await addXP(user.uid, idea.xpReward);
      await addCoins(user.uid, idea.coinReward);
      setRewarded(true);
      setCompleted(true);
    } catch (err) {
      console.error("Failed to apply rewards", err);
    } finally {
      setRewarding(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <p className="text-slate-500">Idea not found.</p>
        <button
          onClick={() => navigate("/dashboard/clubs")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Club Ideas
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-12">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-4xl">
            {idea.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {idea.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{idea.summary}</p>

            <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Clock size={13} /> {idea.timeNeeded}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Users size={13} /> {idea.ageGroup}
              </span>
              <span>•</span>
              <span>{idea.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">About this idea</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          {idea.description}
        </p>
      </section>

      {/* ========== DRAMA SCRIPT ========== */}
      {idea.script && (
        <section className="rounded-2xl border border-pink-200 bg-pink-50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-pink-600" />
            <h2 className="text-lg font-bold text-pink-900">Full Script</h2>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-800 bg-white rounded-xl p-5 border border-pink-100 overflow-x-auto">
            {idea.script}
          </pre>
        </section>
      )}

      {/* ========== DEBATE GUIDE ========== */}
      {idea.debateGuide && (
        <>
          {/* Principles */}
          <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Scale size={20} className="text-indigo-600" />
              <h2 className="text-lg font-bold text-indigo-900">
                Principles of Debate
              </h2>
            </div>
            <ul className="space-y-2">
              {idea.debateGuide.principles.map((item, i) => (
                <li key={i} className="flex gap-2 text-[15px] text-indigo-950">
                  <span className="font-bold text-indigo-600">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* How to Debate */}
          <section className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={20} className="text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                How to Debate
              </h2>
            </div>
            <ol className="space-y-2">
              {idea.debateGuide.howToDebate.map((item, i) => (
                <li key={i} className="text-[15px] text-slate-700">
                  {item}
                </li>
              ))}
            </ol>
          </section>

          {/* Topics */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">
              Ready-to-Use Debate Topics
            </h2>

            {idea.debateGuide.topics.map((topic, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-slate-900">
                  Motion: “{topic.motion}”
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {topic.writeUp}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {/* Proposition */}
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                    <h4 className="font-bold text-green-800 mb-2">
                      Proposition (Support)
                    </h4>
                    <ul className="space-y-1.5 text-sm text-green-900">
                      {topic.propositionPoints.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opposition */}
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                    <h4 className="font-bold text-red-800 mb-2">
                      Opposition (Against)
                    </h4>
                    <ul className="space-y-1.5 text-sm text-red-900">
                      {topic.oppositionPoints.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {/* Steps */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ListOrdered size={20} className="text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">How to do it</h2>
        </div>
        <ol className="mt-4 space-y-3">
          {idea.steps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {index + 1}
              </span>
              <p className="pt-0.5 text-[15px] text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Materials */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-900">Materials needed</h2>
        </div>
        <ul className="mt-4 space-y-2">
          {idea.materials.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[15px] text-slate-700"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Safety */}
      <section className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert size={22} className="text-amber-600" />
          <h2 className="text-lg font-bold text-amber-900">
            Safety Precautions
          </h2>
        </div>
        <ul className="mt-4 space-y-2.5">
          {idea.safetyPrecautions.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[15px] font-medium text-amber-900"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Complete button */}
      <section className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center shadow-sm">
        {!completed ? (
          <>
            <h2 className="text-lg font-bold text-green-900">
              Ready to try this idea?
            </h2>
            <p className="mt-1 text-sm text-green-700">
              Mark it as completed to earn rewards
            </p>
            <button
              type="button"
              onClick={handleMarkComplete}
              disabled={rewarding || !user}
              className="mt-5 rounded-xl bg-green-600 px-8 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {rewarding ? "Applying rewards…" : "Mark as Completed"}
            </button>
            {!user && (
              <p className="mt-3 text-xs text-green-600">
                Sign in to earn XP and coins
              </p>
            )}
          </>
        ) : (
          <>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="text-lg font-bold text-green-900">Great job!</h2>
            <div className="mt-5 flex items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-lg font-bold text-green-900">
                  <Star size={18} className="text-amber-500" />
                  +{idea.xpReward}
                </div>
                <span className="text-xs font-medium text-green-700">XP</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-lg font-bold text-green-900">
                  <Coins size={18} className="text-amber-500" />
                  +{idea.coinReward}
                </div>
                <span className="text-xs font-medium text-green-700">Coins</span>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}