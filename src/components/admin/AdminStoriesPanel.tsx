import { useEffect, useState } from "react";
import {
  listStories,
  listStoryCategories,
  createStory,
  upsertStory,
  deleteStory,
  upsertStoryCategory,
} from "../../services/adminContentService";
import type { AdminStory, AdminStoryCategory } from "../../types/content";

const emptyStory = (): Omit<AdminStory, "id"> => ({
  title: "",
  author: "",
  summary: "",
  story: "",
  category: "",
  cover: "📖",
  readTime: "5 min",
  age: "8–12",
  difficulty: "Easy",
  xpReward: 20,
  coinReward: 10,
});

export default function AdminStoriesPanel() {
  const [stories, setStories] = useState<AdminStory[]>([]);
  const [categories, setCategories] = useState<AdminStoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<AdminStory | null>(null);
  const [form, setForm] = useState(emptyStory());
  const [newCatId, setNewCatId] = useState("");
  const [newCatTitle, setNewCatTitle] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    try {
      const [s, c] = await Promise.all([listStories(), listStoryCategories()]);
      setStories(s);
      setCategories(c);
    } catch (e) {
      setMessage(String((e as Error).message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  function startCreate() {
    setEditing(null);
    setForm({
      ...emptyStory(),
      category: categories[0]?.id ?? "",
    });
  }

  function startEdit(s: AdminStory) {
    setEditing(s);
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = s;
    setForm(rest);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.story.trim()) {
      setMessage("Title and story body are required.");
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      if (editing) {
        await upsertStory({ ...form, id: editing.id });
        setMessage("Story updated.");
      } else {
        await createStory(form);
        setMessage("Story created.");
      }
      setForm(emptyStory());
      setEditing(null);
      await reload();
    } catch (err) {
      setMessage(String((err as Error).message));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this story permanently?")) return;
    await deleteStory(id);
    await reload();
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    const id = newCatId.trim().toLowerCase().replace(/\s+/g, "-");
    if (!id || !newCatTitle.trim()) return;
    await upsertStoryCategory({
      id,
      title: newCatTitle.trim(),
      description: "",
    });
    setNewCatId("");
    setNewCatTitle("");
    await reload();
  }

  function field<K extends keyof ReturnType<typeof emptyStory>>(
    key: K,
    value: ReturnType<typeof emptyStory>[K]
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="space-y-8">
      {message && (
        <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {message}
        </p>
      )}

      {/* Categories */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-900">Story categories</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.id}
              className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800"
            >
              {c.title} <span className="opacity-50">({c.id})</span>
            </span>
          ))}
          {categories.length === 0 && (
            <span className="text-sm text-slate-400">No categories yet</span>
          )}
        </ul>
        <form onSubmit={handleAddCategory} className="mt-4 flex flex-wrap gap-2">
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="id (e.g. fables)"
            value={newCatId}
            onChange={(e) => setNewCatId(e.target.value)}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Title"
            value={newCatTitle}
            onChange={(e) => setNewCatTitle(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Add category
          </button>
        </form>
      </section>

      {/* Form */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">
            {editing ? `Edit: ${editing.title}` : "New story"}
          </h2>
          {editing && (
            <button
              type="button"
              onClick={startCreate}
              className="text-sm text-blue-600 hover:underline"
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="grid gap-3 sm:grid-cols-2">
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
            placeholder="Title *"
            value={form.title}
            onChange={(e) => field("title", e.target.value)}
            required
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Author"
            value={form.author}
            onChange={(e) => field("author", e.target.value)}
          />
          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={form.category}
            onChange={(e) => field("category", e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Cover (emoji)"
            value={form.cover}
            onChange={(e) => field("cover", e.target.value)}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Read time"
            value={form.readTime}
            onChange={(e) => field("readTime", e.target.value)}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Age range"
            value={form.age}
            onChange={(e) => field("age", e.target.value)}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Difficulty"
            value={form.difficulty}
            onChange={(e) => field("difficulty", e.target.value)}
          />
          <input
            type="number"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="XP reward"
            value={form.xpReward}
            onChange={(e) => field("xpReward", Number(e.target.value))}
          />
          <input
            type="number"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Coin reward"
            value={form.coinReward}
            onChange={(e) => field("coinReward", Number(e.target.value))}
          />
          <textarea
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
            rows={2}
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => field("summary", e.target.value)}
          />
          <textarea
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
            rows={10}
            placeholder="Full story body (blank line between paragraphs) *"
            value={form.story}
            onChange={(e) => field("story", e.target.value)}
            required
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : editing ? "Update story" : "Create story"}
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-slate-900">
          Existing stories ({stories.length})
        </h2>
        {loading ? (
          <p className="text-sm text-slate-400">Loading…</p>
        ) : stories.length === 0 ? (
          <p className="text-sm text-slate-400">No stories in Firestore yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {stories.map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {s.cover} {s.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {s.category} · {s.author} · {s.readTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(s)}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s.id)}
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