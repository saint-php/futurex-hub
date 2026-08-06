import { useEffect, useState } from "react";
import {
  listCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/adminContentService";
import type { AdminCourse } from "../../types/content";

const GRADIENTS = [
  "from-emerald-600 to-teal-600",
  "from-blue-600 to-indigo-600",
  "from-violet-600 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-600 to-sky-600",
];

export default function AdminCoursesPanel() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📚");
  const [gradient, setGradient] = useState(GRADIENTS[0]);

  async function reload() {
    setLoading(true);
    try {
      setCourses(await listCourses());
    } catch (e) {
      setMessage(String((e as Error).message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setSubjectId("");
    setDescription("");
    setIcon("📚");
    setGradient(GRADIENTS[0]);
  }

  function startEdit(c: AdminCourse) {
    setEditingId(c.id);
    setTitle(c.title);
    setSubjectId(c.subjectId);
    setDescription(c.description);
    setIcon(c.icon);
    setGradient(c.gradient);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setMessage("Title is required.");
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      if (editingId) {
        await updateCourse(editingId, {
          title: title.trim(),
          subjectId: subjectId.trim() || editingId,
          description: description.trim(),
          icon,
          gradient,
        });
        setMessage("Course updated.");
      } else {
        const sid =
          subjectId.trim() ||
          title
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        await createCourse({
          title: title.trim(),
          subjectId: sid,
          description: description.trim(),
          icon,
          gradient,
          topics: [],
        });
        setMessage("Course created. Switch to Topics & Questions to add content.");
      }
      resetForm();
      await reload();
    } catch (err) {
      setMessage(String((err as Error).message));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this course and all its topics/questions?")) return;
    await deleteCourse(id);
    await reload();
  }

  return (
    <div className="space-y-8">
      {message && (
        <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {message}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">
            {editingId ? "Edit course" : "New study course"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-blue-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="grid gap-3 sm:grid-cols-2">
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
            placeholder="Course title * (e.g. English Language)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Subject id (e.g. english) — used in CBT"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            disabled={!!editingId}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Icon emoji"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
            value={gradient}
            onChange={(e) => setGradient(e.target.value)}
          >
            {GRADIENTS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <textarea
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
            rows={3}
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : editingId ? "Update course" : "Create course"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-slate-900">
          Courses ({courses.length})
        </h2>
        {loading ? (
          <p className="text-sm text-slate-400">Loading…</p>
        ) : courses.length === 0 ? (
          <p className="text-sm text-slate-400">No courses in Firestore yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {courses.map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-lg text-white`}
                  >
                    {c.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{c.title}</p>
                    <p className="text-xs text-slate-500">
                      id: {c.id} · subjectId: {c.subjectId} ·{" "}
                      {(c.topics ?? []).length} topics
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(c)}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}