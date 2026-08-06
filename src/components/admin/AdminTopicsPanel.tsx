import { useEffect, useState } from "react";
import {
  listCourses,
  addTopicToCourse,
  updateTopicInCourse,
  removeTopicFromCourse,
  setTopicQuestions,
  makeQuestion,
} from "../../services/adminContentService";
import type { AdminCourse, AdminTopic, AdminQuestion } from "../../types/content";

export default function AdminTopicsPanel() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Topic form
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicSummary, setTopicSummary] = useState("");
  const [topicNotes, setTopicNotes] = useState("");

  // Question form (bound to selected topic)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [qText, setQText] = useState("");
  const [qOptions, setQOptions] = useState(["", "", "", ""]);
  const [qAnswer, setQAnswer] = useState("");

  const selectedCourse = courses.find((c) => c.id === courseId);
  const selectedTopic = selectedCourse?.topics?.find(
    (t) => t.id === selectedTopicId
  );

  async function reload(keepCourse = true) {
    setLoading(true);
    try {
      const list = await listCourses();
      setCourses(list);
      if (keepCourse && courseId && list.some((c) => c.id === courseId)) {
        // keep selection
      } else if (list[0]) {
        setCourseId(list[0].id);
      }
    } catch (e) {
      setMessage(String((e as Error).message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload(false);
  }, []);

  function resetTopicForm() {
    setEditingTopicId(null);
    setTopicTitle("");
    setTopicSummary("");
    setTopicNotes("");
  }

  function startEditTopic(t: AdminTopic) {
    setEditingTopicId(t.id);
    setTopicTitle(t.title);
    setTopicSummary(t.summary);
    setTopicNotes(t.notes);
    setSelectedTopicId(t.id);
  }

  async function handleSaveTopic(e: React.FormEvent) {
    e.preventDefault();
    if (!courseId || !topicTitle.trim()) {
      setMessage("Pick a course and enter a topic title.");
      return;
    }
    setMessage(null);
    try {
      if (editingTopicId) {
        await updateTopicInCourse(courseId, editingTopicId, {
          title: topicTitle.trim(),
          summary: topicSummary.trim(),
          notes: topicNotes,
        });
        setMessage("Topic updated.");
      } else {
        const t = await addTopicToCourse(courseId, {
          title: topicTitle.trim(),
          summary: topicSummary.trim(),
          notes: topicNotes,
          questions: [],
        });
        setSelectedTopicId(t.id);
        setMessage("Topic created. Add questions below.");
      }
      resetTopicForm();
      await reload();
    } catch (err) {
      setMessage(String((err as Error).message));
    }
  }

  async function handleDeleteTopic(topicId: string) {
    if (!courseId || !confirm("Delete this topic and its questions?")) return;
    await removeTopicFromCourse(courseId, topicId);
    if (selectedTopicId === topicId) setSelectedTopicId(null);
    await reload();
  }

  async function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!courseId || !selectedTopicId) {
      setMessage("Select a topic first.");
      return;
    }
    const opts = qOptions.map((o) => o.trim()).filter(Boolean);
    if (!qText.trim() || opts.length < 2 || !qAnswer.trim()) {
      setMessage("Need question text, at least 2 options, and the correct answer.");
      return;
    }
    if (!opts.includes(qAnswer.trim())) {
      setMessage("Correct answer must match one of the options exactly.");
      return;
    }

    const existing = selectedTopic?.questions ?? [];
    const next: AdminQuestion[] = [
      ...existing,
      makeQuestion({
        question: qText.trim(),
        options: opts,
        answer: qAnswer.trim(),
      }),
    ];
    await setTopicQuestions(courseId, selectedTopicId, next);
    setQText("");
    setQOptions(["", "", "", ""]);
    setQAnswer("");
    setMessage("Question added.");
    await reload();
  }

  async function handleDeleteQuestion(qId: string) {
    if (!courseId || !selectedTopicId) return;
    const next = (selectedTopic?.questions ?? []).filter((q) => q.id !== qId);
    await setTopicQuestions(courseId, selectedTopicId, next);
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
        <label className="block text-sm font-semibold text-slate-700">
          Course
        </label>
        <select
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
            setSelectedTopicId(null);
            resetTopicForm();
          }}
        >
          <option value="">Select course…</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({(c.topics ?? []).length} topics)
            </option>
          ))}
        </select>
        {loading && <p className="mt-2 text-xs text-slate-400">Loading…</p>}
      </section>

      {courseId && (
        <>
          {/* Topic form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">
                {editingTopicId ? "Edit topic" : "Add topic + notes"}
              </h2>
              {editingTopicId && (
                <button
                  type="button"
                  onClick={resetTopicForm}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
            <form onSubmit={handleSaveTopic} className="space-y-3">
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Topic title *"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                required
              />
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="One-line summary"
                value={topicSummary}
                onChange={(e) => setTopicSummary(e.target.value)}
              />
              <textarea
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                rows={8}
                placeholder="Notes body (blank line between paragraphs)"
                value={topicNotes}
                onChange={(e) => setTopicNotes(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingTopicId ? "Update topic" : "Create topic"}
              </button>
            </form>
          </section>

          {/* Topics list */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 font-bold text-slate-900">
              Topics in this course
            </h2>
            {(selectedCourse?.topics ?? []).length === 0 ? (
              <p className="text-sm text-slate-400">No topics yet.</p>
            ) : (
              <ul className="space-y-2">
                {(selectedCourse?.topics ?? []).map((t) => (
                  <li
                    key={t.id}
                    className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                      selectedTopicId === t.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <button
                      type="button"
                      className="text-left"
                      onClick={() => setSelectedTopicId(t.id)}
                    >
                      <p className="font-semibold text-slate-900">{t.title}</p>
                      <p className="text-xs text-slate-500">
                        {(t.questions ?? []).length} questions ·{" "}
                        {t.notes ? `${t.notes.length} chars notes` : "no notes"}
                      </p>
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEditTopic(t)}
                        className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTopic(t.id)}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Questions for selected topic */}
          {selectedTopic && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900">
                Questions · {selectedTopic.title}
              </h2>

              <ul className="mt-3 space-y-2">
                {(selectedTopic.questions ?? []).map((q, i) => (
                  <li
                    key={q.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {i + 1}. {q.question}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Options: {q.options.join(" · ")}
                        </p>
                        <p className="text-xs font-medium text-emerald-700">
                          Answer: {q.answer}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="shrink-0 text-xs font-semibold text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddQuestion} className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                <p className="text-sm font-semibold text-slate-700">
                  Add question
                </p>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Question text *"
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  {qOptions.map((opt, idx) => (
                    <input
                      key={idx}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const next = [...qOptions];
                        next[idx] = e.target.value;
                        setQOptions(next);
                      }}
                    />
                  ))}
                </div>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Correct answer (must match an option exactly) *"
                  value={qAnswer}
                  onChange={(e) => setQAnswer(e.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Add question
                </button>
              </form>
            </section>
          )}
        </>
      )}
    </div>
  );
}