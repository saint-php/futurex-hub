import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Mail,
  Volume2,
  Moon,
  Shield,
  Loader2,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useTheme, type ThemeMode } from "../context/ThemeContext";
import { useUserProfile } from "../hooks/useUserProfile";
import {
  updateUserPreferences,
  ensureUserDefaults,
} from "../services/userService";
import {
  defaultPreferences,
  type UserPreferences,
} from "../types/user";

type ToggleKey = keyof Omit<UserPreferences, "theme">;

const toggleItems: {
  key: ToggleKey;
  label: string;
  description: string;
  icon: typeof Bell;
}[] = [
  {
    key: "emailNotifications",
    label: "Email notifications",
    description: "Receive important updates by email",
    icon: Mail,
  },
  {
    key: "pushNotifications",
    label: "Push notifications",
    description: "Browser alerts for rewards and reminders",
    icon: Bell,
  },
  {
    key: "studyReminders",
    label: "Study reminders",
    description: "Daily reminder to keep your learning streak",
    icon: Bell,
  },
  {
    key: "weeklyReport",
    label: "Weekly progress report",
    description: "Receive your weekly learning summary",
    icon: Mail,
  },
  {
    key: "soundEffects",
    label: "Sound effects",
    description: "Play sounds for quizzes and rewards",
    icon: Volume2,
  },
  {
    key: "reduceMotion",
    label: "Reduce motion",
    description: "Reduce animations throughout the app",
    icon: Moon,
  },
];

function Toggle({
  on,
  disabled,
  onChange,
}: {
  on: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 rounded-full transition ${
        on ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
      } disabled:opacity-50`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
          on ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();
  const { theme, setTheme } = useTheme();

  const [prefs, setPrefs] =
    useState<UserPreferences>(defaultPreferences);

  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] =
    useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    void ensureUserDefaults(user.uid);
  }, [user]);

  useEffect(() => {
    if (profile?.preferences) {
      setPrefs({
        ...defaultPreferences,
        ...profile.preferences,
      });

      // Keep the live theme in sync with whatever was last saved for this
      // account (e.g. after logging in on a new device).
      if (profile.preferences.theme) {
        setTheme(profile.preferences.theme);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  async function patch(
    partial: Partial<UserPreferences>
  ) {
    if (!user) return;

    const previous = prefs;

    const next = {
      ...prefs,
      ...partial,
    };

    setPrefs(next);
    setSaving(true);
    setSavedMsg(null);

    try {
      await updateUserPreferences(user.uid, partial);

      setSavedMsg("Saved");

      setTimeout(() => {
        setSavedMsg(null);
      }, 1500);
    } catch {
      setPrefs(previous);
      setSavedMsg("Could not save");
    } finally {
      setSaving(false);
    }
  }

  function handleThemeChange(nextTheme: ThemeMode) {
    // Apply immediately so the UI updates even if the user isn't signed in
    // yet or the Firestore write is still in flight.
    setTheme(nextTheme);
    void patch({ theme: nextTheme });
  }

  async function handleSignOut() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Settings
            </h1>

            <p className="text-slate-500 dark:text-slate-400">
              Notifications, preferences and account.
            </p>
          </div>

          {(saving || savedMsg) && (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {saving ? "Saving..." : savedMsg}
            </span>
          )}
        </div>
      </div>

      {loading && !profile ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-blue-600"
            size={30}
          />
        </div>
      ) : (
        <>
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-slate-900 dark:text-slate-50">
                Preferences
              </h2>
            </div>

            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {toggleItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li
                    key={item.key}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                      <Icon size={18} className="text-slate-700 dark:text-slate-200" />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-50">
                        {item.label}
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>

                    <Toggle
                      on={prefs[item.key]}
                      disabled={saving}
                      onChange={(value) =>
                        patch({
                          [item.key]: value,
                        })
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-slate-900 dark:text-slate-50">
                Appearance
              </h2>
            </div>

            <div className="flex gap-2 p-5">
              {(["light", "dark", "system"] as const).map(
                (mode) => (
                  <button
                    key={mode}
                    disabled={saving}
                    onClick={() => handleThemeChange(mode)}
                    className={`flex-1 rounded-xl px-4 py-3 font-semibold capitalize transition-colors ${
                      theme === mode
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {mode}
                  </button>
                )
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="font-bold text-slate-900 dark:text-slate-50">
                Account
              </h2>
            </div>

            <div className="p-2">
              <button
                onClick={() =>
                  navigate("/dashboard/profile")
                }
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Shield size={18} />
                View Profile
              </button>

              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}