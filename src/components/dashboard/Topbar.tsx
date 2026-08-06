import { useEffect, useState } from "react";
import { Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { fetchNotifications } from "../../services/notificationService";

type Props = {
  onMobileMenuToggle: () => void;
};

export default function Topbar({ onMobileMenuToggle }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(false);

  const displayName = user?.displayName || "Student";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    fetchNotifications(user.uid)
      .then((items) => {
        if (!cancelled) setHasUnread(items.some((n) => !n.read));
      })
      .catch(() => {
        // No Firestore notifications yet (or offline) — nothing to badge.
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/80 px-5 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors duration-200 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden md:block">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Today
          </p>
          <p className="text-sm font-semibold leading-tight tracking-tight text-slate-700 dark:text-slate-200">
            {today}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => navigate("/dashboard/notifications")}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <Bell size={20} />
          {hasUnread && (
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center gap-3 rounded-xl px-1 py-1 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-[0_0_0_1px_rgba(226,232,240,1)] dark:ring-slate-900 dark:shadow-[0_0_0_1px_rgba(30,41,59,1)]"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_16px_-6px_rgba(37,99,235,0.5)]">
              {initials || "FX"}
            </div>
          )}

          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{displayName}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">View profile</p>
          </div>
        </button>
      </div>
    </header>
  );
}