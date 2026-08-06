export default function LessonCard() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold">
        Recent Lesson
      </h2>

      <div className="mt-5 rounded-xl bg-slate-50 p-5">

        <h3 className="font-bold">
          Basic English Vocabulary
        </h3>

        <p className="mt-2 text-slate-500">
          Lesson 1 • 20 Words
        </p>

        <button className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white">
          Start
        </button>

      </div>
    </section>
  );
}