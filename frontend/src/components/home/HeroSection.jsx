import Link from "next/link";
import { Users, Wallet, Swords, ShieldCheck, ArrowRight } from "lucide-react";

const stats = [
  { value: "3,412", label: "Players online", Icon: Users },
  { value: "1.2L Tk", label: "Paid out today", Icon: Wallet },
  { value: "2,086", label: "Matches today", Icon: Swords },
  { value: "100%", label: "Escrow protected", Icon: ShieldCheck },
];

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:px-6 sm:pt-8">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#0b0d0c] p-6 sm:p-10 md:p-12">
        {/* Subtle grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top-right emerald ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl"
        />

        <div className="relative z-10">
          {/* Season badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            SEASON 3 IS LIVE
          </div>

          {/* Headline */}
          <h1 className="mt-5 max-w-2xl text-3xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight text-white leading-[1.08]">
            Play 1v1. Prove your{" "}
            <span className="block sm:inline">
              skill.{" "}
              <span className="text-emerald-400">Win real Taka.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Bangladesh&apos;s skill-gaming arena. Challenge players, lock funds in secure escrow, and get paid the moment results are verified.
          </p>

          {/* CTA Button */}
          <div className="mt-6">
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-bold tracking-wide text-zinc-950 uppercase shadow-[0_0_24px_rgba(16,185,129,0.25)] hover:bg-emerald-400 transition"
            >
              FIND A MATCH
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Stats Cards */}
          <dl className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
            {stats.map(({ value, label, Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-zinc-800/90 bg-[#090a09]/90 p-4 sm:p-5"
              >
                <Icon className="h-4 w-4 text-emerald-400 mb-3" strokeWidth={1.75} />
                <dd className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {value}
                </dd>
                <dt className="mt-0.5 text-[11px] text-zinc-400">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}