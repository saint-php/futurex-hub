export default function Divider() {
  return (
    <div className="my-6 flex items-center">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />

      <span className="mx-4 text-xs font-medium uppercase tracking-wider text-slate-400">
        Or
      </span>

      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
    </div>
  );
}