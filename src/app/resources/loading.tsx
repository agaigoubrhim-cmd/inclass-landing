export default function ResourcesLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8" aria-busy="true" role="status">
      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="relative flex min-h-[54svh] items-center overflow-hidden rounded-[40px] bg-ink-800">
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/85" />
          <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-14 text-center sm:px-10 sm:py-20">
            <div className="mx-auto h-6 w-40 rounded-full bg-white/20" />
            <div className="mx-auto mt-6 h-12 w-3/4 max-w-md rounded-2xl bg-white/20" />
            <div className="mx-auto mt-6 h-4 w-full max-w-lg rounded-full bg-white/15" />
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="mt-12 flex flex-wrap items-center gap-2.5">
          <div className="h-10 w-28 rounded-full bg-ink/10 dark:bg-white/10" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-24 rounded-full bg-ink/10 dark:bg-white/10" />
          ))}
        </div>

        {/* Search skeleton */}
        <div className="mt-6 flex max-w-xl items-center gap-2.5 rounded-full border border-line bg-white p-2 pl-4 dark:border-white/15 dark:bg-ink-800">
          <div className="h-4 w-4 rounded-full bg-ink/10 dark:bg-white/15" />
          <div className="h-10 w-full rounded-full bg-ink/5 dark:bg-white/10" />
        </div>

        {/* Cards skeleton */}
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[30px] border border-line bg-white dark:border-white/10 dark:bg-ink-800"
            >
              <div className="h-52 w-full bg-sand dark:bg-ink-900" />
              <div className="space-y-3 p-6 sm:p-7">
                <div className="h-4 w-3/4 rounded-full bg-ink/10 dark:bg-white/15" />
                <div className="h-3 w-full rounded-full bg-ink/5 dark:bg-white/10" />
                <div className="h-3 w-5/6 rounded-full bg-ink/5 dark:bg-white/10" />
                <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4 dark:border-white/10">
                  <div className="h-8 w-24 rounded-full bg-ink/10 dark:bg-white/15" />
                  <div className="h-3 w-16 rounded-full bg-ink/5 dark:bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
