import { liveMatches } from "@/data/mockData";

export default function LiveTicker() {
  return (
    <div
      aria-label="Live matches ticker"
      className="border-b border-zinc-800/80 bg-zinc-950/90 py-2 overflow-hidden"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live
        </span>

        <div className="relative flex-1 overflow-hidden">
          <ul className="animate-ticker items-center gap-6 text-xs text-zinc-400">
            {liveMatches.map((m) => (
              <li key={m.id} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-medium text-zinc-200">{m.p1}</span>
                <span className="text-zinc-500">vs</span>
                <span className="font-medium text-zinc-200">{m.p2}</span>
                <span className="text-zinc-500">[{m.pool}]</span>
              </li>
            ))}
            {liveMatches.map((m) => (
              <li key={`dup-${m.id}`} aria-hidden="true" className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-medium text-zinc-200">{m.p1}</span>
                <span className="text-zinc-500">vs</span>
                <span className="font-medium text-zinc-200">{m.p2}</span>
                <span className="text-zinc-500">[{m.pool}]</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}