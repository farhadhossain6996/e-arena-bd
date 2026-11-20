
"use client";
import { useState } from "react";
import Link from "next/link";
import { Trophy, Sparkles, Wallet, CheckCircle2 } from "lucide-react";

export default function RewardsPage() {
  const [claimed, setClaimed] = useState(false);
  const [imgError, setImgError] = useState(false);

  const totalPool = 100.0;
  const platformFee = 20.0;
  const prizeEarned = 80.0;

  const handleClaim = () => {
    setClaimed(true);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:py-12 flex justify-center">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-500/35 bg-[#090c0b] px-6 py-8 sm:px-10 sm:py-10 shadow-[0_0_50px_rgba(16,185,129,0.14)]">
        {/* Subtle grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Top ambient emerald glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-80 rounded-full bg-emerald-500/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Trophy Artwork */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-emerald-500/25 bg-zinc-950/90 shadow-[0_0_30px_rgba(16,185,129,0.22)] overflow-hidden">
            {!imgError ? (
              <img
                src="/images/trophy.png"
                alt="Victory Trophy"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : null}

            {imgError && (
              <div className="flex flex-col items-center justify-center">
                <Trophy className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
              </div>
            )}
          </div>

          {/* Victory Badge */}
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-3.5 py-1 text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
            <Sparkles className="h-3 w-3" />
            <span>VICTORY CONFIRMED</span>
          </div>

          {/* Match Result Title */}
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Player_A won 3-1
          </h1>

          {/* Scoreboard */}
          <div className="mt-6 flex items-center justify-center gap-8 sm:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-black text-emerald-400 leading-none">
                3
              </span>
              <span className="mt-2 text-sm font-bold text-white">
                Player_A
              </span>
              <span className="mt-0.5 text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                WINNER
              </span>
            </div>

            <span className="text-2xl font-bold text-zinc-600 pb-4">:</span>

            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-black text-zinc-500 leading-none">
                1
              </span>
              <span className="mt-2 text-sm font-semibold text-zinc-300">
                Player_B
              </span>
              <span className="mt-0.5 text-[10px] font-semibold tracking-widest text-transparent select-none uppercase">
                LOSER
              </span>
            </div>
          </div>

          {/* Breakdown Box */}
          <div className="mt-7 w-full rounded-2xl border border-zinc-800/90 bg-zinc-950/90 px-5 py-4 text-xs sm:text-sm divide-y divide-zinc-800/70">
            <div className="flex items-center justify-between pb-3">
              <span className="text-zinc-400">Total pool (2 × entry)</span>
              <span className="font-mono font-bold text-white">
                {totalPool.toFixed(2)} Tk
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-zinc-400">Admin / platform fee</span>
              <span className="font-mono font-bold text-rose-400">
                -{platformFee.toFixed(2)} Tk
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="font-semibold text-zinc-200">Prize earned</span>
              <span className="font-mono font-extrabold text-emerald-400">
                {prizeEarned.toFixed(2)} Tk
              </span>
            </div>
          </div>

          {/* Claim Reward Button */}
          {!claimed ? (
            <button
              type="button"
              onClick={handleClaim}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-extrabold tracking-wider text-zinc-950 uppercase shadow-[0_0_28px_rgba(16,185,129,0.35)] hover:bg-emerald-400 transition"
            >
              <Wallet className="h-4 w-4" />
              <span>CLAIM REWARD · {prizeEarned.toFixed(2)} TK</span>
            </button>
          ) : (
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-950/60 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>CLAIMED · {prizeEarned.toFixed(2)} TK CREDITED</span>
              </div>
              <Link
                href="/wallet"
                className="inline-block text-xs font-medium text-zinc-400 hover:text-emerald-400 underline underline-offset-4 transition"
              >
                View in Wallet →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}