export default function ContinueCard() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
      <p className="text-blue-100">
        Continue Learning
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        Vocabulary Builder
      </h2>

      <p className="mt-3 text-blue-100">
        Resume your learning journey and earn more XP.
      </p>

      <button className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100">
        Continue
      </button>
    </section>
  );
}