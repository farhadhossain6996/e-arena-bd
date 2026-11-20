"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Zap,
  LayoutGrid,
  Gamepad2,
  Swords,
  Trophy,
  Wallet,
  Bell,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Game Hub", href: "/", Icon: LayoutGrid },
  { label: "Lobby", href: "/matches", Icon: Gamepad2 },
  { label: "Match Room", href: "/matches?tab=active", Icon: Swords },
  { label: "Rewards", href: "/rewards", Icon: Trophy },
  { label: "Wallet", href: "/wallet", Icon: Wallet },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#050606]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
            <Zap className="h-5 w-5 fill-zinc-950" strokeWidth={2.2} />
          </span>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">
            E-ARENA <span className="text-emerald-400">BD</span>
          </span>
        </Link>

        {/* Center: Primary Navigation */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1.5"
        >
          {NAV_ITEMS.map(({ label, href, Icon }) => {
            const basePath = href.split("?")[0];
            const isActive =
              label === "Match Room" ? false : pathname === basePath;

            return (
              <Link
                key={label}
                href={href}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? "border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 shadow-[inset_0_0_12px_rgba(16,185,129,0.08)]"
                    : "border border-transparent text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-200"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-emerald-400" : "text-zinc-400"
                  }`}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Wallet Pill + Bell + Player Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            href="/wallet"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-[#09120e] px-3.5 py-1.5 text-xs sm:text-sm hover:border-emerald-500/50 transition"
          >
            <Wallet className="h-4 w-4 text-emerald-400" />
            <span className="font-bold text-white">500.00</span>
            <span className="font-medium text-zinc-400">Tk</span>
          </Link>

          <Link
            href="/matches?tab=direct"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800/90 bg-zinc-900/70 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-[#050606]" />
          </Link>

          <div className="hidden sm:flex items-center gap-2.5 pl-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-xs font-extrabold text-zinc-950">
              PA
            </div>
            <div className="leading-tight">
              <p className="text-xs sm:text-sm font-bold text-white">
                Player_A
              </p>
              <p className="text-[11px] text-zinc-400">Lv. 24 · Gold III</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Primary mobile"
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          aria-label="Primary mobile"
          className="lg:hidden border-t border-zinc-800/80 bg-[#050606] px-4 py-3 space-y-1.5"
        >
          {NAV_ITEMS.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              <Icon className="h-4 w-4 text-emerald-400" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}