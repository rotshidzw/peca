export default function Loading() {
  return (
    <div className="container py-16">
      <div className="space-y-6">
        <div className="h-8 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
