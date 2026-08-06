/**
 * Hidden admin console — not linked in any public navigation.
 * Reach it only via /dashboard/admin (or /admin) once you wire the route.
 *
 * Tabs: Stories | Courses | Topics & Questions
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, ListChecks, Shield } from "lucide-react";
import AdminStoriesPanel from "../components/admin/AdminStoriesPanel";
import AdminCoursesPanel from "../components/admin/AdminCoursesPanel";
import AdminTopicsPanel from "../components/admin/AdminTopicsPanel";

type Tab = "stories" | "courses" | "topics";

const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "stories", label: "Stories", icon: BookOpen },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "topics", label: "Topics & Questions", icon: ListChecks },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("stories");

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-sm">
            <Shield size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Content Admin
            </h1>
            <p className="text-sm text-slate-500">
              Add and edit stories, study courses, topics, notes, and questions.
              This page is not linked in the app UI.
            </p>
          </div>
        </div>
        <Link
          to="/dashboard"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              tab === id
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {tab === "stories" && <AdminStoriesPanel />}
      {tab === "courses" && <AdminCoursesPanel />}
      {tab === "topics" && <AdminTopicsPanel />}
    </div>
  );
}