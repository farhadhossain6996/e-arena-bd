"use client";
import Link from "next/link";
import { Wallet, Trophy, Gamepad2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-wider text-white">
            E-ARENA <span className="text-emerald-400">BD</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="text-white hover:text-emerald-400 transition">Arena</Link>
          <Link href="/matches" className="hover:text-emerald-400 transition">1v1 Lobby</Link>
          <Link href="/wallet" className="hover:text-emerald-400 transition">Wallet</Link>
        </nav>

        {/* Wallet & User Profile */}
        <div className="flex items-center gap-3">
          {/* Wallet Badge */}
          <Link
            href="/wallet"
            className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition"
          >
            <Wallet className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline text-slate-400 font-normal">Wallet balance:</span>
            <span className="text-white font-bold">500.00</span>
            <span className="text-emerald-400">Tk</span>
          </Link>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-900/90 pl-1.5 pr-3 py-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-xs font-bold text-slate-950">
              PA
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-xs font-semibold text-white">Player_A</p>
              <p className="text-[10px] text-amber-400 flex items-center gap-1">
                <Trophy className="h-2.5 w-2.5" /> Lv. 24 · Gold III
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}