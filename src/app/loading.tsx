export default function Loading() {
  return (
    <div className="container py-10 space-y-4">
      <div className="h-8 w-48 bg-slate-100 rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
