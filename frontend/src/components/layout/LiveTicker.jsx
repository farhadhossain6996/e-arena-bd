import { liveMatches } from "@/data/mockData";

export default function LiveTicker() {
  return (
    <div aria-label="Live matches ticker" className="border-b border-slate-800/80 bg-slate-900/95 py-2 overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center px-4">
        {/* Live Indicator */}
        <div className="z-10 flex shrink-0 items-center gap-2 bg-slate-900 pr-4 text-xs font-bold uppercase tracking-wider text-rose-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          Live
        </div>

        {/* Scrolling Matches */}
        <div className="relative flex-1 overflow-hidden">
          <ul className="animate-marquee flex items-center gap-8 text-xs text-slate-300">
            {[...liveMatches, ...liveMatches].map((match, index) => (
              <li key={index} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold text-white">{match.p1}</span>
                <span className="text-slate-500 font-bold">vs</span>
                <span className="font-semibold text-white">{match.p2}</span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                  [{match.pool} Pool]
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}