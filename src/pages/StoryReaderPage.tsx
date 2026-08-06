// src/pages/StoryReaderPage.tsx
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  Star,
  Coins,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import ReadingProgress from "../components/stories/ReadingProgress";
import {
  fetchStoryById,
  fetchStoriesByCategory,
} from "../services/storyService";
import type { Story } from "../data/stories";
import { useAuth } from "../context/AuthContext";
import {
  addXP,
  addCoins,
  updateStreak,
} from "../services/progressService";

export default function StoryReaderPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [story, setStory] = useState<Story | null>(null);
  const [siblings, setSiblings] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [rewarded, setRewarded] = useState(false);
  const [rewarding, setRewarding] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const hasRewardedRef = useRef(false);

  useEffect(() => {
    if (!storyId) return;
    hasRewardedRef.current = false;
    setFinished(false);
    setRewarded(false);
    setProgress(0);

    fetchStoryById(storyId).then(async (s) => {
      setStory(s);
      if (s) {
        const list = await fetchStoriesByCategory(s.category);
        setSiblings(list);
      }
      setLoading(false);
    });
  }, [storyId]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = Math.round(
        (scrollTop / (scrollHeight - clientHeight || 1)) * 100
      );
      setProgress(pct);
      if (pct >= 92) setFinished(true);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [story]);

  useEffect(() => {
    async function giveRewards() {
      if (!user || !story || !finished || hasRewardedRef.current) return;

      hasRewardedRef.current = true;
      setRewarding(true);

      try {
        await updateStreak(user.uid);
        await addXP(user.uid, story.xpReward);
        await addCoins(user.uid, story.coinReward);
      } catch (err) {
        console.error("Failed to apply story rewards", err);
        hasRewardedRef.current = false;
      } finally {
        setRewarded(true);
        setRewarding(false);
      }
    }

    giveRewards();
  }, [user, story, finished]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <p className="text-slate-500">Story not found.</p>
        <button
          onClick={() => navigate("/dashboard/stories")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Story Books
        </button>
      </div>
    );
  }

  const currentIndex = siblings.findIndex((s) => s.id === story.id);
  const prevStory = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextStory =
    currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  return (
    <div className="relative mx-auto max-w-3xl">
      <ReadingProgress progress={progress} />

      <div className="sticky top-0 z-40 -mx-4 mb-6 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-2xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            className={`rounded-full p-2 transition ${
              bookmarked
                ? "bg-amber-100 text-amber-600"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            }`}
            title="Bookmark"
          >
            <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: story.title,
                  text: story.summary,
                });
              } else {
                navigator.clipboard?.writeText(window.location.href);
              }
            }}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            title="Share"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 text-5xl shadow-sm">
          {story.cover}
        </div>
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
          {story.title}
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          by {story.author}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {story.readTime}
          </span>
          <span>•</span>
          <span>{story.age}</span>
          <span>•</span>
          <span>{story.difficulty}</span>
        </div>
      </div>

      <div
        ref={contentRef}
        className="prose prose-slate mx-auto max-h-[58vh] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
        style={{ scrollBehavior: "smooth" }}
      >
        {story.story.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="mb-4 text-[17px] leading-relaxed text-slate-700 last:mb-0"
          >
            {para}
          </p>
        ))}
      </div>

      {finished && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={28} />
          </div>
          <h2 className="text-lg font-bold text-green-900">Story Complete!</h2>
          <p className="mt-1 text-sm text-green-700">
            Great job finishing this story.
          </p>

          <div className="mt-5 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-lg font-bold text-green-900">
                <Star size={18} className="text-amber-500" />
                +{story.xpReward}
              </div>
              <span className="text-xs font-medium text-green-700">XP</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-lg font-bold text-green-900">
                <Coins size={18} className="text-amber-500" />
                +{story.coinReward}
              </div>
              <span className="text-xs font-medium text-green-700">Coins</span>
            </div>
          </div>

          {rewarding && (
            <p className="mt-4 text-sm text-green-600">Applying rewards…</p>
          )}
          {rewarded && !rewarding && user && (
            <p className="mt-4 text-sm font-medium text-green-700">
              ✓ Rewards added to your account
            </p>
          )}
          {!user && (
            <p className="mt-4 text-xs text-green-600">
              Sign in to save XP, coins and streaks.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4 pb-10">
        {prevStory ? (
          <button
            type="button"
            onClick={() =>
              navigate(`/dashboard/stories/read/${prevStory.id}`)
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Previous</span>
          </button>
        ) : (
          <div />
        )}

        {nextStory ? (
          <button
            type="button"
            onClick={() =>
              navigate(`/dashboard/stories/read/${nextStory.id}`)
            }
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <span className="hidden sm:inline">Next Story</span>
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              navigate(`/dashboard/stories/${story.category}`)
            }
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Category
          </button>
        )}
      </div>
    </div>
  );
}