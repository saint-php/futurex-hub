import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Flame,
  Trophy,
  Info,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notificationService";
import { demoNotifications } from "../data/demoNotifications";
import type { AppNotification } from "../types/user";

const typeIcon = {
  reward: Trophy,
  streak: Flame,
  system: Info,
  quiz: Trophy,
  tip: Lightbulb,
} as const;

const typeColor = {
  reward: "bg-amber-50 text-amber-700",
  streak: "bg-orange-50 text-orange-700",
  system: "bg-blue-50 text-blue-700",
  quiz: "bg-violet-50 text-violet-700",
  tip: "bg-emerald-50 text-emerald-700",
} as const;

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchNotifications(user.uid);
      if (data.length === 0) {
        setItems(demoNotifications);
        setUsingDemo(true);
      } else {
        setItems(data);
        setUsingDemo(false);
      }
    } catch {
      setItems(demoNotifications);
      setUsingDemo(true);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onOpen(n: AppNotification) {
    if (!user) return;

    if (!usingDemo && !n.read) {
      try {
        await markNotificationRead(user.uid, n.id);
        setItems((prev) =>
          prev.map((x) => (x.id === n.id ? { ...x, read: true } : x))
        );
      } catch {
        // ignore
      }
    } else if (usingDemo) {
      setItems((prev) =>
        prev.map((x) => (x.id === n.id ? { ...x, read: true } : x))
      );
    }

    if (n.href) navigate(n.href);
  }

  async function markAll() {
    if (!user) return;
    if (usingDemo) {
      setItems((prev) => prev.map((x) => ({ ...x, read: true })));
      return;
    }
    try {
      await markAllNotificationsRead(user.uid);
      setItems((prev) => prev.map((x) => ({ ...x, read: true })));
    } catch {
      // ignore
    }
  }

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
              <Bell size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Notifications
              </h1>
              <p className="text-sm text-slate-500">
                {unread > 0
                  ? `${unread} unread`
                  : "You're all caught up"}
              </p>
            </div>
          </div>
          {unread > 0 && (
            <button
              type="button"
              onClick={markAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {usingDemo && !loading && (
        <p className="rounded-xl bg-slate-50 px-4 py-2 text-xs text-slate-500">
          Showing sample notifications. Real ones appear in{" "}
          <code className="rounded bg-slate-100 px-1">
            users/&#123;uid&#125;/notifications
          </code>{" "}
          in Firestore.
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={28} />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <Bell size={32} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-500">
            No notifications yet
          </p>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
          {items.map((n) => {
            const Icon = typeIcon[n.type] ?? Info;
            const color = typeColor[n.type] ?? typeColor.system;
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => onOpen(n)}
                  className={`flex w-full gap-3 px-5 py-4 text-left transition hover:bg-slate-50 ${
                    !n.read ? "bg-blue-50/40" : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm ${
                          !n.read
                            ? "font-bold text-slate-900"
                            : "font-semibold text-slate-700"
                        }`}
                      >
                        {n.title}
                      </p>
                      {!n.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">
                      {n.body}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium text-slate-400">
                      {timeAgo(n.createdAt)}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
