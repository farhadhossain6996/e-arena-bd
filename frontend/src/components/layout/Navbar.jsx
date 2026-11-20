"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/90 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand + Primary Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-black tracking-[0.18em] text-white uppercase">
            E-ARENA <span className="text-emerald-400">BD</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
            <Link href="/" className="text-white hover:text-emerald-400 transition">
              Arena
            </Link>
            <Link href="/matches" className="hover:text-emerald-400 transition">
              Matches
            </Link>
            <Link href="/wallet" className="hover:text-emerald-400 transition">
              Wallet
            </Link>
          </nav>
        </div>

        {/* Right: Wallet Balance + Player Profile */}
        <div className="flex items-center gap-3">
          <Link
            href="/wallet"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs hover:border-zinc-700 transition"
          >
            <span className="text-zinc-400">Wallet balance:</span>
            <span className="font-semibold text-white">500.00</span>
            <span className="font-semibold text-emerald-400">Tk</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/70 px-2.5 py-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              PA
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">Player_A</p>
              <p className="text-[11px] text-zinc-400">Lv. 24 · Gold III</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Primary mobile"
            className="md:hidden rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav aria-label="Primary mobile" className="md:hidden border-t border-zinc-800/80 bg-[#09090b] px-4 py-3 space-y-2 text-sm text-zinc-300">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block py-1.5 text-white font-medium">
            Arena
          </Link>
          <Link href="/matches" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-emerald-400">
            Matches
          </Link>
          <Link href="/wallet" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-emerald-400">
            Wallet
          </Link>
        </nav>
      )}
    </header>
  );
}