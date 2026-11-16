import Link from "next/link";
import { gamesData } from "@/data/mockData";
import { Flame, Bell, ArrowUpRight } from "lucide-react";

export default function GameGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Choose your arena
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            More titles are landing soon.
          </p>
        </div>
        <span className="rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-semibold text-slate-300">
          3 games
        </span>
      </div>

      {/* Games Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Active Game: eFootball */}
        <Link
          href="/matches"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 transition hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10"
        >
          <div>
            <div className="relative mb-5 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-emerald-950 via-slate-900 to-cyan-950 border border-slate-800">
              <span className="text-3xl font-black tracking-wider text-emerald-400/90 group-hover:scale-105 transition duration-300">
                eFOOTBALL™
              </span>
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-bold text-slate-950">
                <Flame className="h-3 w-3" /> LIVE NOW
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Sports · 1v1 Friendly Match
            </p>
            <h3 className="mt-1 text-xl font-bold text-white flex items-center justify-between">
              eFootball Mobile
              <ArrowUpRight className="h-5 w-5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Create or join 1v1 room matches, submit full-time score screenshots, and win instant payouts.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>Enter 1v1 Lobby</span>
            <span>50 - 500 Tk Pools →</span>
          </div>
        </Link>

        {/* Coming Soon Games from mockData */}
        {gamesData.map((game) => (
          <article
            key={game.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 opacity-85"
          >
            <div>
              <div className="relative mb-5 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xl font-bold tracking-wide text-slate-500 uppercase">
                  {game.title}
                </span>
                <span className="absolute top-3 right-3 rounded-full border border-slate-700 bg-slate-800/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                  {game.status}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {game.category}
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-200">
                {game.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                <Bell className="h-3.5 w-3.5" />
                Get notified at launch
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}