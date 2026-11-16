import Link from "next/link";
import { ShieldCheck, Swords, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const stats = [
    { value: "3,412", label: "Players online" },
    { value: "1.2L Tk", label: "Paid out today" },
    { value: "2,086", label: "Matches today" },
    { value: "100%", label: "Escrow protected" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-14 sm:py-20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
        {/* Season Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Season 3 is live
        </div>

        {/* Main Heading */}
        <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Play 1v1. Prove your skill.{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Win real Taka.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
          Bangladesh&apos;s skill-gaming arena. Challenge players, lock funds in secure escrow, and get paid the moment results are verified.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/matches"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition"
          >
            <Swords className="h-4 w-4" />
            Find 1v1 Match
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/wallet"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            How Escrow Works
          </Link>
        </div>

        {/* Stats Grid */}
        <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-5 backdrop-blur-sm"
            >
              <dd className="text-2xl sm:text-3xl font-extrabold text-white">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs font-medium text-slate-400">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}