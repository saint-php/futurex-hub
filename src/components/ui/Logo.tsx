export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="/brand/logo.jpeg"
        alt="Future X"
        className="h-16 w-16 rounded-xl object-cover"
      />

      <div>
        <h2 className="text-2xl font-bold text-blue-600">
          Future X
        </h2>

        <p className="text-slate-500">
          Learn. Play. Grow.
        </p>
      </div>
    </div>
  );
}