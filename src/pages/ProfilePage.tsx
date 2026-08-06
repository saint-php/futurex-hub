import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Trophy,
  Coins,
  Flame,
  BookOpen,
  CheckCircle2,
  Pencil,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useUserProfile } from "../hooks/useUserProfile";
import { updateUserFullName } from "../services/userService";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.fullName) {
      setName(profile.fullName);
    }
  }, [profile]);

  async function saveName() {
    if (!user) return;

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      await updateUserFullName(user.uid, name);

      setMessage("Name updated successfully.");
      setEditing(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const displayName =
    profile?.fullName ||
    user?.displayName ||
    "Learner";

  const email =
    profile?.email ||
    user?.email ||
    "—";

  const initial = displayName.charAt(0).toUpperCase();

  const stats = [
    {
      label: "Level",
      value: profile?.level ?? 1,
      icon: Trophy,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "XP",
      value: profile?.xp ?? 0,
      icon: CheckCircle2,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Coins",
      value: profile?.coins ?? 0,
      icon: Coins,
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      label: "Streak",
      value: profile?.streak ?? 0,
      icon: Flame,
      color: "text-orange-600 bg-orange-50",
    },
    {
      label: "Words",
      value: profile?.totalWords ?? 0,
      icon: BookOpen,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Lessons",
      value: profile?.completedLessons ?? 0,
      icon: CheckCircle2,
      color: "text-violet-600 bg-violet-50",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-slate-500">
          Your account and learning progress.
        </p>
      </div>

      {loading && !profile ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-blue-600"
            size={32}
          />
        </div>
      ) : (
        <>
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                {profile?.photoURL ? (
                  <img
                    src={profile.photoURL}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  initial
                )}
              </div>

              <div className="flex-1">
                {editing ? (
                  <>
                    <input
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                    />

                    <div className="mt-3 flex gap-2">
                      <button
                        disabled={saving}
                        onClick={saveName}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-white"
                      >
                        {saving
                          ? "Saving..."
                          : "Save"}
                      </button>

                      <button
                        onClick={() => {
                          setEditing(false);
                          setName(displayName);
                        }}
                        className="rounded-xl border px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">
                        {displayName}
                      </h2>

                      <button
                        onClick={() =>
                          setEditing(true)
                        }
                        className="text-blue-600"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-slate-500">
                      <Mail size={16} />
                      {email}
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-slate-500">
                      <User size={16} />
                      Level {profile?.level ?? 1}
                    </p>
                  </>
                )}

                {message && (
                  <p className="mt-3 text-green-600">
                    {message}
                  </p>
                )}

                {error && (
                  <p className="mt-3 text-red-600">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border bg-white p-4 shadow-sm"
                >
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="mt-3 text-2xl font-bold">
                    {stat.value.toLocaleString()}
                  </div>

                  <div className="text-sm text-slate-500">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}